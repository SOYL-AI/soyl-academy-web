// CBSE 12 Computer Science, ch06 Computer Networks — question bank. Every school, company, campus, distance and
// file size is imagined and written by SOYL; no NCERT example or exercise and no board/sample-paper item is
// reused (D-036). Every numerical answer is computed here and asserted, never typed by hand.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const inr = (n) => n.toLocaleString('en-IN');

// ---------------------------------------------------------------- computed figures (asserted)
/** Seconds to send `size` units of data at `rate` units per second (same prefix on both sides). */
export const seconds = (size, rate) => size / rate;
// A 600 KB report-card file over a 48 Kbps link: KB to Kb is times 8.
export const REPORT = { kb: 600, rate: 48 };
export const REPORT_BITS = REPORT.kb * 8; // 4,800 Kb
export const REPORT_SECS = seconds(REPORT_BITS, REPORT.rate); // 100 s
assert.equal(REPORT_SECS, 100);
// A sensor sends 9,000 bits in 1.5 s.
export const SENSOR = { bits: 9000, secs: 1.5 };
export const SENSOR_BPS = SENSOR.bits / SENSOR.secs; // 6,000 bps
assert.equal(SENSOR_BPS, 6000);
// Conversion stated as 1 Mbps = 1024 Kbps.
export const CONV = { mbps: 3 };
export const CONV_KBPS = CONV.mbps * 1024; // 3,072 Kbps
assert.equal(CONV_KBPS, 3072);
// A 12 MB video at 4 Mbps (M the same on both sides).
export const VIDEO = { mb: 12, rate: 4 };
export const VIDEO_SECS = seconds(VIDEO.mb * 8, VIDEO.rate); // 24 s
assert.equal(VIDEO_SECS, 24);
// A 1,800 Kb photo album at 60 Kbps.
export const ALBUM = { kb: 1800, rate: 60 };
export const ALBUM_SECS = seconds(ALBUM.kb, ALBUM.rate); // 30 s
assert.equal(ALBUM_SECS, 30);

/**
 * Campus cases. `dist` = metres between blocks; `pcs` = computers per block. The server goes in the block with
 * the most computers (most traffic stays local); cables run in a star from that block; a repeater is needed on
 * any run longer than the stated limit.
 */
export function campus(c) {
  const server = Object.entries(c.pcs).sort((a, b) => b[1] - a[1])[0][0];
  const fromServer = Object.fromEntries(
    Object.keys(c.pcs)
      .filter((b) => b !== server)
      .map((b) => [b, c.dist[[server, b].sort().join('-')]]),
  );
  const repeaters = Object.entries(fromServer).filter(([, d]) => d > c.limit).map(([b]) => b);
  return { server, fromServer, repeaters, total: Object.values(c.pcs).reduce((s, n) => s + n, 0) };
}
const tableOf = (c) =>
  `| Blocks | Distance |\n|---|---|\n${Object.entries(c.dist).map(([k, d]) => `| ${k.replace('-', ' to ')} | ${d} m |`).join('\n')}\n\n| Block | Computers |\n|---|---|\n${Object.entries(c.pcs).map(([b, n]) => `| ${b} | ${n} |`).join('\n')}`;

export const NEELGIRI = {
  name: 'Neelgiri Public School, Ooty',
  limit: 90,
  dist: { 'Admin-Junior': 60, 'Admin-Library': 40, 'Admin-Senior': 120, 'Junior-Library': 70, 'Junior-Senior': 150, 'Library-Senior': 110 },
  pcs: { Admin: 25, Junior: 40, Library: 15, Senior: 110 },
};
export const NEEL = campus(NEELGIRI);
assert.equal(NEEL.server, 'Senior');
assert.deepEqual(NEEL.repeaters.sort(), ['Admin', 'Junior', 'Library']);

export const KRISHI = {
  name: 'Krishi Seeds Ltd, Nashik',
  limit: 90,
  dist: { 'Lab-Office': 45, 'Lab-Store': 95, 'Lab-Warehouse': 130, 'Office-Store': 60, 'Office-Warehouse': 80, 'Store-Warehouse': 50 },
  pcs: { Lab: 35, Office: 90, Store: 20, Warehouse: 12 },
};
export const KRI = campus(KRISHI);
assert.equal(KRI.server, 'Office');
assert.deepEqual(KRI.repeaters, []);

export const SURYA = {
  name: 'Surya Hospital, Jaipur',
  limit: 90,
  dist: { 'Lab-OPD': 85, 'Lab-Pharmacy': 40, 'Lab-Wards': 125, 'OPD-Pharmacy': 55, 'OPD-Wards': 100, 'Pharmacy-Wards': 70 },
  pcs: { Lab: 30, OPD: 70, Pharmacy: 18, Wards: 45 },
};
export const SUR = campus(SURYA);
assert.equal(SUR.server, 'OPD');
assert.deepEqual(SUR.repeaters, ['Wards']);

export const VIDYA = {
  name: 'Vidya Polytechnic, Bhopal',
  limit: 90,
  dist: { 'Hostel-Main': 140, 'Hostel-Workshop': 75, 'Main-Workshop': 65, 'Hostel-Canteen': 30, 'Canteen-Main': 120, 'Canteen-Workshop': 50 },
  pcs: { Main: 150, Workshop: 60, Hostel: 30, Canteen: 5 },
};
export const VID = campus(VIDYA);
assert.equal(VID.server, 'Main');
assert.deepEqual(VID.repeaters.sort(), ['Canteen', 'Hostel']);

// ================================================================ t01 Evolution and data communication
Q('m_arpanet', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'ARPANET, the network from which the Internet grew, was started in which year?',
  opts: ['1969', '1983', '1990', '1957'],
  sol: 'ARPANET linked its first computers in 1969. In 1983 it switched to TCP/IP; 1990 is close to the start of the World Wide Web.',
}));
Q('m_nsfnet', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why was NSFNET set up in the 1980s?',
  opts: [
    'To connect universities and research centres to shared supercomputers, giving a wider academic network',
    'To carry defence messages that could survive the loss of some routes',
    'To let homes connect to cable television over coaxial wire',
    'To replace telephone exchanges with radio links',
  ],
  sol: 'NSFNET widened networking beyond defence work to universities and researchers. The defence motive belongs to ARPANET; the other two options are unrelated.',
}));
Q('m_packet', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Riya sends a 6 MB photo to a friend in Kolkata. It is split into small pieces that may travel by different routes and are put back in order at the other end. Which switching technique is this?',
  opts: ['Packet switching', 'Circuit switching', 'Message flooding', 'Line multiplexing'],
  sol: 'Data split into packets that travel independently and are reassembled is packet switching. Circuit switching reserves one fixed path for the whole call.',
}));
Q('m_circuit', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A landline call between Shimla and Chennai keeps one dedicated path open for the whole conversation, even during silences. This is an example of',
  opts: ['circuit switching', 'packet switching', 'a star topology', 'a gateway'],
  sol: 'A dedicated end-to-end path held for the whole session is circuit switching; it wastes capacity during pauses. Topology and gateway are unrelated.',
}));
Q('m_bandwidth', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In data communication, the term **bandwidth** refers to',
  opts: [
    'the range of frequencies a channel can carry, which limits how much data it can send',
    'the physical width of a network cable',
    'the number of computers on a network',
    'the distance a signal travels before it needs a repeater',
  ],
  sol: 'Bandwidth is the frequency range (in hertz) of a channel; more bandwidth allows a higher data transfer rate. It has nothing to do with cable width, node count or distance.',
}));
Q('m_ipv4', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Which of the following is a valid IPv4 address?',
  opts: ['`192.168.10.25`', '`192.168.300.4`', '`10.0.0`', '`172.16.5.8.1`'],
  sol: 'An IPv4 address has four numbers, each from 0 to 255, separated by dots. 300 is too large, 10.0.0 has only three parts and the last option has five.',
}));
Q('m_protocol_role', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In data communication, a set of rules that both sender and receiver must follow is called a',
  opts: ['protocol', 'topology', 'transmission medium', 'node'],
  sol: 'A protocol fixes the format, timing and order of messages. Topology is layout, a medium is the path, and a node is a device on the network.',
}));
Q('ar_packet', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'Packet switching uses the capacity of a network better than circuit switching.',
  r: 'In packet switching no line is kept reserved for one sender; packets from many users share the same links.',
  sol: 'Both are true, and R explains A: because links are shared instead of reserved, idle time is filled by other users\' packets.',
}));
Q('tf_ip_unique', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? An IP address identifies a device on a network so that data can be delivered to it.',
  sol: 'The IP address is the logical address used to route data to the right device.',
}));
Q('fb_bps', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Data transfer rate is measured in bits per second, written in short as ___.',
  acc: [['bps']],
  sol: 'The unit is bits per second (bps); larger units are Kbps, Mbps and Gbps.',
}));
Q('ord_history', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these milestones in the order in which they happened.',
  items: ['ARPANET links its first computers', 'ARPANET adopts TCP/IP', 'NSFNET connects research centres', 'The World Wide Web is proposed at CERN'],
  sol: 'ARPANET began in 1969, adopted TCP/IP in 1983, NSFNET followed in 1986, and the Web was proposed in 1989.',
}));
Q('n_report', num({
  t: 1, d: 3, c: 'application', marks: 2, value: REPORT_SECS, unit: 's',
  stem: `A school uploads a ${REPORT.kb} KB report-card file over a link of ${REPORT.rate} Kbps. Taking 1 byte = 8 bits (and the same "K" in both units), how many seconds does the upload take?`,
  sol: `Step 1: Size in kilobits = ${REPORT.kb} × 8 = ${inr(REPORT_BITS)} Kb.\nStep 2: Time = ${inr(REPORT_BITS)} ÷ ${REPORT.rate} = ${REPORT_SECS} seconds.`,
  scheme: [['Bytes converted to bits', 1], [`Time ${REPORT_SECS} s`, 1]],
}));
Q('n_sensor', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: SENSOR_BPS, unit: 'bps',
  stem: `A weather sensor at an imagined hill station sends ${inr(SENSOR.bits)} bits in ${SENSOR.secs} seconds. What is its data transfer rate in bps?`,
  sol: `Rate = bits ÷ time = ${inr(SENSOR.bits)} ÷ ${SENSOR.secs} = ${inr(SENSOR_BPS)} bps.`,
}));
Q('n_convert', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: CONV_KBPS, unit: 'Kbps',
  stem: `Taking 1 Mbps = 1024 Kbps, express a broadband speed of ${CONV.mbps} Mbps in Kbps.`,
  sol: `${CONV.mbps} × 1024 = ${inr(CONV_KBPS)} Kbps.`,
}));
Q('s_switching', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between circuit switching and packet switching, giving one example of each.',
  model: '1. **Circuit switching** sets up a **dedicated path** before data flows and keeps it for the whole session, e.g. a landline call.\n2. **Packet switching** breaks data into **packets** that travel independently over shared links and are reassembled, e.g. sending an e-mail.',
  sol: 'One clear difference (reserved path versus shared packets) with an example on each side.',
  scheme: [['Circuit switching with example', 1], ['Packet switching with example', 1]],
}));
Q('s_comm_parts', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the components of data communication and state the job of any two of them.',
  model: 'The components are **sender, receiver, message, communication medium and protocol**. The **sender** creates and sends the message; the **medium** (a cable or radio waves) is the path along which the message travels to the receiver.',
  sol: 'List the five components and describe two correctly.',
  scheme: [['Components listed', 1], ['Two roles described', 1]],
}));
Q('s3_ipv4_ipv6', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'What is an IP address? Why did the world need IPv6 when IPv4 already existed? Mention the size of each address type.',
  model: 'An **IP address** is a numeric label that identifies a device on a network so that data can be routed to it. **IPv4** uses **32 bits**, written as four numbers from 0 to 255, which allows only about four billion addresses. With phones, laptops and smart devices joining every day, these ran short, so **IPv6**, with **128-bit** addresses, was introduced to give a practically unlimited supply.',
  sol: 'Definition, the 32-bit limit and why it ran out, and the 128-bit answer.',
  scheme: [['Meaning of IP address', 1], ['IPv4: 32 bits and shortage', 1], ['IPv6: 128 bits', 1]],
}));
Q('l_evolution', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Trace how the Internet grew from ARPANET. Your answer should cover ARPANET, the move to TCP/IP, NSFNET, the Internet as a network of networks and the arrival of the World Wide Web.',
  model: '1. **ARPANET (1969):** a project of the US defence research agency that linked a few university computers so they could share resources.\n2. **TCP/IP (1983):** ARPANET adopted TCP/IP, a common set of rules that let different networks exchange data.\n3. **NSFNET (1986):** set up to connect universities and research centres to supercomputers, it widened the network beyond defence work.\n4. **Internet:** many such networks joined through TCP/IP, forming a worldwide **network of networks**, later opened for commercial use.\n5. **World Wide Web (1989–91):** proposed at CERN, it added linked web pages and browsers, which made the Internet easy for everyone.',
  sol: 'Five stages in order, each with its purpose.',
  scheme: [['ARPANET and its aim', 1], ['Adoption of TCP/IP', 1], ['NSFNET', 1], ['Network of networks', 1], ['World Wide Web', 1]],
}));

// ================================================================ t02 Transmission media and devices
Q('m_fibre', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A bank in Mumbai wants to link two data centres with a cable that carries very high data rates and is not disturbed by heavy electrical machines nearby. Which medium suits it best?',
  opts: ['Optical fibre', 'Unshielded twisted pair', 'Coaxial cable', 'Infrared'],
  sol: 'Optical fibre carries light, so it is immune to electromagnetic interference and offers the highest bandwidth. Twisted pair and coaxial carry electrical signals that machines can disturb; infrared is short-range and line-of-sight.',
}));
Q('m_twisted', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A coaching centre in Patna wants the cheapest wired medium to connect 20 computers in one room. Which should it choose?',
  opts: ['Twisted-pair (Ethernet) cable', 'Optical fibre', 'Satellite link', 'Microwave link'],
  sol: 'Twisted pair is cheap, flexible and ideal for short runs inside a room. Fibre is costly; satellite and microwave are for long distances.',
}));
Q('m_infrared', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'A TV remote works only when pointed at the TV and does not work from the next room. Which medium does it use?',
  opts: ['Infrared', 'Radio waves', 'Coaxial cable', 'Microwaves bounced off a satellite'],
  sol: 'Infrared needs a clear line of sight and cannot pass through walls. Radio waves pass through walls, which is why a Wi-Fi signal reaches other rooms.',
}));
Q('m_radio', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which property of radio waves makes them suitable for mobile phones and Wi-Fi in buildings?',
  opts: [
    'They spread in all directions and can pass through walls',
    'They travel only in a straight line between dish antennas',
    'They need a cable to be laid between sender and receiver',
    'They work only over a few centimetres',
  ],
  sol: 'Radio waves are omnidirectional and penetrate walls, so a moving phone or laptop keeps receiving. Straight-line dish links describe microwaves.',
}));
Q('m_switch_hub', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'In a computer lab, a central device sends each incoming message **only** to the computer it is meant for, reducing unnecessary traffic. The device is a',
  opts: ['switch', 'hub', 'repeater', 'modem'],
  sol: 'A switch reads the destination address and forwards to one port. A hub broadcasts to every port; a repeater only boosts a signal; a modem converts between digital and analog.',
}));
Q('m_router', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which device connects a school\'s LAN to the Internet and chooses the path along which packets travel to other networks?',
  opts: ['Router', 'Hub', 'RJ45 connector', 'Repeater'],
  sol: 'A router connects different networks and decides routes using IP addresses. A hub and a repeater work inside one network; RJ45 is just a connector.',
}));
Q('m_modem', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The word **modem** comes from',
  opts: ['modulator–demodulator', 'mobile–demand', 'module–domain', 'monitor–device manager'],
  sol: 'A modem modulates digital data into a signal for the line and demodulates the received signal back into digital data.',
}));
Q('m_gateway', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined factory\'s old machine-control network uses its own rules, which differ from the office network\'s TCP/IP. Which device lets the two networks exchange data?',
  opts: ['Gateway', 'Repeater', 'Hub', 'Ethernet card'],
  sol: 'A gateway joins networks that follow different protocols and translates between them. The other devices assume the same protocol on both sides.',
}));
Q('m_rj45', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The 8-pin connector fitted at the end of an Ethernet twisted-pair cable is called',
  opts: ['RJ45', 'RJ11', 'USB-A', 'BNC'],
  sol: 'RJ45 is the 8-pin Ethernet connector. RJ11 is the smaller telephone connector; BNC is used on coaxial cable.',
}));
Q('ar_repeater', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'A repeater is placed on a long cable run between two buildings.',
  r: 'A signal weakens as it travels along a cable, and a repeater regenerates it to its original strength.',
  sol: 'Both are true, and R explains A: attenuation over distance is the reason a repeater is needed.',
}));
Q('ar_hub', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'A hub is slower than a switch when many computers are busy.',
  r: 'A hub has ports into which computers are plugged with RJ45 connectors.',
  sol: 'Both are true, but R does not explain A. A hub is slower because it broadcasts every frame to all ports, causing collisions; having ports is true of both devices.',
}));
Q('tf_coax', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Coaxial cable carries data as pulses of light.',
  sol: 'Coaxial cable carries electrical signals along a central copper conductor; pulses of light travel in optical fibre.',
}));
Q('mt_devices', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each network device with the job it does.',
  pairs: [
    ['Repeater', 'Regenerates a weakened signal'],
    ['Router', 'Chooses routes between different networks'],
    ['Modem', 'Converts digital data to an analog signal and back'],
    ['Ethernet card', 'Gives a computer its port and hardware (MAC) address for a wired LAN'],
  ],
  sol: 'Repeater boosts, router routes, modem modulates and demodulates, and an Ethernet card (NIC) connects a computer to the LAN.',
}));
Q('s_hub_switch', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does a switch differ from a hub? Give two differences.',
  model: '1. A **hub** sends every incoming frame to **all** ports, while a **switch** sends it only to the port of the **destination** computer.\n2. Because a hub broadcasts, it causes more **collisions** and wasted bandwidth; a switch keeps traffic separate, so it is **faster and more secure**.',
  sol: 'Broadcast versus targeted forwarding, and the effect on speed or security.',
  scheme: [['Forwarding difference', 1], ['Effect on traffic, speed or security', 1]],
}));
Q('s_wireless_choice', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A hill-top weather station must send data to a town 30 km away, with a clear line of sight between them. Suggest a suitable wireless medium and give two reasons.',
  model: 'Use **microwave** transmission between dish antennas on the station and in the town. Reasons: it works over **long distances** with a **clear line of sight**, and it avoids laying a **cable across hilly ground**, which would be costly and hard to maintain.',
  sol: 'Microwave, with reasons linked to distance, line of sight and terrain.',
  scheme: [['Microwave named', 1], ['Two suitable reasons', 1]],
}));
Q('s3_media_compare', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare twisted-pair cable and optical fibre on speed, cost and resistance to interference. Which would you choose inside a classroom, and why?',
  model: '**Speed:** optical fibre carries far higher data rates than twisted pair. **Cost:** twisted pair is cheap and easy to fit; fibre and its connectors cost much more. **Interference:** fibre carries light, so electrical noise does not affect it, while twisted pair can pick up noise. **Choice:** inside a classroom the distances are short and the noise low, so **twisted pair** gives enough speed at the lowest cost.',
  sol: 'Three comparisons and a justified choice.',
  scheme: [['Speed and cost compared', 1], ['Interference compared', 1], ['Justified choice', 1]],
}));
Q('l_devices', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'An imagined startup in Kochi is setting up its first office network: 12 computers, one shared printer and an Internet connection from a telecom company. List the devices it needs and explain the role of each.',
  model: '1. **Ethernet card (NIC)** in each computer and the printer, giving it a port and a hardware address.\n2. **Twisted-pair cables with RJ45 connectors** to join each machine to the central device.\n3. A **switch** at the centre, forwarding each frame only to the right computer or printer.\n4. A **modem** from the telecom company to convert between the digital office data and the line signal.\n5. A **router** (often combined with Wi-Fi) to connect the office LAN to the Internet and pick routes for outgoing packets; a **Wi-Fi card** lets laptops join without cables.',
  sol: 'Five devices, each with its role in this office.',
  scheme: [['NIC', 1], ['Cables and RJ45', 1], ['Switch', 1], ['Modem', 1], ['Router or Wi-Fi', 1]],
}));

// ================================================================ t03 Network types and topologies
Q('m_pan', mcq({
  t: 3, d: 1, c: 'application',
  stem: 'Aarav connects his phone to his wireless earbuds and his smartwatch by Bluetooth. What type of network has he formed?',
  opts: ['PAN', 'LAN', 'MAN', 'WAN'],
  sol: 'A network of personal devices within a few metres is a Personal Area Network. LAN, MAN and WAN cover a building, a city and a country or more.',
}));
Q('m_man', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A cable-TV and broadband company links its offices spread across one city, Lucknow. This network is best described as a',
  opts: ['MAN', 'PAN', 'LAN', 'WAN spread over continents'],
  sol: 'A network covering one city is a Metropolitan Area Network; a LAN covers a building or campus and a WAN spans countries.',
}));
Q('m_star_fail', mcq({
  t: 3, d: 2, c: 'analysis',
  stem: 'In a star topology, the cable to one computer in a lab is cut. What happens?',
  opts: [
    'Only that computer loses its connection; the others keep working',
    'The whole network stops working',
    'Every computer slows down to half speed',
    'The central switch shuts down',
  ],
  sol: 'Each node has its own cable to the centre, so a cut affects only that node. The whole network fails only if the central device fails.',
}));
Q('m_bus_fail', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'In a bus topology, which single fault brings the whole network down?',
  opts: ['A break in the backbone cable', 'One computer being switched off', 'A loose connector on one computer', 'A printer running out of paper'],
  sol: 'All nodes share the backbone, so a break there stops communication for everyone. A single node going off does not affect the others.',
}));
Q('m_tree', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A college connects a hub in each department to one main switch in the computer centre, and each department\'s computers to their own hub. Which topology is this?',
  opts: ['Tree', 'Bus', 'Pure star', 'Point-to-point'],
  sol: 'Stars (departments) joined in a hierarchy to a central point form a tree topology; a pure star would connect every computer directly to one device.',
}));
Q('ar_star_cable', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A star topology usually needs more cable than a bus topology for the same computers.',
  r: 'In a star, every computer has its own separate cable to the central device.',
  sol: 'Both are true, and R explains A: separate runs from each node to the centre add up to more cable than one shared backbone.',
}));
Q('tf_wan', tf({
  t: 3, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? The Internet is the largest example of a WAN.',
  sol: 'The Internet spans the whole world, which makes it the largest Wide Area Network.',
}));
Q('mt_types', match({
  t: 3, d: 2, c: 'application',
  stem: 'Match each imagined situation with the type of network.',
  pairs: [
    ['A laptop and a phone sharing files over Bluetooth on a desk', 'PAN'],
    ['Thirty computers in one school building', 'LAN'],
    ['Branches of a cooperative bank across one city', 'MAN'],
    ['A railway booking system linking stations across India', 'WAN'],
  ],
  sol: 'Coverage decides the type: a few metres (PAN), a building (LAN), a city (MAN), a country or more (WAN).',
}));
Q('s_lan_wan', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two differences between a LAN and a WAN.',
  model: '1. A **LAN** covers a small area such as a building or campus; a **WAN** spreads across cities, countries or continents.\n2. A LAN is usually **owned by one organisation** and gives **high speed** at low cost; a WAN often uses **leased or public links** and is slower and costlier.',
  sol: 'Area covered, and ownership, speed or cost.',
  scheme: [['Area difference', 1], ['Ownership, speed or cost difference', 1]],
}));
Q('s_bus_star', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give one advantage and one disadvantage of a bus topology.',
  model: '**Advantage:** it needs the **least cable** and is easy to extend, because all nodes tap into one backbone. **Disadvantage:** a **break in the backbone** stops the whole network, and faults are **hard to locate**.',
  sol: 'Any valid advantage and disadvantage.',
  scheme: [['Advantage', 1], ['Disadvantage', 1]],
}));
Q('s3_topology_choice', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A small library wants 15 computers networked so that one faulty cable never stops the others and new computers can be added easily. Recommend a topology and justify it, and mention one weakness to plan for.',
  model: '**Recommend a star topology** with a switch at the centre. Each computer has its **own cable**, so a fault on one link affects only that computer, and a new computer is added by **plugging one more cable** into a free port. **Weakness:** if the **central switch fails**, every computer loses its connection, so a spare switch or a UPS should be kept ready.',
  sol: 'Star, two reasons tied to the needs, and the central-device weakness.',
  scheme: [['Star topology chosen', 1], ['Justification linked to the needs', 1], ['Weakness and remedy', 1]],
}));
Q('l_topologies', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare bus, star and tree topologies. For each, describe the layout, give one advantage and one drawback, and say which kind of organisation it suits.',
  model: '1. **Bus:** every node taps into one **backbone** cable with terminators at the ends. Cheap and easy to lay, but a backbone break stops everything; suits a **small, temporary** set-up.\n2. **Star:** each node has its own cable to a **central switch or hub**. Faults are easy to find and one bad cable affects one node, but the central device is a **single point of failure**; suits **labs and offices**.\n3. **Tree:** **stars connected in levels** to a main switch. Expands department by department, but a fault near the top cuts off a whole branch; suits **colleges and large firms** with many departments.',
  sol: 'Layout, one advantage and one drawback, and a suitable user for each of the three.',
  scheme: [['Bus described with pros and cons', 1.5], ['Star described with pros and cons', 1.5], ['Tree described with pros and cons', 1], ['Suitable users', 1]],
}));

// Campus cases (board pattern): server, cable layout, repeater, device, medium.
const pick = (o) => o.server;
Q('cb_neelgiri', caseQ({
  t: [3, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Study the plan for the network of ${NEELGIRI.name} and answer the questions. *(Imagined school, distances and numbers, written by SOYL for practice.)*`,
  passage: `${NEELGIRI.name} has four blocks. The network engineer says that any cable run longer than **${NEELGIRI.limit} m** needs a repeater.\n\n${tableOf(NEELGIRI)}`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'd', stem: 'In which block should the main server be placed?', opts: ['Admin', 'Junior', 'Library', pick(NEEL)], sol: `The ${NEEL.server} block has the most computers (${NEELGIRI.pcs[NEEL.server]}), so placing the server there keeps most traffic inside that block.` })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', fixed: true, key: 'b', stem: 'Which device should be installed in each block to connect its computers?', opts: ['Modem', 'Switch', 'Gateway', 'RJ11 connector'], sol: 'A switch in each block joins that block\'s computers and links them to the server block.' })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): Suggest a cable layout (star from the server block) and say on which links repeaters are needed.`, model: `Run cables in a **star from ${NEEL.server}** to each other block: ${Object.entries(NEEL.fromServer).map(([b, d]) => `${NEEL.server}–${b} ${d} m`).join(', ')}. All of these are longer than ${NEELGIRI.limit} m, so a **repeater** is needed on the links to **${NEEL.repeaters.join(', ')}**.`, sol: 'Star from the server block, then compare each link with the limit.', scheme: [['Star layout from the server block', 1], ['Repeater links identified', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): The school wants the fastest link between the server block and the Admin block, free from interference by the generator room beside it. Suggest the medium and give a reason.', model: '**Optical fibre**: it carries light, so the generator\'s electrical noise cannot disturb it, and it gives the highest data rate.', sol: 'Fibre, with the interference or speed reason.', scheme: [['Optical fibre', 1], ['Reason', 1]] }),
    ]),
  ],
}));
Q('cb_krishi', caseQ({
  t: [3, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read about the planned network of ${KRISHI.name} and answer the questions. *(Imagined company, distances and numbers, written by SOYL for practice.)*`,
  passage: `${KRISHI.name} has four buildings on one plot and a sales office in Delhi, about 1,200 km away. Any cable run longer than **${KRISHI.limit} m** needs a repeater.\n\n${tableOf(KRISHI)}`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'b', stem: 'Which building is the best place for the server?', opts: ['Lab', pick(KRI), 'Store', 'Warehouse'], sol: `${KRI.server} has the most computers (${KRISHI.pcs[KRI.server]}).` })),
    child('b', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'c', stem: 'What type of network will connect the Nashik plot to the Delhi sales office?', opts: ['PAN', 'LAN', 'WAN', 'MAN'], sol: 'A link between two cities over 1,000 km apart is a Wide Area Network.' })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): If cables run in a star from the server building, is any repeater needed? Justify using the table.', model: `No. From ${KRI.server} the runs are ${Object.entries(KRI.fromServer).map(([b, d]) => `${b} ${d} m`).join(', ')}, all **within ${KRISHI.limit} m**, so **no repeater** is required.`, sol: 'Read each distance from the server building and compare with the limit.', scheme: [['Distances from the server read', 1], ['Correct conclusion', 1]] }), [
      short({ t: 2, d: 2, c: 'application', marks: 2, stem: '**Or** (ii): Which device will connect the company\'s LAN to the Internet for the Delhi link, and why?', model: 'A **router**, because it joins the company LAN to other networks and chooses the route for packets travelling to Delhi.', sol: 'Router with its routing role.', scheme: [['Router', 1], ['Reason', 1]] }),
    ]),
  ],
}));
Q('cb_surya', caseQ({
  t: [3, 2, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the case of ${SURYA.name} and answer the questions. *(Imagined hospital, distances and numbers, written by SOYL for practice.)*`,
  passage: `${SURYA.name} is building a network for its four blocks. Doctors also want to hold video consultations with a partner clinic in Udaipur. Any cable run longer than **${SURYA.limit} m** needs a repeater.\n\n${tableOf(SURYA)}`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'a', stem: 'Where should the server be placed?', opts: [pick(SUR), 'Lab', 'Pharmacy', 'Wards'], sol: `${SUR.server} has the most computers (${SURYA.pcs[SUR.server]}).` })),
    child('b', mcq({ t: 4, d: 2, c: 'application', fixed: true, key: 'c', stem: 'Which protocol lets doctors talk to the Udaipur clinic over the Internet as a voice or video call?', opts: ['FTP', 'POP3', 'VoIP', 'TELNET'], sol: 'Voice over Internet Protocol carries voice (and video) calls as packets over the Internet.' })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): With cables in a star from the server block, which link needs a repeater? Show your reasoning.', model: `Runs from ${SUR.server}: ${Object.entries(SUR.fromServer).map(([b, d]) => `${b} ${d} m`).join(', ')}. Only **${SUR.repeaters.join(', ')}** is beyond ${SURYA.limit} m, so the repeater goes on that link.`, sol: 'Compare each run from the server block with the limit.', scheme: [['Distances compared', 1], ['Correct link', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Nurses move around the Wards block with tablets. Suggest how to connect them and name the medium used.', model: 'Fit **Wi-Fi access points** across the Wards block, linked to its switch; tablets connect by **radio waves**, which pass through walls so nurses stay connected while moving.', sol: 'Wi-Fi with radio waves and the reason.', scheme: [['Wi-Fi access points', 1], ['Radio waves with reason', 1]] }),
    ]),
  ],
}));
Q('cb_vidya', caseQ({
  t: [3, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Study the campus of ${VIDYA.name} and answer the questions. *(Imagined college, distances and numbers, written by SOYL for practice.)*`,
  passage: `${VIDYA.name} wants one network for its four blocks. Any cable run longer than **${VIDYA.limit} m** needs a repeater.\n\n${tableOf(VIDYA)}`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'c', stem: 'Which block should hold the server?', opts: ['Hostel', 'Workshop', pick(VID), 'Canteen'], sol: `${VID.server} has the most computers (${VIDYA.pcs[VID.server]}).` })),
    child('b', tf({ t: 3, d: 3, c: 'analysis', ans: false, stem: 'True or false? With a star from the server block, the Workshop link needs a repeater.', sol: `The Workshop is ${VID.fromServer.Workshop} m from ${VID.server}, within ${VIDYA.limit} m, so no repeater is needed on that link.` })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): The Hostel and Canteen are close to each other but far from the Main block. Suggest a cheaper layout than a direct star and justify it.', model: `Run one cable from **${VID.server} to the Workshop** (${VIDYA.dist['Main-Workshop']} m), then from the Workshop to the **Canteen** (${VIDYA.dist['Canteen-Workshop']} m) and the Canteen to the **Hostel** (${VIDYA.dist['Hostel-Canteen']} m), with a switch in each. Every run is within ${VIDYA.limit} m, so **no repeater** is needed and less cable is used.`, sol: 'A tree-like chain through near blocks keeps every run under the limit.', scheme: [['Workable layout', 1], ['Justified with distances', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): The polytechnic wants to protect its network from attacks coming from the Internet. Name a device or software to install and say where.', model: 'Install a **firewall** at the point where the campus network meets the Internet, next to the **router** in the Main block, so that unwanted traffic is filtered before it enters.', sol: 'Firewall at the Internet entry point.', scheme: [['Firewall', 1], ['Correct placement', 1]] }),
    ]),
  ],
}));
Q('l_campus', long({
  t: [3, 2], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `*(Imagined school, written by SOYL for practice.)* ${NEELGIRI.name} wants a network for the blocks below. Any run longer than ${NEELGIRI.limit} m needs a repeater.\n\n${tableOf(NEELGIRI)}\n\n(i) Where should the server go? (ii) Suggest a cable layout. (iii) Where are repeaters needed? (iv) Which device connects computers inside each block? (v) Which device links the school to the Internet?`,
  model: `(i) **${NEEL.server}**, because it has the most computers (${NEELGIRI.pcs[NEEL.server]} of ${NEEL.total}), so most traffic stays local.\n(ii) A **star** from ${NEEL.server} to each block: ${Object.entries(NEEL.fromServer).map(([b, d]) => `${b} ${d} m`).join(', ')}.\n(iii) Every one of these runs is longer than ${NEELGIRI.limit} m, so put a **repeater** on the links to ${NEEL.repeaters.join(', ')}.\n(iv) A **switch** in each block.\n(v) A **router** (with a modem from the Internet provider) in the server block.`,
  sol: 'Each part rests on the table: most computers, star layout, distance against the limit, then the devices.',
  scheme: [['Server block with reason', 1], ['Cable layout', 1], ['Repeater links', 1], ['Switch', 1], ['Router', 1]],
}));

// ================================================================ t04 Network protocols
Q('m_smtp', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which protocol is used to **send** e-mail from a mail client to a mail server?',
  opts: ['SMTP', 'POP3', 'FTP', 'PPP'],
  sol: 'SMTP (Simple Mail Transfer Protocol) sends and relays mail. POP3 downloads mail to the client; FTP transfers files; PPP links two nodes directly.',
}));
Q('m_pop3', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Meera\'s mail program downloads new messages from the server to her laptop so she can read them offline on a train. Which protocol is doing this?',
  opts: ['POP3', 'SMTP', 'HTTP', 'TELNET'],
  sol: 'POP3 retrieves mail from the server to the client device. SMTP sends mail; HTTP fetches web pages; TELNET gives a remote terminal.',
}));
Q('m_ftp', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A web designer uploads 40 image files from her computer to the server that hosts a client\'s website. Which protocol is designed for this?',
  opts: ['FTP', 'SMTP', 'VoIP', 'PPP'],
  sol: 'File Transfer Protocol moves files between a client and a server. The others handle mail, voice calls and point-to-point links.',
}));
Q('m_https', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Why should a bank\'s login page use HTTPS rather than HTTP?',
  opts: [
    'HTTPS encrypts the data between browser and server, so a password cannot be read if intercepted',
    'HTTPS pages load without an Internet connection',
    'HTTPS needs no web server',
    'HTTPS sends data by e-mail instead',
  ],
  sol: 'The S stands for secure: HTTPS encrypts traffic. It still needs a connection and a server, and it is not e-mail.',
}));
Q('m_telnet', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'An administrator logs in to a distant server and types commands as if sitting at it, but the session is sent as plain, unencrypted text. Which protocol is being used?',
  opts: ['TELNET', 'HTTPS', 'POP3', 'SMTP'],
  sol: 'TELNET provides remote login to a terminal but sends everything, including passwords, unencrypted. HTTPS is encrypted web traffic; POP3 and SMTP are for mail.',
}));
Q('ar_tcpip', ar({
  t: 4, d: 3, c: 'analysis', key: 'c',
  a: 'TCP/IP is a suite of protocols in which IP handles addressing and routing of packets.',
  r: 'TCP sends data in a single piece and never needs to reassemble packets.',
  sol: 'A is true. R is false: TCP breaks data into packets, numbers them and reassembles them in order at the receiver, resending any that are lost.',
}));
Q('fb_ppp', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'The protocol used to set up a direct link between two nodes, for example a dial-up connection to an Internet provider, is ___.',
  acc: [['PPP', 'Point-to-Point Protocol']],
  sol: 'PPP (Point-to-Point Protocol) creates a direct link between two nodes.',
}));
Q('s_tcp_ip', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the roles of TCP and IP when a file travels across the Internet.',
  model: '**TCP** splits the file into **numbered packets**, checks that all arrive and **reassembles** them in order, asking again for any lost packet. **IP** gives each packet the **destination address** and handles its **routing** across networks.',
  sol: 'TCP: packets, order, reliability; IP: addressing and routing.',
  scheme: [['Role of TCP', 1], ['Role of IP', 1]],
}));
Q('s3_mail_flow', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Ishaan in Pune e-mails a project file to Zoya in Guwahati. Describe the journey of the mail, naming the protocols used at each stage.',
  model: '1. Ishaan\'s mail program hands the message to his mail server using **SMTP**.\n2. His server relays it, again by **SMTP**, to Zoya\'s mail server, where it waits in her mailbox; the data travels in packets using **TCP/IP**.\n3. Zoya\'s mail program downloads it from her server with **POP3** (or reads it on the server), and she opens the attachment.',
  sol: 'Sending (SMTP), relaying (SMTP over TCP/IP) and retrieval (POP3).',
  scheme: [['Sending with SMTP', 1], ['Relay and TCP/IP', 1], ['Retrieval with POP3', 1]],
}));
Q('l_protocols', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the use of any five of these protocols with a real-life example of each: HTTP, HTTPS, FTP, SMTP, POP3, PPP, TELNET, VoIP.',
  model: '1. **HTTP:** fetches web pages from a server to a browser, e.g. opening a news site.\n2. **HTTPS:** the encrypted form of HTTP, e.g. logging in to net banking.\n3. **FTP:** transfers files between computers, e.g. uploading photos to a website\'s server.\n4. **SMTP:** sends and relays e-mail, e.g. sending an application to a college.\n5. **VoIP:** carries voice calls as packets over the Internet, e.g. a call through a messaging app. (Also: **POP3** downloads mail, **PPP** links two nodes directly, **TELNET** gives remote login.)',
  sol: 'Any five protocols, each with its purpose and an example.',
  scheme: [['First protocol', 1], ['Second protocol', 1], ['Third protocol', 1], ['Fourth protocol', 1], ['Fifth protocol', 1]],
}));

// ================================================================ t05 Web services
Q('m_www', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which statement correctly separates the Internet from the World Wide Web?',
  opts: [
    'The Internet is the worldwide network of networks; the Web is a service on it made of linked web pages',
    'They are two names for the same thing',
    'The Web is the hardware and the Internet is the set of web pages',
    'The Internet works only inside one country, the Web worldwide',
  ],
  sol: 'The Internet is the infrastructure; the World Wide Web is one service that runs on it (e-mail and file transfer are others).',
}));
Q('m_url_domain', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'In the imagined URL `https://www.indusbooks.in/kids/stories.html`, which part is the **domain name**?',
  opts: ['`www.indusbooks.in`', '`https`', '`/kids/stories.html`', '`stories.html`'],
  sol: 'In this address `https` is the protocol, `www.indusbooks.in` is the domain name, and `/kids/stories.html` is the path to the file on that server.',
}));
Q('m_tld', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'In the domain name `rainbowschool.edu.in`, the part `in` is the',
  opts: ['country-code top-level domain', 'protocol', 'file path', 'IP address'],
  sol: 'in is the top-level domain for India; edu is a second-level label. The protocol and path are separate parts of a URL.',
}));
Q('m_dns', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'When you type a website\'s name into a browser, which system finds the matching IP address so the browser can reach the server?',
  opts: ['Domain Name System (DNS)', 'Point-to-Point Protocol', 'File Transfer Protocol', 'A repeater'],
  sol: 'DNS servers translate human-friendly domain names into IP addresses. The other options do not resolve names.',
}));
Q('m_xml', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'A train-timetable service stores its data in a file whose tags, named train, departs and platform, were invented by its own programmers. Which language is it using?',
  opts: ['XML', 'HTML', 'SMTP', 'URL'],
  sol: 'XML lets users define their own tags to store and carry data. HTML has a fixed set of tags for displaying pages; SMTP and URL are not languages.',
}));
Q('ar_html_xml', ar({
  t: 5, d: 3, c: 'analysis', key: 'd',
  a: 'HTML is used mainly to store and transport data between programs.',
  r: 'XML allows users to define their own tags to describe data.',
  sol: 'A is false: HTML is used to display web pages with predefined tags; storing and transporting data is the job of XML. R is true.',
}));
Q('tf_browser', tf({
  t: 5, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? A web browser stores websites and sends pages to visitors.',
  sol: 'That is the job of a web server. A browser requests pages and displays them to the user.',
}));
Q('s_browser_server', short({
  t: 5, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the difference between a web browser and a web server? Give one example of each.',
  model: 'A **web browser** is client software that **requests and displays** web pages, e.g. Firefox or Chrome. A **web server** is a computer with software that **stores** websites and **sends** pages when browsers ask, e.g. Apache running on a hosting company\'s machine.',
  sol: 'Request and display versus store and serve, with an example of each.',
  scheme: [['Browser with example', 1], ['Server with example', 1]],
}));
Q('s_hosting', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'A home bakery in Mysuru has designed its website on a laptop. What is web hosting, and why does the bakery need it?',
  model: '**Web hosting** is renting space on a **web server** that stays connected to the Internet day and night. The bakery needs it because its **laptop is not always on or reachable**; on a hosting server, customers can open the site **at any time** using its domain name.',
  sol: 'Meaning of hosting and the need for an always-on server.',
  scheme: [['Meaning of web hosting', 1], ['Why the bakery needs it', 1]],
}));
Q('s3_url_parts', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Break the imagined URL `https://www.kesarfarms.co.in/products/mango.html` into its parts and state what each part tells the browser.',
  model: '1. `https` is the **protocol**: the browser must use secure HTTP.\n2. `www.kesarfarms.co.in` is the **domain name**, which DNS turns into the server\'s IP address; `in` is the country-code top-level domain.\n3. `/products/mango.html` is the **path**: the folder and file the server should send back.',
  sol: 'Protocol, domain name (with the top-level domain) and path, each with its meaning.',
  scheme: [['Protocol', 1], ['Domain name', 1], ['Path', 1]],
}));
Q('l_web', long({
  t: 5, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain these web terms with an example of each: website, web page, web browser, web server and domain name.',
  model: '1. **Web page:** one document on the Web, written in HTML, e.g. a school\'s admission page.\n2. **Website:** a set of related web pages under one domain, e.g. all the pages of a school\'s site.\n3. **Web browser:** software that requests and shows pages, e.g. Firefox.\n4. **Web server:** a computer that stores sites and sends pages on request, e.g. a hosting company\'s server.\n5. **Domain name:** the readable name of a site, e.g. `examplecollege.ac.in`, which DNS converts into an IP address.',
  sol: 'Five terms, each defined with a fitting example.',
  scheme: [['Web page', 1], ['Website', 1], ['Browser', 1], ['Server', 1], ['Domain name', 1]],
}));

// Extra objective items for deck checks.
Q('n_video', num({
  t: 1, d: 3, c: 'application', marks: 1, value: VIDEO_SECS, unit: 's',
  stem: `Taking 1 byte = 8 bits (same "M" in both units), how long does a ${VIDEO.mb} MB video take to download at ${VIDEO.rate} Mbps?`,
  sol: `${VIDEO.mb} × 8 = ${VIDEO.mb * 8} Mb; ${VIDEO.mb * 8} ÷ ${VIDEO.rate} = ${VIDEO_SECS} seconds.`,
}));
Q('m_wifi_card', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'An old desktop in a cyber café has no wireless hardware. What should be fitted so it can join the café\'s Wi-Fi network?',
  opts: ['A Wi-Fi card (wireless network adapter)', 'An RJ45 connector', 'A repeater', 'A coaxial cable'],
  sol: 'A Wi-Fi card gives the computer a wireless interface. RJ45 and coaxial are for wired links; a repeater only boosts signals.',
}));
Q('m_topology_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The arrangement in which computers and devices are connected in a network is called its',
  opts: ['topology', 'protocol', 'bandwidth', 'domain'],
  sol: 'Topology is the physical or logical layout of a network. Protocols are rules, bandwidth is capacity and a domain is a name.',
}));
Q('m_voip', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A grandmother in Varanasi talks to her grandson in Toronto through an app that sends her voice as data packets over the Internet. The technology is',
  opts: ['VoIP', 'FTP', 'PPP', 'POP3'],
  sol: 'Voice over Internet Protocol turns speech into packets sent over the Internet.',
}));
Q('m_html_purpose', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'HTML is mainly used to',
  opts: ['describe the structure and display of web pages', 'send e-mail between servers', 'translate domain names into IP addresses', 'move files between computers'],
  sol: 'HyperText Markup Language structures and displays web content. SMTP sends mail, DNS resolves names and FTP moves files.',
}));
Q('n_album', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: ALBUM_SECS, unit: 's',
  stem: `A photo album of ${inr(ALBUM.kb)} kilobits is sent over a ${ALBUM.rate} Kbps link. How many seconds does it take?`,
  sol: `Time = ${inr(ALBUM.kb)} ÷ ${ALBUM.rate} = ${ALBUM_SECS} seconds.`,
}));
Q('tf_tree_expand', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A tree topology lets a network grow by adding a new branch (for example, a new department) to the main switch.',
  sol: 'New star groups can be attached at any level, which is why tree networks expand easily.',
}));
