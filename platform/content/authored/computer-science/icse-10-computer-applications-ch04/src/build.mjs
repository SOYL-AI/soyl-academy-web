// Build ICSE 10 Computer Applications ch04 "Revision: Conditional Constructs". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch04/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch04', 'computer-science');
useJavaCache(SRC);
const A = await import('./q_a.mjs');
const B = await import('./q_b.mjs');
const C = await import('./q_c.mjs');
const { code, F, ic, ev, out, mustCompile, mustFail, expect } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

const nothing = (s) => (s === '' ? '(nothing is printed)' : s);
const one = (s) => nothing(s).split('\n').join(' / ');

// ---------------------------------------------------------------- facts the narration states in words; stop if Java disagrees
expect(ev('3400 >= 5000'), 'false', 'ladder test 1');
expect(ev('3400 >= 3000'), 'true', 'ladder test 2');
expect(out(A.shopLadder(3400)), '10.0', 'discount for 3400');
expect(out(A.cDangle), 'Retail\nDone', 'dangling else output');
expect(out(A.cSemi), 'Pass', 'semicolon after if');
expect(out(A.cNoBraces), 'Checked', 'no braces');
expect(out(B.swFall(2)), 'two\nthree', 'fall-through from 2');
expect(out(B.swFall(9)), 'many', 'default');
expect(out(B.swVowel('e')), 'Vowel', 'grouped vowel');
expect(out(B.swPoints(2)), '40', 'points for tier 2');
expect(out(C.cExit(9)), 'Start\nInvalid', 'exit output');
expect(out(C.cMenuCalc, '3 12 5'), 'Product = 60\nBye', 'menu calculator');
expect(out(A.nestScholar(82, 420000)), 'Half', 'nested scholarship');
expect(out(C.cExitScan, '-4'), 'Reading\nNegative', 'exit with scanner');
mustCompile(code('final int LIMIT = 2;', 'int n = 2;', 'switch (n) {', '    case LIMIT: System.out.println("two"); break;', '}'), 'final constant as label');

// ---------------------------------------------------------------- SVG helpers
const term = (s, x, y, label, w = 90) => { s.rect(x - w / 2, y - 17, w, 34, { rx: 17, fill: 'fill', color: 'accent', sw: 1.6 }); s.text(x, y, label, { size: 14, bold: true }); };
const proc = (s, x, y, w, h, label, o = {}) => { s.rect(x - w / 2, y - h / 2, w, h, { rx: 6, fill: 'fill', color: o.color ?? 'accent', sw: 1.6, dash: o.dash }); s.text(x, y, label, { size: 13, muted: o.muted }); };
const dec = (s, x, y, w, h, label) => { s.polygon([[x, y - h / 2], [x + w / 2, y], [x, y + h / 2], [x - w / 2, y]], { fill: 'fill', color: 'accent', sw: 1.8 }); s.text(x, y, label, { size: 13 }); };

// ---------------------------------------------------------------- visuals: Part 1 (if constructs)
const vRoute1 = flow('LR', ['if', 'if-else', 'if-else-if ladder', 'Nested if', 'Dangling else', 'Common mistakes'], 'Route map of Part 1: if, if-else, if-else-if ladder, nested if, dangling else and common mistakes', 'Part 1 at a glance');
const vConstructs = table(
  ['Construct', 'Branches', 'Use it to'],
  [
    [ic('if'), 'one', 'run a block only when a condition is true'],
    [ic('if-else'), 'two', 'choose between two blocks'],
    ['if-else-if ladder', 'three or more', 'choose one block out of several alternatives, testing in order'],
    ['nested if', 'depends', 'take a second decision only after the first one'],
  ],
  'Table of the four conditional constructs: if has one branch, if-else has two, the if-else-if ladder has three or more and nested if places a decision inside another',
);
const cFever = (t) => code(`int temp = ${t};`, 'if (temp > 38)', '    System.out.println("Fever");');
const vIfRun = table(
  ['temp', `Condition ${ic('temp > 38')}`, 'Output'],
  [39, 36].map((t) => [String(t), ev(`${t} > 38`), ic(nothing(out(cFever(t))))]),
  `Table of two runs of the if statement: temp 39 makes the condition ${ev('39 > 38')} and prints ${out(cFever(39))}; temp 36 makes it ${ev('36 > 38')} and prints nothing`,
  'When the condition is false, the statement is simply skipped.',
);
const vIfElse = (() => {
  const s = new Svg(560, 330);
  term(s, 280, 24, 'Start');
  s.arrow(280, 41, 280, 62, { sw: 1.6 });
  dec(s, 280, 100, 190, 76, 'condition?');
  s.line(375, 100, 455, 100, { sw: 1.6 });
  s.arrow(455, 100, 455, 172, { sw: 1.6 });
  s.text(415, 88, 'true', { size: 13, bold: true });
  s.line(185, 100, 105, 100, { sw: 1.6 });
  s.arrow(105, 100, 105, 172, { sw: 1.6 });
  s.text(145, 88, 'false', { size: 13, bold: true });
  proc(s, 455, 195, 190, 44, 'Statements of if block');
  proc(s, 105, 195, 190, 44, 'Statements of else block');
  s.line(105, 217, 105, 262, { sw: 1.6 });
  s.line(455, 217, 455, 262, { sw: 1.6 });
  s.line(105, 262, 455, 262, { sw: 1.6 });
  s.arrow(280, 262, 280, 284, { sw: 1.6 });
  term(s, 280, 302, 'Next statement', 150);
  return s.visual('Flowchart of if-else: from Start the condition is tested; if true the statements of the if block run, if false the statements of the else block run, and both paths join and continue with the next statement. A plain if is the same chart without the else block', 'if-else: exactly one of the two blocks runs. A plain if has no else block.');
})();
const ex1Rows = [56, 31].map((m) => [String(m), ev(`${m} >= 40`), ev(`${m} >= 40`) === 'true' ? 'if block' : 'else block', ic(out(`int marks = ${m};\n${A.stmtPF}`))]);
const vEx1 = table(
  ['marks', `${ic('marks >= 40')} is`, 'Block that runs', 'Output'],
  ex1Rows,
  `Trace table of the Pass or Fail statement: marks 56 makes the condition true, so the if block runs and prints ${out(`int marks = 56;\n${A.stmtPF}`)}; marks 31 makes it false, so the else block runs and prints ${out(`int marks = 31;\n${A.stmtPF}`)}`,
);
const vBraces = table(
  ['Version', 'Statements controlled by the if', 'Output for n = 4'],
  [
    ['Without braces', 'only the first statement after the condition', ic(nothing(out(A.cNoBraces)))],
    ['With braces', 'every statement inside the braces', ic(nothing(out(A.cBraces)))],
  ],
  `Table comparing an if without braces, which controls only one statement and prints ${out(A.cNoBraces)}, with an if with braces, which controls both statements and prints nothing when the condition is false`,
  'Indentation does not matter to Java; braces do.',
);
const vLadder = (() => {
  const s = new Svg(600, 470);
  term(s, 170, 24, 'Start');
  s.arrow(170, 41, 170, 66, { sw: 1.6 });
  const ys = [100, 200, 300];
  ys.forEach((y, i) => {
    dec(s, 170, y, 210, 64, `condition ${i + 1}?`);
    s.arrow(275, y, 345, y, { sw: 1.6 });
    s.text(310, y - 12, 'true', { size: 13, bold: true });
    proc(s, 440, y, 190, 36, `Block ${i + 1}`);
    s.line(535, y, 575, y, { sw: 1.6 });
    if (i < 2) s.arrow(170, y + 32, 170, y + 68, { sw: 1.6 });
    if (i < 2) s.text(190, y + 50, 'false', { size: 13, bold: true, anchor: 'start' });
  });
  s.arrow(170, 332, 170, 372, { sw: 1.6 });
  s.text(190, 352, 'false', { size: 13, bold: true, anchor: 'start' });
  proc(s, 170, 390, 190, 36, 'else block');
  s.line(575, 100, 575, 440, { sw: 1.6 });
  s.line(170, 408, 170, 440, { sw: 1.6 });
  s.arrow(170, 440, 265, 440, { sw: 1.6 });
  s.arrow(575, 440, 415, 440, { sw: 1.6 });
  term(s, 340, 440, 'Next statement', 150);
  return s.visual('Flowchart of an if-else-if ladder with three conditions: each condition is tested in turn from the top; the first true condition runs its block and the control goes to the next statement; if all three are false the else block runs', 'Ladder: conditions are tested from the top; the first true one wins.');
})();
const conds = [5000, 3000, 1000];
const ladderRow = (b) => {
  const tested = [];
  for (const c of conds) {
    const r = ev(`${b} >= ${c}`);
    tested.push(`${c}: ${r}`);
    if (r === 'true') break;
  }
  return [String(b), tested.join(', '), ic(out(A.shopLadder(b)))];
};
const ladderBills = [5200, 3400, 1500, 600];
const vEx2 = table(
  ['bill', 'Tests made (bill >= limit)', 'discount printed'],
  ladderBills.map(ladderRow),
  `Trace table of the discount ladder: ${ladderBills.map((b) => `bill ${b} prints ${out(A.shopLadder(b))}`).join('; ')}; the tests stop at the first true one`,
  'The remaining tests of the ladder are never made.',
);
const vNest = (() => {
  const s = new Svg(620, 340);
  dec(s, 300, 46, 200, 72, 'marks >= 75?');
  s.line(200, 46, 90, 46, { sw: 1.6 });
  s.arrow(90, 46, 90, 252, { sw: 1.6 });
  s.text(145, 34, 'false', { size: 13, bold: true });
  proc(s, 90, 270, 130, 36, 'None');
  s.line(400, 46, 470, 46, { sw: 1.6 });
  s.arrow(470, 46, 470, 112, { sw: 1.6 });
  s.text(435, 34, 'true', { size: 13, bold: true });
  dec(s, 470, 150, 240, 76, 'income <= 300000?');
  s.line(350, 150, 300, 150, { sw: 1.6 });
  s.arrow(300, 150, 300, 252, { sw: 1.6 });
  s.text(325, 138, 'false', { size: 13, bold: true });
  proc(s, 300, 270, 130, 36, 'Half');
  s.line(590, 150, 590, 200, { sw: 1.6 });
  s.arrow(590, 200, 590, 252, { sw: 1.6 });
  s.text(560, 138, 'true', { size: 13, bold: true });
  proc(s, 560, 270, 130, 36, 'Full');
  s.text(310, 320, 'The second test is made only when the first is true', { size: 13, muted: true });
  return s.visual('Decision tree of a nested if: the outer test is marks at least 75; if false the result is None; if true a second test, income at most 300000, gives Full when true and Half when false', 'Nested if: the inner decision depends on the outer one.');
})();
const nsRuns = [[82, 250000], [82, 420000], [60, 100000]];
const vEx3 = table(
  ['marks', 'income', 'Outer test', 'Inner test', 'Output'],
  nsRuns.map(([m, i]) => [String(m), String(i), ev(`${m} >= 75`), ev(`${m} >= 75`) === 'true' ? ev(`${i} <= 300000`) : 'not made', ic(out(A.nestScholar(m, i)))]),
  `Trace table of the nested if: ${nsRuns.map(([m, i]) => `marks ${m} and income ${i} print ${out(A.nestScholar(m, i))}`).join('; ')}`,
);
const cDangleBraced = code('int stock = 40, order = 12;', 'if (stock > 20) {', '    if (order > 50)', '        System.out.println("Bulk");', '} else', '    System.out.println("Retail");', 'System.out.println("Done");');
const vDangle = table(
  ['Program', 'The else belongs to', 'Output for stock 40, order 12'],
  [
    ['indented under the first if, no braces', `the nearest if: ${ic('if (order > 50)')}`, ic(one(out(A.cDangle)))],
    ['inner if closed by braces', `the first if: ${ic('if (stock > 20)')}`, ic(one(out(cDangleBraced)))],
  ],
  `Table of the dangling else: without braces the else belongs to the inner if and the program prints ${one(out(A.cDangle))}; with braces closing the inner if, the else belongs to the first if and the program prints ${one(out(cDangleBraced))}`,
  'Java pairs an else with the nearest unmatched if, whatever the indentation shows.',
);
const cSemiOk = (m) => code(`int marks = ${m};`, 'if (marks >= 33)', '    System.out.println("Pass");');
const cSemiBad = (m) => code(`int marks = ${m};`, 'if (marks >= 33);', '    System.out.println("Pass");');
const vSemi = table(
  ['marks', `With a semicolon ${ic('if (marks >= 33);')}`, `Without it ${ic('if (marks >= 33)')}`],
  [28, 45].map((m) => [String(m), ic(out(cSemiBad(m))), ic(nothing(out(cSemiOk(m))))]),
  `Table of the stray semicolon: with the semicolon the word Pass is printed for marks 28 and for 45; without it the word is printed only for 45`,
  'A semicolon after the condition makes an empty statement the body of the if.',
);
const errA = mustFail(A.cAssignInt, 'int assignment');
const vEq = table(
  ['Code', 'Result'],
  [
    [ic('int count = 4;  if (count = 4)'), `compile-time error: ${errA}`],
    [ic('boolean open = false;  if (open = true)'), `compiles; prints ${ic(out(A.cAssignBool))} (a logical error)`],
    [ic('int count = 4;  if (count == 4)'), `correct: prints ${ic(out(code('int count = 4;', 'if (count == 4)', '    System.out.println("Four");')))}`],
  ],
  `Table of the equals sign mistake: with an int, the single equals sign gives the compile-time error ${errA}; with a boolean variable it compiles and prints Open, a logical error; the double equals sign compares correctly`,
);
const lg = 'int a = 6, b = -2, c = 9;';
const lgExprs = ['a > 0 && b > 0', 'a > 0 || b > 0', '!(a > 5)', 'a < 0 && b > 0 || c > 0', '"Delhi".equals("Delhi")'];
const lgVals = lgExprs.map((e) => ev(e, lg));
const vLogic = table(
  ['Condition (a = 6, b = -2, c = 9)', 'Value'],
  lgExprs.map((e, i) => [ic(e), lgVals[i]]),
  `Table of the values of five conditions: ${lgExprs.map((e, i) => `${e} is ${lgVals[i]}`).join('; ')}`,
  'Strings are compared with equals, not ==. Chapter 13 studies Strings in detail.',
);
const vSummary1 = table(
  ['Topic', 'Remember'],
  [
    ['if, if-else', 'condition must be boolean; braces for more than one statement'],
    ['ladder', 'conditions tested from the top; first true one wins; order matters'],
    ['nested if', 'inner test made only after the outer one'],
    ['dangling else', 'else pairs with the nearest unmatched if'],
    ['semicolon after if', 'empty statement: logical error'],
    ['= and ==', 'assignment against comparison'],
  ],
  'Summary table of Part 1: boolean conditions and braces, ladder order, nested if, the dangling else, the stray semicolon and the difference between assignment and comparison',
);

// ---------------------------------------------------------------- visuals: Part 2 (switch, menus)
const vRoute2 = flow('LR', ['switch syntax', 'break and default', 'Fall-through', 'Rules for case labels', 'switch or ladder', 'Menu-driven programs', 'System.exit(0)'], 'Route map of Part 2: switch syntax, break and default, fall-through, rules for case labels, switch or ladder, menu-driven programs and System.exit(0)', 'Part 2 at a glance');
const vSyntax = table(
  ['Part', 'Meaning'],
  [
    [ic('switch (selector)'), 'the expression whose value is compared; int, char or String'],
    [ic('case value:'), 'a label with a constant; runs when selector equals it'],
    [ic('break;'), 'leaves the switch'],
    [ic('default:'), 'runs when no case matches; optional'],
    [ic('{ ... }'), 'braces enclose all the cases'],
  ],
  'Table of the parts of a switch statement: the selector, case labels with constants, break, default and the braces',
);
const errBool = mustFail(code('boolean b = true;', 'switch (b) {', '    case 1: break;', '}'), 'switch on boolean');
const errDoubleSel = mustFail(code('double d = 2.5;', 'switch (d) {', '    case 1: break;', '}'), 'switch on double');
const errLongSel = mustFail(code('long n = 2;', 'switch (n) {', '    case 1: break;', '}'), 'switch on long');
mustCompile(code('char c = \'b\';', 'switch (c) {', "    case 'b': System.out.println(c); break;", '}'), 'char selector');
mustCompile(code('String s = "go";', 'switch (s) {', '    case "go": System.out.println(s); break;', '}'), 'String selector');
const vSelectors = table(
  ['Selector type', 'Allowed?', 'What the compiler says'],
  [
    [ic('int'), 'yes', 'accepted'],
    [ic('char'), 'yes', 'accepted'],
    [ic('String'), 'yes (from Java 7)', 'accepted'],
    [ic('double'), 'no', errDoubleSel],
    [ic('long'), 'no', errLongSel],
    [ic('boolean'), 'no', errBool],
  ],
  `Table of selector types: int, char and String are accepted; double, long and boolean are rejected with the messages ${errDoubleSel}, ${errLongSel} and ${errBool}`,
);
const dayRuns = [2, 3, 7];
const vEx1b = table(
  ['day', 'Matching label', 'Output'],
  dayRuns.map((d) => [String(d), d === 7 ? 'none, so default' : `case ${d}`, ic(out(B.swDay(d)))]),
  `Trace table of the day program: ${dayRuns.map((d) => `day ${d} prints ${out(B.swDay(d))}`).join('; ')}`,
);
const vBreak = flow('LR', ['Selector is evaluated', 'Matching case is found', 'Its statements run', 'break is reached', 'Control leaves the switch'], 'Flow of a switch with break: the selector is evaluated, the matching case is found, its statements run, break is reached and control leaves the switch', 'With break, only the matching case runs.');
const vFall = (() => {
  const s = new Svg(660, 380);
  proc(s, 75, 160, 110, 40, 'n is 2');
  s.arrow(130, 160, 228, 160, { sw: 1.8, color: 'accent' });
  s.text(180, 146, 'jump', { size: 13, bold: true });
  proc(s, 330, 90, 200, 40, 'case 1: print one', { muted: true, color: 'muted', dash: true });
  proc(s, 330, 160, 200, 40, 'case 2: print two');
  proc(s, 330, 230, 200, 40, 'case 3: print three, break');
  proc(s, 330, 300, 200, 40, 'default: print many', { muted: true, color: 'muted', dash: true });
  s.arrow(330, 180, 330, 208, { sw: 1.8, color: 'accent' });
  s.text(346, 194, 'falls through (no break)', { size: 12, anchor: 'start' });
  s.arrow(430, 230, 530, 230, { sw: 1.8, color: 'accent' });
  s.text(480, 216, 'break', { size: 13, bold: true });
  proc(s, 590, 230, 100, 40, 'Leave switch');
  s.text(330, 345, `Output: ${out(B.swFall(2)).split('\n').join(', ')}`, { size: 13, bold: true });
  s.text(330, 366, 'Case 1 and default are skipped (dashed boxes)', { size: 12, muted: true });
  return s.visual('Diagram of fall-through for n equal to 2: control jumps to case 2, prints two, has no break so it falls through to case 3, prints three and meets break, which leaves the switch; case 1 and default are skipped', 'Fall-through: after the matching label, execution continues until a break.');
})();
const fallNs = [1, 2, 3, 9];
const fallWhy = ['starts at case 1, no break until case 3', 'starts at case 2, falls into case 3', 'case 3 and its break', 'no match: default'];
const vEx2b = table(
  ['n', 'Output (joined by /)', 'Why'],
  fallNs.map((n, i) => [String(n), ic(one(out(B.swFall(n)))), fallWhy[i]]),
  `Trace table of the fall-through program: ${fallNs.map((n) => `n ${n} prints ${one(out(B.swFall(n)))}`).join('; ')}`,
);
const vowels = ['a', 'e', 'k'];
const vGroup = table(
  ['letter', 'Output'],
  vowels.map((c) => [ic(`'${c}'`), ic(out(B.swVowel(c)))]),
  `Table of the grouped cases: the letters a and e print ${out(B.swVowel('a'))}, and k prints ${out(B.swVowel('k'))}`,
  'Several labels can share one block by leaving out break between them.',
);
const errCaseVar = mustFail(code('int n = 3;', 'int first = 1;', 'switch (n) {', '    case first: break;', '}'), 'case variable');
const errDup = mustFail(code('int n = 2;', 'switch (n) {', '    case 1: break;', '    case 1: break;', '}'), 'duplicate');
const errStrLabel = mustFail(code('int n = 3;', 'switch (n) {', '    case "five": break;', '}'), 'case string');
const vRules = table(
  ['Rule', 'Breaking it', 'Compiler message'],
  [
    ['Label must be a constant', ic('case first:  (first is a variable)'), errCaseVar],
    ['Labels must be unique', ic('case 1:  written twice'), errDup],
    ['Label type must suit the selector', ic('case "five":  with an int selector'), errStrLabel],
  ],
  `Table of the rules for case labels and the compiler messages when each is broken: ${errCaseVar}; ${errDup}; ${errStrLabel}`,
  'A final variable with a constant value is accepted as a label.',
);
const vSwIf = table(
  ['', 'switch', 'if-else-if ladder'],
  [
    ['Tests', 'equality of one selector with constants', 'any boolean condition, including ranges'],
    ['Selector type', 'int, char, String', 'no restriction'],
    ['Branch taken', 'continues into next case unless break', 'only one branch ever runs'],
    ['Best for', 'a fixed list of exact values', 'ranges and complex conditions'],
  ],
  'Comparison table of switch and the if-else-if ladder: what they test, selector type, which branch is taken and what each is best for',
);
const gRows = ['A', 'B', 'Z'];
const vEx3b = table(
  ['grade', 'Ladder prints', 'Switch prints'],
  gRows.map((g) => [ic(`'${g}'`), ic(out(code(`char grade = '${g}';`, "if (grade == 'A')", '    System.out.println("Excellent");', "else if (grade == 'B')", '    System.out.println("Good");', 'else', '    System.out.println("Work harder");'))), ic(out(code(`char grade = '${g}';`, 'switch (grade) {', "    case 'A': System.out.println(\"Excellent\"); break;", "    case 'B': System.out.println(\"Good\"); break;", '    default: System.out.println("Work harder");', '}')))]),
  'Table showing that the ladder and the switch print the same text for the grades A, B and Z',
);
const cLadderG = code("if (grade == 'A')", '    System.out.println("Excellent");', "else if (grade == 'B')", '    System.out.println("Good");', 'else', '    System.out.println("Work harder");');
const cSwitchG = code('switch (grade) {', "    case 'A': System.out.println(\"Excellent\"); break;", "    case 'B': System.out.println(\"Good\"); break;", '    default: System.out.println("Work harder");', '}');
const vMenu = (() => {
  const s = new Svg(620, 450);
  term(s, 310, 22, 'Start');
  s.arrow(310, 39, 310, 60, { sw: 1.6 });
  proc(s, 310, 80, 220, 36, 'Display the menu');
  s.arrow(310, 98, 310, 118, { sw: 1.6 });
  proc(s, 310, 138, 220, 36, 'Read the choice');
  s.arrow(310, 156, 310, 178, { sw: 1.6 });
  dec(s, 310, 215, 200, 70, 'switch (choice)');
  s.line(210, 215, 110, 215, { sw: 1.6 });
  s.arrow(110, 215, 110, 300, { sw: 1.6 });
  s.text(160, 202, 'choice 1', { size: 13, bold: true });
  s.arrow(310, 250, 310, 300, { sw: 1.6 });
  s.text(350, 275, 'choice 2', { size: 13, bold: true, anchor: 'start' });
  s.line(410, 215, 510, 215, { sw: 1.6 });
  s.arrow(510, 215, 510, 300, { sw: 1.6 });
  s.text(460, 202, 'other', { size: 13, bold: true });
  proc(s, 110, 320, 170, 40, 'Task 1, then break');
  proc(s, 310, 320, 170, 40, 'Task 2, then break');
  proc(s, 510, 320, 170, 40, 'default: error message');
  s.line(110, 340, 110, 375, { sw: 1.6 });
  s.line(510, 340, 510, 375, { sw: 1.6 });
  s.line(110, 375, 510, 375, { sw: 1.6 });
  s.arrow(310, 340, 310, 376, { sw: 1.6 });
  s.arrow(310, 375, 310, 392, { sw: 1.6 });
  term(s, 310, 410, 'End');
  s.text(310, 440, 'System.exit(0) in the default case would stop the program there', { size: 12, muted: true });
  return s.visual('Flowchart of a menu-driven program: Start, display the menu, read the choice, a switch on the choice sends control to task 1 or task 2, each ending with break, or to default which shows an error message; all paths meet at End. A note says System.exit(0) in the default case would stop the program there', 'A menu-driven program: menu, choice, switch, task.');
})();
const vRead = table(
  ['Choice is', 'Reading statement', 'Switch labels'],
  [
    ['a number', ic('int choice = sc.nextInt();'), ic('case 1:')],
    ['a letter', ic('char ch = sc.next().charAt(0);'), ic("case 'a':")],
    ['a word', ic('String cmd = sc.next();'), ic('case "stop":')],
  ],
  'Table of how a menu choice is read with Scanner: nextInt for a number with labels such as case 1; next followed by charAt zero for a letter with labels such as case a; next for a word with labels such as case stop',
);
const menuIns = ['1 12 5', '3 12 5', '7 12 5'];
const vEx4b = table(
  ['Input (choice a b)', 'Output (joined by /)'],
  menuIns.map((i) => [ic(i), ic(one(out(C.cMenuCalc, i)))]),
  `Table of three runs of the calculator menu: ${menuIns.map((i) => `input ${i} prints ${one(out(C.cMenuCalc, i))}`).join('; ')}`,
  'The last statement is outside the switch, so Bye always appears.',
);
const exitIns = ['-4', '6'];
const vExit = table(
  ['Input', 'Output (joined by /)', 'Why'],
  exitIns.map((i) => [ic(i), ic(one(out(C.cExitScan, i))), Number(i) < 0 ? 'System.exit(0) ends the program' : 'the if block is skipped']),
  `Table of two runs of the exit program: ${exitIns.map((i) => `input ${i} prints ${one(out(C.cExitScan, i))}`).join('; ')}`,
  'Statements after System.exit(0) never run.',
);
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['switch', 'selector int, char or String; labels are unique constants'],
    ['break', 'leaves the switch; without it, execution falls through'],
    ['default', 'runs when no case matches; optional'],
    ['switch or ladder', 'switch for exact values; ladder for ranges'],
    ['menu-driven', 'display menu, read choice, switch, default for invalid choice'],
    ['System.exit(0)', 'ends the whole program; later statements do not run'],
  ],
  'Summary table of Part 2: switch selectors and labels, break, default, choosing between switch and ladder, menu-driven programs and System.exit(0)',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'if Constructs: if, if-else, Ladder and Nested if',
  goals: [
    'Write and trace if, if-else, if-else-if ladder and nested if statements',
    'Predict the pairing of an else in nested if statements',
    'Find the effect of a stray semicolon and of = used in place of ==',
    'Write slab-based programs such as bills and grades with an if-else-if ladder',
  ],
  slides: [
    sl('title', 'if constructs', {
      b: 'Part 1: **if**, **if-else**, the **if-else-if ladder**, **nested if**, the **dangling else** and the commonest mistakes.',
      v: vRoute1,
      n: 'Welcome to the revision of conditional constructs. In this part we revise the if statement, if else, the else if ladder and nested if. We trace programs step by step and study the dangling else. Then we learn to spot two common mistakes: a semicolon after the condition, and a single equals sign where a double equals sign was meant. A short note on comparing strings finishes the part.',
    }),
    sl('concept', 'Making decisions', {
      b: 'A **selection statement** chooses which statements to execute, depending on a **condition**: an expression that is either true or false. In Java the condition must have the type **boolean**.',
      v: vConstructs,
      n: 'A selection statement chooses which statements will run, depending on a condition. A condition is an expression that is either true or false, and in Java it must be of the boolean type. The table lists the four constructs of this chapter. The plain if has one branch, if else has two, a ladder has three or more, and a nested if places one decision inside another.',
    }),
    sl('concept', 'The if statement', {
      b: `${F(cFever(39))}\n\nThe statement under the condition runs **only if the condition is true**; otherwise it is skipped.`,
      v: vIfRun,
      n: `The if statement runs a statement only when its condition is true. In the program, a temperature of thirty nine makes the condition true, so the word Fever is printed. A temperature of thirty six makes the condition false, and the statement is simply skipped. Nothing is printed, because there is no else part to run instead.`,
    }),
    sl('concept', 'if-else: two branches', {
      b: 'In an **if-else** statement exactly one of two blocks runs: the if block when the condition is true, the else block when it is false.',
      v: vIfElse,
      n: 'In if else, exactly one of two blocks runs. The flowchart starts with the test of the condition. If the condition is true, the statements of the if block run. If it is false, the statements of the else block run. Both paths then join and the program continues with the next statement. A plain if is the same picture without the else block.',
    }),
    sl('example', 'Worked example 1: Pass or Fail', {
      b: `${F(A.stmtPF)}\n\nTrace the statement for two values of the int variable \`marks\`: evaluate the condition, find the block that runs, read the output.`,
      v: vEx1,
      n: `Let us trace the pass or fail statement. For marks fifty six, the condition marks at least forty is true, so the if block runs and the program prints Pass. For marks thirty one, the same condition is false, so control goes to the else block and the program prints Fail. Each time, exactly one of the two printing statements runs.`,
    }),
    sl('check', 'Quick check: the constructs', {
      b: 'Match each construct with its job.',
      chk: 'mt_construct',
      n: 'Recall how many branches each construct has, and how the ladder differs from nesting.',
    }),
    sl('concept', 'Braces and the single statement', {
      b: `Without braces an if controls **only the next statement**.\n\n${F(A.cNoBraces)}\n\nUse braces whenever more than one statement belongs to the if.`,
      v: vBraces,
      n: `Without braces, an if controls only the single statement that follows it. In the first program the condition is false, so the line Large is skipped, but the next line is outside the if, so it is printed. Its indentation does not matter to Java. When two or more statements belong to the if, put them inside braces, as in the second version, and neither is printed.`,
    }),
    sl('concept', 'The if-else-if ladder', {
      b: 'An **if-else-if ladder** tests several conditions **from the top**. The first true condition runs its block and the rest of the ladder is skipped. The last **else** is optional and catches all other cases.',
      v: vLadder,
      n: 'Use a ladder when there are three or more alternatives. The conditions are tested one after another from the top. The first true condition runs its block, and then control leaves the ladder at once. The remaining conditions are never tested. If none is true, the final else block runs. Because the order of tests matters, the strictest limit usually has to come first.',
    }),
    sl('example', 'Worked example 2: a discount ladder', {
      b: `${F(A.shopLadder(3400))}\n\nTrace the ladder for several bill amounts, noting where the tests stop.`,
      v: vEx2,
      n: `A garment shop gives a discount by the amount of the bill. For a bill of five thousand two hundred, the very first test is true and the discount is fifteen. For three thousand four hundred, the first test is false, the second is true, and the discount is ten. Every bill stops at its first true test. A bill of six hundred fails all three tests and gets no discount.`,
    }),
    sl('check', 'Quick check: order of conditions', {
      b: 'Arrange the conditions of a grading ladder.',
      chk: 'ord_ladder',
      n: 'Remember that the first true condition ends the ladder, so decide which limit must be tested first.',
    }),
    sl('concept', 'Nested if', {
      b: 'A **nested if** is an if statement placed inside the block of another if or else. The inner condition is tested only when the outer branch is taken.',
      v: vNest,
      n: 'In a nested if, one if statement sits inside the block of another. The decision tree shows a fee concession. First we test whether the marks are at least seventy five. If not, the answer is None. If yes, a second test on the income is made. A low income gives Full and a higher income gives Half. The inner test is made only when the outer one is true.',
    }),
    sl('example', 'Worked example 3: nested conditions', {
      b: `${F(A.nestScholar(82, 420000))}\n\nTrace the code for three students.`,
      v: vEx3,
      n: `We trace three students through the nested concession program. Marks eighty two with an income of two lakh fifty thousand pass both tests and get Full. Marks eighty two with an income of four lakh twenty thousand pass the first test but fail the second, so the output is Half. Marks sixty fail the first test, the inner test is never made, and the output is None.`,
    }),
    sl('concept', 'The dangling else', {
      b: 'When an else follows nested ifs without braces, Java pairs it with the **nearest unmatched if**, whatever the indentation suggests. Braces can change the pairing.',
      v: vDangle,
      n: `This is the dangling else. In the first program the else is indented under the first if, but Java pairs it with the nearest unmatched if, the one that tests the order. So the program prints Retail, and then Done. In the second program the inner if is closed by braces, the else now belongs to the first if, and only Done is printed.`,
    }),
    sl('check', 'Quick check: which if gets the else?', {
      b: 'Write the exact output.',
      chk: 'co_dangling',
      n: 'Ignore the indentation and pair the else with the nearest unmatched if.',
    }),
    sl('concept', 'Mistake 1: a semicolon after the condition', {
      b: `${F(A.cSemi)}\n\nThe semicolon is an **empty statement** that becomes the body of the if. The next statement is no longer controlled by it. This is a **logical error**: the program compiles and gives wrong results.`,
      v: vSemi,
      n: `A semicolon directly after the condition is the first common mistake. It forms an empty statement, and that empty statement becomes the whole body of the if. The statement on the next line is then outside the if and always runs. With marks twenty eight the word Pass is printed, which is wrong. The compiler does not complain, so such a logical error must be found by tracing.`,
    }),
    sl('concept', 'Mistake 2: = instead of ==', {
      b: 'A single **=** assigns; **==** compares. With an int the compiler rejects the condition; with a boolean variable it is accepted and gives a wrong result.',
      v: vEq,
      n: `The second mistake uses a single equals sign where a double one was needed. With an int variable, the assignment gives an int, and an if needs a boolean, so the compiler reports an error. With a boolean variable, the assignment is accepted, the variable is changed to true, and the if branch always runs. The correct comparison uses the double equals sign.`,
    }),
    sl('check', 'Quick check: braces', {
      b: 'Choose the correct output.',
      chk: 'm_braces',
      n: 'Remember which statement is controlled by an if that has no braces.',
    }),
    sl('concept', 'Conditions with logical operators', {
      b: 'Join tests with **&&**, **||** and **!** to make one condition. **&&** is evaluated before **||**. Strings are compared with `equals`, not `==` (see Chapter 13).',
      v: vLogic,
      n: 'Several tests can be joined into one condition with the logical and, the logical or and the logical not. The logical and is evaluated before the logical or, so brackets are useful for clarity. The last row of the table compares two strings. Strings are compared with the equals method and not with the double equals operator. We study strings fully in a later chapter.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A condition must be a boolean expression, and braces are needed for more than one controlled statement. A ladder tests from the top and the first true condition wins, so the order matters. A nested if makes the inner test only after the outer one. An else pairs with the nearest unmatched if. A semicolon after the condition is a logical error, and assignment is not comparison.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'In a ladder write the conditions in the right order: the largest limit first.',
        'Trace the program with the given values; write each condition as true or false.',
        'Ignore indentation when you pair an else: it belongs to the nearest unmatched `if`.',
        'Check for a stray `;` after `if (...)` and for `=` written in place of `==`.',
        'In a program, validate the input first (for example marks outside 0 to 100) and use `&&` and `||` carefully.',
      ],
      n: 'Some exam tips. Write the conditions of a ladder in the right order, with the largest limit first. Trace each program with the given values and note whether every condition is true or false. Ignore the indentation when pairing an else. Look for a stray semicolon after a condition and for a single equals sign used for comparison. In a program, check the validity of the input first.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'switch, Fall-through, Menu-driven Programs and System.exit(0)',
  goals: [
    'Write and trace switch statements on int, char and String selectors',
    'Predict the output of a switch with and without break, including fall-through',
    'Convert between switch and if-else-if constructs where possible',
    'Write a menu-driven program using switch and end it with System.exit(0)',
  ],
  slides: [
    sl('title', 'switch and menu-driven programs', {
      b: 'Part 2: the **switch** statement, **break** and **default**, **fall-through**, **menu-driven programs** and **System.exit(0)**.',
      v: vRoute2,
      n: 'Welcome to the second part. We study the switch statement with its case labels, break and default. We see what happens when a break is missing, which is called fall through, and when it is useful. We compare switch with the else if ladder, write menu driven programs with a switch on the choice, and finally see how the exit method ends a program early.',
    }),
    sl('concept', 'The switch statement', {
      b: `A **switch** statement compares one selector with a list of constants and runs the matching case.\n\n${F(B.swDay(2))}`,
      v: vSyntax,
      n: 'A switch statement compares one value, called the selector, with a list of constants. Each constant is written after the word case and a colon. The matching case runs. The word break leaves the switch. The word default marks the statements that run when nothing matches, and it is optional. All the cases sit inside one pair of braces.',
    }),
    sl('concept', 'What can be the selector?', {
      b: 'The selector may be an **int** (or byte, short), a **char** or a **String**. A real number, a long or a boolean is not allowed.',
      v: vSelectors,
      n: 'The selector of a switch can be an int, a char or a String. Strings were allowed from Java seven. Real numbers, long values and booleans are rejected by the compiler, and the table shows the messages. When a string is the selector, the match is exact, so capital and small letters are different.',
    }),
    sl('example', 'Worked example 1: the day name', {
      b: `${F(B.swDay(2))}\n\nTrace the program for the days 2, 3 and 7.`,
      v: vEx1b,
      n: `Let us trace the day program. Day two matches the label two, prints Tuesday, and the break leaves the switch. Day three matches the label three and prints Wednesday. Day seven matches no label, so the default statement runs and the program prints Other day. The default needs no break, because it is the last part of the switch.`,
    }),
    sl('concept', 'break and default', {
      b: 'When the selector matches a case, its statements run until a **break** is reached; **break** then leaves the switch. **default** runs only when no case matches.',
      v: vBreak,
      n: 'This flow shows a switch with break. The selector is evaluated first. Then the matching case is found, and its statements run. When the break is reached, control leaves the switch, and the program continues with the statement after the closing brace. Because of the break, only the matching case runs. The default part is used when no case matches.',
    }),
    sl('concept', 'Fall-through', {
      b: 'If a case has **no break**, execution **falls through** into the next case and continues until a break or the end of the switch.',
      v: vFall,
      n: `Now see what happens when break is missing. The selector is two, so control jumps to case two and prints two. Case two has no break, so execution falls through into case three, which prints three, and now the break is met. The output is two and three. Case one lies above the match and default is never reached.`,
    }),
    sl('example', 'Worked example 2: tracing fall-through', {
      b: `${F(B.swFall(2))}\n\nFind where execution starts and where it stops for n = 1, 2, 3 and 9.`,
      v: vEx2b,
      n: `Let us trace the program for four values. For one, execution starts at case one and runs through cases two and three, printing all three words, until the break. For two, it starts at case two and prints two and three. For three, it prints only three. For nine, nothing matches, so default prints many.`,
    }),
    sl('check', 'Quick check: loyalty points', {
      b: 'Write the exact output.',
      chk: 'co_sw_fall',
      n: 'Find the matching label, then add the amounts of every case until a break is met.',
    }),
    sl('concept', 'Deliberate fall-through: grouping cases', {
      b: `Leaving out the break between labels lets several values **share one block**.\n\n${F(B.swVowel('e'))}`,
      v: vGroup,
      n: 'Fall through is useful when several values need the same action. In the program the labels for the five vowels are written one below the other, and only the last one has a statement and a break. A vowel falls down the labels to the shared message. Any other letter is handled by default.',
    }),
    sl('concept', 'Rules for case labels', {
      b: 'Each case label must be a **constant**, must be **unique** in the switch and must have a type suitable for the selector. A **final** variable with a constant value is also accepted.',
      v: vRules,
      n: 'There are rules for case labels. A label must be a constant and not an ordinary variable. Each label must be unique inside one switch. The type of the label must suit the selector. If a rule is broken, the compiler gives an error, and the table shows the messages. A final variable with a constant value is accepted as a constant.',
    }),
    sl('check', 'Quick check: the rules', {
      b: 'Decide whether each statement is true.',
      chk: 'ar_dup',
      n: 'Think about whether two labels may share a value, and what rule is behind the answer.',
    }),
    sl('concept', 'switch or if-else-if?', {
      b: 'A **switch** tests **equality** with constants; a ladder can test any condition. Use switch for a fixed list of exact values and a ladder for ranges.',
      v: vSwIf,
      n: 'How do we choose between the two? A switch tests whether one selector equals a constant, so it suits a list of exact values such as day numbers or menu choices. A ladder can test any condition, including ranges such as marks at least seventy five, and it has no restriction on types. In a switch, the matching case continues into the next unless there is a break.',
    }),
    sl('example', 'Worked example 3: converting a ladder to a switch', {
      b: `${F(cLadderG)}\n\nBecomes:\n\n${F(cSwitchG)}\n\nEach \`==\` test becomes a case with a break, and the last else becomes default.`,
      v: vEx3b,
      n: 'Let us convert a ladder into a switch. The ladder tests a grade letter for equality with A and B. Each test becomes a case label with its own break, and the final else becomes default. The table shows that for grades A, B and Z both versions print the same text. A ladder with range conditions could not be converted in this way.',
    }),
    sl('concept', 'Menu-driven programs', {
      b: 'A **menu-driven program** displays a list of options, reads the user\'s choice with **Scanner**, and uses a **switch** on the choice to run the matching task. **default** reports an invalid choice.',
      v: vMenu,
      n: 'A menu driven program shows a list of options, reads the choice of the user and then does the matching task. The flowchart shows the structure. The menu is displayed, the choice is read, and a switch sends control to the right task. Each task ends with a break. The default part handles a choice that is not on the menu, usually with an error message.',
    }),
    sl('concept', 'Reading the choice with Scanner', {
      b: 'The way the choice is read decides the type of the selector and of the labels. The Scanner class has no method to read a char directly: read a word and take its first character.',
      v: vRead,
      n: 'How the choice is read decides the type of the selector. For a numbered menu, read an int with the next int method and write number labels. For a lettered menu, read a word with the next method and take its first character, because Scanner has no method that reads a single character. For commands in words, read a string and use string labels.',
    }),
    sl('example', 'Worked example 4: running a menu program', {
      b: `${F(C.cMenuCalc)}\n\nThe input is the choice, then two numbers.`,
      v: vEx4b,
      n: `Let us run the calculator menu. With the input one, twelve and five, the first case prints the sum, seventeen. With three, twelve and five, the third case prints the product, sixty. With seven, no case matches, so default prints Invalid. In every run the last statement, which is outside the switch, prints Bye.`,
    }),
    sl('check', 'Quick check: reading a letter', {
      b: 'Choose the correct statement.',
      chk: 'm_char_read',
      n: 'Remember which Scanner methods exist, and how a single character is obtained from a word.',
    }),
    sl('concept', 'Ending a program with System.exit(0)', {
      b: `**System.exit(0)** terminates the program at once. The value 0 means a normal termination, and no statement after the call is executed.\n\n${F(C.cExitScan)}`,
      v: vExit,
      n: 'The exit method of the System class ends the whole program at once, and the value zero means a normal ending. In the program, the input minus four makes the condition true, so Negative is printed, the program ends, and the square is never printed. With six, the block is skipped and the program prints the square. It is useful in the default case of a menu.',
    }),
    sl('check', 'Quick check: exit', {
      b: 'Write the exact output for the input -4.',
      chk: 'co_exit',
      n: 'Follow the program for the given input and notice which lines come after the exit call.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. A switch compares an int, char or String selector with unique constant labels. Break leaves the switch, and without it execution falls through. Default runs when nothing matches. Use switch for exact values and a ladder for ranges. A menu driven program shows a menu, reads the choice and uses a switch with default for a wrong choice. The exit method ends the program at once.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'For output questions, find the matching label first, then run down the cases until a `break`.',
        'If no label matches and there is a `default`, start there; remember that `default` may be written anywhere.',
        'Case labels must be constants and unique; the selector cannot be `double`, `long` or `boolean`.',
        'In a menu-driven program use `break` in every case, and give `default` a message for an invalid choice.',
        'After `System.exit(0)` nothing is executed: do not include later lines in the output.',
      ],
      n: 'Some exam tips. In output questions, find the matching label first and then run down the cases until a break. If no label matches, start at default. Case labels must be unique constants, and the selector cannot be a real number, a long or a boolean. In a menu driven program, put a break in every case and give default a message. Nothing runs after the exit call.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Conditional Constructs: notes',
  sections: [
    {
      h: '1. Selection statements: if and if-else',
      t: 1,
      b: `A **selection statement** chooses the statements to execute according to a **condition**, an expression of type boolean.\n\n- **if:** the controlled statement runs only when the condition is true.\n- **if-else:** one of two blocks runs.\n- Without braces the if (or else) controls only the next single statement; use braces for a block.\n\n${F(A.stmtPF)}\n\nFor marks = 56 the output is ${ic(out(`int marks = 56;\n${A.stmtPF}`))}.\n\nTo compare Strings use the method \`equals\` (not \`==\`): ${ic('"Delhi".equals("Delhi")')} gives ${ev('"Delhi".equals("Delhi")')}.`,
      terms: [
        ['Selection statement', 'A statement that chooses which statements to execute depending on a condition.'],
        ['Condition', 'An expression of type boolean that is either true or false.'],
        ['if statement', 'A selection statement that executes a statement or block only when its condition is true.'],
      ],
      v: vIfElse,
      vs: [vIfRun, vBraces],
    },
    {
      h: '2. if-else-if ladder and nested if',
      t: 1,
      b: `An **if-else-if ladder** tests conditions in order from the top and runs the block of the **first true condition**; the rest is skipped. The final else is optional.\n\n${F(A.shopLadder(3400))}\n\nOutput: ${ic(out(A.shopLadder(3400)))}.\n\nA **nested if** has an if (or if-else) inside the block of another; the inner test is made only when the outer branch is taken.\n\n${F(A.nestScholar(82, 420000))}\n\nOutput: ${ic(out(A.nestScholar(82, 420000)))}.`,
      terms: [
        ['if-else-if ladder', 'A series of if-else statements in which the conditions are tested from the top and only the block of the first true condition is executed.'],
        ['Nested if', 'An if statement placed inside the block of another if or else statement.'],
      ],
      v: vLadder,
      vs: [vEx2, vNest, vEx3],
    },
    {
      h: '3. The dangling else and common mistakes',
      t: 1,
      b: `**Dangling else:** an else belongs to the **nearest unmatched if**, whatever the indentation.\n\n${F(A.cDangle)}\n\nOutput: ${ic(one(out(A.cDangle)))}.\n\n**Mistakes**\n- A semicolon after the condition makes an empty statement the body of the if (a logical error): ${ic(out(A.cSemi))} is printed for marks = 28.\n- \`=\` used for \`==\` in a condition: with an int the compiler says "${errA}"; with a boolean variable the code compiles and the branch always runs.\n- In a ladder, testing the wider condition first hides the narrower ones.`,
      terms: [
        ['Dangling else', 'The ambiguity of which if an else belongs to when nested if statements have no braces; Java pairs it with the nearest unmatched if.'],
        ['Empty statement', 'A statement consisting of a semicolon alone; it does nothing.'],
      ],
      v: vDangle,
      vs: [vSemi, vEq, vLogic],
    },
    {
      h: '4. The switch statement',
      t: 2,
      b: `A **switch** statement compares a **selector** (int, char or String; not double, long or boolean) with the constants of its **case** labels and executes the matching case. **break** leaves the switch. **default** runs when no case matches and is optional.\n\n${F(B.swDay(2))}\n\nOutput: ${ic(out(B.swDay(2)))}; for day 7 the output is ${ic(out(B.swDay(7)))}.\n\nFor a String selector the match is exact, so \`red\` and \`RED\` are different.`,
      terms: [
        ['switch statement', 'A multi-way selection statement that compares one selector expression with a list of constant case labels and executes the matching case.'],
        ['case label', 'A constant in a switch statement; the statements after it run when the selector equals that constant.'],
        ['default', 'The label of a switch statement whose statements run when no case label matches.'],
        ['break', 'A statement that transfers control out of the switch statement.'],
      ],
      v: vSyntax,
      vs: [vSelectors, vEx1b, vBreak],
    },
    {
      h: '5. Fall-through, case rules and switch against if',
      t: 2,
      b: `**Fall-through:** a case without break lets execution continue into the following cases until a break or the end of the switch.\n\n${F(B.swFall(2))}\n\nOutput: ${ic(one(out(B.swFall(2))))}.\n\nDeliberate fall-through groups labels: the vowel program prints ${ic(out(B.swVowel('e')))} for e.\n\n**Rules:** labels are constants (a final variable with a constant value is allowed), unique, and of a type that suits the selector.\n\n**switch or if-else-if:** switch tests equality with constants and suits a fixed list of values; a ladder tests any condition, including ranges. A switch of exact values can be rewritten as a ladder of == tests (grouped labels become ||), and a ladder of equality tests as a switch.`,
      terms: [
        ['Fall-through', 'The continuing of execution from one case of a switch into the next when the case does not end with break.'],
      ],
      v: vFall,
      vs: [vEx2b, vGroup, vRules, vSwIf],
    },
    {
      h: '6. Menu-driven programs and System.exit(0)',
      t: 3,
      b: `A **menu-driven program** displays a list of options, reads the choice with Scanner and uses a **switch** on the choice to run the matching task; **default** reports an invalid choice. A char choice is read with ${ic('sc.next().charAt(0)')}.\n\n**System.exit(0)** terminates the program immediately (0 means normal termination); statements after it are not executed.\n\n${F(C.cExit(9))}\n\nOutput for choice 9: ${ic(one(out(C.cExit(9))))}.`,
      terms: [
        ['Menu-driven program', 'A program that displays a list of options, accepts the choice of the user and performs the task for that choice.'],
        ['System.exit(0)', 'A method call that terminates the running program at once; the value 0 indicates a normal termination.'],
      ],
      v: vMenu,
      vs: [vRead, vEx4b, vExit],
    },
  ],
  tips: '**Common mistakes**\n- A stray `;` after `if (...)`, or `=` where `==` was meant.\n- Writing the wider condition first in a ladder.\n- Trusting indentation to pair an else.\n- Forgetting `break`, so that the next case also runs.\n- A variable or a repeated constant used as a case label; a `double`, `long` or `boolean` selector.\n- Forgetting `default` in a menu-driven program, so that a wrong choice gives no message.\n\n**How marks are usually awarded**\n- Output questions: each line in the exact order and format.\n- Error questions: the error named and the line given.\n- Programs (15 marks): class and method structure, input, logic (conditions in the right order), output, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a selection statement?', 'A statement that chooses which statements to execute depending on a condition.', 'definition', 1],
  ['What type must the condition of an if be?', 'boolean (true or false).', 'fact', 1],
  ['What does an if-else statement do?', 'Runs exactly one of two blocks: the if block if the condition is true, else the else block.', 'concept', 1],
  ['If without braces', 'It controls only the next single statement.', 'concept', 1],
  ['What is an if-else-if ladder?', 'A series of if-else statements: conditions are tested from the top and only the first true one runs.', 'definition', 1],
  ['Why does the order of conditions in a ladder matter?', 'The first true condition ends the ladder, so the strictest (largest) limit must be tested first.', 'exam-tip', 1],
  ['What is a nested if?', 'An if statement placed inside the block of another if or else.', 'definition', 1],
  ['Which if does an else belong to?', 'The nearest unmatched if, whatever the indentation.', 'concept', 1],
  ['Semicolon after `if (...)`', `An empty statement becomes the body, so the next statement always runs. Prints ${ic(out(A.cSemi))} for marks 28.`, 'exam-tip', 1],
  ['`if (x = 5)` with an int x', `Compile-time error: ${errA}.`, 'exam-tip', 1],
  ['How are two Strings compared for equal text?', 'With the method equals, not with ==.', 'fact', 1],
  ['Which operator is evaluated first, && or ||?', '&& (it has higher precedence than ||).', 'fact', 1],
  ['What is a switch statement?', 'A multi-way selection statement that compares one selector with constant case labels and runs the matching case.', 'definition', 2],
  ['Types allowed as the selector of a switch', 'int (and byte, short), char and String.', 'fact', 2],
  ['Types not allowed as the selector', `double, long and boolean; javac says "${errDoubleSel}" for a double.`, 'fact', 2],
  ['What does break do in a switch?', 'Transfers control out of the switch statement.', 'definition', 2],
  ['When does default run?', 'When no case label matches the selector. It is optional.', 'definition', 2],
  ['What is fall-through?', 'Execution continuing into the next case when a case does not end with break.', 'definition', 2],
  ['Output of the fall-through program for n = 2', ic(one(out(B.swFall(2)))), 'example', 2],
  ['How can two values share one block in a switch?', 'Write their labels one below the other and put the statements and break after the last one.', 'concept', 2],
  ['Rules for case labels', 'Constants, unique, of a type compatible with the selector.', 'fact', 2],
  ['Duplicate case label', `Compile-time error: ${errDup}.`, 'exam-tip', 2],
  ['Variable used as a case label', `Compile-time error: ${errCaseVar}.`, 'exam-tip', 2],
  ['String selector and letter case', 'The match is exact: red and RED are different labels.', 'fact', 2],
  ['When is a switch better than a ladder?', 'For a fixed list of exact values; ranges need a ladder.', 'concept', 2],
  ['Convert a switch to if-else-if', 'Each case becomes an == test, grouped labels are joined by ||, default becomes the last else.', 'concept', 2],
  ['What is a menu-driven program?', 'A program that shows a list of options, reads the user\'s choice and does the task for that choice.', 'definition', 3],
  ['Reading a char choice with Scanner', ic('char ch = sc.next().charAt(0);'), 'fact', 3],
  ['Use of default in a menu program', 'To report an invalid choice.', 'concept', 3],
  ['What does System.exit(0) do?', 'Terminates the program at once; 0 means normal termination; later statements do not run.', 'definition', 3],
  ['Output of the exit program for choice 9', ic(one(out(C.cExit(9)))), 'example', 3],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Conditional Constructs',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_cond_type', 'm_semi_if', 'm_dangling', 'm_fall_trace', 'm_case_valid', 'm_exit_effect', 's_eq_vs', 's_exit'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_grade', 'l_shape_menu'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Conditional Constructs',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_if_def', 'm_ladder_shop', 'm_eq_int', 'm_nested_trace', 'm_logic_combo', 'm_switch_types', 'm_break_role', 'm_sw_vs_if', 'm_exit_def', 'm_menu_default', 's_fall', 's_ladder_to_switch', 's_stmt_pf', 'co_nested', 'co_sw_default_mid'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_electric', 'l_triangle', 'l_unit_menu'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of icse-10-computer-applications-ch04 only',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
