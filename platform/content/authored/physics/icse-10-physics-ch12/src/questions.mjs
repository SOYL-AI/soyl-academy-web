// ICSE 10 Physics ch12 Radioactivity and Nuclear Energy — question bank (ICSE 2027 specimen style).
// Mass and atomic numbers in decay items are computed here and asserted. MCQ keys are placed by the builder.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const Nn = (A, Z, X) => String.raw`{}^{${A}}_{${Z}}\text{${X}}`;
const alpha = ([A, Z]) => [A - 4, Z - 2];
const beta = ([A, Z]) => [A, Z + 1];

// ---------------------------------------------------------------- t01 nucleus, Z, A, isotopes
add('count-mcq', mcq({
  stem: r`A nucleus of cobalt is written $${Nn(60, 27, 'Co')}$. It contains:`,
  right: '27 protons and 33 neutrons',
  wrong: ['33 protons and 27 neutrons', '27 protons and 60 neutrons', '60 protons and 27 neutrons'],
  sol: 'Protons = Z = 27; neutrons = A − Z = 60 − 27 = 33 — option (@K).',
  d: 1, c: 'application', t: [1],
}), () => 60 - 27 === 33 || 'N');
add('isotope-mcq', mcq({
  stem: 'Which pair are isotopes of the same element?',
  right: r`$${Nn(35, 17, 'Cl')}$ and $${Nn(37, 17, 'Cl')}$`,
  wrong: [r`$${Nn(40, 18, 'Ar')}$ and $${Nn(40, 20, 'Ca')}$`, r`$${Nn(14, 6, 'C')}$ and $${Nn(14, 7, 'N')}$`, r`$${Nn(23, 11, 'Na')}$ and $${Nn(24, 12, 'Mg')}$`],
  sol: 'Same atomic number (17), different mass numbers — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chem-mcq', mcq({
  stem: 'Carbon-12 and carbon-14 have the same chemical properties because they have the same:',
  right: 'number of protons and electrons',
  wrong: ['number of neutrons', 'mass number', 'nuclear stability'],
  sol: 'Chemistry depends on electrons, fixed by Z — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const nNa = 24 - 11;
add('neutron-num', num({
  stem: 'How many neutrons are present in a nucleus of sodium-24 (Z = 11)?',
  value: nNa, tol: 0, unit: null,
  sol: `Neutrons $= A - Z = 24 - 11 = ${nNa}$.`,
  scheme: [[String(nNa), 1]],
  d: 1, c: 'application', t: [1],
}), () => nNa === 13 || 'N');
add('isotope-tf', tf({
  stem: 'Deuterium and tritium are isotopes of hydrogen with different numbers of protons.',
  key: 'f',
  sol: 'False: they have the same number of protons (1) but different numbers of neutrons (1 and 2).',
  d: 1, c: 'understanding', t: [1],
}));
add('Z-fill', fill({
  stem: 'The number of protons in the nucleus of an atom is called its ___ number.',
  acc: [['atomic']],
  sol: '**Atomic** number.',
  d: 1, c: 'recall', t: [1],
}));
add('iso-short2', short({
  marks: 2,
  stem: r`Define isotopes. State the number of protons and neutrons in $${Nn(16, 8, 'O')}$ and $${Nn(18, 8, 'O')}$.`,
  model: 'Isotopes are atoms of one element having the same atomic number but different mass numbers. Oxygen-16: 8 protons, 8 neutrons; oxygen-18: 8 protons, 10 neutrons.',
  sol: 'Same Z, different A; 8/8 and 8/10.',
  scheme: [['Definition', 1], ['Counts', 1]],
  d: 2, c: 'application', t: [1],
}), () => 16 - 8 === 8 && 18 - 8 === 10 || 'N');

// ---------------------------------------------------------------- t02 radiations
add('prop-mcq', mcq({
  stem: 'Which radiation has the greatest ionising power but is stopped by a sheet of paper?',
  right: 'Alpha particles',
  wrong: ['Beta particles', 'Gamma rays', 'X-rays'],
  sol: 'α: most ionising, least penetrating — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('field-mcq', mcq({
  stem: 'A beam containing α, β and γ radiation passes between two oppositely charged plates. The radiation bent most strongly is:',
  right: 'β, towards the positive plate',
  wrong: ['α, towards the positive plate', 'γ, towards the negative plate', 'α, towards the negative plate'],
  sol: 'β particles are charged and very light, so they bend most, towards the + plate — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gamma-mcq', mcq({
  stem: 'Gamma radiation differs from alpha and beta radiation because gamma radiation:',
  right: 'is an electromagnetic wave with no charge and no mass',
  wrong: ['is a stream of helium nuclei', 'is a stream of electrons', 'is stopped by a thin sheet of paper'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('temp-mcq', mcq({
  stem: 'A sample of radium salt is heated strongly in a furnace. Its radioactivity:',
  right: 'is unchanged, because radioactivity is a nuclear process',
  wrong: ['increases, because the nuclei move faster', 'decreases, because the salt decomposes', 'stops completely'],
  sol: 'Physical and chemical conditions do not affect the nucleus — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ion-ar', ar({
  a: 'Alpha particles have a very short range in air.',
  r: 'Alpha particles ionise the air strongly and lose their energy quickly.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('beta-ar', ar({
  a: 'Beta particles are deflected more than alpha particles in the same electric field.',
  r: 'Beta particles carry a larger charge than alpha particles.',
  key: 'a',
  sol: 'A is true; R is false: β carries −e, α carries +2e; β bends more because it is far lighter — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('gamma-tf', tf({
  stem: 'Gamma rays are not deflected by a magnetic field.',
  key: 't',
  sol: 'True: they carry no charge.',
  d: 1, c: 'understanding', t: [2],
}));
add('alpha-fill', fill({
  stem: 'An alpha particle is the nucleus of a ___ atom.',
  acc: [['helium']],
  sol: '**Helium**.',
  d: 1, c: 'recall', t: [2],
}));
add('pen-fill', fill({
  stem: 'Of α, β and γ radiations, the most penetrating is ___.',
  acc: [['γ', 'gamma', 'gamma rays']],
  sol: '**γ** (gamma).',
  d: 1, c: 'recall', t: [2],
}));
add('radio-short1', short({
  marks: 1,
  stem: 'Define radioactivity.',
  model: 'The spontaneous disintegration of the nuclei of unstable atoms with the emission of alpha, beta or gamma radiation.',
  sol: 'Definition.',
  scheme: [['Definition with “spontaneous”', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('compare-short2', short({
  marks: 2,
  stem: 'Compare α particles and γ rays with respect to (a) charge, (b) mass, (c) ionising power and (d) penetrating power.',
  model: '(a) α: +2e; γ: none. (b) α: 4 u; γ: none. (c) α: very high; γ: very low. (d) α: very low (stopped by paper); γ: very high (several cm of lead).',
  sol: 'Four comparisons.',
  scheme: [['(a) and (b)', 1], ['(c) and (d)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('identify-short3', short({
  marks: 3,
  stem: 'Radiation X passes through paper and 1 cm of aluminium and is not bent between charged plates. Radiation Y is stopped by paper and bends slightly towards the negative plate. Radiation Z passes through paper, is stopped by 5 mm of aluminium and bends sharply towards the positive plate. Identify X, Y and Z with a reason for each.',
  model: 'X: γ rays (very penetrating, uncharged). Y: α particles (least penetrating, positive and heavy, so small deflection towards −). Z: β particles (stopped by aluminium, negative and light, so large deflection towards +).',
  sol: 'γ, α, β.',
  scheme: [['X', 1], ['Y', 1], ['Z', 1]],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 changes in the nucleus
const po = alpha([210, 84]);
add('decay-mcq', mcq({
  stem: r`Polonium-210, $${Nn(210, 84, 'Po')}$, emits an α particle. The new nucleus has:`,
  right: `A = ${po[0]}, Z = ${po[1]}`,
  wrong: ['A = 210, Z = 85', 'A = 206, Z = 84', 'A = 208, Z = 82'],
  sol: `α emission: $A - 4 = ${po[0]}$, $Z - 2 = ${po[1]}$ (lead) — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => po[0] === 206 && po[1] === 82 || 'alpha');
const sr = beta([90, 38]);
add('betadecay-mcq', mcq({
  stem: 'Strontium-90 (Z = 38) is a β emitter. The daughter nucleus has:',
  right: `A = ${sr[0]}, Z = ${sr[1]}`,
  wrong: ['A = 90, Z = 37', 'A = 86, Z = 36', 'A = 89, Z = 39'],
  sol: `β emission: A unchanged, $Z + 1 = ${sr[1]}$ (yttrium) — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => sr[0] === 90 && sr[1] === 39 || 'beta');
add('gammachange-mcq', mcq({
  stem: 'When a nucleus emits a γ ray only, its:',
  right: 'mass number and atomic number both stay the same',
  wrong: ['atomic number increases by 1', 'mass number decreases by 4', 'atomic number decreases by 2'],
  sol: 'γ emission only releases energy — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
let th = [232, 90];
th = alpha(th);
th = beta(th);
th = beta(th);
add('series-num', num({
  stem: 'Thorium-232 (Z = 90) emits one α particle followed by two β particles. What is the atomic number of the final nucleus?',
  value: th[1], tol: 0, unit: null,
  sol: `After α: $Z = 90 - 2 = 88$; after two β: $Z = 88 + 1 + 1 = ${th[1]}$ (A = ${th[0]}).`,
  scheme: [[String(th[1]), 1]],
  d: 3, c: 'application', t: [3],
}), () => th[1] === 90 && th[0] === 228 || 'Z');
let u = [238, 92];
for (let i = 0; i < 3; i++) u = alpha(u);
add('massno-num', num({
  stem: 'Uranium-238 (Z = 92) emits three α particles in succession. What is the mass number of the resulting nucleus?',
  value: u[0], tol: 0, unit: null,
  sol: `Each α lowers A by 4: $A = 238 - 3 \\times 4 = ${u[0]}$.`,
  scheme: [[String(u[0]), 1]],
  d: 2, c: 'application', t: [3],
}), () => u[0] === 226 && u[1] === 86 || 'A');
add('beta-tf', tf({
  stem: 'In β decay, a neutron in the nucleus changes into a proton and an electron, and the electron is emitted.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'understanding', t: [3],
}));
add('decay-ar', ar({
  a: 'After α emission, the daughter element lies two places before the parent in the periodic table.',
  r: 'α emission reduces the atomic number by 2.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'application', t: [3],
}));
add('Zchange-fill', fill({
  stem: 'In β decay the atomic number of the nucleus increases by ___. (Write a number.)',
  acc: [['1', 'one']],
  sol: '**1**.',
  d: 1, c: 'recall', t: [3],
}));
add('ra-short1', short({
  marks: 1,
  stem: r`Complete: $${Nn(226, 88, 'Ra')} \rightarrow {}^{?}_{?}\text{Rn} + {}^{4}_{2}\text{He}$.`,
  model: r`$${Nn(222, 86, 'Rn')}$.`,
  sol: 'A = 222, Z = 86.',
  scheme: [['A and Z', 1]],
  d: 2, c: 'application', t: [3],
}), () => 226 - 4 === 222 && 88 - 2 === 86 || 'Rn');
add('decay-short2', short({
  marks: 2,
  stem: r`Write balanced equations for (a) the β decay of $${Nn(24, 11, 'Na')}$ to magnesium and (b) the α decay of $${Nn(238, 92, 'U')}$ to thorium.`,
  model: r`(a) $${Nn(24, 11, 'Na')} \rightarrow ${Nn(24, 12, 'Mg')} + {}^{0}_{-1}e$. (b) $${Nn(238, 92, 'U')} \rightarrow ${Nn(234, 90, 'Th')} + {}^{4}_{2}\text{He}$.`,
  sol: 'Two balanced equations.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 uses, hazards, safety
add('use-mcq', mcq({
  stem: 'Which radioisotope is used in hospitals as a source of γ rays to destroy cancer cells?',
  right: 'Cobalt-60',
  wrong: ['Carbon-14', 'Phosphorus-32', 'Iodine-131'],
  sol: 'Co-60 is used in radiotherapy — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('safety-mcq', mcq({
  stem: 'A laboratory assistant must move a small radioactive source from its storage box. The safest way is to:',
  right: 'lift it with long tongs, keep it away from the body and return it quickly to its lead box',
  wrong: ['pick it up with bare hands, since the dose is small', 'wrap it in paper to stop all its radiation', 'carry it in a pocket to keep it safe'],
  sol: 'Distance, short time and shielding — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('bg-mcq', mcq({
  stem: 'Which is a NATURAL source of background radiation?',
  right: 'Radon gas seeping from granite rocks',
  wrong: ['A hospital X-ray machine', 'Fallout from a nuclear test', 'A smoke-detector source'],
  sol: 'Radon comes from radioactive decay in rocks — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('thick-mcq', mcq({
  stem: 'A factory checks the thickness of aluminium foil by placing a radioactive source on one side and a detector on the other. The best type of source is:',
  right: 'β, because the amount absorbed changes noticeably with small changes in thickness',
  wrong: ['α, because it passes through thick metal', 'γ, because it is easily stopped by thin foil', 'α, because it is not ionising'],
  sol: 'α would be fully stopped; γ would hardly be affected — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('harm-ar', ar({
  a: 'Exposure to radiation can cause genetic disorders in later generations.',
  r: 'Radiation can damage the DNA in reproductive cells.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('xray-tf', tf({
  stem: 'X-rays come from the nucleus of an atom, like gamma rays.',
  key: 'f',
  sol: 'False: X-rays are produced outside the nucleus (by fast electrons hitting a target), though both are ionising electromagnetic waves.',
  d: 3, c: 'understanding', t: [4],
}));
add('badge-fill', fill({
  stem: 'Workers in nuclear plants wear a ___ badge to record the radiation dose they receive.',
  acc: [['film', 'dosimeter']],
  sol: '**Film** badge (dosimeter).',
  d: 1, c: 'recall', t: [4],
}));
add('use-short2', short({
  marks: 2,
  stem: 'Give one use of a radioisotope in (a) medicine, (b) agriculture, (c) industry and (d) archaeology.',
  model: '(a) Co-60 to treat cancer (or I-131 for the thyroid). (b) P-32 as a tracer to study fertiliser uptake. (c) γ sources to find flaws in welds or leaks in pipes. (d) C-14 to date ancient wood and bones.',
  sol: 'Four uses.',
  scheme: [['(a) and (b)', 1], ['(c) and (d)', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('safety-short2', short({
  marks: 2,
  stem: 'State four safety precautions to be taken while handling radioactive materials.',
  model: 'Handle sources with long tongs; store them in thick lead containers; wear lead aprons and film badges; keep exposure time short and distance large; never eat or drink in the laboratory (any four).',
  sol: 'Four precautions.',
  scheme: [['Two precautions', 1], ['Two more precautions', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('bg-short1', short({
  marks: 1,
  stem: 'Name two sources of background radiation.',
  model: 'Cosmic rays from space; radioactive rocks and soil (radon gas); also potassium-40 in food, medical X-rays.',
  sol: 'Any two.',
  scheme: [['Two sources', 1]],
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t05 fission, fusion, waste
add('fission-mcq', mcq({
  stem: 'In a nuclear power station, energy is obtained from:',
  right: 'the fission of uranium-235 nuclei by slow neutrons in a controlled chain reaction',
  wrong: ['the fusion of hydrogen nuclei at room temperature', 'the burning of uranium in oxygen', 'the radioactive decay of carbon-14'],
  sol: 'Controlled fission chain reaction — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
const xKr = 235 + 1 - 141 - 3;
add('balance-mcq', mcq({
  stem: r`In the fission $${Nn(235, 92, 'U')} + {}^{1}_{0}n \rightarrow ${Nn(141, 56, 'Ba')} + {}^{x}_{36}\text{Kr} + 3\,{}^{1}_{0}n$, the value of x is:`,
  right: String(xKr),
  wrong: ['95', '94', '89'],
  sol: `Mass numbers: $235 + 1 = 141 + x + 3$, so $x = ${xKr}$ — option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => xKr === 92 || 'x');
add('sun-mcq', mcq({
  stem: 'The Sun produces its energy mainly by:',
  right: 'fusion of hydrogen nuclei into helium at very high temperature',
  wrong: ['fission of uranium nuclei', 'burning of coal and gas', 'radioactive decay of radium'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('fusion-mcq', mcq({
  stem: 'Nuclear fusion needs a temperature of millions of kelvin because:',
  right: 'the positively charged nuclei must move fast enough to overcome their electrical repulsion',
  wrong: ['the nuclei must first be melted', 'neutrons are produced only at high temperature', 'the electrons must be removed by chemical reactions'],
  sol: 'Option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
const yHe = 1 + 1;
add('fusionZ-num', num({
  stem: 'In the fusion reaction ²₁H + ²₁H → ³ᵧHe + ¹₀n, what is the value of y (the atomic number of the helium nucleus formed)?',
  value: yHe, tol: 0, unit: null,
  sol: `Atomic numbers balance: $1 + 1 = y + 0$, so $y = ${yHe}$.`,
  scheme: [[String(yHe), 1]],
  d: 2, c: 'application', t: [5],
}), () => yHe === 2 || 'y');
add('chain-ar', ar({
  a: 'A chain reaction can take place in uranium-235.',
  r: 'Each fission of uranium-235 releases two or three neutrons, which can cause further fissions.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('waste-ar', ar({
  a: 'Nuclear waste can be safely dumped in rivers after a few days.',
  r: 'Many products of fission remain radioactive for thousands of years.',
  key: 'b',
  sol: 'A is false: waste must be sealed and stored deep underground; R is true — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('fusion-tf', tf({
  stem: 'Fusion releases more energy per kilogram of fuel than fission.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'recall', t: [5],
}));
add('chain-fill', fill({
  stem: 'A self-sustaining series of fissions, in which neutrons from one fission cause further fissions, is called a ___ reaction.',
  acc: [['chain']],
  sol: '**Chain** reaction.',
  d: 1, c: 'recall', t: [5],
}));
add('fission-short1', short({
  marks: 1,
  stem: 'Define nuclear fusion.',
  model: 'The process in which two light nuclei combine to form a heavier nucleus, with the release of a large amount of energy.',
  sol: 'Definition.',
  scheme: [['Definition', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('ff-short2', short({
  marks: 2,
  stem: 'Distinguish nuclear fission from nuclear fusion with respect to (a) what happens to the nuclei and (b) the conditions needed. Give one example of each.',
  model: '(a) Fission: a heavy nucleus (U-235) splits into two lighter nuclei; fusion: light nuclei (isotopes of hydrogen) join to form a heavier one (helium). (b) Fission: bombardment by slow neutrons; fusion: extremely high temperature (millions of kelvin). Examples: nuclear reactor or atom bomb (fission); the Sun or hydrogen bomb (fusion).',
  sol: 'Split vs join; neutrons vs high temperature.',
  scheme: [['(a)', 1], ['(b) with examples', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('waste-short2', short({
  marks: 2,
  stem: 'Why must nuclear waste be disposed of with great care? Describe one method of safe disposal.',
  model: 'It remains strongly radioactive (and hot) for thousands of years; leaks into soil, water or air would cause cancers and genetic damage. It is first cooled in water ponds, then sealed in glass or steel containers encased in concrete and buried deep underground in stable rock away from water.',
  sol: 'Long-lived radioactivity; sealed deep storage.',
  scheme: [['Reason', 1], ['Method', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- additional application items
const nU = 235 - 92;
add('neutron2-num', num({
  stem: 'How many neutrons are there in a nucleus of uranium-235 (Z = 92)?',
  value: nU, tol: 0, unit: null,
  sol: `Neutrons $= A - Z = 235 - 92 = ${nU}$.`,
  scheme: [[String(nU), 1]],
  d: 1, c: 'application', t: [1],
}), () => nU === 143 || 'N');
const bi = beta([210, 83]);
add('bi-mcq', mcq({
  stem: 'Bismuth-210 (Z = 83) emits a β particle. The product is:',
  right: `polonium-${bi[0]} (Z = ${bi[1]})`,
  wrong: ['lead-210 (Z = 82)', 'thallium-206 (Z = 81)', 'bismuth-206 (Z = 83)'],
  sol: `β emission: A unchanged, Z + 1 = ${bi[1]} — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => bi[0] === 210 && bi[1] === 84 || 'beta');
add('parent-mcq', mcq({
  stem: 'A nucleus formed by α emission has A = 222 and Z = 86. The parent nucleus had:',
  right: 'A = 226, Z = 88',
  wrong: ['A = 218, Z = 84', 'A = 222, Z = 87', 'A = 226, Z = 84'],
  sol: 'Add back the α particle: A + 4, Z + 2 — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => 222 + 4 === 226 && 86 + 2 === 88 || 'parent');
const nAlpha = (238 - 206) / 4;
const nBeta = 2 * nAlpha - (92 - 82);
add('alphacount-num', num({
  stem: 'Uranium-238 (Z = 92) finally changes into stable lead-206 (Z = 82) through a series of α and β emissions. How many α particles are emitted in all?',
  value: nAlpha, tol: 0, unit: null,
  sol: `Only α changes A: number of α $= (238 - 206) \\div 4 = ${nAlpha}$.`,
  scheme: [[String(nAlpha), 1]],
  d: 4, c: 'analysis', t: [3],
}), () => nAlpha === 8 || 'alpha');
add('betacount-num', num({
  stem: 'In the decay of uranium-238 (Z = 92) to lead-206 (Z = 82), 8 α particles are emitted. How many β particles are emitted?',
  value: nBeta, tol: 0, unit: null,
  sol: `8 α lower Z by 16, to 76; to reach 82, Z must rise by 6, so number of β $= 82 - 76 = ${nBeta}$.`,
  scheme: [[String(nBeta), 1]],
  d: 4, c: 'analysis', t: [3],
}), () => nBeta === 6 || 'beta');
add('tracer-mcq', mcq({
  stem: 'A doctor wants to follow the flow of blood through a patient’s veins with a detector held outside the body. A suitable tracer is a radioisotope that:',
  right: 'emits γ rays (detectable through tissue) and decays away within a short time',
  wrong: ['emits only α particles and lasts for thousands of years', 'is not radioactive', 'emits only β particles that are stopped by the skin'],
  sol: 'γ rays escape the body; a short life limits the dose (for example sodium-24) — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('inside-short2', short({
  marks: 2,
  stem: 'An α source kept outside the body is fairly safe, but the same source swallowed is very dangerous. Explain. Why are radioactive sources stored in thick lead boxes?',
  model: 'Outside the body, α particles are stopped by air or the dead outer layer of skin; inside, they are absorbed by living cells and, being strongly ionising, cause severe damage. Lead boxes absorb β and γ radiation, protecting people nearby.',
  sol: 'Range and ionisation; lead absorbs radiation.',
  scheme: [['α inside vs outside', 1], ['Lead box', 1]],
  d: 3, c: 'application', t: [2, 4],
}));

// ---------------------------------------------------------------- match items
add('rad-match', match({
  marks: 2,
  stem: 'Match each radiation or particle in Column A with its description in Column B.',
  pairs: [
    ['α particle', 'Helium nucleus'],
    ['β particle', 'Fast electron from the nucleus'],
    ['γ ray', 'Electromagnetic wave'],
    ['Neutron', 'Causes fission of U-235'],
  ],
  order: [2, 0, 3, 1],
  sol: 'α → helium nucleus; β → electron; γ → EM wave; neutron → causes fission.',
  d: 1, c: 'recall', t: [2, 5],
}));
add('use-match', match({
  marks: 2,
  stem: 'Match each radioisotope in Column A with its main use in Column B.',
  pairs: [
    ['Cobalt-60', 'Cancer radiotherapy'],
    ['Carbon-14', 'Dating ancient wood'],
    ['Iodine-131', 'Thyroid treatment'],
    ['Phosphorus-32', 'Tracing fertiliser uptake'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Co-60 → radiotherapy; C-14 → dating; I-131 → thyroid; P-32 → fertiliser tracer.',
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('nucleus-long', long({
  stem: r`(a) Define atomic number, mass number and isotopes. [3]\n\n(b) For $${Nn(39, 19, 'K')}$ and $${Nn(40, 19, 'K')}$, state (i) the number of protons, (ii) the number of neutrons in each, and (iii) the relationship between them. [3]\n\n(c) What is radioactivity? Name three radioactive elements and state two factors that do NOT affect the rate of radioactive decay. [4]`,
  model: '(a) Atomic number: number of protons in the nucleus. Mass number: total number of protons and neutrons. Isotopes: atoms of the same element with the same atomic number but different mass numbers.\n\n(b) (i) 19 each. (ii) K-39: 20; K-40: 21. (iii) They are isotopes.\n\n(c) The spontaneous disintegration of unstable nuclei with emission of α, β or γ radiation. Uranium, radium, thorium (or polonium). Not affected by temperature, pressure, or chemical combination (any two).',
  sol: 'Definitions; counts; radioactivity.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c) definition', 1], ['(c) three elements', 1.5], ['(c) two factors', 1.5]],
  d: 2, c: 'understanding', t: [1, 2],
}), () => 39 - 19 === 20 && 40 - 19 === 21 || 'N');
add('radiation-long', long({
  stem: '(a) Give the nature of α, β and γ radiations. [3]\n\n(b) Compare them in (i) ionising power, (ii) penetrating power and (iii) deflection in an electric field. [3]\n\n(c) A radioactive source is placed in front of a detector. The count rate is unchanged when a sheet of paper is inserted, falls sharply when 3 mm of aluminium is inserted, and falls only a little more when 2 cm of lead is added. (i) Which radiations are present? (ii) Which is absent? Give reasons. (iii) Which of the radiations present would be deflected by a magnetic field? [4]',
  model: '(a) α: helium nuclei (+2e, 4 u). β: fast electrons emitted from the nucleus (−e). γ: electromagnetic waves of very short wavelength (no charge, no mass).\n\n(b) (i) α > β > γ. (ii) γ > β > α. (iii) α bends towards the negative plate, β more strongly towards the positive plate, γ undeflected.\n\n(c) (i) β (absorbed by aluminium) and γ (passes through aluminium; reduced a little by lead). (ii) α: paper caused no drop, so no α is present. (iii) Only β (γ is uncharged).',
  sol: 'Nature; comparison; analysis of absorption data.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 4, c: 'analysis', t: [2],
}));
let s1 = [232, 90];
s1 = alpha(s1);
const s1b = beta(s1);
const s1c = beta(s1b);
const s1d = alpha(s1c);
add('decay-long', long({
  stem: r`(a) State the changes in mass number and atomic number when a nucleus emits (i) an α particle, (ii) a β particle and (iii) a γ ray. [3]\n\n(b) Explain how a nucleus can emit an electron although it contains no electrons. Write a balanced equation for the β decay of $${Nn(32, 15, 'P')}$ to sulphur. [3]\n\n(c) $${Nn(232, 90, 'Th')}$ decays by the sequence α, β, β, α. Find A and Z after each step and name the element at the end (Z = 88 radium, 89 actinium, 90 thorium). [4]`,
  model: `(a) (i) A − 4, Z − 2. (ii) A unchanged, Z + 1. (iii) No change.\n\n(b) A neutron in the nucleus changes into a proton and an electron; the electron is emitted at high speed as a β particle. $${Nn(32, 15, 'P')} \\rightarrow ${Nn(32, 16, 'S')} + {}^{0}_{-1}e$.\n\n(c) α: A = ${s1[0]}, Z = ${s1[1]}; β: A = ${s1b[0]}, Z = ${s1b[1]}; β: A = ${s1c[0]}, Z = ${s1c[1]}; α: A = ${s1d[0]}, Z = ${s1d[1]} — radium-${s1d[0]}.`,
  sol: 'Rules; origin of β; decay sequence.',
  scheme: [['(a)', 3], ['(b) explanation', 2], ['(b) equation', 1], ['(c) steps', 3], ['(c) element', 1]],
  d: 3, c: 'application', t: [3],
}), () => s1d[0] === 224 && s1d[1] === 88 || 'series');
add('uses-long', long({
  stem: '(a) Give two uses of radioisotopes in medicine and two in industry. [3]\n\n(b) What is background radiation? Name two natural and one man-made source. [3]\n\n(c) (i) State three harmful effects of radiation on the human body. (ii) Describe three precautions in a laboratory using radioactive sources. (iii) What is radioactive fallout? [4]',
  model: '(a) Medicine: Co-60 radiotherapy for cancer; I-131 for thyroid diagnosis or treatment (also sterilising instruments). Industry: detecting leaks in buried pipes; checking welds or thickness of sheets.\n\n(b) Low-level radiation always present around us. Natural: cosmic rays, radioactive rocks and soil (radon), K-40 in the body. Man-made: medical X-rays (or fallout).\n\n(c) (i) Burns, radiation sickness, cancer (leukaemia), genetic mutations (any three). (ii) Use long tongs; store in lead containers; wear lead aprons and film badges; limit time and keep distance (any three). (iii) Radioactive dust and particles spread by nuclear explosions or reactor accidents that settle over large areas.',
  sol: 'Uses; background radiation; hazards and safety.',
  scheme: [['(a)', 3], ['(b) definition', 1], ['(b) sources', 2], ['(c)(i)', 1.5], ['(c)(ii)', 1.5], ['(c)(iii)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const xB = 235 + 1 - 92 - 2;
add('energy-long', long({
  stem: r`(a) What is nuclear fission? What is a chain reaction, and how is it used in a reactor and in an atom bomb? [3]\n\n(b) In the fission $${Nn(235, 92, 'U')} + {}^{1}_{0}n \rightarrow {}^{x}_{y}\text{Xe} + ${Nn(92, 38, 'Sr')} + 2\,{}^{1}_{0}n$, find x and y. [3]\n\n(c) (i) What is nuclear fusion? (ii) Why does it occur naturally in the Sun but not on Earth? (iii) Give one advantage of fusion over fission. (iv) Why must fission waste be stored deep underground? [4]`,
  model: `(a) The splitting of a heavy nucleus into two lighter nuclei of comparable mass when struck by a slow neutron, with release of energy and 2–3 neutrons. These neutrons split more nuclei — a chain reaction; in a reactor it is controlled to give steady energy; in an atom bomb it is uncontrolled.\n\n(b) Mass numbers: $235 + 1 = x + 92 + 2$, so $x = ${xB}$. Atomic numbers: $92 = y + 38$, so $y = ${92 - 38}$.\n\n(c) (i) The joining of light nuclei to form a heavier nucleus with release of energy. (ii) It needs temperatures of millions of kelvin, which exist in the Sun’s core. (iii) More energy per kilogram and little long-lived radioactive waste. (iv) The waste stays radioactive for thousands of years and must be kept away from people and water.`,
  sol: 'Fission and chain reaction; balancing; fusion.',
  scheme: [['(a)', 3], ['(b) x', 1.5], ['(b) y', 1.5], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [5],
}), () => xB === 142 && 92 - 38 === 54 || 'xy');
