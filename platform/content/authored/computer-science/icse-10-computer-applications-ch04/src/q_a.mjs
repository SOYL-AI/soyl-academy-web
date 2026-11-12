// ICSE 10 Computer Applications, ch04: Revision of Conditional Constructs. Topic t01 (if, if-else, ladder, nested if).
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustFail } from './q_util.mjs';

// ---- shared code used by several items and by the slides
/** Discount ladder of an imagined garment shop; `b` is the bill. */
export const shopLadder = (b) => code(
  `int bill = ${b};`,
  'double discount;',
  'if (bill >= 5000)',
  '    discount = 15;',
  'else if (bill >= 3000)',
  '    discount = 10;',
  'else if (bill >= 1000)',
  '    discount = 5;',
  'else',
  '    discount = 0;',
  'System.out.println(discount);',
);
export const nestScholar = (m, inc) => code(
  `int marks = ${m}, income = ${inc};`,
  'if (marks >= 75) {',
  '    if (income <= 300000)',
  '        System.out.println("Full");',
  '    else',
  '        System.out.println("Half");',
  '} else {',
  '    System.out.println("None");',
  '}',
);
export const cDangle = code(
  'int stock = 40, order = 12;',
  'if (stock > 20)',
  '    if (order > 50)',
  '        System.out.println("Bulk");',
  'else',
  '    System.out.println("Retail");',
  'System.out.println("Done");',
);
export const cSemi = code('int marks = 28;', 'if (marks >= 33);', '    System.out.println("Pass");');
export const cAssignInt = code('int count = 4;', 'if (count = 4) {', '    System.out.println("Four");', '}');
export const cAssignBool = code('boolean open = false;', 'if (open = true)', '    System.out.println("Open");', 'else', '    System.out.println("Closed");');
export const cNoBraces = code('int n = 4;', 'if (n > 10)', '    System.out.println("Large");', '    System.out.println("Checked");');
export const cBraces = code('int n = 4;', 'if (n > 10) {', '    System.out.println("Large");', '    System.out.println("Checked");', '}');
export const cWrongOrder = (m) => code(
  `int m = ${m};`,
  'if (m >= 40)',
  '    System.out.println("Pass");',
  'else if (m >= 75)',
  '    System.out.println("Distinction");',
);
export const cDangleFlat = (p, q) => code(`int p = ${p}, q = ${q};`, 'if (p > 5)', '    if (q > 5)', '        System.out.println("alpha");', '    else', '        System.out.println("beta");');
export const cDangleBrace = (p, q) => code(`int p = ${p}, q = ${q};`, 'if (p > 5) {', '    if (q > 5)', '        System.out.println("alpha");', '} else', '    System.out.println("beta");');
const none = (s) => (s === '' ? 'nothing' : s);

// ================================================================ t01 if, if-else, ladder, nested if
Q('m_if_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What is the job of an if statement in a Java program?',
  opts: distinct(['It executes a statement or a block only when its condition is true', 'It repeats a block of statements a fixed number of times', 'It chooses one block out of many by matching a constant value', 'It stops the program when an error occurs']),
  sol: 'An if statement is a selection (decision-making) statement: the condition is evaluated once and the controlled statement runs only if it is true. Repeating is the work of loops, matching constants is the work of switch, and stopping the program is done by System.exit().',
}));
const errIntCond = mustFail(code('int x = 1;', 'if (x) {', '}'), 'int as condition');
Q('m_cond_type', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The condition written inside the brackets of an if statement must be an expression of which type?',
  opts: distinct(['boolean', 'int', 'char', 'String']),
  sol: `Java does not treat numbers as true or false. Using an int variable alone as the condition is rejected by the compiler with the message "${errIntCond}".`,
}));
const shopVals = [3400, 5200, 1500, 600];
Q('m_ladder_shop', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Rangoli Textiles gives a discount by the bill amount, as in the code below. What is displayed when the bill is 3400?\n\n${F(shopLadder(3400))}`,
  opts: distinct(shopVals.map((v) => ic(out(shopLadder(v))))),
  sol: `The conditions of a ladder are tested from the top and only the first true one is used. 3400 is not at least 5000, but it is at least 3000, so discount becomes 10 and the remaining tests are skipped. The other options belong to the bills ${shopVals.slice(1).join(', ')}.`,
}));
Q('m_dangling', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'In a program the keyword else follows two nested if statements and no braces are written. Which if does that else belong to?',
  opts: distinct(['The nearest if above it that does not yet have an else', 'The first if of the program', 'Both the if statements', 'None of them; the compiler reports an error']),
  sol: `An else always pairs with the closest unmatched if, whatever the indentation suggests. For example, with p = 8 and q = 3 the unbraced program ${ic(cDangleFlat(8, 3).split('\n').slice(1).join(' '))} displays ${ic(out(cDangleFlat(8, 3)))}, because the else belongs to the inner if. Braces can change the pairing.`,
}));
Q('m_semi_if', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A teacher's utility checks whether a student has passed. What does the following code display?\n\n${F(cSemi)}`,
  opts: distinct([ic(out(cSemi)), 'Nothing is displayed', 'A compile-time error is reported', 'Fail']),
  sol: 'The semicolon right after the closing bracket is itself a complete (empty) statement, so it becomes the whole body of the if. The println that follows is an ordinary statement and always runs. 28 is below 33, yet the word appears; this is a logical error and the compiler does not complain.',
}));
const errAssign = mustFail(cAssignInt, 'assignment in if (int)');
Q('m_eq_int', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `A beginner wanted to test whether count equals 4 but wrote one equals sign. What happens when the code below is compiled and run?\n\n${F(cAssignInt)}`,
  opts: distinct([`Compile-time error: ${errAssign}`, 'Four is displayed', 'Nothing is displayed', 'Run-time error: ArithmeticException']),
  sol: `The expression count = 4 is an assignment, and its value is the int 4. An if needs a boolean, so javac stops with "${errAssign}". The comparison operator is the double equals sign.`,
}));
Q('m_eq_vs_assign', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement correctly describes the operators = and == of Java?',
  opts: distinct(['= stores the value on its right in the variable on its left, while == compares two values and gives true or false', '= compares two values and gives true or false, while == stores a value in a variable', 'Both operators compare two values, but == is used only for Strings', 'Both operators store a value in a variable, but == also displays it']),
  sol: `The single equals sign is the assignment operator and the double equals sign is the relational (equality) operator. This is why ${ic('if (x = 5)')} with an int variable is rejected: the compiler says "${errAssign}".`,
}));
Q('m_nested_trace', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A school office decides a fee concession with the code below. What is displayed for marks 82 and income 420000?\n\n${F(nestScholar(82, 420000))}`,
  opts: distinct([ic(out(nestScholar(82, 420000))), ic(out(nestScholar(82, 250000))), ic(out(nestScholar(60, 100000))), 'Nothing is displayed']),
  sol: 'The outer condition marks >= 75 is true, so the inner if is evaluated. There income <= 300000 is false, so the inner else runs. Full would need an income of at most 300000, and None a mark below 75.',
}));
Q('m_ladder_feature', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement about an if-else-if ladder is correct?',
  opts: distinct(['The conditions are tested from the top and only the block of the first true condition is executed', 'All the conditions are tested and the block of every true condition is executed', 'The conditions are tested from the bottom upwards', 'The final else is compulsory, otherwise the program does not compile']),
  sol: `Once a condition is true its block runs and the rest of the ladder is skipped. The final else is optional: a ladder without it compiles, and a value that fails every test simply skips the ladder: with bill = 200 and only the tests bill >= 1000 and bill >= 500, the program displays ${none(out(code('int bill = 200;', 'if (bill >= 1000)', '    System.out.println("A");', 'else if (bill >= 500)', '    System.out.println("B");')))}.`,
}));
Q('m_nested_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following describes a nested if statement?',
  opts: distinct(['An if statement placed inside the block of another if or else statement', 'Two if statements written one after the other', 'An if statement that is followed by an else part', 'An if statement whose condition joins two tests with && or ||']),
  sol: 'In a nested if the inner statement is evaluated only when the outer branch is taken, so the second decision depends on the first. Two separate ifs are independent, and && and || only build a longer condition.',
}));
const cLogic = code('int a = 6, b = -2, c = 9;', 'if (a < 0 && b > 0 || c > 0)', '    System.out.println("Yes");', 'else', '    System.out.println("No");');
Q('m_logic_combo', mcq({
  t: 1, d: 4, c: 'application',
  stem: `A courier app checks a parcel with the statement below. What is displayed?\n\n${F(cLogic)}`,
  opts: distinct([ic(out(cLogic)), ic('No'), 'Both Yes and No', 'A compile-time error']),
  sol: 'The operator && has higher precedence than ||, so the condition is (a < 0 && b > 0) || (c > 0). The first part is false because a is positive, the second part is true, and false OR true is true. Reading it as a < 0 && (b > 0 || c > 0) would give No.',
}));
Q('m_braces', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A shop program has no braces after the if. What is displayed for n = 4?\n\n${F(cNoBraces)}`,
  opts: distinct([ic(out(cNoBraces)), 'Large and Checked on two lines', 'Nothing is displayed', 'A compile-time error']),
  sol: 'Without braces the if controls only the single statement that follows it, so the Large line is skipped. The second println is outside the if, and its indentation does not change that. Writing both statements inside braces would hide both lines when the condition is false.',
}));

Q('tf_equals', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? For String s = "Delhi", the expression s.equals("delhi") is true.',
  sol: `The method equals compares the characters of two Strings, and it is case-sensitive: here it gives ${ev('"Delhi".equals("delhi")')}, while "Delhi".equals("Delhi") gives ${ev('"Delhi".equals("Delhi")')}.`,
}));
const errElse = mustFail(code('System.out.println("x");', 'else', '    System.out.println("y");'), 'else alone');
Q('tf_else_alone', tf({
  t: 1, d: 2, c: 'recall', ans: false,
  stem: 'True or false? An else clause can be written in a Java program without an if statement before it.',
  sol: `An else must follow an if (or an if-else-if). Writing it alone makes javac report "${errElse}".`,
}));
Q('ar_semi', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'In the code `if (n > 10); System.out.println("Big");` the word Big is displayed even when n is 3.',
  r: 'The semicolon after the condition forms an empty statement that becomes the body of the if.',
  sol: `Run with n = 3 the program really displays ${ic(out(code('int n = 3;', 'if (n > 10);', '    System.out.println("Big");')))}, so (A) is true. (R) is also true, and it is the reason: the println is not controlled by the if at all.`,
}));
Q('ar_assign', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'For an int variable x, the statement `if (x = 5)` is rejected by the compiler.',
  r: 'The condition of an if statement must have the type boolean, and the assignment x = 5 has the type int.',
  sol: `javac reports "${mustFail(code('int x = 0;', 'if (x = 5) {', '}'))}", so (A) is true. (R) states the rule behind the error and therefore explains (A).`,
}));
Q('fb_dangling', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'In nested if statements written without braces, an else is paired with the ___ if that has no else yet.',
  acc: [['nearest', 'closest', 'preceding', 'previous', 'last']],
  sol: 'The pairing rule is that the else belongs to the nearest unmatched if, whatever the indentation shows.',
}));
Q('mt_construct', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each conditional construct with the job it does.',
  pairs: [
    [ic('if'), 'runs a block only when its condition holds'],
    [ic('if-else'), 'chooses between exactly two blocks'],
    ['if-else-if ladder', 'tests several conditions in turn and uses the first one that is true'],
    ['nested if', 'places an if statement inside the block of another if or else'],
  ],
  sol: 'A plain if has one branch, if-else has two, a ladder has several alternatives tested top to bottom, and nesting makes a second decision depend on the first.',
}));
const ordTests = ['marks >= 90', 'marks >= 75', 'marks >= 60', 'marks >= 40'];
const cOrderRight = (m) => code(`int marks = ${m};`, 'if (marks >= 90) System.out.println("A");', 'else if (marks >= 75) System.out.println("B");', 'else if (marks >= 60) System.out.println("C");', 'else if (marks >= 40) System.out.println("D");', 'else System.out.println("E");');
const cOrderWrong = (m) => code(`int marks = ${m};`, 'if (marks >= 40) System.out.println("D");', 'else if (marks >= 60) System.out.println("C");', 'else if (marks >= 75) System.out.println("B");', 'else if (marks >= 90) System.out.println("A");', 'else System.out.println("E");');
Q('ord_ladder', ord({
  t: 1, d: 4, c: 'analysis',
  stem: 'A coaching centre grades marks as A for 90 or more, B for 75 or more, C for 60 or more, D for 40 or more and E otherwise, using an if-else-if ladder. Arrange the four conditions in the order in which they must be written, from the first test to the last, so that every mark gets the right grade.',
  items: ordTests.map((x) => ic(x)),
  sol: `Each condition is a lower limit, so the largest limit must be tested first. If marks >= 40 came first, a score of 92 would print ${ic(out(cOrderWrong(92)))} instead of ${ic(out(cOrderRight(92)))}.`,
}));

// ---- code output, t01
Q('co_ladder', co({
  pre: 'An imagined sweet shop, Madhur Mithai, packs its boxes with the code below. Write the exact output.',
  t: 1, d: 3, c: 'application',
  code: code('int weight = 750;', 'if (weight > 1000)', '    System.out.println("Large box");', 'else if (weight > 500)', '    System.out.println("Medium box");', 'else if (weight > 250)', '    System.out.println("Small box");', 'else', '    System.out.println("Pouch");', 'System.out.println("Packed");'),
  sol: 'Tests are made from the top. 750 is not above 1000 but is above 500, so the second branch runs and the rest of the ladder is skipped. The last println is outside the ladder and always runs.',
}));
Q('co_dangling', co({
  pre: 'The else below is indented as if it belonged to the first if. Write the exact output of the code.',
  t: 1, d: 4, c: 'analysis',
  code: cDangle,
  sol: 'The else pairs with the nearest unmatched if, which is the one testing order > 50, not the one testing stock > 20. Here stock > 20 is true, order > 50 is false, so that inner else runs. The last statement is outside both ifs.',
}));
Q('co_semi', co({
  pre: 'A library clerk checks the number of overdue days with the code below. Write the exact output.',
  t: 1, d: 3, c: 'application',
  code: code('int days = 2;', 'if (days > 7);', '{', '    System.out.println("Fine charged");', '}', 'System.out.println("Slip printed");'),
  sol: 'The semicolon makes an empty statement the body of the if. The braces that follow are then just an ordinary block, which runs every time. So both lines appear even though days is not above 7.',
}));
Q('co_nested', co({
  pre: 'A cinema applies the code below to a visitor aged 14 who has a student card. Write the exact output.',
  t: 1, d: 4, c: 'application',
  code: code('int age = 14;', 'boolean card = true;', 'if (age < 18) {', '    if (card)', '        System.out.println("Ticket: 80");', '    else', '        System.out.println("Ticket: 120");', '} else {', '    if (age >= 60)', '        System.out.println("Ticket: 90");', '    else', '        System.out.println("Ticket: 150");', '}'),
  sol: 'age < 18 is true, so the outer if block runs. Inside it the variable card is true, so the first inner branch is chosen. The else block of the outer if is never entered.',
}));
Q('co_err_assign', co({
  pre: 'A student wants to test whether the value of units is 100, and writes the code below. State the error the compiler reports.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: code('int units = 100;', 'if (units = 100)', '    System.out.println("Hundred");'),
  sol: 'The single equals sign assigns instead of comparing. The value of the assignment is an int, but if needs a boolean. The corrected condition is units == 100.',
  scheme: [['Kind of error stated (compile-time) and its line', 1], ['Reason: assignment gives an int where a boolean is required', 1]],
}));
Q('co_err_else', co({
  pre: 'The code below was written to show the larger of two numbers. State the error that the compiler reports.',
  t: 1, d: 4, c: 'analysis', error: true,
  code: code('int a = 3, b = 7;', 'if (a > b);', '    System.out.println("a is larger");', 'else', '    System.out.println("b is larger");'),
  sol: 'The semicolon ends the if statement, so the else that follows has no if to join. The compiler reports it on the line of the else. Removing the semicolon fixes it.',
  scheme: [['Compile-time error with the correct line', 1], ['Cause: semicolon after the condition separates else from its if', 1]],
}));

// ---- short answers, t01
Q('s_dangling', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What is the dangling else problem? How can a programmer control which if an else belongs to?',
  model: `When an else follows nested if statements written without braces, it is not obvious which if it belongs to. Java pairs an else with the **nearest unmatched if**.\n\nWith p = 2 and q = 3 the unbraced program below prints ${none(out(cDangleFlat(2, 3)))}, because its else belongs to the inner if, which is never reached. Closing the inner if in braces makes the else belong to the outer if, and the same values then print ${none(out(cDangleBrace(2, 3)))}.\n\n${F(cDangleFlat(2, 3))}`,
  sol: 'One mark for the pairing rule and one for braces as the way to change it, with an example.',
  scheme: [['Else pairs with the nearest unmatched if', 1], ['Braces are used to make the intended pairing, with an example', 1]],
}));
export const stmtPF = code('if (marks >= 40)', '    System.out.println("Pass");', 'else', '    System.out.println("Fail");');
Q('s_stmt_pf', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Write a Java statement that displays Pass if the int variable marks is 40 or more, and Fail otherwise.',
  model: `${F(stmtPF)}\n\nFor marks = 56 the output is ${ic(out('int marks = 56;\n' + stmtPF))}, and for marks = 31 it is ${ic(out('int marks = 31;\n' + stmtPF))}.`,
  sol: 'An if-else statement with the condition marks >= 40 and two println statements.',
  scheme: [['Correct condition marks >= 40', 1], ['Both branches display the right word (if and else)', 1]],
}));
Q('s_eq_vs', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: [20, 70],
  stem: 'Distinguish between the operators = and == with an example of how mixing them up causes an error in an if statement.',
  model: `**=** is the assignment operator: it stores the value on the right in the variable on the left. **==** is the relational (equality) operator: it compares two values and gives true or false.\n\nIn ${ic('if (x = 5)')} with an int variable x, the compiler reports "${errAssign}", because an assignment gives an int, not a boolean.`,
  sol: 'One mark for the two meanings and one mark for the error caused by the mix-up.',
  scheme: [['= assigns, == compares', 1], ['Example of the wrong use in a condition and its effect', 1]],
}));
Q('s_nest_vs_ladder', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: [25, 90],
  stem: 'Distinguish between an if-else-if ladder and nested if statements. Mention when each one is used.',
  model: `In an **if-else-if ladder** the conditions are alternatives of one decision: they are tested one after another and only the first true one runs. It is used to choose one out of several outcomes, for example the grade bands of a marks list.\n\nIn **nested if** one if statement is placed inside the block of another, so the inner condition is tested only when the outer one is true (or false, for an else). It is used when a second decision depends on the first, for example a fee concession that depends on marks and then on income.`,
  sol: 'One mark for each construct, with its use.',
  scheme: [['Ladder: alternatives tested in turn, first true one runs; use', 1], ['Nested if: inner decision depends on the outer one; use', 1]],
}));
const cPair = code('int age = 20;', "char zone = 'N';", "if (age >= 18 && zone == 'N')", '    System.out.println("Eligible");');
Q('s_stmt_and', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'A club allows entry to a member when the int variable age is at least 18 and the char variable zone holds the letter N. Write one Java if statement that displays Eligible in that case.',
  model: `${F(cPair)}\n\nOutput: ${ic(out(cPair))}. The logical operator && joins the two tests in one condition, so no nesting is needed.`,
  sol: 'Both tests must be true, so they are joined with &&; the character is written in single quotes and compared with ==.',
  scheme: [["Condition age >= 18 and zone == 'N' joined with &&", 1], ['Complete if statement with the println', 1]],
}));
