// ICSE 10 Computer Applications, ch02: Revision of Values, Data Types and Operators. Topics t01 and t02.
// Every program, scenario and value is written for SOYL (imagined schools, shops and people). Every output or error
// quoted anywhere is produced by running the Java code (javaOut/javaErr through the helpers in q_util.mjs).
import { Q, mcq, ar, tf, fb, match, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, raw, ev, out, distinct, mustCompile, mustFail } from './q_util.mjs';

// ================================================================ t01 Character set, ASCII, Unicode, escape sequences
export const pow7 = ev('(int) Math.pow(2, 7)');
Q('m_ascii_bits', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'How many bits does the ASCII code use for one character, and what is the range of its codes?',
  opts: distinct(['7 bits; codes 0 to 127', '8 bits; codes 0 to 127', '16 bits; codes 0 to 65535', '7 bits; codes 1 to 128']),
  sol: `With 7 bits there are 2 raised to 7 = ${pow7} different codes, numbered from 0 up to ${ev('(int) Math.pow(2, 7) - 1')}. The 16-bit option describes the size of a Java char, not of ASCII, and a range of 0 to 127 cannot need 8 bits.`,
}));
Q('m_code_a', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A spelling game stores the lower-case letter a. What does ${ic("System.out.println((int) 'a');")} display?`,
  opts: distinct([ev("(int) 'a'"), ev("(int) 'A'"), ev("(int) 'b'"), ev("(int) '0'")]),
  sol: `The cast (int) turns the character into its numeric code. The code of lower-case a is ${ev("(int) 'a'")}; ${ev("(int) 'A'")} is the code of capital A, ${ev("(int) 'b'")} of b and ${ev("(int) '0'")} of the digit character 0.`,
}));
Q('m_char_plus', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A cipher exercise adds 1 to a letter. What does ${ic("System.out.println('A' + 1);")} display?`,
  opts: distinct([ev("'A' + 1"), 'B', 'A1', ev("(int) 'A'")]),
  sol: `In 'A' + 1 the char is promoted to int, so the code ${ev("(int) 'A'")} is added to 1 and the result is the int ${ev("'A' + 1")}, not a letter. To obtain the letter the sum must be cast back: (char) ('A' + 1) displays ${ev("(char) ('A' + 1)")}.`,
}));
const sTab = raw`String s = "A\tB\n";` + '\nSystem.out.println(s.length());';
Q('m_tab_len', mcq({
  t: 1, d: 4, c: 'application',
  stem: `The string below contains a tab escape and a new-line escape. What does the code display?\n\n${F(sTab)}`,
  opts: distinct([out(sTab), '6', '3', '5']),
  sol: 'Each escape sequence is written with two characters in the source code but stands for a single character. The string holds A, a tab, B and a new line, which is four characters in all.',
}));
Q('m_why_unicode', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A school app must show a student name in Devanagari or Tamil as well as in English. Why is Unicode a better choice than ASCII?',
  opts: ['Unicode has codes for the letters of most world languages, but ASCII has only 128 codes', 'Unicode uses fewer bits for each character than ASCII', 'ASCII cannot represent any digit', 'Unicode can be used only for Hindi'],
  sol: `Java stores each char as a Unicode value in ${ev('Character.SIZE')} bits, so its range is far larger than the 128 codes of ASCII. ASCII does include the digits, and Unicode needs more bits, not fewer.`,
}));
Q('ar_ab', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `${ic("System.out.println('A' + 'B');")} displays ${ev("'A' + 'B'")} and not AB.`,
  r: 'When arithmetic is done on char operands, Java promotes them to int and uses their numeric codes.',
  sol: `The statement really displays ${ev("'A' + 'B'")}, which is 65 + 66, so (A) is true. (R) is true as well and it is exactly why the characters are added as numbers instead of being joined.`,
}));
Q('tf_ascii_order', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: "True or false? The ASCII code of the lower-case letter 'a' is smaller than the ASCII code of the capital letter 'A'.",
  sol: `The lower-case letters come after the capitals: the code of 'a' is ${ev("(int) 'a'")} and that of 'A' is ${ev("(int) 'A'")}.`,
}));
Q('fb_ascii', fb({
  t: 1, d: 1, c: 'recall',
  stem: "In ASCII the code of the capital letter 'A' is ___ and the code of the digit character '0' is ___.",
  acc: [['65'], ['48']],
  sol: `Running (int) 'A' gives ${ev("(int) 'A'")} and (int) '0' gives ${ev("(int) '0'")}; note that the digit character 0 is not the number 0.`,
}));
Q('mt_escape', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each escape sequence of Java with the effect it has inside a string that is printed.',
  pairs: [
    [ic(raw`\n`), 'moves the output to the start of a new line'],
    [ic(raw`\t`), 'moves the output to the next tab stop'],
    [ic(raw`\\`), 'prints one backslash'],
    [ic(raw`\"`), 'prints one double quotation mark'],
  ],
  sol: `For instance ${ic(raw`System.out.println("a\\b");`)} displays ${ic(out(raw`System.out.println("a\\b");`))}, and ${ic(raw`System.out.println("a\"b");`)} displays ${ic(out(raw`System.out.println("a\"b");`))}.`,
}));
Q('m_esc_two_lines', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A programmer wants one println statement to show the words Roll and Name on two separate lines. Which escape sequence should be written between the two words inside the string?',
  opts: distinct([ic(raw`\n`), ic(raw`\t`), ic(raw`\\`), ic(raw`\"`)]),
  sol: `A new-line escape ends the current line. For example ${ic(raw`System.out.println("Roll\nName");`)} shows ${ic(out(raw`System.out.println("Roll\nName");`).split('\n').join(' / '))} (lines joined by a slash here). The tab only leaves a gap, and the other two print a backslash and a quotation mark.`,
}));
export const cEscLines = code(raw`System.out.print("Name:\nRiya\n");`, raw`System.out.println("Class: \"IX\"");`);
Q('co_esc_lines', co({
  pre: 'A report card line is printed by this code. Write the exact output.',
  t: 1, d: 3, c: 'application', code: cEscLines,
  sol: 'The first statement is print, but its text holds two new-line escapes, so the output has two lines and ends on a fresh line. In the second statement each backslash-quote prints a quotation mark.',
}));
const stmtEsc = raw`System.out.println("Rate: \"Gold\" \\ Silver");`;
Q('s_stmt_escape', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: `Write one Java statement that displays exactly this line, including the quotation marks and the backslash: ${ic(raw`Rate: "Gold" \ Silver`)}`,
  model: `${F(stmtEsc)}\n\nOutput: ${ic(out(stmtEsc))}`,
  sol: 'Use the escape sequences backslash-quote for each quotation mark and a double backslash for the backslash itself.',
  scheme: [['Statement uses System.out.println or print with a string', 1], ['Correct escape sequences for the quotation marks and the backslash', 1]],
}));
Q('s_escape', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [15, 50],
  stem: 'What is an escape sequence in Java? Name two escape sequences with the effect of each.',
  model: `An **escape sequence** is a combination of a backslash and a character that stands for a single special character inside a string or character literal.\n\n- ${ic(raw`\n`)} starts a new line.\n- ${ic(raw`\t`)} moves to the next tab stop.`,
  sol: 'One mark for the meaning and one mark for two correct sequences with their effects.',
  scheme: [['Definition of an escape sequence', 1], ['Two sequences with their effects', 1]],
}));
Q('s_ascii_unicode', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [15, 50],
  stem: 'Distinguish between ASCII and Unicode.',
  model: `**ASCII** is a 7-bit code with ${pow7} characters (codes 0 to 127): English letters, digits and symbols.\n\n**Unicode** is a larger code (16 bits for a Java char) that has codes for the characters of most languages of the world. The ASCII codes are the first 128 Unicode values.`,
  sol: 'One mark for each code, with its size or range.',
  scheme: [['ASCII: 7 bits, 128 characters', 1], ['Unicode: larger code for characters of many languages', 1]],
}));

// ================================================================ t02 Tokens; constants and variables
Q('m_token_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What is a token in a Java program?',
  opts: ['The smallest individual unit of a program that has a meaning for the compiler', 'A complete statement that ends with a semicolon', 'A group of statements written inside a pair of braces', 'A line of comment written to explain the code'],
  sol: 'A program is broken into tokens by the compiler: keywords, identifiers, literals, punctuators and operators. A statement or a block is built from many tokens, and a comment is ignored.',
}));
mustCompile('int net_pay = 1;', 'net_pay');
mustFail('int 2ndTerm = 1;', '2ndTerm');
mustFail('int net pay = 1;', 'net pay');
mustFail('int class = 1;', 'class');
Q('m_valid_id', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is a valid identifier in Java?',
  opts: distinct([ic('net_pay'), ic('2ndTerm'), ic('net pay'), ic('class')]),
  sol: 'An identifier may contain letters, digits, the underscore and the dollar sign, and it must not start with a digit, contain a space or be a keyword. 2ndTerm starts with a digit, net pay has a space and class is a keyword.',
}));
mustCompile('int static1 = 1;', 'static1');
mustFail('int static = 1;', 'static');
mustCompile('int Static = 1;', 'Static');
Q('m_keyword', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which of the following words is a keyword of Java?',
  opts: distinct([ic('static'), ic('Static'), ic('print'), ic('value')]),
  sol: 'Keywords are written in lower case and cannot be used as names. Static with a capital S is only an ordinary identifier, and print and value are not reserved words.',
}));
Q('m_classify', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `In the statement ${ic('int count = 25;')}, what kinds of token are count, = and 25, in that order?`,
  opts: ['Identifier, operator, integer literal', 'Keyword, operator, integer literal', 'Identifier, punctuator, integer literal', 'Identifier, operator, real literal'],
  sol: 'count is a name chosen by the programmer, = is the assignment operator and 25 is a whole-number constant. The word int is the keyword and the semicolon is a punctuator.',
}));
mustCompile('final int DAYS = 7;\nSystem.out.println(DAYS);', 'final');
mustFail('const int DAYS = 7;', 'const');
mustFail('int final DAYS = 7;', 'int final');
mustFail('constant int DAYS = 7;', 'constant');
Q('m_const_decl', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which statement correctly declares a constant that holds the number of days in a week?',
  opts: distinct([ic('final int DAYS = 7;'), ic('const int DAYS = 7;'), ic('int final DAYS = 7;'), ic('constant int DAYS = 7;')]),
  sol: 'A constant is declared with the keyword final before the data type. Java has no const or constant keyword in this role, and the modifier cannot come after the type.',
}));
Q('ar_case', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The variables Total and total can be declared together in one method and they hold separate values.',
  r: 'Java is case-sensitive, so identifiers that differ in the case of a letter are different identifiers.',
  sol: `Running ${ic('int Total = 5; int total = 9;')} and then displaying both gives ${ic(out('int Total = 5;', 'int total = 9;', 'System.out.println(Total + " " + total);'))}. The case sensitivity of identifiers is the reason.`,
}));
Q('tf_final', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? After a variable is declared with final and given a value, a later statement can still change that value.',
  sol: `The compiler rejects such a statement with the message "${mustFail('final int M = 3;\nM = 4;')}".`,
}));
Q('mt_tokens', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each item of Java code with the kind of token it is.',
  pairs: [
    [ic('while'), 'keyword'],
    [ic('average'), 'identifier'],
    [ic("'Z'"), 'character literal'],
    [ic(';'), 'punctuator (separator)'],
  ],
  sol: 'while is reserved by the language; average is a name chosen by the programmer; a single character in single quotes is a character literal; the semicolon separates statements.',
}));
export const cUndeclared = code('int a = 14;', 'b = a * 2;', 'System.out.println(b);');
Q('co_err_undeclared', co({
  pre: 'A student forgot to declare a variable. The code does not compile. Write the error message that javac reports and the line on which it is reported.',
  t: 2, d: 3, c: 'analysis', error: true, code: cUndeclared,
  sol: 'The variable b is used on line 2 without being declared with a data type, so the compiler cannot find a symbol of that name. The fix is to write int b = a * 2;.',
}));
const cFinalErr = code('final double RATE = 7.5;', 'double fee = RATE * 12;', 'RATE = 8.0;', 'System.out.println(fee);');
Q('co_err_final', co({
  pre: 'A parking program keeps its hourly rate in a constant. The code does not compile. Write the error message and the line number.',
  t: 2, d: 3, c: 'analysis', error: true, code: cFinalErr,
  sol: 'RATE was declared with final, so after its first assignment no statement may give it another value. Line 3 tries to do so.',
}));
const cUninit = code('int marks;', 'int bonus = 5;', 'System.out.println(marks + bonus);');
Q('co_err_uninit', co({
  pre: 'The code below declares a variable but never gives it a value. Write the error message and the line number that javac reports.',
  t: 2, d: 3, c: 'analysis', error: true, code: cUninit,
  sol: 'A local variable must be given a value before it is used. marks is declared on line 1 but read on line 3 with no assignment in between.',
}));
Q('s_token_types', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: [10, 60],
  stem: 'Name the five kinds of token in Java and give one example of each.',
  model: '1. Keyword, for example `class`.\n2. Identifier, for example `total`.\n3. Literal, for example `25` or `"Pune"`.\n4. Punctuator (separator), for example `;`.\n5. Operator, for example `+`.',
  sol: 'One mark for any three kinds with correct examples, and the second mark only when all five kinds are named with examples.',
  scheme: [['Any three kinds named with examples', 1], ['All five kinds named with examples', 1]],
}));
Q('s_decl_init', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [15, 60],
  stem: 'Differentiate between declaring a variable and initialising it. Show both in one Java example.',
  model: `**Declaration** tells the compiler the name and the data type of a variable, for example ${ic('int seats;')}.\n\n**Initialisation** gives the variable its first value, for example ${ic('seats = 40;')}. Both can be written together as ${ic('int seats = 40;')}.`,
  sol: 'One mark for the meaning of each term; the example must show both.',
  scheme: [['Declaration explained with an example', 1], ['Initialisation explained with an example', 1]],
}));
