// ch09 Hydrocarbons — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Hydrocarbons — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Alkanes: nomenclature, isomerism and preparation',
      r`**General formula** $\mathrm{C}_n\mathrm{H}_{2n+2}$; sp³ carbons, tetrahedral, C–C 154 pm. **Naming:** longest chain, lowest locants for the first branch, substituents alphabetical (2,2,4-trimethylpentane). **Chain isomers:** C₄H₁₀ 2, C₅H₁₂ 3, C₆H₁₄ 5, C₇H₁₆ 9.

**Preparation:**
- Hydrogenation of alkenes or alkynes (Ni, Pt or Pd): same carbon number.
- Reduction of alkyl halides: $\ce{C2H5Cl + Zn + HCl -> C2H6 + ZnCl2}$.
- **Wurtz:** $\ce{2CH3Br + 2Na ->[dry ether] C2H6 + 2NaBr}$ (a mixture of alkyl halides gives a mixture of alkanes).
- **Decarboxylation:** $\ce{CH3COONa + NaOH ->[CaO, heat] CH4 + Na2CO3}$ (one carbon less).
- **Kolbe electrolysis:** $\ce{2CH3COONa + 2H2O -> C2H6 + 2CO2 + H2 + 2NaOH}$ (R–R at the anode).`,
      [kt('Chain isomers', 'Compounds with the same molecular formula but different carbon skeletons.'), kt('Wurtz reaction', 'Coupling of two alkyl halide molecules by sodium in dry ether to give an alkane with twice the carbons.'), kt('Kolbe electrolysis', 'Electrolysis of an aqueous sodium or potassium carboxylate to give an alkane R–R at the anode.')],
      [fm(r`\mathrm{C}_n\mathrm{H}_{2n+2}`, 'Alkane general formula')],
      table(['Method', 'Carbons in the alkane'], [['Hydrogenation', 'Same as the alkene'], ['Wurtz', 'Twice those of R in RX'], ['Decarboxylation', 'One less than the acid salt'], ['Kolbe', 'Twice those of R in RCOO⁻']], 'Table of the carbon count of the alkane produced by each preparation method'),
      [1],
    ),
    sec(
      '2. Alkanes: properties and conformations of ethane',
      r`**Physical:** non-polar; boiling point rises with chain length and falls with branching (pentane 309 K, 2-methylbutane 301 K, 2,2-dimethylpropane 283 K).

**Chemical:** combustion; controlled oxidation (CH₄ → CH₃OH with Cu, 523 K, 100 atm; ethane → ethanoic acid with Mn(II) ethanoate); isomerisation (AlCl₃/HCl); aromatisation (hexane → benzene, Cr₂O₃/V₂O₅, 773 K); pyrolysis (cracking). **Halogenation** is a free-radical chain: initiation (Cl₂ → 2Cl•), propagation (Cl• + CH₄ → HCl + CH₃•; CH₃• + Cl₂ → CH₃Cl + Cl•), termination (radical + radical). Rates of H abstraction: 3° > 2° > 1°; F₂ > Cl₂ > Br₂ > I₂.

**Conformations of ethane:** staggered (dihedral angle 60°, minimum) and eclipsed (0°, maximum). The eclipsed form is about **12.5 kJ mol⁻¹** higher (torsional strain, about 4 kJ mol⁻¹ per eclipsed H–H pair), but rotation is nearly free at room temperature.`,
      [kt('Free radical', 'A species with an unpaired electron, formed by homolytic fission.'), kt('Staggered conformation', 'Ethane conformation with the hydrogens of one carbon midway between those of the other; lowest energy.'), kt('Torsional strain', 'Extra energy of the eclipsed conformation caused by repulsion between electron clouds of eclipsed bonds.')],
      [fm(r`E(\theta) = 6.25\,(1 + \cos 3\theta)\ \text{kJ mol}^{-1}`, 'Torsional energy of ethane (θ from the eclipsed form)')],
      V.newman,
      [1],
      [V.energy],
    ),
    sec(
      '3. Alkenes: structure, geometric isomerism and preparation',
      r`**General formula** $\mathrm{C}_n\mathrm{H}_{2n}$; sp² carbons, planar, 120°, C=C 134 pm; one σ and one π bond (restricted rotation). **Geometric (cis–trans) isomerism** needs two different groups on each C of C=C: cis-but-2-ene (bp 277 K, mp 134 K, polar) and trans-but-2-ene (bp 274 K, mp 168 K, non-polar, packs better).

**Preparation:** partial reduction of alkynes (Lindlar → cis; Na/liquid NH₃ → trans); dehydrohalogenation (alcoholic KOH); dehydration of alcohols (conc. H₂SO₄, 443 K); dehalogenation of vicinal dihalides (Zn).`,
      [kt('Geometric isomers', 'Stereoisomers differing in the arrangement of groups about a double bond (or ring).'), kt('Lindlar catalyst', 'Palladium on calcium carbonate poisoned with quinoline; stops alkyne hydrogenation at the cis alkene.')],
      [],
      V.cistrans,
      [2],
    ),
    sec(
      '4. Alkenes: reactions',
      r`**Addition:** H₂ (Ni) → alkane; X₂ → vicinal dihalide (bromine in CCl₄ decolourised); HX and H₂O (H⁺) follow **Markovnikov's rule**: H adds to the carbon with more H. The π bond attacks H⁺ to give the more stable carbocation (3° > 2° > 1°), then X⁻ attacks.

**Peroxide (Kharasch) effect:** with peroxide, **HBr only** adds anti-Markovnikov through a radical chain (Br• adds to give the more stable radical): but-1-ene → 1-bromobutane.

**Ozonolysis** (O₃, then Zn/H₂O): C=C is cut and each carbon becomes C=O: =CH₂ → HCHO, =CHR → RCHO, =CR₂ → R₂C=O. **Baeyer's test:** cold dilute alkaline KMnO₄ is decolourised (brown MnO₂), vicinal diol formed. **Polymerisation:** n CH₂=CH₂ → polythene.`,
      [kt('Markovnikov’s rule', 'In the addition of HX to an unsymmetrical alkene, hydrogen adds to the carbon that already has more hydrogens.'), kt('Peroxide effect', 'Anti-Markovnikov addition of HBr in the presence of peroxides.'), kt('Ozonolysis', 'Cleavage of C=C by ozone followed by reductive work-up, giving aldehydes and ketones.')],
      [],
      V.markov,
      [2],
      [V.markovE],
    ),
    sec(
      '5. Alkynes',
      r`**General formula** $\mathrm{C}_n\mathrm{H}_{2n-2}$; sp carbons, linear, C≡C 120 pm. **Acidity:** sp carbon (50% s-character) is more electronegative, so terminal alkynes are weakly acidic: ethyne > ethene > ethane. $\ce{2CH#CH + 2Na -> 2CH#CNa + H2}$; $\ce{CH#CH + NaNH2 -> CH#CNa + NH3}$.

**Preparation:** $\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$; vicinal dihalide + alcoholic KOH (twice).

**Addition:** H₂ (Ni → alkane; Lindlar → cis; Na/NH₃ → trans); X₂ (twice); HX (Markovnikov, twice); H₂O/HgSO₄/H₂SO₄ → ethanal from ethyne, propanone from propyne.

**Cyclic polymerisation:** $\ce{3C2H2 ->[873 K] C6H6}$.`,
      [kt('Terminal alkyne', 'An alkyne with the triple bond at the end of the chain, R–C≡C–H.'), kt('Cyclic polymerisation', 'Joining of three ethyne molecules into the ring of benzene.')],
      [],
      table(['Hydrocarbon', 'C–H carbon', 'pKa (approx.)'], [['Ethyne', 'sp', '25'], ['Ethene', 'sp²', '44'], ['Ethane', 'sp³', '50']], 'Table of the acidity of ethyne, ethene and ethane'),
      [3],
    ),
    sec(
      '6. Benzene: structure, resonance and aromaticity',
      r`Benzene $\ce{C6H6}$: planar regular hexagon, all C–C 139 pm, bond angles 120°. **Resonance hybrid** of two Kekulé structures; delocalised π cloud of six electrons above and below the plane. **Resonance energy** about 150 kJ mol⁻¹ (hydrogenation: −208 observed against −360 expected for three C=C). Benzene prefers substitution to addition.

**Aromaticity (Hückel):** planar, cyclic, fully conjugated, (4n + 2) π electrons: benzene 6, naphthalene 10, anthracene 14. Cyclobutadiene (4) and cyclooctatetraene (8, tub-shaped) are not aromatic.

**Preparation:** cyclic polymerisation of ethyne; $\ce{C6H5COONa + NaOH ->[CaO, heat] C6H6 + Na2CO3}$; $\ce{C6H5OH + Zn -> C6H6 + ZnO}$; aromatisation of hexane.`,
      [kt('Resonance hybrid', 'The real structure of a molecule that is represented by two or more contributing structures.'), kt('Aromatic compound', 'A planar, cyclic, fully conjugated compound with (4n + 2) π electrons.'), kt('Resonance energy', 'The extra stability of a molecule compared with its most stable single contributing structure.')],
      [fm(r`\pi\ \text{electrons} = 4n + 2`, 'Hückel rule')],
      V.kekule,
      [4],
      [V.pi],
    ),
    sec(
      '7. Electrophilic substitution, directing effects and toxicity',
      r`**Mechanism:** E⁺ is attacked by the π cloud (slow) to give the arenium ion; loss of H⁺ (fast) restores the ring.

**Reactions:** nitration (conc. HNO₃/H₂SO₄, 333 K; NO₂⁺); halogenation (X₂, FeX₃); sulfonation (fuming H₂SO₄; SO₃); Friedel–Crafts alkylation (RCl, anhydrous AlCl₃) and acylation (RCOCl, anhydrous AlCl₃, giving an aryl ketone). Friedel–Crafts fails on strongly deactivated rings such as nitrobenzene.

**Directing effects:** –OH, –NH₂, –OCH₃, –CH₃ activate and direct o/p; –Cl, –Br deactivate but direct o/p; –NO₂, –CN, –CHO, –COOH, –SO₃H deactivate and direct m.

**Toxicity:** benzene harms bone marrow; polynuclear hydrocarbons such as **benzpyrene** (formed by incomplete combustion of coal, petroleum and tobacco) are **carcinogenic** because they damage DNA.`,
      [kt('Electrophile', 'An electron-poor species that attacks regions of high electron density.'), kt('Arenium ion', 'The resonance-stabilised carbocation intermediate formed when an electrophile attacks benzene.'), kt('Directing group', 'A substituent that determines the position at which the next group enters the ring.')],
      [],
      V.eas,
      [4],
      [table(['Group', 'Rate', 'Orientation'], [['–OH, –NH₂, –CH₃', 'Activating', 'o and p'], ['–Cl, –Br', 'Deactivating', 'o and p'], ['–NO₂, –COOH, –CHO', 'Deactivating', 'm']], 'Table of the effect of substituents on the rate and orientation of electrophilic substitution')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving the peroxide effect for HCl or HI (it is for HBr only).
- Writing H adding to the carbon with fewer hydrogens in Markovnikov addition.
- Drawing the Newman projection without the circle for the back carbon, or calling the eclipsed form the more stable one.
- Calling cyclooctatetraene or cyclobutadiene aromatic.
- Writing the product of Friedel–Crafts acylation as an alkylbenzene.
- Forgetting that only terminal alkynes react with sodium.

**How marks are usually awarded**
- 1-mark items: product, reagent, name or classification.
- Mechanism answers: electrophile or radical generated (1), slow step with intermediate (1), product (1).
- Prediction (2 marks): rule named (1) + product (1).
- Ozonolysis: carbonyl products (1) + alkene structure (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'General formulas of alkanes, alkenes and alkynes?', r`$\mathrm{C}_n\mathrm{H}_{2n+2}$, $\mathrm{C}_n\mathrm{H}_{2n}$, $\mathrm{C}_n\mathrm{H}_{2n-2}$.`, 'formula', 1),
    fc(2, 'How many chain isomers has C₅H₁₂?', 'Three: pentane, 2-methylbutane, 2,2-dimethylpropane.', 'fact', 1),
    fc(3, 'Wurtz reaction?', 'Alkyl halide + Na in dry ether gives an alkane with twice the carbons: 2RX + 2Na → R–R + 2NaX.', 'definition', 1),
    fc(4, 'Effect of decarboxylation on carbon number?', 'The alkane has one carbon less than the sodium carboxylate (soda lime, heat).', 'concept', 1),
    fc(5, 'Kolbe electrolysis product at the anode?', 'R–R (an alkane with twice the carbons of R), plus CO₂.', 'concept', 1),
    fc(6, 'Why does branching lower the boiling point?', 'Smaller surface area of contact, weaker van der Waals forces.', 'concept', 1),
    fc(7, 'Initiation step in chlorination of methane?', 'Light splits Cl₂ into two chlorine radicals (Cl•).', 'definition', 1),
    fc(8, 'Two propagation steps of methane chlorination?', 'Cl• + CH₄ → HCl + CH₃•; CH₃• + Cl₂ → CH₃Cl + Cl•.', 'concept', 1),
    fc(9, 'Order of ease of H abstraction by a radical?', '3° > 2° > 1° (more stable radical).', 'fact', 1),
    fc(10, 'Catalyst and product for aromatisation of hexane?', 'Cr₂O₃/V₂O₅/Mo₂O₃, 773 K, 10–20 atm gives benzene and H₂.', 'fact', 1),
    fc(11, 'Draw the staggered Newman projection of ethane.', 'Circle for back carbon; front bonds meet at the centre at 120°; back bonds start at the circle midway between them (dihedral 60°).', 'diagram', 1),
    fc(12, 'Which ethane conformation is more stable and by how much?', 'Staggered, by about 12.5 kJ mol⁻¹ (torsional strain of the eclipsed form).', 'fact', 1),
    fc(13, 'Why is rotation about C–C in ethane almost free at 298 K?', 'The barrier (12.5 kJ mol⁻¹) is small compared with collision energies; about 6 in 1000 molecules are eclipsed at any moment.', 'concept', 1),
    fc(14, 'Geometry and bonding of the C=C carbons?', 'sp², trigonal planar (120°), one σ and one π bond.', 'fact', 2),
    fc(15, 'Condition for cis–trans isomerism in an alkene?', 'Two different groups on each carbon of C=C, and restricted rotation about the π bond.', 'concept', 2),
    fc(16, 'Which but-2-ene isomer has the higher melting point?', 'trans (symmetrical, packs better): 168 K against 134 K for cis.', 'fact', 2),
    fc(17, 'Lindlar catalyst gives which alkene?', 'The cis alkene (Pd/CaCO₃ poisoned with quinoline).', 'fact', 2),
    fc(18, 'Na in liquid NH₃ reduces an alkyne to?', 'The trans alkene.', 'fact', 2),
    fc(19, 'State Markovnikov’s rule.', 'In HX addition to an unsymmetrical alkene, H adds to the carbon with more hydrogens (X goes to the carbon with fewer).', 'definition', 2),
    fc(20, 'Order of carbocation stability?', '3° > 2° > 1° > CH₃⁺ (hyperconjugation and +I effect of alkyl groups).', 'fact', 2),
    fc(21, 'The peroxide effect: which reagent?', 'HBr only (not HCl or HI); gives anti-Markovnikov product via radicals.', 'concept', 2),
    fc(22, 'Ozonolysis products from =CH₂, =CHR and =CR₂ carbons?', 'Methanal, an aldehyde and a ketone respectively.', 'fact', 2),
    fc(23, 'Baeyer’s test observation?', 'Cold dilute alkaline KMnO₄ is decolourised (brown MnO₂); a vicinal diol forms.', 'example', 2),
    fc(24, 'Why is ethyne more acidic than ethene or ethane?', 'The sp carbon (50% s-character) is more electronegative and stabilises the anion.', 'concept', 3),
    fc(25, 'Laboratory preparation of ethyne?', r`$\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$.`, 'formula', 3),
    fc(26, 'Product of hydration of ethyne and of propyne?', 'Ethanal and propanone (via enol–keto tautomerism).', 'example', 3),
    fc(27, 'What does red-hot iron do to ethyne?', 'Cyclic polymerisation: three C₂H₂ give C₆H₆ (benzene) at 873 K.', 'fact', 3),
    fc(28, 'C–C bond length in benzene?', '139 pm, between C–C (154 pm) and C=C (134 pm).', 'fact', 4),
    fc(29, 'State the Hückel rule.', 'A planar, cyclic, fully conjugated ring is aromatic if it has (4n + 2) π electrons.', 'definition', 4),
    fc(30, 'Electrophile in nitration, and in Friedel–Crafts acylation?', 'NO₂⁺ (nitronium ion); RCO⁺ (acylium ion).', 'fact', 4),
    fc(31, 'Which groups are m-directing?', '–NO₂, –CN, –CHO, –COOH, –SO₃H (electron-withdrawing).', 'fact', 4),
    fc(32, 'Why are polynuclear hydrocarbons dangerous?', 'Fused-ring compounds like benzpyrene (from incomplete combustion) damage DNA and are carcinogenic.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
