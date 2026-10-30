// ch12 Isolation of Elements — question bank (single topic t01). MCQ keys are placed by the builder (balanced);
// AR keys planned: a b c d a c. Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const t = [1];

// ---------------------------------------------------------------- ores and concentration
add('froth-mcq', mcq({
  stem: 'A mining company has an ore of galena (PbS) mixed with sand. Which concentration method should it use?',
  right: 'Froth flotation',
  wrong: ['Magnetic separation', 'Leaching with NaOH', 'Liquation'],
  sol: 'Sulphide particles are wetted by oil and float in the froth; sand sinks — option (@K).',
  d: 1, c: 'application', t,
}));
add('roast-mcq', mcq({
  stem: 'Which ore is roasted rather than calcined before reduction?',
  right: 'Zinc blende, ZnS',
  wrong: ['Calamine, ZnCO₃', 'Limonite, Fe₂O₃·3H₂O', 'Dolomite, CaCO₃·MgCO₃'],
  sol: 'Sulphides must be heated in air to burn off sulfur as SO₂ — option (@K). Carbonates and hydrated oxides are calcined.',
  d: 2, c: 'understanding', t,
}));
add('flux-mcq', mcq({
  stem: 'During smelting of a copper ore, iron oxide (FeO) is present as gangue. The flux added is:',
  right: 'silica, SiO₂',
  wrong: ['lime, CaO', 'cryolite, Na₃AlF₆', 'coke, C'],
  sol: 'FeO is a basic gangue, so an acidic flux is needed: FeO + SiO₂ → FeSiO₃ slag — option (@K).',
  d: 2, c: 'application', t,
}));
add('ore-mcq', mcq({
  stem: 'Which statement is correct?',
  right: 'All ores are minerals, but not all minerals are ores',
  wrong: ['All minerals are ores, but not all ores are minerals', 'Ores and minerals are the same thing', 'Ores never contain gangue'],
  sol: 'An ore is a mineral from which the metal can be extracted profitably — option (@K).',
  d: 1, c: 'understanding', t,
}));
add('magnetic-mcq', mcq({
  stem: 'Tin stone (SnO₂) is often mixed with wolframite (FeWO₄), which is magnetic. The best way to separate them is:',
  right: 'magnetic separation',
  wrong: ['froth flotation', 'leaching with NaCN', 'roasting'],
  sol: 'Wolframite is attracted to the magnetic roller and separates from non-magnetic tin stone — option (@K).',
  d: 2, c: 'application', t,
}));
add('depressant-mcq', mcq({
  stem: 'An ore contains both ZnS and PbS. Sodium cyanide is added during froth flotation so that:',
  right: 'ZnS is kept from entering the froth while PbS floats',
  wrong: ['both sulphides dissolve in water', 'PbS is converted into PbO', 'more froth is produced'],
  sol: 'NaCN acts as a depressant for ZnS, allowing the two sulphides to be separated — option (@K).',
  d: 2, c: 'application', t,
}));
add('bayer-mcq', mcq({
  stem: 'In the leaching of bauxite with hot concentrated NaOH, iron oxide impurity:',
  right: 'does not dissolve and is filtered off',
  wrong: ['dissolves as sodium ferrate', 'is reduced to iron', 'forms cryolite'],
  sol: 'Al₂O₃ is amphoteric and dissolves; Fe₂O₃ is basic and stays behind — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('gold-mcq', mcq({
  stem: 'In the cyanide process, gold is recovered from the solution of [Au(CN)₂]⁻ by adding:',
  right: 'zinc',
  wrong: ['copper(II) sulfate', 'sodium chloride', 'carbon dioxide'],
  sol: 'Zinc is more reactive and displaces gold: 2[Au(CN)₂]⁻ + Zn → [Zn(CN)₄]²⁻ + 2Au — option (@K).',
  d: 1, c: 'recall', t,
}));
add('ore-match', match({
  stem: 'Match each ore with the metal extracted from it.',
  pairs: [
    ['Calamine', 'Zinc'],
    ['Haematite', 'Iron'],
    ['Bauxite', 'Aluminium'],
    ['Malachite', 'Copper'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Calamine → Zn; haematite → Fe; bauxite → Al; malachite → Cu.',
  d: 1, c: 'recall', t,
}));
add('frother-fill', fill({
  stem: 'In froth flotation, pine oil acts as the ___, stabilising the froth.',
  acc: [['frother', 'frothing agent', 'froth stabiliser']],
  sol: 'Pine oil is the **frother**; xanthates are collectors.',
  d: 1, c: 'recall', t,
}));
add('calcine-tf', tf({
  stem: 'Calcination is carried out in a plentiful supply of air.',
  key: 'f',
  sol: 'False. Calcination is done in limited air or none; roasting is done in excess air.',
  d: 1, c: 'understanding', t,
}));
add('leach-ar', ar({
  a: 'Bauxite is concentrated by leaching with sodium hydroxide.',
  r: 'Aluminium oxide is amphoteric and dissolves in alkali, while the iron oxide impurity does not.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t,
}));
add('froth-ar', ar({
  a: 'Froth flotation is used to concentrate sulphide ores.',
  r: 'In froth flotation, air is blown through the mixture of ore, water and oil.',
  key: 'b',
  sol: 'Both are true, but blowing air does not explain why the method suits sulphides; the reason is that sulphide particles are preferentially wetted by oil and gangue by water — option (b).',
  d: 3, c: 'analysis', t,
}));
add('sulfur-num', num({
  marks: 2,
  stem: r`A smelter roasts $1.94\ \text{tonnes}$ of zinc blende, ZnS ($M = 97$). What mass of $\ce{SO2}$ ($M = 64$), in tonnes, is released if none is captured?`,
  value: 1.28, tol: 0.01, unit: 't',
  sol: r`$\ce{2ZnS + 3O2 -> 2ZnO + 2SO2}$: 1 mol ZnS gives 1 mol SO₂. Moles of ZnS $= 1.94 \times 10^{6} \div 97 = 20000$; mass of SO₂ $= 20000 \times 64 = 1280000\ \text{g}$; in tonnes $1280000 \div 10^{6} = 1.28$, so $1.28\ \text{t}$.`,
  scheme: [['1 : 1 ratio and 20 000 mol', 1], ['1.28 t', 1]],
  d: 3, c: 'application', t,
}), () => near((1.94e6 / 97) * 64 / 1e6, 1.28) || 'so2');
add('iron-num', num({
  marks: 2,
  stem: r`An ore contains 80% haematite, $\ce{Fe2O3}$ ($M = 160$), by mass. What is the maximum mass of iron ($M = 56$), in kilograms, obtainable from $1000\ \text{kg}$ of ore?`,
  value: 560, tol: 1, unit: 'kg',
  sol: r`Mass of Fe₂O₃ $= 0.80 \times 1000 = 800\ \text{kg}$. Fraction of iron $= 112 \div 160 = 0.70$. Mass of iron $= 800 \times 0.70 = 560$, so $560\ \text{kg}$.`,
  scheme: [['800 kg Fe₂O₃ and 112/160', 1], ['560 kg', 1]],
  d: 2, c: 'application', t,
}), () => near(0.8 * 1000 * 112 / 160, 560) || 'iron');
add('conc-short', short({
  marks: 2,
  stem: 'Explain the role of (a) the collector and (b) the depressant in froth flotation, with one example of each.',
  model: '(a) A collector, such as a xanthate or a fatty acid, adsorbs on the ore particles and makes them water-repellent, so they attach to air bubbles and rise into the froth. (b) A depressant, such as sodium cyanide, prevents one sulphide (ZnS) from entering the froth, so that another sulphide (PbS) can be floated separately.',
  sol: 'Collector makes ore water-repellent; depressant holds back one sulphide.',
  scheme: [['(a) Collector role and example', 1], ['(b) Depressant role and example', 1]],
  d: 2, c: 'understanding', t,
}));
add('choose-short3', short({
  marks: 3,
  stem: 'A metallurgist has three samples: (a) cassiterite (SnO₂) with light sandy gangue; (b) copper pyrites with silica; (c) a low-grade ore with tiny particles of silver. Suggest a concentration method for each and give the property it uses.',
  model: '(a) Hydraulic washing (gravity separation): cassiterite is much denser than sand, which is washed away by a stream of water. (b) Froth flotation: the sulphide particles are wetted by oil and carried up by air bubbles, while silica is wetted by water and sinks. (c) Leaching with dilute sodium cyanide in the presence of air: silver dissolves as a soluble cyanide complex, leaving the gangue; silver is then displaced from solution with zinc.',
  sol: 'Gravity, flotation, cyanide leaching.',
  scheme: [['(a) Hydraulic washing, density', 1], ['(b) Froth flotation, wetting', 1], ['(c) Cyanide leaching, solubility', 1]],
  d: 3, c: 'application', t,
}));

// ---------------------------------------------------------------- conversion to oxide, flux
add('calcine-short', short({
  marks: 2, wl: null,
  stem: 'Write one balanced equation each for (a) calcination of calamine and (b) roasting of copper glance (Cu₂S) in air.',
  model: r`(a) $\ce{ZnCO3 ->[\Delta] ZnO + CO2}$

(b) $\ce{2Cu2S + 3O2 ->[\Delta] 2Cu2O + 2SO2}$`,
  sol: 'Two balanced equations.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t,
}));
add('slag-tf', tf({
  stem: 'Slag is less dense than molten metal and floats on it.',
  key: 't',
  sol: 'True. Slag such as CaSiO₃ floats on the molten metal and is run off separately.',
  d: 1, c: 'understanding', t,
}));
add('roast-ar', ar({
  a: 'Sulphide ores are converted into oxides before reduction.',
  r: 'Carbon is a better reducing agent for sulphides than for oxides.',
  key: 'c',
  sol: 'A is true; R is false — the reason is that oxides are more easily reduced (ΔG for reduction of oxides by carbon is favourable, while CS₂ formation is not) — option (c).',
  d: 3, c: 'analysis', t,
}));
add('slag-short', short({
  marks: 2,
  stem: 'A blast furnace charge contains sand (SiO₂) as gangue. Explain why limestone is added, with equations.',
  model: 'Limestone decomposes in the furnace to lime: CaCO₃ → CaO + CO₂. Lime is a basic flux that combines with the acidic silica to form calcium silicate slag, CaO + SiO₂ → CaSiO₃, which melts, floats on the molten iron and is run off.',
  sol: 'CaO from limestone forms CaSiO₃ slag.',
  scheme: [['Limestone → CaO (equation)', 1], ['CaO + SiO₂ → CaSiO₃ slag, removed', 1]],
  d: 2, c: 'application', t,
}));

// ---------------------------------------------------------------- thermodynamics and Ellingham
add('ellingham-mcq', mcq({
  stem: 'On an Ellingham diagram, the line for 2C + O₂ → 2CO lies below the line for 2Fe + O₂ → 2FeO above about 1000 K. This means that above 1000 K:',
  right: 'carbon can reduce FeO to iron',
  wrong: ['iron can reduce CO to carbon', 'FeO cannot be reduced by any element', 'carbon monoxide decomposes into carbon and oxygen'],
  sol: 'The element with the lower (more negative) line can take oxygen from the oxide above it — option (@K).',
  d: 2, c: 'application', t,
}));
add('slope-mcq', mcq({
  stem: 'Why does the Ellingham line for 2C + O₂ → 2CO slope downwards?',
  right: 'The entropy change is positive, since one mole of gas gives two moles of gas',
  wrong: ['The reaction is endothermic', 'The entropy change is negative', 'Carbon melts at high temperature'],
  sol: 'ΔG = ΔH − TΔS; with ΔS positive, ΔG becomes more negative as T rises — option (@K).',
  d: 3, c: 'understanding', t,
}));
add('al-mcq', mcq({
  stem: 'Aluminium is not extracted by heating alumina with coke because:',
  right: 'the Al₂O₃ line on the Ellingham diagram lies below the carbon lines at practical temperatures',
  wrong: ['aluminium reacts with CO₂', 'coke is too expensive', 'alumina melts below 500 K'],
  sol: 'ΔG for reduction of Al₂O₃ by carbon stays positive at practical temperatures, so electrolysis is used — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('co-mcq', mcq({
  stem: 'In the upper part of a blast furnace (500–800 K), the main reducing agent for iron oxides is:',
  right: 'carbon monoxide',
  wrong: ['coke', 'hydrogen', 'limestone'],
  sol: 'At these temperatures the CO → CO₂ line lies below the iron oxide lines, so CO reduces them — option (@K).',
  d: 1, c: 'recall', t,
}));
add('zn-mcq', mcq({
  stem: 'Zinc oxide is reduced with coke at about 1673 K. Which feature of the Ellingham diagram explains why such a high temperature is needed?',
  right: 'The C → CO line falls below the ZnO line only at high temperature',
  wrong: ['The ZnO line slopes downwards', 'Zinc is a liquid below 700 K', 'The CO → CO₂ line is horizontal'],
  sol: 'Reduction becomes feasible only where carbon’s line lies below zinc’s — option (@K).',
  d: 3, c: 'application', t,
}));
add('gibbs-tf', tf({
  stem: 'A metal oxide can be reduced by carbon at any temperature at which the overall ΔG for the reduction is negative.',
  key: 't',
  sol: 'True, thermodynamically; in practice the rate (kinetics) must also be fast enough, which the Ellingham diagram does not show.',
  d: 2, c: 'understanding', t,
}));
add('ellingham-ar', ar({
  a: 'Most lines for the formation of metal oxides on an Ellingham diagram slope upwards.',
  r: 'In these reactions oxygen gas is used up, so ΔS is negative and −TΔS becomes more positive as T rises.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 3, c: 'analysis', t,
}));
add('kinetics-ar', ar({
  a: 'An Ellingham diagram can be used to predict how fast a metal oxide will be reduced.',
  r: 'An Ellingham diagram shows how ΔG° of oxide formation changes with temperature.',
  key: 'd',
  sol: 'A is false (thermodynamics says nothing about rate); R is true — option (d).',
  d: 2, c: 'understanding', t,
}));
add('ell-num', num({
  stem: r`At 1200 K, $\Delta G^\circ$ for $\ce{2Fe + O2 -> 2FeO}$ is $-371\ \text{kJ}$ and for $\ce{2C + O2 -> 2CO}$ is $-433\ \text{kJ}$. What is $\Delta G^\circ$, in kJ, for $\ce{2FeO + 2C -> 2Fe + 2CO}$?`,
  value: -62, tol: 0.5, unit: 'kJ',
  sol: r`Subtract the first equation from the second: $\Delta G^\circ = -433 - (-371) = -62$, so $-62\ \text{kJ}$ (feasible).`,
  scheme: [['−62 kJ', 1]],
  d: 3, c: 'application', t,
}), () => (-433 - -371 === -62) || 'ell');
add('ellingham-short', short({
  marks: 2,
  stem: 'Using an Ellingham diagram, explain why carbon monoxide is a better reducing agent than carbon for FeO below about 1000 K, while carbon is better above it.',
  model: 'Below about 1000 K the 2CO + O₂ → 2CO₂ line lies below the FeO line, while the C → CO line lies above it, so only CO can reduce FeO. The C → CO line slopes downwards and falls below the FeO line above about 1000 K, so carbon then becomes the better reducing agent.',
  sol: 'Compare line positions above and below 1000 K.',
  scheme: [['Below 1000 K: CO line below FeO', 1], ['Above 1000 K: C line falls lowest', 1]],
  d: 3, c: 'analysis', t,
}));
add('thermo-short3', short({
  marks: 3,
  stem: 'A metal oxide MO has ΔH° = +350 kJ and ΔS° = +190 J K⁻¹ for its reduction by carbon, MO + C → M + CO. Estimate the minimum temperature above which the reduction becomes feasible, and explain why heating helps.',
  model: 'Feasibility needs ΔG° = ΔH° − TΔS° < 0, so T > ΔH°/ΔS° = 350000 ÷ 190 ≈ 1842 K, about 1840 K. The reaction produces CO gas from solids, so ΔS° is positive; as T rises, the −TΔS° term becomes more negative and eventually outweighs the positive ΔH°.',
  sol: 'T > ΔH/ΔS ≈ 1840 K; positive ΔS.',
  scheme: [['Condition ΔG < 0 and T = ΔH/ΔS', 1], ['≈ 1840 K', 1], ['Positive ΔS explains effect of heating', 1]],
  d: 4, c: 'analysis', t,
}));

// ---------------------------------------------------------------- iron, copper, zinc
add('pig-mcq', mcq({
  stem: 'Pig iron from the blast furnace contains about:',
  right: '4% carbon',
  wrong: ['0.1% carbon', '15% carbon', '40% carbon'],
  sol: 'Pig iron has about 4% carbon and small amounts of S, P, Si, Mn — option (@K).',
  d: 1, c: 'recall', t,
}));
add('matte-mcq', mcq({
  stem: 'In the extraction of copper, silica is added to the roasted ore in the smelting furnace in order to:',
  right: 'remove iron oxide as iron silicate slag',
  wrong: ['reduce Cu₂O to copper', 'oxidise Cu₂S to Cu₂O', 'lower the melting point of copper'],
  sol: 'FeO + SiO₂ → FeSiO₃ (slag), leaving copper matte — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('blister-mcq', mcq({
  stem: 'Blister copper gets its name because:',
  right: 'SO₂ escaping as the copper solidifies leaves blisters on its surface',
  wrong: ['it contains about 50% copper', 'it is made by electrolysis', 'it is coated with copper carbonate'],
  sol: 'Self-reduction releases SO₂, which forms blisters — option (@K).',
  d: 1, c: 'recall', t,
}));
add('self-fill', fill({
  stem: 'In the converter, Cu₂O reacts with Cu₂S to give copper and SO₂. This is called ___-reduction.',
  acc: [['self', 'auto']],
  sol: '**Self**-reduction (auto-reduction): 2Cu₂O + Cu₂S → 6Cu + SO₂.',
  d: 1, c: 'recall', t,
}));
add('iron-short', short({
  marks: 2, wl: null,
  stem: 'Write equations for (a) the formation of carbon monoxide at the bottom of the blast furnace and (b) the reduction of Fe₃O₄ by carbon monoxide.',
  model: r`(a) $\ce{C + O2 -> CO2}$, then $\ce{CO2 + C -> 2CO}$

(b) $\ce{Fe3O4 + 4CO -> 3Fe + 4CO2}$`,
  sol: 'Balanced equations.',
  scheme: [['(a) CO formation', 1], ['(b) Reduction of Fe₃O₄', 1]],
  d: 2, c: 'understanding', t,
}));
add('copper-short3', short({
  marks: 3,
  stem: 'Outline how copper is obtained from roasted copper pyrites, naming the products formed at each stage, with an equation for the self-reduction step.',
  model: 'The roasted ore is heated with silica in a furnace; iron oxide combines with silica to form iron silicate slag, FeO + SiO₂ → FeSiO₃, leaving copper matte, mainly Cu₂S with a little FeS. The matte is transferred to a converter and air is blown through it; some Cu₂S is oxidised to Cu₂O, 2Cu₂S + 3O₂ → 2Cu₂O + 2SO₂, which then reacts with the remaining Cu₂S: 2Cu₂O + Cu₂S → 6Cu + SO₂. The product is blister copper.',
  sol: 'Smelting to matte; converter; self-reduction.',
  scheme: [['Smelting with silica, slag and matte', 1], ['Partial oxidation of Cu₂S', 1], ['Self-reduction equation and blister copper', 1]],
  d: 3, c: 'understanding', t,
}));
add('furnace-long', long({
  stem: '(a) Describe the reactions in the different temperature zones of a blast furnace used to extract iron from haematite.\n\n(b) Explain the role of limestone.\n\n(c) Use an Ellingham diagram to explain why both carbon and carbon monoxide act as reducing agents in the furnace.',
  model: 'Haematite, coke and limestone are fed in at the top and hot air is blown in near the bottom. At the bottom, coke burns: C + O₂ → CO₂, and at about 2000 K the CO₂ is reduced by more coke, CO₂ + C → 2CO. In the upper zone, at 500–800 K, carbon monoxide reduces the iron oxides: 3Fe₂O₃ + CO → 2Fe₃O₄ + CO₂ and Fe₃O₄ + 4CO → 3Fe + 4CO₂. Lower down, at 900–1500 K, FeO is reduced by carbon and CO: FeO + C → Fe + CO. Limestone decomposes, CaCO₃ → CaO + CO₂, and lime removes silica as calcium silicate slag. Below about 1000 K the CO → CO₂ line lies below the FeO line, so CO reduces it; above 1000 K the C → CO line falls below the FeO line, so carbon reduces it.',
  sol: 'Zones and equations; flux; line positions.',
  scheme: [['(a) Bottom zone reactions', 1], ['(a) Upper and middle zone reductions', 1.5], ['(b) Limestone as flux, slag', 1], ['(c) Ellingham reasoning for C and CO', 1.5]],
  d: 3, c: 'understanding', t,
}));

// ---------------------------------------------------------------- electrochemistry and aluminium
add('cryolite-mcq', mcq({
  stem: 'In the Hall–Héroult process, alumina is dissolved in molten cryolite mainly to:',
  right: 'lower the melting point of the electrolyte and increase its conductivity',
  wrong: ['supply fluorine to the cathode', 'reduce the alumina chemically', 'protect the graphite anodes from oxygen'],
  sol: 'Pure Al₂O₃ melts above 2300 K and conducts poorly; the cryolite mixture works at about 1250 K — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('anode-mcq', mcq({
  stem: 'Why must the graphite anodes in an aluminium cell be replaced regularly?',
  right: 'Oxygen liberated at the anodes burns them to CO and CO₂',
  wrong: ['Aluminium deposits on the anodes', 'Cryolite dissolves graphite', 'The anodes are reduced to carbide'],
  sol: 'Oxide ions are oxidised to O₂ at the anode, which reacts with carbon — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('emf-mcq', mcq({
  stem: r`For a non-spontaneous reduction, $\Delta G^\circ = +193\ \text{kJ}$ with $n = 2$. The minimum voltage that must be applied is about ($F = 96500\ \text{C mol}^{-1}$):`,
  right: '1.0 V',
  wrong: ['0.5 V', '2.0 V', '193 V'],
  sol: r`$E^\circ = -\Delta G^\circ / nF = -193000 / (2 \times 96500) = -1.0\ \text{V}$, so at least 1.0 V must be applied — option (@K).`,
  d: 3, c: 'application', t,
}));
add('al-num', num({
  marks: 2,
  stem: r`An aluminium cell carries a current of $250\ \text{A}$ for $40$ minutes. What mass of aluminium ($M = 27$), in grams, is deposited? ($F = 96500\ \text{C mol}^{-1}$)`,
  value: 56, tol: 0.2, unit: 'g',
  sol: r`$Q = It = 250 \times 2400 = 600000\ \text{C}$; moles of electrons $= 600000 \div 96500 = 6.218$; moles of Al $= 6.218 \div 3 = 2.073$; mass $= 2.073 \times 27 = 56.0$, so $56.0\ \text{g}$.`,
  scheme: [['Q = 600 000 C and moles of electrons', 1], ['Divide by 3; 56.0 g', 1]],
  d: 3, c: 'application', t,
}), () => near(((250 * 2400) / 96500 / 3) * 27, 56, 0.005) || 'al');
add('cu-num', num({
  stem: r`In refining copper, a current of $2.0\ \text{A}$ is passed for $9650\ \text{s}$. What mass of copper ($M = 63.5$), in grams, is deposited on the cathode?`,
  value: 6.35, tol: 0.03, unit: 'g',
  sol: r`$Q = 2.0 \times 9650 = 19300\ \text{C}$; moles of electrons $= 19300 \div 96500 = 0.2$; $\ce{Cu^{2+} + 2e- -> Cu}$: moles of Cu $= 0.1$; mass $= 0.1 \times 63.5 = 6.35$, so $6.35\ \text{g}$.`,
  scheme: [['6.35 g', 1]],
  d: 2, c: 'application', t,
}), () => near((2 * 9650) / 96500 / 2 * 63.5, 6.35) || 'cu');
add('emf-num', num({
  stem: r`$\Delta G^\circ$ for a reduction is $+579\ \text{kJ}$ and $n = 3$. What is $E^\circ$, in volts? ($F = 96500\ \text{C mol}^{-1}$)`,
  value: -2, tol: 0.02, unit: 'V',
  sol: r`$E^\circ = -\Delta G^\circ \div nF = -579000 \div 289500 = -2.0$, so $-2.0\ \text{V}$; at least 2.0 V must be applied.`,
  scheme: [['−2.0 V', 1]],
  d: 3, c: 'application', t,
}), () => near(-579000 / (3 * 96500), -2) || 'emf');
add('cl-tf', tf({
  stem: 'Chlorine is obtained from brine by a reduction process.',
  key: 'f',
  sol: 'False. Chloride ions lose electrons at the anode, so chlorine is obtained by oxidation (electrolysis of brine).',
  d: 1, c: 'understanding', t,
}));
add('al-short', short({
  marks: 2,
  stem: 'Write the cathode reaction and the overall reaction in the Hall–Héroult cell, and explain why aluminium is not obtained by electrolysing an aqueous solution of an aluminium salt.',
  model: 'Cathode: Al³⁺ + 3e⁻ → Al. Overall: 2Al₂O₃ + 3C → 4Al + 3CO₂. In aqueous solution, water is reduced to hydrogen much more easily than Al³⁺ is reduced to aluminium, so hydrogen gas would form at the cathode instead of aluminium.',
  sol: 'Equations; water reduced preferentially.',
  scheme: [['Cathode and overall equations', 1], ['Water reduced in preference to Al³⁺', 1]],
  d: 3, c: 'application', t,
}));
add('elec-short3', short({
  marks: 3,
  stem: 'Explain, using ΔG° = −nFE°, how electrolysis can bring about a reduction that is not spontaneous. Illustrate with the extraction of aluminium, giving the role of cryolite.',
  model: 'If ΔG° for a reduction is positive, E° is negative and the reaction will not occur on its own. Applying an external voltage greater than this E° supplies the energy needed, so the non-spontaneous reduction takes place at the cathode. Aluminium oxide cannot be reduced by carbon, so pure Al₂O₃ is electrolysed. It is dissolved in molten cryolite, which lowers the working temperature to about 1250 K and improves conductivity; Al³⁺ is reduced at the cathode, Al³⁺ + 3e⁻ → Al, while O₂ at the anode burns the graphite to CO₂.',
  sol: 'Negative E°, external voltage; Hall–Héroult.',
  scheme: [['ΔG positive, E negative; external voltage', 1], ['Electrolysis of alumina with electrode reactions', 1], ['Role of cryolite', 1]],
  d: 3, c: 'understanding', t,
}));

// ---------------------------------------------------------------- refining and uses
add('refining-mcq', mcq({
  stem: 'Which method is used to obtain silicon of very high purity for computer chips?',
  right: 'Zone refining',
  wrong: ['Liquation', 'Distillation', 'Calcination'],
  sol: 'Impurities concentrate in the molten zone and are swept to the end — option (@K).',
  d: 1, c: 'recall', t,
}));
add('mond-mcq', mcq({
  stem: 'In the Mond process, nickel is purified because:',
  right: 'it forms volatile Ni(CO)₄, which decomposes on stronger heating to pure nickel',
  wrong: ['nickel has a low melting point and flows away from impurities', 'nickel dissolves in cryolite', 'nickel is magnetic'],
  sol: 'Vapour phase refining: Ni + 4CO → Ni(CO)₄ at 330 K; decomposed at 450–470 K — option (@K).',
  d: 2, c: 'understanding', t,
}));
add('anodemud-mcq', mcq({
  stem: 'During electrolytic refining of crude copper containing small amounts of silver, gold and zinc, the anode mud contains:',
  right: 'silver and gold',
  wrong: ['zinc only', 'copper only', 'zinc and copper'],
  sol: 'Less reactive Ag and Au do not dissolve and fall as anode mud; Zn dissolves and stays in solution — option (@K).',
  d: 3, c: 'application', t,
}));
add('liquation-mcq', mcq({
  stem: 'Crude tin contains infusible impurities. Which refining method suits it?',
  right: 'Liquation',
  wrong: ['Zone refining', 'Mond process', 'Froth flotation'],
  sol: 'Tin melts easily and flows down a sloping hearth, leaving the impurities behind — option (@K).',
  d: 2, c: 'application', t,
}));
add('refine-match', match({
  stem: 'Match each metal with a suitable refining method.',
  pairs: [
    ['Zinc', 'Distillation'],
    ['Zirconium', 'van Arkel method'],
    ['Germanium', 'Zone refining'],
    ['Copper', 'Electrolytic refining'],
  ],
  order: [1, 2, 3, 0],
  sol: 'Zn → distillation; Zr → van Arkel; Ge → zone refining; Cu → electrolysis.',
  d: 2, c: 'application', t,
}));
add('zone-ar', ar({
  a: 'Zone refining is used to obtain semiconductors of very high purity.',
  r: 'Impurities are more soluble in the molten metal than in the solid metal.',
  key: 'a',
  sol: 'Both are true and R explains A: impurities travel with the molten zone — option (a).',
  d: 2, c: 'understanding', t,
}));
add('refine-short', short({
  marks: 2,
  stem: 'In the electrolytic refining of copper, name the anode, the cathode and the electrolyte, and state what happens to an iron impurity.',
  model: 'The anode is a block of impure copper, the cathode a thin strip of pure copper, and the electrolyte acidified copper sulfate solution. Iron, being more reactive than copper, dissolves at the anode as Fe²⁺ and stays in solution; it is not deposited at the cathode.',
  sol: 'Electrodes and electrolyte; Fe stays in solution.',
  scheme: [['Anode, cathode, electrolyte', 1], ['Iron dissolves and remains in solution', 1]],
  d: 3, c: 'application', t,
}));
add('vapour-short', short({
  marks: 2,
  stem: 'State two conditions a metal must satisfy to be refined by a vapour phase method, and name one example of the method.',
  model: 'The metal must form a volatile compound with a readily available reagent, and the volatile compound must be easy to decompose so that the metal is recovered. Example: the Mond process for nickel (via Ni(CO)₄) or the van Arkel method for zirconium (via ZrI₄).',
  sol: 'Volatile compound; easily decomposed; example.',
  scheme: [['Two conditions', 1], ['Named example', 1]],
  d: 2, c: 'understanding', t,
}));
add('uses-short', short({
  marks: 2,
  stem: 'Give one use each of aluminium, copper, zinc and steel, linking each to a property of the metal.',
  model: 'Aluminium is light and a good conductor: power cables and aircraft alloys. Copper is an excellent, ductile conductor: electrical wires. Zinc is more reactive than iron: galvanising iron against rusting. Steel is strong: buildings and bridges.',
  sol: 'Four uses with properties.',
  scheme: [['Two uses with properties', 1], ['Two more uses with properties', 1]],
  d: 2, c: 'application', t,
}));
add('refine-short3', short({
  marks: 3,
  stem: 'Explain the principle of (a) zone refining, (b) the van Arkel method and (c) chromatography as methods of purifying elements.',
  model: '(a) Zone refining: impurities are more soluble in the melt than in the solid, so a moving molten zone carries them to one end of the rod, which is cut off. (b) van Arkel method: the crude metal forms a volatile iodide such as ZrI₄, which decomposes on a hot tungsten filament to give pure metal. (c) Chromatography: components are adsorbed to different extents, so they move through a column at different rates and are collected separately.',
  sol: 'Three principles.',
  scheme: [['(a) Zone refining', 1], ['(b) van Arkel', 1], ['(c) Chromatography', 1]],
  d: 2, c: 'understanding', t,
}));
add('concentration-long', long({
  stem: '(a) Describe froth flotation, naming the substances added and their roles.\n\n(b) Describe the leaching of silver ore with sodium cyanide and the recovery of silver, with equations.\n\n(c) Distinguish calcination from roasting, with one equation for each.',
  model: 'Powdered sulphide ore is mixed with water, a collector such as a xanthate, which makes the ore particles water-repellent, and a frother such as pine oil, which stabilises the froth; air is blown through while stirring. Ore particles cling to air bubbles and rise into the froth, which is skimmed off, while gangue sinks; a depressant such as NaCN can keep one sulphide from floating. Silver is leached with dilute NaCN in air: 4Ag + 8CN⁻ + 2H₂O + O₂ → 4[Ag(CN)₂]⁻ + 4OH⁻. Zinc then displaces silver: 2[Ag(CN)₂]⁻ + Zn → [Zn(CN)₄]²⁻ + 2Ag. Calcination is heating in limited air or none to remove volatile matter, e.g. ZnCO₃ → ZnO + CO₂. Roasting is heating in excess air below the melting point, converting sulphides into oxides, e.g. 2ZnS + 3O₂ → 2ZnO + 2SO₂.',
  sol: 'Flotation reagents; cyanide leaching; calcination vs roasting.',
  scheme: [['(a) Froth flotation with roles of reagents', 2], ['(b) Leaching and displacement equations', 1.5], ['(c) Distinction with equations', 1.5]],
  d: 3, c: 'understanding', t,
}));
add('extract-long', long({
  stem: '(a) Describe the leaching of bauxite to obtain pure alumina, with equations.\n\n(b) Describe the electrolytic extraction of aluminium from alumina.\n\n(c) Why can aluminium not be extracted by heating alumina with carbon, while zinc oxide can be reduced by carbon?',
  model: 'Bauxite is digested with hot concentrated NaOH under pressure; Al₂O₃ dissolves, Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄], while Fe₂O₃ is filtered off. CO₂ precipitates hydrated alumina, which is heated at about 1470 K to pure Al₂O₃. Alumina is dissolved in molten cryolite with CaF₂ at about 1250 K, lowering the melting point and improving conductivity. Aluminium deposits at the carbon-lined steel cathode, Al³⁺ + 3e⁻ → Al, while oxygen burns the graphite anodes to CO and CO₂. On the Ellingham diagram the Al₂O₃ line lies below the carbon lines at all practical temperatures, so reduction by carbon has positive ΔG; the C → CO line falls below the ZnO line at high temperature, so coke reduces ZnO at about 1673 K.',
  sol: 'Bayer process; Hall–Héroult; Ellingham comparison.',
  scheme: [['(a) Leaching and precipitation with equation', 1.5], ['(b) Electrolysis with cryolite and electrode reactions', 2], ['(c) Ellingham comparison', 1.5]],
  d: 3, c: 'understanding', t,
}));
add('refining-long', long({
  stem: '(a) Name and explain three refining methods suitable for metals with special physical properties (low boiling point, low melting point, high purity required for semiconductors).\n\n(b) Describe the electrolytic refining of copper, explaining what happens to more reactive and less reactive impurities.\n\n(c) Describe the Mond process with equations.',
  model: 'Zinc and mercury, with low boiling points, are refined by distillation; tin, with a low melting point, by liquation, flowing away from infusible impurities; silicon and germanium by zone refining, in which a moving molten zone sweeps impurities to one end. In electrolytic refining, impure copper is the anode, pure copper the cathode and acidified CuSO₄ the electrolyte; copper dissolves at the anode and deposits on the cathode. More reactive impurities (Fe, Zn) stay in solution; less reactive ones (Ag, Au) fall as anode mud. In the Mond process, nickel is heated with CO at about 330 K to form volatile Ni(CO)₄, Ni + 4CO → Ni(CO)₄, which decomposes at 450–470 K to pure nickel and CO.',
  sol: 'Three methods; electrolytic refining; Mond.',
  scheme: [['(a) Three methods with principles', 2], ['(b) Electrolytic refining and impurities', 1.5], ['(c) Mond process', 1.5]],
  d: 3, c: 'understanding', t,
}));
add('ore-long', long({
  stem: 'A mineral sample contains mainly zinc blende with silica and some iron sulphide. Plan the steps to obtain pure zinc from it: (a) concentration; (b) conversion to oxide; (c) reduction, with the conditions chosen and the reason; (d) refining. Write equations where possible.',
  model: '(a) Concentrate by froth flotation: powdered ore is mixed with water, pine oil and a collector, and air is blown in; zinc blende particles rise in the froth while silica sinks. If iron or lead sulphides interfere, a suitable depressant can be used to separate the sulphides. (b) Roast the concentrated ore in excess air to convert the sulphide into oxide: 2ZnS + 3O₂ → 2ZnO + 2SO₂; the SO₂ can be used to make sulfuric acid. (c) Reduce zinc oxide with coke at about 1673 K: ZnO + C → Zn + CO. A high temperature is needed because the C → CO line lies below the ZnO line only at high temperature; zinc, which boils at about 1180 K, distils off as vapour and is condensed. (d) Refine the crude zinc by distillation, because of its low boiling point, or by electrolysis.',
  sol: 'Flotation, roasting, coke at 1673 K, distillation.',
  scheme: [['(a) Froth flotation', 1], ['(b) Roasting with equation', 1], ['(c) Reduction with condition and reason', 2], ['(d) Refining', 1]],
  d: 4, c: 'application', t,
}));

// ---------------------------------------------------------------- case-based
add('bauxite-case', mk.case({
  passage: 'An aluminium plant in Odisha receives bauxite containing about 55% Al₂O₃, with Fe₂O₃ and SiO₂ as impurities. The ore is digested with hot concentrated NaOH; the red mud left behind is stored in ponds. Pure alumina obtained from the solution is electrolysed in cells containing molten cryolite. Each cell runs at a current of 150 kA, and the plant buys electricity at a high price, so the managers track the energy used per kilogram of aluminium. (Al = 27; F = 96500 C mol⁻¹)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The red colour of the mud left after digestion is mainly due to:',
      right: 'Fe₂O₃, which does not dissolve in NaOH',
      wrong: ['Al₂O₃, which does not dissolve in NaOH', 'Na[Al(OH)₄]', 'cryolite'],
      sol: 'Iron(III) oxide is basic, does not dissolve and stays in the residue — option (@K).',
      d: 2, c: 'application', t,
    })),
    part('b', num({
      stem: 'What mass of aluminium, in kilograms, is deposited by one cell in one hour?',
      value: 50.4, tol: 0.3, unit: 'kg',
      sol: r`$Q = 150000 \times 3600 = 5.4 \times 10^{8}\ \text{C}$; moles of electrons $= 5.4 \times 10^{8} \div 96500 = 5596$; moles of Al $= 5596 \div 3 = 1865$; mass $= 1865 \times 27 = 50360\ \text{g}$; in kilograms $50360 \div 1000 = 50.4$ (to three figures), so $50.4\ \text{kg}$.`,
      scheme: [['50.4 kg', 1]],
      d: 3, c: 'application', t,
    })),
    part('c', short({
      marks: 2,
      stem: 'Why is the electrolysis carried out in molten cryolite instead of molten alumina alone?',
      model: 'Pure alumina melts above about 2300 K, which would need enormous energy and would damage the cell, and its melt conducts poorly. Dissolved in molten cryolite (with some CaF₂), it can be electrolysed at about 1250 K, and the melt conducts electricity better, saving energy.',
      sol: 'Lower temperature; better conductivity.',
      scheme: [['Lower melting point/working temperature', 1], ['Better conductivity, saves energy', 1]],
      d: 2, c: 'understanding', t,
    }), [
      short({
        marks: 2,
        stem: 'Suggest why aluminium plants are often built near hydroelectric power stations, and why recycling aluminium cans saves so much energy.',
        model: 'Electrolysis of alumina needs a very large, continuous supply of electrical energy, so plants are sited where electricity is cheap and plentiful. Recycling only requires melting the metal, which avoids both the energy-intensive Bayer process and electrolysis, so it uses only a small fraction of the energy.',
        sol: 'Energy for electrolysis; recycling avoids it.',
        scheme: [['Electrolysis needs huge cheap electricity', 1], ['Recycling avoids extraction energy', 1]],
        d: 3, c: 'analysis', t,
      }),
    ]),
  ],
}), () => near(((150000 * 3600) / 96500 / 3) * 27 / 1000, 50.4, 0.005) || 'bauxite');
add('copper-case', mk.case({
  passage: 'At a copper smelter in Jharkhand, concentrated copper pyrites (CuFeS₂) is roasted, then smelted with silica to form a matte and a slag. The matte is blown with air in a converter to give blister copper, about 98% pure. The blister copper is cast into anodes and refined electrolytically; the anode mud is sold because it contains silver and gold. SO₂ from roasting and converting is captured to make sulfuric acid.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the slag formed when the roasted ore is smelted with silica?',
      right: 'FeSiO₃',
      wrong: ['CaSiO₃', 'Cu₂S', 'CuSiO₃'],
      sol: 'FeO + SiO₂ → FeSiO₃ — option (@K).',
      d: 1, c: 'recall', t,
    })),
    part('b', num({
      stem: 'In the refinery, a cell runs at 965 A for 10 000 s. What mass of copper (M = 63.5), in kilograms, is deposited on its cathodes?',
      value: 3.175, tol: 0.01, unit: 'kg',
      sol: r`$Q = 965 \times 10000 = 9.65 \times 10^{6}\ \text{C}$; moles of electrons $= 9.65 \times 10^{6} \div 96500 = 100$; moles of Cu $= 50$; mass $= 50 \times 63.5 = 3175\ \text{g}$; in kilograms $3175 \div 1000 = 3.175$, so $3.175\ \text{kg}$.`,
      scheme: [['3.175 kg', 1]],
      d: 2, c: 'application', t,
    })),
    part('c', short({
      marks: 2,
      stem: 'Write the two reactions in the converter that turn matte into copper, and explain the name blister copper.',
      model: '2Cu₂S + 3O₂ → 2Cu₂O + 2SO₂, then 2Cu₂O + Cu₂S → 6Cu + SO₂ (self-reduction). As the copper solidifies, the SO₂ gas escaping from it leaves blisters on the surface, hence blister copper.',
      sol: 'Two equations; SO₂ blisters.',
      scheme: [['Two balanced equations', 1], ['SO₂ escaping forms blisters', 1]],
      d: 2, c: 'understanding', t,
    }), [
      short({
        marks: 2,
        stem: 'Why is the anode mud valuable, and why are zinc and iron impurities not found in it?',
        model: 'Silver and gold are less reactive than copper, so they do not dissolve at the anode and fall as anode mud, from which they are recovered. Zinc and iron are more reactive than copper, so they dissolve as ions and remain in solution rather than falling as mud.',
        sol: 'Noble metals in mud; reactive metals dissolve.',
        scheme: [['Ag and Au less reactive, collect as mud', 1], ['Zn and Fe dissolve and stay in solution', 1]],
        d: 3, c: 'analysis', t,
      }),
    ]),
  ],
}), () => near((965 * 10000) / 96500 / 2 * 63.5 / 1000, 3.175) || 'copper');
add('ellingham-case', mk.case({
  passage: 'A student reads approximate values from an Ellingham diagram (ΔG° per mole of O₂, in kJ):\n\n| Reaction | 800 K | 1500 K |\n|---|---|---|\n| 2Fe + O₂ → 2FeO | −423 | −332 |\n| 2C + O₂ → 2CO | −363 | −486 |\n| 2CO + O₂ → 2CO₂ | −426 | −305 |\n| 4/3 Al + O₂ → 2/3 Al₂O₃ | −952 | −805 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'At 800 K, which can reduce FeO?',
      right: 'CO only',
      wrong: ['C only', 'Both C and CO', 'Neither C nor CO'],
      sol: 'At 800 K only the CO → CO₂ value (−426) is more negative than FeO (−423); C → CO (−363) is not — option (@K).',
      d: 3, c: 'analysis', t,
    })),
    part('b', num({
      stem: 'Calculate ΔG°, in kJ, for 2FeO + 2C → 2Fe + 2CO at 1500 K.',
      value: -154, tol: 0.5, unit: 'kJ',
      sol: r`$\Delta G^\circ = (-486) - (-332) = -154$, so $-154\ \text{kJ}$.`,
      scheme: [['−154 kJ', 1]],
      d: 3, c: 'application', t,
    })),
    part('c', short({
      marks: 2,
      stem: 'Use the data to explain whether carbon can reduce Al₂O₃ at 1500 K.',
      model: 'For 2/3 Al₂O₃ + 2C → 4/3 Al + 2CO, ΔG° = (−486) − (−805) = +319 kJ, which is positive, so the reduction is not feasible at 1500 K. The Al₂O₃ line lies far below the carbon line, which is why aluminium is extracted by electrolysis.',
      sol: 'ΔG = +319 kJ, not feasible.',
      scheme: [['ΔG° = +319 kJ', 1], ['Not feasible; electrolysis used', 1]],
      d: 3, c: 'analysis', t,
    }), [
      short({
        marks: 2,
        stem: 'Explain why ΔG° for 2C + O₂ → 2CO becomes more negative between 800 K and 1500 K, while that for 2Fe + O₂ → 2FeO becomes less negative.',
        model: 'For 2C + O₂ → 2CO, one mole of gas gives two, so ΔS is positive and −TΔS becomes more negative as T rises. For 2Fe + O₂ → 2FeO, oxygen gas is used up, so ΔS is negative and −TΔS becomes more positive with T.',
        sol: 'Sign of ΔS in each reaction.',
        scheme: [['Positive ΔS for C → CO', 1], ['Negative ΔS for Fe → FeO', 1]],
        d: 3, c: 'analysis', t,
      }),
    ]),
  ],
}), () => ((-486 - -332) === -154 && (-486 - -805) === 319) || 'ell-case');
add('gold-case', mk.case({
  passage: 'A small mine in Karnataka processes low-grade ore containing about 5 g of gold per tonne. The crushed ore is stirred with dilute sodium cyanide solution while air is bubbled through, forming the soluble complex [Au(CN)₂]⁻. The solution is filtered and zinc dust is added, precipitating gold. Strict rules govern the handling and disposal of cyanide. (Au = 197; Zn = 65)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the role of air in the leaching step?',
      right: 'Oxygen oxidises gold to Au⁺, which forms the cyanide complex',
      wrong: ['Air stirs the mixture and has no chemical role', 'Nitrogen forms a complex with gold', 'Oxygen reduces cyanide ions'],
      sol: '4Au + 8CN⁻ + 2H₂O + O₂ → 4[Au(CN)₂]⁻ + 4OH⁻: oxygen is the oxidising agent — option (@K).',
      d: 2, c: 'understanding', t,
    })),
    part('b', num({
      stem: 'What minimum mass of zinc, in grams, is needed to precipitate the 5 g of gold present in one tonne of ore?',
      value: 0.825, tol: 0.005, unit: 'g',
      sol: r`$\ce{2[Au(CN)2]- + Zn -> Zn(CN)4^2- + 2Au}$: 1 mol Zn per 2 mol Au. Moles of Au $= 5 \div 197 = 0.02538$; moles of Zn $= 0.02538 \div 2 = 0.01269$; mass $= 0.01269 \times 65 = 0.825$, so $0.825\ \text{g}$.`,
      scheme: [['1 : 2 ratio; 0.825 g', 1]],
      d: 3, c: 'application', t,
    })),
    part('c', short({
      marks: 2,
      stem: 'Why is leaching, rather than froth flotation or hydraulic washing, used for this ore?',
      model: 'The gold is present in tiny amounts as scattered particles of native metal, not as a sulphide, so froth flotation and gravity methods would recover very little. Cyanide leaching dissolves the gold selectively, so even a few grams per tonne can be extracted profitably.',
      sol: 'Low grade, native metal; selective dissolution.',
      scheme: [['Very low grade, fine native gold', 1], ['Leaching dissolves gold selectively', 1]],
      d: 3, c: 'analysis', t,
    }), [
      short({
        marks: 2,
        stem: 'Write the equation for recovering gold with zinc and explain why zinc can displace gold.',
        model: '2[Au(CN)₂]⁻ + Zn → [Zn(CN)₄]²⁻ + 2Au. Zinc is a much stronger reducing agent (more reactive) than gold, so it gives electrons to the gold complex and is itself oxidised to a zinc complex.',
        sol: 'Equation; zinc more reactive.',
        scheme: [['Balanced equation', 1], ['Zinc more reactive, reduces gold', 1]],
        d: 2, c: 'understanding', t,
      }),
    ]),
  ],
}), () => near((5 / 197 / 2) * 65, 0.825, 0.005) || 'gold');
