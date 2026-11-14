// Build CBSE 11 Computer Science ch01 Computer Systems and Organisation. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-11-computer-science-ch01/src/build.mjs
// Every truth table, conversion, memory-unit figure and encoding byte comes from the Python 3 program in
// questions.mjs (recorded in src/py-cache.json) or from JavaScript that is asserted against it; nothing is typed by hand.
// Memory-unit convention: 1 KB = 1024 bytes, 1 MB = 1024 KB, 1 GB = 1024 MB (the CBSE syllabus convention).
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, setAuthor, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-11-computer-science-ch01', 'computer-science');
setAuthor('claude-sonnet-5-5 (writer; reviewed by the subject-producer)');
usePyCache(SRC);
const { P, T, val, ones, tmd, bin, oct, hex, bitsLine } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const ic = (s) => '`' + s + '`';
const inr = (n) => n.toLocaleString('en-IN');
const pr = (e) => pyOut(`print(${e})`);

// ---------------------------------------------------------------- Boolean laws, verified for every input
const N = (a) => 1 - a, AND = (a, b) => a & b, OR = (a, b) => a | b;
const LAWS = [
  ['Identity', 'A AND 1 = A;  A OR 0 = A', (a) => AND(a, 1) === a && OR(a, 0) === a],
  ['Null', 'A AND 0 = 0;  A OR 1 = 1', (a) => AND(a, 0) === 0 && OR(a, 1) === 1],
  ['Idempotent', 'A AND A = A;  A OR A = A', (a) => AND(a, a) === a && OR(a, a) === a],
  ['Complement', 'A AND NOT A = 0;  A OR NOT A = 1', (a) => AND(a, N(a)) === 0 && OR(a, N(a)) === 1],
  ['Involution', 'NOT (NOT A) = A', (a) => N(N(a)) === a],
  ['Commutative', 'A AND B = B AND A;  A OR B = B OR A', (a, b) => AND(a, b) === AND(b, a) && OR(a, b) === OR(b, a)],
  ['Associative', '(A AND B) AND C = A AND (B AND C);  likewise for OR', (a, b, c) => AND(AND(a, b), c) === AND(a, AND(b, c)) && OR(OR(a, b), c) === OR(a, OR(b, c))],
  ['Distributive', 'A AND (B OR C) = (A AND B) OR (A AND C);  A OR (B AND C) = (A OR B) AND (A OR C)', (a, b, c) => AND(a, OR(b, c)) === OR(AND(a, b), AND(a, c)) && OR(a, AND(b, c)) === AND(OR(a, b), OR(a, c))],
  ['Absorption', 'A OR (A AND B) = A;  A AND (A OR B) = A', (a, b) => OR(a, AND(a, b)) === a && AND(a, OR(a, b)) === a],
  ['De Morgan', 'NOT (A AND B) = (NOT A) OR (NOT B);  NOT (A OR B) = (NOT A) AND (NOT B)', (a, b) => N(AND(a, b)) === OR(N(a), N(b)) && N(OR(a, b)) === AND(N(a), N(b))],
];
for (const [name, , f] of LAWS) for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) assert.ok(f(a, b, c), `law ${name} fails at ${a}${b}${c}`);

// ---------------------------------------------------------------- SVG figures
/** A labelled box centred at (x, y). */
function box(s, x, y, label, o = {}) {
  const w = o.w ?? 64, h = o.h ?? 28;
  s.rect(x - w / 2, y - h / 2, w, h, { color: o.color, fill: o.fill ?? 'fill', sw: 1.6, rx: 6 });
  s.text(x, y - (o.sub ? 6 : 0), label, { size: o.size ?? 13, bold: o.bold });
  if (o.sub) s.text(x, y + 9, o.sub, { size: 11, muted: true });
}
const dbl = (s, x1, y1, x2, y2) => { s.line(x1, y1, x2, y2, { sw: 1.6 }); s.head(x2, y2, x2 - x1, y2 - y1); s.head(x1, y1, x1 - x2, y1 - y2); };
const circ = (s, cx, cy, r = 5) => s.path(`M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`, { sw: 2, fill: 'fill' });
/** Draws a logic gate with its left edge at x and centre line at y; returns the input pin points and the output point. */
function gate(s, kind, x, y) {
  const body = { sw: 2, fill: 'fill' };
  let ins, ox, pinX = x;
  if (kind === 'NOT') {
    s.path(`M ${x} ${y - 16} L ${x} ${y + 16} L ${x + 36} ${y} Z`, body);
    circ(s, x + 41, y);
    ins = [y];
    ox = x + 46;
  } else {
    if (kind === 'AND' || kind === 'NAND') {
      s.path(`M ${x} ${y - 20} H ${x + 30} A 20 20 0 0 1 ${x + 30} ${y + 20} H ${x} Z`, body);
      ox = x + 50;
    } else {
      s.path(`M ${x} ${y - 20} Q ${x + 36} ${y - 20} ${x + 56} ${y} Q ${x + 36} ${y + 20} ${x} ${y + 20} Q ${x + 14} ${y} ${x} ${y - 20} Z`, body);
      ox = x + 56;
      pinX = x + 5;
      if (kind === 'XOR') {
        s.path(`M ${x - 8} ${y - 20} Q ${x + 6} ${y} ${x - 8} ${y + 20}`, { sw: 2 });
        pinX = x - 3;
      }
    }
    if (kind === 'NAND' || kind === 'NOR') { circ(s, ox + 5, y); ox += 10; }
    ins = [y - 10, y + 10];
  }
  ins.forEach((iy) => s.line(x - 22, iy, pinX, iy, { sw: 1.6 }));
  s.line(ox, y, ox + 18, y, { sw: 1.6 });
  return { ins: ins.map((iy) => [x - 22, iy]), out: [ox + 18, y] };
}

const vGates = (() => {
  const s = new Svg(560, 210);
  const g = [['NOT', 55, 50], ['AND', 245, 50], ['OR', 435, 50], ['NAND', 55, 150], ['NOR', 245, 150], ['XOR', 435, 150]];
  g.forEach(([k, x, y]) => { gate(s, k, x, y); s.text(x + 30, y + 36, k, { bold: true, size: 14 }); });
  return s.visual('Standard symbols of the six logic gates: NOT is a triangle with a small circle, AND has a flat back and a round front, OR has a curved back and a pointed front, NAND and NOR are AND and OR with a small circle at the output, and XOR is OR with an extra curve at the input side', 'Gate symbols: a small circle on the output means NOT.');
})();

const vCircuit = (() => {
  const s = new Svg(440, 200);
  s.text(12, 55, 'A', { bold: true }); s.text(12, 75, 'B', { bold: true }); s.text(12, 150, 'C', { bold: true });
  s.line(24, 55, 88, 55, { sw: 1.6 }); s.line(24, 75, 88, 75, { sw: 1.6 }); s.line(24, 150, 88, 150, { sw: 1.6 });
  const and = gate(s, 'AND', 110, 65);
  const not = gate(s, 'NOT', 110, 150);
  const or = gate(s, 'OR', 270, 105);
  s.polyline([and.out, [214, 65], [214, 95], or.ins[0]], { sw: 1.6 });
  s.polyline([not.out, [214, 150], [214, 115], or.ins[1]], { sw: 1.6 });
  s.arrow(or.out[0], or.out[1], or.out[0] + 36, or.out[1], { sw: 1.6 });
  s.text(or.out[0] + 50, or.out[1], 'F', { bold: true });
  s.text(150, 36, 'A AND B', { size: 12, muted: true });
  s.text(150, 182, 'NOT C', { size: 12, muted: true });
  return s.visual('Logic circuit for F equals (A AND B) OR (NOT C): inputs A and B feed an AND gate, input C feeds a NOT gate, and the outputs of the AND gate and the NOT gate feed an OR gate whose output is F', 'F = (A AND B) OR (NOT C).');
})();

const vOrg = (() => {
  const s = new Svg(560, 250);
  box(s, 70, 60, 'Input devices', { w: 110, h: 34 });
  s.arrow(125, 60, 170, 60, { sw: 1.6 });
  s.rect(170, 20, 200, 170, { fill: 'fill', sw: 2, rx: 10 });
  s.text(270, 36, 'CPU', { bold: true, size: 15 });
  box(s, 270, 78, 'Control unit', { w: 130, h: 30, fill: 'accent', bold: true });
  box(s, 220, 130, 'ALU', { w: 80, h: 30, fill: 'accent', bold: true });
  box(s, 320, 130, 'Registers', { w: 80, h: 30, fill: 'accent', bold: true });
  box(s, 70, 160, 'Output devices', { w: 110, h: 34 });
  s.arrow(170, 160, 125, 160, { sw: 1.6 });
  box(s, 490, 70, 'Primary memory', { w: 120, h: 44, sub: 'RAM, ROM, cache' });
  dbl(s, 370, 70, 430, 70);
  box(s, 490, 190, 'Secondary storage', { w: 120, h: 44, sub: 'SSD, hard disk', size: 12 });
  dbl(s, 490, 92, 490, 168);
  s.text(270, 215, 'Data and instructions move between memory and the CPU', { size: 12, muted: true });
  return s.visual('Block diagram of a computer: input devices send data into the CPU, which contains the control unit, the arithmetic logic unit and registers; the CPU sends results to output devices and exchanges data both ways with primary memory, which in turn exchanges data with secondary storage', 'Input, CPU, memory and output.');
})();

const vHier = (() => {
  const s = new Svg(560, 230);
  const rows = [['CPU registers', 140], ['Cache', 220], ['RAM (primary memory)', 300], ['Secondary: SSD, hard disk', 380]];
  rows.forEach(([label, w], i) => {
    s.rect(220 - w / 2, 20 + i * 50, w, 40, { fill: i === 0 ? 'accent' : 'fill', sw: 1.6, rx: 6 });
    s.text(220, 40 + i * 50, label, { size: 13, bold: i === 0 });
  });
  s.arrow(450, 200, 450, 40, { sw: 1.6 });
  s.text(500, 28, 'Faster', { size: 12, bold: true });
  s.text(500, 44, 'Costlier per byte', { size: 12 });
  s.text(500, 196, 'Larger, cheaper,', { size: 12 });
  s.text(500, 212, 'permanent', { size: 12 });
  return s.visual('Memory hierarchy drawn as four bars that grow wider downwards: CPU registers, cache, RAM and secondary storage; speed and cost per byte rise towards the top, while size and permanence rise towards the bottom', 'Wider bars hold more but are slower.');
})();

// ---------------------------------------------------------------- tables and flows (data from the computed facts)
const vRoute1 = flow('LR', ['The computer system', 'The CPU', 'Memory and its units', 'Types of software', 'Language translators', 'The operating system'], 'Route map of Part 1: the computer system, the CPU, memory and its units, types of software, language translators and the operating system', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Logic gates', 'Truth tables', 'Boolean laws', 'Number systems', 'Conversions', 'Encodings'], 'Route map of Part 2: logic gates, truth tables, Boolean laws and De Morgan, number systems, conversions, and character encodings', 'Part 2 at a glance');
const vIPO = flow('LR', ['Input: data and instructions', 'Process: the CPU works on them', 'Output: results', 'Storage: kept for later'], 'Flow of the input, process, output and storage cycle: data and instructions go in, the CPU processes them, results come out, and data can be stored for later', 'A computer takes in, works on, shows and keeps data.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n2', to: 'n4' },
]);
const vCPU = table(
  ['Part', 'Job', 'Think of it as'],
  [
    ['Arithmetic logic unit (ALU)', 'Adds, subtracts, compares, and performs AND, OR, NOT', 'The calculator'],
    ['Control unit (CU)', 'Fetches an instruction, decodes it, directs the other parts', 'The manager'],
    ['Registers', 'Tiny, very fast stores for the values being used right now', 'The hands holding the work'],
  ],
  'Table of the CPU parts: the ALU does arithmetic and logic, the control unit fetches, decodes and directs, and registers hold the values in use',
);
const vMemTypes = table(
  ['Memory', 'Volatile?', 'Job', 'Example'],
  [
    ['Cache', 'Yes', 'Keeps recently used data next to the CPU', 'Inside the processor chip'],
    ['RAM', 'Yes', 'Holds programs and data that are running', 'The memory sticks'],
    ['ROM', 'No', 'Holds start-up (boot) instructions; normally only read', 'Firmware chip'],
    ['Secondary storage', 'No', 'Keeps files and programs permanently', 'SSD, hard disk, pen drive'],
  ],
  'Table of memory types: cache and RAM are volatile and hold data in use, ROM and secondary storage are non-volatile and hold start-up instructions and files',
);
const vUnits = table(
  ['Unit', 'Size', 'In bytes'],
  [
    ['Bit', 'A single 0 or 1', '1/8'],
    ['Nibble', '4 bits', '1/2'],
    ...P.units.map(([u, n]) => [u === 'byte' ? 'Byte' : u, u === 'byte' ? '8 bits' : u === 'KB' ? '1024 bytes' : `1024 ${P.units[P.units.findIndex((x) => x[0] === u) - 1][0]}`, inr(n)]),
  ],
  'Table of memory units: a bit is one binary digit, a nibble is 4 bits, a byte is 8 bits, and each of KB, MB, GB, TB and PB is 1024 times the one before it',
  'Convention used here: 1 KB = 1024 bytes.',
);
const vWork1 = table(
  ['Question', 'Working', 'Answer'],
  [
    ['3 GB in MB', '3 × 1024', inr(P.mem.gb3_mb)],
    ['3 GB in KB', '3 × 1024 × 1024', inr(P.mem.gb3_kb)],
    ['20480 KB in MB', '20480 ÷ 1024', `${P.mem.kb20480_mb}`],
    ['4 MB songs on an 8 GB card', '8 × 1024 ÷ 4', inr(P.mem.songs)],
  ],
  `Worked example table of memory conversions: 3 GB is ${P.mem.gb3_mb} MB and ${P.mem.gb3_kb} KB, 20480 KB is ${P.mem.kb20480_mb} MB, and an 8 GB card holds ${P.mem.songs} songs of 4 MB each`,
  'Larger unit to smaller: multiply. Smaller to larger: divide.',
);
const vSoftware = table(
  ['Type', 'What it does', 'Examples'],
  [
    ['System software', 'Controls the hardware and runs other software', 'Operating system, device drivers'],
    ['Utility software', 'Maintains, protects and tunes the computer', 'Antivirus, backup, file compression, disk clean-up'],
    ['Application software', 'Helps users do a task', 'Word processor, spreadsheet, a school fee program'],
    ['Language translators', 'Convert programs into machine code', 'Assembler, compiler, interpreter'],
  ],
  'Table of software types: system software controls hardware, utility software maintains and protects, application software helps users with tasks, and language translators convert programs into machine code',
);
const vTranslators = table(
  ['Translator', 'Translates', 'How', 'Errors'],
  [
    ['Assembler', 'Assembly language', 'Each mnemonic to machine code', 'Reported while assembling'],
    ['Compiler', 'High-level language', 'Whole program at once; makes a separate executable', 'Listed together before running'],
    ['Interpreter', 'High-level language', 'One statement at a time, then runs it', 'Stops at the first error'],
  ],
  'Table of language translators: an assembler converts assembly language, a compiler converts a whole high-level program into an executable, and an interpreter translates and runs one statement at a time and stops at the first error',
);
const vOS = table(
  ['Function', 'What it does', 'Everyday example'],
  [
    ['Process management', 'Shares the CPU between programs', 'Music plays while you edit a document'],
    ['Memory management', 'Gives RAM to programs and takes it back', 'Closing an app frees its memory'],
    ['File management', 'Organises files in folders', 'Rename, move, delete a file'],
    ['Device management', 'Controls hardware through drivers', 'Sending a page to the printer'],
    ['Security and user interface', 'Passwords, permissions, the screen you use', 'Login screen, icons and windows'],
  ],
  'Table of operating system functions: process management shares the CPU, memory management allocates RAM, file management organises files, device management controls hardware through drivers, and security and the user interface protect and present the system',
);
const vWhich = table(
  ['Task', 'Kind of software', 'Why'],
  [
    ['Typing a letter in a word processor', 'Application software', 'Helps a user do a task'],
    ['Zipping a folder to make it smaller', 'Utility software', 'Maintains and tunes files'],
    ['A printer driver', 'System software', 'Lets the OS control one device'],
    ['An assembler', 'Language translator', 'Converts assembly code to machine code'],
  ],
  'Worked example table: a word processor is application software, a file-zipping tool is utility software, a printer driver is system software, and an assembler is a language translator',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['CPU', 'ALU calculates, CU directs, registers hold values'],
    ['Memory', 'Cache and RAM are volatile; ROM and secondary storage are not'],
    ['Units', '1 KB = 1024 bytes; each unit is 1024 times the one before; 1 byte = 8 bits'],
    ['Software', 'System, utility, application; translators convert programs'],
    ['OS', 'Process, memory, file and device management, security and user interface'],
  ],
  'Summary table of Part 1: the CPU, memory types, memory units, software types and operating system functions',
);

const gateRows = (names) => T.and.rows.map((r, i) => [`${r[0]}`, `${r[1]}`, ...names.map((n) => `${T[n].rows[i].at(-1)}`)]);
const vTruth = table(
  ['A', 'B', 'A AND B', 'A OR B', 'A NAND B', 'A NOR B', 'A XOR B'],
  gateRows(['and', 'or', 'nand', 'nor', 'xor']),
  `Truth table of the five two-input gates: AND gives ${T.and.rows.map((r) => r.at(-1)).join('')}, OR gives ${T.or.rows.map((r) => r.at(-1)).join('')}, NAND gives ${T.nand.rows.map((r) => r.at(-1)).join('')}, NOR gives ${T.nor.rows.map((r) => r.at(-1)).join('')} and XOR gives ${T.xor.rows.map((r) => r.at(-1)).join('')} for the inputs 00, 01, 10 and 11`,
  `NOT: ${ic('0')} gives ${val('not', 0)}, ${ic('1')} gives ${val('not', 1)}.`,
);
const vWE1 = table(
  ['A', 'B', 'C', 'A AND B', 'NOT C', 'F'],
  T.e1.rows.map(([a, b, c, f]) => [a, b, c, val('and', a, b), val('not', c), f].map(String)),
  `Worked example truth table of F equals (A AND B) OR (NOT C) with eight rows; F is 1 in ${ones('e1')} of them`,
  `F is 1 in ${ones('e1')} of the 8 rows.`,
);
const vLaws = table(['Law', 'Statement'], LAWS.map(([n, s]) => [n, s]), 'Table of Boolean laws: identity, null, idempotent, complement, involution, commutative, associative, distributive, absorption and De Morgan', 'Some books write AND as a dot, OR as a plus and NOT as a bar or dash; this chapter uses the words.');
const vDM = table(
  ['A', 'B', 'NOT (A OR B)', '(NOT A) AND (NOT B)', 'NOT (A AND B)', '(NOT A) OR (NOT B)'],
  T.dm1l.rows.map((r, i) => [r[0], r[1], r.at(-1), T.dm1r.rows[i].at(-1), T.dm2l.rows[i].at(-1), T.dm2r.rows[i].at(-1)].map(String)),
  `Truth table verifying De Morgan's laws: NOT (A OR B) matches (NOT A) AND (NOT B) with ${T.dm1l.rows.map((r) => r.at(-1)).join('')}, and NOT (A AND B) matches (NOT A) OR (NOT B) with ${T.dm2l.rows.map((r) => r.at(-1)).join('')}`,
  'Equal columns prove each law.',
);
const vWE2 = table(
  ['Step', 'Expression', 'Law'],
  [
    ['1', '(A AND B) OR (A AND NOT B)', 'Given'],
    ['2', 'A AND (B OR NOT B)', 'Distributive'],
    ['3', 'A AND 1', 'Complement'],
    ['4', 'A', 'Identity'],
  ],
  `Worked example: (A AND B) OR (A AND NOT B) simplifies in four steps by the distributive, complement and identity laws to A; its truth table output ${T.wes.rows.map((r) => r.at(-1)).join('')} matches A`,
  `A truth table agrees: the output column ${T.wes.rows.map((r) => r.at(-1)).join('')} is the A column.`,
);
const sysRows = [
  ['Binary', '2', '0, 1', '1101'],
  ['Octal', '8', '0 to 7', '325'],
  ['Decimal', '10', '0 to 9', '213'],
  ['Hexadecimal', '16', '0 to 9, A to F', 'D5'],
];
assert.equal(parseInt('1101', 2), 13);
assert.equal(parseInt('D5', 16), parseInt('325', 8));
assert.equal(parseInt('325', 8), 213);
const vSystems = table(
  ['Decimal', 'Binary', 'Octal', 'Hex'],
  [...Array(16).keys()].map((n) => [`${n}`, bin(n).padStart(4, '0'), oct(n), hex(n)]),
  'Table of the numbers 0 to 15 in decimal, 4-bit binary, octal and hexadecimal; the hexadecimal digits A to F stand for 10 to 15',
  'Hex digits: A=10, B=11, C=12, D=13, E=14, F=15.',
);
// Repeated division of 45 by 2, produced here and checked against Python.
const divSteps = [];
for (let n = 45; n > 0; n = Math.floor(n / 2)) divSteps.push([`${n} ÷ 2`, `${Math.floor(n / 2)}`, `${n % 2}`]);
assert.equal(divSteps.map((r) => r[2]).reverse().join(''), P.d2['45'][0]);
const vDiv = table(['Division', 'Quotient', 'Remainder'], divSteps, `Worked example: repeated division of 45 by 2 gives remainders that read upward as ${P.d2['45'][0]}`, `Read the remainders from the bottom up: ${P.d2['45'][0]}.`);
const group = (s, k) => s.padStart(Math.ceil(s.length / k) * k, '0').match(new RegExp(`.{${k}}`, 'g'));
const G = '1011100110';
assert.equal(group(G, 3).map((g) => parseInt(g, 2)).join(''), P.b2oh[G][0]);
assert.equal(group(G, 4).map((g) => parseInt(g, 2).toString(16).toUpperCase()).join(''), P.b2oh[G][1]);
assert.equal(group('3AF'.split('').map((h) => parseInt(h, 16).toString(2).padStart(4, '0')).join(''), 4).join(' '), '0011 1010 1111');
const vGroup = table(
  ['Task', 'Working', 'Result'],
  [
    [`Binary ${G} to octal`, `Groups of 3 from the right: ${group(G, 3).join(' ')}`, P.b2oh[G][0]],
    [`Binary ${G} to hexadecimal`, `Groups of 4 from the right: ${group(G, 4).join(' ')}`, P.b2oh[G][1]],
    ['Hexadecimal 3AF to binary', 'Each digit to 4 bits: 0011 1010 1111', P.h2b['3AF']],
    [`Binary 110101 to decimal`, '32 + 16 + 4 + 1', `${P.b2d['110101']}`],
  ],
  `Worked example table: binary ${G} is octal ${P.b2oh[G][0]} and hexadecimal ${P.b2oh[G][1]}; hexadecimal 3AF is binary ${P.h2b['3AF']}; binary 110101 is decimal ${P.b2d['110101']}`,
  'Pad with leading zeros to complete the first group.',
);
const f1375 = P.frac['13.75'];
assert.equal(f1375.text, '1101.11');
const vFrac = table(
  ['Step', 'Working', 'Bit'],
  [
    ['Whole part 13', 'Repeated division: 13 gives', f1375.whole],
    ...f1375.steps.map(([f, p, b]) => [`Fraction ${f}`, `${f} × 2 = ${p}`, `${b}`]),
    ['Result', `13.75 in binary`, f1375.text],
    ['Back to decimal', `Binary 110.011 = 4 + 2 + 0.25 + 0.125`, `${P.bf['110.011']}`],
  ],
  `Worked example: 13.75 is 1101 for the whole part, and multiplying 0.75 by 2 repeatedly gives the bits 1 and 1, so the binary number is ${f1375.text}; binary 110.011 is ${P.bf['110.011']} in decimal`,
  'Whole part: divide by 2. Fraction part: multiply by 2.',
);
assert.equal(P.bf['110.011'], 6.375);
const vASCII = table(
  ['Scheme', 'Bits', 'Codes', 'Covers'],
  [
    ['ASCII', '7', `${P.pow2['7']}`, 'English letters, digits, punctuation, control codes'],
    ['Extended ASCII', '8', `${P.pow2['8']}`, 'ASCII plus 128 extra symbols'],
    ['ISCII', '8', `${P.pow2['8']}`, 'ASCII in the lower half; Indian scripts in the upper half'],
    ['Unicode', 'Up to 21', inr(P.uni_total), 'Every script, symbol and emoji'],
  ],
  `Table comparing ASCII with 7 bits and ${P.pow2['7']} codes, extended ASCII and ISCII with 8 bits and ${P.pow2['8']} codes, and Unicode with ${P.uni_total} possible code points covering every script`,
  'Unicode includes ASCII unchanged as its first 128 code points.',
);
assert.equal(P.uni_total, 1114112);
const vUTF = table(
  ['Code points', 'UTF-8 bytes', 'Example'],
  [
    ['U+0000 to U+007F', `${P.bounds[0][1]}`, `A (${P.enc.A.utf8})`],
    ['U+0080 to U+07FF', `${P.bounds[1][1]}`, `é (${P.enc['é'].utf8})`],
    ['U+0800 to U+FFFF', `${P.bounds[3][1]}`, `₹ (${P.enc['₹'].utf8})`],
    ['U+10000 to U+10FFFF', `${P.bounds[5][1]}`, `emoji (${P.enc['😀'].utf8})`],
  ],
  'Table of UTF-8 lengths: code points up to U+007F take 1 byte, up to U+07FF take 2 bytes, up to U+FFFF take 3 bytes, and above that 4 bytes; UTF-32 always uses 4 bytes',
  'UTF-32 always uses 4 bytes per character.',
);
const vEnc = table(
  ['Character', 'Code point', 'UTF-8 (hex)', 'Bytes', 'UTF-32 (hex)'],
  ['A', 'é', 'क', '₹', '😀'].map((c) => [c === '😀' ? 'Emoji' : c, P.enc[c].cp, P.enc[c].utf8, `${P.enc[c].utf8n}`, P.enc[c].utf32]),
  'Table of real characters with their Unicode code point, UTF-8 bytes in hexadecimal, byte count, and 4-byte UTF-32 code; A takes 1 byte, é takes 2, the Devanagari letter ka takes 3, the rupee sign takes 3 and an emoji takes 4 bytes in UTF-8',
  'Computed with Python: ' + ic("ch.encode('utf-8')") + '.',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Gates', 'AND all 1; OR any 1; NOT inverts; NAND, NOR invert AND, OR; XOR needs inputs to differ'],
    ['Truth table', '2 to the power of the inputs rows; evaluate NOT, then AND, then OR'],
    ['Laws', 'De Morgan: change AND to OR (or back) and complement each term'],
    ['Conversions', 'Divide for whole parts, multiply for fractions, group bits in 3s or 4s'],
    ['Encodings', 'ASCII 7 bits, ISCII 8 bits, Unicode one code point each; UTF-8 1 to 4 bytes, UTF-32 4 bytes'],
  ],
  'Summary table of Part 2: gates, truth tables, Boolean laws, number conversions and character encodings',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Computer Systems — Part 1: Organisation, Memory and Software',
  goals: [
    'Describe the components of a computer system and the parts of the CPU',
    'Compare cache, RAM, ROM and secondary memory, and convert between memory units',
    'Classify software as system, utility or application, and tell translators apart',
    'State the main functions of an operating system',
  ],
  slides: [
    sl('title', 'Computer Systems and Organisation', {
      b: 'Part 1: how a computer is organised, how memory is measured and what kinds of software run on it.',
      v: vRoute1,
      n: 'Every phone, laptop and ATM is a computer system. In this part we open it up. We look at the CPU, the memories that feed it, how memory is measured in bytes, and the different kinds of software that make the hardware useful, including the operating system that manages it all.',
    }),
    sl('concept', 'A machine that takes in, works on and keeps data', {
      b: 'A **computer** accepts **input**, **processes** it by following instructions, produces **output**, and can **store** data for later.',
      v: vIPO,
      n: 'At its simplest, a computer is a machine with four jobs. It takes in data and instructions, processes them using the CPU, produces results, and can store both data and results for later. Keyboards, scanners and microphones are input; screens and printers are output; the CPU in the middle does the work.',
    }),
    sl('diagram', 'Block diagram of a computer', {
      v: vOrg,
      n: 'Here is the whole system at a glance. Input devices send data into the CPU. The CPU contains the control unit, the A L U and registers. It exchanges data with primary memory, which in turn is backed by secondary storage. Results go out to output devices. Notice that the CPU talks to memory in both directions.',
    }),
    sl('concept', 'Inside the CPU', {
      b: 'The **CPU** is the brain of the computer; its three working parts cooperate on every instruction.',
      v: vCPU,
      n: 'The C P U has three working parts. The arithmetic logic unit, or A L U, performs calculations and logical comparisons. The control unit fetches each instruction from memory, decodes it and tells the other parts what to do. Registers are tiny, very fast stores that hold the values being worked on at this moment.',
    }),
    sl('check', 'Quick check: who directs the work?', {
      b: 'Which unit fetches and decodes instructions?',
      chk: 'm_cu',
      n: 'Think about which part acts like the manager, not the calculator.',
    }),
    sl('diagram', 'The memory hierarchy', {
      v: vHier,
      n: 'Memory comes in levels. At the top, registers are the fastest and the smallest. Cache comes next, then RAM, and at the bottom secondary storage, the slowest but the largest and cheapest per byte. A computer uses all four together, so that speed is available where it matters and capacity is available where it is needed.',
    }),
    sl('concept', 'Primary and secondary memory', {
      b: '**Volatile** memory loses its contents when power is off; **non-volatile** memory keeps them.',
      v: vMemTypes,
      n: 'Cache and RAM are volatile. They hold what is running right now and are wiped when the power goes. ROM is non-volatile and holds the start-up instructions that boot the computer. Secondary storage such as an S S D or hard disk is also non-volatile and keeps your files. This is why unsaved work is lost in a power cut.',
    }),
    sl('concept', 'Measuring memory', {
      b: 'A **bit** is one binary digit; a **byte** is 8 bits. In this chapter **1 KB = 1024 bytes** and each larger unit is 1024 times the previous one.',
      v: vUnits,
      n: 'The smallest unit is the bit, a single zero or one. Four bits make a nibble and eight bits make a byte. A kilobyte is 1024 bytes, and every larger unit, megabyte, gigabyte, terabyte and petabyte, is 1024 times the one before it. We use 1024 throughout this chapter, as the syllabus does.',
    }),
    sl('example', 'Worked example 1: converting units', {
      b: 'Larger unit to smaller: **multiply** by 1024. Smaller to larger: **divide** by 1024.',
      bl: ['Step 1 — Decide which way you are going.', 'Step 2 — Multiply or divide by 1024 once for each step.', 'Step 3 — For a count of items, divide the total space by the size of one item.'],
      v: vWork1,
      n: `Going from a larger unit to a smaller one means multiplying. Three gigabytes is three times 1024, or ${P.mem.gb3_mb} megabytes, and multiplying by 1024 again gives ${P.mem.gb3_kb} kilobytes. Going the other way, divide: ${P.mem.kb20480_mb * 1024} kilobytes is ${P.mem.kb20480_mb} megabytes. An eight gigabyte card holds ${P.mem.songs} songs of four megabytes each.`,
    }),
    sl('check', 'Quick check: megabytes to kilobytes', {
      b: 'Try one yourself.',
      chk: 'm_kb',
      n: 'Remember to multiply when you move to a smaller unit, and use 1024 for each step.',
    }),
    sl('concept', 'Types of software', {
      b: '**Software** is the set of programs that makes the hardware useful. There are three broad types, plus the translators that convert programs.',
      v: vSoftware,
      n: 'Software falls into three types. System software controls the hardware and runs other software; the operating system and device drivers belong here. Utility software maintains and protects the computer, for example an antivirus or a file compression tool. Application software helps users with tasks such as writing or accounting. Language translators convert programs into machine code.',
    }),
    sl('concept', 'Language translators', {
      b: 'A computer understands only **machine code**. Translators convert human-readable programs into it.',
      v: vTranslators,
      n: 'A computer can run only machine code, so programs written by people must be translated. An assembler converts assembly language. A compiler translates a whole high-level program at once and lists all its errors together. An interpreter translates and runs one statement at a time, so it stops at the first error it meets.',
    }),
    sl('check', 'Quick check: compiler or interpreter?', {
      b: 'True or false?',
      chk: 'tf_compiler',
      n: 'Think about which translator works on the whole program before anything runs.',
    }),
    sl('concept', 'Functions of an operating system', {
      b: 'The **operating system (OS)** manages the hardware and gives programs a base to run on.',
      v: vOS,
      n: 'The operating system is the manager of the computer. It shares the CPU among running programs, which is process management. It allocates and recovers RAM, organises files in folders, and controls devices through drivers. It also provides security through passwords and permissions, and the screen you interact with, called the user interface.',
    }),
    sl('example', 'Worked example 2: which kind of software?', {
      b: 'Ask: does it **run the machine**, **look after the machine**, **do a user task**, or **translate code**?',
      bl: ['Step 1 — Read what the program does.', 'Step 2 — Match it to a type.', 'Step 3 — Say why in one phrase.'],
      v: vWhich,
      n: 'To classify software, ask what it does. A word processor helps a person do a task, so it is application software. A tool that zips a folder tunes and maintains files, so it is a utility. A printer driver lets the operating system control one device, so it is system software. An assembler converts assembly code to machine code, so it is a translator.',
    }),
    sl('check', 'Quick check: match the software', {
      b: 'Match each item with its kind of software.',
      chk: 'match_sw',
      n: 'Use the same questions: does it run, maintain, serve one customer or translate?',
    }),
    sl('summary', 'Summary', {
      v: vSum1,
      n: 'To sum up. The ALU calculates, the control unit directs and registers hold values. Cache and RAM are volatile, ROM and secondary storage are not. One kilobyte is 1024 bytes and each unit is 1024 times the one before. Software is system, utility or application, with translators in between, and the operating system manages processes, memory, files and devices.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'For unit questions, write the step: **multiply** going down, **divide** going up, with **1024** each time.',
        'Say **volatile** or **non-volatile** whenever you compare memories.',
        'Compiler: **whole program**; interpreter: **one statement at a time**.',
        'Name the OS function and give a one-line example for each.',
        'Match software to a type by **what it does**, not by its brand.',
      ],
      n: 'In the exam, show the multiply or divide step in unit questions and use 1024 every time. Always say whether a memory is volatile. For translators, remember whole program versus one statement at a time. For operating system functions, name the function and add an example. And classify software by what it does, not by who made it.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Computer Systems — Part 2: Logic Gates and Number Systems',
  goals: [
    'Use NOT, AND, OR, NAND, NOR and XOR gates and write their truth tables',
    'Evaluate Boolean expressions and apply the Boolean laws and De Morgan\'s laws',
    'Convert between binary, octal, decimal and hexadecimal, including fractions',
    'Explain ASCII, ISCII, Unicode, UTF-8 and UTF-32',
  ],
  slides: [
    sl('title', 'Logic, Numbers and Codes', {
      b: 'Part 2: how computers decide with **logic gates**, count with **binary** and store text with **encodings**.',
      v: vRoute2,
      n: 'Inside a computer everything is a pattern of zeros and ones. In this part we meet the logic gates that combine those bits, learn the laws of Boolean algebra, practise converting numbers between binary, octal, decimal and hexadecimal, and see how letters of every language are turned into codes.',
    }),
    sl('concept', 'Logic gates', {
      b: 'A **logic gate** takes one or two bits and gives one bit. **NOT** inverts; **AND** needs all inputs 1; **OR** needs at least one input 1.',
      v: vGates,
      n: 'A logic gate takes one or two input bits and produces one output bit. The NOT gate inverts its input. The AND gate gives one only when all inputs are one. The OR gate gives one when at least one input is one. NAND and NOR are AND and OR followed by NOT, shown with a small circle. XOR gives one only when its inputs differ.',
    }),
    sl('diagram', 'Truth tables of the gates', {
      v: vTruth,
      n: 'A truth table lists every possible input and the output. For two inputs there are four rows. AND is one only in the last row. OR is zero only in the first. NAND is the opposite of AND, and NOR is the opposite of OR. XOR is one in the two middle rows, where the inputs differ.',
    }),
    sl('check', 'Quick check: exactly one switch', {
      b: 'Which gate fits the hostel corridor lamp?',
      chk: 'm_xor_diff',
      n: 'The lamp is on only when the two switches are in different positions.',
    }),
    sl('example', 'Worked example 1: a truth table', {
      b: 'Build the table for **F = (A AND B) OR (NOT C)**. Three inputs give 2 × 2 × 2 = **8 rows**.',
      bl: ['Step 1 — List all combinations of A, B and C.', 'Step 2 — Work out A AND B and NOT C in their own columns.', 'Step 3 — OR the two columns to get F.'],
      v: vWE1,
      n: `Three inputs mean eight rows. First list every combination of A, B and C. Then work out the two smaller parts in their own columns: A AND B, and NOT C. Finally combine them with OR to get F. Counting the ones in the last column shows that F is one in ${ones('e1')} of the eight rows.`,
    }),
    sl('diagram', 'The same expression as a circuit', {
      v: vCircuit,
      n: 'Here is the same expression drawn as a circuit. Inputs A and B go into an AND gate. Input C goes into a NOT gate. The outputs of those two gates meet at an OR gate, whose output is F. Reading a circuit from left to right gives the order in which the expression is evaluated.',
    }),
    sl('concept', 'Boolean laws', {
      b: 'Laws let us **simplify** an expression and so build a circuit with fewer gates.',
      v: vLaws,
      n: 'Boolean algebra has laws, just like ordinary algebra. Identity and null laws involve zero and one. The complement law says a value and its opposite give zero with AND and one with OR. There are commutative, associative and distributive laws, the absorption law, and the two De Morgan laws on the next slide. Each can be checked with a truth table.',
    }),
    sl('concept', 'De Morgan\'s laws', {
      b: 'The complement of an **AND** is the **OR** of the complements; the complement of an **OR** is the **AND** of the complements.',
      v: vDM,
      n: 'De Morgan\'s laws connect AND and OR through NOT. NOT of A AND B equals NOT A OR NOT B. NOT of A OR B equals NOT A AND NOT B. In practice, break the bar, change the operator, and complement each term. The table confirms both laws, because each pair of columns is identical in all four rows.',
    }),
    sl('example', 'Worked example 2: simplifying', {
      b: 'Simplify **(A AND B) OR (A AND NOT B)**, naming the law at each step.',
      bl: ['Step 1 — Spot the common factor A.', 'Step 2 — Take it out with the distributive law.', 'Step 3 — Use the complement and identity laws.'],
      v: vWE2,
      n: 'Look for a common factor. Both terms contain A, so the distributive law gives A AND, bracket, B OR NOT B. By the complement law, B OR NOT B is one. Then A AND one is A by the identity law. So a circuit with three gates reduces to a plain wire. A truth table confirms the result.',
    }),
    sl('check', 'Quick check: De Morgan\'s law', {
      b: 'True or false?',
      chk: 'tf_dm',
      n: 'Try the inputs one and zero on both sides.',
    }),
    sl('concept', 'Number systems', {
      b: 'A system of **base b** uses b digits. Binary is base **2**, octal **8**, decimal **10** and hexadecimal **16**.',
      bl: ['Binary: digits 0 and 1.', 'Octal: digits 0 to 7.', 'Hexadecimal: digits 0 to 9 and A to F (A is 10, F is 15).'],
      v: vSystems,
      n: 'Computers use binary, base two, with only the digits zero and one. Octal is base eight and hexadecimal is base sixteen, which needs letters A to F for the values ten to fifteen. Each octal digit stands for three bits and each hexadecimal digit for four bits, which makes them handy short forms for long binary numbers.',
    }),
    sl('example', 'Worked example 3: decimal to binary', {
      b: 'Divide by 2 again and again; the **remainders**, read from the **bottom up**, are the binary number.',
      bl: [`Check with Python: ${ic('bin(45)')} gives ${ic(pr('bin(45)'))}, where 0b only marks a binary literal.`],
      v: vDiv,
      n: `Take forty-five. Divide by two, and note the quotient and remainder. Keep dividing the quotient until it reaches zero. The remainders, read from the last to the first, give the binary number ${P.d2['45'][0]}. A quick check with place values, thirty-two plus eight plus four plus one, gives forty-five again.`,
    }),
    sl('example', 'Worked example 4: grouping bits', {
      b: 'Binary to **octal**: groups of **3** bits. Binary to **hexadecimal**: groups of **4** bits. Start grouping from the **right**.',
      bl: ['Pad the left end with zeros to complete the last group.', 'Hexadecimal to binary: replace each digit by its 4 bits.'],
      v: vGroup,
      n: 'Because eight is two cubed and sixteen is two to the fourth, binary converts to octal and hexadecimal by grouping. Group bits in threes for octal and in fours for hexadecimal, starting from the right and padding on the left with zeros. To go back, replace each hexadecimal digit by its four bits. Binary to decimal is just adding the place values.',
    }),
    sl('check', 'Quick check: hexadecimal to decimal', {
      b: 'Convert with place values.',
      chk: 'm_hex_d',
      n: 'The left digit is worth sixteen times its face value. The letter C is worth twelve.',
    }),
    sl('concept', 'Fractions in binary', {
      b: 'Whole part: **divide** by 2. Fraction part: **multiply** by 2 and collect the whole-number bits.',
      v: vFrac,
      n: 'Fractions need a second method. Convert the whole part by repeated division. For the fraction, multiply by two, write down the whole number part, which is the next bit, and repeat with what is left until it reaches zero. Thirteen point seven five becomes 1101 point 11. To go back, binary places after the point are halves, quarters and eighths.',
    }),
    sl('concept', 'ASCII, ISCII and Unicode', {
      b: 'An **encoding** gives each character a **code**. Older schemes were small; **Unicode** gives every character of every script a unique **code point**.',
      v: vASCII,
      n: 'An encoding assigns a number to each character. ASCII uses seven bits, which gives 128 codes for English. Extended ASCII and ISCII use eight bits. ISCII keeps ASCII in its lower half and uses the upper half for Indian scripts. Unicode ends the clash between schemes by giving every character of every script its own code point, with ASCII as its first 128.',
    }),
    sl('concept', 'UTF-8 and UTF-32', {
      b: '**UTF-8** stores a code point in **1 to 4 bytes**; **UTF-32** always uses **4 bytes**.',
      v: vUTF,
      n: 'A code point still has to be stored as bytes, and that is what UTF encodings do. UTF-8 uses between one and four bytes. English letters take just one, which keeps old ASCII text unchanged, and other characters take two, three or four. UTF-32 is simpler but wasteful, since every character takes exactly four bytes.',
    }),
    sl('example', 'Worked example 5: bytes of real characters', {
      b: 'Python can show the exact bytes: ' + ic("'₹'.encode('utf-8')") + ' gives ' + ic(pr("'₹'.encode('utf-8')")) + '.',
      bl: ['Step 1 — Find the code point.', 'Step 2 — Match it to a range to get the UTF-8 length.', 'Step 3 — UTF-32 is always 4 bytes.'],
      v: vEnc,
      n: 'The letter A has code point forty-one in hexadecimal and takes one byte in UTF-8. The letter e with an acute accent takes two bytes. The Hindi letter ka and the rupee sign each take three bytes. An emoji takes four. In UTF-32 every one of them takes exactly four bytes.',
    }),
    sl('check', 'Quick check: the rupee sign', {
      b: 'How many bytes in UTF-8?',
      chk: 'm_utf8_len',
      n: 'Find which range the code point falls in.',
    }),
    sl('summary', 'Summary', {
      v: vSum2,
      n: 'To sum up. AND needs all ones, OR needs one, NOT inverts, and XOR needs different inputs. A truth table has two to the power of the inputs rows. De Morgan: change the operator and complement each term. Divide for whole parts, multiply for fractions, and group bits in threes or fours. ASCII has seven bits, ISCII eight, and Unicode one code point per character.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Rows in a truth table = **2 to the power of the number of inputs**.',
        'Evaluate in order: **NOT, then AND, then OR**; use brackets to be safe.',
        'Name the **law** next to each simplification step.',
        'Show the **division table** for conversions; group from the **right**.',
        'Say **how many bytes** and **why** when comparing UTF-8 and UTF-32.',
      ],
      n: 'Remember that a truth table has two to the power of the inputs rows. Evaluate NOT first, then AND, then OR. When you simplify, name the law beside each step. For conversions, show the division table and group bits from the right. And for encodings, give the byte counts and the reason for the difference between UTF-8 and UTF-32.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const NOTES = notes({
  title: 'Computer Systems and Organisation — notes',
  sections: [
    {
      h: '1. Computer organisation, memory and units',
      t: 1,
      b: 'A computer **accepts input**, **processes** it, gives **output** and **stores** data. Its parts: **input devices**, the **CPU**, **memory** and **output devices**.\n\n**CPU:** the **ALU** does arithmetic and logic; the **control unit** fetches, decodes and directs; **registers** hold the values in use.\n\n**Memory:** **registers** (fastest) then **cache**, **RAM**, **secondary storage** (slowest, largest). **Cache** and **RAM** are **volatile**; **ROM** (boot instructions) and **secondary storage** (files) are **non-volatile**.\n\n**Units:** 1 byte = 8 bits; a **nibble** is 4 bits. We use **1 KB = 1024 bytes**, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB, 1 PB = 1024 TB. Larger to smaller: **multiply**; smaller to larger: **divide**.',
      terms: [['Volatile memory', 'Memory that loses its contents when the power is switched off.'], ['Cache', 'Small, very fast memory that keeps recently used data close to the CPU.'], ['Byte', 'A group of 8 bits.']],
      v: vOrg,
      vs: [vHier, vCPU, vMemTypes, vUnits, vWork1],
    },
    {
      h: '2. Software and the operating system',
      t: 1,
      b: '**System software** controls the hardware and runs other software: the **operating system** and **device drivers**. **Utility software** maintains and protects the computer: antivirus, backup, file compression, disk clean-up. **Application software** helps with user tasks: **general-purpose** (word processor, spreadsheet), **specific-purpose** (a billing or booking package) or **custom** (written for one user).\n\n**Translators:** an **assembler** converts assembly language; a **compiler** translates the whole program and lists all errors; an **interpreter** translates and runs one statement at a time and stops at the first error.\n\n**OS functions:** process management, memory management, file management, device management, security and the user interface.',
      terms: [['Device driver', 'A small program that lets the operating system control a particular device.'], ['Interpreter', 'A translator that converts and runs a program one statement at a time.']],
      v: vSoftware,
      vs: [vTranslators, vOS, vWhich],
    },
    {
      h: '3. Logic gates and truth tables',
      t: 2,
      b: '**Boolean values** are 0 and 1. **NOT** inverts a single bit. **AND** gives 1 only when **all** inputs are 1. **OR** gives 1 when **at least one** input is 1. **NAND** is NOT of AND; **NOR** is NOT of OR; **XOR** gives 1 only when the two inputs **differ**.\n\nA **truth table** lists every input combination and the output; n inputs give **2 to the power n** rows. Evaluate in the order **NOT, AND, OR**.\n\n**Universal gates:** NAND and NOR. Tying both NAND inputs together gives a NOT gate.',
      terms: [['Truth table', 'A table that lists the output of a Boolean expression for every input combination.'], ['Universal gate', 'A gate from which every other gate can be built; NAND and NOR are universal.']],
      v: vGates,
      vs: [vTruth, vWE1, vCircuit],
    },
    {
      h: '4. Boolean laws and De Morgan',
      t: 2,
      b: 'Laws: **identity, null, idempotent, complement, involution, commutative, associative, distributive** and **absorption** (see the table). **De Morgan\'s laws:** NOT (A AND B) = (NOT A) OR (NOT B); NOT (A OR B) = (NOT A) AND (NOT B). The rule: break the bar, change AND to OR (or OR to AND), complement each term.\n\n**Simplifying** an expression reduces the gates in a circuit; name the law at each step. Two expressions are equal if their **truth tables are identical**.',
      terms: [['De Morgan\'s laws', 'Rules that turn the complement of an AND into an OR of complements, and the complement of an OR into an AND of complements.']],
      v: vLaws,
      vs: [vDM, vWE2],
    },
    {
      h: '5. Number systems and conversions',
      t: 3,
      b: '**Binary** (base 2): 0, 1. **Octal** (base 8): 0 to 7. **Decimal** (base 10). **Hexadecimal** (base 16): 0 to 9 and A to F (A = 10 … F = 15).\n\n- **Decimal to binary:** divide by 2 repeatedly, read the **remainders upward**.\n- **Binary to decimal:** add the place values of the 1 bits (…, 8, 4, 2, 1).\n- **Binary to octal / hex:** group bits in **3** / **4** from the **right**, padding with zeros on the left.\n- **Octal / hex to binary:** replace each digit with 3 / 4 bits.\n- **Fractions:** whole part by division; fraction part by **multiplying by 2** and collecting the whole-number bits. Binary places after the point are halves, quarters, eighths.',
      terms: [['Base (radix)', 'The number of different digits a number system uses.'], ['Hexadecimal', 'The base-16 system whose digits are 0 to 9 and A to F.']],
      v: vSystems,
      vs: [vDiv, vGroup, vFrac],
    },
    {
      h: '6. Encoding schemes',
      t: 3,
      b: 'An **encoding** assigns a code to every character. **ASCII**: 7 bits, 128 codes, English only (A is 65, a is 97, 0 is 48; small and capital letters differ by 32). **Extended ASCII** and **ISCII**: 8 bits; ISCII keeps ASCII in the lower half and covers **Indian scripts** above it. **Unicode**: a unique **code point** for every character of every script; its first 128 are ASCII.\n\n**UTF-8:** 1 to 4 bytes per character (English letters take 1, so ASCII text is unchanged). **UTF-32:** always 4 bytes. A text with many English letters is smaller in UTF-8; UTF-32 is simpler but uses more space.',
      terms: [['Code point', 'The unique number Unicode gives to a character.'], ['UTF-8', 'A Unicode encoding that uses 1 to 4 bytes per character.']],
      v: vASCII,
      vs: [vUTF, vEnc],
    },
  ],
  tips: '**Common mistakes**\n- Using 1000 instead of **1024** for a step between memory units, or dividing when you should multiply.\n- Calling RAM non-volatile, or ROM volatile.\n- Writing the remainders of a division **top down** instead of bottom up.\n- Grouping bits from the **left** instead of the right when converting to octal or hexadecimal.\n- Writing NOT (A AND B) = (NOT A) AND (NOT B): the operator must **change** to OR.\n- Forgetting that a hexadecimal digit stands for **exactly 4 bits** (and an octal digit for 3).\n- Saying UTF-8 always uses 1 byte, or UTF-32 a variable number of bytes.\n\n**How marks are usually awarded**\n- 1 mark: one fact or one correct choice.\n- 2 to 3 marks: the answer **plus a reason**, or a conversion with its working.\n- 4 marks (case-based): small parts, each short, with a choice in the last part.\n- 5 marks: a full answer in ordered points, a complete truth table or a series of conversions with working.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Four jobs of a computer system', 'Input, process, output and store.', 'concept', 1],
  ['Job of the **ALU**', 'Performs arithmetic operations and logical comparisons.', 'definition', 1],
  ['Job of the **control unit**', 'Fetches and decodes instructions and directs the other parts.', 'definition', 1],
  ['What are **registers**?', 'Tiny, very fast stores inside the CPU for the values in use.', 'definition', 1],
  ['What is **volatile** memory?', 'Memory that loses its contents when power is off (cache, RAM).', 'definition', 1],
  ['What does **ROM** hold?', 'Start-up (boot) instructions; it is non-volatile.', 'fact', 1],
  ['Why is **cache** used?', 'To keep recently used data close to the CPU so it waits less for RAM.', 'concept', 1],
  ['Fastest to slowest memory', 'Registers, cache, RAM, secondary storage.', 'concept', 1],
  ['Bits in a byte; bits in a nibble', 'Byte: 8 bits. Nibble: 4 bits.', 'fact', 1],
  ['Memory unit step used here', '1 KB = 1024 bytes; each larger unit is 1024 times the one before.', 'fact', 1],
  ['Convert 3 GB to MB', `3 × 1024 = ${P.mem.gb3_mb} MB.`, 'formula', 1],
  ['**System** vs **utility** vs **application** software', 'System: runs the hardware. Utility: maintains and protects it. Application: does a user task.', 'concept', 1],
  ['What is a **device driver**?', 'A small program that lets the OS control one device, such as a printer.', 'definition', 1],
  ['Compiler vs interpreter', 'Compiler: whole program first, errors listed together. Interpreter: one statement at a time, stops at the first error.', 'concept', 1],
  ['Name four **OS functions**', 'Process, memory, file and device management (also security and user interface).', 'fact', 1],
  ['**AND** gate rule', 'Output 1 only when all inputs are 1.', 'definition', 2],
  ['**OR** gate rule', 'Output 1 when at least one input is 1.', 'definition', 2],
  ['**XOR** gate rule', 'Output 1 only when the two inputs differ.', 'definition', 2],
  ['**NAND** and **NOR**', 'NAND is NOT of AND (0 only for 1, 1). NOR is NOT of OR (1 only for 0, 0).', 'concept', 2],
  ['Rows in a truth table', '2 to the power of the number of inputs: 3 inputs give 8 rows.', 'formula', 2],
  ['Order of evaluation', 'NOT first, then AND, then OR (brackets first).', 'exam-tip', 2],
  ['State **De Morgan\'s laws**', 'NOT (A AND B) = (NOT A) OR (NOT B); NOT (A OR B) = (NOT A) AND (NOT B).', 'formula', 2],
  ['Why is NAND **universal**?', 'Every gate can be built from NAND alone; joining both inputs gives NOT.', 'concept', 2],
  ['Decimal to binary', 'Divide by 2 repeatedly; read the remainders from the bottom up.', 'concept', 3],
  ['Binary to octal and to hex', 'Group bits in 3s (octal) and 4s (hex) from the right.', 'concept', 3],
  ['Hex digits A to F', 'A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.', 'fact', 3],
  ['Convert a decimal fraction to binary', 'Multiply the fraction by 2 repeatedly; the whole-number parts are the bits.', 'concept', 3],
  ['ASCII', '7 bits, 128 codes, English letters, digits and symbols.', 'fact', 3],
  ['ISCII', '8-bit code: ASCII in the lower half, Indian scripts in the upper half.', 'fact', 3],
  ['Unicode, UTF-8, UTF-32', 'Unicode: one code point per character. UTF-8: 1 to 4 bytes. UTF-32: always 4 bytes.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Computer Systems and Organisation',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ram_vol', 'm_and', 'm_d2b', 'ar_cache'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s2_cpu', 's2_xor', 's3_conv'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 100 words.', items: [{ attempt: 1, keys: ['l_truth', 'l_enc'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_cafe'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Computer Systems and Organisation',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_bits', 'm_interp', 'm_driver', 'm_nand_out', 'm_demorgan', 'm_circuit', 'm_b2d', 'm_bits_needed', 'ar_ram', 'ar_utf'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s2_ram_rom', 's2_rows', { attempt: 1, keys: ['s2_hex_why', 's2_iscii'] }, 's3_simplify', { attempt: 1, keys: ['s3_memory', 's3_encode'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_org', { attempt: 1, keys: ['l_design', 'l_conv'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_lift', 'cb_hindi'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: NOTES,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-11-computer-science-ch01 only (organisation, memory units and software; Boolean logic and gates; number systems and encoding)',
    originality: 'every person, shop, warehouse and program is imagined and written by SOYL; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'one Python 3 program computes every truth table, base conversion, binary fraction, memory-unit figure and UTF-8/UTF-32 byte string (src/py-cache.json); JavaScript cross-checks them and verifies each Boolean law for all inputs; the code-output and error items run their own programs; memory units use 1 KB = 1024 bytes throughout',
    facts: 'ASCII 7 bits and 128 codes; ISCII 8 bits (ASCII lower half, Indian scripts upper half; no code values stated); Unicode 1,114,112 code points; UTF-8 1 to 4 bytes (ranges verified with Python); UTF-32 4 bytes',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration, answer-leak and stem-duplicate checks run clean in this build',
  },
});
