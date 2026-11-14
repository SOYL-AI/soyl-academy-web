// ch19 Purification and Analysis of Organic Compounds — notes and flashcards.
import { T, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Purification and Analysis of Organic Compounds — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Crystallisation, sublimation and extraction',
      `A new organic compound is first **purified**. The method uses a property in which the compound differs from its impurities. **Crystallisation:** dissolve the solid in a hot solvent, filter off insoluble impurities while hot, cool so that pure crystals separate, then filter, wash and dry; the solid must be much more soluble hot than cold. **Sublimation:** a solid that passes directly to vapour (camphor, naphthalene, ammonium chloride, iodine) is separated from non-volatile impurities and condensed on a cool surface; it fails if the impurity also sublimes. **Differential extraction:** a compound in water is shaken with an **immiscible** solvent in which it is more soluble (such as ether) in a separating funnel, and the layers are separated.`,
      [kt('Sublimation', 'Direct change of a solid into vapour on heating, and back to solid on cooling, used to purify the solid.'), kt('Differential extraction', 'Moving a compound from one solvent into a second, immiscible solvent in which it is more soluble.')],
      [],
      V.methods,
      [1],
    ),
    sec(
      '2. Distillation and chromatography',
      `**Simple distillation:** liquids whose boiling points differ by about 40 K or more. **Fractional distillation:** miscible liquids with close boiling points, using a fractionating column in which the vapour repeatedly condenses and vaporises, becoming richer in the more volatile liquid. **Distillation under reduced pressure:** liquids that decompose at their normal boiling point (glycerol); lowering the pressure lowers the boiling point. **Steam distillation:** the compound must be volatile in steam and **immiscible with water** (aniline, essential oils, nitrobenzene); the mixture boils when the sum of the two vapour pressures equals the atmospheric pressure, below 373 K. **Chromatography:** **adsorption** (column, thin layer on silica or alumina: the more strongly adsorbed, the less it moves) and **partition** (paper: water in the fibres is the stationary phase). **R f = distance moved by the spot ÷ distance moved by the solvent front**, measured from the start line; no unit, always below 1.`,
      [kt('Rf value', 'The distance moved by a component divided by the distance moved by the solvent front, both from the start line.'), kt('Stationary and mobile phase', 'The fixed phase (solid or water held on a support) and the moving solvent in chromatography.')],
      [fm(r`R_f = \dfrac{\text{distance moved by the spot}}{\text{distance moved by the solvent front}}`, 'Retention factor')],
      V.distills,
      [1],
      [V.tlc],
    ),
    sec(
      '3. Detection of carbon and hydrogen; Lassaigne’s test',
      r`**Carbon and hydrogen:** heat the dry compound with copper(II) oxide; carbon gives CO₂ (turns lime water milky: $\ce{CO2 + Ca(OH)2 -> CaCO3 + H2O}$) and hydrogen gives water (turns white anhydrous CuSO₄ blue). **Lassaigne’s test:** fuse the compound with sodium so that the elements form ionic compounds, plunge the tube into water, boil and filter: **sodium fusion extract**. In the fusion: $\ce{Na + C + N -> NaCN}$, $\ce{2Na + S -> Na2S}$, $\ce{Na + X -> NaX}$; with both N and S (limited sodium) $\ce{Na + C + N + S -> NaSCN}$.`,
      [kt('Sodium fusion extract', 'The filtered aqueous solution of NaCN, Na₂S, NaX or NaSCN obtained after fusing an organic compound with sodium.')],
      [],
      V.lass,
      [2],
    ),
    sec(
      '4. Tests for N, S and halogens',
      r`**Nitrogen:** warm the extract with iron(II) sulphate and NaOH, boil, acidify with dilute H₂SO₄: Prussian blue. $\ce{FeSO4 + 6NaCN -> Na4Fe(CN)6 + Na2SO4}$; $\ce{3Na4Fe(CN)6 + 4FeCl3 -> Fe4[Fe(CN)6]3 + 12NaCl}$. **Sulphur:** lead acetate (with acetic acid) gives black PbS, $\ce{Na2S + (CH3COO)2Pb -> PbS + 2CH3COONa}$; fresh sodium nitroprusside gives violet, $\ce{Na2S + Na2Fe(CN)5NO -> Na4Fe(CN)5NOS}$. **Halogens:** boil with dilute HNO₃ (expels HCN and H₂S), cool, add AgNO₃: $\ce{NaX + AgNO3 -> AgX + NaNO3}$; AgCl white, soluble in dilute NH₃; AgBr pale yellow, sparingly soluble in concentrated NH₃; AgI yellow, insoluble. **N and S together:** $\ce{3NaSCN + FeCl3 -> Fe(SCN)3 + 3NaCl}$, blood red (acidify with HCl).`,
      [kt('Prussian blue', 'Iron(III) hexacyanidoferrate(II), Fe₄[Fe(CN)₆]₃, the blue compound that confirms nitrogen.')],
      [],
      V.lass,
      [2],
    ),
    sec(
      '5. Estimation of carbon and hydrogen (Liebig)',
      r`A weighed sample is burnt in pure oxygen over hot copper(II) oxide in a combustion tube. The water goes to a weighed U-tube of **anhydrous CaCl₂**, then the CO₂ to weighed bulbs of **concentrated KOH**; a soda lime guard tube follows. $\ce{C2H6 + 7CuO -> 2CO2 + 3H2O + 7Cu}$ and $\ce{CO2 + 2KOH -> K2CO3 + H2O}$. The CaCl₂ tube comes first because KOH solution takes up water as well as CO₂. Oxygen is found by difference.`,
      [kt('Combustion tube', 'The hard-glass tube, heated in a furnace and packed with copper(II) oxide, in which the sample is oxidised.')],
      [fm(r`\%\,\text{C} = \dfrac{12}{44} \times \dfrac{m(\ce{CO2})}{m} \times 100`, 'Percentage of carbon'), fm(r`\%\,\text{H} = \dfrac{2}{18} \times \dfrac{m(\ce{H2O})}{m} \times 100`, 'Percentage of hydrogen')],
      V.liebig,
      [3],
    ),
    sec(
      '6. Estimation of nitrogen (Kjeldahl)',
      r`**Digestion:** the compound is heated with concentrated H₂SO₄, with K₂SO₄ (raises the boiling point) and CuSO₄ (catalyst); nitrogen becomes (NH₄)₂SO₄. **Distillation:** the digest is boiled with excess NaOH, $\ce{(NH4)2SO4 + 2NaOH -> Na2SO4 + 2NH3 + 2H2O}$; the NH₃ passes through a bulb trap and condenser into a measured volume of standard H₂SO₄, $\ce{2NH3 + H2SO4 -> (NH4)2SO4}$, and the acid left over is titrated with standard NaOH. **Unsuitable** for nitro, azo and ring-nitrogen compounds. Convert molarity of H₂SO₄ to normality (× 2) before using the formula.`,
      [kt('Digestion', 'Heating the compound with concentrated sulphuric acid so that its nitrogen becomes ammonium sulphate.')],
      [fm(r`\%\,\text{N} = \dfrac{1.4 \times N \times V}{m}`, 'N: normality of the acid; V: mL neutralised by NH₃; m: mass of compound in g')],
      V.kjeld,
      [3],
    ),
    sec(
      '7. Carius method: halogens, sulphur and phosphorus',
      r`The compound is heated with fuming HNO₃ in a sealed thick-walled tube in a furnace. **Halogens** (with AgNO₃ in the tube) are weighed as **AgX**; **sulphur** becomes H₂SO₄ and is precipitated with BaCl₂ and weighed as **BaSO₄**; **phosphorus** becomes H₃PO₄, precipitated with magnesia mixture as MgNH₄PO₄ and ignited, $\ce{2MgNH4PO4 -> Mg2P2O7 + 2NH3 + H2O}$, and weighed as **Mg₂P₂O₇**. Molar masses: AgCl 143.5, AgBr 188, AgI 235, BaSO₄ 233, Mg₂P₂O₇ 222.`,
      [kt('Magnesia mixture', 'A solution of MgCl₂, NH₄Cl and ammonia that precipitates phosphate as magnesium ammonium phosphate.')],
      [fm(r`\%\,\text{Cl} = \dfrac{35.5}{143.5} \times \dfrac{m(\ce{AgCl})}{m} \times 100`, 'Chlorine'), fm(r`\%\,\text{S} = \dfrac{32}{233} \times \dfrac{m(\ce{BaSO4})}{m} \times 100`, 'Sulphur'), fm(r`\%\,\text{P} = \dfrac{62}{222} \times \dfrac{m(\ce{Mg2P2O7})}{m} \times 100`, 'Phosphorus')],
      V.carius,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using simple distillation for liquids with close boiling points, or steam distillation for a liquid that mixes with water.
- Forgetting to boil the fusion extract with dilute HNO₃ before adding AgNO₃.
- Writing a unit for Rf.
- Using the molarity of H₂SO₄ as normality in the Kjeldahl formula.
- Using the wrong molar mass for the precipitate (AgCl 143.5, AgBr 188, AgI 235, BaSO₄ 233, Mg₂P₂O₇ 222).

**How marks are usually awarded**
- Method questions: name, principle and one example (1 mark each).
- Lassaigne reactions: each balanced equation and each observation (0.5–1 mark).
- Numericals: formula, substitution, answer with unit or per cent.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'When is crystallisation suitable?', 'When the solid is much more soluble in the hot solvent than in the cold one.', 'concept', 1),
    fc(2, 'Name three solids purified by sublimation.', 'Camphor, naphthalene, ammonium chloride (also iodine).', 'example', 1),
    fc(3, 'What is differential extraction?', 'Moving a compound into a second, immiscible solvent in which it is more soluble.', 'definition', 1),
    fc(4, 'Simple distillation: what condition?', 'Boiling points differ by about 40 K or more and the liquid is stable.', 'concept', 1),
    fc(5, 'What does a fractionating column do?', 'Gives repeated condensation and vaporisation; vapour becomes richer in the more volatile liquid.', 'concept', 1),
    fc(6, 'Why is glycerol distilled at reduced pressure?', 'It decomposes near its normal boiling point; lower pressure lowers the boiling point.', 'concept', 1),
    fc(7, 'Two conditions for steam distillation?', 'Volatile in steam and immiscible with water.', 'fact', 1),
    fc(8, 'Why does a steam-distilling mixture boil below 373 K?', 'The sum of the two vapour pressures reaches atmospheric pressure sooner.', 'concept', 1),
    fc(9, 'Which isomer of nitrophenol is steam-volatile?', 'o-Nitrophenol (intramolecular hydrogen bonding).', 'example', 1),
    fc(10, 'Define Rf.', 'Distance moved by the spot ÷ distance moved by the solvent front.', 'definition', 1),
    fc(11, 'Why has Rf no unit and why is it below 1?', 'It is a ratio of lengths; a spot cannot pass the solvent front.', 'concept', 1),
    fc(12, 'Stationary phase in paper chromatography?', 'Water held in the cellulose fibres (partition).', 'fact', 1),
    fc(13, 'In adsorption chromatography, what happens to a strongly adsorbed component?', 'It moves least and has the smallest Rf.', 'concept', 1),
    fc(14, 'Test for carbon and hydrogen?', 'Heat with CuO: CO₂ turns lime water milky; water turns anhydrous CuSO₄ blue.', 'fact', 2),
    fc(15, 'Why fuse with sodium?', 'To convert covalently bonded N, S and halogens into soluble ionic sodium compounds.', 'concept', 2),
    fc(16, 'Fusion products of N, S and X?', 'NaCN, Na₂S and NaX (NaSCN if N and S together).', 'fact', 2),
    fc(17, 'Nitrogen test: reagents and result?', 'FeSO₄ + NaOH, boil, acidify: Prussian blue.', 'fact', 2),
    fc(18, 'Formula of Prussian blue?', 'Fe₄[Fe(CN)₆]₃, iron(III) hexacyanidoferrate(II).', 'fact', 2),
    fc(19, 'Sulphur tests?', 'Lead acetate gives black PbS; nitroprusside gives violet.', 'fact', 2),
    fc(20, 'Why boil the extract with HNO₃ before the halogen test?', 'It expels HCN and H₂S so Ag⁺ gives only the halide precipitate.', 'concept', 2),
    fc(21, 'Colours of AgCl, AgBr, AgI?', 'White, pale yellow, yellow.', 'fact', 2),
    fc(22, 'Behaviour of AgCl, AgBr, AgI in ammonia?', 'AgCl dissolves readily, AgBr sparingly, AgI not at all.', 'fact', 2),
    fc(23, 'N and S together: reagent and colour?', 'HCl then FeCl₃: blood-red Fe(SCN)₃.', 'fact', 2),
    fc(24, 'Liebig: what absorbs water and what absorbs CO₂?', 'Anhydrous CaCl₂ (water); concentrated KOH (CO₂).', 'fact', 3),
    fc(25, '%C and %H formulas (Liebig)?', '%C = 12/44 × m(CO₂)/m × 100; %H = 2/18 × m(H₂O)/m × 100.', 'formula', 3),
    fc(26, 'Kjeldahl: two stages?', 'Digestion to (NH₄)₂SO₄; distillation of NH₃ into standard acid.', 'concept', 3),
    fc(27, 'Kjeldahl percentage formula?', '%N = 1.4 × N × V ÷ m (N normality, V mL of acid used by NH₃).', 'formula', 3),
    fc(28, 'Where does Kjeldahl’s method fail?', 'Nitro, azo and ring-nitrogen compounds.', 'fact', 3),
    fc(29, 'What does the Carius tube contain?', 'Compound and fuming HNO₃ (and AgNO₃ for halogens), sealed and heated.', 'fact', 4),
    fc(30, 'Weighed forms in the Carius method?', 'AgX (halogens), BaSO₄ (sulphur), Mg₂P₂O₇ (phosphorus).', 'fact', 4),
    fc(31, 'Formula for %S by Carius?', '32/233 × m(BaSO₄)/m × 100.', 'formula', 4),
    fc(32, 'Exam tip: back titration', 'Acid used by NH₃ = acid taken − acid left over; H₂SO₄ normality = 2 × molarity.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
