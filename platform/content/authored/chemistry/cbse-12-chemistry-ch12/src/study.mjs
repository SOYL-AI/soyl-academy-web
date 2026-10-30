// ch12 Isolation of Elements — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V, ellingham } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'General Principles and Processes of Isolation of Elements — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Occurrence and concentration of ores',
      r`**Mineral:** naturally occurring compound of a metal. **Ore:** a mineral from which the metal is extracted **profitably**. **Gangue:** earthy impurities. Steps of metallurgy: concentration → conversion to oxide → reduction → refining.

**Concentration (benefaction):**
- **Hydraulic washing** (gravity separation): ore heavier than gangue (tin stone, lead ores).
- **Magnetic separation:** one component magnetic (magnetite, chromite; wolframite from tin stone).
- **Froth flotation:** sulphide ores; **collectors** (xanthates, fatty acids) make ore water-repellent, **frothers** (pine oil, cresols) stabilise froth, **depressants** (NaCN) keep one sulphide (ZnS) down while another (PbS) floats.
- **Leaching:** ore dissolved selectively. Bauxite: $\ce{Al2O3 + 2NaOH + 3H2O -> 2Na[Al(OH)4]}$; alumina precipitated by CO₂ and heated at 1470 K. Gold/silver: $\ce{4Au + 8CN- + 2H2O + O2 -> 4[Au(CN)2]- + 4OH-}$, then displaced by zinc.`,
      [kt('Ore', 'A mineral from which a metal can be extracted profitably.'), kt('Gangue', 'Earthy and rocky impurities present in an ore.'), kt('Froth flotation', 'Concentration of sulphide ores in which ore particles wetted by oil rise with air bubbles in a froth.'), kt('Leaching', 'Concentration by dissolving the ore in a suitable reagent, leaving gangue behind.')],
      [],
      V.froth,
      [1],
    ),
    sec(
      '2. Conversion to oxide; flux and slag',
      r`- **Calcination:** heating in limited air or none; removes CO₂, H₂O, volatile matter. $\ce{ZnCO3 -> ZnO + CO2}$; $\ce{Al2O3.2H2O -> Al2O3 + 2H2O}$.
- **Roasting:** heating in excess air below the melting point; sulphides → oxides. $\ce{2ZnS + 3O2 -> 2ZnO + 2SO2}$; $\ce{2PbS + 3O2 -> 2PbO + 2SO2}$. SO₂ is used for sulfuric acid.
- **Flux** converts leftover gangue into fusible **slag**: acidic gangue + basic flux ($\ce{CaO + SiO2 -> CaSiO3}$); basic gangue + acidic flux ($\ce{FeO + SiO2 -> FeSiO3}$).`,
      [kt('Calcination', 'Heating an ore in limited air or in the absence of air to remove volatile matter such as CO₂ or H₂O.'), kt('Roasting', 'Heating an ore in excess air below its melting point, converting sulphides into oxides.'), kt('Slag', 'The fusible product formed when a flux combines with gangue.')],
      [],
      table(['Process', 'Air', 'Ore type', 'By-product'], [['Calcination', 'Limited or none', 'Carbonate, hydrated oxide', 'CO₂, H₂O'], ['Roasting', 'Excess', 'Sulphide', 'SO₂']], 'Table comparing calcination and roasting'),
      [1],
    ),
    sec(
      '3. Thermodynamic principles; Ellingham diagram',
      r`Reduction of an oxide by a reducing agent is feasible when the overall $\Delta G < 0$. Coupling: $\ce{2M + O2 -> 2MO}$ ($\Delta G_1$) and $\ce{2C + O2 -> 2CO}$ ($\Delta G_2$) give $\ce{2MO + 2C -> 2M + 2CO}$ with $\Delta G = \Delta G_2 - \Delta G_1$, negative when the carbon line lies below the metal line.

**Ellingham diagram:** $\Delta G^\circ$ (per mol O₂) for oxide formation vs $T$.
- Metal oxide lines slope **upwards** ($\Delta S < 0$, gas consumed); kinks at melting or boiling points.
- $\ce{2C + O2 -> 2CO}$ slopes **downwards** ($\Delta S > 0$); $\ce{C + O2 -> CO2}$ is nearly flat; $\ce{2CO + O2 -> 2CO2}$ slopes upwards.
- An element whose line lies **below** another oxide’s line can reduce that oxide at that temperature. Carbon reduces FeO above about 1000 K and ZnO at higher temperatures, but not Al₂O₃ or MgO in practice.
- Limitation: it says nothing about rate (kinetics).`,
      [kt('Ellingham diagram', 'A plot of standard Gibbs energy of formation of oxides (per mole of O₂) against temperature, used to predict feasible reductions.')],
      [fm(r`\Delta G = \Delta H - T\Delta S`, 'Gibbs energy change')],
      ellingham,
      [1],
    ),
    sec(
      '4. Extraction of iron, copper, zinc and aluminium',
      r`- **Iron (blast furnace):** haematite + coke + limestone; hot air at the bottom. $\ce{C + O2 -> CO2}$, $\ce{CO2 + C -> 2CO}$; CO reduces iron oxides in the upper zone (500–800 K): $\ce{3Fe2O3 + CO -> 2Fe3O4 + CO2}$, $\ce{Fe3O4 + 4CO -> 3Fe + 4CO2}$; lower (900–1500 K): $\ce{FeO + C -> Fe + CO}$. Slag: $\ce{CaO + SiO2 -> CaSiO3}$. Pig iron about 4% C; cast iron about 3% C; wrought iron purest; steel.
- **Copper:** roast, then smelt with silica (FeO → FeSiO₃ slag), giving **matte** (Cu₂S + FeS). Converter: $\ce{2Cu2S + 3O2 -> 2Cu2O + 2SO2}$; self-reduction $\ce{2Cu2O + Cu2S -> 6Cu + SO2}$ → **blister copper**.
- **Zinc:** $\ce{ZnO + C -> Zn + CO}$ at about 1673 K; zinc distils off.
- **Aluminium (Hall–Héroult):** electrolysis of Al₂O₃ in molten cryolite (Na₃AlF₆) + CaF₂ at about 1250 K. Cathode (carbon-lined steel): $\ce{Al^{3+} + 3e- -> Al}$. Graphite anodes burn: $\ce{2Al2O3 + 3C -> 4Al + 3CO2}$.

**Electrochemical principle:** $\Delta G^\circ = -nFE^\circ$; a voltage greater than the required $E$ drives a non-spontaneous reduction. **Oxidation:** chlorine from brine, $\ce{2Cl- + 2H2O -> 2OH- + H2 + Cl2}$.`,
      [kt('Copper matte', 'Molten Cu₂S with some FeS formed when roasted copper ore is smelted with silica.'), kt('Blister copper', 'Copper from the converter, with a blistered surface caused by escaping SO₂.'), kt('Cryolite', 'Na₃AlF₆, the solvent for alumina in the Hall–Héroult cell; lowers the melting point and increases conductivity.')],
      [fm(r`\Delta G^\circ = -nFE^\circ`, 'Gibbs energy and cell potential'), fm(r`Q = It`, 'Charge passed')],
      flow('LR', [['a', 'Haematite + coke + limestone'], ['b', 'CO formed from coke'], ['c', 'Iron oxides reduced'], ['d', 'Pig iron + slag']], [['a', 'b', 'hot air'], ['b', 'c', '500–1500 K'], ['c', 'd']], 'Flow of the blast furnace from charge to pig iron and slag'),
      [1],
    ),
    sec(
      '5. Refining and uses',
      r`- **Distillation:** low-boiling metals (Zn, Hg).
- **Liquation:** low-melting metals (Sn) flow away from infusible impurities.
- **Electrolytic refining:** impure metal anode, pure metal cathode, salt solution electrolyte; Cu: $\ce{Cu -> Cu^{2+} + 2e-}$ (anode), $\ce{Cu^{2+} + 2e- -> Cu}$ (cathode). Ag, Au, Pt collect as **anode mud**.
- **Zone refining:** impurities more soluble in the melt; moving heater sweeps them to one end. Si, Ge, Ga, B, In of very high purity.
- **Vapour phase refining:** **Mond process** $\ce{Ni + 4CO ->[330 K] Ni(CO)4}$, decomposed at 450–470 K; **van Arkel method** $\ce{Zr + 2I2 -> ZrI4}$, decomposed on a hot tungsten filament (Zr, Ti).
- **Chromatography:** separates elements present in small amounts by differential adsorption.

**Uses:** Al — foil, cables, alloys; Cu — wires, pipes, brass, bronze, coins; Zn — galvanising, dry cells, brass; Fe — cast iron, steel and alloy steels.`,
      [kt('Anode mud', 'Insoluble, less reactive impurities (e.g. Ag, Au) that collect below the anode in electrolytic refining.'), kt('Zone refining', 'Purification by moving a molten zone along a rod; impurities travel with the melt.'), kt('Mond process', 'Refining of nickel through volatile Ni(CO)₄, formed and then decomposed.')],
      [],
      V.zone,
      [1],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling every mineral an ore, or naming cryolite as the ore of aluminium.
- Roasting carbonates or calcining sulphides.
- Saying the impure metal is the cathode in electrolytic refining.
- In Ellingham questions, ignoring the temperature or comparing the wrong pair of lines.
- Forgetting to divide by the number of electrons per ion in electrolysis calculations.

**How marks are usually awarded**
- 1-mark items: name an ore, a flux, a refining method or a reagent.
- Process descriptions (2–3 marks): reagents, conditions and a balanced equation for each step.
- Ellingham reasoning (2–3 marks): which line is lower, at what temperature, and the conclusion.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Mineral vs ore?', 'An ore is a mineral from which a metal can be extracted profitably.', 'definition', 1),
    fc(2, 'Gangue?', 'Earthy impurities in an ore.', 'definition', 1),
    fc(3, 'Ore of aluminium?', 'Bauxite.', 'fact', 1),
    fc(4, 'Two ores of iron?', 'Haematite, Fe₂O₃; magnetite, Fe₃O₄ (also siderite, FeCO₃).', 'fact', 1),
    fc(5, 'Ores of zinc?', 'Zinc blende ZnS, calamine ZnCO₃, zincite ZnO.', 'fact', 1),
    fc(6, 'Hydraulic washing uses…?', 'Difference in density between ore and gangue.', 'concept', 1),
    fc(7, 'Froth flotation is used for…?', 'Sulphide ores.', 'fact', 1),
    fc(8, 'Collector, frother, depressant?', 'Collector: xanthates/fatty acids. Frother: pine oil. Depressant: NaCN (keeps ZnS down).', 'fact', 1),
    fc(9, 'Leaching of bauxite?', 'Hot conc. NaOH dissolves Al₂O₃ as Na[Al(OH)₄]; CO₂ reprecipitates hydrated alumina.', 'concept', 1),
    fc(10, 'Leaching of gold?', 'Dilute NaCN + air gives [Au(CN)₂]⁻; zinc displaces gold.', 'concept', 1),
    fc(11, 'Calcination?', 'Heating with little or no air to remove CO₂/H₂O (carbonates, hydrated oxides).', 'definition', 1),
    fc(12, 'Roasting?', 'Heating in excess air below the melting point; sulphides → oxides + SO₂.', 'definition', 1),
    fc(13, 'Flux for silica gangue?', 'CaO (from limestone): CaO + SiO₂ → CaSiO₃.', 'formula', 1),
    fc(14, 'Condition for reduction?', 'Overall ΔG negative; reducing agent’s oxide line below the metal oxide line.', 'concept', 1),
    fc(15, 'Why does the 2C + O₂ → 2CO line slope down?', 'ΔS is positive (1 mol gas → 2 mol gas), so ΔG falls as T rises.', 'concept', 1),
    fc(16, 'Why do metal oxide lines slope up?', 'ΔS is negative (O₂ gas consumed).', 'concept', 1),
    fc(17, 'Carbon reduces FeO above about…?', '1000 K (where the C → CO line crosses below FeO).', 'fact', 1),
    fc(18, 'Main reducing agent in the upper blast furnace?', 'Carbon monoxide.', 'fact', 1),
    fc(19, 'Pig iron?', 'Iron from the blast furnace with about 4% carbon.', 'definition', 1),
    fc(20, 'Self-reduction in copper extraction?', '2Cu₂O + Cu₂S → 6Cu + SO₂.', 'formula', 1),
    fc(21, 'Why is it called blister copper?', 'Escaping SO₂ leaves blisters on the solidified copper.', 'concept', 1),
    fc(22, 'Roles of cryolite?', 'Lowers the melting point of the electrolyte and increases its conductivity.', 'concept', 1),
    fc(23, 'Why are graphite anodes replaced in Al extraction?', 'Oxygen formed at the anode burns them to CO and CO₂.', 'concept', 1),
    fc(24, 'ΔG and E?', 'ΔG° = −nFE°.', 'formula', 1),
    fc(25, 'Chlorine is obtained by…?', 'Oxidation: electrolysis of brine.', 'fact', 1),
    fc(26, 'Electrolytic refining of copper?', 'Impure Cu anode, pure Cu cathode, CuSO₄ + H₂SO₄ electrolyte; anode mud contains Ag, Au.', 'concept', 1),
    fc(27, 'Zone refining is used for…?', 'Semiconductor-grade Si, Ge, Ga.', 'example', 1),
    fc(28, 'Mond process?', 'Ni + 4CO → Ni(CO)₄ at 330 K; decomposed at 450–470 K to pure Ni.', 'formula', 1),
    fc(29, 'van Arkel method?', 'Zr or Ti + I₂ → volatile iodide, decomposed on a hot tungsten filament.', 'definition', 1),
    fc(30, 'Metal refined by liquation?', 'Tin (low melting point).', 'example', 1),
    fc(31, 'Exam tip: refining', 'Impure metal = anode; pure metal = cathode.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
