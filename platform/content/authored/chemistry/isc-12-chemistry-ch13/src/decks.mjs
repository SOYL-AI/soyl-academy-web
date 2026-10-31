// ISC 12 Chemistry ch13 Haloarenes — two decks: Part 1 (t01–t02) the C–X bond, preparation (electrophilic
// substitution, Sandmeyer, Gattermann) and physical properties; Part 2 (t03–t05) electrophilic substitution with
// mechanism, nucleophilic substitution with mechanism, reduction, Wurtz–Fittig, Fittig, Grignard and DDT.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { RESONANCE } from './svgs.mjs';

export const V = {
  resonance: svgV(RESONANCE, 'Two resonance structures of chlorobenzene, one with a single carbon–chlorine bond and one with a carbon–chlorine double bond, a positive charge on chlorine and a negative charge at the ortho carbon'),
};

export const deck1 = deck({
  part: 1,
  title: 'Haloarenes — Part 1: The C–X bond, preparation and physical properties',
  goals: [
    'Explain why the C–Cl bond in chlorobenzene is shorter and stronger than in chloroalkanes',
    'Write equations for preparing haloarenes by electrophilic substitution and from benzenediazonium chloride',
    'Explain the physical properties of haloarenes, including the high melting point of the para-dichloro isomer',
  ],
  slides: [
    sl('title', 'Halogens on a benzene ring', {
      b: 'Part 1 — how a halogen bonded directly to a benzene ring differs from one in a haloalkane.',
      v: table(['Haloarene', 'Use'], [['Chlorobenzene', 'Solvent; intermediate for phenol, aniline, DDT'], ['1,4-Dichlorobenzene', 'Moth balls, toilet deodoriser blocks'], ['Bromobenzene', 'Making phenylmagnesium bromide'], ['DDT', 'Insecticide (now restricted)']], 'Table of haloarenes and their uses'),
      n: 'Namaste! Moth balls, the insecticide DDT and the starting material for many dyes and drugs all contain a halogen bonded directly to a benzene ring. These are haloarenes, or aryl halides. Though they look like haloalkanes, they behave very differently. In this part we see why, how they are made, and what their physical properties are.',
    }),
    sl('concept', 'Haloarenes', {
      b: 'In a **haloarene** (aryl halide), X is bonded to an **sp² carbon of an aromatic ring**: C₆H₅X. In a **benzylic halide** (C₆H₅CH₂X), X is on an sp³ carbon next to the ring and behaves like a reactive haloalkane.',
      v: table(['Compound', 'IUPAC name', 'Type'], [['C₆H₅Cl', 'Chlorobenzene', 'Aryl halide'], ['C₆H₄Cl₂ (1,4)', '1,4-Dichlorobenzene', 'Aryl dihalide'], ['CH₃C₆H₄Br (para)', '1-Bromo-4-methylbenzene', 'Aryl halide'], ['C₆H₅CH₂Cl', '(Chloromethyl)benzene', 'Benzylic halide (not aryl)']], 'Table distinguishing aryl and benzylic halides'),
      n: 'An aryl halide has the halogen joined straight to a carbon of the benzene ring, which is sp two hybridised. Do not confuse it with a benzylic halide such as benzyl chloride, where the halogen is on a carbon attached to the ring. Benzyl chloride is very reactive, like a haloalkane; chlorobenzene is remarkably unreactive towards nucleophiles.',
    }),
    sl('diagram', 'Nature of the C–X bond', {
      b: 'In chlorobenzene a lone pair on Cl is **delocalised into the ring** (+R effect), so the C–Cl bond has **partial double-bond character**. In addition, the carbon is **sp²** (more s character, more electronegative). Both make the C–Cl bond **shorter and stronger** than in chloroalkanes.',
      v: V.resonance,
      n: 'Look at the resonance structures. One lone pair of chlorine can spread into the benzene ring, giving the carbon to chlorine bond some double-bond character. Also, the ring carbon is sp two hybridised, with more s character than the sp three carbon of a haloalkane, so it holds the bonding pair more tightly. Both effects shorten and strengthen the bond.',
    }),
    sl('concept', 'Comparing bond lengths and dipole moments', {
      b: 'The C–Cl bond in chlorobenzene is shorter and less polar than in chloromethane: the +R effect of Cl partly opposes its −I effect.',
      v: table(['Property', 'CH₃Cl', 'C₆H₅Cl'], [['C hybridisation', 'sp³', 'sp²'], ['C–Cl bond length', '177 pm', '169 pm'], ['Dipole moment', '1.86 D', '1.69 D'], ['Partial double-bond character', 'No', 'Yes']], 'Table comparing chloromethane and chlorobenzene'),
      n: 'Experiments support the picture. The carbon–chlorine bond is one hundred and sixty nine picometres in chlorobenzene but one hundred and seventy seven in chloromethane. The dipole moment of chlorobenzene is also smaller, because electrons pushed back into the ring by resonance partly cancel the pull of chlorine’s electronegativity.',
    }),
    sl('example', 'Worked example: explaining the data', {
      b: r`**Problem.** Explain why (a) the C–Cl bond is shorter in chlorobenzene than in chloroethane, and (b) chlorobenzene (1.69 D) has a smaller dipole moment than chloroethane (2.05 D).

**(a)** Resonance gives C–Cl partial double-bond character, and the sp² carbon is more electronegative than sp³: shorter, stronger bond.

**(b)** In chloroethane only the −I effect of Cl operates. In chlorobenzene the +R effect (Cl lone pair into the ring) acts in the opposite direction, reducing the net polarity.`,
      v: table(['Effect', 'Chloroethane', 'Chlorobenzene'], [['−I of Cl', 'Yes', 'Yes'], ['+R of Cl', 'No', 'Yes'], ['Net dipole', '2.05 D', '1.69 D']], 'Table of electronic effects in chloroethane and chlorobenzene'),
      n: 'Both answers come from resonance. In chlorobenzene, partial double-bond character and the sp two carbon make the bond shorter. As for polarity, chlorine pulls electrons through the sigma bond in both compounds, but in chlorobenzene it also pushes a lone pair back into the ring, which works against that pull and reduces the dipole moment.',
    }),
    sl('check', 'Quick check: the C–X bond', {
      b: 'Explain a property of the C–Cl bond in chlorobenzene.',
      n: 'Quick check. Think about resonance and the hybridisation of the ring carbon.',
      chk: 'bond-mcq',
    }),
    sl('concept', 'Preparation by electrophilic substitution', {
      b: 'Benzene reacts with Cl₂ or Br₂ in the presence of a **Lewis acid** (FeCl₃, FeBr₃, AlCl₃) in the dark. The catalyst polarises X₂ to give the electrophile X⁺. Iodination is reversible and needs an oxidising agent (HNO₃ or HIO₃) to remove HI; fluorination is too violent.',
      m: [r`\ce{C6H6 + Cl2 ->[FeCl3][dark] C6H5Cl + HCl}`, r`\ce{C6H5CH3 + Br2 ->[FeBr3] BrC6H4CH3 + HBr}`],
      v: table(['Halogen', 'Conditions', 'Note'], [['Cl₂', 'FeCl₃ or AlCl₃, dark', 'Good yield'], ['Br₂', 'FeBr₃', 'Good yield'], ['I₂', 'With HNO₃ (oxidises HI)', 'Reversible otherwise'], ['F₂', '—', 'Too violent; not used']], 'Table of conditions for halogenating benzene'),
      n: 'Benzene does not react with chlorine on its own, but a Lewis acid such as iron three chloride polarises the chlorine molecule, producing an electrophile that attacks the ring. The reaction is done in the dark to avoid free-radical addition. With toluene, the methyl group directs bromine to the ortho and para positions. Direct iodination needs an oxidising agent, and fluorination is too violent.',
    }),
    sl('concept', 'Preparation from benzenediazonium chloride', {
      b: 'Aniline is diazotised (NaNO₂ + HCl, 273–278 K) to benzenediazonium chloride. **Sandmeyer:** CuCl/HCl or CuBr/HBr. **Gattermann:** copper powder with HCl or HBr. With **KI**, iodobenzene forms directly.',
      m: [r`\ce{C6H5NH2 + NaNO2 + 2HCl ->[273-278 K] C6H5N2Cl + NaCl + 2H2O}`, r`\ce{C6H5N2Cl ->[CuCl/HCl] C6H5Cl + N2}`, r`\ce{C6H5N2Cl + KI -> C6H5I + KCl + N2}`],
      v: table(['Reaction', 'Reagent', 'Product'], [['Sandmeyer', 'CuCl/HCl', 'Chlorobenzene'], ['Sandmeyer', 'CuBr/HBr', 'Bromobenzene'], ['Gattermann', 'Cu powder + HCl', 'Chlorobenzene'], ['—', 'KI (warm)', 'Iodobenzene']], 'Table of preparations from benzenediazonium chloride'),
      n: 'A cleaner route uses diazonium salts. Aniline is treated with sodium nitrite and hydrochloric acid in ice to give benzenediazonium chloride. In the Sandmeyer reaction, copper one chloride or bromide replaces the diazonium group by chlorine or bromine; in the Gattermann reaction, copper powder and the acid are used instead. Iodobenzene forms simply by warming with potassium iodide.',
    }),
    sl('example', 'Worked example: choosing a route', {
      b: r`**Problem.** Suggest a method, with reagents, to prepare (a) pure 4-bromotoluene from 4-methylaniline, (b) iodobenzene from aniline, (c) chlorobenzene from benzene.

**(a)** Diazotise ($\ce{NaNO2/HCl}$, 273–278 K), then CuBr/HBr (Sandmeyer) — avoids the o/p mixture from direct bromination of toluene.

**(b)** Diazotise, then warm with KI.

**(c)** $\ce{Cl2}$ with anhydrous FeCl₃ in the dark.`,
      v: table(['Target', 'Route'], [['4-Bromotoluene (pure)', 'Diazotise 4-methylaniline, CuBr/HBr'], ['Iodobenzene', 'Diazotise aniline, KI'], ['Chlorobenzene', 'Cl₂, FeCl₃, dark']], 'Table of routes'),
      n: 'Direct bromination of toluene gives a mixture of ortho and para products, so for pure four-bromotoluene it is better to start from four-methylaniline: the diazonium group is replaced by bromine exactly where the amino group was. Iodobenzene comes from the diazonium salt and potassium iodide. And chlorobenzene is made directly from benzene with chlorine and iron three chloride.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Choose the reagent for preparing a haloarene.',
      n: 'Quick check. Recall which reactions use copper salts, copper powder or a Lewis acid.',
      chk: 'prep-mcq',
    }),
    sl('concept', 'Physical properties', {
      b: 'Haloarenes are colourless liquids or solids, **insoluble in water**, soluble in organic solvents, and denser than water (bromo-, iodo-). B.p. rises with molar mass (C₆H₅F < C₆H₅Cl < C₆H₅Br < C₆H₅I). The **para** isomer of a dihalobenzene has a much **higher melting point** than ortho and meta, because its symmetrical molecules pack better in the crystal.',
      v: table(['Compound', 'm.p. / K', 'b.p. / K'], [['1,2-Dichlorobenzene', '256', '453'], ['1,3-Dichlorobenzene', '249', '446'], ['1,4-Dichlorobenzene', '323', '447'], ['Chlorobenzene', '228', '405'], ['Bromobenzene', '242', '429']], 'Table of melting and boiling points of haloarenes'),
      n: 'Haloarenes do not dissolve in water but mix with organic solvents. Their boiling points rise with molar mass. The three dichlorobenzenes boil at similar temperatures, because boiling depends mainly on molecular size, but the para isomer melts about seventy degrees higher. Its symmetrical molecules fit neatly into a crystal lattice, so more energy is needed to melt it.',
    }),
    sl('example', 'Worked example: melting and boiling points', {
      b: r`**Problem.** (a) Why does 1,4-dibromobenzene (m.p. 360 K) melt so much higher than 1,2-dibromobenzene (m.p. 280 K), although both boil near 492 K? (b) Arrange chlorobenzene, bromobenzene and iodobenzene by boiling point.

**(a)** Boiling depends on intermolecular forces in the liquid, which are similar for isomers of equal mass. Melting also depends on **packing** in the crystal: the symmetrical para isomer packs more closely, giving a stronger lattice.

**(b)** C₆H₅Cl < C₆H₅Br < C₆H₅I (increasing mass and polarisability).`,
      v: table(['Compound', 'm.p. / K'], [['1,2-Dibromobenzene', '≈ 280'], ['1,4-Dibromobenzene', '≈ 360']], 'Table of melting points of dibromobenzene isomers'),
      n: 'Isomers of the same mass have similar forces in the liquid, so they boil at similar temperatures. But melting means breaking up a crystal, and the symmetrical para molecules stack much more efficiently, so the para isomer melts far higher. Boiling points of the monohalobenzenes rise from chloro to iodo, as the molecules get heavier and more polarisable.',
    }),
    sl('check', 'Quick check: physical properties', {
      b: 'Explain a melting or boiling point trend in haloarenes.',
      n: 'Quick check. Separate the effect of molar mass on boiling from the effect of symmetry on melting.',
      chk: 'mp-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Aryl halides: X on sp² ring carbon; benzylic halides are different.',
        'C–X in haloarenes shorter and stronger (resonance, sp² carbon); smaller dipole moment.',
        'Preparation: X₂ + Lewis acid (dark); Sandmeyer (CuX/HX); Gattermann (Cu/HX); KI for iodobenzene.',
        'Insoluble in water; para-dihalobenzenes have the highest melting points.',
      ],
      v: table(['Method', 'Reagent'], [['Halogenation', 'Cl₂/FeCl₃'], ['Sandmeyer', 'CuCl/HCl'], ['Gattermann', 'Cu/HCl'], ['Iodobenzene', 'KI']], 'Summary table of preparations'),
      n: 'Let us sum up Part 1. In haloarenes the halogen is joined to an sp two ring carbon, and resonance gives the bond partial double-bond character, making it short, strong and less polar. Haloarenes are made by halogenating benzene with a Lewis acid, or from diazonium salts by the Sandmeyer and Gattermann reactions. The para isomers of dihalobenzenes melt highest because they pack best.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Mention both reasons for the strong C–X bond: resonance and sp² hybridisation.',
        'Give conditions: Lewis acid, dark; diazotisation at 273–278 K.',
        'Distinguish Sandmeyer (CuCl/HCl) from Gattermann (Cu/HCl).',
        'Explain m.p. by packing (symmetry), not by molar mass.',
      ],
      v: table(['Slip', 'Fix'], [['Benzyl chloride is an aryl halide', 'It is benzylic'], ['Gattermann uses CuCl', 'Uses Cu powder + HX'], ['p-isomer boils highest', 'It melts highest']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Give both reasons for the short, strong carbon to halogen bond. Write the conditions, especially the Lewis acid and the low temperature for diazotisation. Keep the Sandmeyer and Gattermann reagents apart. And explain the high melting point of the para isomer by packing, not by mass.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Haloarenes — Part 2: Electrophilic and nucleophilic substitution, metals and DDT',
  goals: [
    'Draw the mechanism of nitration of chlorobenzene and explain the ortho/para directing but deactivating effect of halogen',
    'Explain why haloarenes resist nucleophilic substitution and how ortho/para nitro groups assist it',
    'Write equations for reduction, Wurtz–Fittig, Fittig and Grignard reactions',
    'Draw the structure of DDT and explain why its use is restricted',
  ],
  slides: [
    sl('title', 'Reactions of haloarenes', {
      b: 'Part 2 — substitution on the ring, replacement of the halogen, reactions with metals, and DDT.',
      v: flow('LR', [['a', 'Haloarene'], ['b', 'Electrophilic substitution (o/p)'], ['c', 'Nucleophilic substitution (hard)'], ['d', 'Reduction; Na and Mg reactions']], [['a', 'b'], ['a', 'c'], ['a', 'd']], 'Flow of the reactions of haloarenes'),
      n: 'Haloarenes react in two very different ways. The ring can be attacked by electrophiles, and the halogen directs them to ortho and para positions while slowing the reaction. The halogen itself can be replaced by nucleophiles only under harsh conditions, unless nitro groups help. Finally we meet reactions with sodium and magnesium, and the story of DDT.',
    }),
    sl('concept', 'Halogen: deactivating but ortho/para directing', {
      b: 'Halogen has a strong **−I effect** (withdraws electrons through the σ bond) that makes the ring **less reactive** than benzene, and a **+R effect** (lone pair into the ring) that increases electron density at **ortho and para** positions. −I outweighs +R for reactivity; +R decides orientation.',
      v: table(['Effect', 'Direction', 'Result'], [['−I', 'Electrons withdrawn from ring', 'Deactivation: slower than benzene'], ['+R', 'Lone pair donated to o, p', 'o/p directing']], 'Table of the inductive and resonance effects of halogen'),
      n: 'A halogen on a benzene ring pulls electrons away through the sigma bond, so the ring is less reactive towards electrophiles than benzene itself. But its lone pairs also feed electrons into the ring by resonance, specifically to the ortho and para positions. The inductive effect wins when it comes to overall speed, but the resonance effect decides where the new group goes.',
    }),
    sl('concept', 'Mechanism: nitration of chlorobenzene', {
      b: r`**Step 1** (electrophile): $\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$.

**Step 2** (slow): NO₂⁺ attacks the ring at o or p, forming a **σ-complex** (arenium ion). For o/p attack, one resonance form puts + on the carbon bearing Cl, where Cl’s lone pair stabilises it (a chloronium form); meta attack has no such form.

**Step 3** (fast): HSO₄⁻ removes H⁺, restoring aromaticity. Products: 1-chloro-4-nitrobenzene (major) and 1-chloro-2-nitrobenzene.`,
      m: [r`\ce{C6H5Cl + HNO3 ->[conc. H2SO4] ClC6H4NO2 + H2O}`],
      v: flow('LR', [['a', 'HNO₃ + H₂SO₄ → NO₂⁺'], ['b', 'NO₂⁺ attacks o/p (slow)'], ['c', 'σ-complex stabilised by Cl lone pair'], ['d', 'Loss of H⁺ (fast)'], ['e', 'o- and p-chloronitrobenzene']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the nitration mechanism of chlorobenzene'),
      n: 'Sulphuric acid protonates nitric acid, which loses water to give the nitronium ion, the electrophile. In the slow step, the nitronium ion attacks the ring at the ortho or para position, forming a positively charged intermediate. For these positions, one resonance form puts the positive charge next to chlorine, whose lone pair can share it. Finally the ring loses a proton and becomes aromatic again.',
    }),
    sl('concept', 'Other electrophilic substitutions', {
      b: 'All give **ortho and para** products; para usually predominates (less steric hindrance).',
      v: table(['Reaction', 'Reagent', 'Products from chlorobenzene'], [['Chlorination', 'Cl₂, anhydrous FeCl₃', '1,2- and 1,4-dichlorobenzene'], ['Nitration', 'conc. HNO₃ + conc. H₂SO₄', '1-chloro-2-nitro- and 1-chloro-4-nitrobenzene'], ['Sulphonation', 'conc. H₂SO₄, heat', '2- and 4-chlorobenzenesulphonic acid'], ['Friedel–Crafts alkylation', 'CH₃Cl, AlCl₃', '2- and 4-chlorotoluene'], ['Friedel–Crafts acylation', 'CH₃COCl, AlCl₃', '2- and 4-chloroacetophenone']], 'Table of electrophilic substitution reactions of chlorobenzene'),
      m: [r`\ce{C6H5Cl + Cl2 ->[FeCl3] ClC6H4Cl + HCl}`, r`\ce{C6H5Cl + H2SO4 -> ClC6H4SO3H + H2O}`],
      n: 'Chlorination, nitration, sulphonation and Friedel–Crafts reactions all put the new group ortho or para to the halogen. The para product is usually the major one, because the bulky halogen hinders attack at the neighbouring ortho positions. All of these reactions are slower than the corresponding reactions of benzene, because the ring is deactivated.',
    }),
    sl('example', 'Worked example: products of electrophilic substitution', {
      b: r`**Problem.** Give the major products: (a) bromobenzene + Br₂/FeBr₃; (b) chlorobenzene + CH₃COCl/AlCl₃; (c) chlorobenzene heated with conc. H₂SO₄. Why is the para product major?

**(a)** 1,4-Dibromobenzene (major) with 1,2-dibromobenzene.

**(b)** 1-(4-Chlorophenyl)ethan-1-one, 4-chloroacetophenone (major), with the 2-isomer.

**(c)** 4-Chlorobenzenesulphonic acid (major).

Para is favoured because the large halogen hinders the adjacent ortho positions.`,
      v: table(['Reagent', 'Major product'], [['Br₂/FeBr₃', '1,4-Dibromobenzene'], ['CH₃COCl/AlCl₃', '4-Chloroacetophenone'], ['conc. H₂SO₄', '4-Chlorobenzenesulphonic acid']], 'Table of major products'),
      n: 'In each case the halogen sends the new group to ortho and para positions, and the para product dominates because the halogen crowds the ortho positions next to it. So bromination gives mainly one-four-dibromobenzene, acylation gives mainly four-chloroacetophenone, and sulphonation gives mainly four-chlorobenzenesulphonic acid.',
    }),
    sl('check', 'Quick check: electrophilic substitution', {
      b: 'Predict the effect of halogen on the rate and orientation of electrophilic substitution.',
      n: 'Quick check. Inductive effect for the rate; resonance for the positions.',
      chk: 'ortho-mcq',
    }),
    sl('concept', 'Nucleophilic substitution: why it is difficult', {
      b: 'Haloarenes resist replacement of X because: (1) **partial double-bond character** of C–X (resonance); (2) **sp² carbon** holds the electrons more tightly; (3) the **phenyl cation** is very unstable (no SN1); (4) the electron-rich ring **repels** nucleophiles and blocks backside attack (no SN2). **Dow process:** chlorobenzene + NaOH at 623 K and 300 atm gives sodium phenoxide.',
      m: [r`\ce{C6H5Cl + 2NaOH ->[623 K, 300 atm] C6H5ONa + NaCl + H2O}`, r`\ce{C6H5ONa + HCl -> C6H5OH + NaCl}`],
      v: table(['Compound', 'Conditions for Cl → OH'], [['Chlorobenzene', '623 K, 300 atm, NaOH'], ['1-Chloro-4-nitrobenzene', '443 K, aqueous NaOH'], ['1-Chloro-2,4-dinitrobenzene', '368 K, warm NaOH'], ['2,4,6-Trinitrochlorobenzene', 'Warm water']], 'Table of conditions for hydrolysis of chloro-nitrobenzenes'),
      n: 'Replacing the chlorine of chlorobenzene with hydroxide needs six hundred and twenty three kelvin and three hundred atmospheres, the old Dow process. The bond is strong, the phenyl cation is too unstable for an S N one route, and the ring blocks backside attack. But look at the table: each nitro group at an ortho or para position makes the reaction much easier, until with three nitro groups warm water is enough.',
    }),
    sl('concept', 'Mechanism: addition–elimination with nitro groups', {
      b: 'With **–NO₂ at ortho or para**, OH⁻ **adds** to the carbon bearing Cl, forming a **negatively charged σ-complex** (Meisenheimer complex) whose charge is **delocalised onto the nitro group**; Cl⁻ is then **eliminated**. A meta-nitro group cannot delocalise the charge, so it helps much less.',
      v: flow('LR', [['a', '4-Nitrochlorobenzene + OH⁻'], ['b', 'Addition: carbanion σ-complex'], ['c', 'Negative charge on NO₂ oxygen (o/p only)'], ['d', 'Elimination of Cl⁻'], ['e', '4-Nitrophenoxide → 4-nitrophenol']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the addition–elimination mechanism'),
      n: 'With a nitro group at the ortho or para position, the mechanism changes. Hydroxide adds to the carbon carrying chlorine, giving a negatively charged intermediate. Resonance carries that negative charge right onto the oxygen atoms of the nitro group, which stabilises it greatly. Then chloride leaves and the ring becomes aromatic again. A nitro group at the meta position cannot take the charge, so it helps far less.',
    }),
    sl('example', 'Worked example: replacing chlorine by –NH₂ and –H', {
      b: r`**Problem.** Write equations for (a) the conversion of chlorobenzene into aniline, and (b) the reduction of chlorobenzene to benzene. (c) Which hydrolyses faster with aqueous NaOH: 1-chloro-3-nitrobenzene or 1-chloro-4-nitrobenzene?

**(a)** $\ce{2C6H5Cl + 2NH3 + Cu2O ->[475 K, 60 atm] 2C6H5NH2 + 2CuCl + H2O}$.

**(b)** $\ce{C6H5Cl + H2 ->[Pd] C6H6 + HCl}$ (or Ni–Al alloy with NaOH).

**(c)** 1-Chloro-4-nitrobenzene: the para-NO₂ delocalises the negative charge of the intermediate.`,
      v: table(['Change', 'Conditions'], [['Cl → NH₂', 'NH₃, Cu₂O, 475 K, 60 atm'], ['Cl → H', 'H₂/Pd or Ni–Al/NaOH'], ['Cl → OH (with p-NO₂)', 'NaOH, 443 K']], 'Table of nucleophilic replacements and reduction'),
      n: 'Chlorine can be replaced by an amino group with ammonia and copper one oxide under heat and pressure, giving aniline. It can be replaced by hydrogen, reducing chlorobenzene to benzene, with hydrogen and palladium or with nickel aluminium alloy in alkali. And of the two chloronitrobenzenes, the para isomer hydrolyses faster, because only an ortho or para nitro group can take the negative charge.',
    }),
    sl('check', 'Quick check: nucleophilic substitution', {
      b: 'Decide which haloarene undergoes nucleophilic substitution most easily, or explain why it is difficult.',
      n: 'Quick check. Look for nitro groups at ortho or para positions.',
      chk: 'nitro-mcq',
    }),
    sl('concept', 'Wurtz–Fittig, Fittig and Grignard reactions', {
      b: '**Wurtz–Fittig:** aryl halide + alkyl halide + Na in dry ether → alkylbenzene. **Fittig:** two aryl halides + Na → biaryl. **Grignard:** bromobenzene + Mg in dry ether → phenylmagnesium bromide (chlorobenzene needs tetrahydrofuran).',
      m: [r`\ce{C6H5Br + C2H5Br + 2Na ->[dry ether] C6H5C2H5 + 2NaBr}`, r`\ce{2C6H5Cl + 2Na ->[dry ether] C6H5C6H5 + 2NaCl}`, r`\ce{C6H5Br + Mg ->[dry ether] C6H5MgBr}`],
      v: table(['Reaction', 'Reactants', 'Product'], [['Wurtz–Fittig', 'ArX + RX + 2Na', 'Ar–R'], ['Fittig', '2ArX + 2Na', 'Ar–Ar'], ['Grignard', 'ArBr + Mg', 'ArMgBr']], 'Table of reactions of haloarenes with sodium and magnesium'),
      n: 'Sodium in dry ether couples halides. With an aryl halide and an alkyl halide we get an alkylbenzene in the Wurtz–Fittig reaction; bromobenzene and bromoethane give ethylbenzene. With two aryl halides we get biphenyl in the Fittig reaction. Magnesium converts bromobenzene into phenylmagnesium bromide, a useful Grignard reagent.',
    }),
    sl('check', 'Quick check: reactions with metals', {
      b: 'Predict the product of a Wurtz–Fittig, Fittig or Grignard reaction.',
      n: 'Quick check. Wurtz–Fittig joins aryl to alkyl; Fittig joins aryl to aryl.',
      chk: 'fittig-mcq',
    }),
    sl('concept', 'DDT', {
      b: '**DDT** (p,p′-dichlorodiphenyltrichloroethane): 1,1,1-trichloro-2,2-bis(4-chlorophenyl)ethane, (ClC₆H₄)₂CH–CCl₃. Made from chlorobenzene and chloral with conc. H₂SO₄. A powerful insecticide that helped control malaria and typhus, but it is **not biodegradable**, is **fat-soluble** and **accumulates** along food chains (biomagnification), harming birds (thin eggshells) and fish; many insects became resistant. Its use is banned or restricted.',
      m: [r`\ce{2C6H5Cl + CCl3CHO ->[conc. H2SO4] (ClC6H4)2CHCCl3 + H2O}`],
      v: table(['Property', 'Consequence'], [['Very stable, not biodegradable', 'Persists for years in soil and water'], ['Fat-soluble', 'Stored in fatty tissue'], ['Biomagnification', 'Top predators receive the largest doses'], ['Insect resistance', 'Less effective over time']], 'Table of properties of DDT and their consequences'),
      n: 'DDT is made by condensing two molecules of chlorobenzene with chloral in concentrated sulphuric acid. It saved millions of lives by killing malaria mosquitoes. But DDT is very stable and dissolves in fat, so it is stored in animals and concentrated at each step of a food chain. Birds of prey laid eggs with thin shells, and many insects became resistant. Its use is now banned or tightly restricted.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Halogen: −I deactivates; +R directs o/p (para major).',
        'Nitration via NO₂⁺; σ-complex stabilised by Cl lone pair for o/p attack.',
        'Nucleophilic substitution difficult (resonance, sp², unstable Ph⁺, repulsion); Dow 623 K, 300 atm.',
        'o/p-NO₂ groups help via addition–elimination (charge on NO₂).',
        'Cl → NH₂ (NH₃, Cu₂O); Cl → H (H₂/Pd); Wurtz–Fittig, Fittig; PhMgBr.',
        'DDT: from chlorobenzene + chloral; persistent, biomagnifies.',
      ],
      v: table(['Reaction', 'Key condition'], [['Nitration', 'conc. HNO₃ + H₂SO₄'], ['Dow process', '623 K, 300 atm'], ['Amination', 'NH₃, Cu₂O, 475 K'], ['Fittig', 'Na, dry ether']], 'Summary table of Part 2 reactions'),
      n: 'Let us sum up Part 2. A halogen slows electrophilic substitution but directs it to ortho and para positions. Replacing the halogen itself is hard, needing harsh conditions, unless nitro groups at ortho or para positions stabilise the intermediate. Haloarenes can be reduced, coupled with sodium, or turned into Grignard reagents. DDT shows how a useful chlorine compound can become an environmental problem.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For “deactivating but o/p directing”, mention both −I and +R.',
        'In the nitration mechanism, show NO₂⁺ formation and the σ-complex.',
        'For nitro-assisted substitution, say ortho/para, not meta.',
        'Write the DDT structure with both 4-chlorophenyl groups.',
      ],
      v: table(['Slip', 'Fix'], [['Halogen is meta directing', 'o/p directing'], ['m-NO₂ helps hydrolysis most', 'o/p-NO₂ help'], ['Fittig gives alkylbenzene', 'Fittig gives biaryl']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Explain the halogen’s effect with both the inductive and the resonance effect. Show the nitronium ion and the intermediate in the nitration mechanism. Remember that nitro groups help nucleophilic substitution only at ortho and para positions. And draw DDT carefully, with two four-chlorophenyl groups on one carbon and three chlorines on the other.',
    }),
  ],
});
