// ch10 s- and p-Block Elements — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { DATA } from './svgs.mjs';

const D = DATA;
const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 's- and p-Block Elements — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The s-block and p-block: configurations and general trends',
      r`**This chapter is for formative assessment only** (not in the annual theory paper). **s-block:** groups 1 and 2, valence configuration $ns^1$ and $ns^2$. **p-block:** groups 13 to 18, $ns^2np^1$ to $ns^2np^6$. Properties vary regularly within a group, but the first member differs from the rest because of its **small size, high ionisation enthalpy, high electronegativity and the absence of d orbitals** (maximum covalency 4).

**Down a group:** one more shell is added, so atomic and ionic radii rise and first ionisation enthalpy generally falls. A cation is smaller than its atom (same nuclear charge, fewer electrons); an anion is larger. Group 1 values: atomic radius Li 152, Na 186, K 227, Rb 248, Cs 265 pm; IE₁ 520, 496, 419, 403, 376 kJ mol⁻¹.`,
      [kt('s-block element', 'An element whose last electron enters an ns subshell (groups 1 and 2).'), kt('p-block element', 'An element whose last electron enters an np subshell (groups 13 to 18).'), kt('First-member anomaly', 'The first element of a group (Li, Be, B, C) differs from its heavier congeners because of small size, high ionisation enthalpy and no d orbitals.')],
      [fm(r`ns^1,\ ns^2,\ ns^2np^{1\text{ to }6}`, 'Valence configurations of the s-block and p-block')],
      V.g1,
      [1],
    ),
    sec(
      '2. Groups 1 and 2: ionisation enthalpy, flame colours, hydration and reducing character',
      r`**Ions formed:** group 1 gives M⁺ because IE₂ is very large (Na: IE₁ 496, IE₂ 4562 kJ mol⁻¹, the second electron coming from the neon core); group 2 gives M²⁺ (Mg: 737 and 1450). Group 2 has a higher IE₁ than group 1 in the same period.

**Flame colours:** Li crimson red, Na golden yellow, K violet, Rb red-violet, Cs blue; Ca brick red, Sr crimson, Ba apple green. Be and Mg give none because their tightly held electrons are not excited by an ordinary flame.

**Hydration enthalpy** of M⁺ (kJ mol⁻¹): Li −506, Na −406, K −330, Rb −310, Cs −276: smaller ions have higher charge density and hydrate more strongly.

**Reducing character:** all are strong reducing agents. E° (V): Li −3.05, Na −2.71, K −2.93; Be −1.97, Mg −2.36, Ca −2.84, Ba −2.92. Li has the most negative E° in group 1 because of its very high hydration enthalpy, even though its IE₁ is the highest.`,
      [kt('Flame colour', 'Visible light emitted when an excited outer electron falls back to a lower level in a flame; characteristic of the metal.'), kt('Hydration enthalpy', 'Enthalpy change when one mole of a gaseous ion dissolves in water to give the hydrated ion; more negative for smaller, more highly charged ions.'), kt('Reducing agent', 'A species that loses electrons readily; the s-block metals are strong ones.')],
      [],
      V.hyd,
      [1],
    ),
    sec(
      '3. Anomalous lithium and beryllium; diagonal relationships',
      r`**Lithium** (small, high polarising power): forms Li₂O (not a peroxide) and Li₃N; $\ce{4LiNO3 -> 2Li2O + 4NO2 + O2}$ (others give nitrites); Li₂CO₃ decomposes; no solid hydrogencarbonate; LiCl is deliquescent and soluble in ethanol. **Li resembles Mg.**

**Beryllium:** covalent compounds, covalency at most 4 (no d orbitals), amphoteric BeO and Be(OH)₂, passive towards concentrated nitric acid, carbide gives methane ($\ce{Be2C + 4H2O -> 2Be(OH)2 + CH4}$). **Be resembles Al.** $\ce{Be + 2OH- + 2H2O -> Be(OH)4^2- + H2}$.

**Diagonal relationship:** across a period size falls and charge rises; down a group size rises; diagonally the effects roughly cancel. Li⁺ 76 pm and Mg²⁺ 72 pm; charge per radius of Be²⁺ (2/31 = 0.065) and Al³⁺ (3/53.5 = 0.056).`,
      [kt('Diagonal relationship', 'Similarity in properties between an element of period 2 and the element one group to its right in period 3 (Li–Mg, Be–Al, B–Si).'), kt('Polarising power', 'The ability of a small, highly charged cation to distort the electron cloud of an anion, giving covalent character.'), kt('Amphoteric oxide', 'An oxide that reacts with both acids and bases (BeO, Al₂O₃).')],
      [fm(r`\text{charge density} \propto \dfrac{\text{charge}}{\text{radius}}`, 'Charge-to-radius ratio of an ion')],
      V.diag,
      [1],
    ),
    sec(
      '4. Group 13: trends, inert pair effect and boron',
      r`**Configuration** $ns^2np^1$; oxidation states +3 and +1. **Irregular trends:** Ga (135 pm) is smaller than Al (143 pm); IE₁ goes 801, 577, 579, 558, 589 kJ mol⁻¹ (B to Tl), because 3d (and 4f) electrons shield poorly. Electronegativity 2.0, 1.5, 1.6, 1.7, 1.8.

**Inert pair effect:** the ns² electrons become reluctant to bond down the group, so +1 grows more stable: Tl⁺ is more stable than Tl³⁺ (Tl³⁺ is oxidising). **Boron** is a non-metal with covalent, electron-deficient compounds, maximum covalency 4, acidic B₂O₃ and a Lewis-acid BCl₃: $\ce{BF3 + F- -> BF4-}$. Aluminium is a metal with amphoteric Al₂O₃ and covalency up to 6.`,
      [kt('Inert pair effect', 'The increasing reluctance of the ns² electron pair to take part in bonding in heavier p-block elements, so the oxidation state lower by two becomes more stable.'), kt('Electron-deficient compound', 'A compound in which the central atom has fewer than eight electrons, such as BCl₃ (six).'), kt('Lewis acid', 'An electron-pair acceptor.')],
      [],
      V.g13,
      [1],
    ),
    sec(
      '5. Group 14: trends, catenation and inert pair effect',
      r`**Configuration** $ns^2np^2$; oxidation states +4 and +2. Covalent radius C 77, Si 118, Ge 122, Sn 140, Pb 146 pm; IE₁ 1086, 786, 761, 708, 715 kJ mol⁻¹; electronegativity 2.5, 1.8, 1.8, 1.8, 1.9. C and Si are non-metal and metalloid, Sn and Pb are metals.

**Catenation:** the tendency of atoms to link into chains and rings. Single-bond enthalpy C–C 348, Si–Si 297, Ge–Ge 260, Sn–Sn 240 kJ mol⁻¹: carbon is far the best, and its C–H (414) and C–O (358) bonds are also strong, so its chains are stable.

**Inert pair effect:** +4 is stable for C, Si, Ge; Sn(II) is reducing ($\ce{SnCl2 + 2HgCl2 -> SnCl4 + Hg2Cl2}$); Pb(II) is stable and PbO₂ is oxidising ($\ce{PbO2 + 4HCl -> PbCl2 + Cl2 + 2H2O}$).`,
      [kt('Catenation', 'The self-linking of atoms of an element to form chains and rings.'), kt('Reducing agent (Sn²⁺)', 'Sn(II) is readily oxidised to Sn(IV).'), kt('Oxidising agent (PbO₂)', 'Pb(IV) is readily reduced to the more stable Pb(II).')],
      [],
      V.cat,
      [1],
    ),
    sec(
      '6. Anomalous carbon and the allotropes of carbon',
      r`**Carbon vs silicon:** C has no d orbitals (maximum covalency 4), forms **pπ–pπ multiple bonds** (C=C, C≡C, C=O) and shows unlimited catenation. Si reaches 6 ($\ce{SiF4 + 2F- -> SiF6^2-}$) and forms no stable multiple bonds. CO₂ is a gas of small molecules; SiO₂ is a giant covalent solid. CCl₄ is not hydrolysed, whereas $\ce{SiCl4 + 4H2O -> Si(OH)4 + 4HCl}$.

**Allotropes of carbon (general):**
- **Diamond:** sp³, 3-D network, hardest natural substance, insulator, density 3.51 g cm⁻³.
- **Graphite:** sp², flat hexagonal layers with weak forces between layers, soft, lubricant, conducts along the layers (delocalised electrons), density 2.26 g cm⁻³.
- **Fullerene C₆₀:** sp², hollow cage of 20 hexagons and 12 pentagons, a molecular solid.`,
      [kt('Allotropes', 'Different structural forms of the same element in the same physical state.'), kt('pπ–pπ bonding', 'Sideways overlap of p orbitals to give a π bond; C and N and O do this effectively, heavier elements do not.'), kt('Fullerene', 'A molecular allotrope of carbon in the form of a closed cage, C₆₀ being the best known.')],
      [],
      table(['Allotrope', 'Hybridisation', 'Hardness', 'Conducts electricity?'], [['Diamond', 'sp³', 'Very hard', 'No'], ['Graphite', 'sp²', 'Soft', 'Yes, along layers'], ['Fullerene C₆₀', 'sp²', 'Soft solid', 'Poorly']], 'Table of three carbon allotropes with hybridisation, hardness and electrical conductivity'),
      [1],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Explaining the most negative E° of lithium by its ionisation enthalpy (it is the hydration enthalpy).
- Saying that Be and Mg give flame colours, or that Li forms a peroxide.
- Forgetting that Ga is smaller than Al, or that Tl(I) is more stable than Tl(III).
- Claiming that silicon forms stable multiple bonds like carbon.
- Mixing up the hybridisation of diamond (sp³) and graphite (sp²).

**How marks are usually awarded**
- 1-mark items: a name, a colour, a trend or one reason.
- Anomaly questions (2–3 marks): small size and high charge density (1), no d orbitals or polarising power (1), a named example (1).
- Inert pair effect (2 marks): definition (1) + example with oxidation states (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t = 1) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Valence configurations of groups 1, 2, 13 and 14?', r`$ns^1$, $ns^2$, $ns^2np^1$, $ns^2np^2$.`, 'formula'),
    fc(2, 'Why do radii rise down a group?', 'Each period adds a new shell, so the outer electrons are farther from the nucleus.', 'concept'),
    fc(3, 'Why is a cation smaller than its atom?', 'The outer shell is lost and the same nuclear charge holds fewer electrons.', 'concept'),
    fc(4, 'Trend of IE₁ from Li to Cs?', 'It decreases: 520, 496, 419, 403, 376 kJ mol⁻¹.', 'fact'),
    fc(5, 'Why does Na form only Na⁺?', 'IE₂ (4562 kJ mol⁻¹) is about nine times IE₁ because the second electron comes from the neon core.', 'concept'),
    fc(6, 'Flame colours of Li, Na, K, Rb, Cs?', 'Crimson red, golden yellow, violet, red-violet, blue.', 'fact'),
    fc(7, 'Flame colours of Ca, Sr, Ba?', 'Brick red, crimson, apple green.', 'fact'),
    fc(8, 'Why do Be and Mg give no flame colour?', 'Their small atoms hold the electrons too tightly for a flame to excite them.', 'concept'),
    fc(9, 'Which alkali ion has the most negative hydration enthalpy and why?', 'Li⁺ (−506 kJ mol⁻¹): smallest ion, highest charge density.', 'fact'),
    fc(10, 'Why is Li the strongest reducing agent in water (E° = −3.05 V)?', 'Its hydration enthalpy is so large that it outweighs its high IE₁.', 'concept'),
    fc(11, 'Products when Li, Na and K burn in air?', 'Li₂O (oxide), Na₂O₂ (peroxide), KO₂ (superoxide).', 'fact'),
    fc(12, 'Which alkali metal reacts with nitrogen?', r`Lithium only: $\ce{6Li + N2 -> 2Li3N}$.`, 'fact'),
    fc(13, 'How does LiNO₃ differ from NaNO₃ on heating?', r`$\ce{4LiNO3 -> 2Li2O + 4NO2 + O2}$ whereas $\ce{2NaNO3 -> 2NaNO2 + O2}$.`, 'concept'),
    fc(14, 'Diagonal relationship: name the pairs.', 'Li–Mg, Be–Al, B–Si.', 'definition'),
    fc(15, 'Give two properties shared by Li and Mg.', 'Both form nitrides with N₂; carbonates decompose on heating; no solid hydrogencarbonate.', 'fact'),
    fc(16, 'Give two properties shared by Be and Al.', 'Amphoteric oxides and passive in concentrated nitric acid; carbides give methane with water.', 'fact'),
    fc(17, 'Maximum covalency of Be and why?', 'Four, because Be has no d orbitals (only 2s and 2p).', 'concept'),
    fc(18, 'Draw the diagonal-relationship frame.', 'Li Be B C above Na Mg Al Si, with arrows from Li to Mg, Be to Al and B to Si.', 'diagram'),
    fc(19, 'Sketch the trend of atomic radius in group 13.', 'Rises from B (85 pm) to Al (143), dips at Ga (135), then In 167 and Tl 170: irregular.', 'diagram'),
    fc(20, 'Why is Ga smaller than Al?', 'The ten 3d electrons shield the extra nuclear charge poorly, so the outer electrons are pulled in.', 'concept'),
    fc(21, 'Inert pair effect?', 'The ns² pair becomes reluctant to bond down a group, so the oxidation state lower by two becomes more stable.', 'definition'),
    fc(22, 'Which is more stable: Tl⁺ or Tl³⁺?', 'Tl⁺; Tl³⁺ is a good oxidising agent.', 'fact'),
    fc(23, 'Why is BCl₃ a Lewis acid?', 'Boron has only six electrons, so it accepts a lone pair.', 'concept'),
    fc(24, 'Worked sum: IE₁ + IE₂ + IE₃ for Al?', r`$577 + 1816 + 2744 = 5137$ kJ mol⁻¹.`, 'example'),
    fc(25, 'Define catenation. Which element is best at it?', 'Self-linking of atoms into chains and rings; carbon (C–C 348 kJ mol⁻¹).', 'definition'),
    fc(26, 'Which is stable: PbCl₂ or PbCl₄? Why?', 'PbCl₂, by the inert pair effect; Pb(IV) is strongly oxidising.', 'fact'),
    fc(27, 'Why is CCl₄ not hydrolysed but SiCl₄ is?', 'Carbon has no vacant d orbitals to accept the lone pair of water; silicon has.', 'concept'),
    fc(28, 'Why is CO₂ a gas but SiO₂ a solid?', 'C forms pπ–pπ double bonds (discrete molecules); Si forms only single bonds, giving a giant network.', 'concept'),
    fc(29, 'Hybridisation and structure of diamond and graphite?', 'Diamond sp³, 3-D network; graphite sp², hexagonal layers.', 'fact'),
    fc(30, 'Fullerene C₆₀: structure?', 'A closed cage of 60 carbon atoms with 20 hexagons and 12 pentagons.', 'fact'),
    fc(31, 'How to answer an anomalous first-member question?', 'Small size, high charge density or electronegativity, and no d orbitals; add one example.', 'exam-tip'),
  ],
  status: 'draft',
  provenance: PROV,
};
