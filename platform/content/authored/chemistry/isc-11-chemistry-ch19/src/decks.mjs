// ch19 Purification and Analysis of Organic Compounds — two decks. Part 1 (t01–t02): purification methods and qualitative
// analysis (C, H, N, S, halogens; Lassaigne's test). Part 2 (t03–t04): estimation of C and H (Liebig), N (Kjeldahl), halogens,
// sulphur and phosphorus (Carius). Worked-example numbers are computed here and printed to the right significant figures.
import { sl, deck, table, flow, svgV, chem, r } from './lib.mjs';
import { DISTILLS, METHODS, TLC, LASS, LIEBIG, KJELD, CARIUS } from './svgs.mjs';
import { A, MM, pctC, pctH, pctN, pctFrom, f } from './data.mjs';

export const V = {
  distills: svgV(DISTILLS, 'Fractional distillation with a packed column and steam distillation with a steam generator, each with condenser and receiver'),
  methods: svgV(METHODS, 'Sublimation, crystallisation, solvent extraction in a separating funnel and column chromatography drawn side by side'),
  tlc: svgV(TLC, 'A thin-layer chromatography plate with three pure samples and a mixture, showing the distances used for the Rf value'),
  lass: svgV(LASS, "Flow chart of Lassaigne's test with the reagents and observations for nitrogen, sulphur, halogens and for nitrogen and sulphur together"),
  liebig: svgV(LIEBIG, "Liebig's combustion train: oxygen supply, furnace with sample and copper oxide, calcium chloride U-tube, potash bulbs and guard tube"),
  kjeld: svgV(KJELD, "Kjeldahl's method: digestion flask, then distillation flask with sodium hydroxide, bulb trap, condenser and receiver of standard acid"),
  carius: svgV(CARIUS, 'Carius method: a sealed tube heated in a furnace and the products halide, sulphate and phosphate weighed as silver halide, barium sulphate and magnesium pyrophosphate'),
};

// ---- worked-example numbers (computed once)
const E1 = { m: 0.24, mc: 0.352, mh: 0.144 }; // C, H, O compound: CH2O (acetic acid-like composition)
E1.c = pctC(E1.mc, E1.m);
E1.h = pctH(E1.mh, E1.m);
E1.o = 100 - E1.c - E1.h;
const E2 = { m: 0.5, Ma: 0.1, Va: 50.0, Mb: 0.1, Vb: 24.0 };
E2.nAcid = 2 * E2.Ma * (E2.Va / 1000);
E2.nBase = E2.Mb * (E2.Vb / 1000);
E2.nNH3 = E2.nAcid - E2.nBase;
E2.v = ((E2.nNH3 * A.N) / E2.m) * 100;
E2.equivML = E2.Va - (E2.Mb * E2.Vb) / (2 * E2.Ma); // mL of 0.200 N acid used by the ammonia
E2.viaF = pctN(2 * E2.Ma, E2.equivML, E2.m);
const E3 = { m: 0.28, p: 0.524 };
E3.v = pctFrom(A.S, MM.BaSO4, E3.p, E3.m);
if (Math.abs(E2.v - E2.viaF) > 1e-9) throw new Error('example 2 mismatch');

// ================================================================== deck 1
export const deck1 = deck({
  part: 1,
  title: 'Purification and Analysis of Organic Compounds — Part 1: Purification and qualitative analysis',
  goals: [
    'Choose a suitable purification method for a given mixture: crystallisation, sublimation, distillation, extraction or chromatography',
    'Calculate and interpret an Rf value',
    'Detect carbon and hydrogen, and nitrogen, sulphur and halogens by Lassaigne’s test',
    'Write the reactions of Lassaigne’s test, including the blood-red colour when nitrogen and sulphur are both present',
  ],
  slides: [
    sl('title', 'Is it pure, and what is in it?', {
      b: 'A new organic compound from a flask or a plant is usually **mixed with other substances**. Chemists first **purify** it, then **detect** the elements in it, then **estimate** how much of each there is. Part 1 covers purification and detection.',
      v: table(['Mixture', 'Property used', 'Method'], [['Solid + non-volatile solid', 'Sublimes on heating', 'Sublimation'], ['Impure solid', 'Solubility rises with temperature', 'Crystallisation'], ['Liquids, boiling points far apart', 'Volatility', 'Simple distillation'], ['Components of a mixture', 'Different adsorption or partition', 'Chromatography']], 'Table linking four kinds of mixture to the property used and the purification method'),
      n: 'A compound made in the laboratory or taken from a plant is rarely pure. The chemist first purifies it using a property in which it differs from the impurities, such as volatility or solubility. Then the elements in it are detected, and finally their amounts are measured. In this part we study purification and the detection of elements.',
    }),
    sl('diagram', 'Sublimation, crystallisation, extraction and column chromatography', {
      b: 'Four methods and what each uses: **sublimation** (a solid that passes directly to vapour), **crystallisation** (solubility differing with temperature), **differential extraction** (greater solubility in a second, immiscible solvent) and **column chromatography** (different adsorption on a solid).',
      v: V.methods,
      n: 'Here are four methods side by side. In sublimation a solid turns to vapour on heating and condenses on a cool surface. In crystallisation a hot saturated solution gives pure crystals on cooling. In extraction a separating funnel moves a compound into a second solvent that does not mix with water. In column chromatography, components move down an adsorbent at different speeds.',
    }),
    sl('concept', 'Choosing between the solid-based and solvent-based methods', {
      b: '**Crystallisation** needs a solvent that dissolves much more solute when hot than when cold; hot filtration removes insoluble dirt. **Sublimation** suits camphor, naphthalene and ammonium chloride, but not a mixture in which both solids sublime. **Extraction** needs a second solvent that does not mix with the first and dissolves the compound better, such as ether for an aqueous solution.',
      v: table(['Method', 'Condition', 'Example'], [['Crystallisation', 'Large change of solubility with temperature', 'Benzoic acid from hot water'], ['Sublimation', 'Only one component sublimes', 'Camphor from sand'], ['Differential extraction', 'Second solvent immiscible with the first', 'Organic acid from water into ether'], ['Chromatography', 'Components held differently', 'Plant pigments']], 'Table of the condition each method needs and an example'),
      n: 'Each method has a condition. Crystallisation needs a solvent in which the solid dissolves much better when hot. Sublimation works only if one component sublimes and the other does not. Extraction needs a second solvent that does not mix with the first and dissolves the compound better. Chromatography separates components that are held on a surface to different extents.',
    }),
    sl('diagram', 'Fractional and steam distillation', {
      b: '**Fractional distillation** uses a packed column in which the vapour repeatedly condenses and vaporises, becoming richer in the more volatile liquid. In **steam distillation**, steam carries over a compound that is **immiscible with water**, and the mixture boils below 373 K.',
      v: V.distills,
      n: 'On the left is fractional distillation. The packed column gives many rounds of condensation and vaporisation, so the vapour at the top is richer in the more volatile liquid. On the right is steam distillation. Steam passes into the organic liquid and the mixture of steam and organic vapour condenses in the receiver, forming two layers.',
    }),
    sl('concept', 'The distillation family', {
      b: 'The choice depends on the **boiling points** and the **stability** of the liquid. Simple distillation needs a difference of about 40 K or more. A liquid that decomposes near its boiling point, such as glycerol, is distilled at **reduced pressure**, which lowers the boiling point.',
      v: table(['Method', 'When it is used', 'Example'], [['Simple distillation', 'Boiling points differ by about 40 K or more; stable liquid', 'Ether and toluene'], ['Fractional distillation', 'Boiling points close together', 'Ethanol and propan-1-ol'], ['Reduced-pressure distillation', 'Decomposes at its normal boiling point', 'Glycerol'], ['Steam distillation', 'Steam-volatile, immiscible with water', 'Aniline, essential oils']], 'Table of four distillation methods with the condition for each and an example'),
      n: 'Distillation comes in four forms. Simple distillation is for liquids whose boiling points are far apart. Fractional distillation is for boiling points close together. A liquid that breaks down near its boiling point, like glycerol, is distilled at reduced pressure. Steam distillation is for liquids that are carried by steam and do not mix with water.',
    }),
    sl('check', 'Quick check: miscible liquids with close boiling points', {
      b: 'Choose the method for a pair of miscible liquids that boil close together.',
      n: 'Quick check. Look at the difference between the boiling points before choosing the method.',
      chk: 'frac-mcq',
    }),
    sl('example', 'Worked example: choosing the method', {
      b: '**Problem.** Choose the purification method for each sample: (a) iodine mixed with sodium chloride; (b) nitrobenzene, which is immiscible with water and steam-volatile, in a tarry mixture; (c) two miscible liquids boiling at 351 K and 355 K.\n\n**Answer.** (a) **Sublimation**: iodine vaporises, sodium chloride does not. (b) **Steam distillation**: nitrobenzene is carried over with steam, the tar stays behind. (c) **Fractional distillation**: the 4 K difference is too small for a simple distillation.',
      v: table(['Sample', 'Key fact', 'Method'], [['Iodine + sodium chloride', 'Only iodine sublimes', 'Sublimation'], ['Nitrobenzene + tar', 'Steam-volatile, immiscible with water', 'Steam distillation'], ['Liquids at 351 K and 355 K', 'Boiling points 4 K apart', 'Fractional distillation']], 'Table choosing the purification method for three samples'),
      n: 'Work through the samples. Iodine with sodium chloride: iodine sublimes and the salt does not, so use sublimation. Nitrobenzene with tar: nitrobenzene is carried by steam and does not mix with water, so use steam distillation. Two liquids whose boiling points differ by only four kelvin: use fractional distillation.',
    }),
    sl('diagram', 'Chromatography and the R f value', {
      b: 'A mixture is spotted on a **start line**; the solvent (mobile phase) rises through the **stationary phase**, and each component travels a different distance. **R f = distance moved by the spot ÷ distance moved by the solvent front.** It is a ratio, so it has no unit and is always less than 1.',
      v: V.tlc,
      m: [r`R_f = \dfrac{d}{L} = \dfrac{4.4}{8.0} = 0.55`],
      n: 'This is a thin layer plate. The mixture lane shows three spots at the same heights as the pure samples, so the mixture holds all three. The R f value is the distance moved by the spot divided by the distance moved by the solvent front, both measured from the start line. It is a ratio of lengths, so it has no unit.',
    }),
    sl('concept', 'Adsorption and partition chromatography', {
      b: '**Adsorption** (column and thin-layer chromatography): the stationary phase is a solid such as silica gel or alumina; the **more strongly a component is adsorbed, the less it moves** and the smaller its R f. **Partition** (paper chromatography): the stationary phase is **water held in the paper fibres**, and components distribute between it and the moving solvent.',
      v: table(['Type', 'Stationary phase', 'Mobile phase', 'Basis'], [['Column', 'Silica or alumina in a tube', 'Eluting solvent', 'Adsorption'], ['Thin layer', 'Silica on a glass plate', 'Solvent rising by capillary action', 'Adsorption'], ['Paper', 'Water in cellulose fibres', 'Solvent rising by capillary action', 'Partition']], 'Table of column, thin layer and paper chromatography with stationary phase, mobile phase and basis'),
      n: 'There are two bases of separation. In adsorption chromatography, the stationary phase is a solid, such as silica gel, and the component held most strongly moves least. In paper chromatography, the stationary phase is water held in the paper fibres, and the components distribute between that water and the moving solvent. This is called partition.',
    }),
    sl('check', 'Quick check: the R f value', {
      b: 'Calculate the R f value from two distances measured on a paper strip.',
      n: 'Quick check. Divide the distance moved by the spot by the distance moved by the solvent front.',
      chk: 'rf-num',
    }),
    sl('concept', 'Detecting carbon and hydrogen', {
      b: 'Heat the dry compound with **copper(II) oxide**. Carbon is oxidised to **CO₂**, which turns lime water **milky**. Hydrogen is oxidised to **water**, which turns white anhydrous **CuSO₄ blue**.',
      v: chem('CO2 + Ca(OH)2 -> CaCO3 + H2O', 'Carbon dioxide reacting with lime water to give a milky precipitate of calcium carbonate', 'Lime water turns milky with carbon dioxide.'),
      n: 'To detect carbon and hydrogen, heat the dry compound with copper oxide. The carbon becomes carbon dioxide, which turns lime water milky. The hydrogen becomes water, which turns white anhydrous copper sulphate blue. These two observations confirm the presence of carbon and hydrogen in the compound.',
    }),
    sl('diagram', 'Lassaigne’s test: the plan', {
      b: 'Fuse the compound with **sodium**, plunge into water, boil and filter. Nitrogen, sulphur and halogens are now **ions in water**: CN⁻, S²⁻ and X⁻ (and SCN⁻ if N and S are both present). Each is tested separately.',
      v: V.lass,
      n: 'Lassaigne test starts with sodium fusion. Heating the compound with sodium converts nitrogen, sulphur and halogens into sodium cyanide, sodium sulphide and sodium halide, which dissolve in water. After boiling and filtering we have the extract, and each ion is tested on its own with its own reagents.',
    }),
    sl('concept', 'Reactions of the fusion', {
      b: 'In the fusion tube the elements combine with sodium: nitrogen with carbon gives **NaCN**, sulphur gives **Na₂S** and a halogen gives **NaX**. If both N and S are present, **NaSCN** may form instead.',
      v: chem('Na + C + N -> NaCN', 'Formation of sodium cyanide in sodium fusion', 'Companion reactions: 2Na + S gives Na₂S and Na + X gives NaX.'),
      n: 'These are the fusion reactions. Sodium with carbon and nitrogen forms sodium cyanide. Sodium with sulphur forms sodium sulphide. Sodium with a halogen forms the sodium halide. When both nitrogen and sulphur are present and the sodium is limited, sodium thiocyanate can form instead.',
    }),
    sl('concept', 'Nitrogen: the Prussian blue test', {
      b: 'Warm the extract with **iron(II) sulphate** and NaOH to form **sodium hexacyanidoferrate(II)**; boil, then acidify with dilute H₂SO₄. Some Fe²⁺ is oxidised to Fe³⁺, which forms **Prussian blue**, iron(III) hexacyanidoferrate(II).',
      v: chem('FeSO4 + 6NaCN -> Na4Fe(CN)6 + Na2SO4', 'Iron(II) sulphate reacts with sodium cyanide to form sodium hexacyanidoferrate(II)', 'This is the first stage; the iron(III) ions then form the blue precipitate.'),
      m: [r`3\,\ce{Na4Fe(CN)6} + 4\,\ce{FeCl3} \longrightarrow \ce{Fe4[Fe(CN)6]3} + 12\,\ce{NaCl}`],
      n: 'For nitrogen, iron two sulphate is added to the extract and warmed. Cyanide ions form sodium hexacyanidoferrate two. After boiling and acidifying, iron three ions are present. They react with the hexacyanidoferrate to give the deep blue precipitate called Prussian blue, which confirms nitrogen.',
    }),
    sl('concept', 'Sulphur, halogens, and nitrogen with sulphur', {
      b: '**Sulphur:** lead acetate gives **black PbS**; fresh nitroprusside gives **violet**. **Halogens:** **boil with dilute HNO₃** (removes CN⁻ and S²⁻ as HCN and H₂S), cool, add AgNO₃: AgCl white, AgBr pale yellow, AgI yellow. **N and S together:** acidify with HCl, add FeCl₃ for **blood-red** Fe(SCN)₃.',
      v: table(['Test', 'Reagent', 'Result'], [['S', 'Lead acetate in acetic acid', 'Black PbS'], ['S', 'Sodium nitroprusside', 'Violet colour'], ['Cl, Br, I', 'HNO₃ then AgNO₃', 'AgCl white, AgBr pale yellow, AgI yellow'], ['N and S', 'HCl then FeCl₃', 'Blood-red Fe(SCN)₃']], 'Table of reagents and results for sulphur, halogens, and nitrogen with sulphur'),
      n: 'Sulphur gives a black precipitate with lead acetate, or a violet colour with nitroprusside. For halogens, boil the extract with nitric acid first to remove cyanide and sulphide, then add silver nitrate. The precipitate is white for chlorine, pale yellow for bromine and yellow for iodine. If nitrogen and sulphur are both present, ferric chloride gives a blood red colour.',
    }),
    sl('check', 'Quick check: Prussian blue', {
      b: 'Name the coloured substance formed in the test for nitrogen.',
      n: 'Quick check. Think about which iron ions combine with hexacyanidoferrate two.',
      chk: 'prussian-mcq',
    }),
    sl('example', 'Worked example: reading the observations', {
      b: '**Problem.** A fusion extract of an unknown compound gives: (i) no Prussian blue; (ii) a black precipitate with lead acetate; (iii) after boiling with HNO₃, a white precipitate with AgNO₃ that dissolves in dilute ammonia. Name the elements and the precipitates.\n\n**Answer.** (i) Nitrogen is absent. (ii) Sulphur is present (PbS). (iii) Chlorine is present: AgCl is white and readily soluble in ammonia.',
      v: table(['Observation', 'Conclusion'], [['No Prussian blue', 'Nitrogen absent'], ['Black precipitate, lead acetate', 'Sulphur present (PbS)'], ['White precipitate, soluble in dilute ammonia', 'Chlorine present (AgCl)']], 'Table matching three observations from a fusion extract with the elements detected'),
      n: 'Read each observation. No Prussian blue means nitrogen is absent. A black precipitate with lead acetate means sulphur is present as lead sulphide. After boiling with nitric acid, a white precipitate that dissolves in dilute ammonia is silver chloride, so chlorine is present.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Choose crystallisation, sublimation, extraction, distillation (simple, fractional, reduced-pressure, steam) or chromatography from the properties of the components.',
        'R f is a ratio of two distances, has no unit, and is always below 1.',
        'C and H: heat with CuO; lime water milky and CuSO₄ blue.',
        'Lassaigne: fuse with Na; CN⁻, S²⁻, X⁻ are tested in the extract; boil with HNO₃ before testing for halogens.',
      ],
      v: table(['Element', 'Ion', 'Confirmation'], [['N', 'CN⁻', 'Prussian blue'], ['S', 'S²⁻', 'Black PbS or violet'], ['Cl, Br, I', 'X⁻', 'AgX after boiling with HNO₃'], ['N + S', 'SCN⁻', 'Blood-red Fe(SCN)₃']], 'Summary table of the Lassaigne test for N, S, halogens and N with S'),
      n: 'To sum up. Pick a purification method from the property in which the compound differs from its impurities. The R f value is a ratio of two distances and is always less than one. Carbon and hydrogen are detected with copper oxide. In Lassaigne test the extract is tested for cyanide, sulphide and halide, and is boiled with nitric acid before the halogen test.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give the principle as well as the name of the method, and compare boiling points when choosing between simple and fractional distillation.',
        'State that the extract is boiled with HNO₃ before AgNO₃, and why.',
        'Write balanced equations for the Lassaigne reactions and name the coloured compound.',
        'Do not write a unit for R f.',
      ],
      v: table(['Slip', 'Fix'], [['Steam distillation for a liquid miscible with water', 'The compound must be immiscible with water'], ['AgNO₃ added without boiling with HNO₃', 'CN⁻ and S²⁻ would also precipitate'], ['R f = 3.5 cm', 'R f is a ratio and has no unit']], 'Table of three common slips in purification and qualitative analysis with the fix'),
      n: 'A few tips. State the principle of the method, not just its name. Remember the boiling with nitric acid before adding silver nitrate, and give the reason. Write balanced equations for the Lassaigne reactions. And never give a unit for the R f value, because it is a ratio.',
    }),
  ],
});

// ================================================================== deck 2
export const deck2 = deck({
  part: 2,
  title: 'Purification and Analysis of Organic Compounds — Part 2: Quantitative analysis',
  goals: [
    'Describe Liebig’s method and calculate the percentages of carbon and hydrogen',
    'Describe the stages of Kjeldahl’s method and calculate the percentage of nitrogen, including a back titration',
    'Describe the Carius method for halogens, sulphur and phosphorus',
    'Calculate the percentage of an element from the mass of the precipitate weighed',
  ],
  slides: [
    sl('title', 'Weighing what the compound makes', {
      b: 'Estimation converts an element of the compound into a **substance that can be weighed**: CO₂ and H₂O for C and H, NH₃ (titrated) for N, and AgX, BaSO₄ and Mg₂P₂O₇ for halogens, sulphur and phosphorus. The mass of the product gives the mass of the element.',
      v: table(['Element', 'Method', 'Measured', 'Formula'], [['C', 'Liebig', 'Mass of CO₂', '12/44 × m₁/m × 100'], ['H', 'Liebig', 'Mass of H₂O', '2/18 × m₂/m × 100'], ['N', 'Kjeldahl', 'Acid neutralised by NH₃', '1.4 × N × V/m'], ['X, S, P', 'Carius', 'Mass of AgX, BaSO₄, Mg₂P₂O₇', 'part/ppt × m₁/m × 100']], 'Table of the elements, estimation methods, quantity measured and formula'),
      n: 'Estimation turns an element in the compound into something that can be weighed or titrated. Carbon and hydrogen are weighed as carbon dioxide and water. Nitrogen is found from the acid that the ammonia neutralises. Halogens, sulphur and phosphorus are weighed as a silver halide, barium sulphate and magnesium pyrophosphate. The mass of the product gives the mass of the element.',
    }),
    sl('diagram', 'Liebig’s train', {
      b: 'A weighed sample is burnt in pure oxygen over hot **CuO**. **Water** is absorbed in a weighed U-tube of **anhydrous CaCl₂**, and then **CO₂** in weighed bulbs of **concentrated KOH**. The increases in mass give m(H₂O) and m(CO₂).',
      v: V.liebig,
      n: 'In Liebig method a weighed sample burns in oxygen over hot copper oxide. First the water is taken up by anhydrous calcium chloride in a weighed U tube. Then the carbon dioxide is taken up by concentrated potassium hydroxide in weighed bulbs. The gain in mass of each absorber is used in the calculation.',
    }),
    sl('concept', 'The chemistry in the combustion tube', {
      b: 'Hot CuO supplies oxygen and burns off any CO or unburnt vapour. For ethane: **C₂H₆ + 7CuO → 2CO₂ + 3H₂O + 7Cu**. The CaCl₂ must come first, since KOH solution would take up water as well as CO₂. In KOH: CO₂ + 2KOH → K₂CO₃ + H₂O.',
      v: chem('C2H6 + 7CuO -> 2CO2 + 3H2O + 7Cu', 'Oxidation of ethane by copper(II) oxide to carbon dioxide, water and copper', 'Every carbon ends up as CO₂ and every hydrogen as H₂O.'),
      n: 'This is the chemistry in the combustion tube. Hot copper oxide oxidises the compound completely. In the example ethane gives carbon dioxide, water and copper. The calcium chloride tube is placed first because it takes up only water. Concentrated potassium hydroxide would take up carbon dioxide and also water, so it must come second.',
    }),
    sl('example', 'Worked example: carbon, hydrogen and oxygen', {
      b: r`**Problem.** ${f(E1.m, 4)} g of a compound containing C, H and O gave ${f(E1.mc, 4)} g of CO₂ and ${f(E1.mh, 4)} g of H₂O. Find the percentage of each element.

**%C** $= \dfrac{12}{44} \times \dfrac{${f(E1.mc, 4)}}{${f(E1.m, 4)}} \times 100 = ${f(E1.c, 1)}\%$; **%H** $= \dfrac{2}{18} \times \dfrac{${f(E1.mh, 4)}}{${f(E1.m, 4)}} \times 100 = ${f(E1.h, 2)}\%$; **%O** $= 100 - ${f(E1.c, 1)} - ${f(E1.h, 2)} = ${f(E1.o, 1)}\%$ (by difference).`,
      v: table(['Element', 'Mass fraction formula', 'Result'], [['C', '12/44 × m(CO₂)/m × 100', `${f(E1.c, 1)}%`], ['H', '2/18 × m(H₂O)/m × 100', `${f(E1.h, 2)}%`], ['O', '100 − (%C + %H)', `${f(E1.o, 1)}%`]], 'Table of the percentages of carbon, hydrogen and oxygen found'),
      n: 'Work out carbon first from the mass of carbon dioxide, multiplying by twelve over forty four. Hydrogen comes from the water, multiplying by two over eighteen. Oxygen is not measured directly. It is found by subtracting the carbon and hydrogen percentages from one hundred.',
    }),
    sl('check', 'Quick check: percentage of carbon', {
      b: 'Calculate %C from the gain in mass of the KOH bulbs.',
      n: 'Quick check. Multiply the mass of carbon dioxide by twelve over forty four, then divide by the mass of the compound.',
      chk: 'carbon-num',
    }),
    sl('diagram', 'Kjeldahl’s method', {
      b: '**Digestion:** heat the compound with concentrated H₂SO₄, K₂SO₄ and CuSO₄: nitrogen becomes (NH₄)₂SO₄. **Distillation:** boil with excess NaOH; NH₃ passes through a bulb trap and condenser into a measured volume of standard H₂SO₄.',
      v: V.kjeld,
      n: 'Kjeldahl method has two stages. In digestion the compound is heated with concentrated sulphuric acid, potassium sulphate and copper sulphate, and its nitrogen becomes ammonium sulphate. In distillation, excess sodium hydroxide releases ammonia, which passes through a bulb trap and a condenser and is absorbed in a known volume of standard sulphuric acid.',
    }),
    sl('concept', 'Equations and the formula for nitrogen', {
      b: 'The ammonia reacts with the acid, and the unused acid is titrated with standard NaOH. The acid used by NH₃ in mL of normality N gives **%N = 1.4 × N × V ÷ m**, where m is the mass of the compound in g.',
      v: chem('(NH4)2SO4 + 2NaOH -> Na2SO4 + 2NH3 + 2H2O', 'Ammonium sulphate reacting with sodium hydroxide to liberate ammonia', 'The ammonia is then absorbed in standard sulphuric acid.'),
      m: [r`\%\,\text{N} = \dfrac{1.4 \times N \times V}{m}`],
      n: 'The ammonium sulphate reacts with sodium hydroxide to release ammonia. The ammonia is absorbed in the standard acid and any acid left over is titrated with standard alkali. From the volume of acid the ammonia used, in millilitres, and its normality, the percentage of nitrogen is one point four times normality times volume divided by the mass of the compound.',
    }),
    sl('concept', 'Where Kjeldahl’s method does not work', {
      b: 'The method fails when the nitrogen is **not fully converted to ammonium sulphate**: **nitro** compounds, **azo** compounds and **ring nitrogen** (as in pyridine). It works well for amines, amides and proteins.',
      v: table(['Compound type', 'Kjeldahl suitable?', 'Reason'], [['Amines, amides, urea', 'Yes', 'N converted to (NH₄)₂SO₄'], ['Proteins', 'Yes', 'N converted to (NH₄)₂SO₄'], ['Nitro and azo compounds', 'No', 'N not completely converted'], ['Pyridine (ring N)', 'No', 'N not completely converted']], 'Table of compound types, whether Kjeldahl method is suitable, and the reason'),
      n: 'Kjeldahl method has limits. It is suited to amines, amides, urea and proteins, whose nitrogen becomes ammonium sulphate. It does not give reliable results for nitro and azo compounds, or for compounds with nitrogen in a ring, such as pyridine, because the nitrogen is not completely converted.',
    }),
    sl('example', 'Worked example: Kjeldahl with a back titration', {
      b: r`**Problem.** The ammonia from ${f(E2.m, 4)} g of a compound is passed into ${f(E2.Va, 1)} mL of ${f(E2.Ma, 3)} mol L⁻¹ H₂SO₄. The excess acid needs ${f(E2.Vb, 1)} mL of ${f(E2.Mb, 3)} mol L⁻¹ NaOH. Find %N.

H⁺ taken $= 2 \times ${f(E2.Ma, 3)} \times 0.0500 = ${f(E2.nAcid, 4)}$ mol; H⁺ left $= ${f(E2.nBase, 4)}$ mol; $n(\ce{NH3}) = ${f(E2.nNH3, 4)}$ mol. Mass of N $= ${f(E2.nNH3 * A.N, 4)}$ g, so **%N** $= \dfrac{${f(E2.nNH3 * A.N, 4)}}{${f(E2.m, 4)}} \times 100 = ${f(E2.v, 2)}\%$.`,
      v: table(['Step', 'Quantity'], [['H⁺ in the acid taken', `${f(E2.nAcid, 4)} mol`], ['H⁺ left (= NaOH used)', `${f(E2.nBase, 4)} mol`], ['NH₃ absorbed', `${f(E2.nNH3, 4)} mol`], ['%N', `${f(E2.v, 2)}%`]], 'Table of the steps in a Kjeldahl back titration with the quantities found'),
      n: 'This is a back titration. First find the moles of hydrogen ions in the acid taken, remembering that sulphuric acid gives two per formula unit. Subtract the moles of hydrogen ions left, which equal the moles of sodium hydroxide used. The difference is the moles of ammonia, so multiply by fourteen and divide by the mass of the compound.',
    }),
    sl('check', 'Quick check: Kjeldahl percentage', {
      b: 'Find %N when the ammonia exactly neutralises a known volume of acid.',
      n: 'Quick check. Convert molarity to normality by multiplying by two, then use one point four times normality times volume over mass.',
      chk: 'kj-num',
    }),
    sl('diagram', 'The Carius method', {
      b: 'The compound is heated with **fuming HNO₃** in a sealed thick-walled glass tube in a furnace. Halogens become halide ions, sulphur becomes **H₂SO₄** and phosphorus becomes **H₃PO₄**; each is precipitated and weighed.',
      v: V.carius,
      n: 'In the Carius method the compound is heated in a sealed tube with fuming nitric acid. Carbon and hydrogen are oxidised away. Halogens become halide ions and are precipitated with silver nitrate. Sulphur becomes sulphuric acid and is precipitated with barium chloride. Phosphorus becomes phosphoric acid and is precipitated with magnesia mixture.',
    }),
    sl('concept', 'Formulas for halogens, sulphur and phosphorus', {
      b: 'In every case **%element = (mass of the element in one mole of precipitate ÷ molar mass of precipitate) × (mass of precipitate ÷ mass of compound) × 100**. Molar masses: AgCl 143.5, AgBr 188, AgI 235, BaSO₄ 233, Mg₂P₂O₇ 222.',
      v: table(['Element', 'Weighed', 'Fraction', 'Formula'], [['Cl', 'AgCl (143.5)', '35.5/143.5', '35.5/143.5 × m₁/m × 100'], ['Br', 'AgBr (188)', '80/188', '80/188 × m₁/m × 100'], ['I', 'AgI (235)', '127/235', '127/235 × m₁/m × 100'], ['S', 'BaSO₄ (233)', '32/233', '32/233 × m₁/m × 100'], ['P', 'Mg₂P₂O₇ (222)', '62/222', '62/222 × m₁/m × 100']], 'Table of elements, the precipitate weighed, its molar mass and the formula for the percentage'),
      n: 'All the Carius calculations use one pattern. Take the mass of the element in one mole of the precipitate, divide by the molar mass of the precipitate, multiply by the mass of precipitate over mass of compound, and multiply by one hundred. The fractions are chlorine in silver chloride, bromine in silver bromide, iodine in silver iodide, sulphur in barium sulphate and two phosphorus in magnesium pyrophosphate.',
    }),
    sl('example', 'Worked example: sulphur by the Carius method', {
      b: r`**Problem.** ${f(E3.m, 4)} g of an organic sulphur compound gave ${f(E3.p, 4)} g of BaSO₄ (Ba = 137, S = 32, O = 16). Find %S.

**%S** $= \dfrac{32}{233} \times \dfrac{${f(E3.p, 4)}}{${f(E3.m, 4)}} \times 100 = ${f(E3.v, 2)}\%$.`,
      v: table(['Quantity', 'Value'], [['Molar mass of BaSO₄', '233'], ['Mass of S in 233 g BaSO₄', '32 g'], ['Mass of precipitate ÷ mass of compound', `${f(E3.p / E3.m, 3)}`], ['%S', `${f(E3.v, 2)}%`]], 'Table of the quantities used in the sulphur estimation example'),
      n: 'For sulphur the weighed compound is barium sulphate. Its molar mass is two hundred and thirty three, of which thirty two is sulphur. Multiply that fraction by the mass of barium sulphate over the mass of the compound, and then by one hundred, to get the percentage of sulphur.',
    }),
    sl('check', 'Quick check: percentage of chlorine', {
      b: 'Find %Cl from the mass of AgCl formed in a Carius estimation.',
      n: 'Quick check. Use thirty five point five over one hundred and forty three point five as the fraction of chlorine in silver chloride.',
      chk: 'cl-num',
    }),
    sl('concept', 'Phosphorus: from H₃PO₄ to Mg₂P₂O₇', {
      b: 'Phosphoric acid is precipitated with **magnesia mixture** (MgCl₂, NH₄Cl and ammonia) as **MgNH₄PO₄**, filtered, washed and **ignited** to **Mg₂P₂O₇**, which is weighed. Each Mg₂P₂O₇ contains 2 P.',
      v: chem('2MgNH4PO4 -> Mg2P2O7 + 2NH3 + H2O', 'Ignition of magnesium ammonium phosphate to magnesium pyrophosphate', 'The pyrophosphate is the weighed form.'),
      n: 'For phosphorus, phosphoric acid is precipitated with magnesia mixture as magnesium ammonium phosphate. The precipitate is filtered, washed and strongly heated, which gives magnesium pyrophosphate, the weighed form. Every pyrophosphate unit contains two phosphorus atoms, so the fraction used is sixty two over two hundred and twenty two.',
    }),
    sl('concept', 'Which estimation for which element?', {
      b: 'C and H come from **Liebig’s method**, N from **Kjeldahl’s** (titration), and halogens, S and P from the **Carius method**. In each, a known fraction of the product is the element, so one pattern solves every numerical.',
      v: flow('LR', [['a', 'Compound'], ['b', 'Liebig: CO₂ and H₂O weighed'], ['c', 'Kjeldahl: NH₃ titrated'], ['d', 'Carius: AgX, BaSO₄, Mg₂P₂O₇ weighed']], [['a', 'b'], ['a', 'c'], ['a', 'd']], 'Flow chart from the compound to the three estimation methods and what is measured in each'),
      n: 'The three methods in one picture. Carbon and hydrogen use Liebig method and the weighing of carbon dioxide and water. Nitrogen uses Kjeldahl method and a titration of the ammonia. Halogens, sulphur and phosphorus use the Carius method and the weighing of a precipitate. In each, the element is a known fraction of the product.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Liebig: %C = 12/44 × m(CO₂)/m × 100 and %H = 2/18 × m(H₂O)/m × 100; CaCl₂ for water, KOH for CO₂.',
        'Kjeldahl: digestion with H₂SO₄, K₂SO₄, CuSO₄; distillation with NaOH; %N = 1.4 × N × V/m; not for nitro, azo or ring nitrogen.',
        'Carius: fuming HNO₃ in a sealed tube; weigh AgX, BaSO₄ or Mg₂P₂O₇.',
        'Oxygen is found by difference.',
      ],
      v: table(['Estimate', 'Weighed or titrated', 'Fraction'], [['C', 'CO₂', '12/44'], ['H', 'H₂O', '2/18'], ['Cl', 'AgCl', '35.5/143.5'], ['S', 'BaSO₄', '32/233'], ['P', 'Mg₂P₂O₇', '62/222']], 'Summary table of the elements estimated, the product measured and the fraction used'),
      n: 'In summary. Liebig method gives carbon from carbon dioxide and hydrogen from water. Kjeldahl method gives nitrogen from the acid neutralised by ammonia. The Carius method gives halogens, sulphur and phosphorus from the precipitate weighed. Each calculation multiplies a fixed fraction by the ratio of the product mass to the compound mass, and oxygen is found by difference.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the formula first, then substitute with units; give the answer to the right significant figures.',
        'In a back titration, subtract the acid left over from the acid taken before using the formula.',
        'Remember that H₂SO₄ is dibasic: normality is twice the molarity.',
        'Name the weighed compound in each Carius estimation.',
      ],
      v: table(['Slip', 'Fix'], [['Using the molarity of H₂SO₄ as normality', 'Normality is 2 × molarity'], ['Using 233 for the molar mass of AgBr', '233 is BaSO₄; AgBr is 188'], ['Writing KOH before CaCl₂ in the train', 'CaCl₂ (water) comes first']], 'Table of three common slips in quantitative analysis with the fix'),
      n: 'Some tips for the exam. Write the formula before substituting. In a back titration, subtract the acid left over from the acid taken. Remember that sulphuric acid is dibasic, so its normality is twice its molarity. And name the compound that is weighed in each Carius estimation, because marks are given for it.',
    }),
  ],
});
