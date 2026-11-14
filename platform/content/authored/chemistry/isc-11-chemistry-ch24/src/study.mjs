// ch24 Aromatic Hydrocarbons: Benzene — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Aromatic Hydrocarbons: Benzene — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Nomenclature of aromatic compounds',
      `**Arenes** contain a benzene ring. **Monosubstituted:** substituent + benzene (chlorobenzene, nitrobenzene, ethylbenzene); special parent names include **phenol** (hydroxybenzene), **aniline** (aminobenzene), **benzoic acid**, **benzaldehyde**, **toluene** (methylbenzene) and **styrene** (ethenylbenzene). **C₆H₅–** is **phenyl**, **C₆H₅CH₂–** is **benzyl**. **Disubstituted:** **ortho (1,2), meta (1,3), para (1,4)**. **Polysubstituted:** number the ring for the **lowest locants**, cite substituents **alphabetically**, and give C-1 to the carbon bearing the group that forms the parent name (2-bromo-4-nitrobenzoic acid; 2,4,6-trinitrophenol; 1-methyl-4-nitrobenzene; 1,3,5-trimethylbenzene).`,
      [kt('Arene', 'A hydrocarbon that contains a benzene ring or a ring with similar (aromatic) properties.'), kt('Ortho, meta, para', 'Positions 1,2, 1,3 and 1,4 of two substituents on a benzene ring.')],
      [],
      table(['Structure', 'IUPAC name', 'Common name'], [['C₆H₅CH₃', 'Methylbenzene', 'Toluene'], ['C₆H₅OH', 'Hydroxybenzene', 'Phenol'], ['C₆H₅NH₂', 'Aminobenzene', 'Aniline'], ['C₆H₅COOH', 'Benzoic acid', 'Benzoic acid'], ['C₆H₅CH=CH₂', 'Ethenylbenzene', 'Styrene']], 'Table of five monosubstituted benzenes with IUPAC and common names'),
      [1],
    ),
    sec(
      '2. Structure of benzene: Kekulé structures and resonance',
      `Benzene, **C₆H₆**, is a **planar regular hexagon**, all C–C **139 pm** (C–C 154 pm, C=C 134 pm), all C–C–C **120°**, C–H 109 pm. **Kekulé** drew two structures with alternating single and double bonds; benzene is a **resonance hybrid** of them (drawn as a hexagon with a circle). Each carbon is **sp²**: three σ bonds in the plane (**12 σ bonds** in all) and one p orbital perpendicular to the ring; the six p orbitals overlap to give **six delocalised π electrons**, in rings above and below the plane. **Evidence:** no decolourisation of bromine water; one C₆H₅Br; one 1,2-C₆H₄Br₂ (not two); equal bond lengths; unusual stability.`,
      [kt('Resonance hybrid', 'The real structure of a molecule that cannot be written as a single Lewis structure; it is intermediate between the contributing structures.'), kt('Delocalisation', 'Spreading of π electrons over more than two atoms, which lowers the energy of the molecule.')],
      [],
      V.kekule,
      [1],
      [V.orbitals],
    ),
    sec(
      '3. Stability of benzene and aromaticity',
      `**Resonance energy:** ΔH(hydrogenation) of cyclohexene = −120 kJ mol⁻¹; for three isolated C=C: 3 × (−120) = −360; observed for benzene = −208. **Resonance energy = −208 − (−360) = 152 kJ mol⁻¹** (about 150), so benzene is far more stable than a triene. **Hückel's rule:** a compound is **aromatic** if it is **planar, cyclic, fully conjugated** with **(4n + 2) π electrons** (2, 6, 10, …). Benzene 6 (n = 1), naphthalene 10 (n = 2), cyclopentadienyl anion 6, tropylium cation 6: aromatic. **Cyclobutadiene (4 π e⁻)** is antiaromatic; **cyclooctatetraene (8)** is tub-shaped and not aromatic.`,
      [kt('Aromatic compound', "A planar, cyclic, fully conjugated compound with (4n + 2) π electrons (Hückel's rule); unusually stable and prefers substitution to addition."), kt('Resonance energy', 'The difference in energy between the real molecule and the most stable single structure; for benzene about 150 kJ mol⁻¹.')],
      [fm(r`E_{\text{res}} = \Delta H_{\text{obs}} - \Delta H_{\text{expected}}`, 'Resonance energy from hydrogenation enthalpies'), fm(r`N_{\pi} = 4n + 2`, "Hückel's rule for an aromatic ring")],
      V.energy,
      [1],
    ),
    sec(
      '4. Preparation and physical properties',
      `**From sodium benzoate:** heat with **soda lime** (NaOH + CaO): C₆H₅COONa + NaOH → C₆H₆ + Na₂CO₃ (decarboxylation). **From phenol:** pass the vapour over **heated zinc dust**: C₆H₅OH + Zn → C₆H₆ + ZnO. (Also from ethyne through a red-hot iron tube.) **Properties:** colourless liquid, characteristic smell, bp 80.1 °C, mp 5.5 °C, density 0.879 g mL⁻¹; **insoluble in water**, miscible with organic solvents; non-polar; burns with a **sooty flame**. The melting point is high for its size because of its **symmetry** (compare methylbenzene, −95 °C; p-xylene 13 °C against o-xylene −25 °C and m-xylene −48 °C).`,
      [kt('Decarboxylation', 'Removal of CO₂ (here as carbonate) from a carboxylate salt on heating with soda lime.'), kt('Soda lime', 'A mixture of sodium hydroxide and calcium oxide used for decarboxylation.')],
      [],
      table(['Compound', 'mp (°C)', 'bp (°C)'], [['Benzene', '5.5', '80.1'], ['Methylbenzene', '−95', '110.6'], ['Cyclohexane', '6.5', '80.7'], ['p-Xylene', '13', '138']], 'Table of melting and boiling points of four hydrocarbons'),
      [2],
    ),
    sec(
      '5. Electrophilic substitution and its mechanism',
      `**Mechanism (two steps):** (1) slow: the π electrons attack the electrophile E⁺ to form the **arenium ion (σ complex)**, a carbocation stabilised by resonance (the + on the ortho and para carbons); (2) fast: loss of H⁺ from the sp³ carbon restores aromaticity. **Nitration:** conc. HNO₃ + conc. H₂SO₄, 323–333 K; electrophile **NO₂⁺** (HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻); product nitrobenzene. **Halogenation:** Cl₂ or Br₂ with FeCl₃/FeBr₃, in the dark. **Sulphonation:** conc. H₂SO₄ or oleum, electrophile **SO₃**, reversible. **Friedel–Crafts alkylation:** RCl, anhydrous AlCl₃, electrophile R⁺ (polyalkylation, rearrangement); **acylation:** RCOCl, anhydrous AlCl₃, electrophile RCO⁺, gives a ketone (C₆H₅COCH₃), no further substitution.`,
      [kt('Electrophile', 'An electron-pair acceptor that attacks regions of high electron density.'), kt('Arenium ion', 'The carbocation intermediate (σ complex) of electrophilic aromatic substitution, with the positive charge delocalised over three ring carbons.')],
      [],
      V.mech,
      [3],
      [V.hub],
    ),
    sec(
      '6. Directive influence of substituents',
      `A substituent decides the **position** and the **rate** of further substitution. **Ortho/para directors (activating):** –OH, –NH₂, –OCH₃ (+M, lone pair donation) and –CH₃, –R (+I, hyperconjugation); the arenium ion for o/p attack has a resonance form with the + on the carbon bearing the donor. **Halogens:** o/p directing but **deactivating** (−I outweighs +M). **Meta directors (deactivating):** –NO₂, –CN, –COOH, –CHO, –COR, –SO₃H (−I, −M); o/p attack puts the + next to the electron-poor atom of the group, so **meta** attack is preferred. Reactivity: phenol > toluene > benzene > nitrobenzene. Nitration of toluene gives about 58% ortho, 4% meta, 38% para; nitration of nitrobenzene gives about 93% meta (1,3-dinitrobenzene).`,
      [kt('Activating group', 'A group that makes the ring react faster than benzene.'), kt('Directing group', 'A substituent that determines the position (ortho/para or meta) taken by the next electrophile.')],
      [],
      V.direct,
      [4],
    ),
    sec(
      '7. Other reactions, hazards and uses',
      `**Oxidation:** benzene resists KMnO₄; burns with a sooty flame (2C₆H₆ + 15O₂ → 12CO₂ + 6H₂O); with air and V₂O₅ at about 773 K gives maleic anhydride. **Ozonolysis:** triozonide, then Zn/H₂O gives **three glyoxal** (OHC–CHO). **Addition (forcing conditions):** H₂, Ni, 473 K gives **cyclohexane**; Cl₂ or Br₂ in **UV light (no catalyst)** gives C₆H₆Cl₆ (**BHC**, hexachlorocyclohexane) or C₆H₆Br₆. **Pyrolysis:** red-hot tube gives **biphenyl** + H₂. **Hazards:** benzene is **toxic and carcinogenic** (bone-marrow damage, leukaemia), absorbed through skin, highly flammable: use a fume cupboard, gloves, and substitute methylbenzene where possible. **Uses:** solvent; raw material for styrene, phenol, aniline, cyclohexane (nylon), detergents, dyes and drugs; BHC insecticide.`,
      [kt('BHC', 'Benzene hexachloride, hexachlorocyclohexane C₆H₆Cl₆, formed by adding three Cl₂ to benzene in UV light; used as an insecticide.'), kt('Carcinogen', 'A substance that can cause cancer; benzene causes leukaemia.')],
      [],
      V.addition,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Describing benzene as a ring of three double and three single bonds that swap places (it is one resonance hybrid, all C–C 139 pm).
- Counting carbons instead of π electrons in Hückel's rule, or forgetting that the ring must be planar and conjugated.
- Writing "resonance energy = heat of hydrogenation" (it is the difference between observed and expected values).
- Giving a wrong catalyst: iron(III) chloride in the dark gives chlorobenzene; UV light with no catalyst gives BHC.
- Calling halogens meta directing (they are ortho/para directing but deactivating).
- Forgetting that Friedel–Crafts needs anhydrous AlCl₃ and that acylation stops at one substitution.

**How marks are usually awarded**
- Mechanism: formation of the electrophile, attack to give the arenium ion with the + shown, loss of H⁺ to the product.
- Directive effect: classify the group, say o/p or m, and justify with the resonance forms.
- Calculations: expected value, observed value, difference with sign and unit.
- Hazards: carcinogenic effect named, and one precaution.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name C₆H₅OH, C₆H₅NH₂ and C₆H₅COOH.', 'Phenol (hydroxybenzene), aniline (aminobenzene) and benzoic acid.', 'fact', 1),
    fc(2, 'What are ortho, meta and para?', 'Substituents on carbons 1,2 (ortho), 1,3 (meta) and 1,4 (para) of the ring.', 'concept', 1),
    fc(3, 'How are polysubstituted benzenes numbered?', 'Lowest locants; alphabetical order of substituents; C-1 to the carbon with the group that gives the parent name.', 'concept', 1),
    fc(4, 'What is a phenyl group? A benzyl group?', 'Phenyl is C₆H₅–; benzyl is C₆H₅CH₂–.', 'definition', 1),
    fc(5, 'Why did Kekulé structures need resonance?', 'Two structures differ only in double-bond positions; benzene is their hybrid, with all C–C bonds equal.', 'concept', 1),
    fc(6, 'Length of the C–C bond in benzene?', '139 pm (between 154 pm for C–C and 134 pm for C=C).', 'fact', 1),
    fc(7, 'Shape and bond angles of benzene?', 'Planar regular hexagon; all angles 120°.', 'fact', 1),
    fc(8, 'Hybridisation of carbon in benzene and π electron count?', 'sp²; six delocalised π electrons.', 'fact', 1),
    fc(9, 'Number of σ bonds in benzene?', '12 (6 C–C and 6 C–H).', 'fact', 1),
    fc(10, 'How many 1,2-dibromobenzene isomers exist, and why is it significant?', 'One; a Kekulé triene would give two, so the bonds must be equivalent.', 'concept', 1),
    fc(11, 'Calculate the resonance energy of benzene.', '−208 − 3(−120) = +152 kJ mol⁻¹ (about 150) more stable than a triene.', 'example', 1),
    fc(12, "State Hückel's rule.", 'A planar, cyclic, fully conjugated ring with (4n + 2) π electrons is aromatic.', 'definition', 1),
    fc(13, 'Is cyclobutadiene aromatic?', 'No: 4 π electrons (4n) make it antiaromatic.', 'concept', 1),
    fc(14, 'Why is cyclooctatetraene not aromatic?', 'It is tub-shaped, not planar, and has 8 π electrons.', 'concept', 1),
    fc(15, 'Benzene from sodium benzoate?', 'Heat with soda lime: C₆H₅COONa + NaOH → C₆H₆ + Na₂CO₃.', 'example', 2),
    fc(16, 'Benzene from phenol?', 'Pass phenol vapour over heated zinc dust: C₆H₅OH + Zn → C₆H₆ + ZnO.', 'example', 2),
    fc(17, 'Is benzene soluble in water? Denser or lighter?', 'Insoluble; density 0.879 g mL⁻¹, so it floats on water.', 'fact', 2),
    fc(18, 'Why does benzene melt much higher than methylbenzene?', 'Its symmetrical molecules pack closely in the crystal (5.5 °C against −95 °C).', 'concept', 2),
    fc(19, 'Why does benzene prefer substitution to addition?', 'Addition would destroy the delocalised π system and its resonance energy.', 'concept', 3),
    fc(20, 'Electrophile in nitration of benzene?', 'NO₂⁺ (nitronium ion) from conc. HNO₃ and conc. H₂SO₄.', 'fact', 3),
    fc(21, 'Name the intermediate in electrophilic substitution.', 'The arenium ion (σ complex), a resonance-stabilised carbocation.', 'definition', 3),
    fc(22, 'Slow and fast steps of electrophilic substitution?', 'Slow: attack of the π electrons on E⁺; fast: loss of H⁺ to restore aromaticity.', 'concept', 3),
    fc(23, 'Conditions for chlorination of benzene to chlorobenzene?', 'Cl₂ with FeCl₃ (or Fe), in the dark.', 'concept', 3),
    fc(24, 'Electrophile and reversibility of sulphonation?', 'SO₃ (conc. H₂SO₄ or oleum); reversible with dilute acid or steam.', 'concept', 3),
    fc(25, 'Friedel–Crafts alkylation: reagent and limitations?', 'RCl with anhydrous AlCl₃; polyalkylation and carbocation rearrangement.', 'concept', 3),
    fc(26, 'Friedel–Crafts acylation of benzene with CH₃COCl?', 'Gives C₆H₅COCH₃ (phenylethanone); acylium ion; no further substitution.', 'example', 3),
    fc(27, 'Which groups are ortho/para directing and activating?', '–OH, –NH₂, –OCH₃, –CH₃ and other alkyl groups.', 'fact', 4),
    fc(28, 'Which groups are meta directing and deactivating?', '–NO₂, –CN, –COOH, –CHO, –COR, –SO₃H.', 'fact', 4),
    fc(29, 'Halogens as directing groups?', 'Ortho/para directing but deactivating (−I outweighs +M).', 'concept', 4),
    fc(30, 'Why does –NO₂ direct meta?', 'In o/p attack the + sits next to the electron-poor N⁺; meta attack avoids this.', 'concept', 4),
    fc(31, 'Chlorine and benzene in UV light: product?', 'BHC, hexachlorocyclohexane C₆H₆Cl₆ (addition, no catalyst).', 'example', 5),
    fc(32, 'Health hazard of benzene and one precaution?', 'Carcinogenic (leukaemia), toxic; work in a fume cupboard.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
