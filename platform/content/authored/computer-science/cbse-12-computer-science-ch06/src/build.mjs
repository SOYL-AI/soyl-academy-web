// Build CBSE 12 Computer Science ch06 Computer Networks. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-12-computer-science-ch06/src/build.mjs
// No program output appears in this chapter, so no Python runs; every number (transfer times, campus
// distances, server and repeater choices) is computed in questions.mjs and asserted.
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-12-computer-science-ch06', 'computer-science');
const { REPORT, REPORT_BITS, REPORT_SECS, VIDEO, VIDEO_SECS, campus } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const inr = (n) => n.toLocaleString('en-IN');

// ---------------------------------------------------------------- SVG figures
/** A labelled box centred at (x, y). */
function box(s, x, y, label, o = {}) {
  const w = o.w ?? 64, h = o.h ?? 28;
  s.rect(x - w / 2, y - h / 2, w, h, { color: o.color, fill: o.fill ?? 'fill', sw: 1.6, rx: 6 });
  s.text(x, y, label, { size: o.size ?? 13, bold: o.bold });
}

const vTimeline = (() => {
  const s = new Svg(560, 150);
  const ev = [[1969, 'ARPANET'], [1983, 'TCP/IP adopted'], [1986, 'NSFNET'], [1989, 'Web proposed']];
  const X = (yr) => 50 + ((yr - 1965) / (1995 - 1965)) * 460;
  s.arrow(30, 80, 540, 80, { sw: 1.6 });
  ev.forEach(([yr, label], i) => {
    s.dot(X(yr), 80, 5, 'accent');
    const up = i % 2 === 0;
    s.line(X(yr), 80, X(yr), up ? 52 : 108, { sw: 1.2, color: 'muted' });
    s.text(X(yr), up ? 42 : 118, String(yr), { bold: true, size: 13 });
    s.text(X(yr), up ? 24 : 136, label, { size: 12 });
  });
  return s.visual('Timeline from 1965 to 1995: ARPANET in 1969, ARPANET adopts TCP/IP in 1983, NSFNET in 1986, and the World Wide Web proposed in 1989', 'From one defence project to a network of networks.');
})();

const vBus = (() => {
  const s = new Svg(540, 200);
  s.line(40, 100, 500, 100, { sw: 3, color: 'accent' });
  s.rect(28, 92, 12, 16, { fill: 'muted', stroke: false, rx: 2 });
  s.rect(500, 92, 12, 16, { fill: 'muted', stroke: false, rx: 2 });
  [100, 180, 260, 340, 420].forEach((x, i) => {
    const up = i % 2 === 0;
    s.line(x, 100, x, up ? 62 : 138, { sw: 1.6 });
    box(s, x, up ? 48 : 152, `PC ${i + 1}`);
  });
  s.text(270, 186, 'Backbone cable with a terminator at each end', { size: 12, muted: true });
  return s.visual('Bus topology: five computers each joined by a short drop cable to one backbone cable that has a terminator at each end', 'Bus: one shared backbone.');
})();

const vStar = (() => {
  const s = new Svg(420, 260);
  const c = [210, 130];
  const pts = [0, 60, 120, 180, 240, 300].map((a) => [c[0] + 150 * Math.cos((a * Math.PI) / 180), c[1] + 95 * Math.sin((a * Math.PI) / 180)]);
  pts.forEach(([x, y]) => s.line(c[0], c[1], x, y, { sw: 1.6 }));
  pts.forEach(([x, y], i) => box(s, x, y, `PC ${i + 1}`));
  box(s, c[0], c[1], 'Switch', { w: 76, fill: 'accent', bold: true });
  return s.visual('Star topology: six computers, each with its own cable to a central switch in the middle', 'Star: every node has its own link to the centre.');
})();

const vTree = (() => {
  const s = new Svg(540, 250);
  const root = [270, 36];
  const hubs = [[140, 120], [400, 120]];
  hubs.forEach(([x, y]) => s.line(root[0], root[1], x, y, { sw: 2 }));
  let n = 1;
  hubs.forEach(([hx, hy]) => {
    [-80, 0, 80].forEach((dx) => {
      s.line(hx, hy, hx + dx, 210, { sw: 1.4 });
      box(s, hx + dx, 210, `PC ${n++}`, { w: 56 });
    });
    box(s, hx, hy, 'Hub', { w: 64 });
  });
  box(s, root[0], root[1], 'Main switch', { w: 110, fill: 'accent', bold: true });
  return s.visual('Tree topology: a main switch at the top connects two hubs, and each hub connects three computers below it', 'Tree: stars joined in levels.');
})();

// Worked example campus (different from every test item).
const DEMO = {
  name: 'Sahyadri Junior College, Satara',
  limit: 90,
  dist: { 'Arts-Commerce': 70, 'Arts-Science': 50, 'Arts-Office': 130, 'Commerce-Science': 60, 'Commerce-Office': 45, 'Office-Science': 100 },
  pcs: { Arts: 20, Commerce: 35, Office: 10, Science: 80 },
};
const D = campus(DEMO);
assert.equal(D.server, 'Science');
assert.deepEqual(D.repeaters, ['Office']);
const vCampus = (() => {
  const s = new Svg(520, 270);
  const pos = { Science: [260, 140], Arts: [90, 60], Commerce: [430, 60], Office: [430, 225] };
  for (const [b, d] of Object.entries(D.fromServer)) {
    const [x1, y1] = pos[D.server], [x2, y2] = pos[b];
    const rep = D.repeaters.includes(b);
    s.line(x1, y1, x2, y2, { sw: 2, color: rep ? 'red' : undefined, dash: rep });
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    s.text(mx + (b === 'Arts' ? -18 : 22), my + (b === 'Office' ? 12 : -10), `${d} m${rep ? ' (repeater)' : ''}`, { size: 12, color: rep ? 'red' : undefined });
  }
  for (const [b, [x, y]] of Object.entries(pos)) box(s, x, y, `${b} (${DEMO.pcs[b]})`, { w: 116, fill: b === D.server ? 'accent' : 'fill', bold: b === D.server });
  s.text(260, 262, 'Star from the server block; runs over 90 m need a repeater', { size: 12, muted: true });
  return s.visual(`Campus plan of the imagined ${DEMO.name}: the Science block with ${DEMO.pcs.Science} computers holds the server; cables run to Arts (${D.fromServer.Arts} m), Commerce (${D.fromServer.Commerce} m) and Office (${D.fromServer.Office} m); only the Office link is longer than ${DEMO.limit} m and needs a repeater`, 'Imagined campus. Computers per block in brackets.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['What a network is', 'How it began', 'Data communication', 'Switching and IP', 'Media', 'Devices'], 'Route map of Part 1: what a network is, how networking began, data communication terms, switching and IP addresses, transmission media, and network devices', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Network types', 'Topologies', 'Designing a campus', 'Protocols', 'The Web'], 'Route map of Part 2: network types, topologies, designing a campus network, protocols, and web services', 'Part 2 at a glance');
const vWhy = table(
  ['Benefit', 'Everyday example'],
  [
    ['Share resources', 'One printer for a whole staff room'],
    ['Share data', 'Marks entered once, seen by every class teacher'],
    ['Communicate', 'E-mail and video calls between branches'],
    ['Back up centrally', 'Files saved on a server, not on one laptop'],
  ],
  'Table of four benefits of a network: sharing a printer, sharing data such as marks, communicating by e-mail and video calls, and central backup on a server',
);
const vComm = flow('LR', ['Sender', 'Message over a medium', 'Receiver'], 'Flow of data communication: a sender sends a message over a medium to a receiver, both following the same protocol', 'Both ends follow the same protocol.');
const vUnits = table(
  ['Unit', 'Meaning'],
  [
    ['bps', 'bits per second'],
    ['Kbps', 'kilobits per second'],
    ['Mbps', 'megabits per second'],
    ['Gbps', 'gigabits per second'],
    ['1 byte', '8 bits (so KB × 8 = Kb)'],
  ],
  'Table of data rate units: bps, Kbps, Mbps and Gbps, and the reminder that one byte is eight bits',
  'CBSE usually states the step (1024 or 1000) in the question; use what it gives.',
);
const vWork1 = table(
  ['Step', 'Report-card upload', 'Video download'],
  [
    ['Size', `${REPORT.kb} KB`, `${VIDEO.mb} MB`],
    ['In bits (× 8)', `${inr(REPORT_BITS)} Kb`, `${VIDEO.mb * 8} Mb`],
    ['Rate', `${REPORT.rate} Kbps`, `${VIDEO.rate} Mbps`],
    ['Time = bits ÷ rate', `${REPORT_SECS} s`, `${VIDEO_SECS} s`],
  ],
  `Worked example table: a ${REPORT.kb} kilobyte file is ${REPORT_BITS} kilobits and takes ${REPORT_SECS} seconds at ${REPORT.rate} kilobits per second; a ${VIDEO.mb} megabyte video is ${VIDEO.mb * 8} megabits and takes ${VIDEO_SECS} seconds at ${VIDEO.rate} megabits per second`,
  'Imagined files. Convert bytes to bits first.',
);
const vSwitching = table(
  ['', 'Circuit switching', 'Packet switching'],
  [
    ['Path', 'Reserved end to end before talking', 'No reservation; each packet routed on its own'],
    ['Use of the line', 'Idle during pauses', 'Shared by many users'],
    ['Example', 'Landline call', 'E-mail, web pages'],
  ],
  'Comparison table: circuit switching reserves a path that sits idle in pauses, as in a landline call; packet switching sends packets separately over shared links, as in e-mail',
);
const vIP = table(
  ['', 'IPv4', 'IPv6'],
  [
    ['Size', '32 bits', '128 bits'],
    ['Written as', 'Four numbers 0–255 with dots', 'Eight groups of hexadecimal digits with colons'],
    ['Sample', '`172.16.4.20`', '`2001:db8::7`'],
  ],
  'Table comparing IPv4 (32 bits, four numbers from 0 to 255 separated by dots) with IPv6 (128 bits, groups of hexadecimal digits separated by colons)',
);
const vWired = table(
  ['Medium', 'Carries', 'Strength', 'Limitation'],
  [
    ['Twisted pair', 'Electrical signals', 'Cheap, flexible', 'Short runs; picks up noise'],
    ['Coaxial', 'Electrical signals', 'Better shielding', 'Bulkier, costlier'],
    ['Optical fibre', 'Light', 'Highest speed, no electrical noise', 'Costly, needs care to join'],
  ],
  'Table of wired media: twisted pair is cheap but noisy over distance, coaxial is better shielded, optical fibre carries light at the highest speed but costs more',
);
const vWireless = table(
  ['Medium', 'How it travels', 'Typical use'],
  [
    ['Radio waves', 'All directions, through walls', 'Wi-Fi, mobile phones, FM'],
    ['Microwaves', 'Straight line between dishes', 'Long links between towers, satellite'],
    ['Infrared', 'Short line of sight, not through walls', 'TV remotes'],
  ],
  'Table of wireless media: radio waves spread in all directions through walls, microwaves need a line of sight between dishes, infrared works only over a short line of sight',
);
const vChoose = table(
  ['Need', 'Medium'],
  [
    ['20 PCs in one room, low budget', 'Twisted pair'],
    ['Two buildings beside a noisy workshop', 'Optical fibre'],
    ['Laptops moving around a hostel', 'Radio waves (Wi-Fi)'],
    ['Two towers 25 km apart in open country', 'Microwave'],
  ],
  'Worked example table matching needs to media: a low-budget room uses twisted pair, a noisy site uses optical fibre, moving laptops use Wi-Fi radio waves, and distant towers use microwave',
);
const vDevices1 = table(
  ['Device', 'Job'],
  [
    ['Modem', 'Converts digital data to the line signal and back'],
    ['Ethernet card (NIC)', 'Connects a computer to a wired LAN; carries its MAC address'],
    ['RJ45', 'The 8-pin plug on an Ethernet cable'],
    ['Wi-Fi card', 'Lets a computer join a wireless network'],
  ],
  'Table of devices: a modem converts between digital data and the line signal, an Ethernet card connects a computer to a wired network, RJ45 is the eight-pin plug, and a Wi-Fi card gives wireless access',
);
const vDevices2 = table(
  ['Device', 'Sends a frame to', 'Works across'],
  [
    ['Repeater', 'Onward, after regenerating it', 'One long cable'],
    ['Hub', 'Every port', 'One LAN'],
    ['Switch', 'Only the destination port', 'One LAN'],
  ],
  'Table: a repeater regenerates a weak signal on a long cable, a hub sends a frame to every port, and a switch sends it only to the destination port',
);
const vRouter = flow('LR', ['School LAN (switch)', 'Router', 'Internet', 'Gateway', 'Network with other rules'], 'Flow: a school LAN connects through a router to the Internet; a gateway translates between networks that follow different protocols', 'Router: between networks. Gateway: between different protocols.');
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Origins', 'ARPANET 1969, TCP/IP 1983, NSFNET 1986'],
    ['Rate', 'Time = bits ÷ bits per second; 1 byte = 8 bits'],
    ['Switching', 'Circuit reserves; packet shares'],
    ['Media', 'Twisted pair cheap, fibre fastest, radio through walls'],
    ['Devices', 'Hub broadcasts, switch targets, router routes'],
  ],
  'Summary table of Part 1: networking origins, the rate formula, circuit versus packet switching, media and devices',
);
const vTypes = table(
  ['Type', 'Covers', 'Example'],
  [
    ['PAN', 'A few metres around one person', 'Phone and earbuds by Bluetooth'],
    ['LAN', 'A room, building or campus', 'A school computer lab'],
    ['MAN', 'A city', 'Branches of a bank in one city'],
    ['WAN', 'Countries and continents', 'The Internet'],
  ],
  'Table of network types by area: PAN around one person, LAN in a building or campus, MAN across a city, WAN across countries such as the Internet',
);
const vTopoCompare = table(
  ['', 'Bus', 'Star', 'Tree'],
  [
    ['Cable needed', 'Least', 'More', 'More'],
    ['One cable fault', 'Backbone break stops all', 'Affects one node', 'Can cut off a branch'],
    ['Adding nodes', 'Tap the backbone', 'One more cable to the centre', 'Add a new branch'],
  ],
  'Comparison table of bus, star and tree topologies on cable needed, the effect of one cable fault, and how nodes are added',
);
const vDesign = table(
  ['Question', `Answer for ${DEMO.name.split(',')[0]}`],
  [
    ['Server', `${D.server} (most computers: ${DEMO.pcs[D.server]})`],
    ['Layout', `Star from ${D.server}`],
    ['Repeater', `On the ${D.repeaters.join(', ')} link (${D.fromServer.Office} m)`],
    ['Inside each block', 'A switch'],
    ['To the Internet', `A router in ${D.server}`],
  ],
  `Worked example answers for the imagined college: server in ${D.server}, star layout, a repeater on the ${D.repeaters.join(', ')} link, a switch in each block, and a router for the Internet`,
);
const vProtocols = table(
  ['Protocol', 'Used for'],
  [
    ['HTTP / HTTPS', 'Web pages (HTTPS encrypted)'],
    ['FTP', 'Moving files to and from a server'],
    ['SMTP', 'Sending and relaying e-mail'],
    ['POP3', 'Downloading e-mail to your device'],
    ['PPP', 'A direct link between two nodes'],
    ['TELNET', 'Remote login (not encrypted)'],
    ['VoIP', 'Voice calls over the Internet'],
    ['TCP/IP', 'Packets, addressing and routing'],
  ],
  'Table of protocols: HTTP and HTTPS for web pages, FTP for files, SMTP to send mail, POP3 to download mail, PPP for a direct link, TELNET for remote login, VoIP for voice, TCP/IP for packets and routing',
);
const vMail = flow('LR', ['Sender\'s mail app', 'Sender\'s mail server', 'Receiver\'s mail server', 'Receiver\'s mail app'], 'Flow of an e-mail: the sender\'s app passes it to the sender\'s server by SMTP, servers relay it by SMTP, and the receiver\'s app downloads it by POP3', 'SMTP sends and relays; POP3 downloads.', [
  { from: 'n1', to: 'n2', label: 'SMTP' },
  { from: 'n2', to: 'n3', label: 'SMTP' },
  { from: 'n3', to: 'n4', label: 'POP3' },
]);
const vTcp = flow('LR', ['File split into numbered packets (TCP)', 'Each packet addressed and routed (IP)', 'Packets arrive, maybe out of order', 'Reassembled in order (TCP)'], 'Flow of TCP and IP: TCP splits a file into numbered packets, IP addresses and routes each one, and TCP reassembles them in order at the far end');
const vWeb = table(
  ['', 'HTML', 'XML'],
  [
    ['Purpose', 'Display web pages', 'Store and carry data'],
    ['Tags', 'Fixed set, e.g. paragraph and heading tags', 'Made up by the user'],
  ],
  'Comparison table: HTML displays web pages with a fixed set of tags; XML stores and carries data with tags the user defines',
);
const vUrl = flow('LR', ['Protocol: `https`', 'Domain name: `www.lotusbooks.in`', 'Path: `/novels/list.html`'], 'A web address split into three parts: the protocol https, the domain name of an imagined bookshop site ending in dot in, and the path to a page listing novels', 'Protocol → domain name → path (imagined site).');
const vHosting = flow('LR', ['Browser requests a page', 'DNS finds the IP address', 'Web server (hosting) sends the page', 'Browser shows it'], 'Flow of a web visit: the browser requests a page, DNS finds the server\'s IP address, the hosting web server sends the page, and the browser displays it');
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Types', 'PAN, LAN, MAN, WAN by area'],
    ['Topologies', 'Bus cheapest, star robust, tree expandable'],
    ['Campus design', 'Server where most PCs are; repeater on long runs'],
    ['Mail', 'SMTP sends, POP3 downloads'],
    ['Web', 'Browser asks, server sends, DNS finds the address'],
  ],
  'Summary table of Part 2: network types, topologies, campus design rules, mail protocols and web services',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Computer Networks — Part 1: Data Communication, Media and Devices',
  goals: [
    'Trace how networking grew from ARPANET to the Internet',
    'Use data communication terms and calculate transfer time from a data rate',
    'Compare circuit and packet switching and recognise valid IP addresses',
    'Choose transmission media and network devices for a situation',
  ],
  slides: [
    sl('title', 'Computer Networks', {
      b: 'Part 1: how networks began, how data travels, the **media** that carry it and the **devices** that connect it.',
      v: vRoute1,
      n: 'Every time you open a website or send a message, your data crosses many networks in a fraction of a second. In this part we see how networking began, the words used to describe data communication, how to work out how long a transfer takes, and which cables, wireless links and devices make a network work.',
    }),
    sl('concept', 'Why connect computers?', {
      b: 'A **computer network** is a group of computers and devices linked so that they can share data and resources.',
      v: vWhy,
      n: 'A computer network is simply a set of computers and devices linked together so that they can share. One printer can serve a whole staff room, marks entered once can be seen by every teacher, branches can talk by e-mail and video, and files can be backed up on one server instead of being lost with a single laptop.',
    }),
    sl('diagram', 'From ARPANET to the Internet', {
      v: vTimeline,
      n: 'Networking began in nineteen sixty-nine with ARPANET, a defence research project that linked a few university computers. In nineteen eighty-three it adopted TCP and IP, a common set of rules. NSFNET followed in nineteen eighty-six to link researchers to supercomputers. As more networks joined using the same rules, the Internet became a network of networks, and in nineteen eighty-nine the World Wide Web was proposed.',
    }),
    sl('concept', 'Data communication', {
      b: 'Five components: **sender**, **receiver**, **message**, **communication medium** and **protocol** (the agreed rules).',
      v: vComm,
      n: 'Every data communication has five parts. A sender creates the message, a receiver accepts it, and the message itself is the data. It travels over a communication medium, such as a cable or radio waves. Finally, both ends must follow the same protocol, the agreed rules for format and timing, or the receiver cannot make sense of what arrives.',
    }),
    sl('check', 'Quick check: the rules', {
      b: 'What do we call the agreed rules that sender and receiver follow?',
      chk: 'm_protocol_role',
      n: 'Think of the one component that is not a device or a cable, but a set of rules.',
    }),
    sl('concept', 'Bandwidth and data transfer rate', {
      b: '**Bandwidth**: the range of frequencies a channel can carry (in hertz). **Data transfer rate**: how many bits are sent per second (bps).',
      v: vUnits,
      n: 'Two terms are often confused. Bandwidth is the range of frequencies a channel can carry, measured in hertz; more bandwidth allows more data. Data transfer rate is the actual number of bits sent each second, measured in bits per second, kilobits, megabits or gigabits per second. Remember that one byte is eight bits, because file sizes are given in bytes but speeds in bits.',
    }),
    sl('example', 'Worked example 1: how long will it take?', {
      b: 'Time = size in bits ÷ rate in bits per second.',
      bl: ['Step 1 — Convert bytes to bits: multiply by 8.', 'Step 2 — Keep the same prefix (K with K, M with M).', 'Step 3 — Divide by the rate.', 'Step 4 — Write the unit: seconds.'],
      v: vWork1,
      n: `A school uploads a report-card file of ${REPORT.kb} kilobytes over a ${REPORT.rate} kilobit per second link. First change bytes to bits by multiplying by eight, giving ${inr(REPORT_BITS)} kilobits. Then divide by the rate, ${REPORT.rate}, to get ${REPORT_SECS} seconds. The video works the same way: ${VIDEO.mb} megabytes is ${VIDEO.mb * 8} megabits, and at ${VIDEO.rate} megabits per second it takes ${VIDEO_SECS} seconds.`,
    }),
    sl('check', 'Quick check: transfer time', {
      b: 'Try one yourself.',
      chk: 'n_album',
      n: 'Here the size is already in kilobits, so there is no need to multiply by eight. Just divide by the rate.',
    }),
    sl('two-column', 'Circuit switching and packet switching', {
      cols: ['**Circuit switching**\n\nA path is set up and **reserved** from end to end before any data flows, and held until the session ends. Simple and steady, but the line sits idle in pauses.', '**Packet switching**\n\nData is cut into **packets**; each finds its own route over **shared** links and they are reassembled at the end. The Internet works this way.'],
      v: vSwitching,
      n: 'Switching decides how data finds its way through a network. In circuit switching, as in an old landline call, a whole path is reserved before talking starts and stays reserved even during silences. In packet switching, data is cut into small packets that travel separately over shared links and are put back together at the destination, which uses the lines much more efficiently.',
    }),
    sl('concept', 'IP addresses', {
      b: 'An **IP address** is a numeric label that identifies a device on a network so data can be routed to it.',
      v: vIP,
      n: 'Every device on a network needs an address so that data reaches the right place. This is its I P address. The older version four uses thirty-two bits, written as four numbers from zero to two hundred and fifty-five separated by dots. Because these ran short, version six uses one hundred and twenty-eight bits, written in hexadecimal groups separated by colons.',
    }),
    sl('diagram', 'Wired media', {
      v: vWired,
      n: 'Wired media guide the signal along a cable. Twisted pair, the common Ethernet cable, is cheap and flexible but works best over short runs and can pick up electrical noise. Coaxial cable has better shielding and is used for cable television. Optical fibre carries pulses of light, so it is the fastest and is not disturbed by electrical noise, though it costs more.',
    }),
    sl('concept', 'Wireless media', {
      b: 'Unguided media send signals through the air.',
      v: vWireless,
      n: 'Wireless media send signals through the air. Radio waves spread in all directions and pass through walls, which is why Wi-Fi and mobile phones work indoors. Microwaves travel in straight lines, so dish antennas must see each other; they suit long links between towers and satellites. Infrared works only over a short, clear line of sight, like a TV remote.',
    }),
    sl('check', 'Quick check: what flows in a coaxial cable?', {
      b: 'True or false?',
      chk: 'tf_coax',
      n: 'Remember which medium is the only one that carries light.',
    }),
    sl('example', 'Worked example 2: matching a need to a medium', {
      b: 'Ask: how far, how fast, how noisy, does it move, what budget?',
      bl: ['Short and cheap → twisted pair.', 'Electrical noise or very high speed → optical fibre.', 'Moving users indoors → radio waves (Wi-Fi).', 'Long distance with a clear line of sight → microwave.'],
      v: vChoose,
      n: 'Choosing a medium is about the situation. For twenty computers in one room on a small budget, twisted pair is enough. Beside a noisy workshop, fibre avoids interference. Laptops that move around a hostel need Wi-Fi over radio waves. Two towers far apart in open country can use microwave dishes. In the exam, always give the reason with the choice.',
    }),
    sl('diagram', 'Network devices (1)', {
      v: vDevices1,
      n: 'A modem converts digital data into a signal that suits the telephone or cable line, and converts it back at the other end. An Ethernet card, also called a network interface card, connects a computer to a wired network and carries its hardware address. The R J forty-five is the eight-pin plug on the cable, and a Wi-Fi card lets a computer join a wireless network.',
    }),
    sl('two-column', 'Repeater, hub and switch', {
      cols: ['**Repeater**: signals weaken over long cables; a repeater **regenerates** them and passes them on.', '**Hub** sends every frame to **all** ports. **Switch** sends it only to the **destination** port, so there are fewer collisions.'],
      v: vDevices2,
      n: 'A signal weakens as it travels, so on a long cable a repeater regenerates it to full strength. Inside a network, a hub copies every message to every port, which wastes capacity and causes collisions. A switch is smarter: it learns which computer is on which port and sends each message only where it is meant to go.',
    }),
    sl('concept', 'Router and gateway', {
      b: 'A **router** joins different networks and picks the route for each packet. A **gateway** joins networks that follow **different protocols**, translating between them.',
      v: vRouter,
      n: 'A router sits between networks, for example between your school network and the Internet, and decides the best route for each packet using I P addresses. A gateway goes one step further: it connects networks that follow different rules and translates between them, acting as the entry point from one kind of network into another.',
    }),
    sl('check', 'Quick check: joining Wi-Fi', {
      b: 'Which device does this desktop need?',
      chk: 'm_wifi_card',
      n: 'The computer has no way to talk over radio waves yet. Which card gives it one?',
    }),
    sl('summary', 'Summary', {
      v: vSum1,
      n: 'To sum up: networking grew from ARPANET to NSFNET to the Internet. Data communication needs a sender, receiver, message, medium and protocol. Time equals bits divided by the rate. Circuit switching reserves a path; packet switching shares links. Choose media by distance, speed, noise and cost, and remember that a hub broadcasts, a switch targets and a router routes between networks.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Convert **bytes to bits** (× 8) before dividing by a rate.',
        '**Bandwidth** is in hertz; **data transfer rate** is in bps.',
        'Hub vs switch: write "**all ports**" vs "**only the destination port**".',
        'Router = between networks; **gateway** = between networks with different protocols.',
        'For a medium question, give the **reason** (distance, speed, noise, cost), not just the name.',
      ],
      n: 'Common slips: forgetting to change bytes into bits, mixing up bandwidth with data rate, and describing a switch and a hub the same way. One-mark questions test a single fact; two and three-mark questions want a reason with every choice. When you name a medium or a device, always add why it fits the situation.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Computer Networks — Part 2: Types, Topologies, Protocols and the Web',
  goals: [
    'Classify networks as PAN, LAN, MAN or WAN',
    'Compare bus, star and tree topologies',
    'Plan a campus network: server, layout, repeaters and devices',
    'Explain common protocols and web services',
  ],
  slides: [
    sl('title', 'Networks, protocols and the Web', {
      b: 'Part 2: **types** of network, **topologies**, designing a **campus network**, **protocols** and **web services**.',
      v: vRoute2,
      n: 'In this part we classify networks by the area they cover, compare the ways computers can be laid out, and then do what board papers love: design a network for a campus. We finish with the protocols behind e-mail and the web, and the terms you meet every time you open a website.',
    }),
    sl('concept', 'PAN, LAN, MAN and WAN', {
      b: 'Networks are classified by the **area** they cover.',
      v: vTypes,
      n: 'Networks are named by the area they cover. A personal area network links your own devices within a few metres, like a phone and earbuds. A local area network covers a room, building or campus. A metropolitan area network spreads across a city. A wide area network spans countries and continents, and the Internet is the largest wide area network of all.',
    }),
    sl('diagram', 'Bus topology', {
      v: vBus,
      n: 'Topology means the layout of a network. In a bus topology every computer taps into one shared backbone cable, with a terminator at each end to stop signals bouncing back. It needs the least cable and is easy to lay, but if the backbone breaks the whole network stops, and faults are hard to find.',
    }),
    sl('diagram', 'Star topology', {
      v: vStar,
      n: 'In a star topology each computer has its own cable to a central switch or hub. If one cable fails, only that computer is cut off, and faults are easy to trace. Adding a computer just needs one more cable. The weak point is the centre: if the switch fails, the whole star goes down. It also uses more cable than a bus.',
    }),
    sl('diagram', 'Tree topology', {
      v: vTree,
      n: 'A tree topology joins several stars in levels. Each department might have its own hub, and all the hubs connect to a main switch. It grows easily, branch by branch, which suits colleges and large offices. But a fault near the top, such as in the main switch, can cut off a whole branch at once.',
    }),
    sl('check', 'Quick check: the word for layout', {
      b: 'Which term names the arrangement of a network?',
      chk: 'm_topology_meaning',
      n: 'You have just seen three examples of it: bus, star and tree.',
    }),
    sl('two-column', 'Comparing the three topologies', {
      cols: ['**Choose bus** for a small, temporary set-up where cable must be minimal.', '**Choose star** for labs and offices; **choose tree** when departments must be added over time.'],
      v: vTopoCompare,
      n: 'Here the three layouts are side by side. A bus uses the least cable but one break stops everything. A star costs more cable but isolates faults. A tree builds on stars and expands easily. In answers, match the topology to the need described in the question, and always mention the trade-off you are accepting.',
    }),
    sl('example', 'Worked example 3: designing a campus network', {
      b: `${DEMO.name} (imagined) has four blocks. Runs over ${DEMO.limit} m need a repeater.`,
      bl: [
        'Step 1 — Put the **server** where the **most computers** are.',
        'Step 2 — Draw a **star** from the server block (the usual answer).',
        `Step 3 — Compare each run with ${DEMO.limit} m: mark **repeaters**.`,
        'Step 4 — Name the devices: **switch** in each block, **router** for the Internet.',
      ],
      v: vCampus,
      n: `Board papers often give a campus with distances and computer counts. First, place the server in the block with the most computers, here Science with ${DEMO.pcs.Science}, so most traffic stays local. Next, draw a star from Science to each block. Then compare each run with the limit: only the Office link, at ${D.fromServer.Office} metres, is too long, so it needs a repeater.`,
    }),
    sl('example', 'Worked example 3 (continued): the full answer', {
      b: 'Write each part as a short sentence with its reason.',
      v: vDesign,
      n: 'Now set out the complete answer. Server in Science, because it has the most computers. A star layout from Science. A repeater on the Office link, because the run is longer than ninety metres. A switch inside each block to connect its computers. And a router in the server block to link the college to the Internet. Each line carries one mark, so give a reason every time.',
    }),
    sl('check', 'Quick check: growing a tree', {
      b: 'True or false?',
      chk: 'tf_tree_expand',
      n: 'Think about how a new department joins a tree network.',
    }),
    sl('concept', 'Network protocols', {
      b: 'A protocol is a set of rules for one kind of communication.',
      v: vProtocols,
      n: 'Each common task on a network has its own protocol. H T T P and its secure form fetch web pages. F T P moves files. S M T P sends mail and P O P three downloads it. P P P sets up a direct link between two nodes, TELNET gives remote login without encryption, voice over I P carries calls, and TCP and IP handle packets and addresses.',
    }),
    sl('diagram', 'How an e-mail travels', {
      v: vMail,
      n: 'Follow an e-mail. Your mail app hands the message to your mail server using S M T P. Your server relays it, again with S M T P, to the receiver\'s server, where it waits in a mailbox. When the receiver checks mail, their app downloads it using P O P three. So remember: S M T P to send, P O P to fetch.',
    }),
    sl('check', 'Quick check: a call over the Internet', {
      b: 'Which technology carries her voice?',
      chk: 'm_voip',
      n: 'The call travels as data packets over the Internet, not over a telephone circuit.',
    }),
    sl('concept', 'TCP and IP working together', {
      b: '**TCP** splits, numbers, checks and reassembles packets. **IP** addresses and routes each packet.',
      v: vTcp,
      n: 'TCP and IP work as a team. TCP breaks a file into numbered packets, makes sure they all arrive and puts them back in order, asking again for any that are lost. IP stamps each packet with the destination address and routes it across networks. Packets may arrive out of order, and TCP sorts them out.',
    }),
    sl('two-column', 'The Web, HTML and XML', {
      cols: ['The **Internet** is the network of networks. The **World Wide Web** is one service on it: pages linked by hyperlinks, viewed in a browser.', '**HTML** describes how a page is shown, with fixed tags. **XML** stores and carries data, with tags you invent.'],
      v: vWeb,
      n: 'The Internet and the Web are not the same. The Internet is the worldwide network itself; the Web is one service running on it, made of pages linked to one another. Web pages are written in H T M L, which uses a fixed set of tags to show content. X M L is different: it stores and carries data using tags that you make up yourself.',
    }),
    sl('concept', 'Domain names and URLs', {
      b: 'A **URL** gives the full address of a resource: **protocol**, **domain name** and **path**. **DNS** turns a domain name into an IP address.',
      v: vUrl,
      n: 'A web address, or U R L, has parts. The protocol says how to fetch the page, the domain name names the website, and the path points to the file on the server. In a domain name, the last part, such as dot in, is the top-level domain. Because computers route by numbers, the Domain Name System looks up the I P address behind the name.',
    }),
    sl('check', 'Quick check: what HTML is for', {
      b: 'Choose the main use of HTML.',
      chk: 'm_html_purpose',
      n: 'Remember the difference: one language shows pages, the other carries data.',
    }),
    sl('concept', 'Browsers, servers and hosting', {
      b: 'A **web browser** requests and displays pages; a **web server** stores websites and sends pages; **web hosting** is renting space on such a server.',
      v: vHosting,
      n: 'When you visit a site, your browser asks for the page, the Domain Name System finds the server\'s address, and the web server sends the page back for the browser to show. Websites live on servers that stay online day and night. Renting space on such a server so that your site is always reachable is called web hosting.',
    }),
    sl('summary', 'Summary', {
      v: vSum2,
      n: 'In short: networks are PAN, LAN, MAN or WAN by area. Bus is cheapest, star isolates faults and tree expands easily. For a campus, put the server where most computers are, draw a star and add repeaters on long runs. S M T P sends mail and P O P three fetches it, and on the web a browser asks, a server sends and D N S finds the address.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Campus questions: **server → layout → repeater → device → network type**, each with a reason from the table.',
        'Read the distance rule given in the question and compare **every** run with it.',
        '**SMTP** sends, **POP3** downloads; **HTTPS** is encrypted, **TELNET** is not.',
        'Internet ≠ Web; HTML **displays**, XML **carries data**.',
        'In a URL, name the **protocol**, **domain name** and **path**.',
      ],
      n: 'For campus design questions, work in order: server, layout, repeaters, devices and network type, and quote the numbers from the table as your reason. Do not mix up the mail protocols, and remember which protocols are secure. Keep the Internet and the Web separate in your answers, and when you split a web address, name each part correctly.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Computer Networks — notes',
  sections: [
    {
      h: '1. Networks and how they began',
      t: 1,
      b: 'A **computer network** links computers and devices so they can share **resources** (printers, storage), **data** and **communication**.\n\n**Evolution:** **ARPANET** (1969), a US defence research network, linked a few university computers. It adopted **TCP/IP** in **1983**. **NSFNET** (1986) connected researchers to supercomputers and widened the network beyond defence. Networks joining through TCP/IP became the **Internet**, a *network of networks*. The **World Wide Web** was proposed at **CERN** in 1989 and made the Internet easy to use.',
      terms: [['Network', 'Two or more devices linked to share resources and data.'], ['Internet', 'The worldwide network of networks that use TCP/IP.']],
      v: vTimeline,
    },
    {
      h: '2. Data communication terms',
      t: 1,
      b: '**Components:** sender, receiver, message, communication medium, protocol.\n\n- **Bandwidth:** the range of frequencies a channel can carry, in hertz (Hz); it limits how much data can flow.\n- **Data transfer rate:** bits sent per second: **bps, Kbps, Mbps, Gbps**. Remember **1 byte = 8 bits**.\n- **Time to send** = size in bits ÷ rate in bits per second (use the same prefix on both sides, or the conversion the question states).\n- **IP address:** logical address of a device. **IPv4**: 32 bits, four numbers 0–255 (`192.168.1.10`). **IPv6**: 128 bits, hexadecimal groups.\n- **Switching:** **circuit** (path reserved for the whole session, e.g. landline call) vs **packet** (data split into packets routed independently and reassembled, e.g. the Internet).',
      terms: [['Bandwidth', 'Frequency range of a channel, in hertz.'], ['Data transfer rate', 'Number of bits sent per second.'], ['Packet switching', 'Sending data as independently routed packets over shared links.']],
      v: vWork1,
      vs: [vSwitching, vIP],
    },
    {
      h: '3. Transmission media',
      t: 2,
      b: '**Wired (guided):**\n- **Twisted pair** (Ethernet cable, with RJ45 plugs): cheap, flexible, for short runs; picks up noise.\n- **Coaxial:** central copper conductor with shielding; used for cable TV.\n- **Optical fibre:** carries **light**; highest speed, immune to electrical noise, costly.\n\n**Wireless (unguided):**\n- **Radio waves:** omnidirectional, pass through walls (Wi-Fi, mobiles).\n- **Microwaves:** straight line between dishes; long links and satellites.\n- **Infrared:** short range, line of sight only (remotes).',
      terms: [['Guided medium', 'A medium that carries the signal along a physical path such as a cable.'], ['Optical fibre', 'Glass or plastic strands carrying data as pulses of light.']],
      v: vWired,
      vs: [vWireless, vChoose],
    },
    {
      h: '4. Network devices',
      t: 2,
      b: '- **Modem:** modulator–demodulator; digital data ↔ line signal.\n- **Ethernet card (NIC):** connects a computer to a wired LAN; has a unique **MAC address**.\n- **RJ45:** 8-pin connector on twisted-pair cable.\n- **Repeater:** regenerates a weakened signal on a long run.\n- **Hub:** sends every frame to all ports.\n- **Switch:** sends a frame only to the destination port.\n- **Router:** connects different networks and chooses routes using IP addresses.\n- **Gateway:** connects networks with different protocols, translating between them.\n- **Wi-Fi card:** wireless network adapter.',
      terms: [['Switch', 'A device that forwards each frame only to the port of its destination.'], ['Gateway', 'A device joining networks that follow different protocols.']],
      v: vDevices1,
      vs: [vDevices2, vRouter],
    },
    {
      h: '5. Network types, topologies and campus design',
      t: 3,
      b: '**Types by area:** **PAN** (a few metres), **LAN** (building or campus), **MAN** (city), **WAN** (country or more; the Internet).\n\n**Topologies:**\n- **Bus:** one backbone with terminators; least cable; a backbone break stops all.\n- **Star:** each node to a central switch; faults isolated; centre is a single point of failure.\n- **Tree:** stars joined in levels; expands easily; a fault high up cuts a branch.\n\n**Designing a campus network (board pattern):** server in the block with the **most computers**; a **star** from that block; a **repeater** on any run longer than the limit given; a **switch** in each block; a **router** (with a modem) for the Internet; a **WAN** to a distant city office.',
      terms: [['Topology', 'The layout in which nodes of a network are connected.'], ['Repeater placement', 'On every cable run longer than the stated distance limit.']],
      v: vTypes,
      vs: [vBus, vStar, vTree, vCampus],
    },
    {
      h: '6. Protocols and web services',
      t: [4, 5],
      b: '**Protocols:** **HTTP/HTTPS** (web pages; HTTPS encrypted), **FTP** (files), **SMTP** (send mail), **POP3** (download mail), **PPP** (direct link between two nodes), **TELNET** (remote login, unencrypted), **VoIP** (voice over the Internet), **TCP/IP** (TCP: packets and reliability; IP: addressing and routing).\n\n**Web services:** the **WWW** is a service on the Internet made of linked pages. **HTML** displays pages with fixed tags; **XML** stores and carries data with user-defined tags. A **domain name** (e.g. `school.edu.in`, top-level domain `in`) is turned into an IP address by **DNS**. A **URL** = protocol + domain name + path. A **web browser** requests and shows pages; a **web server** stores and sends them; **web hosting** is renting space on an always-on server.',
      terms: [['URL', 'The complete address of a resource on the web.'], ['DNS', 'The system that translates domain names into IP addresses.'], ['Web hosting', 'Renting space on a web server so a site is always reachable.']],
      v: vProtocols,
      vs: [vMail, vUrl, vHosting],
    },
  ],
  tips: '**Common mistakes**\n- Dividing bytes by bits per second without multiplying by 8.\n- Calling a switch a hub: a hub sends to **all** ports.\n- Using "router" when networks follow **different protocols** (that is a **gateway**).\n- Mixing up **SMTP** (send) and **POP3** (download).\n- Treating the Internet and the Web as the same thing.\n\n**How marks are usually awarded**\n- 1 mark: one fact or one correct choice.\n- 2–3 marks: the choice **plus a reason** for each point.\n- 5 marks (campus design): one mark each for server, layout, repeater, device and network type or medium, each justified from the given table.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is a **computer network**?', 'Devices linked to share resources, data and communication.', 'definition', 1],
  ['ARPANET started in?', '**1969**, as a US defence research network.', 'fact', 1],
  ['What did NSFNET (1986) do?', 'Linked universities and researchers to supercomputers, widening the network.', 'fact', 1],
  ['Five components of data communication', 'Sender, receiver, message, medium, protocol.', 'concept', 1],
  ['**Bandwidth** vs **data transfer rate**', 'Bandwidth: frequency range (Hz). Rate: bits per second (bps).', 'concept', 1],
  ['Time to send a file', 'Size in bits ÷ rate in bps; 1 byte = 8 bits.', 'formula', 1],
  ['Circuit vs packet switching', 'Circuit: reserved path. Packet: independent packets over shared links.', 'concept', 1],
  ['IPv4 vs IPv6 size', 'IPv4: 32 bits. IPv6: 128 bits.', 'fact', 1],
  ['Why is fibre immune to electrical noise?', 'It carries **light**, not electrical signals.', 'concept', 2],
  ['Which wireless medium passes through walls?', '**Radio waves** (Wi-Fi, mobile phones).', 'fact', 2],
  ['Microwave links need…', 'A clear **line of sight** between dish antennas.', 'fact', 2],
  ['Infrared example', 'A TV remote: short range, line of sight.', 'example', 2],
  ['Hub vs switch', 'Hub: every port. Switch: only the destination port.', 'concept', 2],
  ['Job of a **repeater**', 'Regenerates a weakened signal on a long cable run.', 'definition', 2],
  ['Router vs gateway', 'Router: between networks. Gateway: between networks with **different protocols**.', 'concept', 2],
  ['What is RJ45?', 'The 8-pin plug on an Ethernet (twisted-pair) cable.', 'fact', 2],
  ['Modem stands for?', 'Modulator–demodulator.', 'fact', 2],
  ['PAN, LAN, MAN, WAN', 'Person, building or campus, city, country or more.', 'concept', 3],
  ['Weakness of a **bus**', 'A backbone break stops the whole network.', 'concept', 3],
  ['Weakness of a **star**', 'If the central switch fails, all nodes are cut off.', 'concept', 3],
  ['Strength of a **tree**', 'Expands easily by adding branches.', 'concept', 3],
  ['Campus question: where does the server go?', 'In the block with the **most computers**.', 'exam-tip', 3],
  ['Campus question: where does a repeater go?', 'On every run longer than the stated limit.', 'exam-tip', 3],
  ['SMTP vs POP3', 'SMTP sends and relays mail; POP3 downloads it.', 'concept', 4],
  ['Why HTTPS for logins?', 'It **encrypts** data between browser and server.', 'concept', 4],
  ['TCP vs IP', 'TCP: packets, order, reliability. IP: addressing and routing.', 'concept', 4],
  ['Internet vs Web', 'Internet: the network. Web: linked pages, a service on it.', 'concept', 5],
  ['HTML vs XML', 'HTML displays pages (fixed tags); XML carries data (own tags).', 'concept', 5],
  ['Parts of a URL', 'Protocol, domain name, path.', 'concept', 5],
  ['What does DNS do?', 'Turns a domain name into an IP address.', 'definition', 5],
  ['What is web hosting?', 'Renting space on an always-on web server.', 'definition', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Computer Networks',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_packet', 'm_fibre', 'm_smtp', 'ar_repeater'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s_switching', 's_browser_server', 's3_topology_choice'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 100 words.', items: [{ attempt: 1, keys: ['l_evolution', 'l_web'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_krishi'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Computer Networks',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_circuit', 'm_ipv4', 'm_switch_hub', 'm_router', 'm_star_fail', 'm_pop3', 'm_https', 'm_dns', 'ar_star_cable', 'ar_tcpip'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s_hub_switch', 's_lan_wan', { attempt: 1, keys: ['s_tcp_ip', 's_hosting'] }, 's3_media_compare', { attempt: 1, keys: ['s3_mail_flow', 's3_url_parts'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_campus', { attempt: 1, keys: ['l_devices', 'l_protocols'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_surya', 'cb_vidya'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-computer-science-ch06 only (evolution and data communication; media and devices; types and topologies; protocols; web services)',
    originality: 'every campus, company, file size and URL is imagined and written by SOYL; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: `figures computed and asserted in questions.mjs: ${REPORT.kb} KB × 8 ÷ ${REPORT.rate} Kbps = ${REPORT_SECS} s; ${VIDEO.mb} MB × 8 ÷ ${VIDEO.rate} Mbps = ${VIDEO_SECS} s; 9,000 ÷ 1.5 = 6,000 bps; 3 × 1024 = 3,072 Kbps; 1,800 ÷ 60 = 30 s; campus server = block with most computers, repeaters = runs from the server over the stated limit`,
    facts: 'ARPANET 1969, TCP/IP adopted 1983, NSFNET 1986, Web proposed at CERN 1989; IPv4 32 bits, IPv6 128 bits; no current statistics',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration, answer-leak and stem-duplicate checks run clean in this build',
  },
});
