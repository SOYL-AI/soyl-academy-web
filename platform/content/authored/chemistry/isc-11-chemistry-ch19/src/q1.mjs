// ch19 question bank, part 1: t01 purification methods (topic 1) and t02 qualitative analysis (topic 2).
import { mk, add, r, near, dec } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;

// ---------------------------------------------------------------- t01 purification
add('sub-mcq', mcq({
  stem: 'A teacher at a school in Jaipur has a powder that is a mixture of ammonium chloride and fine sand. The simplest way to recover the ammonium chloride is:',
  right: 'sublimation',
  wrong: ['steam distillation', 'fractional distillation', 'differential extraction with ether'],
  sol: 'Ammonium chloride changes directly from solid to vapour on heating and the vapour condenses on a cool surface, while sand does not vaporise: sublimation — option (@K). The other three methods work on liquids (@1, @2) or need a solvent (@3).',
  d: 1, c: 'understanding', t: [1],
}));
add('steam-mcq', mcq({
  stem: 'A flavour company wants to isolate an oil present in crushed cardamom seeds, which decomposes near its normal boiling point, by steam distillation. The method can be used only if the oil is:',
  right: 'volatile in steam and immiscible with water',
  wrong: ['non-volatile and soluble in water', 'miscible with water and stable above 373 K', 'non-volatile in steam and immiscible with water'],
  sol: 'A mixture of two immiscible liquids boils when the sum of their vapour pressures equals atmospheric pressure, below 373 K, so the oil must be steam-volatile and immiscible with water — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('redp-mcq', mcq({
  stem: 'Glycerol, bp 563 K, partly decomposes at its normal boiling point. A chemist at a soap works purifies it by:',
  right: 'distillation under reduced pressure',
  wrong: ['simple distillation at atmospheric pressure', 'steam distillation', 'sublimation'],
  sol: 'Lowering the external pressure lowers the boiling point, so glycerol distils below its decomposition temperature — option (@K). Atmospheric distillation (@1) would decompose it, steam distillation (@2) fails because glycerol is miscible with water, and glycerol does not sublime (@3).',
  d: 2, c: 'application', t: [1],
}));
add('frac-mcq', mcq({
  stem: 'A lab technician has a miscible mixture of hexane (bp 342 K) and heptane (bp 372 K) and wants both liquids with good purity. The most suitable method is:',
  right: 'fractional distillation',
  wrong: ['simple distillation', 'steam distillation', 'crystallisation'],
  sol: 'The boiling points differ by only 30 K, which is too small for a single simple distillation (@1) to give clean fractions; a fractionating column, which gives repeated vapourisation and condensation, does it — option (@K). Crystallisation (@3) is for solids; steam distillation (@2) is for water-immiscible, steam-volatile substances.',
  d: 2, c: 'application', t: [1],
}));
add('simple-mcq', mcq({
  stem: 'Which mixture, prepared in a research lab, can be separated by a simple distillation?',
  right: 'diethyl ether (bp 308 K) and toluene (bp 384 K)',
  wrong: ['ethanol (bp 351 K) and propan-1-ol (bp 370 K)', 'hexane (bp 342 K) and cyclohexane (bp 354 K)', 'methanol (bp 338 K) and ethyl ethanoate (bp 350 K)'],
  sol: 'Simple distillation needs a large difference in boiling points, about 40 K or more; ether and toluene differ by 76 K — option (@K). The other pairs differ by 19 K, 12 K and 12 K (@1, @2, @3).',
  d: 2, c: 'application', t: [1],
}), () => 384 - 308 > 40 && 370 - 351 < 40 && 354 - 342 < 40 && 350 - 338 < 40 || 'simple');
add('paper-mcq', mcq({
  stem: 'A student runs a spot of leaf pigments on filter paper with a petroleum ether–propanone mixture. In this paper chromatography the stationary phase is:',
  right: 'water held in the fibres of the paper',
  wrong: ['the solvent mixture that rises up the paper', 'the pencil start line', 'the solvent front'],
  sol: 'In paper chromatography, partition occurs between the water held in the cellulose fibres (stationary) and the moving solvent — option (@K). The solvent is the mobile phase (@1).',
  d: 2, c: 'understanding', t: [1],
}));
add('adsorb-mcq', mcq({
  stem: 'Three dyes are run on a silica gel TLC plate. Dye P is adsorbed most strongly on silica, dye Q moderately and dye R weakly. After development, the dye with the highest Rf value is:',
  right: 'R, because it is held least by the adsorbent and moves with the solvent',
  wrong: ['P, because it is held most strongly and so travels farthest', 'Q, because moderate adsorption gives the largest movement', 'all three, because the solvent front moves them equally'],
  sol: 'On an adsorbent, the more strongly a component is held the less it moves, so its Rf is smaller; R, held least, travels farthest — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('extract-mcq', mcq({
  stem: 'An organic acid dissolved in water at a dye factory is shaken with ethoxyethane in a separating funnel. The acid moves into the ether layer. This differential extraction works because the acid is:',
  right: 'more soluble in ether than in water, and ether is immiscible with water',
  wrong: ['more soluble in water than in ether', 'equally soluble in both and ether mixes completely with water', 'insoluble in ether, which is miscible with water'],
  sol: 'The compound is shifted into the immiscible solvent in which it dissolves better, and the two layers are then separated — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('cryst-mcq', mcq({
  stem: 'A sample of impure benzoic acid containing a little insoluble dirt is purified in a school lab by crystallisation. The correct order of operations is:',
  right: 'dissolve in hot water, filter while hot, cool, filter the crystals, wash and dry',
  wrong: ['cool in ice, dissolve in water, filter, then heat to dryness', 'dissolve in hot water, cool, then filter off the dirt and boil off the water', 'heat the solid until it vapourises and condense it on a cold surface'],
  sol: 'Hot filtration removes the insoluble dirt while the acid stays dissolved, cooling then crystallises the pure acid, and filtering, washing and drying isolate it — option (@K). The last option (@3) describes sublimation.',
  d: 2, c: 'understanding', t: [1],
}));
add('nitrophenol-mcq', mcq({
  stem: 'Nitration of phenol gives a mixture of o-nitrophenol and p-nitrophenol. The mixture can be separated by steam distillation because:',
  right: 'o-nitrophenol, with intramolecular hydrogen bonding, is steam-volatile and p-nitrophenol, with intermolecular hydrogen bonding, is not',
  wrong: ['p-nitrophenol is steam-volatile because it has intramolecular hydrogen bonding', 'both isomers are equally volatile but differ in colour', 'o-nitrophenol is soluble in water while p-nitrophenol is insoluble'],
  sol: 'Intramolecular hydrogen bonding in the ortho isomer keeps molecules separate, so it is volatile; the para isomer associates through intermolecular hydrogen bonds and is not volatile — option (@K).',
  d: 4, c: 'analysis', t: [1],
}));
add('sub-ar', ar({
  a: 'A mixture of naphthalene and sodium chloride can be separated by sublimation.',
  r: 'Silver iodide is insoluble in aqueous ammonia.',
  key: 'b',
  sol: 'Both are true: naphthalene sublimes on heating and sodium chloride does not, and silver iodide does not dissolve in ammonia solution. The reason has no bearing on the separation — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('frac-ar', ar({
  a: 'Fractional distillation is used to separate miscible liquids whose boiling points differ by a large amount.',
  r: 'Vapour rising in a fractionating column becomes richer in the less volatile component.',
  key: 'd',
  sol: 'Both are false. It is used for liquids with boiling points close together (a large difference needs only simple distillation), and the vapour becomes richer in the more volatile component as it rises — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('rf-ar', ar({
  a: 'The Rf value of a compound in chromatography is always less than one.',
  r: 'A spot can move farther than the solvent front.',
  key: 'c',
  sol: 'A is true: Rf is the distance moved by the spot divided by that moved by the solvent front, and the spot cannot travel farther than the front. R is false for the same reason — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('cryst-tf', tf({
  stem: 'Crystallisation is the best method to purify a solid whose solubility in the solvent is almost the same at all temperatures.',
  key: 'f',
  sol: 'False. It needs a solvent in which the solid is much more soluble when hot than when cold, so that crystals separate on cooling.',
  d: 1, c: 'understanding', t: [1],
}));
add('rf-fill', fill({
  stem: 'In chromatography the ratio of the distance moved by a substance to the distance moved by the solvent front is called the ___ value.',
  acc: [['Rf', 'retention factor', 'R_f']],
  sol: 'The **Rf** (retention factor) value.',
  d: 1, c: 'recall', t: [1],
}));
add('methods-match', match({
  stem: 'Match each purification problem with the most suitable method.',
  pairs: [
    ['Camphor mixed with powdered glass', 'Sublimation'],
    ['Ethanol and propan-1-ol, both miscible', 'Fractional distillation'],
    ['Eucalyptus oil in crushed leaves', 'Steam distillation'],
    ['Glycerol that decomposes near its boiling point', 'Distillation under reduced pressure'],
  ],
  order: [3, 0, 1, 2],
  sol: 'Camphor sublimes and glass does not. Ethanol and propan-1-ol boil about 19 K apart, which needs a fractionating column. The oil is steam-volatile and immiscible with water. Glycerol decomposes at its normal boiling point, so the pressure is reduced.',
  d: 2, c: 'application', t: [1],
}));
add('sublimation-short', short({
  marks: 2,
  stem: 'Name two organic solids that can be purified by sublimation, state the principle, and say why the method fails for a solid mixed with another sublimable solid.',
  model: 'Naphthalene and camphor (also benzoic acid or anthracene). Principle: a solid that changes straight to vapour on heating is separated from non-volatile impurities, and the vapour is condensed on a cool surface as pure solid. If the impurity also sublimes, both vaporise and condense together, so they are not separated.',
  sol: 'Two solids; principle; limitation.',
  scheme: [['Two correct solids', 0.5], ['Principle: vapourises without melting, vapour re-condenses', 1], ['Fails when the impurity also sublimes', 0.5]],
  d: 1, c: 'understanding', t: [1],
}));
add('phases-short', short({
  marks: 2,
  stem: 'A research student separates plant pigments first on a silica column and then on filter paper. Name the stationary phase in each case, the type of chromatography and the mobile phase used.',
  model: 'Column: the stationary phase is silica gel (an adsorbent), so it is adsorption chromatography. Paper: water held in the cellulose fibres is the stationary phase, so it is partition chromatography. In both, the mobile phase is the solvent (eluent) that moves through the stationary phase.',
  sol: 'Silica, adsorption; water in paper, partition; solvent is mobile.',
  scheme: [['Silica column: adsorbent, adsorption chromatography', 1], ['Paper: water in cellulose, partition chromatography', 0.5], ['Mobile phase is the solvent', 0.5]],
  d: 2, c: 'understanding', t: [1],
}));
add('steam-short', short({
  marks: 2,
  stem: 'An essential oil is obtained by passing steam through crushed lemon-grass leaves. State the two conditions that the oil must satisfy for this steam distillation to work, and explain why it distils below 373 K.',
  model: 'The oil must be volatile in steam and immiscible with water. The mixture boils when the sum of the vapour pressures of water and the oil equals the atmospheric pressure, which is reached at a temperature lower than the boiling point of either liquid, so the oil distils below 373 K without decomposing.',
  sol: 'Two conditions; sum of vapour pressures.',
  scheme: [['Steam-volatile and immiscible with water', 1], ['Total vapour pressure equals atmospheric pressure below 373 K', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('frac-short3', short({
  marks: 3,
  stem: 'Describe how fractional distillation separates a mixture of two miscible liquids with boiling points 30 K apart, naming the part of the apparatus that makes it more efficient than simple distillation and what happens inside it.',
  model: 'The mixture is heated in a flask fitted with a fractionating column (packed with glass beads or rings) and a thermometer at the top, followed by a condenser. The vapour rising in the column condenses and re-vaporises many times on the beads; at each stage the vapour becomes richer in the more volatile liquid. The more volatile liquid reaches the top first and distils at its boiling point, and the less volatile liquid collects later when the temperature rises. The column provides a large surface for repeated vapourisation and condensation, which simple distillation does not.',
  sol: 'Column; repeated condensation and vapourisation; richer in the more volatile liquid.',
  scheme: [['Fractionating column with beads and thermometer', 1], ['Repeated condensation–vapourisation; vapour richer in the more volatile liquid', 1], ['Lower-boiling fraction collected first; why it beats simple distillation', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('chroma-short3', short({
  marks: 3,
  stem: 'In an experiment on ink, a spot of black ink is placed on a start line and developed in a solvent. Explain how the components separate, define Rf and say why Rf has no unit and is always below one.',
  model: 'Each component is held to the stationary phase to a different extent and dissolves in the moving solvent to a different extent, so components that are held weakly or dissolve well travel farther and the ink separates into spots. Rf = distance moved by the spot ÷ distance moved by the solvent front, both measured from the start line. It has no unit because it is a ratio of two lengths, and it is always below one because a spot cannot move farther than the solvent front.',
  sol: 'Differential holding and dissolving; Rf definition; no unit; below one.',
  scheme: [['Different adsorption or partition causes separation', 1], ['Rf defined as a ratio of distances from the start line', 1], ['No unit; always below one with the reason', 1]],
  d: 2, c: 'application', t: [1],
}));
// ---------------------------------------------------------------- t02 qualitative analysis
add('cuo-mcq', mcq({
  stem: 'A student at a polytechnic heats a dry organic solid with copper(II) oxide in a hard-glass test tube. The gas turns lime water milky and the colourless vapour turns white anhydrous copper(II) sulphate blue. The elements detected are:',
  right: 'carbon and hydrogen',
  wrong: ['carbon and oxygen', 'hydrogen and nitrogen', 'oxygen and sulphur'],
  sol: 'Carbon is oxidised to carbon dioxide, which turns lime water milky, and hydrogen to water, which turns anhydrous copper(II) sulphate blue — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('whyna-mcq', mcq({
  stem: 'A fusion tube at a forensic laboratory contains an organic compound heated strongly with a small piece of sodium. The purpose of the sodium fusion is to:',
  right: 'convert the covalently bonded N, S and halogens into ionic sodium compounds soluble in water',
  wrong: ['reduce the organic compound completely to carbon', 'remove carbon and hydrogen as sodium carbonate', 'make the compound volatile so that it can be distilled'],
  sol: 'Sodium converts N, S and halogens to NaCN, Na₂S and NaX, which dissolve in water and give ions that can be tested — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('prussian-mcq', mcq({
  stem: 'A fusion extract is warmed with iron(II) sulphate and sodium hydroxide, boiled and then acidified with dilute sulphuric acid. A Prussian blue colour appears. The coloured substance is:',
  right: 'iron(III) hexacyanidoferrate(II), Fe₄[Fe(CN)₆]₃',
  wrong: ['iron(III) thiocyanate, Fe(SCN)₃', 'sodium pentacyanidonitrosylferrate(II), Na₂[Fe(CN)₅NO]', 'lead(II) sulphide, PbS'],
  sol: 'Cyanide forms sodium hexacyanidoferrate(II), and iron(III) ions formed on air oxidation give the Prussian blue precipitate Fe₄[Fe(CN)₆]₃ — option (@K). The other options are the blood-red colour (@1), the nitroprusside reagent (@2) and a black sulphide (@3).',
  d: 2, c: 'understanding', t: [2],
}));
add('violet-mcq', mcq({
  stem: 'A fusion extract prepared with excess sodium gives a deep violet colour with fresh sodium nitroprusside, and, in a separate test, a Prussian blue colour with iron(II) sulphate. The elements that the compound must contain include:',
  right: 'nitrogen and sulphur',
  wrong: ['sulphur only', 'nitrogen only', 'sulphur and a halogen'],
  sol: 'Violet with nitroprusside shows sulphide (sulphur), and Prussian blue shows cyanide (nitrogen), so both N and S are present — option (@K). Neither test alone shows both (@1, @2), and a halogen is not tested by either (@3).',
  d: 2, c: 'application', t: [2],
}));
add('ns-mcq', mcq({
  stem: 'A compound containing both nitrogen and sulphur is fused with a limited amount of sodium. The extract is acidified with dilute hydrochloric acid and iron(III) chloride is added. A blood-red colour appears. It is due to:',
  right: 'iron(III) thiocyanate, formed from sodium thiocyanate',
  wrong: ['iron(III) hexacyanidoferrate(II), Prussian blue', 'lead(II) sulphide', 'silver thiocyanate'],
  sol: 'With both N and S present, the fusion forms NaSCN, which gives the blood-red Fe(SCN)₃ with iron(III) ions — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('hno3-mcq', mcq({
  stem: 'A fusion extract of a compound containing nitrogen, sulphur and chlorine is tested for chlorine. Silver nitrate is added directly without any pre-treatment. The test result is unreliable because:',
  right: 'cyanide and sulphide ions also give precipitates with silver nitrate',
  wrong: ['chloride ions do not react with silver nitrate in a neutral solution', 'silver chloride dissolves at once in water', 'nitrate ions oxidise the chloride to chlorine'],
  sol: 'Silver cyanide and silver sulphide also precipitate, so the extract is boiled with dilute nitric acid first to expel HCN and H₂S — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('agx-mcq', mcq({
  stem: 'After boiling with dilute nitric acid and adding silver nitrate, a fusion extract gives a pale yellow curdy precipitate that is only sparingly soluble in concentrated aqueous ammonia. The halogen present is:',
  right: 'bromine',
  wrong: ['chlorine', 'iodine', 'fluorine'],
  sol: 'AgBr is pale yellow and sparingly soluble in ammonia — option (@K). AgCl is white and dissolves readily in ammonia (@1); AgI is yellow and insoluble (@2); AgF is soluble in water, so no precipitate forms (@3).',
  d: 2, c: 'application', t: [2],
}));
add('ferro-mcq', mcq({
  stem: 'In the test for nitrogen, iron(II) sulphate is added to a sodium fusion extract and the mixture is warmed. The first complex formed with the cyanide ions is:',
  right: 'Na₄[Fe(CN)₆], sodium hexacyanidoferrate(II)',
  wrong: ['Fe₄[Fe(CN)₆]₃, iron(III) hexacyanidoferrate(II)', 'Fe(SCN)₃, iron(III) thiocyanate', 'Na₂[Fe(CN)₅NO], sodium nitroprusside'],
  sol: 'Fe²⁺ and CN⁻ give sodium hexacyanidoferrate(II), which later reacts with Fe³⁺ to give the blue precipitate — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('lass-ar', ar({
  a: 'The sodium fusion extract is boiled with dilute nitric acid before silver nitrate is added in the test for halogens.',
  r: 'Without this step, silver cyanide and silver sulphide could precipitate and hide the silver halide result.',
  key: 'a',
  sol: 'Both statements are true, and R explains A: the boiling expels hydrogen cyanide and hydrogen sulphide, so the only precipitate with silver nitrate is the halide — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('ns-ar', ar({
  a: 'A fusion extract containing both N and S can give a blood-red colour with iron(III) chloride.',
  r: 'Sodium thiocyanate gives the Prussian blue colour with iron(II) sulphate.',
  key: 'c',
  sol: 'A is true: with both elements present NaSCN forms and gives Fe(SCN)₃, which is blood red. R is false: Prussian blue needs cyanide ions, and thiocyanate gives the blood-red colour instead — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('agi-tf', tf({
  stem: 'In the halogen test, a yellow precipitate that does not dissolve even in concentrated ammonia solution is silver iodide.',
  key: 't',
  sol: 'True. AgI is yellow and insoluble in ammonia; AgCl is white and readily soluble; AgBr is pale yellow and sparingly soluble.',
  d: 1, c: 'recall', t: [2],
}));
add('scn-fill', fill({
  stem: 'When both nitrogen and sulphur are present, the blood-red colour with iron(III) chloride is due to iron(III) ___.',
  acc: [['thiocyanate', 'thiocyanate ions', 'Fe(SCN)3']],
  sol: 'Iron(III) **thiocyanate**, Fe(SCN)₃.',
  d: 1, c: 'recall', t: [2],
}));
add('ch-short', short({
  marks: 2,
  stem: r`A student heats a dry organic compound with copper(II) oxide and passes the products through lime water and over anhydrous copper(II) sulphate. Write balanced equations for the two confirmatory reactions and state the observations.`,
  model: r`Carbon dioxide turns lime water milky: $\ce{CO2 + Ca(OH)2 -> CaCO3 + H2O}$. Water turns white anhydrous copper(II) sulphate blue: $\ce{CuSO4 + 5H2O -> CuSO4.5H2O}$.`,
  sol: 'Two equations with observations.',
  scheme: [['CO₂ + lime water equation and milky observation', 1], ['CuSO₄ hydration equation and white to blue', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('fusion-short', short({
  marks: 2,
  stem: r`In a Lassaigne test, an organic compound containing C, N, S and a halogen X is fused with sodium. Write the three equations showing how the sodium compounds in the extract form.`,
  model: r`$\ce{Na + C + N -> NaCN}$; $\ce{2Na + S -> Na2S}$; $\ce{Na + X -> NaX}$. (With both N and S, a limited amount of sodium also gives $\ce{Na + C + N + S -> NaSCN}$.)`,
  sol: 'Three fusion equations.',
  scheme: [['NaCN', 0.5], ['Na₂S, balanced', 1], ['NaX', 0.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('prussian-short', short({
  marks: 2,
  stem: r`Write balanced equations for the two steps in which cyanide ions in a fusion extract are converted into Prussian blue: first with iron(II) sulphate, then with iron(III) chloride.`,
  model: r`$\ce{FeSO4 + 6NaCN -> Na4Fe(CN)6 + Na2SO4}$; then $\ce{3Na4Fe(CN)6 + 4FeCl3 -> Fe4[Fe(CN)6]3 + 12NaCl}$. The second product is the blue iron(III) hexacyanidoferrate(II).`,
  sol: 'Two balanced equations.',
  scheme: [['First equation balanced', 1], ['Second equation balanced; product named', 1]],
  d: 3, c: 'application', t: [2],
}));
add('s-short3', short({
  marks: 3,
  stem: r`A fusion extract of a sulphur-containing compound is tested for sulphur in two ways. Describe each test with its observation and write the balanced equation for each reaction.`,
  model: r`Test 1: acidify the extract with acetic acid and add lead acetate; a black precipitate of lead sulphide forms: $\ce{Na2S + (CH3COO)2Pb -> PbS + 2CH3COONa}$. Test 2: add a few drops of fresh sodium nitroprusside to the alkaline extract; a deep violet colour appears: $\ce{Na2S + Na2Fe(CN)5NO -> Na4Fe(CN)5NOS}$.`,
  sol: 'Two tests, observations, equations.',
  scheme: [['Lead acetate test with black PbS', 1], ['Nitroprusside test with violet colour', 1], ['Both equations balanced', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('x-short3', short({
  marks: 3,
  stem: r`A fusion extract of an organic halide is acidified with dilute nitric acid and boiled, cooled and treated with silver nitrate. Write the general ionic equation, give the colour of the precipitate for each of Cl, Br and I with its behaviour towards ammonia, and say why the boiling step is needed.`,
  model: r`$\ce{X- + Ag+ -> AgX}$. AgCl: white, dissolves readily in dilute ammonia solution; AgBr: pale yellow, sparingly soluble in concentrated ammonia; AgI: yellow, insoluble in ammonia. Boiling with nitric acid expels HCN and H₂S, so that cyanide and sulphide do not give silver precipitates.`,
  sol: 'Equation; three colours with ammonia; boiling.',
  scheme: [['Ionic equation', 0.5], ['Three colours with ammonia behaviour', 1.5], ['Reason for boiling with nitric acid', 1]],
  d: 3, c: 'application', t: [2],
}));
add('ns-short3', short({
  marks: 3,
  stem: r`A compound contains both nitrogen and sulphur. Explain, with equations, why its sodium fusion extract may give a blood-red colour with iron(III) chloride rather than Prussian blue, and name the compound formed in the fusion.`,
  model: r`With a limited amount of sodium, the nitrogen, carbon and sulphur combine to form sodium thiocyanate, $\ce{Na + C + N + S -> NaSCN}$, instead of NaCN and Na₂S separately. In the extract it reacts with iron(III) ions: $\ce{3NaSCN + FeCl3 -> Fe(SCN)3 + 3NaCl}$, and the blood-red iron(III) thiocyanate shows. Cyanide ions, needed for Prussian blue, are then absent.`,
  sol: 'NaSCN forms; blood red; no CN⁻.',
  scheme: [['Formation of NaSCN with equation', 1], ['Reaction with FeCl₃ and blood-red colour', 1], ['No free cyanide, so no Prussian blue', 1]],
  d: 3, c: 'analysis', t: [2],
}));
