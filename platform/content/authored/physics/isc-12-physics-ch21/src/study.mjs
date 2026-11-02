// ISC 12 Physics ch21 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, gapPlot, fwdPlot, revPlot, zPlot, regPlot, filterPlot, ledPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Semiconductor Electronics — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Energy bands: conductors, insulators and semiconductors',
      `- In a crystal the electrons of neighbouring atoms interact and no two electrons may share a state, so each atomic energy level splits into N closely spaced levels that merge into a **band**. The band holding the outer electrons is the **valence band**; the next band up is the **conduction band**; between them lies the **forbidden gap** $E_g$ (energy bands are treated qualitatively only in ISC).
- **Conductor:** the bands overlap (or the conduction band is part-filled): many free electrons at all temperatures.
- **Insulator:** valence band full, conduction band empty, large gap (more than about 3 eV): carbon (diamond) 5.5 eV; nothing conducts at room temperature.
- **Semiconductor:** same arrangement, small gap: germanium 0.7 eV, silicon 1.1 eV. At 0 K it is an insulator; at room temperature a few electrons cross the gap, leaving **holes**; heating lowers the resistance.
- A photon can lift an electron across the gap only if $h\\nu \\ge E_g$, i.e. $\\lambda \\le \\dfrac{hc}{E_g} = \\dfrac{1240}{E_g}$ nm: silicon absorbs up to 1127 nm (infrared); diamond only below 225 nm, so it is transparent to visible light.
- Crystal structure is a removed topic and is not examined.`,
      [kt('Forbidden gap', 'The range of energies between the top of the valence band and the bottom of the conduction band, where a perfect crystal has no electron states.'), kt('Valence band', 'The band of energies occupied by the outer (valence) electrons of the atoms.'), kt('Conduction band', 'The band above the valence band; electrons in it are free to carry current.')],
      [fm(r`\lambda_{max} = \dfrac{hc}{E_g} = \dfrac{1240}{E_g(\text{eV})}\ \text{nm}`, 'Longest wavelength that can lift an electron across the gap')],
      V.bands,
      [1],
      [gapPlot],
    ),
    sec(
      '2. Intrinsic and extrinsic semiconductors; doping',
      `- **Intrinsic** (pure) semiconductor: thermal energy breaks bonds, giving **equal numbers** of free electrons and holes. A **hole** is a vacant bond that behaves as a carrier of charge +e; bonding electrons jump into it, so it drifts the opposite way to the electrons. Total current = electron current + hole current.
- **Doping** (about 1 atom in 10⁷) gives an **extrinsic** semiconductor. **n-type:** a pentavalent **donor** (P, As, Sb) uses four valence electrons in bonds and gives one free electron, becoming a fixed positive ion; electrons are the **majority** carriers, holes the **minority** carriers. **p-type:** a trivalent **acceptor** (B, Al, Ga, In) leaves one bond short, i.e. a hole, and becomes a fixed negative ion; holes are the majority, electrons the minority.
- In energy terms a donor level lies just below the conduction band and an acceptor level just above the valence band (about 0.05 eV in silicon).
- Doped crystals remain **electrically neutral**. The conductivity is $\\sigma = e(n_e\\mu_e + n_h\\mu_h)$; doping raises it by many orders of magnitude (one donor in 10⁷ atoms gives about 5 × 10²¹ electrons per m³, against 1.5 × 10¹⁶ per m³ in pure silicon). Warming adds mainly minority carriers.`,
      [kt('Hole', 'A vacancy in a covalent bond that behaves as a mobile carrier of positive charge +e.'), kt('Donor', 'A pentavalent impurity that gives a free electron to the crystal and becomes a fixed positive ion.'), kt('Acceptor', 'A trivalent impurity that accepts an electron from a bond, creating a hole, and becomes a fixed negative ion.'), kt('Majority carrier', 'The type of carrier present in far larger numbers: electrons in n-type, holes in p-type.')],
      [fm(r`\sigma = e\,(n_e \mu_e + n_h \mu_h)`, 'Conductivity of a semiconductor')],
      V.lattice,
      [2],
      [V.doped],
    ),
    sec(
      '3. The p-n junction: depletion region and barrier; bias',
      `- Joining p-type and n-type material: electrons diffuse from n to p and holes from p to n, and recombine near the junction. This uncovers fixed positive donor ions on the n side and negative acceptor ions on the p side: the **depletion region** (about 1 μm wide, no mobile carriers). Its field (about 10⁶ V m⁻¹) points from n to p, and the potential difference across it is the **barrier potential** V₀: about 0.7 V for silicon, 0.3 V for germanium. It stops further net diffusion.
- **Forward bias** (battery + to p): the barrier falls to V₀ − V, the region narrows, majority carriers cross easily and a large current flows. **Reverse bias** (battery + to n): the barrier rises to V₀ + V, the region widens, and only a tiny reverse current of minority carriers flows.`,
      [kt('Depletion region', 'The thin layer at a p-n junction containing fixed ions and no mobile carriers.'), kt('Barrier potential', 'The potential difference V₀ across the depletion region that stops further diffusion of the majority carriers.')],
      [fm(r`V_{barrier} = V_0 - V\ \text{(forward)}, \quad V_0 + V\ \text{(reverse)}`, 'Barrier height with bias')],
      V.junction,
      [3],
      [V.bias],
    ),
    sec(
      '4. V–I characteristics and simple diode circuits',
      `- **Forward:** almost no current up to the **knee voltage** (about 0.7 V for Si, 0.3 V for Ge), then a very steep rise. **Reverse:** a tiny current (nA for silicon) that hardly depends on the voltage, because it is carried by thermally generated minority carriers, until breakdown at a large reverse voltage.
- Dynamic resistance $r_d = \\dfrac{\\Delta V}{\\Delta I}$ (a few ohms in the steep region); static resistance is V/I.
- **Diode circuits:** first decide whether each diode is forward biased (p side at the higher voltage by more than the knee) or reverse biased. A conducting silicon diode drops about 0.7 V (germanium 0.3 V); a reverse-biased diode carries no current. Example: Si diode in series with 220 Ω across 6.0 V: I = (6.0 − 0.7)/220 = 24.1 mA.`,
      [kt('Knee voltage', 'The forward voltage at which the current of a diode begins to rise steeply (about 0.7 V for Si, 0.3 V for Ge).'), kt('Dynamic resistance', 'The ratio ΔV/ΔI of a small change of voltage to the resulting change of current on the forward characteristic.')],
      [fm(r`r_d = \dfrac{\Delta V}{\Delta I}`, 'Dynamic resistance'), fm(r`I = \dfrac{E - V_{drop}}{R}`, 'Current in a series diode circuit')],
      fwdPlot,
      [3],
      [revPlot, V.circs],
    ),
    sec(
      '5. Rectifiers: half-wave and full-wave (centre-tap); the filter',
      `- **Half-wave:** transformer secondary, diode and load in series. The diode conducts in the positive half-cycles only: output pulses at the **same frequency** as the input (50 Hz), large ripple.
- **Centre-tap full-wave (two diodes):** the secondary ends A and B, equal and opposite with respect to the centre tap C, go to the anodes of D₁ and D₂; the cathodes join to the load, whose other end goes to C. D₁ and D₂ conduct in alternate half-cycles and the current always flows the same way through the load: ripple at **twice** the input frequency (100 Hz). (The bridge rectifier with four diodes is removed in ISC.)
- **Roles:** transformer — suitable a.c. voltage (and two phases); diode — one-way conduction; **filter capacitor** — charges at the peaks and discharges slowly into the load; load — what is supplied.
- Ripple with a capacitor: $\\Delta V \\approx \\dfrac{I t}{C}$ with $t = \\dfrac{1}{2f}$ (full-wave) or $\\dfrac{1}{f}$ (half-wave). Peak output = $V_m - 0.7$ V for a silicon diode, with $V_m = \\sqrt{2}\\,V_{rms}$.`,
      [kt('Rectification', 'The conversion of an alternating voltage into a unidirectional one by a diode.'), kt('Ripple', 'The small variation of the output voltage of a filtered rectifier about its mean value.'), kt('Centre tap', 'A terminal at the middle of the secondary winding, giving two equal voltages of opposite phase.')],
      [fm(r`f_{ripple} = f\ \text{(half-wave)}, \quad 2f\ \text{(full-wave)}`, 'Ripple frequency'), fm(r`\Delta V \approx \dfrac{I\,t}{C}`, 'Ripple voltage (constant-current discharge)')],
      V.fw,
      [4],
      [V.hw, filterPlot],
    ),
    sec(
      '6. LED, photodiode and solar cell',
      `- **LED:** a p-n junction in **forward bias**. Electrons and holes recombine in the junction region and release photons of energy $h\\nu \\approx E_g$; the colour is set by the band gap (about 1.9 eV red, 2.3 eV green, 2.7 eV blue). A series resistor sets the current: $R = \\dfrac{V - V_f}{I}$.
- **Energy saving:** an LED turns far more of its input into light than a filament lamp (which wastes most as heat) and lasts much longer, so the same light needs much less electricity, which means less fuel burnt and less pollution.
- **Photodiode:** used in **reverse bias**; photons with $h\\nu \\ge E_g$ create pairs in the depletion region and the field sweeps them apart, so the reverse current rises with the light intensity. The small dark current makes the fractional change large. Uses: detectors, light meters, switches.
- **Solar cell:** a large-area p-n junction with a thin p layer, **no bias**; the junction field separates the pairs made by light, so the cell is itself a source of emf (about 0.5–0.7 V for silicon). Efficiency = electrical output / light power received.`,
      [kt('LED', 'A forward-biased p-n junction that emits light by electron–hole recombination.'), kt('Photodiode', 'A reverse-biased p-n junction whose current increases with the intensity of the light falling on it.'), kt('Solar cell', 'A p-n junction that converts light into electrical energy, with no external bias.')],
      [fm(r`\lambda \approx \dfrac{hc}{E_g} = \dfrac{1240}{E_g(\text{eV})}\ \text{nm}`, 'Wavelength of an LED'), fm(r`R = \dfrac{V - V_f}{I}`, 'Series resistor for an LED')],
      V.led,
      [5],
      [ledPlot, V.pd, V.solar],
    ),
    sec(
      '7. The Zener diode and the voltage regulator',
      `- A **Zener diode** is a heavily doped junction that breaks down sharply at a chosen reverse voltage $V_Z$. In reverse bias there is almost no current until $V_Z$; then the current rises steeply while the voltage stays almost equal to $V_Z$. In forward bias it behaves like an ordinary diode.
- **Regulator:** the Zener diode, reverse connected, is in parallel with the load, with a series resistor $R_s$. In breakdown $V_{out} = V_Z$. $I = \\dfrac{V_{in} - V_Z}{R_s}$, $I_L = \\dfrac{V_Z}{R_L}$, $I_Z = I - I_L$.
- If $V_{in}$ rises, the extra current flows through the Zener diode and the extra voltage drops across $R_s$. If $R_L$ falls, $I_L$ rises and $I_Z$ falls by the same amount. Regulation fails when $I_Z$ would have to fall below its minimum (the load takes all the current) or above the rating (power $V_Z I_Z$ too large).`,
      [kt('Zener voltage', 'The reverse voltage at which a Zener diode breaks down; the voltage it holds across the load.'), kt('Voltage regulator', 'A circuit that keeps the output voltage nearly constant when the input voltage or the load changes.')],
      [fm(r`I_Z = \dfrac{V_{in} - V_Z}{R_s} - \dfrac{V_Z}{R_L}`, 'Zener current'), fm(r`P_Z = V_Z I_Z`, 'Power dissipated in the Zener diode')],
      zPlot,
      [6],
      [V.zreg, regPlot],
    ),
  ],
  exam_tips_md: `- Draw band diagrams with the insulator gap clearly largest (diamond 5.5 eV, Si 1.1 eV, Ge 0.7 eV); energy bands are qualitative only.
- Doped crystals are neutral; donors are pentavalent, acceptors trivalent; name the majority and minority carriers.
- In diode circuits decide forward or reverse bias first, then subtract 0.7 V (Si) or 0.3 V (Ge) only for a conducting diode.
- Rectifiers: circuit, waveforms and output frequency (f for half-wave, 2f for full-wave); ripple ΔV = It/C.
- LED forward, photodiode reverse, solar cell no bias; Zener reverse across the load with a series resistor, I = I_Z + I_L.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why do energy levels become bands in a crystal?', 'Electrons of neighbouring atoms interact and no two may share a state, so each level splits into N close levels.', 'concept', 1),
    fc(2, 'Valence band, conduction band, forbidden gap?', 'Outer electrons fill the valence band; the next band up is the conduction band; the empty energy range between them is the forbidden gap Eg.', 'definition', 1),
    fc(3, 'Band picture of a conductor?', 'The valence and conduction bands overlap (or the conduction band is part-filled): no gap.', 'concept', 1),
    fc(4, 'Band picture of an insulator?', 'Full valence band, empty conduction band, large gap (diamond 5.5 eV).', 'concept', 1),
    fc(5, 'Band gaps of Ge and Si?', 'Ge about 0.7 eV; Si about 1.1 eV.', 'fact', 1),
    fc(6, 'Why does a semiconductor conduct more when warmed?', 'More electrons cross the gap, making more electron–hole pairs; the resistance falls.', 'concept', 1),
    fc(7, 'Longest wavelength that crosses a gap Eg?', 'λ = hc/Eg = 1240/Eg nm (Eg in eV). Silicon: 1127 nm.', 'formula', 1),
    fc(8, 'Why is diamond transparent?', 'Its 5.5 eV gap is bigger than any visible photon (1.8–3.1 eV), so none is absorbed.', 'concept', 1),
    fc(9, 'What is an intrinsic semiconductor?', 'A pure crystal; thermal energy makes equal numbers of free electrons and holes.', 'definition', 2),
    fc(10, 'What is a hole?', 'A vacant covalent bond that acts as a mobile carrier of charge +e; it drifts opposite to the electrons.', 'definition', 2),
    fc(11, 'What is doping?', 'Adding a tiny amount (about 1 atom in 10⁷) of a suitable impurity to a pure semiconductor.', 'definition', 2),
    fc(12, 'n-type: impurity and majority carriers?', 'Pentavalent donor (P, As, Sb); electrons are the majority carriers, holes the minority.', 'fact', 2),
    fc(13, 'p-type: impurity and majority carriers?', 'Trivalent acceptor (B, Al, Ga, In); holes are the majority carriers, electrons the minority.', 'fact', 2),
    fc(14, 'Is an n-type crystal charged?', 'No: each free electron is balanced by a fixed positive donor ion.', 'concept', 2),
    fc(15, 'Where are donor and acceptor levels?', 'Donor level just below the conduction band; acceptor level just above the valence band.', 'concept', 2),
    fc(16, 'Conductivity of a semiconductor?', 'σ = e (nₑ μₑ + nₕ μₕ).', 'formula', 2),
    fc(17, 'What forms the depletion region?', 'Diffusion and recombination of electrons and holes uncover fixed donor (+) and acceptor (−) ions with no mobile carriers.', 'concept', 3),
    fc(18, 'Barrier potential of Si and Ge?', 'About 0.7 V for silicon and 0.3 V for germanium.', 'fact', 3),
    fc(19, 'Direction of the built-in field?', 'From the n side to the p side.', 'fact', 3),
    fc(20, 'Forward bias: connection and effect?', 'Battery + to p. Barrier falls to V₀ − V, region narrows, large current.', 'concept', 3),
    fc(21, 'Reverse bias: connection and effect?', 'Battery + to n. Barrier rises to V₀ + V, region widens, tiny minority-carrier current.', 'concept', 3),
    fc(22, 'Why is the reverse current almost constant?', 'It is carried by thermally generated minority carriers, whose number does not depend on the voltage.', 'concept', 3),
    fc(23, 'Dynamic resistance of a diode?', 'rd = ΔV/ΔI on the forward characteristic.', 'formula', 3),
    fc(24, 'Half-wave rectifier: output frequency?', 'Same as the input (50 Hz): one pulse per cycle.', 'fact', 4),
    fc(25, 'Centre-tap full-wave rectifier: output frequency?', 'Twice the input: 100 Hz on 50 Hz mains.', 'fact', 4),
    fc(26, 'Role of the centre tap?', 'Gives two voltages equal and opposite in phase, so D₁ and D₂ conduct in turn.', 'concept', 4),
    fc(27, 'Role of the filter capacitor?', 'Charges at the peaks and discharges slowly into the load, smoothing the pulses; ΔV ≈ It/C.', 'concept', 4),
    fc(28, 'LED, photodiode, solar cell: bias?', 'LED forward; photodiode reverse; solar cell no bias.', 'fact', 5),
    fc(29, 'Why do LEDs save energy?', 'More of the input becomes light and less heat than in a filament lamp; they last longer; less fuel burnt, less pollution.', 'concept', 5),
    fc(30, 'Zener regulator relations?', 'Zener reverse across the load with Rs in series; Vout = VZ; I = (Vin − VZ)/Rs; IL = VZ/RL; IZ = I − IL.', 'formula', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
