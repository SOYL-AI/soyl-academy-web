// ISC 12 Physics ch20 notes and flashcards.
import { T, unit, PROV, r, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, radiusPlot, densityPlot, EX } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Nuclei and Nuclear Energy — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Composition of the nucleus; isotopes, isobars and isotones',
      `- A nucleus contains **protons** (charge +e) and **neutrons** (uncharged), together called **nucleons**. Atomic number Z = number of protons; neutron number N; mass number A = Z + N. A nuclide is written $^{A}_{Z}\\text{X}$.
- **Isotopes:** same Z, different A and N (same element). **Isobars:** same A, different Z. **Isotones:** same N, different Z.
- The protons repel one another electrically; the **strong nuclear force** (short-range, attractive, the same between any two nucleons) holds the nucleus together.
- The **unified atomic mass unit** u is 1/12 of the mass of a neutral carbon-12 atom: 1 u = 1.6605 × 10⁻²⁷ kg.`,
      [kt('Nucleon', 'A proton or a neutron inside a nucleus.'), kt('Isotopes', 'Nuclides with the same atomic number but different mass numbers.'), kt('Isobars', 'Nuclides with the same mass number but different atomic numbers.'), kt('Isotones', 'Nuclides with the same number of neutrons but different numbers of protons.'), kt('Unified atomic mass unit', 'One twelfth of the mass of a neutral carbon-12 atom, 1.6605 × 10⁻²⁷ kg.')],
      [fm(r`A = Z + N`, 'Mass number')],
      V.nuclei,
      [1],
    ),
    sec(
      '2. Size and density of the nucleus',
      `- Nuclear radius: $R = R_0A^{1/3}$ with $R_0 \\approx 1.2$ fm (1 fm = 10⁻¹⁵ m). Radii: about 1.9 fm for ⁴He, ${dec(EX.ex1.R, 2)} fm for ⁶⁴Zn, about 7.4 fm for ²³⁸U; a nucleus is about 10⁵ times smaller across than its atom.
- Volume $\\dfrac{4}{3}\\pi R^3 \\propto A$: every nucleon occupies the same volume.
- **Density** $\\rho = \\dfrac{Am}{\\frac{4}{3}\\pi R_0^3A} = \\dfrac{3m}{4\\pi R_0^3}$: independent of A. About ${dec(EX.ex1.rho / 1e17, 2)} × 10¹⁷ kg m⁻³ (with R₀ = 1.2 fm and m = 1.67 × 10⁻²⁷ kg), some 10¹⁴ times the density of water.`,
      [kt('Nuclear density', 'The mass per unit volume of nuclear matter; about 2.3 × 10¹⁷ kg m⁻³, the same for every nucleus.')],
      [fm(r`R = R_0A^{1/3}`, 'Nuclear radius'), fm(r`\rho = \dfrac{3m}{4\pi R_0^3}`, 'Nuclear density, independent of A')],
      radiusPlot,
      [1],
      [densityPlot],
    ),
    sec(
      '3. Mass–energy relation, mass defect and binding energy',
      `- **Mass–energy relation:** a mass m is equivalent to energy $E = mc^2$. **1 u = 931.5 MeV/c²** (this value is used throughout; 1 MeV = 1.6 × 10⁻¹³ J).
- **Mass defect:** $\\Delta m = Zm_p + (A - Z)m_n - m_{\\text{nucleus}}$. With atomic masses: $\\Delta m = Zm_H + (A - Z)m_n - M_{\\text{atom}}$ (the electron masses cancel).
- **Binding energy:** $B = \\Delta m\\,c^2$ = the energy needed to separate the nucleus into free nucleons = the energy released when it forms. $B$ (MeV) $= \\Delta m$ (u) $\\times\\ 931.5$. **Binding energy per nucleon** $= B/A$.
- Example: ²⁰Ne (19.992440 u): Δm = ${dec(EX.ex3.dm, 5)} u, B = ${dec(EX.ex3.B, 4)} MeV, B/A = ${dec(EX.ex3.BA, 3)} MeV.`,
      [kt('Mass defect', 'The amount by which the mass of a nucleus is less than the total mass of its separate nucleons.'), kt('Binding energy', 'The energy equivalent of the mass defect: the energy needed to separate a nucleus into its nucleons.')],
      [fm(r`E = mc^2`, 'Mass–energy relation'), fm(r`\Delta m = Zm_H + (A - Z)m_n - M`, 'Mass defect from atomic masses'), fm(r`B = \Delta m \times 931.5\ \text{MeV}`, 'Binding energy, Δm in u')],
      V.massdef,
      [2],
    ),
    sec(
      '4. Pair production and annihilation',
      `- **Pair production:** a gamma photon of energy $h\\nu \\ge 2m_ec^2 = 1.022$ MeV becomes an electron and a positron, in the field of a nucleus (which takes up momentum). Energy above 1.022 MeV is the kinetic energy of the pair.
- **Annihilation:** an electron and a positron meeting (at rest) change completely into two photons of 0.511 MeV each, moving in opposite directions (so that momentum is conserved); wavelength $\\lambda = hc/E = 2.43$ pm.
- Both processes are direct evidence that mass and energy are equivalent.`,
      [kt('Pair production', 'The change of a gamma photon into an electron and a positron near a nucleus; it needs at least 1.022 MeV.'), kt('Annihilation', 'The change of an electron and a positron into radiation (two photons of 0.511 MeV when at rest).')],
      [fm(r`h\nu \ge 2m_ec^2 = 1.022\ \text{MeV}`, 'Threshold for pair production')],
      V.pair,
      [2],
    ),
    sec(
      '5. Binding energy per nucleon curve; stability; why fission and fusion release energy',
      `- B/A rises steeply for light nuclei (1.1 MeV for ²H; 7.07 MeV for ⁴He), has a maximum of about **8.8 MeV near A = 56–62** (iron, nickel), then falls slowly to about 7.6 MeV for uranium. Between A about 30 and 170 it is nearly constant.
- The **middle-order nuclei** are the most tightly bound and the most stable. The short-range strong force explains the flat part; the long-range repulsion of the protons explains the fall at large A.
- **Both fission and fusion move nuclei towards the maximum**: heavy nuclei split into middle-order fragments, light nuclei join into heavier ones. Higher B/A means the total binding energy increases, and the difference is released.
- **Estimate for fission:** energy released = A × (B/A of the fragments − B/A of the heavy nucleus). For A = 236 splitting into two halves with 7.6 and 8.5 MeV per nucleon: 236 × 0.9 ≈ 212 MeV.`,
      [kt('Middle-order nuclei', 'Nuclei with mass numbers of about 50 to 80, with the highest binding energy per nucleon (about 8.8 MeV).')],
      [fm(r`Q = \left(\sum B\right)_{\text{after}} - \left(\sum B\right)_{\text{before}}`, 'Energy released from binding energies')],
      V.bea,
      [3],
    ),
    sec(
      '6. Nuclear fission, chain reaction, reactor and bomb',
      `- **Fission:** a heavy nucleus (such as ²³⁵U) absorbs a slow neutron and splits into two middle-order fragments, with 2–3 neutrons and about 200 MeV. Example: ¹₀n + ²³⁵₉₂U → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + 3 ¹₀n, Q = ${dec(EX.ex6.Q, 4)} MeV (A and Z balance).
- **Chain reaction:** the neutrons cause further fissions. Uncontrolled (more than one further fission each): explosive, a **nuclear bomb**. Controlled (one on average): steady, a **reactor**.
- **Reactor:** **fuel** (enriched uranium); **moderator** (heavy water, graphite) slows neutrons so they cause fission; **control rods** (cadmium, boron) absorb neutrons, moved in or out to regulate the rate; **coolant** carries the heat to a heat exchanger and turbine; **shielding** (concrete, steel) absorbs neutrons and gamma rays.
- A reactor cannot explode like a bomb: its fuel is only slightly enriched and the control rods keep the chain reaction controlled.
- Not examined (removed in ISC): details of the chain reaction and quantitative reactor operation.`,
      [kt('Nuclear fission', 'The splitting of a heavy nucleus into two middle-order nuclei, with the release of neutrons and a large amount of energy.'), kt('Moderator', 'A material of light nuclei (such as heavy water or graphite) that slows fast neutrons so they can cause fission.'), kt('Control rods', 'Rods of a neutron absorber (cadmium, boron) moved in or out of the core to regulate the chain reaction.')],
      [fm(r`^{1}_{0}\text{n} + {}^{235}_{92}\text{U} \to {}^{141}_{56}\text{Ba} + {}^{92}_{36}\text{Kr} + 3\,^{1}_{0}\text{n} + Q`, 'A fission reaction')],
      V.reactor,
      [4],
      [V.fission, V.chain],
    ),
    sec(
      '7. Nuclear fusion; the Sun and stars; the hydrogen bomb',
      `- **Fusion:** two light nuclei join into a heavier one, raising B/A and releasing energy. Example: ²₁H + ³₂He → ⁴₂He + ¹₁H, Q = ${dec(EX.ex8.Q, 4)} MeV.
- **High temperature:** both nuclei are positive and repel; to get within about 10⁻¹⁵ m they must climb the Coulomb barrier (0.60 MeV for two touching protons), so the gas must be at millions of kelvin: **thermonuclear** reactions. At 1.5 × 10⁷ K the mean energy is only about 2 keV; fusion proceeds because the fastest nuclei in the hot gas have far more than the mean.
- **Sun and stars:** the proton–proton chain turns four hydrogen nuclei into one helium nucleus, releasing about 26.7 MeV and keeping the star shining for billions of years.
- **Hydrogen bomb:** a fission bomb supplies the temperature to start uncontrolled fusion of hydrogen isotopes.`,
      [kt('Thermonuclear energy', 'Energy released by fusion reactions in a gas at a temperature of millions of kelvin, as in the Sun and stars.'), kt('Coulomb barrier', 'The electrostatic repulsion between two nuclei, which they must overcome to come within the range of the strong force.')],
      [fm(r`Q = (m_{\text{reactants}} - m_{\text{products}}) \times 931.5\ \text{MeV}`, 'Energy released in a reaction, masses in u')],
      V.barrier,
      [5],
    ),
  ],
  exam_tips_md: `- Use atomic masses with $m_H$ and keep six decimals; convert Δm to MeV with 931.5 only at the end.
- Show that A cancels when proving constant nuclear density.
- Balance A and Z in every nuclear equation; Q = (mass lost) × 931.5 MeV.
- Explain "why both release energy" with the maximum of the B/A curve and the direction in which each type of nucleus moves.
- Each reactor part gets one function; fusion needs a high temperature because of the Coulomb repulsion.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a nucleon?', 'A proton or a neutron inside a nucleus.', 'definition', 1),
    fc(2, 'Meaning of Z, N and A?', 'Z protons, N neutrons, A = Z + N nucleons.', 'definition', 1),
    fc(3, 'Isotopes, isobars, isotones?', 'Same Z; same A; same N.', 'definition', 1),
    fc(4, '¹³C and ¹³N: isotopes, isobars or isotones?', 'Isobars: both have A = 13 (Z = 6 and 7, so N = 7 and 6).', 'example', 1),
    fc(5, 'Define the unified atomic mass unit.', 'One twelfth of the mass of a neutral carbon-12 atom: 1.6605 × 10⁻²⁷ kg.', 'definition', 1),
    fc(6, 'Formula for the radius of a nucleus?', '$R = R_0A^{1/3}$, R₀ ≈ 1.2 fm.', 'formula', 1),
    fc(7, 'Why does R ∝ A^(1/3) mean a constant density?', 'Volume ∝ R³ ∝ A, so volume is proportional to mass: mass/volume is the same for all nuclei.', 'concept', 1),
    fc(8, 'Order of magnitude of nuclear density?', 'About 2.3 × 10¹⁷ kg m⁻³, the same for every nucleus.', 'fact', 1),
    fc(9, 'Size of a nucleus compared with its atom?', 'Radius about 10⁻¹⁵ to 10⁻¹⁴ m against 10⁻¹⁰ m: about 10⁴ to 10⁵ times smaller.', 'fact', 1),
    fc(10, 'What holds a nucleus together?', 'The strong nuclear force: short-range, attractive, equal between any pair of nucleons.', 'concept', 1),
    fc(11, 'Mass–energy relation?', '$E = mc^2$: mass m is equivalent to energy mc².', 'formula', 2),
    fc(12, 'Energy equivalent of 1 u?', '931.5 MeV (1 u = 931.5 MeV/c²).', 'fact', 2),
    fc(13, 'Define mass defect.', 'Total mass of the separate nucleons minus the mass of the nucleus.', 'definition', 2),
    fc(14, 'Mass defect from atomic masses?', '$\\Delta m = Zm_H + (A - Z)m_n - M_{\\text{atom}}$ (electron masses cancel).', 'formula', 2),
    fc(15, 'Define binding energy.', 'Energy equivalent of the mass defect: needed to separate a nucleus into its nucleons, or released when it forms.', 'definition', 2),
    fc(16, 'Binding energy in MeV from Δm in u?', 'B = Δm × 931.5 MeV.', 'formula', 2),
    fc(17, 'Pair production: threshold and condition?', 'Photon energy ≥ 2mₑc² = 1.022 MeV, near a nucleus (momentum).', 'concept', 2),
    fc(18, 'Why must a nucleus be near for pair production?', 'To take up momentum, so energy and momentum are both conserved.', 'concept', 2),
    fc(19, 'Annihilation of an electron and a positron at rest?', 'Two photons of 0.511 MeV each, in opposite directions.', 'concept', 2),
    fc(20, 'Where is the binding energy per nucleon greatest?', 'About 8.8 MeV near A = 56–62 (iron, nickel).', 'fact', 3),
    fc(21, 'Which nuclei are most stable?', 'Middle-order nuclei (A about 50 to 80): highest B/A.', 'concept', 3),
    fc(22, 'Why does B/A fall for heavy nuclei?', 'The long-range electrostatic repulsion between protons grows faster than the number of nucleons.', 'concept', 3),
    fc(23, 'Why do fission and fusion both release energy?', 'Both move nuclei towards the peak of the B/A curve, increasing the total binding energy.', 'concept', 3),
    fc(24, 'Energy from a heavy nucleus splitting into halves?', 'A × (B/A of the halves − B/A of the heavy nucleus), about 200 MeV for A = 236.', 'formula', 3),
    fc(25, 'Define nuclear fission.', 'A heavy nucleus splits into two middle-order nuclei, with neutrons and about 200 MeV released.', 'definition', 4),
    fc(26, 'Controlled versus uncontrolled chain reaction?', 'Controlled: one further fission per fission on average (reactor). Uncontrolled: more than one (bomb).', 'concept', 4),
    fc(27, 'Functions of moderator, control rods, coolant, shielding?', 'Slows neutrons; absorbs neutrons to regulate the rate; carries heat away; absorbs neutrons and gamma rays.', 'concept', 4),
    fc(28, 'Define nuclear fusion.', 'Two light nuclei join into a heavier one, with energy released.', 'definition', 5),
    fc(29, 'Why is a very high temperature needed for fusion?', 'To give nuclei enough energy to overcome their mutual electrostatic repulsion (Coulomb barrier).', 'concept', 5),
    fc(30, 'Source of the Sun’s energy?', 'Fusion of four hydrogen nuclei into one helium nucleus: about 26.7 MeV each (thermonuclear energy).', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
