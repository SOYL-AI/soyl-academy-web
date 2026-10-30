// CBSE 12 Computer Science, ch01 Python Revision Tour — question bank. Every program, scenario and data value is
// written by SOYL (imagined people and shops); no textbook, NCERT or board-paper program is reused (D-036).
// Every output stated anywhere in an item (code-output keys, MCQ options, solutions, model answers) is produced by
// running the code with Python 3 through runPy()/pyOut() in lib.mjs; nothing is typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

const S2 = [25, 50];
const S3 = [40, 75];
/** A Python code fence for stems, passages and model answers. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
const code = (...lines) => lines.join('\n');
/** Inline code for options (single line only). */
const ic = (s) => '`' + s + '`';
/** Output of `c` as inline code (one line). */
const outIc = (c, opts) => ic(pyOut(c, opts));
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};

// ================================================================ t01 Tokens, data types, operators, expressions
Q('m_identifier', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Ishaan is naming variables for a school fee program. Which of these is **NOT** a valid Python identifier?',
  opts: [ic('2nd_term_fee'), ic('_late_fine'), ic('fee2026'), ic('TotalFee')],
  sol: 'An identifier cannot begin with a digit. It may begin with a letter or an underscore and may contain digits after the first character, and names are case-sensitive.',
}));
Q('m_mutable', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following Python data types is **mutable**?',
  opts: [ic('list'), ic('tuple'), ic('str'), ic('int')],
  sol: 'A list can be changed in place (append, remove, item assignment). Tuples, strings and integers are immutable: any "change" creates a new object.',
}));
const cFloorNeg = code('print(-17 // 5, -17 % 5)');
Q('m_floor_neg', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Floor division and remainder with a negative number: what does this statement print?\n\n${F(cFloorNeg)}`,
  opts: distinct([outIc(cFloorNeg), ic('-3 -2'), ic('-3 2'), ic('-4 -2')]),
  sol: 'Floor division rounds towards minus infinity, so -17 // 5 is -4 (not -3). The remainder takes the sign of the divisor: -17 - (5 × -4) = 3.',
}));
const cPow = code('print(2 ** 3 ** 2 // 100)');
Q('m_power_assoc', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A chained exponent followed by floor division: what is the output?\n\n${F(cPow)}`,
  opts: distinct([outIc(cPow), ic('0'), ic('512'), ic('5.12')]),
  sol: 'The exponent operator is right-associative, so 3 ** 2 = 9 is worked out first and 2 ** 9 = 512. Floor division by 100 then gives 5. Working left to right would wrongly give 64 // 100 = 0.',
}));
const cLogic = code('print(not 5 > 3 or 4 == 4.0 and "a" in "chai")');
Q('m_logic', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `This statement mixes not, and, or, == and in. Predict its output.\n\n${F(cLogic)}`,
  opts: distinct([outIc(cLogic), ic('False'), ic('None'), ic('TypeError')]),
  sol: 'Relational and membership tests are done first: 5 > 3 is True, 4 == 4.0 is True, "a" in "chai" is True. Then not, then and, then or: (not True) or (True and True) = False or True = True.',
}));
const cDiv = code('print(10 / 4, 10 // 4, float(7) // 2)');
Q('m_division', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Three kinds of division on 10, 4 and 7: what is printed?\n\n${F(cDiv)}`,
  opts: distinct([outIc(cDiv), ic('2 2 3'), ic('2.5 2.5 3.5'), ic('2.5 2 3')]),
  sol: 'True division always gives a float (2.5). Floor division of two integers gives an integer (2), but if either operand is a float the result is a float, so 7.0 // 2 is 3.0.',
}));
const cConv = code('print(int("42") + int(3.9), str(5) * 2, bool(""), bool("0"))');
Q('m_conversion', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Mira is testing type conversion. What does this print?\n\n${F(cConv)}`,
  opts: distinct([outIc(cConv), ic('46 10 False False'), ic('45 10 True True'), ic('46 55 False True')]),
  sol: 'int(3.9) truncates to 3, so 42 + 3 = 45. str(5) * 2 repeats the string "5" to give "55". An empty string is falsy, but "0" is a non-empty string, so bool("0") is True.',
}));
Q('m_is_vs_eq', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What does the `is` operator test that `==` does not?',
  opts: [
    'Whether two names refer to the **same object** in memory',
    'Whether two values are equal after type conversion',
    'Whether a value is present inside a sequence',
    'Whether two objects have the same data type',
  ],
  sol: 'The identity operator checks whether both operands are one and the same object; the equality operator compares values. Membership is tested with in, and types with type() or isinstance().',
}));
Q('co_expr', co({
  pre: 'Floor division, multiplication and remainder on 17 and 5: write the exact output.',
  t: 1, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code('a = 17', 'b = 5', 'print(a // b * 2 + a % b)'),
  sol: '// and % have the same precedence as * and work left to right: 17 // 5 = 3, 3 * 2 = 6, 17 % 5 = 2, and 6 + 2 = 8.',
}));
Q('co_round', co({
  pre: 'This program rounds a price and compares an int with a float. Write its exact output.',
  t: 1, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code('price = 7.456', 'print(round(price, 1), abs(-3), 5 != 5.0)'),
  sol: 'round(7.456, 1) keeps one decimal place: 7.5. abs(-3) is 3. The integer 5 and the float 5.0 are equal in value, so 5 != 5.0 is False.',
}));
const cPrec = code('print(2 + 3 * 4 ** 2)');
Q('ar_precedence', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: `The expression ${ic('2 + 3 * 4 ** 2')} evaluates to ${ic(pyOut(cPrec))}.`,
  r: 'In Python, ** has a higher precedence than *, which in turn has a higher precedence than +.',
  sol: 'Both are true and R explains A: 4 ** 2 = 16 is worked out first, then 3 * 16 = 48, then 2 + 48 = 50.',
}));
const cTupleErr = code('t = (4, 6, 8)', 't[0] = 5');
Q('ar_tuple', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: `Running ${ic('t = (4, 6, 8)')} followed by ${ic('t[0] = 5')} raises an error.`,
  r: 'Tuples are immutable, so their elements cannot be reassigned.',
  sol: `Both are true and R explains A. Python reports: ${pyErr(cTupleErr)}.`,
}));
const cBoolAdd = code('print(True + True)');
Q('tf_bool_add', tf({
  t: 1, d: 2, c: 'understanding', ans: pyOut(cBoolAdd) === '2',
  stem: `True or false? The statement ${ic('print(True + True)')} prints ${ic('2')}.`,
  sol: 'bool is a subtype of int in Python: True behaves as 1 and False as 0 in arithmetic, so True + True is 2.',
}));
Q('fb_comment', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In Python, a single-line comment begins with the ___ symbol.',
  acc: [['#', 'hash']],
  sol: 'Everything after # on a line is a comment and is ignored by the interpreter.',
}));
Q('mt_tokens', match({
  t: 1, d: 1, c: 'understanding',
  stem: 'Match each token from a ticket-booking program with its category.',
  pairs: [
    [ic('while'), 'Keyword'],
    [ic('seats_left'), 'Identifier'],
    [ic('3.75'), 'Literal'],
    [ic('//'), 'Operator'],
  ],
  sol: 'while is a reserved word (keyword); seats_left is a programmer-chosen name (identifier); 3.75 is a fixed value (floating-point literal); // is the floor-division operator.',
}));
Q('s_mut_immut', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between mutable and immutable data types in Python, giving one example of each.',
  model: '1. A **mutable** object can be changed in place after it is created, e.g. a **list**: `marks.append(90)` changes the same list.\n2. An **immutable** object cannot be changed in place; any change makes a new object, e.g. a **string** or **tuple**: `name[0] = "R"` raises a TypeError.',
  sol: 'One mark for each type, with a correct example.',
  scheme: [['Mutable explained with an example', 1], ['Immutable explained with an example', 1]],
}));
const cErrType = code('items = 5', 'print("Total items: " + items)');
const cErrTypeFix = code('items = 5', 'print("Total items: " + str(items))');
Q('s_err_concat', short({
  t: 1, d: 2, c: 'analysis', marks: 2,
  stem: `Riya wrote this code to display a message, but it stops with an error. Name the error, give its reason and rewrite the code correctly.\n\n${F(cErrType)}`,
  model: `**Error:** ${ic(pyErr(cErrType))}. The + operator cannot join a string and an integer.\n\n**Corrected code** (convert the number to a string):\n\n${F(cErrTypeFix)}\n\nOutput: ${ic(pyOut(cErrTypeFix))}`,
  sol: 'Identify the TypeError caused by mixing str and int with +, and convert with str() (or pass both values to print separated by a comma).',
  scheme: [['Error named with its reason', 1], ['Correct code', 1]],
}));
const cExp1 = code('print(15 - 4 * 3 // 2)');
const cExp2 = code('print(3 > 2 > 1, 10 % 4 ** 2)');
const cExp3 = code('print(not 0 and 7 or 9)');
Q('s3_evaluate', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Evaluate each statement and write its output, showing the order of evaluation.\n\n${F('# (i)', cExp1, '# (ii)', cExp2, '# (iii)', cExp3)}`,
  model: `(i) 4 * 3 = 12, 12 // 2 = 6, 15 - 6 = 9 → ${ic(pyOut(cExp1))}\n\n(ii) 3 > 2 > 1 is a chained comparison, (3 > 2) and (2 > 1), which is True; 4 ** 2 = 16 and 10 % 16 = 10 → ${ic(pyOut(cExp2))}\n\n(iii) not 0 is True; True and 7 gives 7; 7 or 9 gives 7 → ${ic(pyOut(cExp3))}`,
  sol: 'One mark per part: precedence (** before * // %, then -), chained comparison, and short-circuit evaluation where and/or return an operand.',
  scheme: [['(i) correct with steps', 1], ['(ii) correct with steps', 1], ['(iii) correct with steps', 1]],
}));

// ================================================================ t02 Flow of control
const cRange = code('total = 0', 'for k in range(3, 15, 4):', '    total += k', 'print(total, k)');
Q('m_range_sum', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A for loop adds up the values of a range with step 4. What is the output?\n\n${F(cRange)}`,
  opts: distinct([outIc(cRange), ic('36 15'), ic('21 15'), ic('36 11')]),
  sol: 'range(3, 15, 4) gives 3, 7 and 11 (15 is excluded). Their sum is 21, and after the loop k keeps its last value, 11.',
}));
const cIf = code('x = 7', 'if x % 2 == 0:', '    print("even")', 'elif x > 5:', '    print("big odd")', 'else:', '    print("small odd")');
Q('m_if_elif', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: `An if-elif-else chain classifies the number 7. What does it print?\n\n${F(cIf)}`,
  opts: distinct([outIc(cIf), ic('even'), ic('small odd'), ic('big odd small odd')]),
  sol: '7 % 2 is 1, so the if test is False. The elif test 7 > 5 is True, so its block runs and the else block is skipped.',
}));
const cBreak = code('for ch in "Diwali":', '    if ch in "aeiou":', '        continue', '    if ch == "l":', '        break', '    print(ch, end="")');
Q('m_break_continue', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `A loop over the word Diwali uses continue and break. Predict the output.\n\n${F(cBreak)}`,
  opts: distinct([outIc(cBreak), ic('Dwl'), ic('Diwa'), ic('Dw li')]),
  sol: 'D is printed. i is a vowel, so continue skips it. w is printed. a is skipped. At l, break ends the loop, so l and the final i are never reached.',
}));
const cWhileCount = code('i = 1', 'count = 0', 'while i < 50:', '    i *= 3', '    count += 1', 'print(count)');
Q('m_while_count', mcq({
  t: 2, d: 3, c: 'application',
  stem: `How many times does the body of this loop run? (The program prints the count.)\n\n${F(cWhileCount)}`,
  opts: distinct([outIc(cWhileCount), ic('3'), ic('5'), ic('50')]),
  sol: 'i takes the values 1, 3, 9 and 27 at the test, each below 50, so the body runs 4 times. After the fourth run i is 81 and the test fails.',
}));
const cRangeList = code('print(list(range(10, 0, -3)))');
Q('m_range_neg', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A range that counts down in steps of 3: what does this statement print?\n\n${F(cRangeList)}`,
  opts: distinct([outIc(cRangeList), ic('[10, 7, 4, 1, -2]'), ic('[10, 7, 4]'), ic('[0, 3, 6, 9]')]),
  sol: 'With a negative step, range counts down and stops before reaching the stop value 0: 10, 7, 4, 1.',
}));
Q('co_reverse', co({
  pre: 'This while loop reverses the digits of 2607. Write its exact output.',
  t: 2, d: 3, c: 'application', marks: 2,
  code: code('n = 2607', 'r = 0', 'while n > 0:', '    r = r * 10 + n % 10', '    n //= 10', 'print(r)'),
  sol: 'Each pass takes the last digit with % 10, appends it to r and drops it from n with // 10: r goes 7, 70, 706, 7062. The zero in the middle is kept because it is followed by digits.',
}));
Q('co_stars', co({
  pre: 'This loop draws a pattern of hashes and dots. Write its exact output.',
  t: 2, d: 2, c: 'understanding', marks: 2,
  code: code('for i in range(1, 5):', '    print("#" * i + "." * (4 - i))'),
  sol: 'On each line i hashes are followed by 4 - i dots, so every line has 4 characters; i runs from 1 to 4.',
}));
Q('co_nested', co({
  pre: 'Nested for loops print products of i and j. Write the exact output, line by line.',
  t: 2, d: 4, c: 'analysis', marks: 3, time: 180,
  code: code('for i in range(1, 4):', '    for j in range(i, 4):', '        print(i * j, end=" ")', '    print()'),
  sol: 'For i = 1, j runs 1 to 3; for i = 2, j runs 2 to 3; for i = 3, j is only 3. Each inner loop prints products on one line, and print() then starts a new line.',
}));
Q('co_digit_sum', co({
  pre: 'This program adds the even digits of 58034. Write its exact output.',
  t: 2, d: 2, c: 'application', marks: 2,
  code: code('num = 58034', 'even_sum = 0', 'while num:', '    d = num % 10', '    if d % 2 == 0:', '        even_sum += d', '    num //= 10', 'print("Even digit sum:", even_sum)'),
  sol: 'The digits are taken from the right: 4, 3, 0, 8, 5. The even ones are 4, 0 and 8, giving 12. The loop stops when num becomes 0, which is falsy.',
}));
Q('co_else_loop', co({
  pre: 'A for loop with break and a loop else searches for a multiple of 7. Write its exact output.',
  t: 2, d: 4, c: 'analysis', marks: 2,
  code: code('for n in [9, 15, 21]:', '    if n % 7 == 0:', '        print("found", n)', '        break', 'else:', '    print("none")', 'print("done")'),
  sol: 'A loop else runs only if the loop ends without break. 21 is divisible by 7, so the loop breaks after printing it and the else is skipped; done is always printed.',
}));
Q('ord_while', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the parts of a counting `while` loop in the order in which they first take effect.',
  items: [
    'Initialise the loop variable, e.g. `count = 1`',
    'Test the condition, e.g. `count <= 10`',
    'Run the statements in the loop body',
    'Update the loop variable, e.g. `count += 1`',
  ],
  sol: 'A while loop needs its variable set before the test; the body runs only when the test is True, and the update must change the variable so that the test eventually fails.',
}));
Q('tf_elif', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'True or false? An `elif` clause can be written without a preceding `if`.',
  sol: 'elif means "else if": it is only valid as part of an if statement, after the if block (and before any else).',
}));
Q('fb_range', fb({
  t: 2, d: 1, c: 'understanding',
  stem: 'A loop written as for i in range(1, n) must print the numbers 1 to 10. The value of n must be ___.',
  acc: [['11']],
  sol: 'range stops before its stop value, so range(1, 11) gives 1 to 10: n must be 11.',
}));
Q('ar_break', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'A `break` inside an inner loop ends both the inner and the outer loop.',
  r: '`break` ends only the innermost loop in which it appears.',
  sol: 'A is false: control passes to the statement after the inner loop, and the outer loop carries on. R is true.',
}));
Q('s_for_while', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'When would you prefer a `for` loop and when a `while` loop? Give one example situation for each.',
  model: '1. Use **for** when the number of repetitions or the sequence is known in advance, e.g. going through every name in a class list.\n2. Use **while** when repetition depends on a condition whose end is not known beforehand, e.g. reading entries until the user types 0.',
  sol: 'Contrast a definite (counted or sequence) loop with an indefinite (condition-controlled) loop, with an example of each.',
  scheme: [['for: known sequence or count, with example', 1], ['while: condition-controlled, with example', 1]],
}));
const cErrSyntax = code('n = 6', 'if n % 2 = 0', '    print("even")');
const cErrSyntaxFix = code('n = 6', 'if n % 2 == 0:', '    print("even")');
Q('s_err_if', short({
  t: 2, d: 2, c: 'analysis', marks: 2,
  stem: `This check for an even number has two errors. Find them and rewrite the code correctly.\n\n${F(cErrSyntax)}`,
  model: `Python reports ${ic(pyErr(cErrSyntax))}.\n\n1. **=** is assignment; a comparison needs **==**.\n2. The if header must end with a **colon**.\n\n${F(cErrSyntaxFix)}\n\nOutput: ${ic(pyOut(cErrSyntaxFix))}`,
  sol: 'Half a mark for spotting and half for correcting each error.',
  scheme: [['== in place of =', 1], ['Colon after the condition', 1]],
}));
const cTrace = code('a, b = 0, 1', 'for k in range(4):', '    a, b = b, a + b', '    print(k, a, b)');
Q('s3_trace', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `Dry-run this program and write its output, showing the values of \`k\`, \`a\` and \`b\` after each pass.\n\n${F(cTrace)}`,
  model: `The right-hand side a + b is worked out with the old values before both names are reassigned together.\n\n${F(pyOut(cTrace))}`,
  sol: 'The tuple assignment updates a and b at once, so each b is the sum of the previous pair; four lines are printed.',
  scheme: [['Simultaneous assignment understood', 1], ['First two lines correct', 1], ['Last two lines correct', 1]],
}));
Q('s3_loop_choice', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: [40, 80],
  stem: 'Kabir wants to keep asking a shopkeeper for item prices until a price of 0 is entered, then show the total. Which loop should he use, and why? Write the loop.',
  model: `A **while** loop. The number of prices is not known in advance, so a counted for loop does not fit; the loop must keep running until a condition is met (a price of 0 is entered). The first price is read before the loop, and each new price is read at the end of the body so that the test always checks the latest value.\n\n${F('total = 0', 'price = int(input("Price: "))', 'while price != 0:', '    total += price', '    price = int(input("Price: "))', 'print("Total:", total)')}`,
  sol: 'Justify an indefinite (sentinel-controlled) loop and write it with the first input before the loop and the next input at the end of the body.',
  scheme: [['while chosen', 1], ['Reason: unknown count, stop on sentinel', 1], ['Correct loop', 1]],
}));
const cPrime = code(
  'n = int(input("Enter a number: "))',
  'if n < 2:',
  '    print(n, "is not prime")',
  'else:',
  '    d = 2',
  '    while d * d <= n:',
  '        if n % d == 0:',
  '            print(n, "is not prime")',
  '            break',
  '        d += 1',
  '    else:',
  '        print(n, "is prime")',
);
Q('l_prime', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'Write a program that reads a whole number and reports whether it is prime. Test it with the inputs 91 and 97.',
  model: `${F(cPrime)}\n\nSample runs:\n\n- input 91 → ${ic(pyOut(cPrime, { stdin: '91\n' }).replace('Enter a number: ', ''))} (91 = 7 × 13)\n- input 97 → ${ic(pyOut(cPrime, { stdin: '97\n' }).replace('Enter a number: ', ''))}\n\nTesting divisors only while d × d ≤ n is enough: a factor larger than the square root pairs with a smaller one already tested.`,
  sol: 'Read and convert the input; handle numbers below 2; test divisors with a loop; report the result once; the loop-else (or a flag) prints "prime" only when no divisor is found.',
  scheme: [['Input converted to int', 1], ['Numbers below 2 handled', 1], ['Divisor loop', 1], ['Correct decision (flag or loop-else)', 1], ['Correct output for both tests', 1]],
}));
const cDigits = code(
  'n = int(input("Enter a number: "))',
  'count = 0',
  'total = 0',
  'rev = 0',
  'while n > 0:',
  '    d = n % 10',
  '    count += 1',
  '    total += d',
  '    rev = rev * 10 + d',
  '    n //= 10',
  'print("Digits:", count)',
  'print("Sum:", total)',
  'print("Reverse:", rev)',
);
Q('l_digits', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'Write a program that reads a positive whole number and prints the number of digits, the sum of the digits and the number with its digits reversed. Show the output for the input 50817.',
  model: `${F(cDigits)}\n\nOutput for 50817:\n\n${F(pyOut(cDigits, { stdin: '50817\n' }).replace('Enter a number: ', ''))}`,
  sol: 'Extract digits with % 10 and drop them with // 10 inside one while loop, updating three accumulators.',
  scheme: [['Input and accumulators initialised', 1], ['Digit extraction with % and //', 1], ['Count and sum', 1], ['Reverse built correctly', 1], ['Correct output', 1]],
}));

// ================================================================ t03 Strings, lists, tuples, dictionaries
const cSlice = code('s = "Monsoon Mela"', 'print(s[2:7], s[-4:], s[::3])');
Q('m_slice', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Three slices of the string Monsoon Mela: what does this code print?\n\n${F(cSlice)}`,
  opts: distinct([outIc(cSlice), ic('nsoo Mela Msne'), ic('nsoon Mel Mso'), ic('onsoo ela Mno')]),
  sol: 's[2:7] takes indices 2 to 6 (nsoon); s[-4:] takes the last four characters (Mela); s[::3] takes every third character from index 0 (M, s, n, e).',
}));
const cJoin = code('w = "kaveri-river-delta"', 'print("_".join(w.split("-")).title())');
Q('m_join', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: `A hyphenated river name is split, joined with underscores and title-cased. What is the output?\n\n${F(cJoin)}`,
  opts: distinct([outIc(cJoin), ic('Kaveri-River-Delta'), ic('Kaveri_river_delta'), ic("['Kaveri', 'River', 'Delta']")]),
  sol: 'split("-") gives three words, "_".join() rejoins them with underscores, and title() capitalises the first letter of each word.',
}));
const cAlias = code('L = [4, 9, 2, 7]', 'M = L', 'M.append(5)', 'L[0] = 10', 'print(L, M, L is M)');
Q('m_alias', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `Two names, L and M, and one list: predict the output.\n\n${F(cAlias)}`,
  opts: distinct([outIc(cAlias), ic('[10, 9, 2, 7] [4, 9, 2, 7, 5] False'), ic('[10, 9, 2, 7, 5] [4, 9, 2, 7, 5] False'), ic('[10, 9, 2, 7] [10, 9, 2, 7, 5] True')]),
  sol: 'M = L does not copy the list; both names refer to one list object. The append through M and the assignment through L change the same list, so both print the same and L is M is True.',
}));
const cTuple = code('t = (3, 8, 3, 1)', 'print(t.count(3), t.index(8), t[1:3] * 2)');
Q('m_tuple_ops', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `count, index, slicing and repetition on a tuple of four numbers: what is printed?\n\n${F(cTuple)}`,
  opts: distinct([outIc(cTuple), ic('2 1 (16, 6)'), ic('1 1 (8, 3, 8, 3)'), ic('2 2 (8, 3, 1, 8, 3, 1)')]),
  sol: 'count(3) finds 3 twice; index(8) returns position 1; t[1:3] is (8, 3), and * 2 repeats the tuple rather than multiplying the numbers.',
}));
const cDict = code('d = {"ink": 12, "pen": 25}', 'd["pad"] = 40', 'd["ink"] += 3', 'print(len(d), d.get("ruler", 0), list(d.keys()))');
Q('m_dict_ops', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A stationery shop stores stock in a dictionary. What does this print?\n\n${F(cDict)}`,
  opts: distinct([outIc(cDict), ic("3 None ['ink', 'pen', 'pad']"), ic("4 0 ['ink', 'pen', 'pad', 'ink']"), ic('KeyError')]),
  sol: 'Assigning to a new key adds it, so there are 3 keys. get() returns the default 0 for a missing key instead of raising KeyError. Updating "ink" does not add a new key; keys keep their insertion order.',
}));
Q('m_extend', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which list method adds **each item** of another list to the end of a list?',
  opts: [ic('extend()'), ic('append()'), ic('insert()'), ic('update()')],
  sol: 'extend() adds the items one by one; append() would add the whole other list as a single element; insert() adds one item at a position; update() belongs to dictionaries.',
}));
Q('m_dict_key', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of these **cannot** be used as a dictionary key?',
  opts: [ic('[2, 5]'), ic('(2, 5)'), ic('"roll_25"'), ic('25')],
  sol: 'Keys must be immutable (hashable). A list is mutable, so it raises TypeError: unhashable type; a tuple of numbers, a string and an integer are all valid keys.',
}));
const cStrAssign = code('city = "Pune"', 'city[0] = "T"');
Q('m_str_immut', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `This code tries to change the first letter of a city name in place. What happens when it runs?\n\n${F(cStrAssign)}`,
  opts: [
    `It stops with ${ic(pyErr(cStrAssign))}`,
    'city becomes "Tune"',
    'A new string "Tune" is created and stored in city',
    'Nothing changes and no error is reported',
  ],
  sol: 'Strings are immutable, so a character cannot be replaced by item assignment. To get "Tune", build a new string: "T" + city[1:].',
}));
const cMarks = code('marks = {"Asha": 78, "Ravi": 64, "Meena": 91}', 'best = max(marks, key=marks.get)', 'print(best, sorted(marks.values()))');
Q('m_dict_max', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `max() with a key function on a dictionary of marks: what does this code print?\n\n${F(cMarks)}`,
  opts: distinct([outIc(cMarks), ic('91 [64, 78, 91]'), ic('Ravi [91, 78, 64]'), ic("Meena ['Asha', 'Meena', 'Ravi']")]),
  sol: 'max() goes through the keys, comparing them by marks.get, so it returns the key with the highest value, Meena. sorted(marks.values()) sorts the marks in ascending order.',
}));
Q('co_str_methods', co({
  pre: 'count(), find() and split() are applied to the string Monsoon Mela. Write the exact output.',
  t: 3, d: 3, c: 'application', marks: 2,
  code: code('s = "Monsoon Mela"', 'print(s.lower().count("o"))', 'print(s.find("M", 1))', 'print(s.split("o"))'),
  sol: 'lower() makes "monsoon mela", which has three o letters. find("M", 1) starts searching at index 1 and finds the M of Mela at index 8. split("o") cuts at every o; the two o letters side by side give an empty string between them.',
}));
Q('co_list_sort', co({
  pre: 'A list is sorted in reverse order, then insert() and pop() are used. Write the exact output.',
  t: 3, d: 3, c: 'understanding', marks: 2,
  code: code('nums = [5, 3, 8, 1]', 'nums.sort(reverse=True)', 'nums.insert(1, 6)', 'last = nums.pop()', 'print(nums, last)'),
  sol: 'sort(reverse=True) arranges the list in descending order, [8, 5, 3, 1]; insert(1, 6) puts 6 at index 1; pop() with no argument removes and returns the last item, 1.',
}));
Q('co_word_freq', co({
  pre: 'A dictionary counts the colours named in a sentence. Write the exact output.',
  t: 3, d: 3, c: 'application', marks: 3, time: 180,
  code: code('text = "red blue red green blue red"', 'freq = {}', 'for w in text.split():', '    freq[w] = freq.get(w, 0) + 1', 'for w in freq:', '    print(w, freq[w])'),
  sol: 'get(w, 0) returns 0 the first time a word is seen, so each word is counted from 1. The second loop prints keys in the order they were first inserted: red, blue, green.',
}));
Q('co_slice_assign', co({
  pre: 'Slice assignment and += change a list of five numbers. Write the exact output.',
  t: 3, d: 4, c: 'analysis', marks: 2,
  code: code('L = [1, 2, 3, 4, 5]', 'L[1:4] = [0]', 'L += [9]', 'print(L, len(L))'),
  sol: 'Assigning to a slice replaces the three elements 2, 3, 4 with the single element 0, so the list shrinks. += [9] extends the list in place.',
}));
Q('co_unpack', co({
  pre: 'A student record tuple is unpacked into three names. Write the exact output.',
  t: 3, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code('rec = ("Tanvi", 12, "B")', 'name, cls, sec = rec', 'print(cls, sec + name[0])'),
  sol: 'Tuple unpacking assigns the three items to three names in order; sec + name[0] joins "B" and "T".',
}));
Q('co_items', co({
  pre: 'This loop over a shop stock dictionary reports items below 20. Write the exact output.',
  t: 3, d: 3, c: 'understanding', marks: 2,
  code: code('stock = {"rice": 40, "dal": 15, "oil": 8}', 'for item, qty in stock.items():', '    if qty < 20:', '        print(item.upper(), qty * 2)'),
  sol: 'items() gives key-value pairs. Only dal (15) and oil (8) are below 20, so their names are printed in capitals with double the quantity.',
}));
const cCopy = code('L = [1, 2, 3]', 'M = L[:]', 'M.append(4)', 'print(L, M)');
Q('ar_copy', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: `After ${ic('M = L[:]')}, appending to M does not change L (the code below prints ${ic(pyOut(cCopy))}).\n\n${F(cCopy)}`,
  r: 'Slicing a list creates a new list object.',
  sol: 'Both are true and R explains A: L[:] is a full slice, which builds a separate (shallow) copy, so M and L are different objects.',
}));
Q('ar_tuple_key', ar({
  t: 3, d: 3, c: 'understanding', key: 'b',
  a: 'A tuple of numbers can be used as a key in a dictionary.',
  r: 'A tuple is an ordered sequence whose elements can be accessed by index.',
  sol: 'Both are true, but R is not the reason. A tuple can be a key because it is immutable (hashable); being ordered and indexable is also true of lists, which cannot be keys.',
}));
const cUpper = code('s = "chai"', 's.upper()', 'print(s)');
Q('tf_upper', tf({
  t: 3, d: 2, c: 'understanding', ans: pyOut(cUpper) !== 'chai',
  stem: `True or false? After ${ic('s = "chai"')} and ${ic('s.upper()')}, the variable s holds "CHAI".`,
  sol: 'String methods return a new string; they do not change s, which is immutable. To keep the result, write s = s.upper().',
}));
Q('fb_len', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The built-in function ___ returns the number of items in a string, list, tuple or dictionary.',
  acc: [['len', 'len()']],
  sol: 'len() works on every sequence and on dictionaries (it counts the keys).',
}));
Q('mt_list_methods', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each list method with what it does.',
  pairs: [
    [ic('append(x)'), 'Adds x as one item at the end'],
    [ic('insert(i, x)'), 'Adds x at position i'],
    [ic('remove(x)'), 'Deletes the first occurrence of the value x'],
    [ic('pop(i)'), 'Deletes and returns the item at index i'],
  ],
  sol: 'append and insert add; remove deletes by value (ValueError if absent); pop deletes by index and returns the item (the last one if no index is given).',
}));
Q('s_list_tuple', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two differences between a list and a tuple in Python.',
  model: '1. A **list** is **mutable** (items can be added, removed or changed); a **tuple** is **immutable**.\n2. A list is written in **square brackets** `[ ]`, a tuple in **round brackets** `( )`. (Also: tuples can be dictionary keys; lists cannot.)',
  sol: 'Any two valid differences, one mark each.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
const cErrKey = code('fees = {"Class11": 1500, "Class12": 1800}', 'print(fees["class12"])');
const cErrKeyFix = code('fees = {"Class11": 1500, "Class12": 1800}', 'print(fees.get("Class12", "not found"))');
Q('s_err_key', short({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: `This code stops with an error. Name the error, explain why it occurs and correct the code so that it prints the fee for Class 12.\n\n${F(cErrKey)}`,
  model: `**Error:** ${ic(pyErr(cErrKey))}. Dictionary keys are case-sensitive, and "class12" is not a key.\n\n${F(cErrKeyFix)}\n\nOutput: ${ic(pyOut(cErrKeyFix))}`,
  sol: 'Name the KeyError with the case-sensitivity reason, then use the exact key (get() with a default also avoids the crash).',
  scheme: [['KeyError with reason', 1], ['Correct code', 1]],
}));
const cAppExt = code('A = [1, 2]', 'B = [1, 2]', 'A.append([3, 4])', 'B.extend([3, 4])', 'print(A, len(A))', 'print(B, len(B))');
Q('s_append_extend', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: `append() and extend() are applied to two equal lists. Write the output and explain the difference it shows.\n\n${F(cAppExt)}`,
  model: `${F(pyOut(cAppExt))}\n\nappend() adds its argument as **one** element (a nested list), so A has 3 items; extend() adds **each** element, so B has 4.`,
  sol: 'Output (one mark) and the difference between adding one element and adding each element (one mark).',
  scheme: [['Correct output', 1], ['Difference explained', 1]],
}));
const cDictOps = code('price = {"pen": 10, "pad": 45}', 'price["eraser"] = 5', 'price["pad"] = 50', 'del price["pen"]', 'print(price)');
Q('s3_dict_ops', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'A dictionary `price = {"pen": 10, "pad": 45}` holds the prices at a school shop. Write statements to (i) add "eraser" at 5, (ii) change the price of "pad" to 50 and (iii) remove "pen". Show the final dictionary.',
  model: `${F(cDictOps)}\n\nFinal dictionary: ${ic(pyOut(cDictOps))}`,
  sol: 'Assignment to a new key adds it; assignment to an existing key updates it; del (or pop) removes a key.',
  scheme: [['(i) add', 1], ['(ii) update', 1], ['(iii) delete and final dictionary', 1]],
}));
const cErrStr = code('name = "anaya sharma"', 'parts = name.split()', 'initials = ""', 'for p in parts', '    initials = initials + p[0].upper', 'print(Initials)');
const cErrStrFix = code('name = "anaya sharma"', 'parts = name.split()', 'initials = ""', 'for p in parts:', '    initials = initials + p[0].upper()', 'print(initials)');
Q('s3_err_initials', short({
  t: 3, d: 4, c: 'analysis', marks: 3,
  stem: `This program should print the initials of a name in capitals. Find the three errors and rewrite it correctly.\n\n${F(cErrStr)}`,
  model: `1. The for header needs a **colon**.\n2. **upper** must be called: \`upper()\`.\n3. Names are case-sensitive: \`Initials\` should be \`initials\`.\n\n${F(cErrStrFix)}\n\nOutput: ${ic(pyOut(cErrStrFix))}`,
  sol: 'One mark for each error found and corrected (a syntax error, a missing call, and a NameError).',
  scheme: [['Colon added', 1], ['upper() called', 1], ['Correct variable name', 1]],
}));
const cVowels = code(
  'text = input("Enter text: ")',
  'v = c = dg = 0',
  'for ch in text:',
  '    if ch.isalpha():',
  '        if ch.lower() in "aeiou":',
  '            v += 1',
  '        else:',
  '            c += 1',
  '    elif ch.isdigit():',
  '        dg += 1',
  'print("Vowels:", v, "Consonants:", c, "Digits:", dg)',
);
Q('l_vowels', long({
  t: 3, d: 3, c: 'application', marks: 5,
  stem: 'Write a program that reads a line of text and counts its vowels, consonants and digits. Show the output for the input `Bus 21 leaves at 7`.',
  model: `${F(cVowels)}\n\nOutput: ${ic(pyOut(cVowels, { stdin: 'Bus 21 leaves at 7\n' }).replace('Enter text: ', ''))}`,
  sol: 'Loop over characters; separate letters (isalpha) from digits (isdigit); test vowels case-insensitively; spaces are ignored.',
  scheme: [['Input and counters', 1], ['Loop over characters', 1], ['Vowel/consonant test', 1], ['Digit test', 1], ['Correct output', 1]],
}));
const cMarksProg = code(
  'marks = [int(m) for m in input("Marks: ").split()]',
  'avg = sum(marks) / len(marks)',
  'above = [m for m in marks if m > avg]',
  'print("Highest:", max(marks))',
  'print("Average:", round(avg, 2))',
  'print("Above average:", len(above))',
);
Q('l_marks_list', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: 'Write a program that reads the marks of a group of students on one line (separated by spaces), stores them in a list and prints the highest mark, the average (rounded to 2 places) and how many students scored above the average. Show the output for `72 85 64 91 58`.',
  model: `${F(cMarksProg)}\n\nOutput:\n\n${F(pyOut(cMarksProg, { stdin: '72 85 64 91 58\n' }).replace('Marks: ', ''))}\n\nA plain for loop with append() in place of the list comprehensions earns full marks.`,
  sol: 'Split the input, convert each part to int, then use max(), sum() and len(), and count values above the average.',
  scheme: [['Input split and converted into a list', 1], ['Highest', 1], ['Average', 1], ['Count above average', 1], ['Correct output', 1]],
}));
const cBill = code(
  'menu = {"idli": 30, "dosa": 50, "tea": 12}',
  'order = {"idli": 2, "tea": 3, "vada": 1}',
  'bill = 0',
  'for item, qty in order.items():',
  '    if item in menu:',
  '        bill += menu[item] * qty',
  '    else:',
  '        print(item, "is not on the menu")',
  'print("Bill:", bill)',
);
Q('l_dict_bill', long({
  t: 3, d: 3, c: 'application', marks: 5,
  stem: 'A canteen keeps its menu in a dictionary of item prices, and an order as a dictionary of item quantities. Write a program that prints the bill and reports any ordered item that is not on the menu. Use `menu = {"idli": 30, "dosa": 50, "tea": 12}` and `order = {"idli": 2, "tea": 3, "vada": 1}`, and show the output.',
  model: `${F(cBill)}\n\nOutput:\n\n${F(pyOut(cBill))}`,
  sol: 'Loop over order.items(), use the in operator to check the menu, multiply price by quantity and accumulate.',
  scheme: [['Both dictionaries set up', 1], ['Loop over the order', 1], ['Membership check', 1], ['Bill accumulated', 1], ['Correct output', 1]],
}));
Q('l_compare', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: [100, 150],
  stem: 'Compare lists, tuples and dictionaries in Python on any five points, and suggest which one you would use to store (a) the fixed list of days of the week and (b) roll numbers with names.',
  model: '1. **Brackets:** list `[ ]`, tuple `( )`, dictionary `{ }` with key: value pairs.\n2. **Mutability:** lists and dictionaries are mutable; tuples are immutable.\n3. **Access:** lists and tuples use integer indexes from 0; dictionaries use keys.\n4. **Order and duplicates:** lists and tuples keep order and allow duplicate items; dictionary keys keep insertion order but must be unique.\n5. **As keys:** a tuple (of immutable items) can be a dictionary key; a list cannot.\n\n(a) A **tuple**, because the days never change and immutability protects them. (b) A **dictionary** with roll numbers as keys, because each name is looked up by its unique roll number.',
  sol: 'Five comparison points (one mark each, with the two choices counted in the last mark).',
  scheme: [['Syntax', 1], ['Mutability', 1], ['Access by index or key', 1], ['Order, duplicates and uniqueness of keys', 1], ['Correct choices for (a) and (b) with reasons', 1]],
}));

// ================================================================ case-based (Section D)
const cCanteen = code(
  'prices = {"samosa": 15, "juice": 25, "sandwich": 40}',
  'cart = ["juice", "samosa", "samosa", "sandwich"]',
  'total = 0',
  'for item in cart:',
  '    total += prices[item]',
  'if total > 80:',
  '    total = total - total // 10',
  'print("Pay:", total)',
);
Q('cb_canteen', caseQ({
  t: [3, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case and the program from the Greenfield School canteen, then answer the questions. *(Imagined school and prices, written by SOYL for practice.)*',
  passage: `Class 12 students of Greenfield School are writing a billing program for their canteen. Prices are kept in a dictionary and each order is a list of items. Orders above ₹80 get a discount of one-tenth of the bill (rounded down to whole rupees).\n\n${F(cCanteen)}`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'a', stem: 'What does the program print for this cart?', opts: [ic(pyOut(cCanteen)), ic('Pay: 95'), ic('Pay: 85.5'), ic('Pay: 80')], sol: 'The cart costs 25 + 15 + 15 + 40 = 95. That is above 80, so 95 // 10 = 9 is taken off, leaving 86.' })),
    child('b', fb({ t: 3, d: 1, c: 'recall', stem: 'The data type used for `prices`, which maps item names to prices, is a ___.', acc: [['dictionary', 'dict']], sol: 'Key-value pairs in braces form a dictionary (dict).' })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): If "chips" is added to the cart but not to `prices`, what happens, and how can the loop be changed to skip unknown items?', model: `The line \`total += prices[item]\` raises a **KeyError** for "chips". Guard it with a membership test:\n\n${F('for item in cart:', '    if item in prices:', '        total += prices[item]')}`, sol: 'Name the KeyError and use in (or get with a default of 0) to skip unknown items.', scheme: [['KeyError identified', 1], ['Correct guard', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Change the discount rule so that orders of ₹100 or more get ₹15 off and other orders get no discount. Write only the changed lines.', model: F('if total >= 100:', '    total = total - 15'), sol: 'Use >= 100 in the condition and subtract a flat 15.', scheme: [['Correct condition with >=', 1], ['Correct discount statement', 1]] }),
    ]),
  ],
}));
const cLib = code(
  'books = {"B101": "Gitanjali Tales", "B102": "Star Maps", "B103": "Code Quest"}',
  'issued = ["B102", "B103"]',
  'for code_no in books:',
  '    status = "issued" if code_no in issued else "available"',
  '    print(code_no, books[code_no], "-", status)',
);
Q('cb_library', caseQ({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the reading-room program at Sunrise Public School and answer the questions. *(Imagined school and book titles, written by SOYL for practice.)*',
  passage: `The reading-room monitor at Sunrise Public School keeps book titles in a dictionary keyed by book code, and the codes of issued books in a list.\n\n${F(cLib)}\n\nThe program prints:\n\n${F(pyOut(cLib))}`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'understanding', fixed: true, key: 'c', stem: 'In the loop `for code_no in books:`, what does `code_no` take as its values?', opts: ['The book titles', 'The key-value pairs as tuples', 'The book codes (the keys)', 'The positions 0, 1, 2'], sol: 'Iterating over a dictionary gives its keys, here the book codes.' })),
    child('b', tf({ t: 3, d: 2, c: 'understanding', ans: true, stem: 'True or false? The expression `code_no in issued` searches the list `issued` for the code.', sol: 'The in operator tests membership in the list.' })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why is `issued` better stored as a list (or set) of codes than as a second dictionary of titles? Give one reason, and write a statement that marks B101 as issued.', model: `Only the codes are needed to check status, so a list avoids repeating titles that already live in \`books\`. \`issued.append("B101")\``, sol: 'Avoiding duplicate data, plus a correct append().', scheme: [['Reason', 1], ['Correct statement', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Write a statement to add a new book "B104" titled "River Songs", and one to print how many books are available.', model: F('books["B104"] = "River Songs"', 'print(len(books) - len(issued))'), sol: 'Assignment adds a key; available = total books minus issued.', scheme: [['Book added', 1], ['Count printed', 1]] }),
    ]),
  ],
}));
const cScores = code(
  'data = "Aman:72,Bela:88,Chirag:65,Diya:91"',
  'result = {}',
  'for entry in data.split(","):',
  '    name, mark = entry.split(":")',
  '    result[name] = int(mark)',
  'toppers = [n for n in result if result[n] >= 80]',
  'print(result)',
  'print(toppers)',
);
Q('cb_scores', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read how a class teacher at Riverside School processes test scores and answer the questions. *(Imagined names and marks, written by SOYL for practice.)*',
  passage: `Ms Fernandes receives test scores as a single string from a form and uses this program to turn them into a dictionary.\n\n${F(cScores)}`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'b', stem: 'What is the value of `data.split(",")[1]`?', opts: [ic("'Aman:72'"), ic("'Bela:88'"), ic("['Bela', '88']"), ic("'88'")], sol: 'split(",") gives four strings; index 1 is the second one, "Bela:88".' })),
    child('b', mcq({ t: 3, d: 3, c: 'application', fixed: true, key: 'd', stem: 'What is the second line the program prints?', opts: [ic("['Bela']"), ic("['Diya', 'Bela']"), ic("['Aman', 'Bela', 'Diya']"), ic(pyOut(cScores).split('\n')[1])], sol: 'Only Bela (88) and Diya (91) have 80 or more; dictionary keys keep insertion order, so Bela comes first.' })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why is `int(mark)` needed? What would go wrong in the toppers line without it?', model: 'split() gives strings, so without int() each mark is a string like "88". Comparing a string with the number 80 using >= raises a **TypeError**, so the toppers list could not be built.', sol: 'Strings from split must be converted before numeric comparison.', scheme: [['Marks are strings after split', 1], ['TypeError on comparison', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Write one statement that prints the class average from `result`.', model: `${F('print(sum(result.values()) / len(result))')}\n\nFor these marks it prints ${ic(pyOut(cScores + '\nprint(sum(result.values()) / len(result))').split('\n')[2])}.`, sol: 'Use sum() of the values divided by the number of entries.', scheme: [['sum of values', 1], ['divided by len', 1]] }),
    ]),
  ],
}));
