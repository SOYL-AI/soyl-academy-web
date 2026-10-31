// ISC 12 Chemistry ch13 Haloarenes — question bank (ISC style). Stems name their own compounds and data.
// MCQ keys are placed by the builder; AR keys planned: a b a d c. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 C–X bond and preparation
add('bond-mcq', mcq({
  stem: 'The C–Cl bond length in chlorobenzene (169 pm) is less than in chloromethane (177 pm) because, in chlorobenzene:',
  right: 'resonance gives the C–Cl bond partial double-bond character and the carbon is sp² hybridised',
  wrong: ['chlorine is more electronegative than in chloromethane', 'the carbon is sp³ hybridised', 'there are more hydrogen atoms on the carbon'],
  sol: 'Both resonance and the greater s character of sp² carbon shorten the bond — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('prep-mcq', mcq({
  stem: 'Benzenediazonium chloride is warmed with copper powder and hydrochloric acid to give chlorobenzene. This is the:',
  right: 'Gattermann reaction',
  wrong: ['Sandmeyer reaction', 'Wurtz–Fittig reaction', 'Swarts reaction'],
  sol: 'Copper powder with HX is Gattermann; CuX with HX is Sandmeyer — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ki-mcq', mcq({
  stem: 'A cold solution of benzenediazonium chloride is warmed with aqueous potassium iodide. The organic product is:',
  right: 'iodobenzene',
  wrong: ['4-iodoaniline', 'phenol', 'benzene'],
  sol: 'C₆H₅N₂Cl + KI → C₆H₅I + KCl + N₂ — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('dark-mcq', mcq({
  stem: 'Benzene is chlorinated to chlorobenzene with Cl₂ and anhydrous FeCl₃ in the dark. Sunlight is avoided because it would:',
  right: 'cause free-radical addition of chlorine, giving hexachlorocyclohexane',
  wrong: ['decompose the FeCl₃ catalyst to iron', 'convert chlorobenzene into phenol', 'stop chlorine from dissolving'],
  sol: 'In UV light Cl₂ adds across the ring (C₆H₆Cl₆, BHC) — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('iod-mcq', mcq({
  stem: 'Direct iodination of benzene is carried out with iodine in the presence of nitric acid because:',
  right: 'the HI formed would reduce iodobenzene back to benzene; HNO₃ oxidises the HI',
  wrong: ['nitric acid is the source of iodine', 'iodine reacts only with nitrobenzene', 'nitric acid acts as a Lewis acid catalyst'],
  sol: 'Iodination is reversible; removing HI drives it forward — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('dipole-mcq', mcq({
  stem: 'Chlorobenzene (1.69 D) has a smaller dipole moment than chloroethane (2.05 D). The best explanation is that in chlorobenzene:',
  right: 'the +R effect of chlorine acts opposite to its −I effect',
  wrong: ['chlorine has a lower electronegativity', 'the molecule is perfectly symmetrical', 'the C–Cl bond is longer'],
  sol: 'Electron release into the ring partly cancels electron withdrawal — option (@K).',
  d: 2, c: 'analysis', t: [1],
}));
add('aryl-mcq', mcq({
  stem: 'Which of C₆H₅CH₂Cl, C₆H₅Cl, CH₂=CHCl and C₆H₅CH₂CH₂Br is an aryl halide?',
  right: 'C₆H₅Cl',
  wrong: ['C₆H₅CH₂Cl', 'CH₂=CHCl', 'C₆H₅CH₂CH₂Br'],
  sol: 'Only in C₆H₅Cl is X bonded to an sp² carbon of the ring — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('sp2-ar', ar({
  a: 'The C–Cl bond in chlorobenzene is stronger than that in chloroethane.',
  r: 'The carbon bonded to chlorine in chlorobenzene is sp² hybridised, with greater s character.',
  key: 'a',
  sol: 'Both are true; greater s character (with resonance) strengthens the bond — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('benzyl-tf', tf({
  stem: 'Benzyl chloride, C₆H₅CH₂Cl, is an aryl halide.',
  key: 'f',
  sol: 'False. Cl is on an sp³ carbon attached to the ring: a benzylic halide.',
  d: 1, c: 'understanding', t: [1],
}));
add('temp-fill', fill({
  stem: 'Aniline is converted to benzenediazonium chloride with NaNO₂ and HCl at a temperature of ___–278 K.',
  acc: [['273']],
  sol: '**273**–278 K (0–5 °C).',
  d: 1, c: 'recall', t: [1],
}));
add('yield-num', num({
  marks: 2,
  stem: r`$15.6\ \text{g}$ of benzene ($M = 78$) is chlorinated with Cl₂/FeCl₃. If the yield of chlorobenzene ($M = 112.5$) is 75%, what mass is obtained?`,
  value: 16.9, tol: 0.05, unit: 'g',
  sol: r`$n = 15.6 \div 78 = 0.200\ \text{mol}$; mass $= 0.200 \times 112.5 \times 0.75 \approx 16.9\ \text{g}$.`,
  scheme: [['0.200 mol', 1], ['≈ 16.9 g', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(0.2 * 112.5 * 0.75, 16.9, 0.003) || 'mass');
add('n2-num', num({
  marks: 2,
  stem: r`$0.050\ \text{mol}$ of benzenediazonium chloride is converted into chlorobenzene by the Sandmeyer reaction. Calculate the volume of nitrogen released at STP, in litres. (Molar volume $22.4\ \text{L}$)`,
  value: 1.12, tol: 0.01, unit: 'L',
  sol: r`$\ce{C6H5N2Cl -> C6H5Cl + N2}$: $V = 0.050 \times 22.4 = 1.12\ \text{L}$.`,
  scheme: [['1 : 1 ratio', 1], ['1.12 L', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(0.05 * 22.4, 1.12) || 'v');
add('bond-short', short({
  marks: 2,
  stem: 'Give two reasons why the C–Cl bond in chlorobenzene is shorter than the C–Cl bond in 1-chloropropane.',
  model: '(i) Resonance: a lone pair on Cl is delocalised into the ring, giving the C–Cl bond partial double-bond character. (ii) In chlorobenzene the carbon is sp² (33% s character), more electronegative than the sp³ carbon (25% s) of 1-chloropropane, so it holds the bonding pair closer.',
  sol: 'Resonance; sp² carbon.',
  scheme: [['Resonance', 1], ['sp² hybridisation', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('sandm-short', short({
  marks: 2,
  stem: 'Write equations for converting aniline into chlorobenzene by way of the diazonium salt, giving the conditions for each step.',
  model: r`$\ce{C6H5NH2 + NaNO2 + 2HCl ->[273-278 K] C6H5N2Cl + NaCl + 2H2O}$ (diazotisation). $\ce{C6H5N2Cl ->[CuCl/HCl] C6H5Cl + N2}$ (Sandmeyer).`,
  sol: 'Diazotisation; Sandmeyer.',
  scheme: [['Diazotisation with conditions', 1], ['Sandmeyer step', 1]],
  d: 2, c: 'application', t: [1],
}));
add('gatt-short', short({
  marks: 2,
  stem: 'Distinguish between the Sandmeyer and Gattermann reactions, using the preparation of bromobenzene from benzenediazonium chloride as the example.',
  model: r`Sandmeyer: $\ce{C6H5N2Cl + HBr ->[CuBr] C6H5Br + N2 + HCl}$ (copper(I) bromide in HBr). Gattermann: $\ce{C6H5N2Cl + HBr ->[Cu] C6H5Br + N2 + HCl}$ (copper powder with HBr). The Sandmeyer method usually gives better yields.`,
  sol: 'CuBr/HBr vs Cu/HBr.',
  scheme: [['Sandmeyer reagent and equation', 1], ['Gattermann reagent and equation', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('prep-short3', short({
  marks: 3,
  stem: 'Give reagents and conditions to prepare (a) bromobenzene from benzene, (b) iodobenzene from aniline and (c) pure 2-chlorotoluene from 2-methylaniline.',
  model: '(a) Br₂ with anhydrous FeBr₃ (Lewis acid), dark. (b) Diazotise (NaNO₂/HCl, 273–278 K), then warm with KI. (c) Diazotise 2-methylaniline, then CuCl/HCl (Sandmeyer); this gives only the 2-isomer, unlike direct chlorination of toluene.',
  sol: 'Br₂/FeBr₃; diazotise + KI; diazotise + CuCl.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1],
}));
add('dipole-short3', short({
  marks: 3,
  stem: 'Using the data CH₃Cl: C–Cl 177 pm, 1.86 D and C₆H₅Cl: C–Cl 169 pm, 1.69 D, explain (a) the shorter bond in chlorobenzene, (b) its smaller dipole moment and (c) why benzyl chloride behaves more like chloromethane than like chlorobenzene.',
  model: '(a) Resonance gives the C–Cl bond partial double-bond character, and the sp² carbon is more electronegative. (b) In chlorobenzene the +R effect (Cl lone pair into the ring) opposes the −I effect, reducing the net dipole. (c) In benzyl chloride Cl is on an sp³ CH₂ carbon, not conjugated with the ring, so there is no partial double-bond character; it reacts readily like a haloalkane.',
  sol: 'Resonance + sp²; +R opposes −I; benzylic sp³.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 physical properties
add('mp-mcq', mcq({
  stem: 'Of the three dibromobenzenes, which has the highest melting point, and why?',
  right: 'The 1,4-isomer, because its symmetrical molecules pack most closely in the crystal',
  wrong: ['The 1,2-isomer, because it is the most polar', 'The 1,3-isomer, because it has the largest mass', 'All are equal, because they have the same molar mass'],
  sol: 'Symmetry → better packing → stronger lattice — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('bp-mcq', mcq({
  stem: 'Which of fluorobenzene, chlorobenzene, bromobenzene and iodobenzene has the highest boiling point?',
  right: 'Iodobenzene',
  wrong: ['Fluorobenzene', 'Chlorobenzene', 'Bromobenzene'],
  sol: 'Largest mass and polarisability — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('sol-mcq', mcq({
  stem: 'Chlorobenzene does not dissolve in water but mixes with benzene. The main reason is that chlorobenzene:',
  right: 'cannot form hydrogen bonds with water, but has similar intermolecular forces to benzene',
  wrong: ['reacts with water', 'is an ionic compound', 'is a gas at room temperature'],
  sol: 'Like dissolves like — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('bp-tf', tf({
  stem: 'The three isomeric dichlorobenzenes have very different boiling points.',
  key: 'f',
  sol: 'False. Their boiling points are similar (about 446–453 K); it is their melting points that differ widely.',
  d: 2, c: 'understanding', t: [2],
}));
add('mp-short', short({
  marks: 2,
  stem: '1,4-Dichlorobenzene is a solid used in moth balls, while 1,2-dichlorobenzene is a liquid at room temperature. Explain.',
  model: 'Both have the same molar mass and similar intermolecular forces, so their boiling points are similar. 1,4-Dichlorobenzene is symmetrical and packs much more closely in the crystal lattice, so more energy is needed to melt it: m.p. 323 K, above room temperature. The less symmetrical 1,2-isomer melts at 256 K.',
  sol: 'Symmetry and packing.',
  scheme: [['Same mass, similar forces', 1], ['Packing of para isomer', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('iso-short3', short({
  marks: 3,
  stem: 'Explain (a) the boiling point order C₆H₅F < C₆H₅Cl < C₆H₅Br < C₆H₅I, (b) why chlorobenzene is insoluble in water, and (c) why bromobenzene forms the lower layer when shaken with water.',
  model: '(a) Molar mass and polarisability increase from F to I, so van der Waals forces and boiling points increase. (b) Chlorobenzene cannot form hydrogen bonds with water; the energy needed to break water’s hydrogen bonds is not repaid. (c) Bromobenzene (density about 1.5 g cm⁻³) is denser than water and immiscible with it.',
  sol: 'Mass/polarisability; no H-bonding; density.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 electrophilic substitution
add('ortho-mcq', mcq({
  stem: 'Compared with benzene, the chlorine atom in chlorobenzene makes electrophilic substitution:',
  right: 'slower, and directed to the ortho and para positions',
  wrong: ['faster, and directed to the meta position', 'slower, and directed to the meta position', 'faster, and directed to the ortho and para positions'],
  sol: '−I deactivates; +R directs o/p — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('electrophile-mcq', mcq({
  stem: 'In the nitration of chlorobenzene with concentrated nitric and sulphuric acids, the electrophile that attacks the ring is:',
  right: 'the nitronium ion, NO₂⁺',
  wrong: ['the nitrate ion, NO₃⁻', 'the nitrite ion, NO₂⁻', 'nitric oxide, NO'],
  sol: 'HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻ — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('sigma-mcq', mcq({
  stem: 'Ortho and para attack are favoured in the nitration of chlorobenzene because the σ-complex formed by o/p attack:',
  right: 'has a resonance form in which the lone pair on chlorine stabilises the positive charge',
  wrong: ['carries a negative charge on chlorine', 'is formed without breaking the aromatic π system', 'has the positive charge on a carbon far from chlorine in all its forms'],
  sol: 'Only o/p attack places the + charge on the C bearing Cl, allowing a chloronium form — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('fc-mcq', mcq({
  stem: 'Chlorobenzene is treated with chloromethane and anhydrous AlCl₃. The major product is:',
  right: '4-chlorotoluene (1-chloro-4-methylbenzene)',
  wrong: ['3-chlorotoluene', 'toluene', 'diphenylmethane'],
  sol: 'Friedel–Crafts alkylation at o/p; para predominates — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sulph-mcq', mcq({
  stem: 'Chlorobenzene is heated with concentrated sulphuric acid. The major product is:',
  right: '4-chlorobenzenesulphonic acid',
  wrong: ['3-chlorobenzenesulphonic acid', 'benzenesulphonic acid', 'chlorobenzene sulphate ester'],
  sol: 'Para product predominates — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('deact-ar', ar({
  a: 'Chlorobenzene undergoes nitration more slowly than benzene.',
  r: 'The +R effect of chlorine increases electron density at the ortho and para positions.',
  key: 'b',
  sol: 'Both are true, but the slower rate is due to the stronger −I effect; the +R effect explains orientation, not the rate — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('para-tf', tf({
  stem: 'In electrophilic substitution of chlorobenzene, the para product generally predominates over the ortho product.',
  key: 't',
  sol: 'True. The halogen sterically hinders the adjacent ortho positions.',
  d: 1, c: 'understanding', t: [3],
}));
add('nitronium-fill', fill({
  stem: 'In the nitration of chlorobenzene, concentrated H₂SO₄ protonates nitric acid to generate the ___ ion, NO₂⁺.',
  acc: [['nitronium']],
  sol: '**Nitronium** ion.',
  d: 1, c: 'recall', t: [3],
}));
add('eas-match', match({
  stem: 'Match each reagent used on chlorobenzene with the major product.',
  pairs: [
    ['Cl₂, anhydrous FeCl₃', '1,4-Dichlorobenzene'],
    ['conc. HNO₃ + conc. H₂SO₄', '1-Chloro-4-nitrobenzene'],
    ['CH₃COCl, anhydrous AlCl₃', '4-Chloroacetophenone'],
    ['conc. H₂SO₄, heat', '4-Chlorobenzenesulphonic acid'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Each reagent gives the para product as the major isomer.',
  d: 2, c: 'application', t: [3],
}));
add('directing-short', short({
  marks: 2,
  stem: 'Explain why chlorine on a benzene ring is deactivating yet ortho/para directing in electrophilic substitution.',
  model: 'Chlorine is more electronegative than carbon and withdraws electrons through the σ bond (−I), lowering the electron density of the whole ring, so the ring reacts more slowly than benzene. Its lone pairs are delocalised into the ring (+R), increasing electron density at the ortho and para positions (and stabilising the σ-complex for o/p attack), so substitution occurs there. −I outweighs +R for reactivity; +R controls orientation.',
  sol: '−I deactivates; +R directs o/p.',
  scheme: [['−I deactivation', 1], ['+R o/p direction', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('nitration-short3', short({
  marks: 3,
  stem: 'Give the three steps of the mechanism for the nitration of chlorobenzene with a mixture of concentrated nitric and sulphuric acids, and name the major product.',
  model: r`(1) Formation of electrophile: $\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$. (2) Slow attack of NO₂⁺ at the para (or ortho) carbon, giving a resonance-stabilised σ-complex (arenium ion); one form puts the + charge on the C–Cl carbon, stabilised by the Cl lone pair. (3) Fast loss of H⁺ (to HSO₄⁻), restoring aromaticity. Major product: 1-chloro-4-nitrobenzene (with some 1-chloro-2-nitrobenzene).`,
  sol: 'NO₂⁺; σ-complex; loss of H⁺; para product.',
  scheme: [['Electrophile', 1], ['σ-complex', 1], ['Loss of H⁺ and product', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('eas-short3', short({
  marks: 3,
  stem: 'Write equations for (a) the chlorination, (b) the sulphonation and (c) the Friedel–Crafts methylation of chlorobenzene, naming the major product in each.',
  model: r`(a) $\ce{C6H5Cl + Cl2 ->[FeCl3] ClC6H4Cl + HCl}$: 1,4-dichlorobenzene (major). (b) $\ce{C6H5Cl + H2SO4 -> ClC6H4SO3H + H2O}$: 4-chlorobenzenesulphonic acid. (c) $\ce{C6H5Cl + CH3Cl ->[AlCl3] ClC6H4CH3 + HCl}$: 4-chlorotoluene.`,
  sol: 'Three equations; para products.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 nucleophilic substitution and reduction
add('nitro-mcq', mcq({
  stem: 'Which of chlorobenzene, 1-chloro-3-nitrobenzene, 1-chloro-4-methylbenzene and 1-chloro-2,4-dinitrobenzene needs the mildest conditions for replacing Cl by OH?',
  right: '1-Chloro-2,4-dinitrobenzene',
  wrong: ['Chlorobenzene', '1-Chloro-3-nitrobenzene', '1-Chloro-4-methylbenzene'],
  sol: 'Two nitro groups at o and p delocalise the negative charge of the intermediate — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('dow-mcq', mcq({
  stem: 'In the Dow process, chlorobenzene is converted into sodium phenoxide by aqueous NaOH at:',
  right: 'about 623 K and 300 atm',
  wrong: ['room temperature and 1 atm', 'about 373 K and 1 atm', 'about 273 K and 300 atm'],
  sol: 'Harsh conditions reflect the strength of the C–Cl bond — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('phenyl-mcq', mcq({
  stem: 'Chlorobenzene does not undergo nucleophilic substitution by the SN1 mechanism mainly because:',
  right: 'the phenyl cation that would form is very unstable',
  wrong: ['chlorine is a very good leaving group', 'the ring carbon is sp³ hybridised', 'hydroxide is a weak nucleophile'],
  sol: 'The sp² phenyl cation cannot be stabilised by resonance — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('meta-mcq', mcq({
  stem: 'A nitro group meta to chlorine has little effect on the rate of hydrolysis of chlorobenzene because:',
  right: 'from the meta position the nitro group cannot accept the negative charge of the intermediate by resonance',
  wrong: ['a meta nitro group is electron-donating', 'meta positions are sterically blocked', 'nitro groups react with hydroxide first'],
  sol: 'Only o/p-NO₂ can delocalise the charge onto oxygen — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('amine-mcq', mcq({
  stem: 'Chlorobenzene is converted into aniline by heating with:',
  right: 'aqueous ammonia and copper(I) oxide at about 475 K and 60 atm',
  wrong: ['NaNO₂ and HCl at 273 K', 'Sn and HCl at room temperature', 'NaOH at 623 K'],
  sol: '2C₆H₅Cl + 2NH₃ + Cu₂O → 2C₆H₅NH₂ + 2CuCl + H₂O — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('reduce-mcq', mcq({
  stem: 'Chlorobenzene is treated with hydrogen in the presence of palladium. The organic product is:',
  right: 'benzene',
  wrong: ['cyclohexane', 'phenol', 'biphenyl'],
  sol: 'Hydrogenolysis: C₆H₅Cl + H₂ → C₆H₆ + HCl — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('nuc-ar', ar({
  a: '2,4,6-Trinitrochlorobenzene is hydrolysed to picric acid simply by warm water.',
  r: 'Three nitro groups at the ortho and para positions delocalise the negative charge of the intermediate formed by addition of the nucleophile.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('sn2-ar', ar({
  a: 'Chlorobenzene readily undergoes SN2 substitution with hydroxide ions.',
  r: 'The benzene ring blocks backside attack on the carbon bonded to chlorine.',
  key: 'd',
  sol: 'A is false; R is true and is one reason why SN2 does not occur — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('meta-tf', tf({
  stem: 'A nitro group meta to chlorine activates chlorobenzene towards nucleophilic substitution as strongly as a para nitro group.',
  key: 'f',
  sol: 'False. Only ortho/para nitro groups can delocalise the negative charge onto oxygen.',
  d: 2, c: 'understanding', t: [4],
}));
add('phenol-num', num({
  marks: 2,
  stem: r`$11.25\ \text{g}$ of chlorobenzene ($M = 112.5$) is converted into phenol ($M = 94$) by the Dow process with a 90% overall yield. What mass of phenol is obtained?`,
  value: 8.46, tol: 0.03, unit: 'g',
  sol: r`$n = 11.25 \div 112.5 = 0.100\ \text{mol}$; mass $= 0.100 \times 94 \times 0.90 = 8.46\ \text{g}$.`,
  scheme: [['0.100 mol', 1], ['8.46 g', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(0.1 * 94 * 0.9, 8.46) || 'mass');
add('dow-short', short({
  marks: 2,
  stem: 'Write equations for the conversion of chlorobenzene into phenol by the Dow process, giving the conditions.',
  model: r`$\ce{C6H5Cl + 2NaOH ->[623 K, 300 atm] C6H5ONa + NaCl + H2O}$; then acidification: $\ce{C6H5ONa + HCl -> C6H5OH + NaCl}$.`,
  sol: 'Two equations with conditions.',
  scheme: [['Hydrolysis with conditions', 1], ['Acidification', 1]],
  d: 2, c: 'application', t: [4],
}));
add('meisen-short', short({
  marks: 2,
  stem: 'Explain why 1-chloro-4-nitrobenzene is hydrolysed by aqueous NaOH at about 443 K, whereas chlorobenzene needs about 623 K and high pressure.',
  model: 'OH⁻ adds to the carbon bearing Cl, forming a negatively charged σ-complex. In 1-chloro-4-nitrobenzene the para nitro group delocalises this negative charge onto its oxygen atoms by resonance, stabilising the intermediate and lowering the activation energy; Cl⁻ is then eliminated. Chlorobenzene has no such group, so the intermediate is not stabilised.',
  sol: 'p-NO₂ stabilises the anionic intermediate.',
  scheme: [['Addition–elimination via anion', 1], ['p-NO₂ delocalises the charge', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('aniline-short3', short({
  marks: 3,
  stem: 'Write equations, with conditions, to convert chlorobenzene into (a) aniline, (b) benzene and (c) phenol.',
  model: r`(a) $\ce{2C6H5Cl + 2NH3 + Cu2O ->[475 K, 60 atm] 2C6H5NH2 + 2CuCl + H2O}$. (b) $\ce{C6H5Cl + H2 ->[Pd] C6H6 + HCl}$. (c) $\ce{C6H5Cl + 2NaOH ->[623 K, 300 atm] C6H5ONa + NaCl + H2O}$, then acidify with HCl.`,
  sol: 'Amination; reduction; Dow process.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('mechnuc-short3', short({
  marks: 3,
  stem: 'Describe the mechanism by which hydroxide ions replace chlorine in 1-chloro-2,4-dinitrobenzene, and explain the role of the nitro groups.',
  model: 'Step 1 (addition, slow): OH⁻ attacks the ring carbon bonded to Cl, forming a negatively charged, non-aromatic σ-complex (Meisenheimer complex). Step 2 (elimination, fast): Cl⁻ leaves and aromaticity is restored, giving 2,4-dinitrophenoxide (then 2,4-dinitrophenol on acidification). The nitro groups at the ortho and para positions withdraw electrons and delocalise the negative charge of the σ-complex onto their oxygen atoms, stabilising it and making the reaction occur under mild conditions.',
  sol: 'Addition–elimination; o/p-NO₂ stabilise the anion.',
  scheme: [['Addition step', 1], ['Elimination step', 1], ['Role of o/p NO₂', 1]],
  d: 4, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 Wurtz–Fittig, Fittig, Grignard, DDT
add('fittig-mcq', mcq({
  stem: 'Iodobenzene and iodomethane are heated together with sodium in dry ether. The main aromatic product is:',
  right: 'toluene (methylbenzene)',
  wrong: ['biphenyl', 'ethylbenzene', 'benzene'],
  sol: 'Wurtz–Fittig: ArX + RX + 2Na → Ar–R — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('biphenyl-mcq', mcq({
  stem: 'Heating chlorobenzene with sodium in dry ether to give biphenyl is called the:',
  right: 'Fittig reaction',
  wrong: ['Wurtz–Fittig reaction', 'Sandmeyer reaction', 'Friedel–Crafts reaction'],
  sol: 'Fittig: 2ArX + 2Na → Ar–Ar — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('phmgbr-mcq', mcq({
  stem: 'Phenylmagnesium bromide is added to water. The organic product is:',
  right: 'benzene',
  wrong: ['phenol', 'bromobenzene', 'biphenyl'],
  sol: 'C₆H₅MgBr + H₂O → C₆H₆ + Mg(OH)Br — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('ddt-mcq', mcq({
  stem: 'DDT is manufactured by heating chlorobenzene with concentrated sulphuric acid and:',
  right: 'chloral (trichloroethanal), CCl₃CHO',
  wrong: ['chloroform, CHCl₃', 'ethanal, CH₃CHO', 'phosgene, COCl₂'],
  sol: '2C₆H₅Cl + CCl₃CHO → (ClC₆H₄)₂CHCCl₃ + H₂O — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('ddt2-mcq', mcq({
  stem: 'Concentrations of DDT in fish-eating birds can be millions of times higher than in lake water. The main reason is that DDT:',
  right: 'is fat-soluble and not biodegradable, so it accumulates along the food chain',
  wrong: ['is highly soluble in water', 'breaks down quickly into harmless products', 'is excreted rapidly by animals'],
  sol: 'Biomagnification of a persistent, lipid-soluble compound — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('ddt-ar', ar({
  a: 'The use of DDT is banned or restricted in many countries.',
  r: 'DDT is highly soluble in water and is quickly washed out of soil.',
  key: 'c',
  sol: 'A is true. R is false: DDT is almost insoluble in water and persists in soil — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('wf-tf', tf({
  stem: 'In the Wurtz–Fittig reaction an aryl halide and an alkyl halide react with sodium in dry ether to give an alkylbenzene.',
  key: 't',
  sol: 'True. E.g. C₆H₅Br + C₂H₅Br + 2Na → C₆H₅C₂H₅ + 2NaBr.',
  d: 1, c: 'recall', t: [5],
}));
add('ddt-fill', fill({
  stem: 'DDT stands for p,p′-dichlorodiphenyl___ethane.',
  acc: [['trichloro']],
  sol: 'Dichlorodiphenyl**trichloro**ethane.',
  d: 1, c: 'recall', t: [5],
}));
add('ddt-num', num({
  marks: 2,
  stem: r`What mass of DDT ($M = 354.5$) can be made from $22.5\ \text{g}$ of chlorobenzene ($M = 112.5$) with excess chloral, assuming complete conversion? ($\ce{2C6H5Cl + CCl3CHO -> (ClC6H4)2CHCCl3 + H2O}$)`,
  value: 35.45, tol: 0.1, unit: 'g',
  sol: r`$n(\ce{C6H5Cl}) = 22.5 \div 112.5 = 0.200\ \text{mol}$; $n(\text{DDT}) = 0.100\ \text{mol}$; mass $= 0.100 \times 354.5 = 35.45\ \text{g}$.`,
  scheme: [['2 : 1 ratio', 1], ['35.45 g', 1]],
  d: 3, c: 'application', t: [5],
}), () => near((22.5 / 112.5 / 2) * 354.5, 35.45) || 'mass');
add('wf-num', num({
  marks: 2,
  stem: r`$0.10\ \text{mol}$ of bromobenzene reacts with excess bromomethane and sodium in dry ether. If the yield of toluene ($M = 92$) is 60%, what mass is obtained?`,
  value: 5.52, tol: 0.02, unit: 'g',
  sol: r`Mass $= 0.10 \times 92 \times 0.60 = 5.52\ \text{g}$.`,
  scheme: [['1 : 1 ratio', 1], ['5.52 g', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(0.1 * 92 * 0.6, 5.52) || 'mass');
add('wf-short', short({
  marks: 2,
  stem: 'Write equations for (a) the Wurtz–Fittig preparation of ethylbenzene and (b) the Fittig preparation of biphenyl.',
  model: r`(a) $\ce{C6H5Br + C2H5Br + 2Na ->[dry ether] C6H5C2H5 + 2NaBr}$. (b) $\ce{2C6H5Br + 2Na ->[dry ether] C6H5C6H5 + 2NaBr}$.`,
  sol: 'Two equations.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [5],
}));
add('ddt-short', short({
  marks: 2,
  stem: 'Write the structural formula and IUPAC name of DDT, and give one reason why its use is restricted.',
  model: '(ClC₆H₄)₂CH–CCl₃, with both Cl atoms para on the rings: 1,1,1-trichloro-2,2-bis(4-chlorophenyl)ethane. Reason (any one): not biodegradable, so it persists; fat-soluble, so it accumulates in food chains (biomagnification), harming birds and fish; many insects have become resistant.',
  sol: 'Structure, name, one reason.',
  scheme: [['Structure and name', 1], ['Reason', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('ddt-short3', short({
  marks: 3,
  stem: '(a) Write the equation for the manufacture of DDT. (b) State two properties of DDT that make it an environmental problem. (c) What is meant by biomagnification?',
  model: r`(a) $\ce{2C6H5Cl + CCl3CHO ->[conc. H2SO4] (ClC6H4)2CHCCl3 + H2O}$. (b) It is chemically very stable (not biodegradable) and fat-soluble (stored in fatty tissue rather than excreted). (c) The increase in concentration of a persistent substance at each higher level of a food chain, so that top predators receive the largest doses.`,
  sol: 'Equation; stable and fat-soluble; biomagnification.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- long answers
add('bondprep-long', long({
  stem: '(a) Using resonance and hybridisation, explain why the C–Cl bond in chlorobenzene is shorter, stronger and less polar than in chloroethane. [2]\n\n(b) Write equations to prepare chlorobenzene (i) from benzene and (ii) from aniline by the Gattermann reaction. [2]\n\n(c) Why does 1,4-dichlorobenzene melt at a higher temperature than 1,2-dichlorobenzene? [1]',
  model: r`(a) A lone pair on Cl is delocalised into the ring, giving the C–Cl bond partial double-bond character; and the ring carbon is sp² (more s character, more electronegative). Both make the bond shorter and stronger. The +R effect opposes the −I effect, so the bond is less polar (1.69 D vs 2.05 D).

(b) (i) $\ce{C6H6 + Cl2 ->[FeCl3][dark] C6H5Cl + HCl}$. (ii) $\ce{C6H5NH2 + NaNO2 + 2HCl ->[273-278 K] C6H5N2Cl + NaCl + 2H2O}$; $\ce{C6H5N2Cl ->[Cu/HCl] C6H5Cl + N2}$.

(c) The symmetrical para isomer packs more closely in the crystal lattice, so more energy is needed to melt it.`,
  sol: 'Resonance + sp²; two preparations; packing.',
  scheme: [['(a) Bond length/strength', 1], ['(a) Polarity', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)', 1]],
  d: 3, c: 'understanding', t: [1, 2],
}));
add('eas-long', long({
  stem: '(a) Explain why chlorine is deactivating but ortho/para directing in electrophilic substitution. [1½]\n\n(b) Give the mechanism of nitration of chlorobenzene. [2]\n\n(c) Name the major products of (i) chlorination and (ii) Friedel–Crafts acylation with ethanoyl chloride of chlorobenzene. [1½]',
  model: r`(a) −I effect withdraws electron density from the whole ring (slower than benzene); +R effect (Cl lone pair) increases electron density at o and p and stabilises the σ-complex for o/p attack.

(b) $\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$; NO₂⁺ attacks the para (or ortho) carbon to form a resonance-stabilised σ-complex (slow); HSO₄⁻ removes H⁺ (fast), giving 1-chloro-4-nitrobenzene (major) and 1-chloro-2-nitrobenzene.

(c) (i) 1,4-Dichlorobenzene (major) and 1,2-dichlorobenzene. (ii) 4-Chloroacetophenone (1-(4-chlorophenyl)ethan-1-one), major, with the 2-isomer.`,
  sol: '−I vs +R; three-step mechanism; para products.',
  scheme: [['(a)', 1.5], ['(b) Electrophile', 0.5], ['(b) σ-complex and loss of H⁺', 1.5], ['(c) Two products', 1.5]],
  d: 3, c: 'understanding', t: [3],
}));
add('nuc-long', long({
  stem: '(a) The conditions for replacing Cl by OH are: chlorobenzene 623 K and 300 atm; 1-chloro-4-nitrobenzene 443 K; 1-chloro-2,4-dinitrobenzene 368 K; 2,4,6-trinitrochlorobenzene warm water. Explain this trend. [2]\n\n(b) Describe the addition–elimination mechanism for the reaction of 1-chloro-4-nitrobenzene with hydroxide ions. [2]\n\n(c) Write the equation for converting chlorobenzene into aniline. [1]',
  model: r`(a) The reaction goes through an anionic σ-complex formed by addition of OH⁻. Nitro groups at ortho and para positions withdraw electrons and delocalise the negative charge onto their oxygen atoms, stabilising the intermediate and lowering the activation energy. Each additional o/p nitro group makes the reaction easier, so milder conditions suffice.

(b) OH⁻ adds to the C–Cl carbon, forming a non-aromatic carbanion (Meisenheimer complex) whose negative charge is delocalised onto the para nitro group (slow); Cl⁻ is then expelled and aromaticity restored, giving 4-nitrophenoxide, which is acidified to 4-nitrophenol.

(c) $\ce{2C6H5Cl + 2NH3 + Cu2O ->[475 K, 60 atm] 2C6H5NH2 + 2CuCl + H2O}$.`,
  sol: 'o/p-NO₂ stabilise the anion; addition–elimination; amination.',
  scheme: [['(a) Trend explained', 2], ['(b) Mechanism', 2], ['(c) Equation', 1]],
  d: 4, c: 'analysis', t: [4],
}));
add('metal-long', long({
  stem: '(a) Write equations for (i) the Wurtz–Fittig reaction of bromobenzene with 1-bromopropane and (ii) the Fittig reaction of iodobenzene. Name the products. [2]\n\n(b) How is phenylmagnesium bromide prepared, and what does it give with water? [1]\n\n(c) Write the equation for the preparation of DDT and explain two of its environmental effects. [2]',
  model: r`(a) (i) $\ce{C6H5Br + CH3CH2CH2Br + 2Na ->[dry ether] C6H5CH2CH2CH3 + 2NaBr}$: propylbenzene. (ii) $\ce{2C6H5I + 2Na ->[dry ether] C6H5C6H5 + 2NaI}$: biphenyl.

(b) $\ce{C6H5Br + Mg ->[dry ether] C6H5MgBr}$; with water it gives benzene: $\ce{C6H5MgBr + H2O -> C6H6 + Mg(OH)Br}$.

(c) $\ce{2C6H5Cl + CCl3CHO ->[conc. H2SO4] (ClC6H4)2CHCCl3 + H2O}$. Effects: persists in the environment (not biodegradable); accumulates in fatty tissue and increases up food chains, causing thin eggshells in birds of prey and harming fish; insects develop resistance.`,
  sol: 'Propylbenzene; biphenyl; PhMgBr → benzene; DDT effects.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)', 1], ['(c) Equation', 1], ['(c) Two effects', 1]],
  d: 2, c: 'application', t: [5],
}));
add('conv-long', long({
  stem: 'How would you carry out the following conversions? Give reagents and conditions. [1 each]\n\n(a) Benzene to 1-chloro-4-nitrobenzene\n\n(b) Chlorobenzene to biphenyl\n\n(c) Aniline to iodobenzene\n\n(d) Chlorobenzene to 4-nitrophenol\n\n(e) Bromobenzene to benzene by way of a Grignard reagent',
  model: '(a) Cl₂/FeCl₃ (dark) to chlorobenzene, then conc. HNO₃ + conc. H₂SO₄; separate the para isomer. (b) Na in dry ether (Fittig). (c) NaNO₂/HCl at 273–278 K, then warm with KI. (d) Nitrate (conc. HNO₃/H₂SO₄) to 1-chloro-4-nitrobenzene, then aqueous NaOH at about 443 K and acidify. (e) Mg in dry ether to C₆H₅MgBr, then add water.',
  sol: 'Five conversions.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 4, c: 'analysis', t: [1, 3, 4, 5],
}));
