// ICSE 10 Computer Applications, ch09: topic t04 (Character methods) and the 15-mark programs.
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, match, ord, short, long, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustFail, expect, prog, S15 } from './q_util.mjs';

// ---- shared code
export const cCharTests = code(
  "char c1 = 'a', c2 = '4', c3 = ' ', c4 = '@';",
  'System.out.println(Character.isLetter(c1) + " " + Character.isDigit(c2));',
  'System.out.println(Character.isWhitespace(c3) + " " + Character.isLetterOrDigit(c4));',
  'System.out.println(Character.isUpperCase(c1) + " " + Character.isLowerCase(c1));',
);
export const cCaseConv = code(
  "char a = 'r';",
  "char b = 'T';",
  "char d = '7';",
  'System.out.println(Character.toUpperCase(a));',
  'System.out.println(Character.toLowerCase(b));',
  'System.out.println(Character.toUpperCase(d));',
  'System.out.println(Character.toUpperCase(a) + Character.toLowerCase(b));',
);
export const cLoopCount = code(
  'String s = "Room 12B";',
  'int letters = 0, digits = 0, others = 0;',
  'for (int i = 0; i < s.length(); i++) {',
  '    char ch = s.charAt(i);',
  '    if (Character.isLetter(ch))',
  '        letters++;',
  '    else if (Character.isDigit(ch))',
  '        digits++;',
  '    else',
  '        others++;',
  '}',
  'System.out.println(letters + " " + digits + " " + others);',
);
export const cToggle = code(
  'String w = "aB3x";',
  'String r = "";',
  'for (int i = 0; i < w.length(); i++) {',
  '    char ch = w.charAt(i);',
  '    if (Character.isLowerCase(ch))',
  '        r = r + Character.toUpperCase(ch);',
  '    else if (Character.isUpperCase(ch))',
  '        r = r + Character.toLowerCase(ch);',
  '    else',
  '        r = r + ch;',
  '}',
  'System.out.println(r);',
);
export const cLadder = (ch) => code(
  `char ch = '${ch}';`,
  'if (Character.isUpperCase(ch))',
  '    System.out.println("Upper case");',
  'else if (Character.isLowerCase(ch))',
  '    System.out.println("Lower case");',
  'else if (Character.isDigit(ch))',
  '    System.out.println("Digit");',
  'else',
  '    System.out.println("Other");',
);
export const cLadderBody = cLadder('k').split('\n').slice(1).join('\n');

// ================================================================ t04 Character methods
Q('m_isletterordigit', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'A registration form accepts a character only if it is a letter or a digit. Which method of the Character class returns true for such a character?',
  opts: distinct(['isLetterOrDigit()', 'isLetter()', 'isDigit()', 'isAlphaNumeric()']),
  sol: `isLetterOrDigit is true for a letter and also for a digit: ${ic("Character.isLetterOrDigit('9')")} gives ${ev("Character.isLetterOrDigit('9')")}, while a hash sign gives ${ev("Character.isLetterOrDigit('#')")}. isLetter is true for letters only, isDigit for digits only, and Java has no method called isAlphaNumeric.`,
}));
Q('m_toupper_type', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: "What does the call Character.toUpperCase('g') return?",
  opts: distinct(['The char G', 'The int 71', 'The String G', 'The boolean true']),
  sol: `The method toUpperCase of Character takes a char and returns a char: ${ic(ev("Character.toUpperCase('g')"))}. The integer code of that letter is ${ev("(int) Character.toUpperCase('g')")}, but it appears only when the result is used in arithmetic. A boolean result belongs to the testing methods such as isUpperCase.`,
}));
const pc = '';
Q('m_char_plus', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A student adds 1 to the result of a case conversion, as in the statement below. What does it display?\n\n${F("System.out.println(Character.toUpperCase('c') + 1);")}`,
  opts: distinct([ic(ev("Character.toUpperCase('c') + 1")), ic(ev("(char) (Character.toUpperCase('c') + 1)")), ic(ev("Character.toUpperCase('c') + \"1\"")), ic(ev("Character.toUpperCase('c')"))]),
  sol: `The call returns the char C, and in the expression C + 1 the char is replaced by its integer code, so the result is an int. To display a letter, the sum has to be converted back with (char), which would give ${ev("(char) (Character.toUpperCase('c') + 1)")}.`,
}));
Q('m_isupper_trace', mcq({
  t: 4, d: 2, c: 'application',
  stem: `A student tests a capital letter with the code below. What does it display?\n\n${F(code("char ch = 'M';", 'System.out.println(Character.isUpperCase(ch) + " " + Character.isLowerCase(ch));'))}`,
  opts: distinct([ic(out(code("char ch = 'M';", 'System.out.println(Character.isUpperCase(ch) + " " + Character.isLowerCase(ch));'))), ic('false true'), ic('true true'), ic('false false')]),
  sol: 'The letter M is a capital letter, so isUpperCase gives true. It is not a small letter, so isLowerCase gives false. A letter can never satisfy both tests.',
}));
Q('m_whitespace', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'For which value of the char variable ch does Character.isWhitespace(ch) return true?',
  opts: distinct([ic("' '"), ic("'0'"), ic("'_'"), ic("'.'")]),
  sol: `White space means characters such as the space, the tab and the new line. For a space the method gives ${ev("Character.isWhitespace(' ')")}; for the digit zero, the underscore and the full stop it gives ${ev("Character.isWhitespace('0')")}.`,
}));

Q('tf_letterordigit', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: "True or false? The method call Character.isLetterOrDigit('7') returns true.",
  sol: `The character 7 is a digit, so the call gives ${ev("Character.isLetterOrDigit('7')")}; isLetterOrDigit is true for letters and for digits.`,
}));
Q('ar_toupper_plus', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: "The statement System.out.println(Character.toUpperCase('b') + 1); displays 67.",
  r: 'The method toUpperCase returns a char, and a char used in an arithmetic expression is replaced by its integer code.',
  sol: `The program really displays ${ev("Character.toUpperCase('b') + 1")}, so (A) is true. The returned char B has the code ${ev("(int) Character.toUpperCase('b')")}, and 1 is added to that number; (R) is true and explains why a number and not a letter appears.`,
}));
Q('mt_char', match({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Match each Character method call with the value it gives.',
  pairs: [
    ["Character.toUpperCase('x')", ev("Character.toUpperCase('x')")],
    ["Character.toLowerCase('Q')", ev("Character.toLowerCase('Q')")],
    ["Character.isDigit('8')", ev("Character.isDigit('8')")],
    ["Character.isWhitespace('a')", ev("Character.isWhitespace('a')")],
  ],
  sol: 'toUpperCase and toLowerCase return a char, so x becomes X and Q becomes q. isDigit is true for the character 8, and isWhitespace is false for the letter a.',
}));
Q('ord_classify', ord({
  t: 4, d: 3, c: 'application',
  stem: 'Arrange the steps of a program that counts the digits in a String word, in the order in which they are carried out.',
  items: ['Read the text into a String variable', 'Start a loop for the positions from 0 to length() - 1', 'Pick the character at the position with charAt(i)', 'Test it with Character.isDigit and increase the counter if true', 'Display the counter after the loop ends'],
  sol: 'The text must exist before it can be scanned, the loop visits every position, each character is picked and tested inside the loop, and the total is shown only after the loop has finished.',
}));

// ---- code output, t04
expect(out(cCharTests), 'true true\ntrue false\nfalse true', 'char tests facts');
expect(out(cCaseConv), 'R\nt\n7\n198', 'case conversion facts');
expect(out(cLoopCount), '5 2 1', 'loop count facts');
expect(out(cToggle), 'Ab3X', 'toggle facts');
Q('co_char_tests', co({
  pre: 'A form validator tests four characters as shown. Write the exact output.',
  t: 4, d: 3, c: 'application',
  code: cCharTests,
  sol: 'The letter a is a letter, and the character 4 is a digit: true true. A space is white space, but the symbol @ is neither a letter nor a digit: true false. The letter a is not upper case but is lower case: false true.',
}));
Q('co_case_conv', co({
  pre: 'Three characters pass through case-conversion methods below. Write the exact output.',
  t: 4, d: 4, c: 'application',
  code: cCaseConv,
  sol: 'toUpperCase of r is R and toLowerCase of T is t. A digit has no case, so 7 comes back unchanged. In the last line the two char values are added as integer codes: 82 for R and 116 for t, so a number, 198, is displayed and not a letter.',
}));
Q('co_loop_count', co({
  pre: 'A room label is analysed by a loop. Write the exact output of the code.',
  t: 4, d: 4, c: 'application',
  code: cLoopCount,
  sol: 'The loop picks the 8 characters of Room 12B one by one. The letters are R, o, o, m and B, the digits are 1 and 2, and the space is the only other character, so the counts are 5, 2 and 1.',
}));
Q('co_char_toggle', co({
  pre: 'A text cleaner changes the case of each letter. Write the exact output of the code below.',
  t: 4, d: 4, c: 'application',
  code: cToggle,
  sol: 'Each character is tested in turn. The lower-case a becomes A, the upper-case B becomes b, the digit 3 is not a letter and is copied unchanged, and the lower-case x becomes X.',
}));

// ---- short answers, t04
Q('s_char_ladder', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Write an if-else-if ladder to display Upper case, Lower case, Digit or Other for a char variable ch, using methods of the Character class.',
  model: `${F(cLadderBody)}\n\nFor ch = 'k' the output is ${ic(out(cLadder('k')))}; for ch = '7' it is ${ic(out(cLadder('7')))} and for ch = '#' it is ${ic(out(cLadder('#')))}.`,
  sol: 'Test the three kinds of character in turn and let the final else catch everything else.',
  scheme: [['isUpperCase, isLowerCase and isDigit used as the conditions of the ladder', 1], ['Correct message for each kind, with else for other characters', 1]],
}));
const cA1 = code("System.out.println(Character.toUpperCase('a') + 1);");
const cA2 = code("System.out.println((char) (Character.toUpperCase('a') + 1));");
Q('s_toupper_ret', short({
  t: 4, d: 4, c: 'analysis', marks: 2, wl: [30, 100],
  stem: "Explain why the statement System.out.println(Character.toUpperCase('a') + 1); displays a number and not a letter. How can the letter be displayed?",
  model: `toUpperCase returns the **char** A. When a char is used with + and an int, it is replaced by its integer code, so the program adds 1 to that code and displays the number ${ic(out(cA1))}.\n\nTo display a letter, convert the sum back to char with a cast: ${ic("(char) (Character.toUpperCase('a') + 1)")} displays ${ic(out(cA2))}.`,
  sol: 'One mark for the reason (char becomes an int in arithmetic) and one for the cast with the result.',
  scheme: [['Reason: the char is converted to its integer code in the arithmetic expression', 1], ['Cast to char gives the next letter, with the output', 1]],
}));
Q('s_letter_digit', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between the methods isLetter() and isLetterOrDigit() of the class Character. Give a character for which they give different results.',
  model: `**isLetter(ch)** is true only when ch is a letter. **isLetterOrDigit(ch)** is true when ch is a letter or a digit.\n\nFor the character 8 they differ: ${ic("Character.isLetter('8')")} gives ${ic(ev("Character.isLetter('8')"))}, but ${ic("Character.isLetterOrDigit('8')")} gives ${ic(ev("Character.isLetterOrDigit('8')"))}. For a letter such as k both give true.`,
  sol: 'One mark for the difference and one for the example character with the two results.',
  scheme: [['isLetter: letters only; isLetterOrDigit: letters and digits', 1], ['A character such as a digit giving different results, with both values', 1]],
}));

// ================================================================ 15-mark programs

// ---- password strength (t4)
const srcKey = code(
  'import java.util.Scanner;',
  '',
  'public class KeyStrength {',
  '    // Counts the kinds of characters in a password',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String pw = sc.next();',
  '        int upper = 0, lower = 0, digit = 0, other = 0;',
  '        for (int i = 0; i < pw.length(); i++) {',
  '            char ch = pw.charAt(i);',
  '            if (Character.isUpperCase(ch))',
  '                upper++;',
  '            else if (Character.isLowerCase(ch))',
  '                lower++;',
  '            else if (Character.isDigit(ch))',
  '                digit++;',
  '            else',
  '                other++;',
  '        }',
  '        System.out.println("Upper case letters = " + upper);',
  '        System.out.println("Lower case letters = " + lower);',
  '        System.out.println("Digits = " + digit);',
  '        System.out.println("Other characters = " + other);',
  '        if (pw.length() >= 8 && upper > 0 && lower > 0 && digit > 0 && other > 0)',
  '            System.out.println("Strong password");',
  '        else',
  '            System.out.println("Weak password");',
  '    }',
  '}',
);
Q('l_keystrength', long({
  t: 4, d: 3, c: 'application', marks: 15,
  stem: 'The imagined Vidya Mitra app rates the password of a student. Write a program in Java to accept a password (a single word without spaces) and display the number of upper case letters, lower case letters, digits and other characters in it. The password is strong if it has at least 8 characters and at least one character of each of the four kinds; otherwise it is weak. Display the verdict. Use the methods of the Character class. Sample input: Sundar@2026 (this is a strong password).',
  model: prog({ src: srcKey, stdin: 'Sundar@2026\n', also: ['kite2026\n'], vars: [['pw', 'String', 'the password typed by the user'], ['upper, lower, digit, other', 'int', 'counters for the four kinds of characters'], ['i', 'int', 'position of the character being examined'], ['ch', 'char', 'the character at position i']] }),
  sol: 'Read the word and visit every position with charAt in a loop. A ladder of Character methods decides the kind of each character and increases its own counter; the last else counts everything else. After the loop, the strength rule joins five conditions with &&.',
  scheme: S15(3, 2, 'Loop over every character with charAt; each kind counted with the correct Character method; strength condition', 2, 2),
}));

// ---- text amounts (t3)
const srcGrain = code(
  'import java.util.Scanner;',
  '',
  'public class GrainLot {',
  '    // Weight and value of sacks; the readings are typed as text',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String sacks = sc.next();',
  '        String weight = sc.next();',
  '        String rate = sc.next();',
  '        int n = Integer.parseInt(sacks);',
  '        double w = Double.parseDouble(weight);',
  '        double r = Double.parseDouble(rate);',
  '        double total = n * w;',
  '        double amount = total * r;',
  '        System.out.println("Total weight = " + total + " kg");',
  '        System.out.println("Amount = Rs " + amount);',
  '    }',
  '}',
);
Q('l_grainlot', long({
  t: 3, d: 3, c: 'application', marks: 15,
  stem: 'A farmers\' cooperative of an imagined village weighs grain sacks. The clerk types the number of sacks, the weight of each sack in kilograms and the rate per kilogram in rupees, and the three values reach the program as text (for example "12", "48.5" and "22.5"). Write a program in Java to accept the three values as Strings, convert them with suitable parse methods, and display the total weight and the amount payable. Sample input: 12 48.5 22.5',
  model: prog({ src: srcGrain, stdin: '12 48.5 22.5\n', also: ['5 40 18\n'], vars: [['sacks, weight, rate', 'String', 'the three values as typed'], ['n', 'int', 'number of sacks'], ['w, r', 'double', 'weight of one sack and rate per kilogram'], ['total', 'double', 'total weight in kilograms'], ['amount', 'double', 'amount payable in rupees']] }),
  sol: 'The values are read with next() as Strings. The number of sacks is a whole number, so parseInt is used; the weight and the rate may have decimals, so parseDouble is used. The total weight is the product of the number of sacks and the weight of one sack, and the amount is that total times the rate.',
  scheme: S15(3, 2, 'Correct parse method for each value (parseInt for the count, parseDouble for the others); total weight and amount calculated', 2, 2),
}));

// ---- case swap (t4)
const srcSwap = code(
  'import java.util.Scanner;',
  '',
  'public class CaseSwap {',
  '    // Changes the case of every letter of a sentence',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String text = sc.nextLine();',
  '        String result = "";',
  '        int changed = 0;',
  '        for (int i = 0; i < text.length(); i++) {',
  '            char ch = text.charAt(i);',
  '            if (Character.isUpperCase(ch)) {',
  '                result = result + Character.toLowerCase(ch);',
  '                changed++;',
  '            } else if (Character.isLowerCase(ch)) {',
  '                result = result + Character.toUpperCase(ch);',
  '                changed++;',
  '            } else',
  '                result = result + ch;',
  '        }',
  '        System.out.println("Changed text: " + result);',
  '        System.out.println("Letters changed: " + changed);',
  '    }',
  '}',
);
Q('l_caseswap', long({
  t: 4, d: 4, c: 'application', marks: 15,
  stem: 'A school noticeboard editor wants to reverse the case of a sentence: every upper case letter must become lower case and every lower case letter upper case, while digits, spaces and symbols stay as they are. Write a program in Java to accept a sentence, build the changed sentence character by character and display it with the number of letters changed. Use the methods of the Character class. Sample input: Hello India 2026! (the digits and the exclamation mark stay unchanged).',
  model: prog({ src: srcSwap, stdin: 'Hello India 2026!\n', also: ['Go, Team 7!\n'], vars: [['text', 'String', 'the sentence typed by the user'], ['result', 'String', 'the sentence with the case reversed'], ['changed', 'int', 'count of letters whose case was changed'], ['i', 'int', 'position of the character being examined'], ['ch', 'char', 'the character at position i']] }),
  sol: 'Read the whole line with nextLine and visit every position with charAt. A letter is changed with toLowerCase or toUpperCase according to its case and is counted; every other character is copied as it is. The new text grows by joining one character at a time.',
  scheme: S15(3, 2, 'Loop over every character; upper case to lower case and lower to upper with the right Character methods; other characters copied; count kept', 2, 2),
}));

// ---- PIN code (t3 + t4)
const srcPin = code(
  'import java.util.Scanner;',
  '',
  'public class PinCodeCheck {',
  '    // Checks a six-digit postal PIN code typed as text',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String pin = sc.next();',
  '        boolean ok = pin.length() == 6;',
  '        int sum = 0;',
  '        for (int i = 0; i < pin.length() && ok; i++) {',
  '            char ch = pin.charAt(i);',
  '            if (Character.isDigit(ch))',
  '                sum = sum + (ch - \'0\');',
  '            else',
  '                ok = false;',
  '        }',
  '        if (ok && pin.charAt(0) != \'0\') {',
  '            int value = Integer.parseInt(pin);',
  '            System.out.println("Valid PIN code");',
  '            System.out.println("Numeric value = " + value);',
  '            System.out.println("Digit sum = " + sum);',
  '        } else',
  '            System.out.println("Invalid PIN code");',
  '    }',
  '}',
);
Q('l_pincode', long({
  t: [3, 4], d: 4, c: 'application', marks: 15,
  stem: 'The imagined Doot Post office checks the PIN code that a customer writes on a parcel. A valid PIN code has exactly six characters, all of them digits, and does not begin with 0. Write a program in Java to accept the PIN code as a String and display Invalid PIN code if it breaks the rule. For a valid PIN code, convert it to an int with a parse method and display its numeric value and the sum of its digits. Sample input: 560034 (a valid PIN code).',
  model: prog({ src: srcPin, stdin: '560034\n', also: ['56O034\n', '056001\n', '4100\n'], vars: [['pin', 'String', 'the PIN code typed by the user'], ['ok', 'boolean', 'stays true while the PIN code looks valid'], ['sum', 'int', 'sum of the digits'], ['i', 'int', 'position of the character being examined'], ['ch', 'char', 'the character at position i'], ['value', 'int', 'numeric value of a valid PIN code']] }),
  sol: 'Length six is tested first; the loop then tests every character with isDigit and adds its value, which is the character minus the character 0. A valid code is converted with parseInt. The first character is compared with the character 0 to reject a leading zero.',
  scheme: S15(3, 2, 'Length test and isDigit test for every character; leading zero rejected; parseInt used for the valid code; digit sum', 2, 2),
}));

// ---- speed round (t3)
const srcSpeed = code(
  'import java.util.Scanner;',
  '',
  'public class SpeedRound {',
  '    // A three-question quiz whose answers are typed as text',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String a1 = sc.next();',
  '        String a2 = sc.next();',
  '        String a3 = sc.next();',
  '        int score = 0;',
  '        if (Integer.parseInt(a1) == 180) {',
  '            System.out.println("Question 1: correct");',
  '            score++;',
  '        } else',
  '            System.out.println("Question 1: wrong");',
  '        if (Double.parseDouble(a2) == 3.75) {',
  '            System.out.println("Question 2: correct");',
  '            score++;',
  '        } else',
  '            System.out.println("Question 2: wrong");',
  '        if (Long.parseLong(a3) == 10000000000L) {',
  '            System.out.println("Question 3: correct");',
  '            score++;',
  '        } else',
  '            System.out.println("Question 3: wrong");',
  '        System.out.println("Score = " + score + " out of 3");',
  '    }',
  '}',
);
Q('l_speedround', long({
  t: 3, d: 4, c: 'application', marks: 15,
  stem: 'The quiz club of an imagined school runs a speed round with three questions: (1) the number of minutes in 3 hours (answer 180, an int); (2) the area of a rectangle 2.5 cm by 1.5 cm (answer 3.75, a double); (3) the number of paise in 10 crore rupees (answer 10000000000, a long). The answers are typed as text. Write a program in Java to accept the three answers as Strings, convert each with the suitable parse method, and display for each question whether it is correct, and the final score out of 3. Sample input: 180 3.75 1000000000 (the third answer has one zero too few).',
  model: prog({ src: srcSpeed, stdin: '180 3.75 1000000000\n', also: ['180 3.75 10000000000\n'], vars: [['a1, a2, a3', 'String', 'the three answers as typed'], ['score', 'int', 'number of correct answers']] }),
  sol: 'Each answer is converted with the method that suits its type: parseInt for the minutes, parseDouble for the area and parseLong for the paise, which is too large for an int. Each converted answer is compared with the correct value and the score is increased when they are equal.',
  scheme: S15(3, 2, 'parseInt, parseDouble and parseLong used for the three answers; each answer compared and reported; score kept', 2, 2),
}));

// ---- line statistics (t4) - bank only
const srcLine = code(
  'import java.util.Scanner;',
  '',
  'public class LineStats {',
  '    // Counts the words, letters, digits and spaces in a line',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String line = sc.nextLine();',
  '        int letters = 0, digits = 0, spaces = 0, words = 0;',
  '        boolean inWord = false;',
  '        for (int i = 0; i < line.length(); i++) {',
  '            char ch = line.charAt(i);',
  '            if (Character.isWhitespace(ch)) {',
  '                spaces++;',
  '                inWord = false;',
  '            } else {',
  '                if (!inWord) {',
  '                    words++;',
  '                    inWord = true;',
  '                }',
  '                if (Character.isLetter(ch))',
  '                    letters++;',
  '                else if (Character.isDigit(ch))',
  '                    digits++;',
  '            }',
  '        }',
  '        System.out.println("Words = " + words);',
  '        System.out.println("Letters = " + letters);',
  '        System.out.println("Digits = " + digits);',
  '        System.out.println("Spaces = " + spaces);',
  '    }',
  '}',
);
Q('l_linestats', long({
  t: 4, d: 5, c: 'analysis', marks: 15,
  stem: 'A railway enquiry screen of an imagined station shows a line of text such as "Train 12627 leaves from Platform 4". Write a program in Java to accept a line of text and display the number of words, letters, digits and spaces in it. A word is a group of characters not separated by white space. Use the methods of the Character class and do not use any method of the String class other than length() and charAt(). Sample input: Train 12627 leaves from Platform 4',
  model: prog({ src: srcLine, stdin: 'Train 12627 leaves from Platform 4\n', also: ['Exit 2 only\n'], vars: [['line', 'String', 'the line of text'], ['letters, digits, spaces, words', 'int', 'counters'], ['inWord', 'boolean', 'true while the loop is inside a word'], ['ch', 'char', 'the character at position i']] }),
  sol: 'Every white space character is a space and ends the current word. A non-space character starts a new word when the loop was not already inside one; it is then counted as a letter or a digit by the Character methods.',
  scheme: S15(3, 2, 'Letters, digits and spaces counted with Character methods; words counted by detecting the start of each word', 2, 2),
}));

// ---- toll gate (t2 + t3) - bank only
const srcToll = code(
  'import java.util.Scanner;',
  '',
  'public class TollGate {',
  '    // Collection at a toll gate; the readings are typed as text',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        Integer vehicles = Integer.valueOf(sc.next());',
  '        Double toll = Double.valueOf(sc.next());',
  '        Double concession = Double.valueOf(sc.next());',
  '        Double gross = vehicles * toll;',
  '        double discount = gross * concession / 100;',
  '        double net = gross - discount;',
  '        System.out.println("Gross collection = " + gross);',
  '        System.out.println("Concession = " + discount);',
  '        System.out.println("Net collection = " + net);',
  '    }',
  '}',
);
Q('l_tollgate', long({
  t: [2, 3], d: 4, c: 'application', marks: 15,
  stem: 'A toll gate of an imagined highway records the number of vehicles, the toll per vehicle in rupees and the concession percentage given to local vehicles. The three readings reach the program as text. Write a program in Java that reads the three values as Strings, stores them in objects of the wrapper classes Integer and Double using the valueOf method, and displays the gross collection, the concession amount and the net collection. Use the wrapper objects directly in the calculation. Sample input: 240 85.5 10',
  model: prog({ src: srcToll, stdin: '240 85.5 10\n', also: ['100 60 0\n'], vars: [['vehicles', 'Integer', 'number of vehicles (wrapper object)'], ['toll, concession', 'Double', 'toll per vehicle and concession percentage (wrapper objects)'], ['gross', 'Double', 'gross collection, a wrapper object'], ['discount, net', 'double', 'concession amount and net collection']] }),
  sol: 'Integer.valueOf and Double.valueOf convert the text into wrapper objects. In vehicles * toll the two objects are unboxed for the multiplication, and the double result is autoboxed into the Double variable gross; the later arithmetic unboxes it again.',
  scheme: S15(3, 2, 'valueOf used to create Integer and Double objects; unboxing in the arithmetic; gross, concession and net calculated', 2, 2),
}));
void [mustFail, pc];
