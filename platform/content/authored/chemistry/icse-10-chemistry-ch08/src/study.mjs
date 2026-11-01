// ICSE 10 Chemistry ch08 Metallurgy — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Metallurgy — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Occurrence of metals: minerals and ores',
      `Metals occur **native** (free: gold, platinum) or **combined** as oxides, sulphides, carbonates and other compounds.

- **Mineral:** a naturally occurring compound of a metal in the earth’s crust.
- **Ore:** a mineral from which the metal can be extracted **conveniently and profitably**. Every ore is a mineral; every mineral is not an ore (clay is a mineral of aluminium, not an ore).
- **Gangue (matrix):** the earthy impurities mixed with the ore.`,
      [kt('Ore', 'A mineral from which a metal can be extracted conveniently and profitably.'), kt('Gangue', 'The unwanted earthy or rocky material mixed with an ore.')],
      [],
      table(['Metal', 'Ores (formula)'], [['Iron', 'Haematite Fe₂O₃; magnetite Fe₃O₄'], ['Aluminium', 'Bauxite Al₂O₃·2H₂O; cryolite Na₃AlF₆; corundum Al₂O₃'], ['Zinc', 'Zinc blende ZnS; calamine ZnCO₃']], 'Table of the ores of iron, aluminium and zinc with formulae'),
      [1],
    ),
    sec(
      '2. Concentration (dressing) of the ore',
      `Concentration removes the gangue, using a property in which ore and gangue differ.

- **Hydraulic washing (gravity separation):** a stream of water washes away the light gangue; heavy ore particles remain (haematite).
- **Magnetic separation:** a magnetic roller separates magnetic ore from non-magnetic gangue (magnetite).
- **Froth flotation:** for **sulphide ores** (zinc blende, galena). Powdered ore + water + **pine oil**; air is blown in. Ore particles are wetted by oil and rise in the froth; gangue is wetted by water and sinks.
- **Chemical method:** bauxite is purified by **Baeyer’s process** (section 5).`,
      [kt('Froth flotation', 'Concentration of a sulphide ore in which oil-wetted ore particles are carried up in a froth while water-wetted gangue sinks.'), kt('Magnetic separation', 'Concentration that uses a magnet to separate a magnetic ore from non-magnetic gangue, or the reverse.')],
      [],
      table(['Ore', 'Method', 'Reason'], [['Magnetite', 'Magnetic separation', 'Ore is magnetic'], ['Zinc blende', 'Froth flotation', 'Sulphide, wetted by oil'], ['Haematite', 'Hydraulic washing', 'Ore heavier than gangue']], 'Table of three ores with their concentration method and the reason'),
      [2],
    ),
    sec(
      '3. Roasting and calcination',
      `The concentrated ore is changed into an **oxide**, which is easier to reduce.

| Roasting | Calcination |
|---|---|
| Strong heating in **excess air**, below the melting point | Strong heating in **limited air or none** |
| For **sulphide** ores | For **carbonate** and **hydrated** ores |
| Gives SO₂ | Gives CO₂ or H₂O |

Both also remove volatile impurities and leave the ore porous.`,
      [kt('Roasting', 'Heating a sulphide ore strongly in excess air, below its melting point, to convert it into the oxide.'), kt('Calcination', 'Heating a carbonate or hydrated ore strongly in a limited supply of air or in its absence to convert it into the oxide.')],
      [fm(r`\ce{2ZnS + 3O2 -> 2ZnO + 2SO2}`, 'Roasting of zinc blende'), fm(r`\ce{2PbS + 3O2 -> 2PbO + 2SO2}`, 'Roasting of galena'), fm(r`\ce{ZnCO3 -> ZnO + CO2}`, 'Calcination of calamine'), fm(r`\ce{Al2O3.2H2O -> Al2O3 + 2H2O}`, 'Calcination of bauxite')],
      table(['Ore', 'Process', 'Gas given off'], [['Zinc blende', 'Roasting', 'Sulphur dioxide'], ['Calamine', 'Calcination', 'Carbon dioxide'], ['Bauxite', 'Calcination', 'Water vapour']], 'Table of three ores with the process used and the gas given off'),
      [3],
    ),
    sec(
      '4. Reduction and the activity series',
      `The method of reduction depends on the position of the metal in the **activity series**.

- **K, Na, Ca, Mg, Al** (most reactive): **electrolysis of fused compounds**. Their oxides are too stable for carbon, and in aqueous solution hydrogen would be discharged instead.
- **Zn, Fe, Pb, Cu**: oxide reduced by **carbon (coke), carbon monoxide or hydrogen** on heating.
- **Hg, Ag** (least reactive): heating the oxide alone, e.g. 2HgO → 2Hg + O₂.

Al₂O₃ and MgO are not reduced by carbon because aluminium and magnesium have a greater affinity for oxygen than carbon has.`,
      [kt('Reducing agent', 'A substance that removes oxygen from (or adds electrons to) another substance, itself being oxidised.'), kt('Electrolytic reduction', 'Extraction of a reactive metal by electrolysing its fused compound; the metal ions gain electrons at the cathode.')],
      [fm(r`\ce{CuO + H2 -> Cu + H2O}`, 'Reduction by hydrogen (black to reddish-brown)'), fm(r`\ce{ZnO + C -> Zn + CO}`, 'Reduction by coke'), fm(r`\ce{PbO + C -> Pb + CO}`, 'Reduction by coke'), fm(r`\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}`, 'Reduction by carbon monoxide')],
      table(['Metals', 'Method'], [['K, Na, Ca, Mg, Al', 'Electrolysis of fused compound'], ['Zn, Fe, Pb, Cu', 'Reduction by C, CO or H₂'], ['Hg, Ag', 'Heat alone']], 'Table of groups of metals and their method of extraction'),
      [4],
    ),
    sec(
      '5. Purification of bauxite: Baeyer’s process',
      `Bauxite contains iron(III) oxide (and other impurities) that would spoil the aluminium, so it is purified first.

1. **Digestion:** finely ground bauxite is heated with **concentrated NaOH** under pressure (about 150–200 °C). Alumina dissolves as sodium aluminate; **Fe₂O₃ does not dissolve** and is filtered off.
2. **Precipitation:** the solution is **diluted** and **seeded** with fresh Al(OH)₃ and stirred; Al(OH)₃ precipitates.
3. **Ignition:** Al(OH)₃ is washed, dried and heated to about **1000 °C** to give **pure alumina**.`,
      [kt('Baeyer’s process', 'Purification of bauxite by dissolving alumina in hot concentrated sodium hydroxide, filtering off impurities, precipitating aluminium hydroxide and igniting it to alumina.'), kt('Seeding', 'Adding a few crystals of a substance to a solution to start its precipitation.')],
      [fm(r`\ce{Al2O3.2H2O + 2NaOH -> 2NaAlO2 + 3H2O}`, 'Digestion'), fm(r`\ce{NaAlO2 + 2H2O -> NaOH + Al(OH)3}`, 'Precipitation'), fm(r`\ce{2Al(OH)3 -> Al2O3 + 3H2O}`, 'Ignition at about 1000 °C')],
      table(['Stage', 'Aluminium is present as', 'Impurity'], [['Digestion', 'Sodium aluminate (in solution)', 'Fe₂O₃ filtered off'], ['Precipitation', 'Aluminium hydroxide (solid)', '—'], ['Ignition', 'Pure alumina', '—']], 'Table of the stages of Baeyer’s process and the form of aluminium at each'),
      [5],
    ),
    sec(
      '6. Extraction of aluminium: Hall–Héroult process',
      `- **Electrolyte:** pure alumina dissolved in fused **cryolite** (Na₃AlF₆) with a little **fluorspar** (CaF₂); about **950 °C**.
- **Cathode:** carbon lining of the steel tank. **Anodes:** thick carbon rods dipping into the electrolyte.
- **Cryolite:** lowers the fusion temperature (from about 2050 °C) and increases conductivity. **Fluorspar:** increases fluidity. **Powdered coke** on top: reduces heat loss and protects the anodes from air.
- Molten aluminium collects at the bottom and is tapped off; fresh alumina is added, so the process is continuous.
- Oxygen formed at the anodes burns them (C + O₂ → CO₂; 2C + O₂ → 2CO), so the **anodes are replaced periodically**.

Cathode: Al³⁺ + 3e⁻ → Al. Anode: 2O²⁻ → O₂ + 4e⁻.`,
      [kt('Cryolite', 'Na₃AlF₆; the solvent for alumina in the Hall–Héroult cell, which lowers the fusion temperature and raises conductivity.'), kt('Fluorspar', 'CaF₂; added to the electrolyte to increase its fluidity.')],
      [fm(r`\ce{2Al2O3 -> 4Al + 3O2}`, 'Overall change'), fm(r`\ce{C + O2 -> CO2}`, 'Anodes burnt by oxygen')],
      table(['Part of cell', 'Material or substance'], [['Cathode', 'Carbon lining of steel tank'], ['Anode', 'Thick carbon rods'], ['Electrolyte', 'Alumina + cryolite + fluorspar'], ['Product at cathode', 'Molten aluminium'], ['Product at anode', 'Oxygen (burns anodes to CO, CO₂)']], 'Table of the parts of the Hall–Héroult cell'),
      [6],
    ),
    sec(
      '7. Alloys and amalgams',
      `An **alloy** is a homogeneous mixture of two or more metals, or of a metal and a non-metal. An **amalgam** is an alloy containing **mercury**.

Alloys are preferred because they can be **harder and stronger**, **resist corrosion**, have a **lower melting point**, or look better than the pure metal.`,
      [kt('Alloy', 'A homogeneous mixture of two or more metals, or of a metal and a non-metal.'), kt('Amalgam', 'An alloy in which one of the metals is mercury.')],
      [],
      table(['Alloy', 'Constituents', 'Use'], [['Stainless steel', 'Fe, Cr, Ni, C', 'Cutlery, surgical instruments'], ['Magnalium', 'Al, Mg', 'Balance beams, light instruments'], ['Duralumin', 'Al, Cu, Mg, Mn', 'Aircraft bodies, pressure cookers'], ['Brass', 'Cu, Zn', 'Utensils, door fittings'], ['Bronze', 'Cu, Sn', 'Statues, medals, bells'], ['Solder', 'Pb, Sn', 'Joining electrical wires']], 'Table of six alloys with constituents and uses'),
      [7],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing calamine as ZnS (it is ZnCO₃; zinc blende is ZnS).
- Saying calcination is done in excess air.
- Saying aluminium forms at the anode, or that cryolite is an electrode.
- Forgetting that the anodes are burnt away by oxygen.
- Swapping brass (Cu, Zn) and bronze (Cu, Sn).

**How marks are usually awarded**
- Equations (1 mark): correct formulae and balancing; add the condition (heat, excess air) where asked.
- Reasons (1 mark each): link to the activity series, affinity for oxygen or a property difference.
- Hall–Héroult questions: electrolyte, electrodes, electrode reactions and the roles of cryolite, fluorspar and coke.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Ore?', 'A mineral from which a metal can be extracted conveniently and profitably.', 'definition', 1),
    fc(2, 'Gangue?', 'Earthy impurities mixed with an ore.', 'definition', 1),
    fc(3, 'Formula of haematite?', 'Fe₂O₃.', 'formula', 1),
    fc(4, 'Formula of magnetite?', 'Fe₃O₄.', 'formula', 1),
    fc(5, 'Formula of bauxite?', 'Al₂O₃·2H₂O.', 'formula', 1),
    fc(6, 'Zinc blende and calamine?', 'ZnS and ZnCO₃.', 'formula', 1),
    fc(7, 'Is clay an ore of aluminium?', 'No: a mineral only; extraction is not profitable.', 'concept', 1),
    fc(8, 'Concentration method for sulphide ores?', 'Froth flotation.', 'fact', 2),
    fc(9, 'Role of pine oil in froth flotation?', 'Wets the ore particles so they rise with air bubbles in the froth.', 'concept', 2),
    fc(10, 'Concentration method for magnetite?', 'Magnetic separation.', 'fact', 2),
    fc(11, 'Hydraulic washing works when…?', 'The ore is much heavier than the gangue.', 'concept', 2),
    fc(12, 'Roasting?', 'Strong heating of a sulphide ore in excess air below its melting point.', 'definition', 3),
    fc(13, 'Calcination?', 'Strong heating of a carbonate or hydrated ore in limited air or none.', 'definition', 3),
    fc(14, 'Roasting of zinc blende?', '2ZnS + 3O₂ → 2ZnO + 2SO₂.', 'formula', 3),
    fc(15, 'Calcination of calamine?', 'ZnCO₃ → ZnO + CO₂.', 'formula', 3),
    fc(16, 'How are K, Na, Ca, Mg, Al extracted?', 'Electrolysis of fused compounds.', 'fact', 4),
    fc(17, 'CuO heated in hydrogen: observation?', 'Black solid turns reddish-brown; water droplets form.', 'example', 4),
    fc(18, 'Why is Al₂O₃ not reduced by coke?', 'Aluminium has a greater affinity for oxygen than carbon.', 'concept', 4),
    fc(19, 'Fe₂O₃ + 3CO →?', '2Fe + 3CO₂.', 'formula', 4),
    fc(20, 'Main impurity removed in Baeyer’s process?', 'Iron(III) oxide, Fe₂O₃.', 'fact', 5),
    fc(21, 'Bauxite + NaOH →?', 'Al₂O₃·2H₂O + 2NaOH → 2NaAlO₂ + 3H₂O.', 'formula', 5),
    fc(22, 'Why seed sodium aluminate solution?', 'Fresh Al(OH)₃ crystals start the precipitation.', 'concept', 5),
    fc(23, 'Ignition of Al(OH)₃?', '2Al(OH)₃ → Al₂O₃ + 3H₂O at about 1000 °C.', 'formula', 5),
    fc(24, 'Electrolyte in the Hall–Héroult cell?', 'Alumina in fused cryolite with fluorspar, about 950 °C.', 'fact', 6),
    fc(25, 'Two roles of cryolite?', 'Lowers fusion temperature; increases conductivity.', 'concept', 6),
    fc(26, 'Role of fluorspar?', 'Increases fluidity of the electrolyte.', 'fact', 6),
    fc(27, 'Why are the anodes replaced?', 'Oxygen burns them to CO and CO₂.', 'diagram', 6),
    fc(28, 'Cathode reaction?', 'Al³⁺ + 3e⁻ → Al.', 'formula', 6),
    fc(29, 'Duralumin?', 'Al, Cu, Mg, Mn; aircraft bodies.', 'fact', 7),
    fc(30, 'Amalgam?', 'An alloy of mercury with another metal.', 'definition', 7),
    fc(31, 'Exam tip: bronze vs brass', 'Bronze = Cu + Sn; brass = Cu + Zn.', 'exam-tip', 7),
  ],
  status: 'draft',
  provenance: PROV,
};
