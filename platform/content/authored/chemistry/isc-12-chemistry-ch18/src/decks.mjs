// ISC 12 Chemistry ch18 Carboxylic Acids — two decks: Part 1 (t01–t03) classification, nomenclature, structure,
// physical properties, preparation and acidity (aliphatic and aromatic, substituent effects); Part 2 (t04–t06)
// reactions with metals and bases, acid derivatives, decarboxylation, Kolbe electrolysis, HVZ, ring substitution,
// tests and uses of formic, acetic and benzoic acids.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { CARBOXYLATE } from './svgs.mjs';

export const V = {
  carboxylate: svgV(CARBOXYLATE, 'Two equivalent resonance structures of the carboxylate ion with the negative charge on either oxygen atom'),
};

export const deck1 = deck({
  part: 1,
  title: 'Carboxylic Acids — Part 1: Structure, preparation and acidity',
  goals: [
    'Classify and name mono- and dicarboxylic acids and describe the carboxyl group',
    'Explain high boiling points using hydrogen-bonded dimers',
    'Write equations to prepare aliphatic and aromatic acids from alcohols, aldehydes, nitriles and Grignard reagents',
    'Arrange acids in order of strength using inductive and resonance effects',
  ],
  slides: [
    sl('title', 'Carboxylic acids', {
      b: 'Part 1 — compounds with the –COOH group: names, structure, preparation and acid strength.',
      v: table(['Acid', 'Where you meet it'], [['Methanoic (formic) acid', 'Ant and nettle stings'], ['Ethanoic (acetic) acid', 'Vinegar (about 5%)'], ['Butanoic (butyric) acid', 'Smell of rancid butter'], ['Ethanedioic (oxalic) acid', 'Spinach, rhubarb; rust remover'], ['Benzoic acid', 'Food preservative (as sodium benzoate)']], 'Table of familiar carboxylic acids'),
      n: 'Namaste! The sting of an ant, the sourness of vinegar and the smell of rancid butter all come from carboxylic acids, compounds containing the carboxyl group, COOH. In this part we classify and name them, see why they boil so high, learn how to make them, and find out what makes some acids much stronger than others.',
    }),
    sl('concept', 'Classification and nomenclature', {
      b: '**Monocarboxylic** (CₙH₂ₙ₊₁COOH) and **dicarboxylic** acids; aliphatic and aromatic. IUPAC: replace -e by **-oic acid** (C of COOH = C-1); diacids: **-dioic acid**.',
      v: table(['Formula', 'Common name', 'IUPAC name'], [['HCOOH', 'Formic acid', 'Methanoic acid'], ['CH₃CH₂CH₂COOH', 'Butyric acid', 'Butanoic acid'], ['(CH₃)₂CHCOOH', 'Isobutyric acid', '2-Methylpropanoic acid'], ['HOOC–COOH', 'Oxalic acid', 'Ethanedioic acid'], ['HOOC(CH₂)₂COOH', 'Succinic acid', 'Butanedioic acid'], ['HOOC(CH₂)₄COOH', 'Adipic acid', 'Hexanedioic acid'], ['C₆H₄(COOH)₂ (1,2)', 'Phthalic acid', 'Benzene-1,2-dicarboxylic acid']], 'Table of names of carboxylic acids'),
      n: 'Monocarboxylic acids have one carboxyl group; dicarboxylic acids have two. The IUPAC name replaces the final e of the alkane with oic acid, numbering from the carboxyl carbon: two-methylpropanoic acid. Diacids end in dioic acid: oxalic acid is ethanedioic acid and adipic acid, used for nylon, is hexanedioic acid. Many common names come from natural sources: formic from ants, butyric from butter.',
    }),
    sl('concept', 'Structure and physical properties', {
      b: 'The carboxyl carbon is **sp²**; the –OH lone pair is delocalised into C=O, so the C=O is less reactive than in aldehydes. Acids form **hydrogen-bonded dimers** (even in the vapour), so they boil higher than alcohols of similar mass. C1–C4 acids are miscible with water; solubility falls with chain length. Lower acids have sharp smells; higher ones are waxy solids.',
      v: table(['Compound (M ≈ 60)', 'b.p. / K', 'Reason'], [['Propanal', '322', 'Dipole–dipole'], ['Propan-1-ol', '370', 'H-bonding (chains)'], ['Ethanoic acid', '391', 'H-bonded dimers']], 'Table of boiling points of compounds of similar mass'),
      n: 'In the carboxyl group, the carbon is sp two hybridised and the hydroxyl lone pair is shared with the carbonyl group, which makes the carbonyl less reactive than in aldehydes. Two acid molecules link through two hydrogen bonds to form a dimer, which behaves like a much larger molecule. That is why ethanoic acid boils higher than propan-one-ol of the same mass.',
    }),
    sl('check', 'Quick check: names and properties', {
      b: 'Name an acid or explain its boiling point.',
      n: 'Quick check. Diacids end in dioic acid; dimers explain high boiling points.',
      chk: 'name-mcq',
    }),
    sl('concept', 'Preparation of aliphatic acids', {
      b: '**Oxidation** of 1° alcohols and aldehydes (KMnO₄ or K₂Cr₂O₇ in acid). **Hydrolysis of nitriles** (H₃O⁺ or OH⁻, heat) — one carbon more than the alkyl halide. **Grignard reagent + CO₂** (dry ice), then H₃O⁺ — one carbon more. Also hydrolysis of esters, amides and acid chlorides.',
      m: [r`\ce{CH3CH2CH2CN + 2H2O + HCl -> CH3CH2CH2COOH + NH4Cl}`, r`\ce{CH3CH2CH2MgBr + CO2 -> CH3CH2CH2COOMgBr}`],
      v: table(['From', 'Reagent', 'Product'], [['Butan-1-ol', 'K₂Cr₂O₇/H⁺, reflux', 'Butanoic acid'], ['Propanal', 'KMnO₄/H⁺', 'Propanoic acid'], ['Propanenitrile', 'H₃O⁺, heat', 'Propanoic acid'], ['CH₃CH₂CH₂MgBr', 'CO₂; H₃O⁺', 'Butanoic acid']], 'Table of preparations of aliphatic acids'),
      n: 'Strong oxidation of primary alcohols and aldehydes gives carboxylic acids. Hydrolysing a nitrile with acid or alkali converts the CN group into COOH; since the nitrile was made from an alkyl halide and cyanide, the acid has one more carbon than the halide. Grignard reagents add to carbon dioxide, and acid work-up gives an acid, again with one extra carbon.',
    }),
    sl('concept', 'Preparation of aromatic acids', {
      b: '**Oxidation of alkylbenzenes** with hot alkaline KMnO₄ (then acid): any alkyl side chain with a benzylic H → –COOH. Also from **benzonitrile** (hydrolysis), **phenylmagnesium bromide + CO₂**, and oxidation of benzaldehyde or benzyl alcohol.',
      m: [r`\ce{C6H5MgBr + CO2 -> C6H5COOMgBr}`, r`\ce{C6H5CN + 2H2O + HCl -> C6H5COOH + NH4Cl}`],
      v: table(['Starting compound', 'Reagent', 'Product'], [['Ethylbenzene', 'KMnO₄/KOH, heat; H⁺', 'Benzoic acid'], ['Toluene', 'KMnO₄/KOH, heat; H⁺', 'Benzoic acid'], ['Benzonitrile', 'H₃O⁺, heat', 'Benzoic acid'], ['C₆H₅MgBr', 'Dry ice; H₃O⁺', 'Benzoic acid'], ['4-Methyltoluene (p-xylene)', 'KMnO₄', 'Benzene-1,4-dicarboxylic acid']], 'Table of preparations of aromatic acids'),
      n: 'For aromatic acids, hot alkaline potassium permanganate oxidises any alkyl side chain, whatever its length, down to a single carboxyl group on the ring, so toluene and ethylbenzene both give benzoic acid. Benzoic acid can also be made by hydrolysing benzonitrile or by adding carbon dioxide to phenylmagnesium bromide. Para-xylene gives terephthalic acid, used to make polyester.',
    }),
    sl('example', 'Worked example: planning a synthesis', {
      b: r`**Problem.** (a) Prepare butanoic acid from 1-bromopropane by two routes. (b) Prepare 4-methylbenzoic acid from 4-bromotoluene.

**(a)** Route 1: KCN (ethanol) → butanenitrile; H₃O⁺, heat → butanoic acid. Route 2: Mg, dry ether → $\ce{CH3CH2CH2MgBr}$; CO₂, then H₃O⁺ → butanoic acid.

**(b)** Mg, dry ether → 4-methylphenylmagnesium bromide; CO₂, then H₃O⁺ → 4-methylbenzoic acid. (KMnO₄ is not used: it would oxidise the methyl group too.)`,
      v: flow('LR', [['a', '1-Bromopropane (C₃)'], ['b', 'Butanenitrile'], ['c', 'Propylmagnesium bromide'], ['d', 'Butanoic acid (C₄)']], [['a', 'b', 'KCN'], ['b', 'd', 'H₃O⁺'], ['a', 'c', 'Mg'], ['c', 'd', 'CO₂, H₃O⁺']], 'Flow of two routes from 1-bromopropane to butanoic acid'),
      n: 'Both the nitrile and the Grignard routes add one carbon, so the three-carbon bromide gives the four-carbon acid. For four-methylbenzoic acid, the Grignard route converts only the bromine position into a carboxyl group and leaves the methyl group alone; permanganate would oxidise the methyl group as well, giving a diacid.',
    }),
    sl('check', 'Quick check: preparation', {
      b: 'Choose a route to a given carboxylic acid.',
      n: 'Quick check. Nitrile and Grignard routes add one carbon; permanganate cuts any side chain down to COOH.',
      chk: 'prep-mcq',
    }),
    sl('diagram', 'Why carboxylic acids are acidic', {
      b: r`$\ce{RCOOH + H2O <=> RCOO- + H3O+}$. The **carboxylate ion** is stabilised by **two equivalent resonance structures**: the charge is shared equally by two **oxygen** atoms (both C–O bonds 127 pm). Carboxylic acids (pKa ≈ 4–5) are stronger than phenols (≈ 10) and alcohols (≈ 16), and decompose NaHCO₃.`,
      v: V.carboxylate,
      n: 'When a carboxylic acid loses a proton, the negative charge on the carboxylate ion is shared equally between two electronegative oxygen atoms, through two identical resonance structures; both carbon to oxygen bonds become the same length. This stabilisation is greater than in the phenoxide ion, where the charge spreads onto less electronegative carbon atoms. So carboxylic acids are stronger than phenols and release carbon dioxide from hydrogencarbonates.',
    }),
    sl('concept', 'Substituent effects in aliphatic acids', {
      b: '**Electron-withdrawing** groups (−I: –F, –Cl, –NO₂, –CN) stabilise the carboxylate → **stronger acid**. Effect grows with the **number** and **electronegativity** of the groups and falls with **distance** from –COOH. **Electron-releasing** alkyl groups (+I) → weaker acid.',
      v: table(['Acid', 'pKa'], [['CCl₃COOH', '0.65'], ['CHCl₂COOH', '1.26'], ['FCH₂COOH', '2.66'], ['ClCH₂COOH', '2.86'], ['HCOOH', '3.75'], ['CH₃COOH', '4.76'], ['CH₃CH₂COOH', '4.88'], ['(CH₃)₃CCOOH', '5.05']], 'Table of pKa values of aliphatic acids'),
      n: 'Electron-withdrawing groups pull electron density away from the carboxylate and stabilise it, so the acid is stronger. Three chlorines make trichloroethanoic acid almost as strong as a mineral acid. Fluorine, being more electronegative, has a larger effect than chlorine. Alkyl groups push electrons in and make acids weaker, which is why methanoic acid, with none, is stronger than ethanoic acid.',
    }),
    sl('concept', 'Substituent effects in aromatic acids', {
      b: 'Benzoic acid (pKa 4.19) is stronger than ethanoic acid. Electron-withdrawing groups (–NO₂, –Cl) **increase** acidity; electron-donating groups (–CH₃, –OCH₃, –OH at para by +R) **decrease** it. Most **ortho**-substituted benzoic acids are stronger than benzoic acid whatever the group (**ortho effect**).',
      v: table(['Acid', 'pKa'], [['4-Nitrobenzoic', '3.41'], ['3-Nitrobenzoic', '3.45'], ['4-Chlorobenzoic', '3.98'], ['Benzoic', '4.19'], ['4-Methylbenzoic', '4.37'], ['4-Methoxybenzoic', '4.47'], ['2-Methylbenzoic', '3.91 (ortho effect)']], 'Table of pKa values of substituted benzoic acids'),
      n: 'The same ideas apply to benzoic acids. A nitro group withdraws electrons and makes four-nitrobenzoic acid stronger. Methyl and methoxy groups release electrons, especially at the para position, and make the acid weaker. Groups at the ortho position usually make the acid stronger, whatever their electronic nature; this is called the ortho effect and is partly due to the group twisting the carboxyl group out of the plane of the ring.',
    }),
    sl('example', 'Worked example: effect of distance', {
      b: r`**Problem.** Arrange in decreasing acid strength and explain: butanoic acid, 2-chlorobutanoic acid, 3-chlorobutanoic acid, 4-chlorobutanoic acid. (pKa: 4.82, 2.86, 4.05, 4.52)

**Step 1.** Cl withdraws electrons (−I), stabilising the carboxylate.

**Step 2.** The −I effect weakens rapidly with the number of bonds between Cl and –COOH.

**Order:** 2-chloro (2.86) > 3-chloro (4.05) > 4-chloro (4.52) > butanoic acid (4.82).`,
      v: table(['Acid', 'Position of Cl', 'pKa'], [['2-Chlorobutanoic', 'α (nearest)', '2.86'], ['3-Chlorobutanoic', 'β', '4.05'], ['4-Chlorobutanoic', 'γ', '4.52'], ['Butanoic', 'None', '4.82']], 'Table showing the effect of distance on acid strength'),
      n: 'All three chloro acids are stronger than butanoic acid, because chlorine withdraws electrons and stabilises the carboxylate. But the inductive effect fades quickly with distance. With chlorine on the carbon next to the carboxyl group, the effect is large; one carbon further away, much smaller; two carbons away, only slight.',
    }),
    sl('check', 'Quick check: acid strength', {
      b: 'Pick the strongest or weakest acid from a set.',
      n: 'Quick check. Count and locate the electron-withdrawing groups; alkyl groups weaken acids.',
      chk: 'acid-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Names: -oic acid; diacids -dioic acid (oxalic, succinic, adipic, phthalic).',
        'H-bonded dimers → high b.p.; C1–C4 miscible with water.',
        'Preparation: oxidation of 1° alcohols/aldehydes; nitrile hydrolysis; RMgX + CO₂; alkylbenzene + KMnO₄ → benzoic acid.',
        'Acidity from carboxylate resonance (two equivalent O); stronger than phenols; decompose NaHCO₃.',
        '−I groups increase acidity (more, closer, more electronegative); +I/+R groups decrease it; ortho effect.',
      ],
      v: table(['Acid', 'pKa'], [['CCl₃COOH', '0.65'], ['HCOOH', '3.75'], ['C₆H₅COOH', '4.19'], ['CH₃COOH', '4.76']], 'Summary table of pKa values'),
      n: 'Let us sum up Part 1. Carboxylic acids are named with the ending oic acid. Hydrogen-bonded dimers give them high boiling points. They are made by oxidation, by hydrolysing nitriles and from Grignard reagents and carbon dioxide; side chains on benzene rings are oxidised to carboxyl groups. Resonance in the carboxylate ion makes them acidic, and substituents raise or lower their strength.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'In acidity questions, name the effect (−I, +I, −R, +R) and its direction.',
        'State that −I weakens with distance.',
        'Nitrile and Grignard routes add one carbon; say so in synthesis answers.',
        'Draw both resonance structures of the carboxylate ion.',
      ],
      v: table(['Slip', 'Fix'], [['CH₃COOH stronger than HCOOH', 'HCOOH stronger'], ['4-Chlorobutanoic stronger than 2-chloro', 'Closer Cl is stronger'], ['KMnO₄ on propylbenzene gives propanoic acid', 'Gives benzoic acid']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. In acid-strength questions, name each electronic effect and say whether it increases or decreases acidity. Remember that the inductive effect weakens with distance. Point out that nitrile and Grignard routes add a carbon. And draw both resonance structures of the carboxylate ion when explaining acidity.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Carboxylic Acids — Part 2: Reactions, tests and uses',
  goals: [
    'Write reactions with active metals, alkalis, carbonates and hydrogencarbonates',
    'Write equations for forming acid chlorides, anhydrides, esters and amides',
    'Write decarboxylation, Kolbe electrolysis and HVZ reactions; predict ring substitution of benzoic acid',
    'Describe tests for and uses of formic, acetic and benzoic acids',
  ],
  slides: [
    sl('title', 'Reactions of carboxylic acids', {
      b: 'Part 2 — acidic reactions, acid derivatives, losing CO₂, α-halogenation, ring substitution, tests and uses.',
      v: flow('LR', [['a', 'RCOOH'], ['b', 'Acid reactions: Na, NaOH, Na₂CO₃, NaHCO₃'], ['c', 'Derivatives: RCOCl, (RCO)₂O, RCOOR′, RCONH₂'], ['d', 'Decarboxylation; Kolbe; HVZ'], ['e', 'Tests and uses']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['d', 'e']], 'Flow of the reactions in Part 2'),
      n: 'Carboxylic acids show typical acid reactions with metals, alkalis and carbonates. Replacing their hydroxyl group gives a family of derivatives: acid chlorides, anhydrides, esters and amides. Their salts can lose carbon dioxide, and their alpha hydrogens can be replaced by halogens. Finally we meet simple tests for formic, acetic and benzoic acids, and their uses.',
    }),
    sl('concept', 'Reactions as acids', {
      b: 'Carboxylic acids react with **active metals** (H₂), **alkalis** (salt + water), **carbonates** and **hydrogencarbonates** (CO₂ effervescence — a test that distinguishes them from phenols).',
      m: [r`\ce{2CH3COOH + 2Na -> 2CH3COONa + H2}`, r`\ce{2CH3COOH + Na2CO3 -> 2CH3COONa + H2O + CO2}`, r`\ce{C6H5COOH + NaHCO3 -> C6H5COONa + H2O + CO2}`],
      v: table(['Reagent', 'Products', 'Phenol reacts?'], [['Na', 'Salt + H₂', 'Yes'], ['NaOH', 'Salt + H₂O', 'Yes'], ['Na₂CO₃', 'Salt + H₂O + CO₂', 'No CO₂'], ['NaHCO₃', 'Salt + H₂O + CO₂', 'No']], 'Table of acidic reactions'),
      n: 'Carboxylic acids react with sodium to give hydrogen, and with alkalis to give salts and water. Unlike phenols, they are strong enough to decompose carbonates and hydrogencarbonates, releasing carbon dioxide with brisk effervescence. That makes sodium hydrogencarbonate a quick test to tell a carboxylic acid from a phenol.',
    }),
    sl('concept', 'Acid derivatives', {
      b: 'Replacing –OH gives derivatives. **Acid chlorides:** PCl₅, PCl₃ or SOCl₂. **Anhydrides:** heat with P₂O₅ (dehydration of two molecules). **Esters:** alcohol + conc. H₂SO₄ (reversible). **Amides:** NH₃ gives the ammonium salt, which loses water on heating.',
      m: [r`\ce{CH3COOH + SOCl2 -> CH3COCl + SO2 + HCl}`, r`\ce{3CH3COOH + PCl3 -> 3CH3COCl + H3PO3}`, r`\ce{2CH3COOH ->[P2O5][\Delta] (CH3CO)2O + H2O}`, r`\ce{CH3COONH4 ->[\Delta] CH3CONH2 + H2O}`],
      v: table(['Derivative', 'Reagent', 'Example'], [['Acid chloride', 'PCl₅, PCl₃, SOCl₂', 'Ethanoyl chloride'], ['Anhydride', 'P₂O₅, heat', 'Ethanoic anhydride'], ['Ester', 'R′OH, H⁺', 'Ethyl ethanoate'], ['Amide', 'NH₃, then heat', 'Ethanamide']], 'Table of acid derivatives'),
      n: 'Phosphorus chlorides and thionyl chloride convert carboxylic acids into acid chlorides, which are very reactive. Heating with phosphorus pentoxide removes water from two molecules to form an anhydride. Alcohols with concentrated sulphuric acid give esters. With ammonia, an ammonium salt forms first, which loses water on strong heating to give an amide.',
    }),
    sl('example', 'Worked example: derivatives of benzoic acid', {
      b: r`**Problem.** Give the product of benzoic acid with (a) SOCl₂; (b) ethanol + conc. H₂SO₄; (c) NH₃, then strong heating; (d) PCl₅.

**(a)** Benzoyl chloride, $\ce{C6H5COCl}$ (+ SO₂ + HCl).

**(b)** Ethyl benzoate, $\ce{C6H5COOC2H5}$.

**(c)** Benzamide, $\ce{C6H5CONH2}$ (via ammonium benzoate).

**(d)** Benzoyl chloride (+ POCl₃ + HCl).`,
      v: table(['Reagent', 'Product'], [['SOCl₂', 'Benzoyl chloride'], ['C₂H₅OH/H⁺', 'Ethyl benzoate'], ['NH₃; heat', 'Benzamide'], ['PCl₅', 'Benzoyl chloride']], 'Table of benzoic acid derivatives'),
      n: 'Benzoic acid forms the same derivatives as aliphatic acids. Thionyl chloride or phosphorus pentachloride gives benzoyl chloride. Ethanol with a little concentrated sulphuric acid gives ethyl benzoate, a pleasant-smelling ester. Ammonia gives ammonium benzoate, which on strong heating loses water to form benzamide.',
    }),
    sl('check', 'Quick check: acid and derivative reactions', {
      b: 'Predict the product of a carboxylic acid with a given reagent.',
      n: 'Quick check. Sodium hydrogencarbonate gives carbon dioxide; chlorinating agents give acid chlorides.',
      chk: 'deriv-mcq',
    }),
    sl('concept', 'Decarboxylation and Kolbe electrolysis', {
      b: '**Chemical decarboxylation:** sodium salt + **soda lime** (NaOH + CaO), heat → alkane with **one carbon fewer**. **Kolbe electrolysis:** electrolysis of an aqueous sodium/potassium salt; at the anode, carboxylate radicals lose CO₂ and **couple**: alkane with **2(n − 1)** carbons.',
      m: [r`\ce{CH3CH2COONa + NaOH ->[CaO][\Delta] CH3CH3 + Na2CO3}`, r`\ce{2CH3COONa + 2H2O ->[electrolysis] CH3CH3 + 2CO2 + 2NaOH + H2}`],
      v: table(['Salt', 'Soda lime gives', 'Kolbe electrolysis gives'], [['Sodium ethanoate', 'Methane', 'Ethane'], ['Sodium propanoate', 'Ethane', 'Butane'], ['Sodium benzoate', 'Benzene', '—']], 'Table of decarboxylation products'),
      n: 'Heating the sodium salt of an acid with soda lime removes the carboxyl group as carbonate, leaving an alkane with one carbon fewer: sodium propanoate gives ethane. In Kolbe electrolysis, carboxylate ions lose an electron and carbon dioxide at the anode, and the alkyl radicals join in pairs, so sodium ethanoate gives ethane and sodium propanoate gives butane. Hydrogen is released at the cathode.',
    }),
    sl('concept', 'Hell–Volhard–Zelinsky reaction', {
      b: 'Acids with **α-hydrogen** react with Cl₂ or Br₂ in the presence of a little **red phosphorus**: α-H is replaced by halogen, giving **α-halo acids**; further halogenation gives di- and tri-halo acids.',
      m: [r`\ce{CH3CH2COOH + Br2 ->[red P] CH3CHBrCOOH + HBr}`, r`\ce{CH3COOH + 3Cl2 ->[red P] CCl3COOH + 3HCl}`],
      v: table(['Acid', 'Reagent', 'Product'], [['Ethanoic', 'Cl₂, red P', 'Chloroethanoic acid'], ['Propanoic', 'Br₂, red P', '2-Bromopropanoic acid'], ['Ethanoic', 'excess Cl₂, red P', 'Trichloroethanoic acid'], ['Benzoic', 'Cl₂, red P', 'No α-H: no HVZ']], 'Table of HVZ reactions'),
      n: 'In the Hell–Volhard–Zelinsky reaction, chlorine or bromine with a little red phosphorus replaces a hydrogen on the carbon next to the carboxyl group. Propanoic acid gives two-bromopropanoic acid, and with excess chlorine ethanoic acid can be converted all the way to trichloroethanoic acid. Benzoic acid has no alpha hydrogen, so it does not react this way.',
    }),
    sl('concept', 'Ring substitution in benzoic acid', {
      b: '–COOH withdraws electrons (−I, −R): **deactivating** and **meta directing**. Nitration → 3-nitrobenzoic acid; bromination (Br₂/FeBr₃) → 3-bromobenzoic acid. Benzoic acid does **not** undergo Friedel–Crafts reactions (deactivated ring; –COOH complexes AlCl₃).',
      m: [r`\ce{C6H5COOH + HNO3 ->[conc. H2SO4] O2NC6H4COOH + H2O}`, r`\ce{C6H5COOH + Br2 ->[FeBr3] BrC6H4COOH + HBr}`],
      v: table(['Reaction', 'Major product'], [['Nitration', '3-Nitrobenzoic acid'], ['Bromination', '3-Bromobenzoic acid'], ['Sulphonation', '3-Sulphobenzoic acid'], ['Friedel–Crafts', 'No reaction']], 'Table of ring substitution of benzoic acid'),
      n: 'The carboxyl group pulls electrons out of the ring, so benzoic acid reacts more slowly than benzene in electrophilic substitution, and the new group goes to the meta position. Nitration gives three-nitrobenzoic acid and bromination three-bromobenzoic acid. Friedel–Crafts reactions fail, because the ring is deactivated and the carboxyl group ties up the aluminium chloride catalyst.',
    }),
    sl('example', 'Worked example: losing and gaining groups', {
      b: r`**Problem.** Name the product: (a) sodium butanoate + soda lime, heat; (b) Kolbe electrolysis of potassium propanoate; (c) butanoic acid + Br₂/red P; (d) benzoic acid + conc. HNO₃/H₂SO₄.

**(a)** Propane. **(b)** Butane (2 × ethyl).

**(c)** 2-Bromobutanoic acid. **(d)** 3-Nitrobenzoic acid.`,
      v: table(['Reaction', 'Product'], [['Soda lime', 'Propane (one C fewer)'], ['Kolbe electrolysis', 'Butane'], ['HVZ', '2-Bromobutanoic acid'], ['Nitration', '3-Nitrobenzoic acid']], 'Table of products'),
      n: 'Soda lime removes the carboxyl carbon, so sodium butanoate gives propane. In Kolbe electrolysis of propanoate, each ion loses carbon dioxide to give an ethyl radical, and two ethyl radicals join to form butane. Bromine with red phosphorus substitutes the alpha position, giving two-bromobutanoic acid. Nitration of benzoic acid goes meta.',
    }),
    sl('check', 'Quick check: decarboxylation and HVZ', {
      b: 'Predict the product of soda-lime heating, Kolbe electrolysis or the HVZ reaction.',
      n: 'Quick check. Soda lime: one carbon fewer. Kolbe: two alkyl groups joined. HVZ: halogen at the alpha carbon.',
      chk: 'decarb-mcq',
    }),
    sl('concept', 'Tests for formic, acetic and benzoic acids', {
      b: 'All three effervesce with NaHCO₃. **Formic acid** (H–COOH has an aldehyde-like H): reduces **Tollens’** reagent (silver mirror), **Fehling’s** (red ppt) and HgCl₂ (white ppt → grey). **Acetic acid:** neutral FeCl₃ → **deep red** colour (brown-red ppt on boiling); ester smell with ethanol/H₂SO₄. **Benzoic acid:** neutral FeCl₃ → **buff (pale brown) precipitate**; sublimes on heating.',
      m: [r`\ce{HCOOH + 2HgCl2 -> Hg2Cl2 + CO2 + 2HCl}`],
      v: table(['Test', 'Formic', 'Acetic', 'Benzoic'], [['NaHCO₃', 'CO₂', 'CO₂', 'CO₂'], ['Tollens’', 'Silver mirror', '—', '—'], ['Fehling’s', 'Red ppt', '—', '—'], ['Neutral FeCl₃', '—', 'Deep red colour', 'Buff ppt']], 'Table of tests for formic, acetic and benzoic acids'),
      n: 'All carboxylic acids fizz with sodium hydrogencarbonate. Formic acid is special: its hydrogen on the carboxyl carbon behaves like that of an aldehyde, so it reduces Tollens’ reagent, Fehling’s solution and mercury two chloride. With neutral iron three chloride, acetate gives a deep red colour, while benzoate gives a buff precipitate. These tests identify the three acids.',
    }),
    sl('concept', 'Uses', {
      b: 'Important uses of the three acids and related compounds.',
      v: table(['Acid', 'Uses'], [['Formic acid', 'Coagulating rubber latex; dyeing and tanning; antiseptic; preserving fruit juice'], ['Acetic acid', 'Vinegar; solvent; making cellulose acetate, acetic anhydride, esters'], ['Benzoic acid', 'Sodium benzoate food preservative; medicines (urinary antiseptic); making dyes'], ['Hexanedioic acid', 'Nylon-6,6'], ['Benzene-1,4-dicarboxylic acid', 'Polyester (terylene)']], 'Table of uses of carboxylic acids'),
      n: 'Formic acid is used to coagulate rubber latex and in dyeing and tanning. Acetic acid is vinegar, and is used to make cellulose acetate, acetic anhydride and esters. Benzoic acid, as sodium benzoate, preserves pickles and sauces. Hexanedioic acid is used to make nylon, and terephthalic acid to make polyester fibres.',
    }),
    sl('check', 'Quick check: tests', {
      b: 'Choose the test that distinguishes formic, acetic or benzoic acid.',
      n: 'Quick check. Formic acid reduces Tollens’ reagent; neutral iron three chloride gives different results with acetate and benzoate.',
      chk: 'test-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Na → H₂; NaOH → salt; Na₂CO₃/NaHCO₃ → CO₂ (not phenols).',
        'Derivatives: RCOCl (PCl₅, PCl₃, SOCl₂); (RCO)₂O (P₂O₅); RCOOR′ (R′OH, H⁺); RCONH₂ (NH₃, heat).',
        'Soda lime: alkane with one C fewer; Kolbe electrolysis: R–R; HVZ: α-halo acid (X₂, red P).',
        'Benzoic acid: meta substitution; no Friedel–Crafts.',
        'Formic acid reduces Tollens’/Fehling’s/HgCl₂; acetate + FeCl₃ red; benzoate + FeCl₃ buff ppt.',
      ],
      v: table(['Reaction', 'Ethanoic acid / salt gives'], [['Soda lime', 'Methane'], ['Kolbe electrolysis', 'Ethane'], ['Cl₂, red P', 'Chloroethanoic acid']], 'Summary table of reactions'),
      n: 'Let us sum up Part 2. Carboxylic acids react as acids with metals, alkalis and carbonates. Their hydroxyl group can be replaced to give acid chlorides, anhydrides, esters and amides. Their salts lose carbon dioxide with soda lime or on electrolysis, and their alpha hydrogens can be halogenated. Benzoic acid is substituted at the meta position, and simple tests distinguish formic, acetic and benzoic acids.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For Kolbe electrolysis, double the alkyl group after removing CO₂.',
        'HVZ needs α-H and red phosphorus.',
        'Formic acid is the only common acid that reduces Tollens’ reagent.',
        'Use NaHCO₃ to distinguish acids from phenols.',
      ],
      v: table(['Slip', 'Fix'], [['Kolbe of ethanoate gives methane', 'Gives ethane'], ['HVZ on benzoic acid', 'No α-H: no reaction'], ['Benzoic acid nitrates para', 'Meta']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. In Kolbe electrolysis, remove carbon dioxide and join two alkyl groups. Remember that the HVZ reaction needs an alpha hydrogen and red phosphorus. Formic acid is unique in reducing Tollens’ reagent. And sodium hydrogencarbonate distinguishes carboxylic acids from phenols.',
    }),
  ],
});
