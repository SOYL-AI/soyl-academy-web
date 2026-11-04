// ch07 Structure of an Atom — two decks: Part 1 (t01) the particles and the Thomson, Rutherford and Bohr models;
// Part 2 (t02, t03) electron distribution, valency, atomic and mass numbers, ions, isotopes, isobars, average atomic mass.
import { sl, deck, table, svgV, r, near, dec } from './lib.mjs';
import { TUBE, THOMSON, RUTHERFORD, BOHR, SHELLS_A, SHELLS_B, ISOTOPES } from './svgs.mjs';
import { ELEMENTS, bySym, shells, dist, outer, valency, count, total, avgMass } from './data.mjs';

const must = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};

// ---- worked-example numbers (computed once, then interpolated)
const ex1 = (() => {
  const fired = 32000;
  const back = 4;
  return { fired, back, per: fired / back, pct: (back / fired) * 100 };
})();
must(ex1.per === 8000 && near(ex1.pct, 0.0125, 1e-9), 'ex1 alpha rebound fraction');
const ex2 = (() => {
  const nucleons = 12; // carbon-12: 6 protons + 6 neutrons, each about 1 u
  const e = 6 / 1836; // six electrons, each about 1/1836 u
  return { e, whole: nucleons + e, pct: (e / (nucleons + e)) * 100 };
})();
must(near(ex2.e, 0.00327, 0.01) && near(ex2.pct, 0.0272, 0.01), 'ex2 electron share of the carbon atom mass');
const P = bySym('P');
const K = bySym('K');
const S_ = bySym('S');
must(dist(P.z) === '2, 8, 5' && valency(P.z) === 3 && dist(K.z) === '2, 8, 8, 1' && valency(K.z) === 1 && dist(S_.z) === '2, 8, 6' && valency(S_.z) === 2, 'ex3 distributions and valencies');
const atoms = ['Na', 'P', 'Ca'].map((s) => ({ ...bySym(s), c: count(bySym(s).z, bySym(s).a) }));
must(atoms[0].c.n === 12 && atoms[1].c.n === 16 && atoms[2].c.n === 20 && atoms.every((a) => a.c.p === a.c.e), 'ex4 atom counts');
const ions = [
  { sym: 'Al', q: 3, sign: '3+' },
  { sym: 'S', q: -2, sign: '2−' },
].map((i) => ({ ...i, el: bySym(i.sym), c: count(bySym(i.sym).z, bySym(i.sym).a, i.q) }));
must(ions[0].c.e === 10 && ions[0].c.n === 14 && ions[1].c.e === 18 && ions[1].c.n === 16, 'ex5 ion counts');
const cl = { pairs: [[35, 75], [37, 25]] };
cl.avg = avgMass(cl.pairs);
must(near(cl.avg, 35.5, 1e-9), 'ex6 average atomic mass of chlorine');
const rows8 = [...Array(10)].map((_, i) => {
  const a = ELEMENTS[i];
  const b = ELEMENTS[i + 10];
  return [String(a.z), a.name, dist(a.z).replace(/, /g, ','), String(valency(a.z)), String(b.z), b.name, dist(b.z).replace(/, /g, ','), String(valency(b.z))];
});
must(rows8[9][1] === 'Neon' && rows8[9][6] === '2,8,8,2' && rows8[8][6] === '2,8,8,1' && rows8[7][2] === '2,6', 'twenty-element table');

const iso = (z, a, sym, chg = '') => `$^{${a}}_{${z}}\\text{${sym}}${chg ? `^{${chg}}` : ''}$`;

export const V = {
  tube: svgV(TUBE, 'Two discharge tubes: cathode rays bend towards the positive plate, so they are negative; canal rays are positive and pass through holes in the cathode', 'Cathode rays and canal rays.'),
  thomson: svgV(THOMSON, 'Thomson model: a sphere of positive charge with small negative electrons embedded in it like plums in a pudding', "Thomson's model."),
  rutherford: svgV(RUTHERFORD, 'Rutherford scattering: most alpha particles pass through a gold foil, a few are deflected and very few bounce back', "Rutherford's alpha-particle experiment."),
  bohr: svgV(BOHR, 'Bohr model: electrons in shells K, L and M around a nucleus, with an electron jumping up and another falling down', "Bohr's model."),
  shellsA: svgV(SHELLS_A, 'Shell diagrams of lithium, carbon, oxygen and neon with electron distributions 2,1; 2,4; 2,6 and 2,8', 'Shell diagrams from the computed distributions.'),
  shellsB: svgV(SHELLS_B, 'Shell diagrams of sodium, aluminium, chlorine and calcium with distributions 2,8,1; 2,8,3; 2,8,7 and 2,8,8,2', 'Valency from the outer shell.'),
  isotopes: svgV(ISOTOPES, 'Three isotopes of hydrogen with one proton each and zero, one and two neutrons', 'Isotopes differ in neutrons only.'),
};

// =====================================================================================================================
export const deck1 = deck({
  part: 1,
  title: 'Structure of an Atom — Part 1: Particles and models of the atom',
  goals: [
    'Name the three subatomic particles and state their charge, mass and place in the atom',
    'Describe how the electron, proton and neutron were discovered',
    "Describe the Thomson, Rutherford and Bohr models with the observations behind them",
    'State the limitation of each model',
  ],
  slides: [
    sl('title', 'Structure of an Atom', {
      b: 'Part 1: the particles inside an atom, and how three models, each fixing a problem of the one before, led to the picture we use today.',
      v: table(['Step', 'Scientist', 'About when', 'What was found'], [['Canal rays', 'Goldstein', '1886', 'positive particles, later called protons'], ['Cathode rays', 'J. J. Thomson', '1897', 'the electron'], ['Plum pudding model', 'J. J. Thomson', '1904', 'electrons inside a positive sphere'], ['Gold foil experiment', 'Rutherford', '1911', 'a tiny, dense, positive nucleus'], ['Shell model', 'Bohr', '1913', 'electrons in fixed shells'], ['Neutron', 'Chadwick', '1932', 'a neutral particle in the nucleus']], 'Table of six steps in the discovery of atomic structure with the scientist, the approximate year and what was found'),
      n: 'Dalton thought that an atom was a solid ball that could not be divided. Experiments with electricity showed that this was not true. In this part we meet the particles inside the atom, and then three models of the atom, each one built to fix a problem in the one before it.',
    }),
    sl('concept', 'The atom can be divided', {
      b: r`Atoms are made of three **subatomic particles**. The **electron** carries a negative charge, the **proton** a positive charge and the **neutron** no charge at all. Protons and neutrons sit together in the centre, the **nucleus**. Electrons move outside it. The charge on a proton is equal in size to the charge on an electron, and opposite in sign.`,
      v: table(['Particle', 'Symbol', 'Charge', 'Relative mass', 'Where found'], [['Electron', 'e−', '−1', 'about 1/1836 of a proton', 'outside the nucleus'], ['Proton', 'p+', '+1', '1 u', 'in the nucleus'], ['Neutron', 'n', '0', '1 u (slightly more than a proton)', 'in the nucleus']], 'Table of electron, proton and neutron with symbol, charge, relative mass and location'),
      n: 'An atom has three kinds of particles. The electron is negative. The proton is positive. The neutron has no charge. Protons and neutrons are packed together in the centre, which is called the nucleus, and the electrons move outside it. A proton and an electron have equal charges of opposite sign. A proton and a neutron have almost the same mass, and an electron is about eighteen hundred times lighter.',
    }),
    sl('diagram', 'Cathode rays and the electron', {
      b: r`In a glass tube with a little gas at **very low pressure** and a high voltage across two metal plates, a glow appears. **Cathode rays** leave the negative plate, the cathode. J. J. Thomson (1897) showed that the beam bends towards a **positive** plate, so it is negatively charged, and that it is the same whatever gas or metal is used. These particles are the **electrons**, found in every atom.`,
      v: V.tube,
      n: 'Look at the top tube. When a high voltage is put across a tube holding a little gas at very low pressure, a beam leaves the negative plate, called the cathode. Thomson showed that this beam bends towards a positive plate, so the beam is negative. The same beam appears with any gas or metal, so these particles, the electrons, are found in every atom.',
    }),
    sl('check', 'Quick check: cathode rays', {
      b: 'Decide what the bending of the beam towards the positive plate tells us.',
      n: 'Quick check. Think about what it means that a beam in a discharge tube is pulled towards the positive plate.',
      chk: 'chk-cathode',
    }),
    sl('concept', 'Canal rays, the proton and the neutron', {
      b: r`**Canal rays** (Goldstein, 1886) are positive rays that pass through holes in the cathode and travel the other way. They form when gas atoms lose electrons. With hydrogen gas the positive particle is the lightest, and it is called the **proton**. In 1932 James Chadwick found the **neutron**: a particle of almost the same mass as the proton but **no charge**. Because it is neutral it is hard to detect, which is why it was found last.`,
      v: table(['Particle', 'Found by', 'How it showed up', 'Charge'], [['Electron', 'J. J. Thomson, 1897', 'cathode rays bend towards a positive plate', 'negative'], ['Proton', 'Goldstein, 1886 (named later)', 'canal rays travel through holes in the cathode', 'positive'], ['Neutron', 'Chadwick, 1932', 'a particle of proton mass that is not deflected by charges', 'none']], 'Table of the discoverer, evidence and charge for the electron, proton and neutron'),
      n: 'Goldstein found rays that pass through holes in the cathode and move the other way. These canal rays are positive. They are made when gas atoms lose electrons. With hydrogen gas the positive particle is the lightest one, and it is called the proton. Later, in nineteen thirty two, Chadwick found a particle with almost the same mass as a proton but no charge. This is the neutron. Being neutral, it was the last to be found.',
    }),
    sl('diagram', "Thomson's model: the plum pudding", {
      b: r`Thomson (about 1904) knew that atoms are neutral and contain electrons. He pictured the atom as a **sphere of positive charge** with electrons **embedded** in it, like plums in a pudding or seeds in a watermelon. The total positive charge equals the total negative charge, so the atom is neutral. **Limitation:** it could not explain what Rutherford found in his gold-foil experiment.`,
      v: V.thomson,
      n: 'Thomson pictured the atom as a sphere of positive charge, with the electrons embedded in it, like plums in a pudding, or like seeds in a watermelon. The positive and negative charges are equal, so the atom is neutral. This model was a good first step. But it could not explain the result of the gold foil experiment which Rutherford did a few years later.',
    }),
    sl('concept', "Rutherford's gold-foil experiment", {
      b: r`Rutherford (1911) fired fast **alpha particles** (positively charged helium nuclei) at a very thin gold foil and watched where they went. Each observation led to a conclusion.`,
      v: table(['Observation', 'Conclusion'], [['Most alpha particles went straight through', 'most of the atom is empty space'], ['A few were deflected through small angles', 'the positive charge is concentrated in a small centre'], ['Very few (roughly one in many thousands) bounced straight back', 'the centre, the nucleus, is tiny, dense and positive'], ['Heavy alpha particles were never stopped by electrons', 'almost all the mass is in the nucleus']], 'Table of four observations from the gold foil experiment and the conclusion drawn from each'),
      n: 'Rutherford fired fast alpha particles, which are positive, at a very thin gold foil. Most went straight through, so most of the atom is empty space. A few were deflected through small angles, so the positive charge is concentrated in a small centre. Very few, roughly one in many thousands, bounced straight back. This means the centre, the nucleus, is tiny, dense and positive.',
    }),
    sl('diagram', 'Scattering of alpha particles', {
      b: r`A positive alpha particle is pushed away only when it passes **very close** to the positive nucleus. Since the nucleus is so small, most particles miss it and go straight on. Rutherford concluded that electrons move around the nucleus in the large empty space, and that the **nucleus holds almost all the mass** of the atom.`,
      v: V.rutherford,
      n: 'Here is what happens. A positive alpha particle is pushed away only when it passes very close to the positive nucleus. The nucleus is so small that most particles miss it and go straight on. A few are turned through small angles, and very few meet a nucleus almost head on and bounce back. So the electrons move around the nucleus in the empty space, and the nucleus holds almost all the mass.',
    }),
    sl('example', 'Worked example: how rare is a rebound?', {
      b: r`**Problem.** In a classroom simulation of the experiment (numbers given for practice), ${ex1.fired.toLocaleString('en-US').replace(',', ' ')} alpha particles are fired at a foil and ${ex1.back} bounce straight back. Find the fraction that rebound, and say what it shows.

**Step 1.** Fraction $= \dfrac{${ex1.back}}{${ex1.fired}} = \dfrac{1}{${ex1.per}}$, that is 1 in ${ex1.per}.

**Step 2.** As a percentage, $\dfrac{${ex1.back}}{${ex1.fired}} \times 100 = ${dec(ex1.pct, 3)}\%$.

**Step 3.** Only a tiny share meets the nucleus head on, so the nucleus takes up a tiny part of the atom's volume.`,
      v: table(['Quantity', 'Value'], [['Particles fired', ex1.fired.toLocaleString('en-US').replace(',', ' ')], ['Particles that rebound', String(ex1.back)], ['Fraction', `1 in ${ex1.per}`], ['Percentage', `${dec(ex1.pct, 3)} %`]], 'Table of particles fired, particles that rebound, the fraction and the percentage'),
      n: 'Suppose thirty two thousand alpha particles are fired at a foil and four bounce straight back. The fraction is four out of thirty two thousand, which is one in eight thousand. As a percentage this is about one hundredth of a percent. Only a tiny share meets the nucleus head on, so the nucleus takes up a tiny part of the volume of the atom.',
    }),
    sl('check', 'Quick check: the gold-foil result', {
      b: 'Decide which conclusion follows from the particles that bounced back.',
      n: 'Quick check. Think about what it means that only a very few alpha particles bounced straight back from the foil.',
      chk: 'chk-ruth',
    }),
    sl('concept', "Rutherford's model and its limitation", {
      b: r`**Rutherford's model:** a small, dense, positive **nucleus** at the centre, with electrons revolving around it in circles, like planets round the Sun. **Limitation:** a charged particle that moves in a circle should keep losing energy as radiation. The electron should then spiral into the nucleus and the atom would collapse. But atoms are **stable**, so the model could not be complete.`,
      v: table(['Feature of the model', 'Problem it runs into'], [['electrons revolve in circles', 'a revolving charge should lose energy'], ['energy is lost continuously', 'the electron should spiral into the nucleus'], ['the atom should collapse', 'real atoms are stable and last for ever']], 'Table linking a feature of the Rutherford model with the problem it faces'),
      n: 'Rutherford described a small, dense, positive nucleus with electrons revolving around it, like planets round the Sun. There was a problem. A charged particle that moves in a circle should keep losing energy. The electron should then spiral into the nucleus and the atom should collapse. But atoms are stable, so the model could not be the full story.',
    }),
    sl('concept', "Bohr's model: shells", {
      b: r`Niels Bohr (1913) fixed the problem with new ideas. (1) Electrons revolve only in certain special paths called **shells** or **energy levels**. (2) **While an electron stays in a shell it does not radiate energy**, so the shells are called stationary. (3) The shells are named K, L, M, N (or $n = 1, 2, 3, 4$) counting outwards from the nucleus, and each has a fixed energy. (4) An electron **absorbs** energy to jump to a higher shell and **emits** energy when it falls to a lower one.`,
      v: table(['Shell', 'n', 'Distance from nucleus', 'Energy of electron'], [['K', '1', 'closest', 'lowest'], ['L', '2', 'next', 'higher'], ['M', '3', 'next', 'higher still'], ['N', '4', 'farthest of the four', 'highest of the four']], 'Table of shells K, L, M and N with their n value, distance from the nucleus and energy'),
      n: 'Bohr fixed the problem. He said that electrons move only in certain special paths called shells. While an electron stays in a shell, it does not radiate energy. The shells are named K, L, M and N, counting outwards, and each shell has a fixed energy. An electron absorbs energy to jump to a higher shell, and gives out energy when it falls to a lower shell.',
    }),
    sl('diagram', 'Jumps between shells', {
      b: r`The picture shows the K, L and M shells. The red arrow shows an electron **absorbing** energy and jumping from the L shell to the M shell. The blue arrow shows an electron **emitting** energy as it falls from the M shell back to the L shell. Because the shells have fixed energies, only certain amounts of energy can be absorbed or emitted.`,
      v: V.bohr,
      n: 'In this picture the nucleus is at the centre, and the shells K, L and M are drawn around it. The red arrow shows an electron absorbing energy and jumping from the L shell to the M shell. The blue arrow shows an electron falling back from the M shell to the L shell and giving out energy. Only certain fixed amounts of energy can be taken in or given out.',
    }),
    sl('example', 'Worked example: how heavy are the electrons?', {
      b: r`**Problem.** A carbon atom has 6 protons, 6 neutrons and 6 electrons. Taking a proton or neutron as 1 u and an electron as $\dfrac{1}{1836}$ u, find the share of the atom's mass that the electrons contribute.

**Step 1: nucleus** $= 6 + 6 = 12$ u.

**Step 2: electrons** $= 6 \times \dfrac{1}{1836} = ${dec(ex2.e, 3)}$ u.

**Step 3: share** $= \dfrac{${dec(ex2.e, 3)}}{${dec(ex2.whole, 5)}} \times 100 \approx ${dec(ex2.pct, 2)}\%$.

So the mass of an atom is almost all in the nucleus.`,
      v: table(['Part of the carbon atom', 'Mass (u)'], [['6 protons and 6 neutrons', '12'], ['6 electrons', dec(ex2.e, 3)], ['Whole atom', dec(ex2.whole, 5)]], 'Table of the mass of the nucleus, the electrons and the whole carbon atom'),
      n: 'A carbon atom has six protons, six neutrons and six electrons. The protons and neutrons weigh about one unit each, so the nucleus has a mass of twelve units. Each electron is about one eighteen hundred and thirty sixth of a unit, so six electrons weigh about three thousandths of a unit. This is about three hundredths of a percent of the whole atom, so almost all the mass is in the nucleus.',
    }),
    sl('check', 'Quick check: why Bohr was needed', {
      b: 'Decide what idea of Bohr solved the problem of Rutherford\'s model.',
      n: 'Quick check. Think about which idea of Bohr explains why an electron does not spiral into the nucleus.',
      chk: 'chk-bohr',
    }),
    sl('concept', 'Three models compared', {
      b: r`Each model explained what the one before could not. Bohr's model works well for hydrogen. For atoms with many electrons it is too simple, and later work gave the more complete picture used in higher classes.`,
      v: table(['Model', 'Picture', 'What it explained', 'Limitation'], [['Thomson', 'positive sphere with electrons inside', 'atom is neutral and has electrons', 'cannot explain the gold-foil result'], ['Rutherford', 'tiny nucleus, electrons revolving round it', 'deflection and rebound of alpha particles', 'atom should collapse; no reason for stability'], ['Bohr', 'electrons in fixed shells', 'stability of the atom, shells', 'too simple for atoms with many electrons']], 'Table comparing the Thomson, Rutherford and Bohr models by picture, what each explained and its limitation'),
      n: 'Let us compare the three models. Thomson pictured a positive sphere with electrons inside, which explains why an atom is neutral. Rutherford found a tiny nucleus with electrons moving around it, which explains the scattering of alpha particles. Bohr added fixed shells, which explains why atoms are stable. Bohr model works well for hydrogen but is too simple for atoms with many electrons.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Atoms contain electrons (negative), protons (positive) and neutrons (neutral); protons and neutrons are in the nucleus.',
        'Cathode rays (Thomson) are electrons; canal rays (Goldstein) are positive; Chadwick found the neutron.',
        'Thomson: positive sphere with electrons embedded; it failed to explain the gold-foil result.',
        'Rutherford: tiny dense positive nucleus, electrons around it; electrons should spiral in, so the atom would not be stable.',
        'Bohr: electrons in fixed shells (K, L, M, N) with no radiation while in a shell; jumps absorb or emit energy.',
      ],
      v: table(['Model', 'Key idea', 'Limitation'], [['Thomson', 'positive sphere, embedded electrons', 'no nucleus'], ['Rutherford', 'nucleus and revolving electrons', 'unstable atom'], ['Bohr', 'fixed shells', 'only simple atoms']], 'Table summarising three atomic models with the key idea and limitation'),
      n: 'To sum up. An atom has electrons, protons and neutrons. Thomson found the electron, Goldstein found positive rays, and Chadwick found the neutron. Thomson, Rutherford and Bohr each gave a model. Thomson had a positive sphere. Rutherford had a nucleus. Bohr had fixed shells where electrons do not lose energy. Each model fixed a problem of the one before.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write each Rutherford observation next to its conclusion, in two columns if you can.',
        'Name the scientist, the year and the evidence when you describe a discovery.',
        'For limitations, give one clear point for each model: no nucleus, unstable atom, too simple.',
        'In Bohr\'s model say that the electron does not radiate energy while it stays in one shell.',
        'Label diagrams: nucleus, shells K, L and M, and the direction of energy absorbed or emitted.',
      ],
      n: 'Some exam tips. Write each observation of Rutherford next to its conclusion. When you describe a discovery, name the scientist, the year and the evidence. Give one clear limitation for each model. In the Bohr model, say that an electron does not radiate energy while it stays in a shell. And label your diagrams carefully.',
    }),
  ],
});

// =====================================================================================================================
export const deck2 = deck({
  part: 2,
  title: 'Structure of an Atom — Part 2: Electrons, atomic number, isotopes and isobars',
  goals: [
    'Write the electron distribution of the first twenty elements and find their valency',
    'Define atomic number and mass number and count protons, neutrons and electrons in atoms and ions',
    'Define isotopes and isobars, and give uses of isotopes',
    'Calculate the average atomic mass from isotope abundances',
  ],
  slides: [
    sl('title', 'Electrons, numbers and isotopes', {
      b: 'Part 2: how electrons fill the shells, what decides valency, and how two numbers identify every atom.',
      v: table(['Idea', 'What it tells us'], [['Electron distribution', 'how many electrons are in each shell'], ['Valency', 'the combining power of an atom, from its outer electrons'], ['Atomic number and mass number', 'protons, and protons plus neutrons'], ['Isotopes and isobars', 'atoms with the same Z or the same A']], 'Table of four ideas of Part 2 and what each tells us'),
      n: 'In the first part we saw the shells of Bohr. Now we put electrons into those shells for the first twenty elements, and see how the outer electrons decide valency. Then we meet two numbers, the atomic number and the mass number, which tell us about every atom, and the ideas of isotopes and isobars.',
    }),
    sl('concept', 'Rules for filling the shells', {
      b: r`The maximum number of electrons in the shell with number $n$ is $2n^2$, so K holds 2, L holds 8, M holds 18 and N holds 32. Electrons fill the shell **nearest the nucleus first**. In the **outermost shell** there can be at most **8** electrons (2 for K). For the first 20 elements, the rule used in Class 9 is that the K shell takes 2, the L shell takes 8, the M shell takes up to 8, and any left over go to the N shell.`,
      v: table(['Shell', 'n', 'Maximum electrons (2n²)', 'Used for elements 1 to 20'], [['K', '1', String(2 * 1 ** 2), '2'], ['L', '2', String(2 * 2 ** 2), '8'], ['M', '3', String(2 * 3 ** 2), 'up to 8'], ['N', '4', String(2 * 4 ** 2), 'the 2 electrons of K and Ca']], 'Table of shells K, L, M and N with n, the maximum number of electrons and the number used for the first 20 elements'),
      n: 'The most electrons the shell number n can hold is two times n squared. So K holds two, L holds eight, M holds eighteen and N holds thirty two. Electrons fill the shell nearest the nucleus first. The outermost shell never holds more than eight electrons. For the first twenty elements, K takes two, L takes eight, M takes up to eight, and any left over go to the N shell.',
    }),
    sl('concept', 'The first twenty elements', {
      b: r`Each row gives the atomic number $Z$, the electron distribution and the valency, worked out with the rules. Notice that argon, $Z = 18$, ends with 8 electrons in the outer shell, and that potassium and calcium start the N shell before the M shell holds 18.`,
      v: table(['Z', 'Element', 'Distribution', 'Valency', 'Z', 'Element', 'Distribution', 'Valency'], rows8, 'Table of the first twenty elements with atomic number, electron distribution and valency'),
      n: 'This table lists the first twenty elements with their electron distribution and valency. Hydrogen has one electron. Helium has two, filling the K shell. Lithium has two and one. Neon has two and eight, with a full outer shell. Sodium has two, eight and one. Argon has two, eight and eight. Potassium has two, eight, eight and one, and calcium has two, eight, eight and two.',
    }),
    sl('diagram', 'Shell diagrams', {
      b: r`Electrons are drawn as dots on circles for the shells. The atoms here are lithium, carbon, oxygen and neon. The number inside each nucleus is its positive charge, which is the same as the number of electrons in the neutral atom.`,
      v: V.shellsA,
      n: 'Here are shell diagrams for four elements. Lithium has two electrons in the K shell and one in the L shell. Carbon has two and four. Oxygen has two and six. Neon has two and eight, so its outer shell is full. The number inside each nucleus is its positive charge, which equals the number of electrons in the neutral atom.',
    }),
    sl('check', 'Quick check: filling the shells', {
      b: 'Decide on the electron distribution of an atom with 17 electrons.',
      n: 'Quick check. Think about how the seventeen electrons of chlorine are spread over the shells K, L and M.',
      chk: 'chk-fill',
    }),
    sl('diagram', 'Valency from the outer electrons', {
      b: r`**Valency** is the combining power of an atom. An atom with **1 to 4** outer electrons has valency equal to that number. With **5 to 7** outer electrons, valency $= 8 -$ (outer electrons). With a **full outer shell** (2 in K, 8 otherwise) the valency is **0**, so the atom is unreactive, like neon and argon. The diagram shows sodium, aluminium, chlorine and calcium.`,
      v: V.shellsB,
      n: 'Valency is the combining power of an atom. If an atom has one to four electrons in its outer shell, the valency is that number. With five to seven outer electrons, the valency is eight minus that number. A full outer shell gives valency zero, so such atoms are unreactive. Sodium has valency one, aluminium three, chlorine one and calcium two.',
    }),
    sl('example', 'Worked example: distribution and valency', {
      b: r`**Problem.** Write the electron distribution and valency of phosphorus ($Z = ${P.z}$) and potassium ($Z = ${K.z}$).

**Step 1: phosphorus.** K takes 2, L takes 8, the remaining $${P.z} - 10 = ${P.z - 10}$ go to M. Distribution **${dist(P.z)}**. Outer electrons $= ${outer(P.z)}$, so valency $= 8 - ${outer(P.z)} = ${valency(P.z)}$.

**Step 2: potassium.** K 2, L 8, M 8, and the last electron goes to N. Distribution **${dist(K.z)}**. One outer electron, so valency $= ${valency(K.z)}$.`,
      v: table(['Element', 'Z', 'Distribution', 'Outer electrons', 'Valency'], [['Phosphorus', String(P.z), dist(P.z), String(outer(P.z)), String(valency(P.z))], ['Potassium', String(K.z), dist(K.z), String(outer(K.z)), String(valency(K.z))]], 'Table of the distribution, outer electrons and valency of phosphorus and potassium'),
      n: 'Phosphorus has fifteen electrons. K takes two, L takes eight, and the remaining five go to M. The distribution is two, eight, five. With five outer electrons the valency is eight minus five, which is three. Potassium has nineteen electrons. K takes two, L eight, M eight, and the last one goes to the N shell. With one outer electron its valency is one.',
    }),
    sl('concept', 'Atomic number and mass number', {
      b: r`The **atomic number** $Z$ is the number of **protons** in the nucleus. It identifies the element. In a neutral atom, the number of electrons is also $Z$. The **mass number** $A$ is the number of protons **plus** neutrons, the nucleons in the nucleus. So the number of neutrons is $A - Z$. An atom of element X is written $^{A}_{Z}\text{X}$, for example ${iso(11, 23, 'Na')}.`,
      v: table(['Quantity', 'Symbol', 'Meaning', 'How to find it'], [['Atomic number', 'Z', 'number of protons', 'given, or equal to electrons in an atom'], ['Mass number', 'A', 'protons plus neutrons', 'given'], ['Neutrons', 'n', 'A minus Z', 'A − Z'], ['Electrons (neutral atom)', 'e', 'equal to Z', 'Z']], 'Table of atomic number, mass number, neutrons and electrons with their meaning and how to find them'),
      n: 'The atomic number is the number of protons in the nucleus. It identifies the element. In a neutral atom, the number of electrons is the same. The mass number is the number of protons plus neutrons. So the number of neutrons is the mass number minus the atomic number. The element sodium, with atomic number eleven and mass number twenty three, has twelve neutrons.',
    }),
    sl('example', 'Worked example: counting particles', {
      b: r`**Problem.** Find the protons, neutrons and electrons in ${iso(11, 23, 'Na')}, ${iso(15, 31, 'P')} and ${iso(20, 40, 'Ca')}.

**Step 1.** Protons $= Z$ and, in an atom, electrons $= Z$.

**Step 2.** Neutrons $= A - Z$: sodium $${atoms[0].a} - ${atoms[0].z} = ${atoms[0].c.n}$; phosphorus $${atoms[1].a} - ${atoms[1].z} = ${atoms[1].c.n}$; calcium $${atoms[2].a} - ${atoms[2].z} = ${atoms[2].c.n}$.`,
      v: table(['Atom', 'Protons', 'Neutrons', 'Electrons'], atoms.map((a) => [`${a.name} (${a.sym}-${a.a})`, String(a.c.p), String(a.c.n), String(a.c.e)]), 'Table of protons, neutrons and electrons in sodium-23, phosphorus-31 and calcium-40'),
      n: 'Protons equal the atomic number, and in an atom the electrons are equal to it too. Neutrons are the mass number minus the atomic number. Sodium has eleven protons, twelve neutrons and eleven electrons. Phosphorus has fifteen protons, sixteen neutrons and fifteen electrons. Calcium has twenty protons, twenty neutrons and twenty electrons.',
    }),
    sl('concept', 'Ions: atoms that gain or lose electrons', {
      b: r`An atom becomes an **ion** when it gains or loses electrons. The number of **protons never changes**. A **cation** is positive because the atom **lost** electrons, so electrons $= Z - \text{charge}$. An **anion** is negative because the atom **gained** electrons, so electrons $= Z + \text{charge}$. A metal such as sodium forms a cation, and a non-metal such as chlorine forms an anion. Most common ions reach a full outer shell, like the nearest noble gas.`,
      v: table(['Ion', 'Change', 'Protons', 'Electrons', 'Distribution'], [['Na+', 'lost 1 electron', '11', '10', '2,8'], ['Mg2+', 'lost 2 electrons', '12', '10', '2,8'], ['Cl−', 'gained 1 electron', '17', '18', '2,8,8'], ['O2−', 'gained 2 electrons', '8', '10', '2,8']], 'Table of four ions with the change in electrons, protons, electrons and electron distribution'),
      n: 'An atom becomes an ion when it gains or loses electrons. The number of protons never changes. A cation is positive, because the atom has lost electrons. An anion is negative, because the atom has gained electrons. Sodium loses one electron and becomes a cation with ten electrons. Chlorine gains one electron and becomes an anion with eighteen electrons. Most common ions have a full outer shell.',
    }),
    sl('example', 'Worked example: counting particles in ions', {
      b: r`**Problem.** Find the protons, neutrons and electrons in ${iso(13, 27, 'Al', '3+')} and ${iso(16, 32, 'S', '2-')}.

**Step 1: aluminium ion.** Protons $= ${ions[0].el.z}$, neutrons $= ${ions[0].el.a} - ${ions[0].el.z} = ${ions[0].c.n}$, electrons $= ${ions[0].el.z} - 3 = ${ions[0].c.e}$.

**Step 2: sulphide ion.** Protons $= ${ions[1].el.z}$, neutrons $= ${ions[1].el.a} - ${ions[1].el.z} = ${ions[1].c.n}$, electrons $= ${ions[1].el.z} + 2 = ${ions[1].c.e}$.`,
      v: table(['Ion', 'Protons', 'Neutrons', 'Electrons'], ions.map((i) => [`${i.el.name} ion (${i.sym}${i.sign})`, String(i.c.p), String(i.c.n), String(i.c.e)]), 'Table of protons, neutrons and electrons in an aluminium ion and a sulphide ion'),
      n: 'For the aluminium ion with charge three plus, the protons are thirteen, the neutrons are twenty seven minus thirteen, which is fourteen, and the electrons are thirteen minus three, which is ten. For the sulphide ion with charge two minus, the protons are sixteen, the neutrons are sixteen, and the electrons are sixteen plus two, which is eighteen.',
    }),
    sl('check', 'Quick check: ions', {
      b: 'Decide which ion has the same number of electrons as neon.',
      n: 'Quick check. Think about how many electrons an atom of neon has, and which ion of another element has the same number.',
      chk: 'chk-ion',
    }),
    sl('concept', 'Isotopes', {
      b: r`**Isotopes** are atoms of the **same element** (same $Z$) with **different mass numbers** (different numbers of neutrons). They have the same number of electrons, so their **chemical properties are the same**, but their physical properties, such as mass, differ. Hydrogen has three isotopes: protium, deuterium and tritium. Chlorine has two common ones, ${iso(17, 35, 'Cl')} and ${iso(17, 37, 'Cl')}.`,
      v: table(['Isotope', 'Z', 'A', 'Protons', 'Neutrons', 'Electrons'], [['Hydrogen-1', '1', '1', '1', '0', '1'], ['Hydrogen-2', '1', '2', '1', '1', '1'], ['Hydrogen-3', '1', '3', '1', '2', '1'], ['Chlorine-35', '17', '35', '17', '18', '17'], ['Chlorine-37', '17', '37', '17', '20', '17']], 'Table of hydrogen and chlorine isotopes with Z, A, protons, neutrons and electrons'),
      n: 'Isotopes are atoms of the same element with different mass numbers. They have the same number of protons and electrons, but different numbers of neutrons. Their chemical properties are the same, because the electrons are the same, but their masses differ. Hydrogen has three isotopes, protium, deuterium and tritium. Chlorine has two common isotopes, with mass numbers thirty five and thirty seven.',
    }),
    sl('diagram', 'Comparing isotopes of hydrogen', {
      b: r`All three isotopes of hydrogen have **1 proton and 1 electron**. Only the number of neutrons changes, from 0 to 1 to 2, and so the mass number changes from 1 to 2 to 3. Deuterium is also called heavy hydrogen.`,
      v: V.isotopes,
      n: 'Compare the three isotopes of hydrogen. Each has one proton and one electron. Protium has no neutrons, deuterium has one neutron, and tritium has two neutrons. So the atomic number is the same, one, but the mass numbers are one, two and three. Only the neutrons are different.',
    }),
    sl('concept', 'Uses of isotopes', {
      b: r`Some isotopes are **radioactive**: their nuclei give out radiation. Their uses at textbook level are shown in the table. These substances are handled only by trained people with proper safety rules.`,
      v: table(['Isotope', 'Use'], [['Cobalt-60', 'its radiation is used to treat cancer (radiotherapy) and to sterilise medical equipment'], ['Iodine-131', 'used to diagnose and treat disorders of the thyroid gland, such as goitre'], ['Uranium-235', 'a fuel in nuclear reactors that produce electricity'], ['Carbon-14', 'used to estimate the age of fossils and old wooden objects (carbon dating)']], 'Table of four isotopes and one use of each'),
      n: 'Some isotopes are radioactive, which means that their nuclei give out radiation. Cobalt sixty is used to treat cancer and to sterilise medical equipment. Iodine one thirty one is used to find and treat problems of the thyroid gland, such as goitre. Uranium two thirty five is the fuel in nuclear reactors that make electricity. Carbon fourteen is used to estimate the age of fossils and old wood.',
    }),
    sl('check', 'Quick check: uses of isotopes', {
      b: 'Decide which isotope is used for dating an old wooden object.',
      n: 'Quick check. Think about which isotope scientists use to estimate how old a fossil or a wooden object is.',
      chk: 'chk-use',
    }),
    sl('concept', 'Isobars', {
      b: r`**Isobars** are atoms of **different elements** with the **same mass number** but **different atomic numbers**. For example, argon-40 ($Z = 18$), potassium-40 ($Z = 19$) and calcium-40 ($Z = 20$) all have $A = 40$. Their number of protons differs, so they are different elements with different chemical properties.`,
      v: table(['', 'Isotopes', 'Isobars'], [['Atomic number Z', 'same', 'different'], ['Mass number A', 'different', 'same'], ['Same element?', 'yes', 'no'], ['Neutrons', 'different', 'usually different'], ['Example', 'chlorine-35 and chlorine-37', 'argon-40 and calcium-40']], 'Table comparing isotopes and isobars by atomic number, mass number, element, neutrons and example'),
      n: 'Isobars are atoms of different elements that have the same mass number. For example, argon, potassium and calcium can all have a mass number of forty, but their atomic numbers are eighteen, nineteen and twenty. So they are different elements with different chemical properties. Remember, isotopes have the same atomic number, and isobars have the same mass number.',
    }),
    sl('example', 'Worked example: average atomic mass', {
      b: r`**Problem.** Chlorine in nature is a mixture of ${iso(17, 35, 'Cl')} (${cl.pairs[0][1]} %) and ${iso(17, 37, 'Cl')} (${cl.pairs[1][1]} %). Find its average atomic mass.

**Step 1.** Average mass $= \dfrac{35 \times ${cl.pairs[0][1]} + 37 \times ${cl.pairs[1][1]}}{100}$.

**Step 2.** $= \dfrac{${35 * cl.pairs[0][1]} + ${37 * cl.pairs[1][1]}}{100} = \dfrac{${35 * cl.pairs[0][1] + 37 * cl.pairs[1][1]}}{100} = ${dec(cl.avg, 3)}$ u.

This is why the atomic mass of chlorine is **35.5 u**, a value that no single atom has.`,
      v: table(['Isotope', 'Mass number', 'Abundance', 'Contribution (u)'], [['Chlorine-35', '35', '75 %', dec((35 * 75) / 100, 4)], ['Chlorine-37', '37', '25 %', dec((37 * 25) / 100, 3)], ['Average', '', '100 %', dec(cl.avg, 3)]], 'Table of the two chlorine isotopes with mass number, abundance, contribution to the average and the average atomic mass'),
      n: 'Chlorine in nature has seventy five percent of the isotope with mass number thirty five, and twenty five percent of the isotope with mass number thirty seven. Multiply each mass by its share and add. Thirty five times seventy five is two thousand six hundred and twenty five. Thirty seven times twenty five is nine hundred and twenty five. The total is three thousand five hundred and fifty, and dividing by one hundred gives thirty five point five.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Shell capacity is 2n squared; the first 20 elements fill K 2, L 8, M up to 8, then N.',
        'Valency is the number of outer electrons (1 to 4), or 8 minus it (5 to 7); a full outer shell gives 0.',
        'Z is the number of protons; A is protons plus neutrons; neutrons are A minus Z.',
        'Ions have the same protons as the atom; cations lose electrons, anions gain electrons.',
        'Isotopes: same Z, different A, same chemical properties. Isobars: same A, different Z.',
        'Average atomic mass is the abundance-weighted mean of the isotope masses.',
      ],
      v: table(['Idea', 'Example'], [['Distribution', 'chlorine 2,8,7, valency 1'], ['Counting', 'sodium-23: 11 p, 12 n, 11 e'], ['Isotopes', 'chlorine-35 and chlorine-37'], ['Isobars', 'argon-40 and calcium-40'], ['Average mass', 'chlorine 35.5 u']], 'Table summarising distribution, counting, isotopes, isobars and average mass with an example each'),
      n: 'To sum up. Electrons fill shells nearest the nucleus first, and the outer electrons decide valency. The atomic number is the number of protons, and the mass number is protons plus neutrons. Ions have the same protons as their atoms but different electrons. Isotopes have the same atomic number and different mass numbers. Isobars have the same mass number and different atomic numbers.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Always show the distribution, for example 2, 8, 7, and then the valency in the next line.',
        'For ions, say which electrons were lost or gained and show electrons equal to Z minus or plus the charge.',
        'Write isotopes and isobars in a table with Z and A to avoid mixing them up.',
        'In average mass, multiply each mass by its share, add, and divide by 100.',
        'Give one use for each of cobalt-60, iodine-131, uranium-235 and carbon-14.',
      ],
      n: 'Some exam tips. Show the electron distribution, then the valency on the next line. For ions, state clearly which electrons were gained or lost. Put isotopes and isobars in a table with the atomic number and the mass number, so that you do not mix them up. In average mass, multiply each mass by its share, add them, and divide by one hundred.',
    }),
  ],
});
