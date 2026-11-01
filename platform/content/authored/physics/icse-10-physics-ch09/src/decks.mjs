// ICSE 10 Physics ch09 Electrical Power, Energy and Household Circuits — two decks: Part 1 (t01–t02) electrical energy and
// power, power ratings, the kilowatt hour and electricity bills; Part 2 (t03–t04) power distribution, house wiring, fuse
// and MCB, ring main, two-way switch, three-pin plug, earthing, colour code and safety.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { HOUSE, SWITCH_FUSE, RING_MAIN, TWO_WAY, PLUG, EARTHING } from './svgs.mjs';

const V = {
  house: svgV(HOUSE, 'Supply from the pole through the company fuse, kilowatt hour meter and double pole main switch to the distribution board and three circuits'),
  sf: svgV(SWITCH_FUSE, 'A toaster on the mains with the fuse and the switch in the live wire, the neutral returning, and the metal body earthed'),
  ring: svgV(RING_MAIN, 'A ring main cable loop starting and ending at the distribution board with five sockets connected along it'),
  twoway: svgV(TWO_WAY, 'Two two-way switches joined by two strap wires controlling one staircase lamp, with the table of lever positions'),
  plug: svgV(PLUG, 'Front of a three-pin socket and side view of a plug with a longer, thicker earth pin'),
  earth: svgV(EARTHING, 'A geyser whose live wire has touched the metal body, with a large fault current flowing to earth and melting the fuse'),
  pv: plot(
    {
      x: { min: 0, max: 240, label: 'supply voltage V (V)' },
      y: { min: 0, max: 1200, label: 'power P (W)' },
      functions: [{ expr: 'x^2/48.4', label: 'geyser element, R = 48.4 Ω: P = V² ÷ R', domain: [0, 240] }],
      points: [{ at: [220, 1000], label: 'rated: 1000 W at 220 V' }, { at: [176, 640], label: 'at 176 V: only 640 W' }],
    },
    'Graph of power against supply voltage for a geyser element of resistance forty eight point four ohms. The curve rises steeply: at two hundred and twenty volts the power is one thousand watts, but at one hundred and seventy six volts it is only six hundred and forty watts.',
    'Power ∝ V² for a fixed resistance: a 20% fall in voltage cuts the power by 36%.',
  ),
  et: plot(
    {
      x: { min: 0, max: 5, label: 'time of use t (h)' },
      y: { min: 0, max: 10, label: 'energy used (kWh)' },
      functions: [
        { expr: '2x', label: '2 kW room heater', domain: [0, 5] },
        { expr: 'x', label: '1 kW electric iron', domain: [0, 5] },
        { expr: '0.1x', label: '100 W television', domain: [0, 5] },
      ],
      points: [{ at: [3, 6], label: '2 kW for 3 h = 6 kWh' }, { at: [4, 0.4], label: '100 W for 4 h = 0.4 kWh' }],
    },
    'Graph of energy used, in kilowatt hours, against hours of use for three appliances. The two kilowatt heater line is steepest and reaches six units in three hours; the one hundred watt television line is nearly flat and reaches only point four units in four hours.',
    'Energy in kWh = power in kW × time in hours: the slope of each line is the power.',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Electrical Power and Energy — Part 1: Power, energy and bills',
  goals: [
    'Derive and use W = VIt = I²Rt = V²t/R and P = VI = I²R = V²/R',
    'Interpret a power rating such as 1000 W, 220 V',
    'Use the kilowatt hour and calculate the cost of electricity for a household',
  ],
  slides: [
    sl('title', 'Where do the units on the bill come from?', {
      b: 'Part 1 — every appliance converts electrical energy at its own rate. The bill counts that energy in **units** (kilowatt hours).',
      v: table(['Appliance', 'Typical rating', 'Energy goes to'], [['LED tube light', '20 W, 220 V', 'Light (and a little heat)'], ['Ceiling fan', '75 W, 220 V', 'Motion'], ['Electric iron', '1000 W, 220 V', 'Heat'], ['Geyser', '2000 W, 220 V', 'Heat']], 'Table of four household appliances, their ratings and the form of energy they produce'),
      n: 'Namaste! Look at the label on any appliance at home and you will see two numbers, a power in watts and a voltage. In this part we find out what these numbers mean, how much electrical energy an appliance uses, and how that energy turns into the units that appear on your family’s electricity bill.',
    }),
    sl('concept', 'Electrical energy', {
      b: r`When a charge Q moves through a p.d. V, the work done is $W = QV$. Since $Q = It$, $W = VIt$. Using $V = IR$: $W = I^{2}Rt$; using $I = V/R$: $W = \dfrac{V^{2}t}{R}$. In a resistor all this energy becomes **heat** (Joule’s law of heating: $H = I^{2}Rt$). SI unit: **joule**.`,
      v: flow('LR', [['a', 'W = QV'], ['b', 'Q = It, so W = VIt'], ['c', 'V = IR: W = I²Rt'], ['d', 'I = V/R: W = V²t/R']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow deriving the three forms of electrical energy from W equals Q V'),
      n: 'The energy given by the supply is the charge times the potential difference. Since charge is current times time, energy is voltage times current times time. Using Ohm’s law, the same energy can be written as current squared times resistance times time, or voltage squared times time divided by resistance. In a heater all of it becomes heat.',
    }),
    sl('concept', 'Electrical power', {
      b: r`**Electrical power** is the rate at which electrical energy is converted: $P = \dfrac{W}{t} = VI = I^{2}R = \dfrac{V^{2}}{R}$. SI unit **watt (W)**: 1 W = 1 J s⁻¹; 1 kW = 1000 W. Use $P = I^{2}R$ when the **current** is common (series), and $P = \dfrac{V^{2}}{R}$ when the **voltage** is common (parallel, mains).`,
      v: table(['Formula', 'Best when you know', 'Example'], [['P = VI', 'V and I', '220 V, 5 A: 1100 W'], ['P = I²R', 'I and R', '2 A in 50 Ω: 200 W'], ['P = V²/R', 'V and R', '220 V across 110 Ω: 440 W']], 'Table of the three power formulae with an example of each'),
      n: 'Power is how fast energy is converted, measured in watts, where one watt is one joule every second. Power equals voltage times current. With Ohm’s law it also equals current squared times resistance, or voltage squared divided by resistance. Choose the form that uses what you know. For mains appliances the voltage is fixed, so voltage squared over resistance is handy.',
    }),
    sl('diagram', 'What a power rating means', {
      b: r`A rating **“1000 W, 220 V”** on a geyser means: **when connected to 220 V, it converts 1000 J of electrical energy every second**. From the rating: $I = \dfrac{P}{V} \approx 4.55$ A and $R = \dfrac{V^{2}}{P} = 48.4$ Ω. If the supply voltage falls, R stays the same but $P = \dfrac{V^{2}}{R}$ falls **with the square of the voltage**.`,
      v: V.pv,
      n: 'A rating of one thousand watts at two hundred and twenty volts means the geyser converts one thousand joules each second when it gets its proper voltage. From these two numbers you can find its current and its resistance. Its resistance stays fixed, so if the voltage drops, the power drops much faster, because power depends on the voltage squared.',
    }),
    sl('example', 'Worked example: a geyser on a low voltage', {
      b: r`**Problem.** A geyser is rated 1000 W, 220 V. Find (a) its resistance, (b) the current at the rated voltage, (c) its power when the supply falls to 176 V.

**(a)** $R = \dfrac{V^{2}}{P} = \dfrac{220 \times 220}{1000} = 48.4$ Ω.

**(b)** $I = \dfrac{P}{V} = \dfrac{1000}{220} \approx 4.55$ A.

**(c)** $P = \dfrac{176 \times 176}{48.4} = 640$ W.`,
      v: table(['Supply', 'Power', 'Fraction of rated power'], [['220 V', '1000 W', '1'], ['176 V (0.8 of 220 V)', '640 W', '0.64']], 'Table of the geyser’s power at the rated and the reduced voltage'),
      n: 'First find the resistance from the rating: two hundred and twenty squared, divided by one thousand, is forty eight point four ohms. At the rated voltage the current is about four and a half amperes. When the voltage falls to four fifths of its value, the power falls to sixteen twenty fifths, which is six hundred and forty watts.',
    }),
    sl('check', 'Quick check: resistance from a rating', {
      b: 'Find the resistance of an appliance from its power rating.',
      n: 'Quick check. Resistance equals the voltage squared divided by the rated power.',
      chk: 'heater-mcq',
    }),
    sl('concept', 'Higher power, lower resistance', {
      b: r`For appliances made for the **same voltage**, $R = \dfrac{V^{2}}{P}$: the **higher the rated power, the lower the resistance**. With two equal heater coils on the mains: in **series** (resistance 2R) the power is **half** that of one coil; in **parallel** (resistance R/2) it is **double** that of one coil — **four times** the series setting.`,
      v: table(['Coil setting (two 44 Ω coils, 220 V)', 'Resistance', 'Power'], [['One coil', '44 Ω', '1100 W'], ['Both in series', '88 Ω', '550 W'], ['Both in parallel', '22 Ω', '2200 W']], 'Table of the power of two forty four ohm heater coils used singly, in series and in parallel on two hundred and twenty volts'),
      n: 'On the same mains voltage, a more powerful appliance has a smaller resistance, because power is voltage squared divided by resistance. A heater with two equal coils can be switched to give three settings. Both coils in series give the lowest power. One coil gives twice that. Both in parallel give the highest power, four times the series setting.',
    }),
    sl('diagram', 'The kilowatt hour', {
      b: r`The joule is too small for household use, so energy is sold in **kilowatt hours (kWh)**, called **units**. **1 kWh** is the energy used by a **1 kW** appliance in **1 hour**: $1\ \text{kWh} = 1000\ \text{W} \times 3600\ \text{s} = 3.6 \times 10^{6}$ J. Energy in kWh = **power in kW × time in hours**.`,
      v: V.et,
      n: 'A joule is a tiny amount of energy, so electricity companies count energy in kilowatt hours, which they call units. One kilowatt hour is the energy a one kilowatt appliance uses in one hour, which is three point six million joules. To find the units used, multiply the power in kilowatts by the time in hours.',
    }),
    sl('example', 'Worked example: a monthly bill', {
      b: r`**Problem.** A family uses an 80 W ceiling fan for 10 h a day, three 20 W LED tubes for 5 h a day and a 150 W refrigerator for 24 h a day. Find the energy used in 30 days and the cost at ₹6 per unit.

**Per day:** fan $0.08 \times 10 = 0.8$ kWh; tubes $3 \times 0.02 \times 5 = 0.3$ kWh; refrigerator $0.15 \times 24 = 3.6$ kWh; total $0.8 + 0.3 + 3.6 = 4.7$ kWh.

**30 days:** $4.7 \times 30 = 141$ kWh. **Cost:** $141 \times 6 = 846$, that is ₹846.`,
      v: table(['Appliance', 'kWh per day', 'kWh in 30 days'], [['Fan', '0.8', '24'], ['3 LED tubes', '0.3', '9'], ['Refrigerator', '3.6', '108'], ['Total', '4.7', '141']], 'Table of daily and monthly energy for each appliance in the bill example'),
      n: 'Change each power into kilowatts, then multiply by the hours. The fan uses point eight of a unit a day, the tube lights point three, and the refrigerator, running all day, three point six. That is four point seven units a day, or one hundred and forty one units a month. At six rupees a unit, the bill is eight hundred and forty six rupees.',
    }),
    sl('check', 'Quick check: units used', {
      b: 'Find the energy in kilowatt hours.',
      n: 'Quick check. Multiply the power in kilowatts by the time in hours.',
      chk: 'kwh-mcq',
    }),
    sl('concept', 'Saving energy at home', {
      b: 'An appliance’s energy use depends on **both** its power and its **hours of use**. A low-power device left on all day can use more than a high-power one used briefly. Efficient devices give the same output for less power: an LED lamp gives about as much light as an old filament bulb of several times its wattage.',
      v: table(['Choice', 'Power', 'kWh in 30 days at 6 h a day'], [['60 W filament bulb', '60 W', '10.8'], ['9 W LED lamp (similar light)', '9 W', '1.62'], ['Saving', '51 W', '9.18']], 'Table comparing the monthly energy of a filament bulb and an LED lamp used six hours a day'),
      n: 'The units on a bill depend on power and on time. A small device that runs all day can cost more than a big one used for a few minutes. Efficient devices save energy. An LED lamp gives about the same light as a filament bulb that uses many times more power, so changing lamps cuts the bill noticeably.',
    }),
    sl('example', 'Worked example: heater coils in series and in parallel', {
      b: r`**Problem.** A room heater has two identical coils of 44 Ω. Find its power on 220 V with (a) one coil, (b) both coils in series, (c) both in parallel.

**(a)** $P = \dfrac{220 \times 220}{44} = 1100$ W.

**(b)** $R = 88$ Ω: $P = \dfrac{220 \times 220}{88} = 550$ W.

**(c)** $R = 22$ Ω: $P = \dfrac{220 \times 220}{22} = 2200$ W.`,
      v: table(['Setting', 'R (Ω)', 'P (W)'], [['Low (series)', '88', '550'], ['Medium (one coil)', '44', '1100'], ['High (parallel)', '22', '2200']], 'Table of the three settings of a two-coil room heater'),
      n: 'With the voltage fixed, power is voltage squared over resistance. One coil gives eleven hundred watts. Two coils in series double the resistance and halve the power to five hundred and fifty watts. Two coils in parallel halve the resistance and double the power to twenty two hundred watts. That is how a heater’s low, medium and high settings work.',
    }),
    sl('check', 'Quick check: comparing energy use', {
      b: 'Decide which appliance uses the most energy.',
      n: 'Quick check. Work out power in kilowatts times hours for each appliance before comparing.',
      chk: 'compare-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'W = QV = VIt = I²Rt = V²t/R (joule).',
        'P = VI = I²R = V²/R (watt); 1 W = 1 J s⁻¹.',
        'Rating “P watt, V volt”: converts P joules per second at V volts; R = V²/P, I = P/V.',
        'At a fixed resistance, P ∝ V².',
        '1 kWh = 3.6 × 10⁶ J; units = kW × hours; cost = units × rate.',
      ],
      v: table(['Quantity', 'Unit', 'Formula'], [['Energy', 'J or kWh', 'W = VIt'], ['Power', 'W or kW', 'P = VI'], ['Bill', '₹', 'kWh × rate']], 'Summary table of energy, power and cost'),
      n: 'Let us sum up Part 1. Electrical energy is voltage times current times time, and power is the rate of using it, voltage times current. A power rating tells you the energy used each second at the stated voltage, and from it you can find the resistance. Household energy is counted in kilowatt hours, and the bill is units times the rate.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Change watts to kilowatts and minutes to hours before finding kWh.',
        'Find R from the rating first when the voltage changes; R stays the same.',
        'For energy in joules, time must be in seconds.',
        'State the meaning of a rating with the words “when connected to … volts”.',
      ],
      v: table(['Slip', 'Fix'], [['1500 W × 2 h = 3000 kWh', '1.5 kW × 2 h = 3 kWh'], ['Same power at a lower voltage', 'P = V²/R falls with V²'], ['30 min written as 30 h', '30 min = 0.5 h']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Before finding units, change watts into kilowatts and minutes into hours. If the voltage changes, first find the resistance from the rating, because the resistance stays the same. Use seconds when the answer is wanted in joules. And when you explain a rating, say that the power is converted only when the stated voltage is applied.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Household Circuits — Part 2: Wiring and safety',
  goals: [
    'Describe how power reaches a house and the order of the parts from the pole to the circuits',
    'Explain why switches and fuses go in the live wire; choose a fuse rating; compare a fuse and an MCB',
    'Describe the ring main system, the two-way switch and the three-pin plug',
    'Explain earthing, the colour code and electrical safety precautions',
  ],
  slides: [
    sl('title', 'From the power station to your socket', {
      b: 'Part 2 — how electricity travels to a house, how the house is wired, and what keeps the people inside safe.',
      v: table(['Device', 'Job'], [['Transformer', 'Changes the voltage'], ['kWh meter', 'Records the energy used'], ['Fuse or MCB', 'Cuts off an excess current'], ['Earth wire', 'Carries a fault current safely to the ground']], 'Table of four devices in the supply system and their jobs'),
      n: 'Electricity is produced far away in a power station, carried across the country on tall towers, and finally reaches the sockets in your home. In this part we follow that journey, see how a house is wired, and learn the safety devices, the fuse, the circuit breaker and the earth wire, that protect people and appliances.',
    }),
    sl('concept', 'Power distribution', {
      b: 'Power is generated at about **11 kV**, **stepped up** to about **132 kV** (or more) and sent along transmission lines. At substations it is **stepped down** in stages — to **33 kV**, then **11 kV**, then to **220 V** at a local transformer — before it enters houses. Transmitting at a **high voltage** means a **small current** for the same power, so the heat lost in the lines, **I²R**, is far less.',
      v: flow('LR', [['g', 'Power station 11 kV'], ['u', 'Step-up: 132 kV'], ['t', 'Transmission lines'], ['s', 'Substations: 33 kV, 11 kV'], ['h', 'Local transformer: 220 V to houses']], [['g', 'u'], ['u', 't'], ['t', 's'], ['s', 'h']], 'Flow of electric power from the power station through step-up, transmission and step-down stages to houses'),
      n: 'At the power station, electricity is produced at about eleven thousand volts. A transformer steps it up to a very high voltage for the long journey, because a high voltage means a small current, and a small current wastes little energy as heat in the wires. Near the town, it is stepped down in stages until it reaches homes at two hundred and twenty volts.',
    }),
    sl('diagram', 'From the pole to the circuits', {
      b: 'In order: **pole** → **company fuse** (in the live wire, sealed) → **kWh meter** (records units) → **main switch** (double pole: cuts **both** live and neutral) → **distribution board** with a **fuse or MCB for each circuit**. Separate circuits: **lighting** (about 5 A), **power** (about 15 A, for geysers and heaters) and the **ring main**. All appliances are connected in **parallel**, so each gets 220 V and works independently.',
      v: V.house,
      n: 'The cable from the pole first passes the company fuse, which sits in the live wire. Next comes the kilowatt hour meter, then the main switch, which cuts off both the live and the neutral wires together. The distribution board then splits the supply into separate circuits, each with its own fuse or circuit breaker. Every appliance is joined in parallel.',
    }),
    sl('diagram', 'Switch and fuse in the live wire', {
      b: 'A **fuse** is a short, thin wire of an alloy with a **low melting point** (such as tin and lead) joined **in series** in the **live wire**. If the current exceeds its rating, it **melts** and breaks the circuit. Switches and fuses go in the **live wire** so that, when the switch is off or the fuse has blown, the appliance is **disconnected from the high potential**. In the neutral wire, the appliance would stay live even when “off”.',
      v: V.sf,
      n: 'A fuse is a thin wire that melts if too much current flows, breaking the circuit before the wiring overheats. Both the fuse and the switch must be in the live wire. Then, when the switch is off or the fuse has melted, the appliance is cut off from the live supply. If they were in the neutral wire, the appliance would still be live and could give a shock.',
    }),
    sl('example', 'Worked example: choosing a fuse', {
      b: r`**Problem.** Choose a suitable fuse, from 3 A, 5 A and 15 A, for (a) a 440 W mixer and (b) a 2.2 kW geyser, both on 220 V.

**(a)** $I = \dfrac{P}{V} = \dfrac{440}{220} = 2$ A: use the **3 A** fuse.

**(b)** $I = \dfrac{2200}{220} = 10$ A: use the **15 A** fuse.

**Rule:** choose the rating **just above** the normal current — a much larger fuse would not melt in time.`,
      v: table(['Appliance', 'Normal current', 'Fuse chosen'], [['440 W mixer', '2 A', '3 A'], ['2.2 kW geyser', '10 A', '15 A']], 'Table of normal currents and fuse ratings for a mixer and a geyser'),
      n: 'Find the normal current first: power divided by voltage. The mixer draws two amperes, so a three ampere fuse suits it. The geyser draws ten amperes, so it needs the fifteen ampere fuse. Always choose the rating just above the normal current. A fifteen ampere fuse on the mixer would let a dangerous fault current flow without melting.',
    }),
    sl('check', 'Quick check: fuse rating', {
      b: 'Choose the right fuse for an appliance.',
      n: 'Quick check. Work out the normal current, then pick the rating just above it.',
      chk: 'fuse-mcq',
    }),
    sl('diagram', 'The ring main system', {
      b: 'In a **ring main**, a cable carrying live, neutral and earth **starts at the distribution board, runs round the rooms and returns to the board**, protected by a **30 A fuse or MCB**. Sockets are connected **in parallel** at points on the ring. Because current reaches each socket **along two paths**, each part of the cable carries less current, so a **thinner cable** can be used, and new sockets are easy to add.',
      v: V.ring,
      n: 'In a ring main, one cable leaves the distribution board, goes all the way round the rooms, and comes back to the board. Sockets are tapped off it in parallel. Current can reach a socket from either end of the ring, so each part of the cable carries less current. That allows a thinner cable and makes it easy to add more sockets.',
    }),
    sl('example', 'Worked example: will the MCB trip?', {
      b: r`**Problem.** A kitchen circuit on 220 V is protected by a 20 A MCB. A 1200 W microwave, a 2000 W induction cooktop and a 320 W refrigerator are on. (a) Find the total current. (b) Will the MCB trip if a 1100 W kettle is also switched on?

**(a)** $P = 1200 + 2000 + 320 = 3520$ W; $I = \dfrac{3520}{220} = 16$ A.

**(b)** $I = \dfrac{3520 + 1100}{220} = 21$ A, which is more than 20 A, so the **MCB trips**.`,
      v: table(['Load', 'Total power', 'Current', 'MCB (20 A)'], [['Microwave, cooktop, refrigerator', '3520 W', '16 A', 'Stays on'], ['Plus the kettle', '4620 W', '21 A', 'Trips']], 'Table of the kitchen loads, total power, current and whether the circuit breaker trips'),
      n: 'Appliances in parallel each draw their own current, so add the powers first. Three thousand five hundred and twenty watts at two hundred and twenty volts is sixteen amperes, below the breaker’s rating. Adding the kettle raises the current to twenty one amperes, so the miniature circuit breaker trips and switches the circuit off. It can be switched on again once the load is reduced.',
    }),
    sl('check', 'Quick check: ring main', {
      b: 'Recall how sockets are connected in a ring main.',
      n: 'Quick check. In a ring main, the cable starts and ends at the board, and the sockets are in parallel.',
      chk: 'ring-mcq',
    }),
    sl('diagram', 'Two-way (staircase) switch', {
      b: 'A **two-way switch** has a **common terminal** and **two contacts**. For a staircase lamp, two such switches are used: the **live** wire goes to the common terminal of S1, two **strap wires** join the matching contacts of S1 and S2, and the common terminal of S2 goes to the **lamp**. The lamp is **on** when both levers rest on the **same** strap wire; flipping **either** switch turns it **off** (or on).',
      v: V.twoway,
      n: 'A staircase lamp can be switched on at the bottom of the stairs and off at the top. Each two-way switch has a common terminal that can touch either of two contacts. Two strap wires join the contacts of the two switches. When both levers rest on the same strap wire, current reaches the lamp. Flipping either switch breaks the path.',
    }),
    sl('diagram', 'The three-pin plug and socket', {
      b: 'A three-pin plug has **live (L)**, **neutral (N)** and **earth (E)** pins. The **earth pin is longer** so that it makes contact **first** and breaks contact **last**: the body is earthed before the live supply reaches it. It is **thicker** so that it **cannot be pushed into the live or neutral hole** by mistake. The socket’s switch and fuse are in the live line.',
      v: V.plug,
      n: 'Look at a three-pin plug. The earth pin is longer than the other two, so it enters the socket first and comes out last. This means the appliance is always earthed while it is connected to the live supply. The earth pin is also thicker, so it cannot be forced into the live or neutral hole by mistake.',
    }),
    sl('check', 'Quick check: the earth pin', {
      b: 'Explain a design feature of the three-pin plug.',
      n: 'Quick check. Think about the order in which the pins touch the socket.',
      chk: 'earthpin-mcq',
    }),
    sl('diagram', 'Earthing', {
      b: '**Earthing:** the **metal body** of an appliance is joined by the **earth wire** to a **copper plate buried deep in moist ground** (packed with charcoal and salt to keep the ground conducting). If the live wire touches the body, a **large current flows to earth** through this low-resistance path, the **fuse melts** (or the MCB trips) and the live supply is cut off. Without earthing, a person touching the body would complete the circuit and get a shock.',
      v: V.earth,
      n: 'Earthing joins the metal body of an appliance to a copper plate buried in damp ground. If a live wire comes loose and touches the body, a very large current rushes to earth along this easy path. The fuse melts at once and the supply is cut off. Without an earth wire, the body would stay live, and anyone touching it could get a serious shock.',
    }),
    sl('concept', 'Colour code and safety precautions', {
      b: '**Colour code (new international):** live — **brown**; neutral — **light blue**; earth — **green or green-yellow**. (Older wiring: live red, neutral black, earth green.) **Precautions:** use wires of the correct current rating; never replace a fuse by a thicker or copper wire; switch off the main switch before repairs; earth all metal-bodied appliances; do not overload sockets; never touch switches with wet hands; replace worn insulation at once.',
      v: table(['Wire', 'New colour', 'Old colour', 'Normal potential'], [['Live (L)', 'Brown', 'Red', '220 V'], ['Neutral (N)', 'Light blue', 'Black', '0 V'], ['Earth (E)', 'Green or green-yellow', 'Green', '0 V']], 'Table of the colour code for live, neutral and earth wires with their normal potentials'),
      n: 'Wires are colour coded so that electricians never mix them up. In the new code, the live wire is brown, the neutral is light blue, and the earth is green or green and yellow. Older houses used red, black and green. Simple habits keep us safe: switch off the mains before any repair, never overload a socket, and never touch switches with wet hands.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Power is transmitted at high voltage (small current, small I²R loss) and stepped down to 220 V.',
        'Pole → company fuse → kWh meter → main switch (double pole) → distribution board → circuits in parallel.',
        'Fuse: low melting point, in series in the live wire, rating just above the normal current; MCB trips and can be reset.',
        'Ring main: loop from and back to the board, 30 A, sockets in parallel, two paths.',
        'Earth pin longer and thicker; earthing sends fault current to the ground; live brown, neutral light blue, earth green-yellow.',
      ],
      v: table(['Device', 'Placed in', 'Protects against'], [['Fuse or MCB', 'Live wire', 'Overload and short circuit'], ['Switch', 'Live wire', 'Leaves the appliance dead when off'], ['Earth wire', 'Metal body', 'Shock from a live body']], 'Summary table of protective devices, where they go and what they protect against'),
      n: 'Let us sum up Part 2. Electricity is sent at high voltage to cut losses and reaches homes at two hundred and twenty volts. Inside, it passes the company fuse, the meter and the main switch to the distribution board. Fuses and switches go in the live wire. The ring main feeds sockets in parallel, and earthing protects us from a live metal body.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Give the order from the pole exactly: company fuse, meter, main switch, distribution board.',
        'For “why in the live wire?”, say the appliance is cut off from the high potential when off.',
        'Fuse rating: calculate I = P ÷ V and choose the next rating above it.',
        'For the earth pin, give both reasons: longer (first in, last out) and thicker (cannot enter L or N).',
      ],
      v: table(['Slip', 'Fix'], [['Fuse in the neutral wire', 'Fuse and switch in the live wire'], ['Earth pin longer “to be stronger”', 'Longer: earthed first, disconnected last'], ['Choosing a 15 A fuse for a 2 A mixer', 'Choose just above 2 A: 3 A']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Learn the order of parts from the pole to the circuits. When asked why the switch and fuse are in the live wire, explain that the appliance is cut off from the live supply when it is off. Work out the normal current before choosing a fuse. And give both reasons for the shape of the earth pin.',
    }),
  ],
});
