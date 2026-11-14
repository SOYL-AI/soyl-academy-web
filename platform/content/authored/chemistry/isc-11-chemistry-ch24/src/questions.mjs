// ch24 Aromatic Hydrocarbons: Benzene — question bank (ISC style). AR keys planned: a b c d c b. MCQ keys are placed by the builder.
// Numbers printed in stems are the exact values used in the computations (strings carry the significant figures).
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const MV = 22.4; // L at STP
const mn = (x) => String(x).replace('-', '−'); // typographic minus sign in printed numbers

// ---------------------------------------------------------------- t01 nomenclature, structure, stability, aromaticity
add('name-mcq', mcq({
  stem: 'A dye chemist handles the compound C₆H₄(CH₃)(NO₂) in which the two groups sit on opposite corners of the ring. Its IUPAC name is:',
  right: '1-methyl-4-nitrobenzene',
  wrong: ['1-methyl-3-nitrobenzene', '1-methyl-2-nitrobenzene', '4-methyl-1-nitrobenzene'],
  sol: 'Opposite corners means positions 1 and 4 (para). Substituents are cited alphabetically (methyl before nitro) and the first cited gets the lower locant: 1-methyl-4-nitrobenzene — option (@K). Options (@1) and (@2) give the wrong positions and (@3) breaks the alphabetical rule.',
  d: 2, c: 'application', t: [1],
}));
add('name2-mcq', mcq({
  stem: 'A student draws a substituted benzoic acid: –COOH on one ring carbon, –Br on the next carbon and –NO₂ on the carbon directly opposite the –COOH. The IUPAC name is:',
  right: '2-bromo-4-nitrobenzoic acid',
  wrong: ['4-bromo-2-nitrobenzoic acid', '2-bromo-5-nitrobenzoic acid', '3-bromo-4-nitrobenzoic acid'],
  sol: 'The carbon with –COOH is C-1. Br on the adjacent carbon is C-2 and the carbon opposite C-1 is C-4, so the name is 2-bromo-4-nitrobenzoic acid — option (@K). Options (@1) and (@3) swap or shift the positions and (@2) places the nitro group on C-5.',
  d: 3, c: 'application', t: [1],
}));
add('kekule-mcq', mcq({
  stem: 'Which observation about benzene is directly explained by resonance between the two Kekulé structures?',
  right: 'All six carbon–carbon bonds have the same length, 139 pm',
  wrong: ['Benzene is a liquid at room temperature', 'Benzene does not dissolve in water', 'Benzene burns with a sooty flame'],
  sol: 'In a resonance hybrid, each C–C bond is partly single and partly double, so all six are equal and intermediate in length (139 pm) — option (@K). Physical state (@1), solubility (@2) and sooty combustion (@3) follow from the molecular formula and polarity, not from resonance.',
  d: 2, c: 'understanding', t: [1],
}));
{
  const E = { ene: -120, benz: -208 };
  const exp = 3 * E.ene; // -360
  const RE = E.benz - exp; // 152
  add('resE-mcq', mcq({
    stem: `The enthalpy of hydrogenation of cyclohexene is ${mn(E.ene)} kJ mol⁻¹ and that of benzene to cyclohexane is ${mn(E.benz)} kJ mol⁻¹. The resonance energy of benzene, taken from these data, is:`,
    right: `${RE} kJ mol⁻¹`,
    wrong: [`${mn(E.benz - E.ene)} kJ mol⁻¹`, `${-2 * E.ene} kJ mol⁻¹`, `${-E.benz - E.ene} kJ mol⁻¹`],
    sol: `Expected for three isolated C=C bonds: 3 × (${mn(E.ene)}) = ${mn(exp)} kJ mol⁻¹. Resonance energy = observed − expected = ${mn(E.benz)} − (${mn(exp)}) = ${RE} kJ mol⁻¹ — option (@K). Option (@1) is the difference between benzene and a single C=C, (@2) is the value for two C=C bonds and (@3) simply adds the two enthalpies.`,
    d: 3, c: 'application', t: [1],
  }), () => (RE === 152 && E.benz - E.ene === -88 && -2 * E.ene === 240 && -E.benz - E.ene === 328) || 'RE');
}
add('sig-mcq', mcq({
  stem: 'How many σ bonds, and how many delocalised π electrons, are there in one molecule of benzene?',
  right: '12 σ bonds and 6 π electrons',
  wrong: ['9 σ bonds and 6 π electrons', '12 σ bonds and 3 π electrons', '15 σ bonds and 6 π electrons'],
  sol: 'Six C–C and six C–H σ bonds give 12 σ bonds; the six unhybridised p orbitals contribute six π electrons, delocalised round the ring — option (@K). Option (@1) forgets the C–H bonds, (@2) counts π bonds in a Kekulé structure rather than electrons and (@3) overcounts the σ bonds.',
  d: 2, c: 'understanding', t: [1],
}));
add('huckel-mcq', mcq({
  stem: 'Which of these species is aromatic according to Hückel\'s rule?',
  right: 'the cyclopentadienyl anion, C₅H₅⁻',
  wrong: ['the cyclopentadienyl cation, C₅H₅⁺', 'cyclobutadiene, C₄H₄', 'cyclooctatetraene, C₈H₈'],
  sol: 'The anion has five p orbitals in a planar ring holding 6 π electrons (4n + 2 with n = 1) — option (@K). The cation has 4 π electrons (4n, antiaromatic) (@1), cyclobutadiene has 4 (@2) and cyclooctatetraene has 8 π electrons and is tub-shaped, not planar (@3).',
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation and physical properties
add('prep-mcq', mcq({
  stem: 'In a laboratory preparation, benzene is obtained directly when which of these is heated?',
  right: 'sodium benzoate with soda lime',
  wrong: ['sodium ethanoate with soda lime', 'benzoic acid with sodium hydroxide solution', 'phenol with concentrated sulphuric acid'],
  sol: 'Soda lime removes the carboxylate group from sodium benzoate as sodium carbonate: C₆H₅COONa + NaOH → C₆H₆ + Na₂CO₃ — option (@K). Sodium ethanoate gives methane (@1), benzoic acid and aqueous NaOH only give the salt (@2), and phenol with H₂SO₄ gives a sulphonation product (@3).',
  d: 1, c: 'recall', t: [2],
}));
add('phenol-mcq', mcq({
  stem: 'Phenol vapour is passed over strongly heated zinc dust. The organic product is:',
  right: 'benzene',
  wrong: ['cyclohexane', 'methylbenzene', 'benzaldehyde'],
  sol: 'Zinc removes the oxygen of the –OH group as zinc oxide, leaving the ring: C₆H₅OH + Zn → C₆H₆ + ZnO — option (@K). The ring is not reduced to cyclohexane (@1), no carbon is added to give methylbenzene (@2), and nothing is oxidised to benzaldehyde (@3).',
  d: 2, c: 'understanding', t: [2],
}));
add('bpmp-mcq', mcq({
  stem: 'Benzene melts at 5.5 °C, whereas methylbenzene, whose molecules are heavier, melts at −95 °C. The best explanation is that:',
  right: 'benzene molecules are more symmetrical and pack more closely in the crystal',
  wrong: ['benzene molecules form hydrogen bonds with each other', 'benzene is polar but methylbenzene is non-polar', 'methylbenzene has weaker London forces because it is larger'],
  sol: 'Melting depends strongly on how well molecules pack in the solid. The highly symmetrical benzene molecule fits closely in the lattice, so more energy is needed to melt it — option (@K). Benzene has no O–H or N–H, so no hydrogen bonding (@1); both are essentially non-polar (@2); and larger molecules have stronger, not weaker, London forces (@3).',
  d: 3, c: 'analysis', t: [2],
}));
add('xyl-mcq', mcq({
  stem: 'Three isomeric dimethylbenzenes melt at −48 °C, −25 °C and +13 °C. The isomer that melts at +13 °C is:',
  right: '1,4-dimethylbenzene',
  wrong: ['1,2-dimethylbenzene', '1,3-dimethylbenzene', 'ethylbenzene'],
  sol: 'The most symmetrical isomer packs best in the crystal and has the highest melting point; that is the para isomer, 1,4-dimethylbenzene (p-xylene) — option (@K). The ortho (@1, −25 °C) and meta (@2, −48 °C) isomers are less symmetrical, and ethylbenzene (@3) is not a dimethylbenzene.',
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 electrophilic substitution
add('eas-mcq', mcq({
  stem: 'Benzene is warmed with a mixture of concentrated nitric acid and concentrated sulphuric acid. The species that attacks the ring is:',
  right: 'NO₂⁺',
  wrong: ['NO₃⁻', 'HSO₄⁻', 'NO₂⁻'],
  sol: 'Sulphuric acid protonates nitric acid, which then loses water to give the nitronium ion NO₂⁺, the electrophile — option (@K). The anions NO₃⁻ (@1), HSO₄⁻ (@2) and NO₂⁻ (@3) are nucleophiles, not electrophiles.',
  d: 1, c: 'recall', t: [3],
}));
add('arenium-mcq', mcq({
  stem: 'The intermediate formed in the slow step of the nitration of benzene is best described as:',
  right: 'a resonance-stabilised carbocation in which the attacked carbon is sp³ hybridised',
  wrong: ['a free radical in which all six carbons remain sp² hybridised', 'an aromatic cation with six delocalised π electrons round the ring', 'a carbanion with the negative charge on the nitrogen atom'],
  sol: 'The π electrons form a bond to NO₂⁺, so the attacked carbon becomes sp³ and the remaining four π electrons are delocalised over five carbons, giving the arenium ion — option (@K). The mechanism is ionic, not radical (@1); the ion is not aromatic because the sp³ carbon breaks the ring of p orbitals (@2); and the charge is positive, not negative (@3).',
  d: 2, c: 'understanding', t: [3],
}));
add('fc-mcq', mcq({
  stem: 'Benzene is treated with ethanoyl chloride in the presence of anhydrous aluminium chloride. The main organic product is:',
  right: 'phenylethanone',
  wrong: ['ethylbenzene', 'chlorobenzene', 'benzoic acid'],
  sol: 'AlCl₃ generates the acylium ion CH₃CO⁺, which substitutes an H of the ring: C₆H₆ + CH₃COCl → C₆H₅COCH₃ + HCl, phenylethanone — option (@K). Ethylbenzene (@1) would need chloroethane, chlorobenzene (@2) needs Cl₂/FeCl₃ and benzoic acid (@3) needs oxidation of an alkylbenzene.',
  d: 2, c: 'application', t: [3],
}));
add('sulph-mcq', mcq({
  stem: 'Which statement about the sulphonation of benzene with concentrated sulphuric acid is correct?',
  right: 'It is reversible: heating benzenesulphonic acid with dilute acid or steam regenerates benzene',
  wrong: ['The electrophile is the HSO₄⁻ ion', 'The reaction needs anhydrous aluminium chloride as catalyst', 'The product is phenyl hydrogensulphate, C₆H₅OSO₃H'],
  sol: 'Sulphonation is one of the few reversible substitutions; hydrolysis of the –SO₃H group with dilute acid or steam gives back benzene — option (@K). The electrophile is SO₃ (@1), no AlCl₃ is needed (@2) and the sulphur is bonded to carbon, giving a sulphonic acid, not a sulphate ester (@3).',
  d: 3, c: 'understanding', t: [3],
}));
add('polyalk-mcq', mcq({
  stem: 'Friedel–Crafts alkylation of benzene often gives di- and tri-alkylbenzenes, whereas acylation stops after one substitution. The reason is that:',
  right: 'an alkyl group activates the ring towards further attack, but an acyl group deactivates it',
  wrong: ['acyl chlorides are far less reactive than alkyl halides', 'aluminium chloride is used up completely in alkylation but not in acylation', 'the acylium ion is a free radical and so reacts only once'],
  sol: 'An alkyl group donates electrons, so the product is more reactive than benzene and is alkylated again; the C=O group of the acylated product withdraws electrons, so the ring is deactivated and reaction stops — option (@K). Acyl chlorides are reactive enough (@1), AlCl₃ is actually used in more than catalytic amounts for acylation (@2) and the acylium ion is a cation, not a radical (@3).',
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 directive influence
add('direct-mcq', mcq({
  stem: 'A second substituent enters mainly at the meta position when the compound being nitrated is:',
  right: 'nitrobenzene',
  wrong: ['phenol', 'methylbenzene', 'chlorobenzene'],
  sol: 'The –NO₂ group withdraws electrons and directs meta (about 93% 1,3-dinitrobenzene) — option (@K). –OH (@1) and –CH₃ (@2) are ortho/para directing activators, and chlorine (@3) is ortho/para directing though deactivating.',
  d: 2, c: 'understanding', t: [4],
}));
add('order-mcq', mcq({
  stem: 'Benzene, nitrobenzene, phenol and methylbenzene are each nitrated under the same mild conditions. The order of decreasing rate is:',
  right: 'phenol > methylbenzene > benzene > nitrobenzene',
  wrong: ['nitrobenzene > benzene > methylbenzene > phenol', 'methylbenzene > phenol > benzene > nitrobenzene', 'phenol > benzene > methylbenzene > nitrobenzene'],
  sol: 'The –OH group is a strong activator (+M), –CH₃ a weak activator (+I and hyperconjugation), and –NO₂ a strong deactivator (−I, −M): phenol > methylbenzene > benzene > nitrobenzene — option (@K). Option (@1) is the exact reverse; (@2) and (@3) misplace the weak or the strong activator.',
  d: 3, c: 'application', t: [4],
}));
add('clben-mcq', mcq({
  stem: 'Nitration of chlorobenzene gives mainly 2- and 4-nitrochlorobenzene, yet it is slower than the nitration of benzene. This is because chlorine:',
  right: 'withdraws electrons inductively, which deactivates the ring, but donates a lone pair by resonance to the ortho and para positions',
  wrong: ['is a meta director that deactivates the ring', 'donates electrons both inductively and by resonance, so it activates the ring', 'has no lone pair and so cannot take part in resonance'],
  sol: 'Chlorine is very electronegative (−I effect), which makes the ring less reactive overall; its lone pairs are donated into the ring (+M) and stabilise the arenium ion formed by ortho or para attack, so substitution goes there — option (@K). Chlorine is not a meta director (@1), does not activate (@2) and has three lone pairs (@3).',
  d: 3, c: 'analysis', t: [4],
}));
add('tolnit-mcq', mcq({
  stem: 'Methylbenzene is mononitrated with mixed acid in a small-scale experiment. Which pair of products makes up most of the mixture?',
  right: '2-nitromethylbenzene and 4-nitromethylbenzene',
  wrong: ['3-nitromethylbenzene and 4-nitromethylbenzene', '2-nitromethylbenzene and 3-nitromethylbenzene', '3-nitromethylbenzene only'],
  sol: 'The methyl group is ortho/para directing, so the main products are the 2- (about 58%) and 4- (about 38%) isomers — option (@K). Only about 4% of the meta isomer forms, so (@1), (@2) and (@3) all include the minor 3-isomer.',
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 oxidation, addition, pyrolysis, hazards
add('add-mcq', mcq({
  stem: 'Benzene vapour and hydrogen are passed over finely divided nickel at 473 K. The product is:',
  right: 'cyclohexane',
  wrong: ['cyclohexene', 'hexane', 'methylcyclopentane'],
  sol: 'All three π bonds add H₂: C₆H₆ + 3H₂ → C₆H₁₂, cyclohexane — option (@K). The reaction does not stop at cyclohexene (@1), the ring is not opened to hexane (@2) and the ring size does not change (@3).',
  d: 1, c: 'recall', t: [5],
}));
add('bhc-mcq', mcq({
  stem: 'Chlorine is bubbled through boiling benzene in bright sunlight, without any catalyst. The compound formed is:',
  right: 'hexachlorocyclohexane',
  wrong: ['chlorobenzene', '1,4-dichlorobenzene', 'hexachlorobenzene'],
  sol: 'In UV light, chlorine adds to the ring by a radical mechanism: C₆H₆ + 3Cl₂ → C₆H₆Cl₆, hexachlorocyclohexane (BHC) — option (@K). Substitution products (@1, @2, @3) need a Lewis acid catalyst such as FeCl₃ in the dark.',
  d: 2, c: 'application', t: [5],
}));
add('ozon-mcq', mcq({
  stem: 'Benzene is treated with ozone and the ozonide is then decomposed with zinc and water. The organic product is:',
  right: 'three molecules of ethanedial (glyoxal)',
  wrong: ['three molecules of ethanal', 'three molecules of ethanedioic acid', 'six molecules of methanal'],
  sol: 'Each of the three C=C bonds of a Kekulé structure is cleaved, and each carbon becomes a CHO group, so the six carbons give three OHC–CHO molecules — option (@K). Ethanal (@1) would have a CH₃ group that benzene lacks, the acid (@2) needs an oxidising work-up and methanal (@3) would need the C–C bonds to break as well.',
  d: 3, c: 'application', t: [5],
}));
add('hazard-mcq', mcq({
  stem: 'Which long-term health effect is most strongly linked with breathing benzene vapour over many years?',
  right: 'damage to the bone marrow, leading to leukaemia',
  wrong: ['silicosis of the lungs', 'cataract of the eye lens', 'enlargement of the thyroid gland (goitre)'],
  sol: 'Benzene is a proven human carcinogen; chronic exposure damages blood-forming bone marrow and can cause leukaemia — option (@K). Silicosis (@1) comes from silica dust, cataract (@2) from ultraviolet exposure among other causes, and goitre (@3) from iodine deficiency.',
  d: 1, c: 'recall', t: [5],
}));
add('pyro-mcq', mcq({
  stem: 'Benzene vapour is passed through a tube heated to redness. Besides hydrogen, the organic product is:',
  right: 'biphenyl',
  wrong: ['diphenylmethane', 'naphthalene', 'cyclohexane'],
  sol: 'Two benzene molecules join through a C–C bond with loss of H₂: 2C₆H₆ → C₆H₅–C₆H₅ + H₂, biphenyl — option (@K). Diphenylmethane (@1) would need an extra carbon, naphthalene (@2) has two fused rings and cyclohexane (@3) is the hydrogenation product.',
  d: 2, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- assertion-reason (registered in the order a b c d c b)
add('stab-ar', ar({
  a: 'Benzene does not decolourise bromine water under ordinary conditions.',
  r: 'The delocalised π electrons give benzene a large resonance energy, which addition reactions would destroy.',
  key: 'a',
  sol: 'Both are true, and R explains A: addition would break the delocalised π system and lose about 150 kJ mol⁻¹, so benzene prefers substitution and does not react with bromine water — option (a).',
  d: 2, c: 'understanding', t: [1, 3],
}));
add('nitr-ar', ar({
  a: 'The nitration of benzene is carried out with a mixture of concentrated nitric acid and concentrated sulphuric acid.',
  r: 'Benzene is less dense than water.',
  key: 'b',
  sol: 'Both are true. The acid mixture is used because it generates the NO₂⁺ electrophile; the density of benzene has nothing to do with the choice of reagents, so R does not explain A — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('meta-ar', ar({
  a: 'Further nitration of nitrobenzene gives mainly 1,3-dinitrobenzene.',
  r: 'The nitro group donates electrons to the ring by resonance and so activates it.',
  key: 'c',
  sol: 'A is true. R is false: the nitro group withdraws electrons by the −I and −M effects, which deactivates the ring and directs the next substituent to the meta position — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('kek-ar', ar({
  a: 'Benzene has three localised C=C bonds and three C–C bonds of different lengths, 134 pm and 154 pm.',
  r: 'Benzene has four π electrons, which is a Hückel number.',
  key: 'd',
  sol: 'Both are false: all six C–C bonds are equal (139 pm) because the π electrons are delocalised, and benzene has six π electrons (4n + 2 with n = 1); four π electrons would be 4n and antiaromatic — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('acyl-ar', ar({
  a: 'Friedel–Crafts acylation of benzene gives only the monoacyl product, even with an excess of acyl chloride.',
  r: 'The acyl group is an electron-donating group that activates the ring towards further substitution.',
  key: 'c',
  sol: 'A is true. R is false: the C=O group withdraws electrons and deactivates the ring, which is why a second acylation does not occur — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('phenol-ar', ar({
  a: 'Heating phenol vapour with zinc dust gives benzene.',
  r: 'Benzene is classified as a human carcinogen.',
  key: 'b',
  sol: 'Both are true. Zinc removes the oxygen of phenol as ZnO; the carcinogenicity of benzene has no bearing on how it is prepared, so R does not explain A — option (b).',
  d: 2, c: 'understanding', t: [2, 5],
}));

// ---------------------------------------------------------------- true-false, fill, match
add('planar-tf', tf({
  stem: 'All twelve atoms of a benzene molecule lie in one plane, and every C–C–C angle is 120°.',
  key: 't',
  sol: 'True. Each carbon is sp² hybridised, so the six carbons form a regular planar hexagon and each hydrogen lies in the same plane.',
  d: 1, c: 'understanding', t: [1],
}));
add('oh-tf', tf({
  stem: 'The –OH group of phenol directs an incoming electrophile mainly to the meta position.',
  key: 'f',
  sol: 'False. –OH donates a lone pair to the ring (+M effect), stabilising the arenium ion for ortho and para attack, so it is an ortho/para director and strongly activating.',
  d: 2, c: 'understanding', t: [4],
}));
add('fecl3-tf', tf({
  stem: 'When benzene reacts with chlorine in the dark in the presence of iron(III) chloride, the main product is hexachlorocyclohexane.',
  key: 'f',
  sol: 'False. With a Lewis acid catalyst in the dark, substitution occurs and chlorobenzene is formed; hexachlorocyclohexane forms only by addition in UV light without a catalyst.',
  d: 2, c: 'understanding', t: [3, 5],
}));
add('huckel-fill', fill({
  stem: 'A planar, cyclic, fully conjugated ring is aromatic if it contains (4n + 2) π electrons; benzene contains ___ π electrons.',
  acc: [['6', 'six']],
  sol: '**6** π electrons (n = 1).',
  d: 1, c: 'recall', t: [1],
}));
add('so3-fill', fill({
  stem: 'The electrophile in the sulphonation of benzene with oleum is ___.',
  acc: [['SO3', 'SO₃', 'sulphur trioxide']],
  sol: '**SO₃** (sulphur trioxide).',
  d: 1, c: 'recall', t: [3],
}));
add('biph-fill', fill({
  stem: 'On pyrolysis, two molecules of benzene join with loss of hydrogen to give ___.',
  acc: [['biphenyl', 'diphenyl']],
  sol: '**Biphenyl**, C₆H₅–C₆H₅.',
  d: 1, c: 'recall', t: [5],
}));
add('eas-match', match({
  stem: 'Match each electrophilic substitution of benzene in Column I with the electrophile that attacks the ring in Column II.',
  pairs: [
    ['Nitration with mixed acid', 'NO₂⁺'],
    ['Sulphonation with oleum', 'SO₃'],
    ['Friedel–Crafts acylation with CH₃COCl and AlCl₃', 'CH₃CO⁺'],
    ['Chlorination with Cl₂ and FeCl₃', 'Cl⁺ (polarised Cl–Cl···FeCl₃)'],
  ],
  order: [3, 1, 2, 0],
  sol: 'Mixed acid makes the nitronium ion; oleum supplies SO₃; AlCl₃ turns the acid chloride into the acylium ion; FeCl₃ polarises Cl₂ so that it behaves as Cl⁺.',
  d: 2, c: 'understanding', t: [3],
}));
add('dir-match', match({
  stem: 'Match each substituent on a benzene ring in Column I with its directing and activating effect in Column II.',
  pairs: [
    ['–OH', 'ortho/para directing, strongly activating'],
    ['–NO₂', 'meta directing, strongly deactivating'],
    ['–Cl', 'ortho/para directing, deactivating'],
    ['–CH₃', 'ortho/para directing, weakly activating'],
  ],
  order: [0, 3, 2, 1],
  sol: '–OH donates by resonance and strongly activates; –NO₂ withdraws by −I and −M and directs meta; halogens withdraw inductively but donate by resonance (o/p, deactivating); –CH₃ activates weakly through +I and hyperconjugation.',
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- numericals
{
  const m = '3.90';
  const dH = 208;
  const n = Number(m) / 78; // 0.0500
  const q = n * dH; // 10.4 kJ
  add('hyd-num', num({
    stem: `Complete hydrogenation of one mole of benzene to cyclohexane releases ${dH} kJ of heat. How much heat, in kJ, is released when ${m} g of benzene is hydrogenated completely? (C = 12, H = 1)`,
    value: 10.4, tol: 0.05, unit: 'kJ',
    sol: r`$n(\text{C}_6\text{H}_6) = ${m} \div 78 = ${n.toFixed(4)}\ \text{mol}$, so heat $= ${n.toFixed(4)} \times ${dH} = ${q.toFixed(1)}\ \text{kJ}$.`,
    scheme: [['n = 3.90 ÷ 78 = 0.0500 mol', 0.5], ['Heat = 0.0500 × 208 = 10.4 kJ', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(q, 10.4, 0.001) || 'q');
}
{
  const m = '15.6';
  const Y = '80.0';
  const n = Number(m) / 78; // 0.200
  const th = n * 123; // 24.6
  const act = (th * Number(Y)) / 100; // 19.68
  add('nitro-num', num({
    stem: `A student nitrates ${m} g of benzene with an excess of mixed acid and obtains nitrobenzene in ${Y}% yield. What mass of nitrobenzene, in grams, is isolated? (C = 12, H = 1, N = 14, O = 16)`,
    value: 19.7, tol: 0.1, unit: 'g',
    sol: r`$\ce{C6H6 + HNO3 -> C6H5NO2 + H2O}$. $n(\text{C}_6\text{H}_6) = ${m} \div 78 = ${n.toFixed(3)}\ \text{mol}$; theoretical mass $= ${n.toFixed(3)} \times 123 = ${th.toFixed(1)}\ \text{g}$; at ${Y}% yield $m = ${th.toFixed(1)} \times ${Y}/100 = ${act.toFixed(1)}\ \text{g}$.`,
    scheme: [['n(benzene) = 0.200 mol', 1], ['Theoretical mass 24.6 g', 1], ['80.0% of 24.6 = 19.7 g', 1]],
    marks: 3, d: 3, c: 'application', t: [3],
  }), () => near(act, 19.7, 0.002) || 'act');
}
{
  const m = '19.5';
  const n = Number(m) / 78; // 0.250
  const nCl = 3 * n; // 0.750
  const V = nCl * MV; // 16.8 L
  add('bhc-num', num({
    stem: `${m} g of benzene is converted completely into hexachlorocyclohexane, C₆H₆Cl₆, by chlorine in sunlight. What volume of chlorine, in litres at STP, is needed? (C = 12, H = 1; molar volume ${MV} L)`,
    value: 16.8, tol: 0.1, unit: 'L',
    sol: r`$\ce{C6H6 + 3Cl2 -> C6H6Cl6}$. $n(\text{C}_6\text{H}_6) = ${m} \div 78 = ${n.toFixed(3)}\ \text{mol}$, so $n(\text{Cl}_2) = 3 \times ${n.toFixed(3)} = ${nCl.toFixed(3)}\ \text{mol}$ and $V = ${nCl.toFixed(3)} \times ${MV} = ${V.toFixed(1)}\ \text{L}$.`,
    scheme: [['Balanced equation and n(benzene) = 0.250 mol', 1], ['n(Cl₂) = 0.750 mol; V = 16.8 L', 1]],
    marks: 2, d: 3, c: 'application', t: [5],
  }), () => near(V, 16.8, 0.001) || 'V');
}

// ---------------------------------------------------------------- short answers, 2 marks
add('kek-short', short({
  marks: 2,
  stem: 'State two experimental facts about benzene that a single structure with three fixed C=C bonds cannot explain, and say how the idea of resonance accounts for them.',
  model: 'Facts: (1) all six C–C bonds are equal (139 pm), not alternately 154 and 134 pm; (2) only one 1,2-disubstituted product exists (a fixed triene would give two); benzene also resists addition with bromine water. Resonance: benzene is a hybrid of the two Kekulé structures, so the π electrons are delocalised over the whole ring, every bond is the same intermediate length and the extra stability makes addition unfavourable.',
  sol: 'Two facts; resonance hybrid.',
  scheme: [['Two valid experimental facts', 1], ['Explanation by delocalisation over the ring', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('nomen-short', short({
  marks: 2,
  stem: 'A benzene ring carries an –NH₂ group on one carbon and a –Cl atom on the carbon directly opposite it. Name the compound. Then say, using o-, m- or p-, how the two bromine atoms are placed in 1,3-dibromobenzene.',
  model: 'The compound is 4-chloroaniline (4-chlorobenzenamine, p-chloroaniline): the carbon with NH₂ is C-1 and the Cl is on C-4. In 1,3-dibromobenzene the two Br atoms are on carbons separated by one carbon, so the arrangement is meta (m-dibromobenzene).',
  sol: '4-chloroaniline; meta.',
  scheme: [['4-chloroaniline with the correct numbering', 1], ['1,3 is meta', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('prepEq-short', short({
  marks: 2,
  stem: 'Write balanced equations, with conditions, for the preparation of benzene from (i) sodium benzoate and (ii) phenol.',
  model: r`(i) $\ce{C6H5COONa + NaOH ->[CaO][heat] C6H6 + Na2CO3}$ (soda lime). (ii) $\ce{C6H5OH + Zn -> C6H6 + ZnO}$ (phenol vapour passed over heated zinc dust).`,
  sol: 'Two equations with conditions.',
  scheme: [['Equation (i) with soda lime and heat', 1], ['Equation (ii) with zinc dust and heat', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('phys-short', short({
  marks: 2,
  stem: 'Benzene does not dissolve in water but dissolves iodine and fats. Explain this in terms of polarity, and say whether benzene forms the upper or the lower layer when shaken with water.',
  model: 'Benzene is non-polar and cannot form hydrogen bonds with water, so the strong hydrogen bonding between water molecules keeps benzene out; it dissolves non-polar solutes such as iodine and fats by London forces (like dissolves like). Its density (0.879 g mL⁻¹) is less than that of water, so benzene forms the upper layer.',
  sol: 'Non-polar; upper layer.',
  scheme: [['Non-polar, no hydrogen bonding with water; like dissolves like', 1], ['Less dense, so the upper layer', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('nitr-short', short({
  marks: 2,
  stem: 'Write the equation for the nitration of benzene, giving the reagents, the temperature and the electrophile.',
  model: r`$\ce{C6H6 + HNO3 ->[conc H2SO4][323--333 K] C6H5NO2 + H2O}$. The reagents are concentrated nitric acid and concentrated sulphuric acid at about 323–333 K; the electrophile is the nitronium ion NO₂⁺, formed as $\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$.`,
  sol: 'Equation; mixed acid; NO₂⁺.',
  scheme: [['Balanced equation with reagents and temperature', 1], ['Electrophile NO₂⁺ and its formation', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('sulf-short', short({
  marks: 2,
  stem: 'Write the equation for the sulphonation of benzene and explain how the –SO₃H group can be removed again.',
  model: r`$\ce{C6H6 + H2SO4 -> C6H5SO3H + H2O}$ (concentrated H₂SO₄ or oleum, heat). Sulphonation is reversible: heating benzenesulphonic acid with dilute sulphuric acid, or with superheated steam, hydrolyses the C–S bond and gives back benzene.`,
  sol: 'Equation; reversible; steam or dilute acid.',
  scheme: [['Balanced equation', 1], ['Reversal with dilute acid or steam', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('dir-short', short({
  marks: 2,
  stem: 'Explain, with reference to the arenium ion, why the –OH group of phenol makes the ring reactive and directs substitution to the ortho and para positions.',
  model: 'The oxygen has a lone pair that it donates into the ring (+M effect). For ortho or para attack, one resonance form of the arenium ion puts the positive charge on the carbon bearing –OH, and the oxygen lone pair can then share in it, giving an extra stable structure. This stabilises the intermediate (so the ring is activated) only for ortho and para attack, so these positions are favoured.',
  sol: '+M; extra resonance form for o/p attack.',
  scheme: [['Lone pair on O donated to the ring (+M)', 1], ['Extra stabilised resonance form for ortho and para attack', 1]],
  d: 3, c: 'application', t: [4],
}));
add('ozon-short', short({
  marks: 2,
  stem: 'Name the product formed when benzene is ozonised and the ozonide is treated with zinc and water. What does the product suggest about the carbons of the ring?',
  model: 'Three molecules of ethanedial (glyoxal), OHC–CHO, are formed from one benzene, as each of the three C=C bonds of a Kekulé structure is cleaved and each carbon becomes a CHO group. All six carbons give identical –CHO groups, consistent with a symmetrical ring in which all carbons are equivalent.',
  sol: 'Glyoxal (3 molecules); all carbons equivalent.',
  scheme: [['Three molecules of glyoxal', 1], ['All six carbons equivalent', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('pyro-short', short({
  marks: 2,
  stem: 'Write the equation for the pyrolysis of benzene, state the condition and name the organic product.',
  model: r`$\ce{2C6H6 -> C12H10 + H2}$ when benzene vapour is passed through a red-hot tube (above about 1000 K). The organic product is biphenyl, C₆H₅–C₆H₅.`,
  sol: 'Equation; red-hot tube; biphenyl.',
  scheme: [['Balanced equation', 1], ['Condition and name of biphenyl', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- short answers, 3 marks
add('huckel-short3', short({
  marks: 3,
  stem: 'Using Hückel\'s rule, decide whether (i) cyclobutadiene, (ii) the cyclopentadienyl anion and (iii) naphthalene are aromatic, giving the number of π electrons in each. Assume each is planar.',
  model: '(i) Cyclobutadiene has 4 π electrons, which is 4n (n = 1), so it is antiaromatic, not aromatic. (ii) The cyclopentadienyl anion has 6 π electrons (four from two double bonds and two from the lone pair on the sp² carbon), which is 4n + 2 with n = 1: aromatic. (iii) Naphthalene has 10 π electrons (4n + 2 with n = 2): aromatic.',
  sol: 'Antiaromatic; aromatic; aromatic.',
  scheme: [['Cyclobutadiene: 4 π electrons, not aromatic', 1], ['Anion: 6 π electrons, aromatic', 1], ['Naphthalene: 10 π electrons, aromatic', 1]],
  d: 3, c: 'application', t: [1],
}));
{
  const dH = { ene: -120, diene: -240, benz: -208 }; // cyclohexa-1,4-diene, about −240 kJ/mol (isolated C=C)
  const exT = 3 * dH.ene; // -360
  const RE = dH.benz - exT; // 152
  const exD = 2 * dH.ene; // -240
  const REd = dH.diene - exD; // 0
  add('stab-short3', short({
    marks: 3,
    stem: `The enthalpies of hydrogenation to cyclohexane are: cyclohexene ${mn(dH.ene)}, cyclohexa-1,4-diene ${mn(dH.diene)} and benzene ${mn(dH.benz)} kJ mol⁻¹. Calculate the stabilisation (resonance energy) of benzene and the same quantity for cyclohexa-1,4-diene, and explain why the two values differ so much.`,
    model: `Benzene: expected 3 × (${mn(dH.ene)}) = ${mn(exT)} kJ mol⁻¹; resonance energy = ${mn(dH.benz)} − (${mn(exT)}) = ${RE} kJ mol⁻¹. Cyclohexa-1,4-diene: expected 2 × (${mn(dH.ene)}) = ${mn(exD)} kJ mol⁻¹; stabilisation = ${mn(dH.diene)} − (${mn(exD)}) = ${REd} kJ mol⁻¹. In the 1,4-diene the two double bonds are isolated (separated by CH₂ groups), so their π electrons cannot be delocalised and there is no extra stability, whereas in benzene all six π electrons are delocalised round a closed, cyclic arrangement (aromatic stability), which lowers its energy by about 150 kJ mol⁻¹.`,
    sol: 'Benzene 152 kJ mol⁻¹; cyclohexa-1,4-diene 0; cyclic delocalisation of six π electrons only in benzene.',
    scheme: [['Benzene: 152 kJ mol⁻¹ with working', 1], ['Cyclohexa-1,4-diene: 0 kJ mol⁻¹ with working', 1], ['Isolated double bonds cannot delocalise; cyclic delocalisation of six π electrons in benzene', 1]],
    d: 3, c: 'analysis', t: [1],
  }), () => RE === 152 && REd === 0 || 'RE');
}
add('prep-short3', short({
  marks: 3,
  stem: 'Sodium benzoate is heated with soda lime. Write the equation, name the type of reaction and state what soda lime is. How is benzene obtained from phenol?',
  model: r`$\ce{C6H5COONa + NaOH ->[CaO][heat] C6H6 + Na2CO3}$. The reaction is decarboxylation (loss of the carboxyl group as carbonate). Soda lime is a mixture of sodium hydroxide and calcium oxide; the calcium oxide keeps the alkali dry and stops it attacking the glass. From phenol: the vapour is passed over heated zinc dust, which removes the oxygen as ZnO.`,
  sol: 'Equation; decarboxylation; soda lime; zinc dust.',
  scheme: [['Balanced equation', 1], ['Decarboxylation and composition of soda lime', 1], ['Phenol vapour over zinc dust', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('mech-short3', short({
  marks: 3,
  stem: 'Describe the mechanism of the nitration of benzene: show how the electrophile is formed, the intermediate that results from the attack on the ring, and the step that gives nitrobenzene.',
  model: r`The electrophile forms in the acid mixture: $\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$. Step 1 (slow): the π electrons of benzene attack NO₂⁺, forming the arenium ion, a carbocation in which the attacked carbon is sp³ (bearing H and NO₂) and the + charge is spread over the ortho and para carbons by resonance. Step 2 (fast): HSO₄⁻ removes H⁺ from the sp³ carbon, the π system is restored and nitrobenzene forms.`,
  sol: 'NO₂⁺; arenium ion; loss of H⁺.',
  scheme: [['Formation of NO₂⁺', 1], ['Arenium ion with delocalised charge', 1], ['Loss of H⁺ to give nitrobenzene', 1]],
  d: 3, c: 'application', t: [3],
}));
add('fcalk-short3', short({
  marks: 3,
  stem: 'Write the equation for the preparation of ethylbenzene from benzene and bromoethane by the Friedel–Crafts method, naming the catalyst and the electrophile, and give one limitation of the method.',
  model: r`$\ce{C6H6 + C2H5Br ->[AlCl3] C6H5C2H5 + HBr}$. The catalyst is anhydrous aluminium chloride, which helps to form the ethyl carbocation, C₂H₅⁺, the electrophile. A limitation is polyalkylation: the ethyl group activates the ring, so diethyl- and triethylbenzenes also form (or, for longer chains, the carbocation can rearrange).`,
  sol: 'Equation; AlCl₃ and carbocation; polyalkylation.',
  scheme: [['Balanced equation', 1], ['Anhydrous AlCl₃ and the carbocation electrophile', 1], ['A limitation of alkylation', 1]],
  d: 3, c: 'application', t: [3],
}));
add('fcacyl-short3', short({
  marks: 3,
  stem: 'Benzene is converted into phenylethanone by Friedel–Crafts acylation. Write the equation, name the electrophile, and explain why the reaction stops after one acyl group has entered although alkylation often does not.',
  model: r`$\ce{C6H6 + CH3COCl ->[AlCl3] C6H5COCH3 + HCl}$. The electrophile is the acylium ion CH₃CO⁺. The carbonyl group of the product withdraws electrons from the ring (−I, −M), deactivating it, so it is less reactive than benzene and a second acylation does not occur; an alkyl group in alkylation donates electrons and activates the ring, so further substitution happens.`,
  sol: 'Equation; acylium ion; C=O deactivates.',
  scheme: [['Balanced equation', 1], ['Acylium ion CH₃CO⁺', 0.5], ['Product is deactivated, unlike an alkylbenzene', 1.5]],
  d: 3, c: 'analysis', t: [3],
}));
add('dirNO2-short3', short({
  marks: 3,
  stem: 'Nitrobenzene is nitrated mainly at the meta position and more slowly than benzene. Explain both facts by considering the arenium ion formed on attack at the ortho and at the meta position.',
  model: 'The nitro group withdraws electrons (−I and −M), so the ring is less able to stabilise the positive charge of the arenium ion and reacts more slowly than benzene. In ortho (and para) attack, one resonance form of the ion has the positive charge on the carbon directly attached to the N⁺ of the nitro group; two positive charges on adjacent atoms is very unfavourable. In meta attack the + is never on that carbon, so this form is avoided; the meta ion is the least unstable, and meta substitution is preferred.',
  sol: 'Deactivation by −I/−M; o/p ion has + next to N⁺; meta avoids it.',
  scheme: [['NO₂ withdraws electrons, so the ring is deactivated', 1], ['o/p attack puts + on the carbon attached to the nitro group', 1], ['Meta attack avoids this, so it is preferred', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('tolNit-short3', short({
  marks: 3,
  stem: 'Give the main mononitro products formed from (i) methylbenzene and (ii) nitrobenzene on treatment with mixed acid, and state, for each starting compound, whether the ring is more or less reactive than benzene and what type of director the group is.',
  model: '(i) Methylbenzene gives mainly 2-nitromethylbenzene (ortho, about 58%) and 4-nitromethylbenzene (para, about 38%); –CH₃ is an ortho/para director and activates the ring, so it reacts faster than benzene. (ii) Nitrobenzene gives mainly 1,3-dinitrobenzene (about 93%); –NO₂ is a meta director and deactivates the ring, so it reacts more slowly than benzene and needs more vigorous conditions.',
  sol: 'o- and p-nitrotoluene, activated; m-dinitrobenzene, deactivated.',
  scheme: [['Methylbenzene products and o/p, activating', 1.5], ['Nitrobenzene product and meta, deactivating', 1.5]],
  d: 3, c: 'application', t: [4],
}));
add('add-short3', short({
  marks: 3,
  stem: 'Write equations for the reaction of benzene with (i) hydrogen over nickel at 473 K and (ii) chlorine in bright sunlight with no catalyst. Name the product of (ii) and give one use of it.',
  model: r`(i) $\ce{C6H6 + 3H2 ->[Ni][473 K] C6H12}$ (cyclohexane). (ii) $\ce{C6H6 + 3Cl2 -> C6H6Cl6}$ under UV light, giving benzene hexachloride (BHC, hexachlorocyclohexane), which has been used as an insecticide.`,
  sol: 'Cyclohexane; BHC; insecticide.',
  scheme: [['Hydrogenation equation with conditions', 1], ['Chlorine addition equation', 1], ['BHC named with a use', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('haz-short3', short({
  marks: 3,
  stem: 'State two health hazards of benzene, two precautions to take when it is used in a laboratory, and one less harmful solvent that can replace it.',
  model: 'Hazards: it is a carcinogen (long exposure damages the bone marrow and causes leukaemia) and it is toxic (vapour causes dizziness and headache; it is absorbed through the skin). Precautions: work in a fume cupboard and wear gloves and eye protection, keeping it away from flames because it is highly flammable. A safer solvent: methylbenzene (toluene).',
  sol: 'Carcinogen, toxic; fume cupboard, gloves; methylbenzene.',
  scheme: [['Two hazards', 1], ['Two precautions', 1], ['A safer solvent such as methylbenzene', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- long answers (5 marks, in parts)
add('struct-long', long({
  stem: '(a) Draw the two Kekulé structures of benzene and explain why benzene is described as a resonance hybrid. [2]\n\n(b) Describe the orbital structure of benzene: the hybridisation of carbon, the σ bonds and the π system. [2]\n\n(c) State Hückel\'s rule and show that benzene obeys it. [1]',
  model: '(a) The two structures are hexagons with alternating double and single bonds, differing only in the positions of the double bonds. Neither alone fits the facts (all C–C bonds equal, 139 pm); the real molecule is a hybrid of both, with the π electrons delocalised, and is more stable than either. (b) Each carbon is sp² hybridised and forms three σ bonds (two C–C and one C–H) in one plane at 120°, giving 12 σ bonds; the unhybridised p orbital on each carbon, perpendicular to the ring, overlaps sideways with its neighbours, forming a delocalised π cloud of 6 electrons above and below the ring. (c) A planar, cyclic, fully conjugated ring with (4n + 2) π electrons is aromatic; benzene has 6 π electrons, which is 4n + 2 with n = 1.',
  sol: 'Two Kekulé structures; sp² and π cloud; 4n + 2.',
  scheme: [['(a) two Kekulé structures', 1], ['(a) resonance hybrid, delocalisation', 1], ['(b) sp² and σ framework', 1], ['(b) six delocalised π electrons from the p orbitals', 1], ['(c) 4n + 2 and n = 1', 1]],
  d: 3, c: 'application', t: [1],
}));
add('prep-long', long({
  stem: '(a) Write balanced equations, with conditions, for the preparation of benzene from sodium benzoate and from phenol. [2]\n\n(b) Benzene melts at 5.5 °C, methylbenzene at −95 °C and cyclohexane at 6.5 °C, while their boiling points are 80.1, 110.6 and 80.7 °C. Explain why benzene and cyclohexane have similar boiling points and why benzene melts so much higher than methylbenzene. [2]\n\n(c) Cyclohexene decolourises bromine water at once but benzene does not. What does this show about the bonding in benzene? [1]',
  model: r`(a) $\ce{C6H5COONa + NaOH ->[CaO][heat] C6H6 + Na2CO3}$ (soda lime) and $\ce{C6H5OH + Zn -> C6H6 + ZnO}$ (phenol vapour over heated zinc dust). (b) Benzene and cyclohexane are both non-polar molecules of almost the same size and shape, so London forces and the boiling points are similar. Benzene is symmetrical and packs closely in the crystal, whereas the methyl group of methylbenzene breaks the symmetry and its packing is poorer, so it melts far lower. (c) Benzene has no isolated C=C bonds: its π electrons are delocalised over the ring, which gives it extra stability, so it does not undergo addition under these conditions.`,
  sol: 'Two preparations; similar size; symmetry; delocalisation.',
  scheme: [['(a) sodium benzoate equation', 1], ['(a) phenol equation', 1], ['(b) similar London forces for similar size', 1], ['(b) symmetry and packing for the melting point', 1], ['(c) delocalised π system, no isolated C=C', 1]],
  d: 3, c: 'application', t: [2],
}));
add('eas-long', long({
  stem: '(a) Write the mechanism of the nitration of benzene, showing the formation of the electrophile, the arenium ion and the final step. [3]\n\n(b) Write the equation for the bromination of benzene and name the catalyst. [1]\n\n(c) Write the equation for the Friedel–Crafts acylation of benzene with ethanoyl chloride. [1]',
  model: r`(a) $\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$ forms the nitronium ion. Slow step: the π electrons attack NO₂⁺ to give the arenium ion, in which the attacked carbon is sp³ (H and NO₂) and the + charge is spread over the ortho and para carbons. Fast step: loss of H⁺ from the sp³ carbon restores aromaticity, giving nitrobenzene. (b) $\ce{C6H6 + Br2 ->[FeBr3] C6H5Br + HBr}$; the catalyst is iron(III) bromide (or iron). (c) $\ce{C6H6 + CH3COCl ->[AlCl3] C6H5COCH3 + HCl}$.`,
  sol: 'Nitronium ion; arenium ion; bromobenzene; phenylethanone.',
  scheme: [['(a) formation of NO₂⁺', 1], ['(a) arenium ion with delocalised charge', 1], ['(a) loss of H⁺ to give nitrobenzene', 1], ['(b) equation and FeBr₃', 1], ['(c) equation', 1]],
  d: 3, c: 'application', t: [3],
}));
add('dir-long', long({
  stem: '(a) Classify each of –OH, –NO₂, –Cl and –CH₃ as ortho/para or meta directing, and as activating or deactivating. [2]\n\n(b) Using resonance forms of the arenium ion, explain why the nitro group directs the incoming electrophile to the meta position. [2]\n\n(c) Name the two main products of the mononitration of methylbenzene. [1]',
  model: '(a) –OH: ortho/para, activating; –CH₃: ortho/para, activating; –Cl: ortho/para, deactivating; –NO₂: meta, deactivating. (b) –NO₂ withdraws electrons (−I, −M). When the electrophile attacks the ortho or para position, one resonance form of the arenium ion has its positive charge on the carbon attached to the nitro group, next to the electron-poor N⁺, which is highly unstable. Attack at the meta position never puts the + on that carbon, so this destabilising form is absent and meta attack is favoured. (c) 2-nitromethylbenzene (o-nitrotoluene) and 4-nitromethylbenzene (p-nitrotoluene).',
  sol: 'Classification; + next to N⁺; o- and p-nitrotoluene.',
  scheme: [['(a) all four correctly classified', 2], ['(b) o/p attack puts + next to the nitro group', 1], ['(b) meta attack avoids this', 1], ['(c) ortho and para products', 1]],
  d: 3, c: 'analysis', t: [4],
}));
{
  const m = '7.80';
  const n = Number(m) / 78; // 0.100
  const vO2 = 7.5 * n * MV; // 16.8
  const vCO2 = 6 * n * MV; // 13.44
  add('add-long', long({
    stem: `(a) Write equations for the reaction of benzene with (i) hydrogen over nickel at 473 K and (ii) chlorine in ultraviolet light, naming the products. [2]\n\n(b) Name the product of ozonolysis of benzene (with zinc and water work-up) and say how many molecules of it form from one molecule of benzene. [1]\n\n(c) ${m} g of benzene is burnt completely in oxygen. Write the balanced equation and calculate the volume of oxygen consumed at STP. (C = 12, H = 1; molar volume ${MV} L) [2]`,
    model: `(a) (i) C₆H₆ + 3H₂ → C₆H₁₂ (cyclohexane); (ii) C₆H₆ + 3Cl₂ → C₆H₆Cl₆ (hexachlorocyclohexane, BHC). (b) Glyoxal (ethanedial), OHC–CHO; three molecules. (c) 2C₆H₆ + 15O₂ → 12CO₂ + 6H₂O. n(C₆H₆) = ${m} ÷ 78 = ${n.toFixed(3)} mol; n(O₂) = 7.5 × ${n.toFixed(3)} = ${(7.5 * n).toFixed(3)} mol; V = ${(7.5 * n).toFixed(3)} × ${MV} = ${vO2.toFixed(1)} L.`,
    sol: 'Cyclohexane and BHC; glyoxal; 16.8 L.',
    scheme: [['(a) two equations with product names', 2], ['(b) glyoxal, three molecules', 1], ['(c) balanced combustion equation', 1], ['(c) 16.8 L', 1]],
    d: 3, c: 'application', t: [5],
  }), () => near(vO2, 16.8, 0.001) && near(vCO2, 13.44, 0.001) || 'vO2');
}
add('evid-long', long({
  stem: 'A student states that benzene is cyclohexa-1,3,5-triene with three fixed double bonds.\n\n(a) Give two chemical observations that contradict this statement. [2]\n\n(b) State what the bond lengths in benzene show, and how many isomeric 1,2-dibromobenzenes the student\'s structure predicts. [1]\n\n(c) The enthalpy of hydrogenation of cyclohexene is −120 kJ mol⁻¹ and of benzene −208 kJ mol⁻¹. Use these values to show how the student\'s structure fails to predict the stability of benzene. [2]',
  model: '(a) Benzene does not decolourise bromine water or cold alkaline KMnO₄ (isolated C=C bonds would), and its typical reaction is substitution (for example nitration or bromination with FeBr₃) rather than addition. (b) All C–C bonds are 139 pm, equal and intermediate between single (154 pm) and double (134 pm) bonds; a fixed triene would give two different 1,2-dibromo isomers (one with Br on C=C, one on C–C), but only one is known. (c) Expected ΔH for three isolated C=C: 3 × (−120) = −360 kJ mol⁻¹, but benzene releases only −208, so benzene is 152 kJ mol⁻¹ more stable than the student\'s structure predicts (the resonance energy).',
  sol: 'No addition; equal bonds and one isomer; 152 kJ mol⁻¹ extra stability.',
  scheme: [['(a) two valid observations', 2], ['(b) equal bond lengths and one dibromo isomer', 1], ['(c) expected −360 kJ mol⁻¹ against −208', 1], ['(c) resonance energy 152 kJ mol⁻¹', 1]],
  d: 4, c: 'analysis', t: [1, 3],
}));
