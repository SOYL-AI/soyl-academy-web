// ICSE 10 Chemistry ch08 Metallurgy — question bank (ICSE 2027 specimen style: objective items, 1-mark equations /
// names / observations, a bracket completion, matches and 10-mark structured questions). Stems name their own ores,
// masses and conditions. MCQ keys are placed by the builder; AR keys planned: a c b d a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 minerals and ores
add('ore-mcq', mcq({
  stem: 'Haematite (Fe₂O₃) and iron pyrites (FeS₂) both contain iron, but only haematite is treated as an ore of iron. The reason is that from haematite iron can be:',
  right: 'extracted conveniently and at a profit',
  wrong: ['seen with the naked eye', 'separated by dissolving the rock in water', 'obtained without any reducing agent'],
  sol: 'An ore is a mineral from which the metal can be extracted conveniently and profitably; pyrites is mainly used for its sulphur — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('calamine-mcq', mcq({
  stem: 'Calamine is an ore of zinc. Its chemical formula is:',
  right: 'ZnCO₃',
  wrong: ['ZnS', 'ZnO', 'ZnSO₄'],
  sol: 'Calamine is zinc carbonate; ZnS is zinc blende — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('mineral-tf', tf({
  stem: 'Every mineral of a metal is also an ore of that metal.',
  key: 'f',
  sol: 'False: every ore is a mineral, but a mineral is an ore only if the metal can be extracted from it conveniently and profitably (clay is a mineral of aluminium, not an ore).',
  d: 2, c: 'understanding', t: [1],
}));
add('zincores-short1', short({
  marks: 1,
  stem: 'Name the sulphide ore of zinc and write its formula.',
  model: 'Zinc blende, ZnS.',
  sol: 'Zinc blende.',
  scheme: [['Zinc blende and ZnS', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('feore-short1', short({
  marks: 1,
  stem: 'Name the ore of iron whose particles are attracted by a magnet, and write its formula.',
  model: 'Magnetite, Fe₃O₄.',
  sol: 'Magnetite.',
  scheme: [['Magnetite and Fe₃O₄', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('mineralore-short2', short({
  marks: 2,
  stem: 'Both bauxite and clay contain aluminium. Explain why bauxite is called an ore of aluminium but clay is only a mineral of aluminium.',
  model: 'A mineral is a naturally occurring compound of a metal; an ore is a mineral from which the metal can be extracted conveniently and profitably. Bauxite (Al₂O₃·2H₂O) is rich in alumina and is purified easily, so aluminium is extracted from it at a profit. Clay also contains aluminium but mixed with much silica, so extraction from it is difficult and costly.',
  sol: 'Definitions; profitable extraction.',
  scheme: [['Mineral and ore defined', 1], ['Bauxite profitable, clay not', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('percent-num', num({
  stem: 'Calculate the percentage by mass of iron in pure haematite, Fe₂O₃. (Fe = 56, O = 16)',
  value: 70, tol: 0.1, unit: '%',
  sol: r`Molar mass of $\ce{Fe2O3} = 2 \times 56 + 3 \times 16 = 160$. Mass of iron in it $= 2 \times 56 = 112$. Percentage of iron $= \dfrac{112}{160} \times 100 = 70$, so 70%.`,
  scheme: [['Molar mass 160', 1], ['70%', 1]],
  marks: 2,
  d: 2, c: 'application', t: [1],
}), () => near((112 / 160) * 100, 70) || 'percent');

// ---------------------------------------------------------------- t02 concentration
add('magnet-mcq', mcq({
  stem: 'A powdered iron ore is attracted by a magnet, but the rocky gangue mixed with it is not. The best method to concentrate this ore is:',
  right: 'magnetic separation',
  wrong: ['froth flotation', 'hydraulic washing', 'calcination'],
  sol: 'One component is magnetic and the other is not — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('froth-mcq', mcq({
  stem: 'Finely powdered galena (PbS) is stirred with water and a little pine oil while air is blown through it. The pine oil is added because it:',
  right: 'wets the sulphide particles so that they cling to air bubbles and rise into the froth',
  wrong: ['dissolves the sandy gangue completely', 'makes the ore particles heavier so that they sink', 'converts lead sulphide into lead oxide'],
  sol: 'Sulphide particles are wetted by oil, gangue by water; the oiled particles are carried up by air bubbles — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('hydraulic-mcq', mcq({
  stem: 'In hydraulic washing, a stream of water is run over a crushed ore on a sloping, shaking table. The method separates the ore from the gangue only when:',
  right: 'the ore particles are much heavier than the gangue particles',
  wrong: ['the ore is attracted by a magnet', 'the ore is a sulphide that is wetted by oil', 'the ore dissolves in water'],
  sol: 'The light gangue is washed away and the heavy ore particles stay behind — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('froth-ar', ar({
  a: 'Froth flotation is a suitable method for concentrating zinc blende.',
  r: 'Sulphide ore particles are wetted by oil, while the gangue particles are wetted by water.',
  key: 'a',
  sol: 'Both are true, and R is the principle on which the method works — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('method-match', match({
  stem: 'Match each ore in Column A with the most suitable method of concentration in Column B.',
  pairs: [
    ['Magnetite', 'Magnetic separation'],
    ['Zinc blende', 'Froth flotation'],
    ['Haematite with light sandy gangue', 'Hydraulic washing'],
    ['Bauxite with iron(III) oxide impurity', "Chemical method (Baeyer's process)"],
  ],
  order: [1, 3, 0, 2],
  sol: 'Magnetite → magnetic separation (magnetic ore); zinc blende → froth flotation (sulphide); heavy haematite → hydraulic washing; bauxite → chemical method (Baeyer’s process).',
  d: 2, c: 'application', t: [2, 5],
}));
add('conc-short3', short({
  marks: 3,
  stem: 'Suggest, with a reason in each case, how you would concentrate: (a) magnetite mixed with non-magnetic rock; (b) zinc blende; (c) haematite mixed with light sandy gangue.',
  model: '(a) Magnetic separation: magnetite is attracted by the magnet and the rock is not. (b) Froth flotation: the sulphide particles are wetted by pine oil and rise with the froth while the gangue sinks. (c) Hydraulic washing (gravity separation): the heavy haematite particles stay behind while the light sand is washed away.',
  sol: 'Magnetic; froth flotation; gravity.',
  scheme: [['(a) method and reason', 1], ['(b) method and reason', 1], ['(c) method and reason', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 roasting and calcination
add('roast-mcq', mcq({
  stem: 'Concentrated zinc blende is heated strongly in a current of excess air, below its melting point. The gas given off is:',
  right: 'sulphur dioxide',
  wrong: ['carbon dioxide', 'hydrogen sulphide', 'water vapour'],
  sol: '2ZnS + 3O₂ → 2ZnO + 2SO₂ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('calcine-mcq', mcq({
  stem: 'Which of these is an example of calcination?',
  right: 'Heating calamine to give zinc oxide and carbon dioxide',
  wrong: ['Heating galena in excess air to give lead(II) oxide', 'Heating copper(II) oxide in a stream of hydrogen', 'Passing an electric current through fused alumina'],
  sol: 'Calcination is heating a carbonate or hydrated ore in a limited supply of air or none: ZnCO₃ → ZnO + CO₂ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('roast-tf', tf({
  stem: 'Roasting is carried out in excess air and is used mainly for sulphide ores.',
  key: 't',
  sol: 'True: the sulphide is oxidised to the metal oxide and sulphur dioxide.',
  d: 1, c: 'recall', t: [3],
}));
add('galena-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the roasting of galena, PbS.',
  model: '2PbS + 3O₂ → 2PbO + 2SO₂ (heated in excess air).',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('calamine-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the calcination of calamine.',
  model: 'ZnCO₃ → ZnO + CO₂ (on heating).',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [3],
}));
add('roastcalc-short2', short({
  marks: 2,
  stem: 'Give two differences between roasting and calcination.',
  model: '(1) Roasting is done in excess air; calcination is done in a limited supply of air or in its absence. (2) Roasting is used for sulphide ores and gives sulphur dioxide; calcination is used for carbonate and hydrated ores and gives carbon dioxide or water vapour.',
  sol: 'Air supply; type of ore and gas given off.',
  scheme: [['Air supply', 1], ['Type of ore or product', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 reduction and the activity series
add('electro-mcq', mcq({
  stem: 'Which of these metals is obtained by electrolysis of its fused chloride and not by heating its oxide with coke?',
  right: 'Magnesium',
  wrong: ['Zinc', 'Lead', 'Iron'],
  sol: 'Magnesium is high in the activity series; its oxide is too stable for carbon to reduce — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('h2red-mcq', mcq({
  stem: 'Dry hydrogen is passed over heated black copper(II) oxide in a hard-glass tube. The observation is:',
  right: 'the black solid turns reddish-brown and droplets of a colourless liquid collect in the cooler part of the tube',
  wrong: ['the black solid turns white and a brown gas is given off', 'the black solid turns blue and dissolves', 'there is no change, because hydrogen cannot reduce metal oxides'],
  sol: 'CuO + H₂ → Cu + H₂O: copper is reddish-brown and water condenses — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('coreduce-mcq', mcq({
  stem: 'In the reaction Fe₂O₃ + 3CO → 2Fe + 3CO₂, the substance that is oxidised is:',
  right: 'carbon monoxide',
  wrong: ['iron(III) oxide', 'iron', 'carbon dioxide'],
  sol: 'CO gains oxygen to become CO₂, so it is oxidised and acts as the reducing agent — option (@K).',
  d: 2, c: 'analysis', t: [4],
}));
add('series-mcq', mcq({
  stem: 'Metal X is obtained by electrolysis of its fused chloride, metal Y by heating its oxide with coke, and metal Z by heating its oxide alone. The order of decreasing reactivity is:',
  right: 'X > Y > Z',
  wrong: ['Z > Y > X', 'Y > X > Z', 'X > Z > Y'],
  sol: 'The more reactive the metal, the harder its compounds are to reduce: electrolysis (most reactive), then carbon, then heat alone (least reactive) — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('sodium-ar', ar({
  a: 'Sodium is extracted by electrolysis of fused sodium chloride.',
  r: 'Sodium chloride is a covalent compound that does not conduct electricity when molten.',
  key: 'c',
  sol: 'A is true; R is false: sodium chloride is ionic and conducts when molten — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('hg-tf', tf({
  stem: 'Mercury(II) oxide gives mercury when it is heated alone, without any reducing agent.',
  key: 't',
  sol: 'True: 2HgO → 2Hg + O₂ on heating; mercury is low in the activity series.',
  d: 1, c: 'recall', t: [4],
}));
add('cuo-short1', short({
  marks: 1,
  stem: 'Write a balanced equation, with the condition, for the reduction of copper(II) oxide by hydrogen.',
  model: 'CuO + H₂ → Cu + H₂O (on heating).',
  sol: 'Equation with heat.',
  scheme: [['Balanced equation with heat', 1]],
  d: 1, c: 'application', t: [4],
}));
add('pbo-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the reduction of lead(II) oxide by carbon.',
  model: 'PbO + C → Pb + CO (on heating).',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [4],
}));
add('kmethod-short1', short({
  marks: 1,
  stem: 'Name the method used to extract potassium from its compounds.',
  model: 'Electrolysis of fused (molten) potassium chloride or potassium hydroxide.',
  sol: 'Electrolytic reduction.',
  scheme: [['Electrolysis of a fused compound', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('carbonred-short2', short({
  marks: 2,
  stem: 'Magnesium is extracted by electrolysis of fused magnesium chloride, while lead is obtained by heating lead(II) oxide with coke. Explain this difference.',
  model: 'Magnesium is high in the activity series and has a greater affinity for oxygen than carbon, so carbon cannot remove oxygen from magnesium oxide; the strong reducing action of electrolysis (gain of electrons at the cathode) is needed. Lead is much lower in the series, so carbon readily removes oxygen from lead(II) oxide: PbO + C → Pb + CO.',
  sol: 'Position in the series; affinity for oxygen.',
  scheme: [['Magnesium: reactive, oxide not reduced by carbon', 1], ['Lead: less reactive, reduced by carbon', 1]],
  d: 2, c: 'analysis', t: [4],
}));
add('calamine-short3', short({
  marks: 3,
  stem: 'A sample of concentrated calamine is to be turned into zinc. (a) Name the process that changes calamine into zinc oxide and write its equation. (b) Write the equation for the reduction of zinc oxide by coke. (c) Why can zinc oxide be reduced by coke while magnesium oxide cannot?',
  model: '(a) Calcination: ZnCO₃ → ZnO + CO₂. (b) ZnO + C → Zn + CO (on strong heating). (c) On strong heating, carbon has a greater affinity for oxygen than zinc has, so it removes oxygen from zinc oxide; magnesium has a greater affinity for oxygen than carbon, so carbon cannot reduce magnesium oxide.',
  sol: 'Calcination; reduction; affinity for oxygen.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3, 4],
}));
add('unknown-short3', short({
  marks: 3,
  stem: 'Three metal oxides P, Q and R are tested. P gives its metal and oxygen when heated alone. Q gives its metal only when heated strongly with coke. R is not reduced by coke even at very high temperatures. (a) Suggest one oxide that fits each of P, Q and R. (b) Arrange the three metals in increasing order of reactivity. (c) Name the method by which the metal of R is obtained.',
  model: '(a) P: mercury(II) oxide; Q: zinc oxide (or lead(II) oxide); R: aluminium oxide (or magnesium oxide). (b) P < Q < R (mercury < zinc < aluminium). (c) Electrolysis of a fused compound of the metal (electrolytic reduction).',
  sol: 'Identify from reducibility; reactivity order; electrolysis.',
  scheme: [['(a) three oxides', 1], ['(b) order', 1], ['(c) electrolysis', 1]],
  d: 4, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 Baeyer's process
add('redmud-mcq', mcq({
  stem: "In Baeyer's process, finely ground bauxite is heated with concentrated sodium hydroxide solution under pressure. The iron(III) oxide present as an impurity:",
  right: 'does not dissolve and is removed by filtration',
  wrong: ['dissolves to form sodium ferrate', 'is reduced to iron and sinks', 'escapes from the solution as a gas'],
  sol: 'Only the amphoteric alumina dissolves (as sodium aluminate); basic iron(III) oxide stays undissolved — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('seed-mcq', mcq({
  stem: "In Baeyer's process, the filtered sodium aluminate solution is diluted with water and a little freshly made aluminium hydroxide is stirred in. The purpose of this added aluminium hydroxide is to:",
  right: 'start (seed) the precipitation of aluminium hydroxide',
  wrong: ['neutralise all the sodium hydroxide', 'remove the iron(III) oxide', 'lower the melting point of alumina'],
  sol: 'The solid crystals act as seeds on which more aluminium hydroxide precipitates — option (@K).',
  d: 3, c: 'understanding', t: [5],
}));
add('naoh-short1', short({
  marks: 1,
  stem: "Write the balanced equation for the action of sodium hydroxide solution on bauxite, Al₂O₃·2H₂O, in Baeyer's process.",
  model: 'Al₂O₃·2H₂O + 2NaOH → 2NaAlO₂ + 3H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [5],
}));
add('ignite-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of strong heat (about 1000 °C) on aluminium hydroxide.',
  model: '2Al(OH)₃ → Al₂O₃ + 3H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [5],
}));
add('baeyer-fill', fill({
  stem: "In Baeyer's process, aluminium hydroxide is heated strongly to give pure ___, which is then sent for electrolysis.",
  acc: [['alumina', 'aluminium oxide', 'Al2O3', 'Al₂O₃']],
  sol: 'Pure **alumina** (aluminium oxide).',
  d: 1, c: 'recall', t: [5],
}));
add('baeyer-short2', short({
  marks: 2,
  stem: "Write the equation for the change of sodium aluminate into aluminium hydroxide in Baeyer's process, and state why the solution is diluted before this step.",
  model: 'NaAlO₂ + 2H₂O → NaOH + Al(OH)₃↓. Dilution with water shifts the change towards hydrolysis of sodium aluminate, so aluminium hydroxide precipitates (helped by seeding with fresh aluminium hydroxide).',
  sol: 'Hydrolysis equation; dilution favours hydrolysis.',
  scheme: [['Balanced equation', 1], ['Reason for dilution', 1]],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 Hall–Héroult process
add('cryolite-mcq', mcq({
  stem: 'Pure alumina melts at about 2050 °C, yet the Hall–Héroult cell runs at about 950 °C. This is possible because:',
  right: 'alumina is dissolved in fused cryolite, which lowers the fusion temperature',
  wrong: ['fluorspar raises the melting point of the electrolyte', 'powdered coke on the surface melts the alumina', 'molten aluminium acts as the solvent for alumina'],
  sol: 'Cryolite (Na₃AlF₆) is the solvent; the mixture melts near 950 °C and also conducts better — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('anode-mcq', mcq({
  stem: 'In the Hall–Héroult cell, the carbon anodes have to be replaced from time to time because:',
  right: 'oxygen set free at the anodes burns them away as oxides of carbon',
  wrong: ['aluminium is deposited on them', 'cryolite dissolves them', 'they melt at the temperature of the cell'],
  sol: 'C + O₂ → CO₂ and 2C + O₂ → 2CO — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('cathode-mcq', mcq({
  stem: 'The reaction at the cathode of the Hall–Héroult cell is:',
  right: 'Al³⁺ + 3e⁻ → Al',
  wrong: ['Al → Al³⁺ + 3e⁻', '2O²⁻ → O₂ + 4e⁻', 'C + O₂ → CO₂'],
  sol: 'Reduction (gain of electrons) takes place at the cathode — option (@K).',
  d: 2, c: 'recall', t: [6],
}));
add('cryolite-ar', ar({
  a: 'Cryolite is added to alumina in the Hall–Héroult cell.',
  r: 'Cryolite is a mineral of aluminium.',
  key: 'b',
  sol: 'Both are true, but cryolite is added to lower the fusion temperature and raise the conductivity, not because it contains aluminium — option (b).',
  d: 3, c: 'analysis', t: [6],
}));
add('coke-ar', ar({
  a: 'A layer of powdered coke is spread over the surface of the electrolyte in the Hall–Héroult cell.',
  r: 'The coke layer reduces heat loss from the surface and stops the anodes burning in air at the surface.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [6],
}));
add('cryolite-fill', fill({
  stem: 'The formula of cryolite, used as a solvent for alumina, is ___.',
  acc: [['Na3AlF6', 'Na₃AlF₆']],
  sol: '**Na₃AlF₆** (Na3AlF6), sodium aluminium fluoride.',
  d: 1, c: 'recall', t: [6],
}));
add('fluorspar-short1', short({
  marks: 1,
  stem: 'State the purpose of adding fluorspar to the electrolyte in the Hall–Héroult cell.',
  model: 'Fluorspar (CaF₂) increases the fluidity of the electrolyte (and helps lower its fusion temperature).',
  sol: 'Fluidity.',
  scheme: [['Increases fluidity', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('anodeeq-short1', short({
  marks: 1,
  stem: 'Write the equation for the reaction at the anode during the electrolysis of fused alumina.',
  model: '2O²⁻ → O₂ + 4e⁻ (or 6O²⁻ → 3O₂ + 12e⁻).',
  sol: 'Oxide ions lose electrons.',
  scheme: [['Anode equation', 1]],
  d: 2, c: 'application', t: [6],
}));
add('anode-short2', short({
  marks: 2,
  stem: 'Explain, with an equation, why the anodes of the Hall–Héroult cell must be replaced periodically while the cathode lasts much longer.',
  model: 'Oxygen is liberated at the hot carbon anodes and burns them: C + O₂ → CO₂ (and 2C + O₂ → 2CO), so they wear away. At the cathode aluminium is deposited; nothing there reacts with the carbon lining.',
  sol: 'Anode oxidised by oxygen; cathode receives aluminium.',
  scheme: [['Anode burnt by oxygen, with equation', 1], ['Cathode not attacked', 1]],
  d: 2, c: 'application', t: [6],
}));
add('al-num', num({
  stem: 'What mass of aluminium, in kg, can be obtained from 204 kg of pure alumina, Al₂O₃? (Al = 27, O = 16)',
  value: 108, tol: 0.5, unit: 'kg',
  sol: r`Molar mass of $\ce{Al2O3} = 2 \times 27 + 3 \times 16 = 102$, and it contains $2 \times 27 = 54$ parts of aluminium. Mass of aluminium $= \dfrac{54}{102} \times 204 = 108$, so 108 kg.`,
  scheme: [['Molar mass 102 and 54 parts Al', 1], ['108 kg', 1]],
  marks: 2,
  d: 2, c: 'application', t: [6],
}), () => near((54 / 102) * 204, 108) || 'al');
add('o2-num', num({
  stem: 'During the electrolysis of fused alumina, 54 g of aluminium is deposited at the cathode. What volume of oxygen, measured at STP, is set free at the anodes, in litres? (Al = 27; one mole of a gas occupies 22.4 L at STP)',
  value: 33.6, tol: 0.1, unit: 'L',
  sol: r`Overall: $\ce{2Al2O3 -> 4Al + 3O2}$. Moles of aluminium $= \dfrac{54}{27} = 2$. Moles of oxygen $= 2 \times \dfrac{3}{4} = 1.5$. Volume $= 1.5 \times 22.4 = 33.6$, so 33.6 L.`,
  scheme: [['Mole ratio 4 Al : 3 O₂', 1], ['33.6 L', 1]],
  marks: 2,
  d: 3, c: 'application', t: [6],
}), () => near((54 / 27) * (3 / 4) * 22.4, 33.6) || 'o2');
add('cell-short3', short({
  marks: 3,
  stem: 'For the Hall–Héroult process: (a) name the material of the cathode and of the anodes; (b) state two reasons for adding cryolite; (c) state why fresh alumina is added from time to time.',
  model: '(a) Cathode: carbon lining of the steel tank; anodes: thick carbon (graphite) rods. (b) Cryolite lowers the fusion temperature of the electrolyte from about 2050 °C to about 950 °C and increases its electrical conductivity. (c) Alumina is used up as it is decomposed into aluminium and oxygen, so it is added to keep the process running continuously.',
  sol: 'Electrodes; two roles of cryolite; alumina consumed.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- t07 alloys and amalgams
add('alloy-mcq', mcq({
  stem: 'Which alloy contains aluminium together with small amounts of copper, magnesium and manganese?',
  right: 'Duralumin',
  wrong: ['Magnalium', 'Bronze', 'Stainless steel'],
  sol: 'Duralumin: about 95% Al, 4% Cu, 0.5% Mg, 0.5% Mn — option (@K).',
  d: 1, c: 'recall', t: [7],
}));
add('steel-mcq', mcq({
  stem: 'Stainless steel is chosen for surgical instruments and kitchen sinks mainly because the chromium and nickel in it:',
  right: 'make it resist rusting and corrosion',
  wrong: ['make it lighter than aluminium', 'lower its melting point below that of tin', 'make it a poor conductor of heat'],
  sol: 'Stainless steel does not rust and keeps a bright surface — option (@K).',
  d: 1, c: 'understanding', t: [7],
}));
add('magnalium-mcq', mcq({
  stem: 'An engineer needs a light but strong alloy for the beam of a chemical balance. The most suitable choice is:',
  right: 'magnalium (aluminium and magnesium)',
  wrong: ['solder (lead and tin)', 'bronze (copper and tin)', 'stainless steel (iron, chromium, nickel and carbon)'],
  sol: 'Magnalium is light (both metals have low density) and stronger than aluminium — option (@K).',
  d: 2, c: 'application', t: [7],
}));
add('bronze-ar', ar({
  a: 'Bronze is an alloy of copper and zinc.',
  r: 'Alloys are usually harder than the pure metals from which they are made.',
  key: 'd',
  sol: 'A is false: bronze is copper and tin (brass is copper and zinc). R is true — option (d).',
  d: 2, c: 'recall', t: [7],
}));
add('solder-tf', tf({
  stem: 'Solder melts at a lower temperature than either of the metals, lead and tin, from which it is made.',
  key: 't',
  sol: 'True: alloying lowers the melting point, which is why solder is used to join wires and metal parts.',
  d: 2, c: 'understanding', t: [7],
}));
add('amalgam-fill', fill({
  stem: 'An alloy in which one of the metals is mercury is called an ___.',
  acc: [['amalgam']],
  sol: 'An **amalgam** (for example, sodium amalgam or the silver–tin amalgam used in tooth fillings).',
  d: 1, c: 'recall', t: [7],
}));
add('bronze-short1', short({
  marks: 1,
  stem: 'State the two main metals in bronze and one use of bronze.',
  model: 'Copper and tin; used for statues, medals or bells.',
  sol: 'Cu and Sn; one use.',
  scheme: [['Metals and use', 1]],
  d: 1, c: 'recall', t: [7],
}));
add('alloyreason-short2', short({
  marks: 2,
  stem: 'Give two reasons why an alloy is often used instead of a pure metal, with one example for each reason.',
  model: '(1) An alloy is harder and stronger: duralumin is much stronger than pure aluminium and is used for aircraft bodies. (2) An alloy resists corrosion better: stainless steel does not rust, unlike pure iron. (Also accepted: lower melting point, as in solder.)',
  sol: 'Two reasons with examples.',
  scheme: [['Reason and example 1', 1], ['Reason and example 2', 1]],
  d: 2, c: 'application', t: [7],
}));
add('process-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) Removing the gangue from a crushed ore is called ___ (concentration / calcination).\n\n(b) Zinc blende is concentrated by ___ (froth flotation / magnetic separation).\n\n(c) Heating a carbonate ore in a limited supply of air is called ___ (roasting / calcination).',
  acc: [['concentration'], ['froth flotation'], ['calcination']],
  sol: '(a) **concentration**; (b) **froth flotation**; (c) **calcination**.',
  d: 1, c: 'recall', t: [2, 3],
}));
add('alloy-match', match({
  stem: 'Match each alloy in Column A with its main constituent metals in Column B.',
  pairs: [
    ['Stainless steel', 'Iron, chromium, nickel and a little carbon'],
    ['Magnalium', 'Aluminium and magnesium'],
    ['Duralumin', 'Aluminium, copper, magnesium and manganese'],
    ['Bronze', 'Copper and tin'],
    ['Solder', 'Lead and tin'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'Stainless steel → iron, chromium, nickel, carbon; magnalium → aluminium, magnesium; duralumin → aluminium, copper, magnesium, manganese; bronze → copper, tin; solder → lead, tin.',
  d: 2, c: 'recall', t: [7],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('extraction-long', long({
  stem: '(a) Define (i) a mineral and (ii) an ore. [2]\n\n(b) Name one ore each of iron and zinc and write their formulae. [2]\n\n(c) Potassium, zinc and mercury are extracted by different methods. Name the method used for each, and give a reason for the method used for potassium. [3]\n\n(d) Write balanced equations for: (i) the reduction of zinc oxide by carbon; (ii) the reduction of iron(III) oxide by carbon monoxide; (iii) the reduction of copper(II) oxide by hydrogen. [3]',
  model: '(a) (i) A mineral is a naturally occurring compound of a metal found in the earth’s crust. (ii) An ore is a mineral from which the metal can be extracted conveniently and profitably.\n\n(b) Iron: haematite, Fe₂O₃ (or magnetite, Fe₃O₄). Zinc: zinc blende, ZnS (or calamine, ZnCO₃).\n\n(c) Potassium: electrolysis of its fused chloride; zinc: reduction of its oxide by carbon (coke); mercury: heating its oxide alone. Potassium is very reactive and its compounds are very stable; no chemical reducing agent such as carbon can reduce them.\n\n(d) (i) ZnO + C → Zn + CO. (ii) Fe₂O₃ + 3CO → 2Fe + 3CO₂. (iii) CuO + H₂ → Cu + H₂O.',
  sol: 'Definitions; ores; methods and reason; equations.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b) iron ore', 1], ['(b) zinc ore', 1], ['(c) three methods', 2], ['(c) reason', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 2, c: 'application', t: [1, 4],
}));
add('conc-long', long({
  stem: '(a) What is meant by the concentration of an ore? Name two physical methods of concentration. [2]\n\n(b) Explain the principle of froth flotation and the role of pine oil. [2]\n\n(c) State one difference between roasting and calcination, and write one balanced equation for each. [3]\n\n(d) A sulphide ore is converted into its oxide before reduction. (i) Why is this done? (ii) Name the gas given off. (iii) Suggest one way of preventing this gas from polluting the air. [3]',
  model: '(a) Removing the unwanted earthy matter (gangue) from the crushed ore. Physical methods: hydraulic washing and magnetic separation (or froth flotation).\n\n(b) Sulphide ore particles are wetted by oil and gangue particles by water. Pine oil coats the ore particles, which stick to air bubbles and rise in the froth, while the gangue sinks.\n\n(c) Roasting is done in excess air (for sulphide ores); calcination in a limited supply of air or none (for carbonate and hydrated ores). Roasting: 2ZnS + 3O₂ → 2ZnO + 2SO₂. Calcination: ZnCO₃ → ZnO + CO₂.\n\n(d) (i) An oxide is reduced by carbon much more easily than a sulphide. (ii) Sulphur dioxide. (iii) Collect it and use it to make sulphuric acid (the Contact process).',
  sol: 'Concentration; flotation principle; roasting and calcination; reason, gas, prevention.',
  scheme: [['(a) meaning', 1], ['(a) two methods', 1], ['(b) principle', 1], ['(b) pine oil', 1], ['(c) difference', 1], ['(c) two equations', 2], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'analysis', t: [2, 3],
}));
add('baeyer-long', long({
  stem: "(a) Write the formula of bauxite and name the main impurity removed from it in Baeyer's process. [2]\n\n(b) Write the balanced equation for the digestion of bauxite with sodium hydroxide, and state what happens to the impurity. [2]\n\n(c) Write balanced equations for (i) the formation of aluminium hydroxide from sodium aluminate and (ii) the action of heat on aluminium hydroxide, and state why seeding is used in step (i). [3]\n\n(d) A batch of 312 g of pure aluminium hydroxide is heated strongly. Calculate the mass of alumina formed, and explain why the alumina must be pure before electrolysis. (Al = 27, O = 16, H = 1) [3]",
  model: r`(a) $\ce{Al2O3.2H2O}$; the main impurity is iron(III) oxide, Fe₂O₃.

(b) $\ce{Al2O3.2H2O + 2NaOH -> 2NaAlO2 + 3H2O}$. Iron(III) oxide does not dissolve and is filtered off.

(c) (i) $\ce{NaAlO2 + 2H2O -> NaOH + Al(OH)3}$. (ii) $\ce{2Al(OH)3 -> Al2O3 + 3H2O}$ at about 1000 °C. Seeding with fresh aluminium hydroxide starts the precipitation.

(d) Molar mass of $\ce{Al(OH)3} = 27 + 3 \times 17 = 78$; of $\ce{Al2O3} = 2 \times 27 + 3 \times 16 = 102$. Two moles (156 g) of the hydroxide give 102 g of alumina, so the mass of alumina $= \dfrac{102}{156} \times 312 = 204$, that is 204 g. Impurities would be reduced too and would contaminate the aluminium.`,
  sol: 'Formula and impurity; digestion; precipitation and ignition; mass of alumina from the 2 : 1 mole ratio.',
  scheme: [['(a) formula', 1], ['(a) impurity', 1], ['(b) equation', 1], ['(b) impurity filtered', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c) seeding', 1], ['(d) molar masses and ratio', 1], ['(d) 204 g', 1], ['(d) reason', 1]],
  d: 4, c: 'application', t: [5],
}));
add('hall-long', long({
  stem: '(a) State the composition of the electrolyte used in the Hall–Héroult process and the temperature at which the cell works. [2]\n\n(b) Name the cathode and the anode of the cell. [2]\n\n(c) Write the equations for the reactions at the cathode and the anode, and the overall equation for the electrolysis of alumina. [3]\n\n(d) Give one reason each for: (i) adding cryolite; (ii) replacing the anodes from time to time; (iii) spreading powdered coke over the electrolyte. [3]',
  model: '(a) Pure alumina dissolved in fused cryolite (Na₃AlF₆), with a little fluorspar (CaF₂); about 950 °C.\n\n(b) Cathode: the carbon lining of the steel tank. Anode: thick carbon (graphite) rods dipping into the electrolyte.\n\n(c) Cathode: Al³⁺ + 3e⁻ → Al. Anode: 2O²⁻ → O₂ + 4e⁻. Overall: 2Al₂O₃ → 4Al + 3O₂.\n\n(d) (i) It lowers the fusion temperature of the electrolyte and increases its conductivity. (ii) Oxygen liberated at the anodes burns the carbon to CO and CO₂. (iii) It reduces heat loss and prevents the anodes burning in air.',
  sol: 'Electrolyte; electrodes; equations; reasons.',
  scheme: [['(a) electrolyte', 1], ['(a) temperature', 1], ['(b) cathode', 1], ['(b) anode', 1], ['(c) cathode', 1], ['(c) anode', 1], ['(c) overall', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'understanding', t: [6],
}));
add('alloy-long', long({
  stem: '(a) Define (i) an alloy and (ii) an amalgam. [2]\n\n(b) Give two ways in which the properties of an alloy differ from those of its main metal. [2]\n\n(c) State the constituent metals of (i) duralumin, (ii) magnalium and (iii) solder. [3]\n\n(d) Choose the most suitable alloy from brass, bronze, duralumin and stainless steel for each use, and give a reason: (i) the body of an aircraft; (ii) a set of surgical knives; (iii) a statue to stand outdoors. [3]',
  model: '(a) (i) An alloy is a homogeneous mixture of two or more metals, or of a metal and a non-metal. (ii) An amalgam is an alloy in which one of the metals is mercury.\n\n(b) An alloy is usually harder and stronger, has a lower melting point, and resists corrosion better (any two).\n\n(c) (i) Aluminium, copper, magnesium and manganese. (ii) Aluminium and magnesium. (iii) Lead and tin.\n\n(d) (i) Duralumin: light and strong. (ii) Stainless steel: does not rust and stays sharp and clean. (iii) Bronze: hard and resists corrosion in air and rain.',
  sol: 'Definitions; changes in properties; compositions; choices with reasons.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)', 2], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'evaluation', t: [7],
}));
