// ICSE 10 Computer Applications, ch04: topic t02 (switch-case, default, break, fall-through).
import { Q, mcq, ar, tf, fb, match, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, out, distinct, mustFail, mustCompile, expect } from './q_util.mjs';

// ---- shared code
export const swDay = (d) => code(
  `int day = ${d};`,
  'switch (day) {',
  '    case 1: System.out.println("Monday"); break;',
  '    case 2: System.out.println("Tuesday"); break;',
  '    case 3: System.out.println("Wednesday"); break;',
  '    default: System.out.println("Other day");',
  '}',
);
export const swFall = (n) => code(
  `int n = ${n};`,
  'switch (n) {',
  '    case 1: System.out.println("one");',
  '    case 2: System.out.println("two");',
  '    case 3: System.out.println("three"); break;',
  '    default: System.out.println("many");',
  '}',
);
export const swVowel = (c) => code(
  `char ch = '${c}';`,
  'switch (ch) {',
  "    case 'a':",
  "    case 'e':",
  "    case 'i':",
  "    case 'o':",
  "    case 'u':",
  '        System.out.println("Vowel");',
  '        break;',
  '    default:',
  '        System.out.println("Not a vowel");',
  '}',
);
export const swPoints = (t) => code(
  `int tier = ${t};`,
  'int points = 0;',
  'switch (tier) {',
  '    case 3: points += 50;',
  '    case 2: points += 30;',
  '    case 1: points += 10; break;',
  '    default: points = 0;',
  '}',
  'System.out.println(points);',
);
export const swString = (s) => code(
  `String light = "${s}";`,
  'switch (light) {',
  '    case "RED": System.out.println("Stop"); break;',
  '    case "red": System.out.println("Halt"); break;',
  '    default: System.out.println("Unknown");',
  '}',
);
export const swDefaultMid = (n) => code(
  `int n = ${n};`,
  'switch (n) {',
  '    default: System.out.println("D");',
  '    case 1: System.out.println("one"); break;',
  '    case 2: System.out.println("two");',
  '}',
);

// ================================================================ t02 switch-case
const errDouble = mustFail(code('double d = 2.5;', 'switch (d) {', '    case 1: break;', '}'), 'switch on double');
const errLong = mustFail(code('long n = 2;', 'switch (n) {', '    case 1: break;', '}'), 'switch on long');
Q('m_switch_types', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which of the following data types cannot be used as the selector expression of a switch statement?',
  opts: distinct(['double', 'int', 'char', 'String']),
  sol: `The selector of a switch may be of type int (or byte, short), char or String, but not a real number or a long: for a double the compiler reports "${errDouble}", and for a long "${errLong}".`,
}));
Q('m_break_role', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What does the break statement do when it is executed inside a case of a switch statement?',
  opts: distinct(['It transfers control out of the switch statement', 'It stops the whole program', 'It skips only the next statement in the case', 'It jumps to the default label']),
  sol: 'break ends the switch: execution continues with the first statement after the closing brace. It does not stop the program (that is System.exit()), and it does not go to default.',
}));
Q('m_fall_trace', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A counter display program has no break after the first two cases. What does it show when n is 2?\n\n${F(swFall(2))}`,
  opts: distinct([ic(out(swFall(2)).split('\n').join(' / ')), ic(out(swFall(3))), ic(out(swFall(1)).split('\n').join(' / ')), ic(out(swFall(9)))]),
  sol: 'Control jumps to case 2 and runs its statement. That case has no break, so execution falls through into case 3, which prints and then meets break. Case 1 is before the matching label, so it is skipped, and default is not reached.',
}));
Q('m_default_run', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'When does the statement written under the default label of a switch run?',
  opts: distinct(['When no case label matches the value of the selector', 'Always, before the cases are examined', 'Only when the selector value is 0', 'Only when every case contains a break']),
  sol: `default plays the role of the final else of a ladder. For example, the program with the selector 9 and cases 1, 2 and 3 prints ${ic(out(swFall(9)))}. A switch may also be written without any default; then nothing happens when no case matches.`,
}));
const errCaseVar = mustFail(code('int n = 3;', 'switch (n) {', '    case n + 1: break;', '}'), 'case n + 1');
const errCaseDouble = mustFail(code('int n = 3;', 'switch (n) {', '    case 2.5: break;', '}'), 'case 2.5');
const errCaseStr = mustFail(code('int n = 3;', 'switch (n) {', '    case "five": break;', '}'), 'case string');
mustCompile(code('int n = 5;', 'switch (n) {', '    case 5: System.out.println("five"); break;', '}'), 'case 5');
Q('m_case_valid', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In a switch statement whose selector n is an int variable, which of the following is a valid case label?',
  opts: distinct([ic('case 5:'), ic('case n + 1:'), ic('case 2.5:'), ic('case "five":')]),
  sol: `A label must be a constant of a type compatible with the selector. case n + 1 depends on a variable, and javac says "${errCaseVar}"; case 2.5 gives "${errCaseDouble}"; case "five" gives "${errCaseStr}".`,
}));
Q('m_sw_vs_if', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Which of these decisions cannot be written directly as a switch statement and needs an if-else-if ladder?',
  opts: distinct(['Giving grade C to every mark from 60 to 74 and grade B from 75 to 89', 'Showing the name of a month from its number 1 to 12', 'Choosing an action from a menu choice 1, 2 or 3', "Reacting to the character 'Y' or 'N' typed by a user"]),
  sol: 'A switch compares the selector for equality with constants, so it suits a fixed list of exact values. A band of marks is a range, and a range would need a separate case for every value, so a ladder with relational conditions is the right tool.',
}));
export const swExpr = code(
  'int n = 17;',
  'switch (n % 4) {',
  '    case 0: System.out.println("zero"); break;',
  '    case 1: System.out.println("one"); break;',
  '    default: System.out.println("rest");',
  '}',
);
Q('m_str_java7', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In which version of Java was a String first allowed as the selector of a switch statement?',
  opts: distinct(['Java 7', 'Java 5', 'Java 6', 'Java 8']),
  sol: `A switch on a String works from Java 7; before that only int-type values and char (and enum constants) could be used. The labels are then String constants and are matched exactly, including the case of the letters.`,
}));
const cNoBreak = code('int n = 1;', 'switch (n) {', '    case 1: System.out.println("one");', '    case 2: System.out.println("two");', '}');
const cWithBreak = code('int n = 1;', 'switch (n) {', '    case 1: System.out.println("one"); break;', '    case 2: System.out.println("two"); break;', '}');
Q('m_case_break_need', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why is break usually written at the end of each case of a switch statement?',
  opts: distinct(['To stop the statements of the following cases from also being executed', 'To make the compiler accept the case label', 'To repeat the case until the selector changes', 'To terminate the whole program']),
  sol: `Without break the control falls through. With selector 1 the program with a break in every case prints ${ic(out(cWithBreak))}, but the same program with no break prints ${ic(out(cNoBreak).split('\n').join(' / '))}. A missing break is not a compile error.`,
}));
mustCompile(code('final int LIMIT = 2;', 'int n = 2;', 'switch (n) {', '    case LIMIT: System.out.println("two"); break;', '}'), 'final constant as label');
Q('m_sw_features', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which of the following statements about the switch statement is true?',
  opts: distinct(['Several labels can share one block of statements by leaving out break between them', 'The default label must be the last label, otherwise the program does not compile', 'Every case must end with break, otherwise the compiler reports an error', 'The selector must be a single variable and cannot be an expression']),
  sol: `Grouping labels is deliberate fall-through: with the labels 'a', 'e', 'i', 'o' and 'u' written one below the other above a single println, the letter e prints ${ic(out(swVowel('e')))}. The other statements are false: a switch whose default label comes before case 1 compiles and runs (${ic(out(swDefaultMid(5)).split('\n').join(' / '))} for n = 5), a case without break compiles, and an expression is a valid selector (switch (n % 4) with n = 17 selects case 1 and prints ${ic(out(swExpr))}).`,
}));
Q('tf_sw_break', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? If a case of a switch statement does not end with break, the program does not compile.',
  sol: `The program compiles. Execution simply continues into the next case, so a selector of 1 gives ${ic(out(cNoBreak).split('\n').join(' / '))} for the code with two cases and no break.`,
}));
Q('ar_fall', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'In a switch statement a case that is missing its break lets the statements of the next case run as well.',
  r: 'A switch jumps to the matching label and then continues executing statements in order until it meets a break or the end of the switch.',
  sol: `The program with n = 1 and two cases without break displays ${ic(out(cNoBreak).split('\n').join(' / '))}, so (A) is true. (R) is a true description of how a switch executes and it is the reason for (A).`,
}));
const errDup = mustFail(code('int n = 2;', 'switch (n) {', '    case 1: break;', '    case 1: break;', '}'), 'duplicate');
Q('ar_dup', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A switch statement may contain two case labels with the same constant value if their statements are different.',
  r: 'The case labels of one switch statement must be unique constants.',
  sol: `(A) is false: javac reports "${errDup}" for a repeated label whatever the statements are. (R) is true and states the rule.`,
}));
Q('fb_switch', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Control leaves a switch statement when it meets the keyword ___, and the label ___ is used when no case matches.',
  acc: [['break'], ['default']],
  sol: 'break ends the switch, and default is the label that runs when none of the case constants equals the selector.',
}));
Q('mt_keyword', match({
  t: [2, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each Java element with its effect in a menu-driven or switch program.',
  pairs: [
    [ic('case 2:'), 'marks the statements to run when the selector equals the constant 2'],
    [ic('break;'), 'leaves the switch statement at once'],
    [ic('default:'), 'marks the statements to run when no case matches'],
    [ic('System.exit(0);'), 'ends the whole program'],
  ],
  sol: 'case and default are labels inside the switch; break leaves only the switch, while System.exit(0) ends the program itself.',
}));

// ---- code output, t02
Q('co_sw_break', co({
  pre: 'A coaching centre prints a remark from a grade letter. Write the exact output of the code.',
  t: 2, d: 2, c: 'application',
  code: code("char grade = 'B';", 'switch (grade) {', "    case 'A': System.out.println(\"Excellent\"); break;", "    case 'B': System.out.println(\"Good\"); break;", "    case 'C': System.out.println(\"Fair\"); break;", '    default: System.out.println("Check records");', '}', 'System.out.println("End");'),
  sol: 'The grade B matches the second label; its statement runs and the break leaves the switch. The line after the switch always runs.',
}));
Q('co_sw_fall', co({
  pre: 'A store adds loyalty points with the switch below and no break in the upper cases. Write the exact output for a customer of tier 2.',
  t: 2, d: 4, c: 'application',
  code: swPoints(2),
  sol: 'Tier 2 starts at case 2 and adds 30. With no break the next case adds 10 and then the break ends the switch. Case 3 is above the matching label, so its 50 is not added.',
}));
Q('co_sw_group', co({
  pre: 'A spelling tool classifies the letter e with a switch that groups cases. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: swVowel('e'),
  sol: 'The labels a and e have no statements of their own, so control falls through from case e down to the Vowel statement, and the break then leaves the switch. This is deliberate fall-through used to share one block between several labels.',
}));
Q('co_sw_default_mid', co({
  pre: 'In this program the default label is written first. Write the exact output when n is 5.',
  t: 2, d: 5, c: 'analysis',
  code: swDefaultMid(5),
  sol: 'No case equals 5, so execution starts at default even though it is written first. It has no break, so control falls through into case 1, whose break ends the switch. Case 2 is not reached.',
}));
Q('co_sw_string', co({
  pre: 'A railway enquiry stub switches on a String. Write the exact output of the code.',
  t: 2, d: 3, c: 'application',
  code: code('String zone = "north";', 'switch (zone) {', '    case "north": System.out.print("N ");', '    case "south": System.out.print("S "); break;', '    case "east": System.out.print("E ");', '}', 'System.out.println("done");'),
  sol: 'The text north matches the first label and N is printed. There is no break, so the statement of south runs too and prints S; then the break leaves the switch. The label east is never reached, and done is printed on the same line because the earlier output used print.',
}));
Q('co_sw_dup', co({
  pre: 'A canteen menu program has a repeated label. State the error that the compiler reports.',
  t: 2, d: 3, c: 'analysis', error: true,
  code: code('int item = 2;', 'switch (item) {', '    case 1: System.out.println("Tea"); break;', '    case 2: System.out.println("Coffee"); break;', '    case 1: System.out.println("Juice"); break;', '}'),
  sol: 'The constant 1 is used for two labels in the same switch, which is not allowed, and the compiler reports the second one. Each case constant must be unique.',
  scheme: [['Compile-time error with the correct line', 1], ['Reason: case labels must be unique', 1]],
}));
Q('co_sw_nonconst', co({
  pre: 'A kiosk program uses a variable as a case label. State the error that the compiler reports.',
  t: 2, d: 4, c: 'analysis', error: true,
  code: code('int item = 2;', 'int first = 1;', 'switch (item) {', '    case first: System.out.println("Tea"); break;', '    case 2: System.out.println("Coffee"); break;', '}'),
  sol: 'A case label must be a constant known at compile time. The variable first can change, so it is not allowed. Declaring it as final int first = 1; would make it a constant.',
  scheme: [['Compile-time error with the correct line', 1], ['Reason: label is a variable, not a constant', 1]],
}));

// ---- short answers, t02
const cFallDemo = swFall(1);
Q('s_fall', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: [30, 110],
  stem: 'What is fall-through in a switch statement? Give an example in which it is useful.',
  model: `**Fall-through** means that when a case does not end with break, control continues into the statements of the next case, and so on, until a break or the end of the switch is met. For selector 1 the program below prints ${ic(out(cFallDemo).split('\n').join(' / '))}.\n\n${F(cFallDemo)}\n\nIt is useful when several labels should share one block, for example grouping the letters a, e, i, o and u so that all of them print Vowel (for e the output is ${ic(out(swVowel('e')))}).`,
  sol: 'One mark for the meaning with the effect of a missing break, one mark for a useful example.',
  scheme: [['Meaning: execution continues into following cases when break is missing', 1], ['Example of deliberate fall-through, such as grouped labels', 1]],
}));
Q('s_case_rules', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: [20, 80],
  stem: 'State any two rules that apply to the case labels of a switch statement.',
  model: `1. Each case label must be a **constant** (a literal, or a final variable with a constant value), not an ordinary variable; otherwise javac reports "${errCaseVar}".\n2. The labels of one switch must be **unique**; a repeated label gives "${errDup}".\n\n(The label must also be of a type compatible with the selector, and the selector must be an int, char or String.)`,
  sol: 'One mark for each rule, as any two of: constant, unique, type compatible with the selector.',
  scheme: [['First rule stated correctly', 1], ['Second rule stated correctly', 1]],
}));
Q('s_sw_vs_if', short({
  t: 2, d: 4, c: 'analysis', marks: 2, wl: [30, 100],
  stem: 'Give two differences between a switch statement and an if-else-if ladder.',
  model: `1. A **switch** tests one selector value for **equality** with constants, whereas a ladder can test any **boolean conditions**, including ranges such as marks >= 75 and conditions on several variables.\n2. A switch selector must be an int, char or String (not double or long), and a matching case continues into the next one unless a break is written, whereas in a ladder only one branch ever runs.`,
  sol: 'One mark for each valid difference: equality against constants versus any condition; permitted types; fall-through and break; readability for many fixed values.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
const ladderG = (g) => code(`char grade = '${g}';`, "if (grade == 'A')", '    System.out.println("Excellent");', "else if (grade == 'B')", '    System.out.println("Good");', 'else', '    System.out.println("Work harder");');
const switchG = (g) => code(`char grade = '${g}';`, 'switch (grade) {', "    case 'A': System.out.println(\"Excellent\"); break;", "    case 'B': System.out.println(\"Good\"); break;", '    default: System.out.println("Work harder");', '}');
for (const g of 'ABZ') expect(out(switchG(g)), out(ladderG(g)), `ladder to switch for ${g}`);
Q('s_ladder_to_switch', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `Rewrite the following if-else-if ladder as a switch statement that gives the same output for every value of grade.\n\n${F(ladderG('B'))}`,
  model: `${F(switchG('B'))}\n\nFor the grades A, B and Z both versions print ${ic(out(switchG('A')))}, ${ic(out(switchG('B')))} and ${ic(out(switchG('Z')))}. The final else becomes default, and each equality test becomes a case with a break.`,
  sol: 'The tests grade == const become case labels, the last else becomes default, and break keeps the cases separate.',
  scheme: [['Switch on grade with case A and case B and break statements', 1], ['default used for the final else', 1]],
}));
const cSwDef = code('int n = 2;', 'switch (n) {', '    case 1: System.out.println("Low"); break;', '    case 2: System.out.println("Medium"); break;', '    default: System.out.println("High");', '}');
Q('s_switch_def', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [20, 80],
  stem: 'Define a switch statement. State the data types that its selector expression can have.',
  model: `A **switch statement** is a multi-way selection statement: it compares the value of one selector expression with the constants of its case labels and executes the statements of the matching case; the **default** statements run when no case matches.\n\nThe selector can be of type **int** (or byte, short), **char** or **String**. For n = 2 the example below prints ${ic(out(cSwDef))}.\n\n${F(cSwDef)}`,
  sol: 'One mark for the definition and one mark for the permitted types.',
  scheme: [['Definition: one selector compared with constant case labels, matching case executed', 1], ['Selector types: int, char, String (not double, long, boolean)', 1]],
}));
