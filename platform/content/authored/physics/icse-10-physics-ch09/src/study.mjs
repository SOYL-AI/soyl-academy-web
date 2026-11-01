// ICSE 10 Physics ch09 Electrical Power, Energy and Household Circuits — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electrical Power, Energy and Household Circuits — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Electrical energy and power',
      r`- Energy: $W = QV = VIt = I^{2}Rt = \dfrac{V^{2}t}{R}$ (joule). In a resistor it all becomes heat (Joule heating).
- Power: $P = \dfrac{W}{t} = VI = I^{2}R = \dfrac{V^{2}}{R}$ (watt; 1 W = 1 J s⁻¹; 1 kW = 1000 W; 1 MW = 10⁶ W).
- Use $I^{2}R$ when the current is common (series) and $V^{2}/R$ when the voltage is common (parallel, mains).`,
      [kt('Electrical power', 'The rate at which electrical energy is converted into other forms by an appliance.'), kt('Watt', 'The power of an appliance that converts one joule of electrical energy every second.')],
      [fm(r`W = VIt = I^{2}Rt = \dfrac{V^{2}t}{R}`, 'Electrical energy'), fm(r`P = VI = I^{2}R = \dfrac{V^{2}}{R}`, 'Electrical power')],
      table(['Known', 'Use'], [['V and I', 'P = VI'], ['I and R', 'P = I²R'], ['V and R', 'P = V²/R']], 'Table of which power formula to use for each pair of known quantities'),
      [1],
    ),
    sec(
      '2. Power rating of an appliance',
      r`- **“1000 W, 220 V”**: when connected to 220 V the appliance converts 1000 J of electrical energy every second.
- From the rating: $I = \dfrac{P}{V}$ and $R = \dfrac{V^{2}}{P}$ (R stays the same if the voltage changes).
- On a different voltage: $P' = \dfrac{V'^{2}}{R}$, so $\dfrac{P'}{P} = \left(\dfrac{V'}{V}\right)^{2}$.
- For the same voltage, a higher-power appliance has a lower resistance.`,
      [kt('Power rating', 'The power an appliance converts when it is connected to its stated (rated) voltage.')],
      [fm(r`R = \dfrac{V^{2}}{P}`, 'Resistance from the rating'), fm(r`\dfrac{P'}{P} = \left(\dfrac{V'}{V}\right)^{2}`, 'Power at another voltage')],
      table(['Rating', 'Current', 'Resistance'], [['100 W, 220 V', '0.45 A', '484 Ω'], ['1000 W, 220 V', '4.55 A', '48.4 Ω'], ['2200 W, 220 V', '10 A', '22 Ω']], 'Table of three power ratings with their current and resistance'),
      [1],
    ),
    sec(
      '3. The kilowatt hour and electricity bills',
      r`- **1 kWh** = energy used by a 1 kW appliance in 1 hour $= 1000 \times 3600 = 3.6 \times 10^{6}$ J; the commercial **unit** of electrical energy.
- Units = power (kW) × time (h) × number of appliances × days.
- Cost = units × rate per unit.
- Energy use depends on power **and** hours of use; efficient devices (LED lamps) save units.`,
      [kt('Kilowatt hour', 'The electrical energy consumed by an appliance of power one kilowatt working for one hour; it equals 3.6 million joules.')],
      [fm(r`1\ \text{kWh} = 3.6 \times 10^{6}\ \text{J}`, 'Commercial unit'), fm(r`\text{units} = P\,(\text{kW}) \times t\,(\text{h})`, 'Energy in kWh')],
      table(['Appliance', 'Power', 'Hours', 'kWh'], [['Electric iron', '1 kW', '1', '1'], ['LED lamp', '10 W', '100', '1'], ['Geyser', '2 kW', '0.5', '1']], 'Table of three ways of using one kilowatt hour'),
      [2],
    ),
    sec(
      '4. Power distribution and house wiring',
      `- Generated at about **11 kV** → stepped up to about **132 kV** → transmission lines → stepped down to **33 kV**, then **11 kV**, then **220 V** for houses. High voltage means low current, so less **I²R** loss in the lines.
- Supply in India: **220 V, 50 Hz** AC; live wire at 220 V, neutral at about 0 V.
- From the pole: **company fuse** (in the live wire) → **kWh meter** → **main switch** (double pole: breaks live and neutral) → **distribution board** (a fuse or MCB for each circuit) → circuits.
- Appliances are connected **in parallel**: each gets 220 V and can be switched independently.`,
      [kt('Distribution board', 'The box after the main switch from which separate circuits, each with its own fuse or MCB, are taken to different parts of a house.'), kt('Double pole main switch', 'A switch that breaks both the live and the neutral wires at the same time.')],
      [],
      table(['Stage', 'Voltage'], [['Generation', '11 kV'], ['Transmission', '132 kV or more'], ['House supply', '220 V']], 'Table of voltages at three stages of power distribution'),
      [3],
    ),
    sec(
      '5. Fuse, MCB and the ring main',
      r`- **Fuse:** a short thin wire of an alloy of **low melting point** (tin–lead), joined **in series in the live wire**; it melts when the current exceeds its rating (overload or short circuit). Rating: **just above** the normal current $I = P/V$.
- **MCB (miniature circuit breaker):** an automatic switch that **trips** when the current is too large and can simply be **reset**.
- **Switches and fuses in the live wire:** when off or blown, the appliance is disconnected from the high potential.
- **Ring main:** a cable (L, N, E) runs from the distribution board round the rooms and **back to the board**; protected by a **30 A** fuse or MCB; sockets in **parallel**; current reaches each socket by **two paths**, so a thinner cable will do.`,
      [kt('Fuse', 'A safety device: a short wire of low melting point in the live wire that melts and breaks the circuit when the current exceeds a set value.'), kt('Ring main', 'A household circuit in which a cable loop starting and ending at the distribution board feeds sockets connected in parallel along it.')],
      [fm(r`I = \dfrac{P}{V}`, 'Normal current, for choosing a fuse')],
      table(['Feature', 'Fuse', 'MCB'], [['Action', 'Wire melts', 'Switch trips'], ['After a fault', 'Must be replaced', 'Reset by hand'], ['Placed in', 'Live wire', 'Live wire']], 'Table comparing a fuse and a miniature circuit breaker'),
      [3],
    ),
    sec(
      '6. Two-way switch, three-pin plug, earthing and safety',
      `- **Two-way switch:** a common terminal and two contacts. Staircase wiring: live → common of S1; two strap wires join the contacts of S1 and S2; common of S2 → lamp → neutral. Lamp on when both levers are on the same strap; either switch changes it.
- **Three-pin plug:** earth pin **longer** (connects first, disconnects last) and **thicker** (cannot enter the L or N hole).
- **Earthing:** the metal body is joined to a copper plate buried in moist ground; a live-to-body fault sends a large current to earth, so the fuse melts.
- **Colour code (new):** live **brown**, neutral **light blue**, earth **green / green-yellow** (old: red, black, green).
- **Safety:** correct fuse rating, no overloading, switch off the mains for repairs, dry hands, earthed metal appliances, good insulation.`,
      [kt('Earthing', 'Connecting the metal body of an appliance to the earth through a thick wire and a buried plate, so that a fault current flows to the ground.'), kt('Two-way switch', 'A switch with one common terminal that can be connected to either of two contacts, used in pairs to control one lamp from two places.')],
      [],
      table(['Wire', 'New colour', 'Old colour'], [['Live', 'Brown', 'Red'], ['Neutral', 'Light blue', 'Black'], ['Earth', 'Green or green-yellow', 'Green']], 'Table of the new and old colour codes for house wiring'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using watts and minutes when finding kWh.
- Assuming an appliance gives its rated power on any voltage.
- Putting the fuse or switch in the neutral wire.
- Choosing a fuse rating far above the normal current.
- Giving only one reason for the shape of the earth pin.

**How marks are usually awarded**
- Bills: units per appliance (1), total units (1), cost (1).
- Wiring: correct order of parts and the function of each.
- Safety: a reason for each device, linked to the live wire or to earth.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Electrical energy in terms of V, I and t?', 'W = VIt.', 'formula', 1),
    fc(2, 'Heat produced in a resistor (Joule’s law)?', 'H = I²Rt.', 'formula', 1),
    fc(3, 'Electrical power?', 'Rate of conversion of electrical energy: P = VI.', 'definition', 1),
    fc(4, 'Power in terms of V and R?', 'P = V² ÷ R.', 'formula', 1),
    fc(5, 'Meaning of “2000 W, 220 V” on a geyser?', 'It converts 2000 J each second when connected to 220 V.', 'concept', 1),
    fc(6, 'Resistance from a power rating?', 'R = V² ÷ P.', 'formula', 1),
    fc(7, 'Same voltage: higher power means…?', 'Lower resistance.', 'concept', 1),
    fc(8, 'Supply voltage halves; power of a heater?', 'Becomes one quarter (P ∝ V²).', 'concept', 1),
    fc(9, 'One kilowatt hour?', 'Energy used by a 1 kW appliance in 1 hour.', 'definition', 2),
    fc(10, '1 kWh in joules?', '3.6 × 10⁶ J.', 'formula', 2),
    fc(11, 'Units on a bill?', 'Kilowatt hours: kW × hours.', 'fact', 2),
    fc(12, 'A 500 W mixer for 2 hours uses…?', '1 kWh (one unit).', 'example', 2),
    fc(13, 'Why transmit power at high voltage?', 'Smaller current, so less I²R heat loss in the lines.', 'concept', 3),
    fc(14, 'Voltage at which power is generated?', 'About 11 kV.', 'fact', 3),
    fc(15, 'House supply in India?', '220 V, 50 Hz AC.', 'fact', 3),
    fc(16, 'Order of parts from the pole?', 'Company fuse, kWh meter, main switch, distribution board.', 'concept', 3),
    fc(17, 'Main switch type?', 'Double pole: breaks live and neutral together.', 'fact', 3),
    fc(18, 'Fuse wire material property?', 'Low melting point (tin–lead alloy).', 'fact', 3),
    fc(19, 'Where are fuses and switches placed?', 'In the live wire.', 'fact', 3),
    fc(20, 'MCB advantage over a fuse?', 'Trips automatically and can be reset.', 'concept', 3),
    fc(21, 'Ring main rating?', '30 A fuse or MCB.', 'fact', 3),
    fc(22, 'Why can a ring main cable be thinner?', 'Each socket is fed by two paths.', 'concept', 3),
    fc(23, 'How are household appliances connected?', 'In parallel.', 'fact', 3),
    fc(24, 'Use of a two-way switch?', 'Controlling one lamp from two places, such as a staircase.', 'example', 4),
    fc(25, 'Why is the earth pin longer?', 'It connects first and disconnects last.', 'diagram', 4),
    fc(26, 'Why is the earth pin thicker?', 'It cannot be inserted into the live or neutral hole.', 'diagram', 4),
    fc(27, 'Live wire colour (new code)?', 'Brown.', 'fact', 4),
    fc(28, 'Neutral and earth colours (new code)?', 'Light blue; green or green-yellow.', 'fact', 4),
    fc(29, 'What happens when an earthed body becomes live?', 'Large current to earth; the fuse melts.', 'concept', 4),
    fc(30, 'Exam tip: fuse rating', 'Find I = P ÷ V, then choose the rating just above it.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
