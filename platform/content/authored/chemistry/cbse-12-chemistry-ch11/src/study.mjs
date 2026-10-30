// ch11 Surface Chemistry — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V, isothermPlot, tempPlot } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Surface Chemistry — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Adsorption',
      r`**Adsorption:** accumulation of a substance (the **adsorbate**) at the surface of another (the **adsorbent**), so its concentration is higher at the surface than in the bulk. **Absorption:** uniform distribution throughout the bulk (water vapour in anhydrous CaCl₂). Removal of adsorbate: **desorption**. Both together: **sorption**.

Surface particles have unbalanced attractive forces, which adsorption partly satisfies, so adsorption is **exothermic** ($\Delta H < 0$). The adsorbate loses freedom, so $\Delta S < 0$. Adsorption is spontaneous ($\Delta G < 0$) while $|\Delta H| > T|\Delta S|$; it reaches equilibrium when $\Delta H = T\Delta S$.`,
      [kt('Adsorbate', 'The substance that collects on the surface.'), kt('Adsorbent', 'The solid or liquid on whose surface adsorption occurs.'), kt('Desorption', 'Removal of an adsorbed substance from a surface.')],
      [fm(r`\Delta G = \Delta H - T\Delta S`, 'Spontaneity of adsorption')],
      table(['Adsorption', 'Absorption'], [['Surface phenomenon', 'Bulk phenomenon'], ['Concentration higher at surface', 'Uniform throughout'], ['Silica gel + water vapour', 'Anhydrous CaCl₂ + water vapour']], 'Table contrasting adsorption and absorption'),
      [1],
    ),
    sec(
      '2. Physisorption and chemisorption',
      r`| Physisorption | Chemisorption |
|---|---|
| van der Waals forces | Chemical bonds |
| Low enthalpy, about 20–40 kJ mol⁻¹ | High enthalpy, about 80–240 kJ mol⁻¹ |
| Not specific | Highly specific |
| Reversible | Usually irreversible |
| Decreases with rise in temperature | Increases at first (needs activation energy), then decreases |
| Multimolecular layers | Unimolecular layer |
| More for easily liquefied gases (high critical temperature) | Depends on bond formation |

The same gas may be physisorbed at low temperature and chemisorbed at higher temperature (H₂ on Ni).`,
      [kt('Physisorption', 'Adsorption by weak van der Waals forces; reversible and non-specific.'), kt('Chemisorption', 'Adsorption by formation of chemical bonds with the surface; specific, one layer, needs activation energy.')],
      [],
      tempPlot,
      [1],
    ),
    sec(
      '3. Factors affecting adsorption of gases on solids; Freundlich isotherm',
      r`- **Nature of gas:** higher critical temperature → more physisorption (SO₂ > NH₃ > CO₂ > CH₄ > H₂ on charcoal).
- **Surface area:** finely divided, porous adsorbents (activated charcoal, silica gel) adsorb more.
- **Pressure:** at constant $T$, $x/m$ rises with $p$, steeply at first, then levels off (saturation).
- **Temperature:** physisorption falls with temperature (exothermic, Le Chatelier).

**Freundlich isotherm** (empirical, limited pressure range): $\dfrac{x}{m} = k\,p^{1/n}$, $n > 1$. Linear form: $\log \dfrac{x}{m} = \log k + \dfrac{1}{n}\log p$ — slope $1/n$, intercept $\log k$. For adsorption from solution, concentration $C$ replaces $p$.

**Applications:** gas masks (charcoal), humidity control (silica gel), decolourising sugar, heterogeneous catalysis (Fe in the Haber process, Ni in hydrogenation), high vacuum, chromatography, froth flotation, qualitative tests (magneson and Mg(OH)₂).`,
      [kt('Adsorption isotherm', 'A graph of extent of adsorption against pressure (or concentration) at constant temperature.'), kt('Critical temperature', 'The temperature above which a gas cannot be liquefied by pressure alone; higher values mean stronger physisorption.')],
      [fm(r`\frac{x}{m} = k\,p^{1/n}`, 'Freundlich adsorption isotherm'), fm(r`\log \frac{x}{m} = \log k + \frac{1}{n}\log p`, 'Linear (log) form')],
      isothermPlot,
      [1],
    ),
    sec(
      '4. Colloids: classification and preparation',
      r`**Particle size:** true solution < 1 nm; colloid 1–1000 nm; suspension > 1000 nm. Colloids pass through filter paper but not parchment; do not settle; scatter light.

**By phases** (dispersed phase in dispersion medium): sol (solid in liquid: paint), aerosol (solid or liquid in gas: smoke, fog), solid sol (coloured glass), emulsion (liquid in liquid: milk), gel (liquid in solid: cheese, jelly), foam (gas in liquid: lather), solid foam (pumice).

**By interaction:** **lyophilic** (starch, gum, gelatin — made by mixing, reversible, stable) vs **lyophobic** (metals, sulfides, hydroxides — special methods, irreversible, coagulated by a little electrolyte).

**By particle type:** multimolecular (gold, sulfur sols), macromolecular (starch, proteins), associated colloids (soap micelles above the **critical micelle concentration** and **Kraft temperature**).

**Preparation:** hydrolysis ($\ce{FeCl3 + 3H2O -> Fe(OH)3 + 3HCl}$ in boiling water), double decomposition (As₂S₃ sol), Bredig’s arc (metal sols), peptisation. **Purification:** dialysis, electrodialysis.`,
      [kt('Lyophilic sol', 'A sol in which the particles have strong affinity for the medium; reversible and stable.'), kt('Lyophobic sol', 'A sol whose particles have little affinity for the medium; irreversible and easily coagulated.'), kt('Micelle', 'An aggregate of soap or detergent ions formed above the critical micelle concentration.'), kt('Peptisation', 'Conversion of a fresh precipitate into a colloidal sol by shaking with a small amount of electrolyte.')],
      [],
      table(['Kind', 'Particle size', 'Settles?'], [['True solution', '< 1 nm', 'No'], ['Colloid', '1–1000 nm', 'No'], ['Suspension', '> 1000 nm', 'Yes']], 'Table of particle sizes of true solutions, colloids and suspensions'),
      [2],
    ),
    sec(
      '5. Properties of colloids, coagulation and emulsions',
      r`- **Tyndall effect:** scattering of light by colloidal particles makes a beam visible from the side (seen when particles are much smaller than the wavelength yet large enough to scatter, and refractive indices differ).
- **Brownian movement:** zigzag motion from unequal bombardment by medium molecules; helps stability.
- **Charge:** from preferential adsorption of common ions; positive sols (Fe₂O₃·xH₂O, Al₂O₃·xH₂O, methylene blue, haemoglobin) and negative sols (Au, Ag, As₂S₃, starch, clay). Same charge on all particles → repulsion → stability. **Electrophoresis** shows the sign.
- **Coagulation:** neutralisation of charge (by electrolytes, electrophoresis, oppositely charged sols, boiling). **Hardy–Schulze rule:** the ion with charge opposite to the sol coagulates it; coagulating power rises with that ion’s charge (for negative sols Al³⁺ > Ba²⁺ > Na⁺; for positive sols [Fe(CN)₆]⁴⁻ > PO₄³⁻ > SO₄²⁻ > Cl⁻). **Coagulation value:** minimum millimoles per litre of electrolyte to coagulate a sol in two hours; smaller value = greater power.
- **Protective colloids:** lyophilic colloids shield lyophobic sols (gelatin in ice cream, gum in ink).
- **Emulsions:** O/W (milk, vanishing cream) and W/O (butter, cold cream); stabilised by emulsifiers (proteins, gums, soaps for O/W; long-chain alcohols, heavy-metal soaps for W/O).
- **Uses:** delta formation, alum to stop bleeding and purify water, Cottrell precipitator, blue sky, rain, soap cleaning.`,
      [kt('Tyndall effect', 'Scattering of light by colloidal particles, making the path of a beam visible.'), kt('Electrophoresis', 'Movement of colloidal particles towards the oppositely charged electrode in an electric field.'), kt('Hardy–Schulze rule', 'The coagulating power of an ion of charge opposite to the sol increases with the magnitude of its charge.'), kt('Emulsion', 'A colloid of one liquid dispersed in another immiscible liquid.')],
      [],
      V.tyndall,
      [2],
      [V.charged],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that adsorption is endothermic, or that physisorption increases with temperature.
- Taking the slope of the Freundlich log plot as n instead of 1/n.
- Choosing the ion with the same charge as the sol in coagulation questions.
- Saying a larger coagulation value means a stronger coagulant.
- Mixing up O/W (milk) and W/O (butter) emulsions, or fog (aerosol) and lather (foam).

**How marks are usually awarded**
- 1-mark items: a definition, a type of colloid, a coagulation order.
- Comparisons (2–3 marks): one mark per correct difference (physisorption vs chemisorption, lyophilic vs lyophobic).
- Calculations: Freundlich constants from a log plot; mass adsorbed per gram from a change in concentration.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Adsorption vs absorption?', 'Adsorption: surface accumulation. Absorption: uniform throughout the bulk.', 'definition', 1),
    fc(2, 'Adsorbate and adsorbent?', 'Adsorbate: the substance that sticks. Adsorbent: the surface it sticks to.', 'definition', 1),
    fc(3, 'Sign of ΔH and ΔS for adsorption?', 'Both negative; spontaneous while |ΔH| > T|ΔS|.', 'concept', 1),
    fc(4, 'Forces in physisorption?', 'Weak van der Waals forces.', 'fact', 1),
    fc(5, 'Enthalpy ranges?', 'Physisorption about 20–40 kJ/mol; chemisorption about 80–240 kJ/mol.', 'fact', 1),
    fc(6, 'Layers formed?', 'Physisorption: multimolecular. Chemisorption: unimolecular.', 'fact', 1),
    fc(7, 'Effect of temperature on chemisorption?', 'Rises at first (activation energy needed), then falls.', 'concept', 1),
    fc(8, 'Which gases are physisorbed most?', 'Easily liquefied gases with high critical temperatures (e.g. SO₂, NH₃).', 'concept', 1),
    fc(9, 'Freundlich isotherm?', 'x/m = k p^(1/n), n > 1.', 'formula', 1),
    fc(10, 'Freundlich log plot?', 'log(x/m) vs log p: slope 1/n, intercept log k.', 'formula', 1),
    fc(11, 'Why activated charcoal in gas masks?', 'Huge surface area adsorbs poisonous gases.', 'example', 1),
    fc(12, 'Silica gel is used for…?', 'Adsorbing moisture (humidity control).', 'example', 1),
    fc(13, 'Adsorption in catalysis?', 'Reactants adsorbed on catalyst surfaces (Fe in Haber process, Ni in hydrogenation).', 'example', 1),
    fc(14, 'Particle size of colloids?', '1–1000 nm (true solution < 1 nm; suspension > 1000 nm).', 'fact', 2),
    fc(15, 'Dispersed phase and medium?', 'The particles, and the substance they are spread through.', 'definition', 2),
    fc(16, 'Name: liquid in gas; gas in liquid; liquid in solid.', 'Aerosol (fog); foam (lather); gel (cheese).', 'fact', 2),
    fc(17, 'Lyophilic vs lyophobic?', 'Lyophilic: affinity for medium, reversible, stable. Lyophobic: little affinity, irreversible, easily coagulated.', 'concept', 2),
    fc(18, 'Associated colloid?', 'Soap or detergent ions forming micelles above the CMC and Kraft temperature.', 'definition', 2),
    fc(19, 'Making a Fe(OH)₃ sol?', 'Add FeCl₃ to boiling water (hydrolysis).', 'example', 2),
    fc(20, 'Peptisation?', 'Dispersing a fresh precipitate into a sol with a little electrolyte.', 'definition', 2),
    fc(21, 'Dialysis?', 'Removing dissolved ions from a sol through a parchment or cellophane membrane.', 'definition', 2),
    fc(22, 'Tyndall effect?', 'Scattering of light by colloidal particles; the beam path becomes visible.', 'definition', 2),
    fc(23, 'Brownian movement?', 'Zigzag motion of colloidal particles from unequal bombardment by medium molecules.', 'definition', 2),
    fc(24, 'Why are lyophobic sols stable?', 'All particles carry the same charge and repel each other.', 'concept', 2),
    fc(25, 'Two positive and two negative sols?', 'Positive: Fe₂O₃·xH₂O, methylene blue. Negative: gold, As₂S₃.', 'example', 2),
    fc(26, 'Hardy–Schulze rule?', 'The oppositely charged ion coagulates; higher charge → greater coagulating power.', 'concept', 2),
    fc(27, 'Coagulation value?', 'Minimum millimoles per litre of electrolyte to coagulate a sol in two hours; smaller = more powerful.', 'definition', 2),
    fc(28, 'Protective colloid?', 'A lyophilic colloid that shields a lyophobic sol from coagulation (gelatin, gum).', 'definition', 2),
    fc(29, 'O/W vs W/O emulsions?', 'O/W: milk, vanishing cream. W/O: butter, cold cream.', 'example', 2),
    fc(30, 'Why does alum stop bleeding?', 'Al³⁺ coagulates the negatively charged blood colloid.', 'example', 2),
    fc(31, 'Exam tip: coagulation', 'First find the ion with charge opposite to the sol, then compare charges.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
