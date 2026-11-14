// CBSE 11 Computer Science, ch01 Computer Systems and Organisation: facts and question bank.
// Every truth table, conversion, memory-unit figure and encoding byte below is computed by one Python 3 program
// (FACTS_PY, recorded in src/py-cache.json) and cross-checked in JavaScript; nothing is typed by hand.
// Memory-unit convention used throughout: 1 KB = 1024 bytes (CBSE syllabus), 1 MB = 1024 KB, 1 GB = 1024 MB.
// All people, shops and data are imagined and written by SOYL; no NCERT or sample-paper item is reused (D-036).
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const ic = (s) => '`' + s + '`';

// ---------------------------------------------------------------- facts (one Python program)
const FACTS_PY = `import json, itertools, math
from fractions import Fraction
def NOT(a): return 1 - a
def AND(a, b): return a & b
def OR(a, b): return a | b
def NAND(a, b): return 1 - (a & b)
def NOR(a, b): return 1 - (a | b)
def XOR(a, b): return a ^ b
G = {'NOT': NOT, 'AND': AND, 'OR': OR, 'NAND': NAND, 'NOR': NOR, 'XOR': XOR}
def tt(vs, e):
    rows = []
    for vals in itertools.product([0, 1], repeat=len(vs)):
        rows.append(list(vals) + [eval(e, G, dict(zip(vs, vals)))])
    return {'vars': vs, 'rows': rows}
T = {
  'not': tt(['A'], 'NOT(A)'),
  'and': tt(['A', 'B'], 'AND(A,B)'), 'or': tt(['A', 'B'], 'OR(A,B)'),
  'nand': tt(['A', 'B'], 'NAND(A,B)'), 'nor': tt(['A', 'B'], 'NOR(A,B)'), 'xor': tt(['A', 'B'], 'XOR(A,B)'),
  'e1': tt(['A', 'B', 'C'], 'OR(AND(A,B),NOT(C))'),
  'dm1l': tt(['A', 'B'], 'NOT(OR(A,B))'), 'dm1r': tt(['A', 'B'], 'AND(NOT(A),NOT(B))'),
  'dm2l': tt(['A', 'B'], 'NOT(AND(A,B))'), 'dm2r': tt(['A', 'B'], 'OR(NOT(A),NOT(B))'),
  'xorsop': tt(['A', 'B'], 'OR(AND(A,NOT(B)),AND(NOT(A),B))'),
  'ev1': tt(['A', 'B', 'C'], 'AND(OR(NOT(A),B),C)'),
  'xor3': tt(['P', 'Q', 'R'], 'AND(XOR(P,Q),R)'),
  'lx': tt(['A', 'B', 'C'], 'OR(AND(NOT(A),B),AND(A,NOT(C)))'),
  'fan': tt(['H', 'C', 'M'], 'AND(H,OR(C,M))'),
  'lift': tt(['B', 'D', 'O'], 'AND(AND(B,D),NOT(O))'),
  'simp': tt(['A', 'B'], 'AND(OR(A,B),OR(A,NOT(B)))'),
  'wes': tt(['A', 'B'], 'OR(AND(A,B),AND(A,NOT(B)))'),
  'absl': tt(['P', 'Q'], 'OR(P,AND(P,Q))'),
  'nandnot': tt(['A'], 'NAND(A,A)'),
  'nandand': tt(['A', 'B'], 'NAND(NAND(A,B),NAND(A,B))'),
  'nandor': tt(['A', 'B'], 'NAND(NAND(A,A),NAND(B,B))'),
  'dm3l': tt(['X', 'Y', 'Z'], 'NOT(OR(OR(X,Y),Z))'), 'dm3r': tt(['X', 'Y', 'Z'], 'AND(AND(NOT(X),NOT(Y)),NOT(Z))'),
  'dm4l': tt(['A', 'B', 'C'], 'NOT(AND(A,OR(B,NOT(C))))'), 'dm4r': tt(['A', 'B', 'C'], 'OR(NOT(A),AND(NOT(B),C))'),
}
def fbin(x, maxbits=12):
    x = Fraction(x); ip = int(x); f = x - ip; bits = []; steps = []
    while f and len(bits) < maxbits:
        prod = f * 2; b = int(prod); steps.append([float(f), float(prod), b]); bits.append(str(b)); f = prod - b
    return {'whole': format(ip, 'b'), 'bits': ''.join(bits), 'steps': steps, 'text': format(ip, 'b') + '.' + ''.join(bits)}
def bfrac(s):
    w, fr = s.split('.')
    return float(int(w, 2) + sum(int(b) * Fraction(1, 2 ** (i + 1)) for i, b in enumerate(fr)))
def utf(ch):
    b8 = ch.encode('utf-8'); b32 = ch.encode('utf-32-be')
    return {'cp': 'U+%04X' % ord(ch), 'dec': ord(ch), 'utf8': ' '.join('%02X' % x for x in b8), 'utf8n': len(b8), 'utf32': ' '.join('%02X' % x for x in b32), 'utf32n': len(b32)}
def word(w):
    return {'chars': len(w), 'utf8n': len(w.encode('utf-8')), 'utf32n': len(w.encode('utf-32-be'))}
out = {'T': T}
out['d2'] = {str(n): [format(n, 'b'), format(n, 'o'), format(n, 'X')] for n in [45, 83, 156, 250, 275]}
out['b2d'] = {s: int(s, 2) for s in ['110101', '1001101', '101101', '10110111']}
out['h2d'] = {s: int(s, 16) for s in ['7C', '2B6', '1A', '8F', 'E3', 'D7']}
out['o2d'] = {s: int(s, 8) for s in ['725', '345']}
out['o2b'] = {s: format(int(s, 8), 'b') for s in ['345', '725']}
out['h2b'] = {s: format(int(s, 16), 'b') for s in ['3AF', 'C5', '8F']}
out['b2oh'] = {s: [format(int(s, 2), 'o'), format(int(s, 2), 'X')] for s in ['1011100110', '11010111', '11111010']}
out['frac'] = {str(x): fbin(x) for x in [13.75, 9.625, 0.375, 0.625, 7.25]}
out['bf'] = {s: bfrac(s) for s in ['101.01', '1101.101', '110.011']}
out['mem'] = {
  'mb3_kb': 3 * 1024, 'kb2_bits': 2 * 1024 * 8, 'photos': 16 * 1024 // 2, 'gb3_mb': 3 * 1024, 'gb3_kb': 3 * 1024 * 1024,
  'mb700_bits': 700 * 1024 * 1024 * 8, 'kb20480_mb': 20480 // 1024, 'backups': 64 * 1024 // 16, 'mb1536_gb': 1536 / 1024,
  'tb1_mb': 1024 * 1024, 'b8192_kb': 8192 // 1024, 'gb2_mb': 2 * 1024, 'songs': 8 * 1024 // 4, 'kb_b': 1024,
}
out['units'] = [[u, 1024 ** i] for i, u in enumerate(['byte', 'KB', 'MB', 'GB', 'TB', 'PB'])]
out['bitsneed'] = {str(n): math.ceil(math.log2(n)) for n in [100, 200, 50, 1000]}
out['pow2'] = {str(n): 2 ** n for n in [3, 4, 5, 7, 8, 16]}
out['uni_total'] = 0x10FFFF + 1
out['ascii'] = {c: [ord(c), format(ord(c), '07b'), '%02X' % ord(c)] for c in ['A', 'a', 'Z', 'z', '0', '9', 'G', 'g', 'C', 'm', ' ']}
out['enc'] = {c: utf(c) for c in ['A', 'é', 'क', '₹', '😀']}
out['words'] = {w: word(w) for w in ['नमस्ते', 'भारत', 'Ramesh', 'Hi₹']}
out['bounds'] = [[hex(c), len(chr(c).encode('utf-8'))] for c in [0x7F, 0x80, 0x7FF, 0x800, 0xFFFF, 0x10000]]
print(json.dumps(out, ensure_ascii=False))`;
export const P = JSON.parse(pyOut(FACTS_PY));
export const T = P.T;

// ---------------------------------------------------------------- helpers over the facts
/** Output of truth table `name` for the given input bits. */
export const val = (name, ...inp) => T[name].rows.find((r) => r.slice(0, -1).every((v, i) => v === inp[i])).at(-1);
export const ones = (name) => T[name].rows.filter((r) => r.at(-1) === 1).length;
export const same = (a, b) => JSON.stringify(T[a].rows) === JSON.stringify(T[b].rows);
/** Markdown truth table; `label` names the output column. */
export const tmd = (name, label) => {
  const t = T[name];
  return `| ${[...t.vars, label].join(' | ')} |\n|${'---|'.repeat(t.vars.length + 1)}\n${t.rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;
};
/** Truth table of several functions of the same inputs side by side: cols = [[name, label]…]. */
export const tmdMulti = (cols, vars) => {
  const base = T[cols[0][0]];
  return `| ${[...vars, ...cols.map((c) => c[1])].join(' | ')} |\n|${'---|'.repeat(vars.length + cols.length)}\n${base.rows.map((r, i) => `| ${[...r.slice(0, -1), ...cols.map((c) => T[c[0]].rows[i].at(-1))].join(' | ')} |`).join('\n')}`;
};
export const bin = (n) => n.toString(2);
export const oct = (n) => n.toString(8);
export const hex = (n) => n.toString(16).toUpperCase();
export const bitsLine = (s) => s.replace(/(\d)(?=(\d{4})+$)/g, '$1 ');

// Cross-checks: JavaScript agrees with Python everywhere a conversion is used.
for (const [n, [b, o, h]] of Object.entries(P.d2)) {
  assert.equal(bin(+n), b); assert.equal(oct(+n), o); assert.equal(hex(+n), h);
}
for (const [s, d] of Object.entries(P.b2d)) assert.equal(parseInt(s, 2), d);
for (const [s, d] of Object.entries(P.h2d)) assert.equal(parseInt(s, 16), d);
for (const [s, d] of Object.entries(P.o2d)) assert.equal(parseInt(s, 8), d);
for (const [s, b] of Object.entries(P.h2b)) assert.equal(parseInt(s, 16).toString(2), b);
assert.equal(P.mem.mb3_kb, 3 * 1024);
assert.equal(P.mem.photos, 8192);
assert.equal(P.mem.backups, 4096);
assert.equal(P.pow2['8'], 256);
assert.equal(P.pow2['7'], 128);
assert.ok(same('dm1l', 'dm1r') && same('dm2l', 'dm2r') && same('dm3l', 'dm3r') && same('dm4l', 'dm4r'));
assert.ok(!same('dm2l', 'dm1r'));
assert.ok(same('xor', 'xorsop'));
assert.ok(same('nandnot', 'not'));
assert.ok(same('nandand', 'and') && same('nandor', 'or'));
assert.deepEqual(T.absl.rows.map((r) => r.at(-1)), T.absl.rows.map((r) => r[0]));
assert.deepEqual(T.simp.rows.map((r) => r.at(-1)), T.simp.rows.map((r) => r[0]));
assert.equal(P.bitsneed['200'], 8);
assert.deepEqual(P.frac['0.375'].steps, [[0.375, 0.75, 0], [0.75, 1.5, 1], [0.5, 1.0, 1]]);
assert.ok(same('wes', 'wes') && T.wes.rows.every((r) => r.at(-1) === r[0]));
assert.deepEqual(P.bounds.map((b) => b[1]), [1, 2, 2, 3, 3, 4]);
assert.equal(P.ascii.G[0], P.ascii.g[0] - 32);

// ================================================================ t01 Basic computer organisation, memory, software
Q('m_cu', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Inside the processor of Tara\'s school computer, which unit fetches each instruction from memory, decodes it and tells the other parts what to do next?',
  opts: ['Control unit', 'Arithmetic logic unit', 'Cache memory', 'Output unit'],
  sol: 'The control unit runs the fetch, decode and execute steps and directs the other parts. The ALU only calculates and compares, cache is fast memory, and an output unit is not inside the CPU.',
}));
Q('m_ram_vol', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Gopal was typing his Hindi essay when the lab lost power before he pressed Save. Which memory was holding the unsaved text, so that it vanished?',
  opts: ['RAM', 'ROM', 'Hard disk', 'Pen drive'],
  sol: 'Work that is open but unsaved lives in RAM, which is volatile and empties when power fails. The hard disk and pen drive are non-volatile secondary storage; ROM holds fixed start-up instructions.',
}));
Q('m_kb', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Taking 1 KB = 1024 bytes and 1 MB = 1024 KB, a slide deck of 3 MB is how many KB?',
  opts: [`${P.mem.mb3_kb} KB`, '3000 KB', '1027 KB', `${P.mem.gb3_kb} KB`],
  sol: `Multiply by 1024 to go from MB to KB: 3 × 1024 = ${P.mem.mb3_kb}. The round figure 3000 uses a step of 1000, which this chapter does not use.`,
}));
Q('m_bits', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A plain-text file of Naveen\'s diary entries is 2 KB (1 KB = 1024 bytes). How many bits does it hold?',
  opts: [`${P.mem.kb2_bits} bits`, '2048 bits', '16000 bits', '4096 bits'],
  sol: `First change KB to bytes: 2 × 1024 = 2048 bytes. Each byte has 8 bits, so 2048 × 8 = ${P.mem.kb2_bits} bits. 2048 is the byte count, not the bit count.`,
}));
Q('m_photos', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Fatima\'s empty pen drive holds 16 GB. Every phone photo she copies is 2 MB. Taking 1 GB = 1024 MB, how many such photos fit on it?',
  opts: [`${P.mem.photos}`, '8000', '32768', '512'],
  sol: `16 GB = 16 × 1024 = 16384 MB, and 16384 ÷ 2 = ${P.mem.photos} photos. Multiplying instead of dividing gives 32768.`,
}));
Q('m_interp', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Dev\'s script prints the results of lines 1 to 6 and then stops with an error message at line 7, without running anything after it. Which language translator is processing his script?',
  opts: ['Interpreter', 'Compiler', 'Assembler', 'Linker'],
  sol: 'An interpreter translates and runs one statement at a time, so the first six lines had already executed when line 7 failed. A compiler reports its errors before any of the program runs.',
}));
Q('m_driver', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'After Kavita plugged a new label printer into her shop computer, it did nothing until she installed a small program supplied by its maker. What is that program?',
  opts: ['Device driver', 'Compiler', 'Spreadsheet', 'Antivirus'],
  sol: 'A device driver lets the operating system control a particular piece of hardware. The other options do not give the system knowledge of a new device.',
}));
Q('m_utility', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Each Sunday the lab of an imagined school in Mysuru runs a program that scans every drive for malicious files and quarantines them. This program is',
  opts: ['utility software', 'a language translator', 'custom application software', 'firmware stored in ROM'],
  sol: 'Utility software maintains and protects the computer; an antivirus scanner is a standard example. It does not translate programs, serve one customer\'s business needs, or sit in ROM.',
}));
Q('m_os_file', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Ishaan renames a folder, moves a document into it and deletes an old copy. Which function of the operating system carries out these operations?',
  opts: ['File management', 'Process management', 'Memory management', 'Device management'],
  sol: 'Creating, naming, moving and deleting files and folders is file management. Process management shares the CPU, memory management allocates RAM, and device management controls hardware.',
}));
Q('tf_ram', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? Whatever is stored in RAM stays intact after the computer is switched off.',
  sol: 'RAM is volatile: it loses its contents without power. Non-volatile memory such as ROM or an SSD keeps data.',
}));
Q('tf_compiler', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A compiler translates the whole source program into machine code before the program is run.',
  sol: 'A compiler translates the complete program in one pass and produces a separate executable file, unlike an interpreter that works statement by statement.',
}));
Q('fb_cpu', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The CPU has an ___ unit that carries out calculations and comparisons, and a ___ unit that directs the other components.',
  acc: [['arithmetic logic', 'arithmetic and logic', 'alu'], ['control', 'cu']],
  sol: 'The arithmetic logic unit (ALU) calculates and compares; the control unit (CU) directs the operation of the other components.',
}));
Q('fb_byte', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'One byte is made up of ___ bits, and in this chapter 1 KB equals ___ bytes.',
  acc: [['8', 'eight'], ['1024']],
  sol: 'A byte has 8 bits, and the syllabus convention for a kilobyte is 1024 bytes.',
}));
Q('match_sw', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each item with the kind of software it belongs to.',
  pairs: [
    ['A disk clean-up tool', 'Utility software'],
    ['Android running on a tablet', 'Operating system'],
    ['A fee-collection program built for one school only', 'Custom application software'],
    ['The program that turns Python statements into machine instructions', 'Language translator'],
  ],
  sol: 'A clean-up tool maintains the system; Android manages the hardware; a one-school fee program is bespoke application software; a program that converts source code is a translator.',
}));
Q('ord_mem', ord({
  t: 1, d: 2, c: 'understanding',
  stem: 'Arrange these storage areas in decreasing order of speed, fastest first.',
  items: ['CPU registers', 'Cache memory', 'RAM', 'Secondary storage (SSD or hard disk)'],
  sol: 'Registers sit inside the CPU and are fastest; cache is next; RAM is slower but larger; secondary storage is slowest and largest.',
}));
Q('ord_units', ord({
  t: 1, d: 1, c: 'recall', marks: 1,
  stem: 'Arrange these units of memory from smallest to largest.',
  items: ['Kilobyte', 'Megabyte', 'Gigabyte', 'Terabyte'],
  sol: 'Each unit is 1024 times the one before it: KB, MB, GB, TB.',
}));
Q('ar_cache', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'A processor with a cache usually finishes repeated tasks faster than one without.',
  r: 'Cache keeps recently used data and instructions close to the CPU, so the CPU waits less for the slower RAM.',
  sol: 'Both statements are true and R explains A: fewer waits for RAM means repeated work speeds up.',
}));
Q('ar_ram', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'Unsaved work in an open document survives a sudden power cut because it is held in RAM.',
  r: 'RAM is volatile memory and loses its contents when the power is lost.',
  sol: 'A is false, because RAM is volatile and the unsaved work is lost. R is true and in fact contradicts A.',
}));
Q('s2_cpu', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the two main parts of the CPU and state one job of each.',
  model: 'The **arithmetic logic unit (ALU)** performs arithmetic operations and logical comparisons. The **control unit (CU)** fetches and decodes instructions and directs the other components to carry them out.',
  sol: 'ALU with its job, control unit with its job.',
  scheme: [['ALU and its job', 1], ['Control unit and its job', 1]],
}));
Q('s2_ram_rom', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between RAM and ROM on any two points.',
  model: '**RAM** is volatile and loses its contents without power; it is read-write memory holding running programs and data. **ROM** is non-volatile and keeps its contents; it holds fixed start-up (boot) instructions and is normally only read.',
  sol: 'Two valid differences: volatility, and use or read-write nature.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s2_translator', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does a compiler differ from an interpreter in the way it translates a program?',
  model: 'A **compiler** translates the whole program into machine code first and lists all its errors together; the result runs without the compiler. An **interpreter** translates and executes one statement at a time and stops at the first error it meets.',
  sol: 'Whole program versus statement by statement, with the error behaviour.',
  scheme: [['Compiler: whole program', 1], ['Interpreter: statement by statement', 1]],
}));
Q('s2_os', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two functions of an operating system and give an everyday example of each.',
  model: '**Process management** shares the CPU among running programs, for example playing music while a document is edited. **File management** organises files in folders, for example creating, renaming or deleting a file.',
  sol: 'Any two functions, each with a fitting example.',
  scheme: [['First function with example', 1], ['Second function with example', 1]],
}));
Q('s3_software', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Classify software into system, utility and application software, with one example of each.',
  model: '**System software** controls the hardware and runs other software, e.g. an operating system or a device driver. **Utility software** maintains and protects the computer, e.g. an antivirus scanner or a disk-cleanup tool. **Application software** helps users do a task, e.g. a word processor, a spreadsheet or a school fee program.',
  sol: 'Each of the three classes with its role and one example.',
  scheme: [['System software with example', 1], ['Utility software with example', 1], ['Application software with example', 1]],
}));
Q('s3_memory', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A computer has registers, cache, RAM and a hard disk. Why not build all of its storage from the fastest type?',
  model: 'The fastest memory (registers, cache) is very **costly** per byte and can only be made small. The slowest (hard disk) is cheap and large and keeps data **permanently**. A hierarchy gives speed where it matters, capacity at low cost, and non-volatile storage for files.',
  sol: 'Cost and size against speed, and the role of permanent storage.',
  scheme: [['Fast memory costs more and is small', 1], ['Slow memory is cheap, large and permanent', 1], ['Hierarchy balances them', 1]],
}));
Q('l_org', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the organisation of a computer system. Cover input devices, the CPU and its parts, primary memory, secondary memory and output devices, and say how data moves between them.',
  model: '1. **Input devices** (keyboard, scanner) take data into the computer.\n2. The **CPU** processes it: the **control unit** fetches and decodes instructions, the **ALU** calculates and compares, and **registers** hold values being used right now.\n3. **Primary memory** (RAM, ROM, cache) is directly reachable by the CPU; RAM is volatile and holds running programs.\n4. **Secondary memory** (hard disk, SSD) keeps programs and files permanently.\n5. **Output devices** (monitor, printer) show the result. Data flows input, memory, CPU, memory, output.',
  sol: 'Five parts with correct roles and the direction of data flow.',
  scheme: [['Input devices', 1], ['CPU parts: CU, ALU, registers', 1], ['Primary memory', 1], ['Secondary memory', 1], ['Output devices and flow', 1]],
}));
Q('l_software_choice', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'Dr Anjali opens a small eye clinic in Coimbatore with two computers. She needs patient records and bills, protection from malicious files, a programmer to write a booking tool in Python, and a system that runs it all. Name the kind of software for each need and justify one choice in a sentence.',
  model: '1. Patient records and bills: **application software**, ideally custom or a ready billing package.\n2. Protection from malicious files: **utility software**, an antivirus scanner.\n3. Python booking tool: a **translator**, the Python interpreter, runs the program a programmer writes.\n4. Running everything: the **operating system**, which manages processes, memory, files and devices.\nJustification: the OS is needed first because every other program asks it for the hardware.',
  sol: 'Four needs matched to application, utility, translator and system software, with one justification.',
  scheme: [['Records and bills: application software', 1], ['Malicious files: utility', 1], ['Python tool: translator', 1], ['Running it all: operating system', 1], ['One justified choice', 1]],
}));
Q('cb_cafe', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the tablet used at an imagined cafe and answer the questions. *(Imagined cafe and numbers, written by SOYL for practice.)*',
  passage: `Zaina runs a cafe in Udupi. Her billing tablet has **64 GB** of storage. Every night the billing app saves a backup file of **16 MB**. Take 1 GB = 1024 MB. The tablet also runs an operating system, an antivirus app and the billing app.`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'b', stem: 'How many full nightly backups of 16 MB can the 64 GB storage hold?', opts: ['1024', `${P.mem.backups}`, '65536', '4000'], sol: `64 GB = 64 × 1024 = 65536 MB, and 65536 ÷ 16 = ${P.mem.backups}.` })),
    child('b', tf({ t: 1, d: 2, c: 'understanding', ans: false, stem: 'True or false? The antivirus app on the tablet is system software, because it comes with the operating system.', sol: 'An antivirus app is utility software; it maintains and protects the device. Being installed alongside the OS does not make it system software.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Name the kind of software the billing app is, and say what the operating system does for it.', model: 'The billing app is **application software**. The **operating system** gives it access to memory, storage and the screen, and schedules its work on the CPU.', sol: 'Application software, and the OS as the manager of resources.', scheme: [['Billing app is application software', 1], ['OS role for the app', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Zaina\'s tablet loses its unsaved day-total when the battery dies, but the saved backups remain. Name the type of memory that lost the total and the type that kept the backups.', model: 'The unsaved total sat in **RAM**, which is volatile and loses its contents. The saved backups are on **secondary storage** (flash storage), which is non-volatile.', sol: 'RAM lost the total; secondary storage kept the backups.', scheme: [['RAM, volatile', 1], ['Secondary storage, non-volatile', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 Boolean logic and gates
Q('m_and', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'The strongroom of an imagined jewellery shop opens only when the fingerprint is accepted and the keypad code is correct. Which logic gate models this rule?',
  opts: ['AND', 'OR', 'NOT', 'XOR'],
  sol: 'An AND gate gives 1 only when all inputs are 1, matching "both conditions must hold". OR would open the door for either condition alone.',
}));
Q('m_nand_out', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A NAND gate in a sensor circuit receives A = 1 and B = 1. What is its output?',
  opts: [`${val('nand', 1, 1)}`, '1', 'It depends on a third input', 'Both 0 and 1'],
  sol: 'NAND is AND followed by NOT. AND of 1 and 1 is 1, and NOT turns that into 0. The output depends only on the two inputs given, so no third input is involved.',
}));
Q('m_xor_diff', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A corridor lamp in an imagined hostel has a switch at each end. It must be on when exactly one switch is pressed, and off when both or neither are pressed. Which gate gives this behaviour?',
  opts: ['XOR', 'AND', 'NOR', 'OR'],
  sol: 'XOR outputs 1 only when its two inputs differ. OR would also light the lamp when both are pressed; NOR would light it when neither is pressed.',
}));
Q('m_expr_ones', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the truth table of the expression (NOT A OR B) AND C, for how many of the 8 input rows is the output 1?',
  opts: [`${ones('ev1')}`, '2', '4', '5'],
  sol: `C must be 1, and then (NOT A OR B) is 1 for the rows A B = 00, 01 and 11 but not 10. That gives ${ones('ev1')} rows.`,
}));
Q('m_demorgan', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Aryan states the opposite of "the gate opens when the key is in and the guard is present" as NOT (K AND G). By De Morgan\'s law this equals',
  opts: ['(NOT K) OR (NOT G)', '(NOT K) AND (NOT G)', 'K OR G', 'NOT K AND G'],
  sol: 'De Morgan\'s law turns the complement of an AND into an OR of the complements. The version with AND is the law for NOT of an OR.',
}));
Q('m_demorgan2', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which expression is equal to NOT (X OR Y OR Z)?',
  opts: ['(NOT X) AND (NOT Y) AND (NOT Z)', '(NOT X) OR (NOT Y) OR (NOT Z)', 'X AND Y AND Z', 'NOT X AND Y AND Z'],
  sol: 'De Morgan\'s law extends to three terms: the complement of an OR is the AND of the complements. The identical truth tables confirm it.',
}));
Q('m_absorb', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A designer simplifies P OR (P AND Q) with Boolean laws before drawing the circuit. What does it reduce to?',
  opts: ['P', 'Q', 'P AND Q', 'P OR Q'],
  sol: 'By the absorption law, if P is 1 the whole expression is 1, and if P is 0 then P AND Q is 0 too. So the output simply follows P, which needs no gate.',
}));
Q('m_nand_not', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Rahul joins both inputs of a NAND gate to one wire carrying signal S. When S = 0 the output is 1, and when S = 1 the output is 0. The gate now behaves like a',
  opts: ['NOT gate', 'AND gate', 'OR gate', 'XOR gate'],
  sol: 'With both inputs equal to S, NAND gives NOT (S AND S) = NOT S, which is an inverter. This is why NAND is called a universal gate.',
}));
Q('m_circuit', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'In an imagined circuit, inputs P and Q feed an XOR gate, and the XOR output and input R feed an AND gate. For which input combination (P, Q, R) is the final output 1?',
  opts: ['(1, 0, 1)', '(1, 1, 1)', '(0, 0, 1)', '(1, 0, 0)'],
  sol: `The output is 1 only when P and Q differ and R = 1; the table has exactly ${ones('xor3')} such rows. (1, 1, 1) and (0, 0, 1) fail the XOR part, and (1, 0, 0) fails R.`,
}));
Q('tf_nor', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The output of a NOR gate is 1 only when both of its inputs are 0.',
  sol: 'NOR is OR followed by NOT. OR gives 0 only for inputs 0 and 0, so NOR gives 1 only for that row.',
}));
Q('tf_dm', tf({
  t: 2, d: 3, c: 'application', ans: false,
  stem: 'True or false? NOT (A AND B) is always equal to (NOT A) AND (NOT B).',
  sol: `For A = 1 and B = 0 the left side is ${val('dm2l', 1, 0)} but the right side is ${val('dm1r', 1, 0)}. The correct law is NOT (A AND B) = (NOT A) OR (NOT B).`,
}));
Q('fb_gates', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The gate with one input that inverts it is the ___ gate, and the gate whose output is 0 only when both inputs are 1 is the ___ gate.',
  acc: [['not', 'inverter'], ['nand']],
  sol: 'The NOT gate (inverter) complements its input; the NAND gate outputs 0 only for inputs 1 and 1.',
}));
Q('match_gate', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each gate with the rule for its two-input output.',
  pairs: [
    ['NOR', 'Output 1 only when both inputs are 0'],
    ['XOR', 'Output 1 only when the two inputs differ'],
    ['NAND', 'Output 0 only when both inputs are 1'],
    ['OR', 'Output 0 only when both inputs are 0'],
  ],
  sol: 'Each rule can be read off the gate\'s truth table: NOR and OR are opposites, as are NAND and AND; XOR tests for difference.',
}));
Q('ord_tt', ord({
  t: 2, d: 3, c: 'understanding',
  stem: 'Arrange the steps for building the truth table of a Boolean expression in a sensible order.',
  items: ['List every combination of the input values', 'Evaluate the NOT parts', 'Evaluate the AND parts', 'Evaluate the OR parts and record the output column'],
  sol: 'Write the inputs first, then evaluate in the order of precedence: NOT, then AND, then OR.',
}));
Q('ar_nand', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'A NAND gate is called a universal gate.',
  r: 'The output of a NAND gate is 0 only when both of its inputs are 1.',
  sol: 'Both are true, but R does not explain A. NAND is universal because NOT, AND and OR can all be built from NAND gates alone.',
}));
Q('ar_demorgan', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'NOT (A OR B) gives the same output as (NOT A) AND (NOT B) for every input.',
  r: 'De Morgan\'s law says the complement of an OR equals the AND of the complements.',
  sol: `Both are true and R states the law that makes A hold; the two truth-table columns are identical (${T.dm1l.rows.map((r) => r.at(-1)).join('')}).`,
}));
Q('s2_xor', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State when a two-input XOR gate gives output 1 and write its truth table.',
  model: `XOR gives **1 only when its two inputs are different**, and 0 when they are the same.\n\n${tmd('xor', 'A XOR B')}`,
  sol: 'The rule for differing inputs and the four-row table.',
  scheme: [['Rule: 1 when the inputs differ', 1], ['Correct four-row table', 1]],
}));
Q('s2_rows', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined alarm panel in a warehouse has 5 sensors feeding one Boolean expression. How many rows does its truth table need, and why?',
  model: `It needs **${P.pow2['5']} rows**. Each sensor is either 0 or 1, so 5 sensors give 2 × 2 × 2 × 2 × 2 = 2^5 = ${P.pow2['5']} different input combinations, and each combination needs one row.`,
  sol: 'Rows equal 2 raised to the number of inputs.',
  scheme: [[`${P.pow2['5']} rows`, 1], ['Reason: 2 to the power of the inputs', 1]],
}));
Q('s2_universal', short({
  t: 2, d: 4, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why is NAND called a universal gate? Show how a NOT gate is made from it.',
  model: 'Any Boolean function can be built using NAND gates alone, so NAND is **universal**. For NOT, join both inputs of one NAND gate to the same signal S: NAND of S and S is **NOT S**.',
  sol: 'Universality claim and the tied-inputs NOT.',
  scheme: [['Any function can be built from NAND alone', 1], ['NOT from NAND with joined inputs', 1]],
}));
Q('s3_dm_prove', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: [20, 80],
  stem: 'Using a truth table, verify that NOT (A OR B) = (NOT A) AND (NOT B).',
  model: `${tmdMulti([['dm1l', 'NOT (A OR B)'], ['dm1r', '(NOT A) AND (NOT B)']], ['A', 'B'])}\n\nThe last two columns are identical for all four rows, so the two sides are equal.`,
  sol: 'Four rows, both columns computed, and the conclusion.',
  scheme: [['Four input rows listed', 1], ['Both columns correct', 1], ['Conclusion from equal columns', 1]],
}));
Q('s3_simplify', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Simplify (A OR B) AND (A OR NOT B) using Boolean laws and name the law used in each step.',
  model: 'Start with (A OR B) AND (A OR NOT B). A is common to both brackets, so by the **distributive law** this equals A OR (B AND NOT B). By the **complement law** B AND NOT B = 0, giving A OR 0. By the **identity law** A OR 0 = **A**. The whole expression reduces to A.',
  sol: `Distributive, complement and identity laws in turn; a truth table confirms the result equals A (${T.simp.rows.map((r) => r.at(-1)).join('')} against A = ${T.simp.rows.map((r) => r[0]).join('')}).`,
  scheme: [['Distributive law step', 1], ['Complement law step', 1], ['Identity law and result A', 1]],
}));
Q('l_truth', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: [60, 130],
  stem: 'Draw the truth table of X = (NOT A AND B) OR (A AND NOT C) for the inputs A, B and C, and state for how many input combinations X is 1.',
  model: `${tmd('lx', 'X')}\n\nStep 1: list the 8 combinations. Step 2: find each AND term (NOT A AND B, and A AND NOT C). Step 3: OR them. X is 1 for **${ones('lx')}** combinations.`,
  sol: 'Eight correct rows and the count.',
  scheme: [['Eight input rows', 1], ['NOT A AND B column', 1], ['A AND NOT C column', 1], ['X column', 1], [`Count: ${ones('lx')}`, 1]],
}));
Q('l_design', long({
  t: 2, d: 5, c: 'analysis', marks: 5, wl: [60, 130],
  stem: 'The ventilation fan of an imagined mushroom farm in Wayanad runs (F = 1) when the humidity is high (H = 1) and either the door is closed (C = 1) or a manual override is on (M = 1). (i) Write F as a Boolean expression. (ii) Draw its truth table. (iii) Name the gates needed. (iv) State F when H = 1, C = 0 and M = 0.',
  model: `(i) F = H AND (C OR M).\n(ii)\n${tmd('fan', 'F')}\n(iii) One OR gate (for C and M) and one AND gate (for H and the OR output).\n(iv) F = ${val('fan', 1, 0, 0)}: the humidity is high but neither the door is closed nor the override is on.`,
  sol: 'Expression, eight-row table, two gates, and the single row value.',
  scheme: [['Expression F = H AND (C OR M)', 1], ['Eight-row truth table', 2], ['OR gate and AND gate named', 1], [`F = ${val('fan', 1, 0, 0)} with reason`, 1]],
}));
Q('cb_lift', caseQ({
  t: [2], d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read about the lift control of an imagined warehouse and answer the questions. *(Imagined warehouse and rule, written by SOYL for practice.)*',
  passage: `The goods lift in a Surat warehouse moves (M = 1) only when the Go button is pressed (B = 1), the door is closed (D = 1) and the load is **not** over the limit. Let O = 1 mean the load is over the limit. So M = B AND D AND (NOT O).\n\n${tmd('lift', 'M')}`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', fixed: true, key: 'a', stem: 'For how many of the 8 rows is M equal to 1?', opts: [`${ones('lift')}`, '3', '4', '7'], sol: `Only B = 1, D = 1, O = 0 makes all three conditions true, so exactly ${ones('lift')} row gives 1.` })),
    child('b', tf({ t: 2, d: 3, c: 'analysis', ans: true, stem: 'True or false? If the load is over the limit (O = 1), the lift does not move whatever B and D are.', sol: 'NOT O is 0 when O = 1, and an AND with 0 is always 0, so M is 0 in every such row.' })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Use De Morgan\'s law to write NOT M (the lift does not move) as an OR of three terms.', model: 'NOT M = NOT (B AND D AND NOT O) = **(NOT B) OR (NOT D) OR O**. The lift stays still if the button is not pressed, or the door is open, or the load is over the limit.', sol: 'De Morgan\'s law for three terms, with NOT NOT O simplified to O.', scheme: [['Law applied to the three terms', 1], ['NOT NOT O simplified to O', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name the gates needed to build M = B AND D AND (NOT O) and how many of each.', model: 'One **NOT** gate for O and **two AND** gates: one joins B and D, the other joins that result with NOT O. So three gates in all.', sol: 'One NOT and two two-input AND gates.', scheme: [['One NOT gate', 1], ['Two AND gates', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Number systems and encoding
Q('m_b2d', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Meera reads the binary pattern 1001101 from a row of lamps on a panel. What is its decimal value?`,
  opts: [`${P.b2d['1001101']}`, '79', '154', '155'],
  sol: `Add the place values of the 1 bits: 64 + 8 + 4 + 1 = ${P.b2d['1001101']}. The other options come from misreading the places.`,
}));
Q('m_d2b', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The roll number 83 of a student is stored in a register as a binary number. Which pattern is stored?',
  opts: [`${P.d2['83'][0]}`, '1010101', '1001011', '1100011'],
  sol: `Repeated division of 83 by 2 gives remainders that read upward as ${P.d2['83'][0]}. In that pattern 64 + 16 + 2 + 1 = 83.`,
}));
Q('m_hex_d', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A colour strength is written 7C in hexadecimal. What is it in decimal?',
  opts: [`${P.h2d['7C']}`, '76', '112', '172'],
  sol: `7 × 16 = 112 and C stands for 12, so 112 + 12 = ${P.h2d['7C']}.`,
}));
Q('m_o2b', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A permission code in an imagined system is the octal number 345. Written in binary it is',
  opts: [`${P.o2b['345']}`, '11010101', '1110101', '101100101'],
  sol: `Write each octal digit as three bits: 3 = 011, 4 = 100, 5 = 101, giving 011100101. Dropping the leading zero gives ${P.o2b['345']}.`,
}));
Q('m_bits_needed', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A tool store has 200 lockers, and each locker must get a different binary code of the same length. What is the least number of bits per code?',
  opts: [`${P.bitsneed['200']}`, '7', '9', '200'],
  sol: `With 7 bits there are only ${P.pow2['7']} different codes, which is too few. With 8 bits there are ${P.pow2['8']}, which covers 200.`,
}));
Q('m_case', mcq({
  t: 3, d: 3, c: 'application',
  stem: `In ASCII the capital letter 'A' is ${P.ascii.A[0]} and the small letter 'a' is ${P.ascii.a[0]}. If the small letter 'g' has code ${P.ascii.g[0]}, what is the code of the capital letter 'G'?`,
  opts: [`${P.ascii.G[0]}`, '135', '73', '65'],
  sol: `Small and capital letters differ by 32 (${P.ascii.a[0]} − ${P.ascii.A[0]}), so ${P.ascii.g[0]} − 32 = ${P.ascii.G[0]}.`,
}));
Q('m_utf8_len', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Ananya types the rupee sign in a message. How many bytes does this one character take in UTF-8?',
  opts: [`${P.enc['₹'].utf8n}`, '1', '2', '4'],
  sol: `The rupee sign has code point ${P.enc['₹'].cp}, which lies between U+0800 and U+FFFF, so UTF-8 uses ${P.enc['₹'].utf8n} bytes (${P.enc['₹'].utf8}).`,
}));
Q('m_frac', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The decimal fraction 0.375 is written in binary as',
  opts: [`${P.frac['0.375'].text}`, '0.101', '0.110', '0.0111'],
  sol: `Multiply the fraction part by 2 repeatedly and read the whole-number parts downward: 0.75 (0), 1.5 (1), 1.0 (1), giving ${P.frac['0.375'].text}.`,
}));
Q('m_unicode', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which problem was Unicode created to solve?',
  opts: ['Giving every character of every script its own unique code', 'Making keyboards cheaper to build', 'Compressing photographs', 'Speeding up the CPU clock'],
  sol: 'Many older encodings clashed for different scripts. Unicode assigns one code point to each character of all major languages. The other options are unrelated to character codes.',
}));
Q('m_ascii', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Standard ASCII uses how many bits for each character?',
  opts: ['7', '8', '16', '32'],
  sol: `7 bits give ${P.pow2['7']} codes, enough for English letters, digits, punctuation and control codes. 8 bits is extended ASCII and ISCII.`,
}));
Q('tf_ascii', tf({
  t: 3, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? The first 128 Unicode code points are the same as the 128 ASCII codes.',
  sol: 'Unicode was built to include ASCII unchanged, so U+0041 is the letter A just as ASCII 65 is.',
}));
Q('fb_bases', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The binary, octal and hexadecimal number systems have base ___, ___ and ___ respectively.',
  acc: [['2', 'two'], ['8', 'eight'], ['16', 'sixteen']],
  sol: 'Binary is base 2, octal is base 8 and hexadecimal is base 16.',
}));
Q('match_enc', match({
  t: 3, d: 2, c: 'recall',
  stem: 'Match each encoding with its description.',
  pairs: [
    ['ASCII', '7-bit code for English letters, digits and symbols'],
    ['ISCII', '8-bit code for the scripts used in India'],
    ['UTF-8', 'Variable length, 1 to 4 bytes per character'],
    ['UTF-32', 'Fixed length, 4 bytes per character'],
  ],
  sol: 'ASCII has 7 bits, ISCII 8 bits for Indian scripts, UTF-8 varies between 1 and 4 bytes, and UTF-32 is fixed at 4.',
}));
Q('ar_utf', ar({
  t: 3, d: 4, c: 'analysis', key: 'c',
  a: 'In UTF-8 the capital letter A takes one byte.',
  r: 'UTF-8 uses exactly 4 bytes for every character.',
  sol: `A is true: A is code ${P.ascii.A[0]}, stored in one byte. R is false, because UTF-8 length varies from 1 to 4 bytes.`,
}));

// Code-output items (Python 3, executed).
Q('co_bin', co({
  pre: 'Dhruv checks his hand conversion of his book count with the program below. What does it print?',
  t: 3, d: 2, c: 'understanding', marks: 2,
  code: "books = 45\nprint(bin(books))\nprint(bin(books)[2:])\nprint(int('101101', 2) == books)",
  sol: 'bin() returns a string starting with the prefix 0b, slicing from index 2 removes it, and int() with base 2 turns 101101 back into 45, so the comparison is True.',
}));
Q('co_ord', co({
  pre: 'Sneha tests letter codes with a loop over the two-letter word shown. What is printed?',
  t: 3, d: 3, c: 'understanding', marks: 2,
  code: "for ch in 'Ab':\n    print(ord(ch), hex(ord(ch)))",
  sol: 'ord() gives the code of a character, and hex() writes it in hexadecimal with the prefix 0x. The capital A is 65 = 0x41 and the small b is 98 = 0x62.',
}));
Q('co_case', co({
  pre: 'Rohit turns a small letter into a capital by arithmetic on its code. Predict what his program prints.',
  t: 3, d: 3, c: 'application', marks: 2,
  code: "letter = 'm'\nprint(ord(letter))\nprint(chr(ord(letter) - 32))",
  sol: 'The code of m is 109; subtracting 32 moves from the small to the capital letter, and chr() converts 77 back to a character.',
}));
Q('co_utf', co({
  pre: 'Pooja measures a price label first in characters and then in UTF-8 bytes. What does the program print?',
  t: 3, d: 4, c: 'analysis', marks: 2,
  code: "label = '₹50'\nprint(len(label), len(label.encode('utf-8')))",
  sol: 'The label has 3 characters, but the rupee sign needs 3 bytes in UTF-8 and each digit 1 byte, so 5 bytes in all.',
}));

const errCode = "reading = '1012'\nprint(int(reading, 2))";
const errFix = "reading = '1010'\nprint(int(reading, 2))";
Q('s2_err', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: [20, 60],
  stem: `Tanvi's program reads a binary string from a sensor but stops with an error. Find the error, say why it occurs and correct the line.\n\n\`\`\`python\n${errCode}\n\`\`\``,
  model: `**Error:** \`${pyErr(errCode)}\`. A binary string may contain only the digits 0 and 1, and the 2 is not allowed in base 2.\n\n**Corrected code:**\n\n\`\`\`python\n${errFix}\n\`\`\`\n\nIt prints ${ic(pyOut(errFix))}.`,
  sol: 'Identify the ValueError, give the reason (digit 2 in a binary string) and fix the data.',
  scheme: [['Error and reason', 1], ['Corrected line', 1]],
}));
Q('s2_ascii_hindi', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A teacher in Nagpur finds that a file of Hindi poems turns into question marks when opened in a program that supports only ASCII. Explain why, and name an encoding that would store the text correctly.',
  model: 'ASCII has only **128 codes** (7 bits) for English letters, digits and symbols, so it has **no codes for Devanagari characters**. **Unicode**, for example in its UTF-8 form, has code points for Hindi and can store the poems.',
  sol: 'ASCII is too small; Unicode (UTF-8) has code points for Devanagari.',
  scheme: [['ASCII has no codes for Hindi', 1], ['Unicode or UTF-8 named', 1]],
}));
Q('s2_hex_why', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Why do programmers prefer hexadecimal to binary when writing memory addresses? Convert the binary number 11111010 to hexadecimal.',
  model: `One hexadecimal digit stands for exactly **4 bits**, so it is much shorter and easier to read and copy. Grouping 11111010 as 1111 and 1010 gives F and A, so the number is **${P.b2oh['11111010'][1]}** in hexadecimal.`,
  sol: 'Compactness through 4-bit groups, and the conversion to FA.',
  scheme: [['Reason: 4 bits per hex digit', 1], [`Conversion: ${P.b2oh['11111010'][1]}`, 1]],
}));
Q('s2_iscii', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is ISCII? State its size in bits and the scripts it was designed for.',
  model: 'ISCII (Indian Script Code for Information Interchange) is an **8-bit** encoding, with 256 codes. Its lower half is the same as ASCII, and its upper half holds characters of the **Indian scripts**, such as Devanagari, Tamil and Bengali.',
  sol: 'Eight bits and Indian scripts, plus the ASCII lower half.',
  scheme: [['8-bit code', 1], ['Designed for Indian scripts', 1]],
}));
Q('s3_conv', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: [30, 90],
  stem: 'Convert the decimal number 156 into binary, octal and hexadecimal, showing the method for any one of them.',
  model: `Divide 156 by 2 repeatedly and read the remainders upward: **${P.d2['156'][0]}**. Grouping the bits in threes from the right gives octal **${P.d2['156'][1]}**; grouping them in fours gives hexadecimal **${P.d2['156'][2]}**.`,
  sol: 'Binary by repeated division, then grouping in 3s and 4s.',
  scheme: [['Binary with method', 1], ['Octal', 1], ['Hexadecimal', 1]],
}));
Q('s3_encode', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `A school notice in Hindi carries the single word भारत. Giving the number of characters, state how many bytes it needs in UTF-8 and in UTF-32, and why the two figures differ.`,
  model: `The word has **${P.words['भारत'].chars} characters**. In UTF-8 it takes **${P.words['भारत'].utf8n} bytes**, because each Devanagari character lies in the range that needs 3 bytes (${P.words['भारत'].chars} × 3). In UTF-32 it takes **${P.words['भारत'].utf32n} bytes**, because every character uses a fixed 4 bytes (${P.words['भारत'].chars} × 4). The figures differ because UTF-8 has a variable length and UTF-32 does not.`,
  sol: 'Four characters; 3 bytes each in UTF-8, 4 bytes each in UTF-32.',
  scheme: [['Character count', 1], ['UTF-8 bytes with reason', 1], ['UTF-32 bytes with reason', 1]],
}));
Q('l_conv', long({
  t: 3, d: 4, c: 'application', marks: 5, wl: [60, 140],
  stem: `Solve with working: (i) Convert decimal 250 to binary. (ii) Convert that binary number to hexadecimal. (iii) Convert hexadecimal 2B6 to decimal. (iv) Convert decimal 7.25 to binary. (v) Convert octal 725 to binary.`,
  model: `Working for each part: (i) 250 = **${P.d2['250'][0]}** (repeated division by 2).\n(ii) ${bitsLine(P.d2['250'][0])} = **${P.d2['250'][2]}**.\n(iii) 2 × 256 + 11 × 16 + 6 = **${P.h2d['2B6']}**.\n(iv) 7 = 111; 0.25 → 0.01, so **${P.frac['7.25'].text}**.\n(v) Octal digits 7, 2, 5 become 111, 010, 101, so **${P.o2b['725']}**.`,
  sol: 'Five conversions, one mark each.',
  scheme: [['(i) binary', 1], ['(ii) hexadecimal', 1], ['(iii) decimal', 1], ['(iv) binary fraction', 1], ['(v) octal to binary', 1]],
}));
Q('l_enc', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain why one encoding scheme was not enough. Describe ASCII, ISCII and Unicode, and show how UTF-8 and UTF-32 store the letter A and the rupee sign.',
  model: `1. **ASCII**: 7 bits, ${P.pow2['7']} codes for English only.\n2. **ISCII**: 8 bits, ASCII in the lower half and Indian scripts above.\n3. **Unicode**: one unique code point for each character of every script.\n4. **UTF-8**: 1 to 4 bytes per character; A takes ${P.enc.A.utf8n} byte (${P.enc.A.utf8}), the rupee sign ${P.enc['₹'].utf8n} bytes (${P.enc['₹'].utf8}).\n5. **UTF-32**: always 4 bytes; A is ${P.enc.A.utf32} and the rupee sign is ${P.enc['₹'].utf32}.`,
  sol: 'Need for several encodings, three schemes, and the byte counts of both forms.',
  scheme: [['ASCII', 1], ['ISCII', 1], ['Unicode', 1], ['UTF-8 bytes for the two characters', 1], ['UTF-32 bytes for the two characters', 1]],
}));
Q('cb_colour', caseQ({
  t: [3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about an imagined web page and answer the questions. *(Imagined designer and colour, written by SOYL for practice.)*',
  passage: `A web designer in Jaipur writes the background colour of a page as the hexadecimal code **1A8FE3**. The three pairs 1A, 8F and E3 give the red, green and blue strengths, each from 0 to 255.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'c', stem: 'What is the red strength 1A in decimal?', opts: ['17', '16', `${P.h2d['1A']}`, '11'], sol: `1 × 16 + 10 = ${P.h2d['1A']}, because A stands for 10.` })),
    child('b', tf({ t: 3, d: 3, c: 'understanding', ans: true, stem: 'True or false? Each hexadecimal digit can be written with exactly 4 binary digits.', sol: 'Hexadecimal has 16 values and 4 bits give 16 patterns, so a digit and a 4-bit group match one to one.' })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Convert the green strength 8F to decimal and to an 8-bit binary number.', model: `8F = 8 × 16 + 15 = **${P.h2d['8F']}**. In binary, 8 = 1000 and F = 1111, so the 8-bit number is **${P.h2b['8F']}**.`, sol: 'Decimal by place values; binary by replacing each digit with 4 bits.', scheme: [['Decimal', 1], ['8-bit binary', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The colour could be written with 24 binary digits instead. Give one reason why the hexadecimal form is preferred.', model: 'The hexadecimal code needs only **6 digits** instead of 24 bits, because each digit stands for 4 bits. It is shorter, easier to read and much less likely to be mistyped.', sol: 'Shorter and safer: 6 characters instead of 24.', scheme: [['Shorter by a factor of 4', 1], ['Easier to read and copy', 1]] }),
    ]),
  ],
}));
Q('cb_hindi', caseQ({
  t: [3], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about an imagined library app and answer the questions. *(Imagined library and app, written by SOYL for practice.)*',
  passage: `Lakshmi's library app in Pune stores book titles in English and in Hindi. Her developer says the old ASCII-only code could not store the Hindi title **नमस्ते** (${P.words['नमस्ते'].chars} characters) and moved the app to UTF-8.`,
  parts: [
    child('a', mcq({ t: 3, d: 3, c: 'application', fixed: true, key: 'd', stem: 'In UTF-8, how many bytes does the title नमस्ते take (each of its characters takes 3 bytes)?', opts: ['6', '12', '24', `${P.words['नमस्ते'].utf8n}`], sol: `${P.words['नमस्ते'].chars} characters × 3 bytes = ${P.words['नमस्ते'].utf8n} bytes.` })),
    child('b', mcq({ t: 3, d: 3, c: 'application', fixed: true, key: 'b', stem: 'In UTF-32, the same title takes', opts: ['18 bytes', `${P.words['नमस्ते'].utf32n} bytes`, '6 bytes', '12 bytes'], sol: `UTF-32 uses a fixed 4 bytes per character, and ${P.words['नमस्ते'].chars} × 4 = ${P.words['नमस्ते'].utf32n} bytes.` })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Most of Lakshmi\'s titles are in English. Why is UTF-8 a better choice than UTF-32 for her data?', model: `In UTF-8 each English letter takes only **1 byte**, but in UTF-32 it takes **4 bytes**. For mostly English titles UTF-8 therefore uses far less storage, and it still holds Hindi characters when needed.`, sol: 'Compare 1 byte with 4 bytes per English letter.', scheme: [['1 byte against 4 bytes', 1], ['Conclusion about storage', 1]] }), [
      short({ t: 3, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Why could the old ASCII-only system not store the Hindi title?', model: 'ASCII has only **128 codes** and none for Devanagari characters, so the Hindi letters have no code to be stored with. Unicode gives each of them a code point.', sol: 'ASCII has no Devanagari codes.', scheme: [['128 codes only', 1], ['No Devanagari codes; Unicode fixes it', 1]] }),
    ]),
  ],
}));

assert.equal(P.words['नमस्ते'].utf8n, 18);
assert.equal(P.words['नमस्ते'].utf32n, 24);
assert.equal(P.words['भारत'].utf8n, 12);
assert.equal(P.enc['₹'].utf8n, 3);
assert.equal(P.enc.A.utf8n, 1);
assert.equal(P.enc['😀'].utf8n, 4);
assert.equal(ones('lift'), 1);
