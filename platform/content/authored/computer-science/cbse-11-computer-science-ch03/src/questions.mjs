// CBSE 11 Computer Science, ch03 Python Fundamentals — question bank. Every program, scenario and data value is
// written by SOYL (imagined people, shops and schools); no textbook, NCERT or board-paper program is reused.
// Every output, value and error message stated anywhere in an item (code-output keys, MCQ options, solutions, model
// answers) is produced by running the code with Python 3 through runPy()/pyOut()/pyErr() in lib.mjs.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr, runPy } from './lib.mjs';

const S2 = [25, 50];
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
export const code = (...lines) => lines.join('\n');
export const ic = (s) => '`' + s + '`';
/** One-line output of `c` as inline code. */
export const outIc = (c, opts) => {
  const o = pyOut(c, opts);
  if (o.includes('\n')) throw new Error(`outIc: multi-line output for ${c}`);
  return ic(o);
};
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
/** Screen text of a run with the prompts removed (the typed answers are not echoed by the program). */
export const scr = (c, stdin, prompts) => prompts.reduce((s, p) => s.replace(p, ''), pyOut(c, { stdin }));
/** The output shown without a trailing prompt-free line break fuss: code fence of plain text. */
export const T = (s) => '```text\n' + s + '\n```';
export const O = T;
/** Value of a Python expression, as printed. */
export const ev = (e, opts) => pyOut(`print(${e})`, opts);
export const rowsOf = (c, opts) => JSON.parse(pyOut(c, opts));
export const mdTable = (headers, rows) =>
  [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(String).join(' | ')} |`)].join('\n');
/** Program that runs `stmts` one by one and records the values of `vars` after each (a name not yet assigned shows as -). */
export const traceSrc = (stmts, vars) =>
  code('rows = []', ...stmts.flatMap((st) => [st, `rows.append([globals().get(v, "-") for v in ${JSON.stringify(vars)}])`]), 'import json', 'print(json.dumps(rows))');

// ================================================================ t01 objective items
// ---- tokens and identifiers
const cKw = code('Class = 1', 'klass = 2', 'class1 = 3', 'print(Class + klass + class1)');
const cKwErr = code('class = 5');
Q('m_keyword', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Ravi tried to use one of these words as a variable name and Python refused. Which word is a Python keyword and so cannot be used as an identifier?',
  opts: distinct([ic('class'), ic('Class'), ic('klass'), ic('class1')]),
  sol: `Keywords are reserved words with a fixed meaning. Python reports ${ic(pyErr(cKwErr))} for ${ic('class = 5')}. The other three are ordinary names: Class (keywords are case-sensitive), klass and class1 all work, and the test program prints ${outIc(cKw)}.`,
}));
const cIdErr = code('1st_seat = 12');
Q('m_ident_valid', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Meera must name a variable that stores the number of seats left in a train. Which of these is a valid Python identifier?',
  opts: distinct([ic('seats_left'), ic('1st_seats'), ic('seats-left'), ic('seats left')]),
  sol: `An identifier may contain letters, digits and underscores but must not start with a digit and must not contain spaces or operator symbols. For example ${ic('1st_seat = 12')} fails with ${ic(pyErr(cIdErr))}.`,
}));
Q('m_obj_props', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In Python every value is an object that a variable name refers to. Which option lists the three properties that every object has?',
  opts: distinct(['Identity, type and value', 'Name, address and size', 'Keyword, literal and operator', 'Index, key and value']),
  sol: `The identity (shown by id()), the type (shown by type()) and the value. For ${ic('fee = 450')} the object has value ${ic(pyOut('fee = 450\nprint(fee)'))} and type ${ic(pyOut('fee = 450\nprint(type(fee).__name__)'))}.`,
}));
const cTypeDiv = code('print(type(12 // 4).__name__, type(12 / 4).__name__, type(12 % 4.0).__name__)');
Q('m_type_div', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Nikhil checks the types produced by three operators on whole numbers and a float. What does his statement print?\n\n${F(cTypeDiv)}`,
  opts: distinct([outIc(cTypeDiv), ic('int int float'), ic('float float float'), ic('int float int')]),
  sol: 'Floor division of two integers gives an int. True division always gives a float. If either operand is a float, % gives a float, so 12 % 4.0 is the float 0.0.',
}));
const cDyn = code('slots = 40', 'slots = slots / 8', 'slots = str(slots) + " free"', 'print(slots, type(slots).__name__)');
Q('m_dynamic', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A parking program keeps changing what the name slots refers to. Predict the output.\n\n${F(cDyn)}`,
  opts: distinct([outIc(cDyn), ic('5 free int'), ic('5.0 float'), ic('5.0 free float')]),
  sol: 'slots first refers to the int 40, then to the float 5.0 (true division), then to a new str object "5.0 free". Python is dynamically typed: the type belongs to the object, not to the name, so the last object is a str.',
}));
const cAug = code('n = 20', 'n //= 3', 'n **= 2', 'n -= 1', 'print(n)');
Q('m_aug', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Shreya applies three augmented assignment operators one after another to the variable n. What does her program print?\n\n${F(cAug)}`,
  opts: distinct([outIc(cAug), ic('36'), ic('34'), ic('399')]),
  sol: 'Each statement uses the current value of n: 20 // 3 = 6, then 6 ** 2 = 36, then 36 - 1 = 35.',
}));
const cPrec = code('print(8 - 2 ** 2 * 3 + 10 // 4 % 3)');
Q('m_prec', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Predict the value printed by this expression, which mixes five different arithmetic operators.\n\n${F(cPrec)}`,
  opts: distinct([outIc(cPrec), ic('2'), ic('-4'), ic('0')]),
  sol: '** first: 2 ** 2 = 4. Then * // and % from left to right: 4 * 3 = 12, 10 // 4 = 2, 2 % 3 = 2. Finally + and - from left to right: 8 - 12 + 2 = -2.',
}));
const cAssoc = code('print(64 / 4 / 2, 2 ** 2 ** 3)');
Q('m_assoc', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Division works left to right but the exponent operator works right to left. What does this statement print?\n\n${F(cAssoc)}`,
  opts: distinct([outIc(cAssoc), ic('32.0 256'), ic('8.0 64'), ic('32.0 64')]),
  sol: '64 / 4 / 2 is (64 / 4) / 2 = 8.0. The exponent is right-associative: 2 ** 2 ** 3 is 2 ** (2 ** 3) = 2 ** 8 = 256, not (2 ** 2) ** 3 = 64.',
}));
const cIdent = code('bag1 = ["pen", "ruler"]', 'bag2 = ["pen", "ruler"]', 'bag3 = bag1', 'print(bag1 == bag2, bag1 is bag2, bag1 is bag3)');
Q('m_identity', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Three pencil-box lists are compared with the equality and the identity operators. What is printed?\n\n${F(cIdent)}`,
  opts: distinct([outIc(cIdent), ic('True True True'), ic('False False True'), ic('True False False')]),
  sol: 'bag1 and bag2 hold equal values, so == is True, but they are two separate objects, so is is False. bag3 is another name for the same object as bag1, so bag1 is bag3 is True.',
}));
const cMember = code('print("an" in "banana", "nan" not in "banana", 3 in [1, [3]])');
Q('m_member', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The membership operators are used on a word and on a list that contains a nested list. What does this statement print?\n\n${F(cMember)}`,
  opts: distinct([outIc(cMember), ic('True True False'), ic('False False False'), ic('True False True')]),
  sol: '"an" is a substring of "banana", so the first test is True. "nan" is also a substring, so "nan" not in "banana" is False. The list [1, [3]] has the items 1 and [3]; the number 3 is not an item, so the last test is False.',
}));
const cImpl = code('print(type(4 + True).__name__, type(4 + 2.5).__name__, type(4 + 2j).__name__)');
Q('m_implicit', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Python converts types automatically when different numeric types meet in an expression. What does this statement print?\n\n${F(cImpl)}`,
  opts: distinct([outIc(cImpl), ic('bool float complex'), ic('int int complex'), ic('int float float')]),
  sol: 'bool is treated as an int (True is 1), so 4 + True is an int. An int mixed with a float gives a float, and an int mixed with a complex number gives a complex number: the result is always promoted to the wider type.',
}));
const cValErr = code('print(int("3.7"))');
const optsValErr = ['int("3.7")', 'int(3.7)', 'float("3.7")', 'int("37")'];
optsValErr.slice(1).forEach((s) => pyOut(`print(${s})`));
Q('m_value_err', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these statements stops with a ValueError when it is run?',
  opts: distinct(optsValErr.map(ic)),
  sol: `int() accepts a string only if it spells a whole number. ${ic('int("3.7")')} fails with ${ic(pyErr(cValErr))}. The other three run: int(3.7) truncates to ${ic(pyOut('print(int(3.7))'))}, float("3.7") is ${ic(pyOut('print(float("3.7"))'))} and int("37") is ${ic(pyOut('print(int("37"))'))}.`,
}));
Q('m_mutable_obj', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of these objects can be changed in place after it has been created?',
  opts: distinct(['A dictionary such as {"pen": 5}', 'A tuple such as (3, 5)', 'A string such as "pen"', 'An integer such as 5']),
  sol: 'A dictionary is mutable: its pairs can be added, changed or deleted. Tuples, strings and numbers are immutable; any "change" makes a new object.',
}));
const cBool = code('print(bool(0), bool(-1), bool("False"), bool(None))');
Q('m_bool', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Aarav tests which values Python treats as true. What does this statement print?\n\n${F(cBool)}`,
  opts: distinct([outIc(cBool), ic('False True False False'), ic('True True True False'), ic('False False True True')]),
  sol: 'Zero and None are false. Every non-zero number is true, and so is every non-empty string, including the text "False".',
}));
const cNeg = code('print(23 // -4, 23 % -4)');
Q('m_negdiv', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `A negative divisor changes both the quotient and the remainder. What does this statement print?\n\n${F(cNeg)}`,
  opts: distinct([outIc(cNeg), ic('-5 3'), ic('-5 -1'), ic('-6 3')]),
  sol: 'Floor division rounds towards minus infinity: 23 / -4 is -5.75, which floors to -6. The remainder satisfies 23 = (-4) * (-6) + r, so r = -1: it takes the sign of the divisor.',
}));

// ================================================================ t01 assertion-reason, true-false, fill, match, ordering
const cDynAr = code('slots = 40', 'print(type(slots).__name__)', 'slots = "full"', 'print(type(slots).__name__)');
Q('ar_dyn', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: `After ${ic('slots = 40')}, the statement ${ic('slots = "full"')} is accepted by Python and the type seen through slots changes from int to str.`,
  r: 'In Python the type belongs to the object and not to the variable name, so a name can refer to objects of different types at different times.',
  sol: `Both are true and R explains A. Running both lines prints ${ic(pyOut(cDynAr).replace('\n', ' then '))}.`,
}));
const cSynAr = code('print("Welcome")', 'print("Total: " 5)');
const rSyn = runPy(cSynAr);
if (rSyn.out !== '' || !rSyn.err.startsWith('SyntaxError')) throw new Error('ar_syntax program must fail before printing');
Q('ar_syntax', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'A program whose last line has a syntax error prints nothing at all, even when the earlier lines are correct.',
  r: 'Python checks the syntax of the whole program before it runs the first statement.',
  sol: `Both are true and R explains A. A two-line program whose second line is ${ic('print("Total: " 5)')} stops with ${ic(rSyn.err)} and the first line, ${ic('print("Welcome")')}, never runs.`,
}));
const cCaseAr = code('Total = 120', 'total = 45', 'print(Total, total)');
Q('ar_case', ar({
  t: 1, d: 2, c: 'understanding', key: 'b',
  a: `The names ${ic('Total')} and ${ic('total')} refer to two different variables in a Python program.`,
  r: 'Most Python keywords, such as `while` and `if`, are written in lower case.',
  sol: `Both are true, but R is not the reason. Identifiers are case-sensitive, so the lines above print ${ic(pyOut(cCaseAr))}. That keywords are in lower case is a separate fact.`,
}));
const cFloorAr = code('print(7 // 2, 7.0 // 2)');
Q('ar_floor', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: `The expression ${ic('7 // 2')} evaluates to 3.`,
  r: 'The floor-division operator // always returns an integer.',
  sol: `A is true but R is false: the statement ${ic('print(7 // 2, 7.0 // 2)')} prints ${ic(pyOut(cFloorAr))}. When either operand is a float, // returns a float (the floor of the quotient, written 3.0).`,
}));
const cStrAr = code('code = "AB12"', 'code[2] = "9"');
Q('ar_str', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: `After ${ic('code = "AB12"')}, the statement ${ic('code[2] = "9"')} changes the value of code to "AB92".`,
  r: 'A string is an immutable object: its characters cannot be changed in place.',
  sol: `A is false and R is true. The assignment raises ${ic(pyErr(cStrAr))} because a string cannot be changed in place; a new string must be built instead.`,
}));
const cInAr = code('total = input() + 5');
Q('ar_input', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: `If the user types 20, the statement ${ic('total = input() + 5')} stops with an error.`,
  r: 'The input() function always returns the typed text as a string.',
  sol: `Both are true and R explains A. Python reports ${ic(pyErr(cInAr, { stdin: '20\n' }))}: the str "20" cannot be added to the int 5 until int() converts it.`,
}));
Q('tf_none', tf({
  t: 1, d: 2, c: 'understanding', ans: pyOut('print(None == 0)') === 'True',
  stem: `True or false? Python regards the special value None as equal to the number zero, so a program that compares them, as in ${ic('print(None == 0)')}, displays ${ic('True')}.`,
  sol: `None is a special object of its own type, NoneType, that stands for "no value"; it is not the number 0. The statement prints ${ic(pyOut('print(None == 0)'))}.`,
}));
Q('tf_complex', tf({
  t: 1, d: 2, c: 'understanding', ans: pyOut('print((1 + 2j) + (3 + 4j))') === '(4+6j)',
  stem: `True or false? Adding the complex numbers ${ic('1 + 2j')} and ${ic('3 + 4j')} in Python gives another complex number, displayed as ${ic('(4+6j)')}.`,
  sol: `Complex numbers have a real and an imaginary part (written with j); they add part by part. The statement prints ${ic(pyOut('print((1 + 2j) + (3 + 4j))'))}.`,
}));
Q('tf_comment', tf({
  t: 1, d: 2, c: 'understanding', ans: pyOut('print(9)  # print(10)') === '9\n10',
  stem: `True or false? The single line ${ic('print(9)  # print(10)')} displays both 9 and 10.`,
  sol: `Everything after # on a line is a comment and is ignored by Python, so only the first statement runs and the output is ${ic(pyOut('print(9)  # print(10)'))}.`,
}));
Q('tf_input_int', tf({
  t: 2, d: 3, c: 'analysis', ans: false,
  stem: `True or false? If the user types ${ic('4.5')}, the statement ${ic('n = int(input())')} stores the whole number ${ic('4')} in n.`,
  sol: `int() applied to the text "4.5" fails: Python reports ${ic(pyErr('n = int(input())', { stdin: '4.5\n' }))}. To get 4 the program must write int(float(input())).`,
}));
Q('fb_mod', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The operator ___ gives the remainder when one number is divided by another.',
  acc: [['%', 'modulus', 'mod']],
  sol: `The % (modulus) operator: ${ic('17 % 5')} is ${ic(pyOut('print(17 % 5)'))}.`,
}));
const cFbVal = code('print(9 - 12 // 5 * 3 ** 2 % 4)');
Q('fb_value', fb({
  t: 1, d: 3, c: 'application',
  stem: `The value printed by ${ic('print(9 - 12 // 5 * 3 ** 2 % 4)')} is ___.`,
  acc: [[pyOut(cFbVal)]],
  sol: `** first (3 ** 2 = 9), then // * % from left to right (12 // 5 = 2, 2 * 9 = 18, 18 % 4 = 2), then 9 - 2 = ${pyOut(cFbVal)}.`,
}));
Q('fb_sep', fb({
  t: 2, d: 2, c: 'understanding',
  stem: `Rohan wants ${ic('print("07", "30")')} to display ${ic(pyOut('print("07", "30", sep=":")'))} instead of the default spacing. He rewrites it as ${ic('print("07", "30", ___=":")')}. Fill in the missing keyword argument.`,
  acc: [['sep']],
  sol: `The sep argument sets the separator placed between the printed values; its default is one space. With sep=":" the output is ${ic(pyOut('print("07", "30", sep=":")'))}.`,
}));
Q('fb_int', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Mohan reads the quantity with input(), which gives the text "12". The function ___ converts that text into the integer 12.',
  acc: [['int', 'int()']],
  sol: `int() converts a numeric string to an integer: ${ic('int("12") + 1')} is ${ic(pyOut('print(int("12") + 1)'))}.`,
}));
Q('mt_literal', match({
  t: 1, d: 1, c: 'understanding',
  stem: 'Match each literal from a school-fee program with its data type.',
  pairs: [[ic('42'), 'int'], [ic('4.0'), 'float'], [ic('"4.0"'), 'str'], [ic('False'), 'bool']],
  sol: `${ic('42')} is ${ic(pyOut('print(type(42).__name__)'))}, ${ic('4.0')} is ${ic(pyOut('print(type(4.0).__name__)'))}, the quoted ${ic('"4.0"')} is ${ic(pyOut('print(type("4.0").__name__)'))} (a string, not a number) and ${ic('False')} is ${ic(pyOut('print(type(False).__name__)'))}.`,
}));
const cNameErr = code('print(total)');
const cZeroErr = code('print(10 // 0)');
Q('mt_error_kind', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each error with the situation in which it occurs.',
  pairs: [
    ['Syntax error', 'The rules of the language are broken, so the program cannot start'],
    ['NameError', 'A variable is used before any value has been assigned to it'],
    ['ZeroDivisionError', 'A number is divided by zero while the program is running'],
    ['Logical error', 'The program runs to the end but gives a wrong result'],
  ],
  sol: `Python reports ${ic(pyErr(cNameErr))} for ${ic('print(total)')} and ${ic(pyErr(cZeroErr))} for ${ic('10 // 0')}. A logical error produces no message at all.`,
}));
Q('mt_operator', match({
  t: 1, d: 1, c: 'recall',
  stem: 'Match each operator with its name.',
  pairs: [[ic('//'), 'Floor division'], [ic('**'), 'Exponentiation'], [ic('is not'), 'Identity operator'], [ic('not in'), 'Membership operator']],
  sol: '// divides and rounds down; ** raises to a power; is not tests that two names refer to different objects; not in tests that a value is absent from a sequence.',
}));
const stepVals = { a: pyOut('print(3 ** 2)'), b: pyOut('print(2 * 9)'), c: pyOut('print(7 + 18)'), d: pyOut('print(25 - 4)') };
Q('ord_eval', ord({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange the steps in the order in which Python evaluates the expression `7 + 2 * 3 ** 2 - 4`.',
  items: [`${ic('3 ** 2')} gives ${stepVals.a}`, `${ic('2 * 9')} gives ${stepVals.b}`, `${ic('7 + 18')} gives ${stepVals.c}`, `${ic('25 - 4')} gives ${stepVals.d}`],
  sol: `The exponent has the highest priority, then multiplication, then + and - from left to right. The final value is ${pyOut('print(7 + 2 * 3 ** 2 - 4)')}.`,
}));
Q('ord_prog', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'The lines of Zoya\'s bill program have been jumbled. Arrange them in an order that runs correctly.',
  items: [
    '`cost = int(input("Cost: "))`',
    '`tax = cost * 5 // 100`',
    '`payable = cost + tax`',
    '`print("Pay", payable)`',
  ],
  sol: 'A value must be read or computed before it is used: cost is read first, tax needs cost, payable needs both, and the result is printed last.',
}));

// ================================================================ t02 objective items (errors, input and output)
const cLogic = code('m1 = 60', 'm2 = 80', 'avg = m1 + m2 / 2', 'print("Average:", avg)');
Q('m_logical_err', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Tara's program below should print 70.0, the average of two marks, but it runs without any message and prints something else. What kind of error does it contain?\n\n${F(cLogic)}`,
  opts: distinct(['A logical error', 'A syntax error', 'A run-time error', 'A name error']),
  sol: `The program prints ${ic(pyOut(cLogic))}. Division is done before addition, so the statement works out 60 + 40 instead of (60 + 80) / 2. Python raised no error because the statement is valid; the mistake is in the logic.`,
}));
const cRunErr = code('total = 90', 'people = 0', 'share = total // people');
Q('m_runtime', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which one of these problems is reported only after the program has started running?',
  opts: distinct(['Dividing by a variable that holds 0', 'A missing closing bracket in a print statement', 'A misspelt keyword such as whille', 'Typing a statement with a stray leading space']),
  sol: `A run-time error appears while a statement is being executed. For the lines above Python reports ${ic(pyErr(cRunErr))}. Unclosed brackets, a misspelt keyword and wrong indentation are detected before execution starts.`,
}));
Q('m_input_type', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What is the data type of the value returned by the input() function, whatever the user types?',
  opts: distinct([ic('str'), ic('int'), ic('float'), 'The type of the value typed']),
  sol: `input() always returns a string. Even when 25 is typed, ${ic('type(input()).__name__')} gives ${ic(pyOut('print(type(input()).__name__)', { stdin: '25\n' }))}.`,
}));
const cPSep = code('print("Rs", 250, "only", sep="")');
Q('m_printsep', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The sep argument of print() is changed to an empty string in Divya's program. What does it display?\n\n${F(cPSep)}`,
  opts: distinct([outIc(cPSep), ic('Rs 250 only'), ic('Rs,250,only'), ic('Rs250 only')]),
  sol: 'By default print() puts one space between values. With sep="" no separator is inserted, so the three values run together.',
}));

// ================================================================ code-output items
Q('co_temp', co({
  pre: 'A body-temperature program reads a reading as text and converts it. Write the exact output.',
  t: 2, d: 3, c: 'application', marks: 2,
  code: code('reading = "36.6"', 'c = float(reading)', 'f = c * 9 / 5 + 32', 'print(round(f, 1), type(f).__name__)'),
  sol: 'float("36.6") gives 36.6, true division and multiplication keep it a float, and round(f, 1) keeps one decimal place. type(f).__name__ is the name of the type.',
}));
Q('co_swap_aug', co({
  pre: 'Two variables are swapped and then changed with augmented assignment. Write the exact output.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: code('a = 12', 'b = 5', 'a, b = b, a', 'a *= b - 2', 'b %= 4', 'print(a, b)'),
  sol: 'After the swap a is 5 and b is 12. a *= b - 2 means a = a * (b - 2) = 5 * 10 = 50 (the right side is worked out first). b %= 4 means b = 12 % 4 = 0.',
}));
Q('co_id_obj', co({
  pre: 'A name is bound to a second name and then one of them is changed. Write the exact output.',
  t: 1, d: 3, c: 'analysis', marks: 2,
  code: code('p = 300', 'q = p', 'q += 1', 'print(p, q, p is q)'),
  sol: 'q = p makes both names refer to the same int object, but integers are immutable: q += 1 builds a new object, 301, and q now refers to it while p still refers to 300. They are different objects, so is gives False.',
}));
Q('co_logic', co({
  pre: 'The and/or operators in Hari\'s program return one of their operands. Write the exact output.',
  t: 1, d: 4, c: 'analysis', marks: 2,
  code: code('print(5 and 0, 0 or 8, not "", 2 > 1 > 3)'),
  sol: '5 and 0: 5 is true, so and gives its second operand, 0. 0 or 8: 0 is false, so or gives 8. not "" is True because an empty string is false. 2 > 1 > 3 means (2 > 1) and (1 > 3), which is False.',
}));
Q('co_complex', co({
  pre: 'A complex number is used with abs(), its .real and .imag parts and multiplication. Write the exact output.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: code('z = 3 + 4j', 'print(abs(z), z.real, z * 2, z.imag)'),
  sol: 'abs(z) is the modulus, the square root of 3 squared plus 4 squared, as a float. z.real is the real part (a float). z * 2 doubles both parts. z.imag is the imaginary part, also a float.',
}));
Q('co_strops', co({
  pre: 'The + and * operators are applied to strings in a banner-printing program. Write the exact output.',
  t: 1, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code('print("ab" * 3 + "-" * 2, "x" + "y" * 2)'),
  sol: '* repeats a string and has higher priority than +, which joins strings. "ab" * 3 is "ababab", "-" * 2 is "--", and "y" * 2 is "yy".',
}));
Q('co_implicit', co({
  pre: 'The cost of fruit mixes an int and a float, and a bool is added to an int. Write the exact output.',
  t: 1, d: 2, c: 'application', marks: 2,
  code: code('qty = 4', 'rate = 12.5', 'bill = qty * rate', 'print(bill, int(bill), type(bill).__name__, qty + True)'),
  sol: 'An int times a float is a float, 50.0. int() truncates it to 50. The type name is float. True counts as 1, so 4 + True is the int 5.',
}));
Q('co_float', co({
  pre: 'Pooja compares a sum of floats with a decimal and with its rounded value. Write the exact output.',
  t: 1, d: 3, c: 'analysis', marks: 2,
  code: code('x = 0.1 + 0.2', 'print(x == 0.3, round(x, 1) == 0.3)'),
  sol: 'Floats are stored in binary, so 0.1 + 0.2 is very slightly different from 0.3 and == gives False. Rounding to one decimal place gives 0.3 exactly, so the second comparison is True.',
}));
Q('co_sepend', co({
  pre: 'Four print() calls use sep and end in a bus-timetable program. Write the exact output.',
  t: 2, d: 3, c: 'application', marks: 2,
  code: code('print("Bus", 21, "arrives", sep="-")', 'print("at", end=" ")', 'print(9, end=":")', 'print(45)'),
  sol: 'The first call joins its values with "-" and ends the line normally. The next two calls end with a space and a colon instead of a new line, so the last call continues on the same line.',
}));
Q('co_prompt', co({
  pre: 'A greeting program is run and the user types Zara. Write the exact output (the typed text is not echoed in the output).',
  t: 2, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code('name = input("Name: ")', 'print("Hello,", name)'),
  run: { stdin: 'Zara\n' },
  sol: 'input() prints its prompt "Name: " without a line break and returns what the user typed. The prompt and the greeting therefore appear on one line.',
}));
Q('co_input_calc', co({
  pre: 'A program reads a number of sweets and uses true division, floor division and remainder. The user types 9. Write the exact output.',
  t: 2, d: 3, c: 'application', marks: 2,
  code: code('n = int(input())', 'print(n / 2, n // 2, n % 2)'),
  run: { stdin: '9\n' },
  sol: 'int(input()) converts the text "9" to the integer 9. 9 / 2 is the float 4.5, 9 // 2 is 4 and 9 % 2 is 1.',
}));
Q('co_input_sum', co({
  pre: 'Two numbers are read and then added twice, first as read and then after conversion. The user types 14 and then 8. Write the exact output.',
  t: 2, d: 4, c: 'analysis', marks: 2,
  code: code('a = input()', 'b = input()', 'print(a + b)', 'print(int(a) + int(b))'),
  run: { stdin: '14\n8\n' },
  sol: 'input() returns strings, so a + b joins the two texts "14" and "8". After int() the same + adds the numbers.',
}));

// ================================================================ short answers (2 marks)
Q('s_tokens', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name four kinds of tokens in a Python program and give one example of each.',
  model: '1. **Keyword:** a reserved word, e.g. `while`.\n2. **Identifier:** a name chosen by the programmer, e.g. `total_fee`.\n3. **Literal:** a fixed value, e.g. `3.75`.\n4. **Operator:** a symbol that acts on values, e.g. `//`. (Punctuators such as `( )` and `:` are the fifth kind.)',
  sol: 'Half a mark for each correct kind with a matching example, up to 2 marks.',
  scheme: [['Two kinds with examples', 1], ['Two more kinds with examples', 1]],
}));
const cDynS = code('level = 3', 'print(type(level).__name__)', 'level = "three"', 'print(type(level).__name__)');
Q('s_dynamic', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain what is meant by dynamic typing, using the lines below. What does the program print?\n\n${F(cDynS)}`,
  model: `In Python a variable has no fixed type; the **type belongs to the object** the name refers to. ${ic('level')} first refers to an int and then to a str, so the program prints:\n\n${F(pyOut(cDynS))}\n\nNo declaration is needed and the name can be rebound to an object of any type.`,
  sol: 'One mark for the idea that the type belongs to the object, one for the correct output.',
  scheme: [['Dynamic typing explained', 1], ['Correct output', 1]],
}));
Q('s_conv', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between implicit and explicit type conversion, with one example of each.',
  model: `1. **Implicit** conversion is done automatically by Python when types are mixed: ${ic('4 + 2.5')} converts 4 to a float and gives ${ic(pyOut('print(4 + 2.5)'))}.\n2. **Explicit** conversion (type casting) is done by the programmer with a function such as int() or float(): ${ic('int("25") + 1')} gives ${ic(pyOut('print(int("25") + 1)'))}.`,
  sol: 'One mark for each kind, explained with a correct example.',
  scheme: [['Implicit with example', 1], ['Explicit with example', 1]],
}));
const cInErr = code('age = input()', 'next_year = age + 1', 'print(next_year)');
const cInFix = code('age = int(input())', 'next_year = age + 1', 'print(next_year)');
Q('s_input_why', short({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: `Kabir types 15 when his program below is run, but it stops with an error. Name the error, give the reason and write the corrected program.\n\n${F(cInErr)}`,
  model: `**Error:** ${ic(pyErr(cInErr, { stdin: '15\n' }))}. input() returns the string "15", and a string cannot be added to an integer.\n\n**Corrected program** (convert the text with int()):\n\n${F(cInFix)}\n\nFor the input 15 it prints ${ic(pyOut(cInFix, { stdin: '15\n' }))}.`,
  sol: 'The TypeError with its reason (one mark) and the corrected program (one mark).',
  scheme: [['Error named with reason', 1], ['Corrected program', 1]],
}));
const cSE = code('print("Row", 3, end=", ")', 'print("Seat", 14)');
Q('s_print_sepend', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'A ticket program must show `Row 3, Seat 14` on one line using two print() calls. Write the two statements and name the argument that makes this possible.',
  model: `${F(cSE)}\n\nOutput: ${ic(pyOut(cSE))}\n\nThe **end** argument replaces the new line that print() normally adds with the text ", ", so the second call continues on the same line.`,
  sol: 'Correct statements (one mark) and the end argument identified (one mark).',
  scheme: [['Two correct print statements', 1], ['end argument identified', 1]],
}));
const cCom = code('rate = 5   # rupees per km', '# distance = 40', 'distance = 12', 'print(rate * distance)')
Q('s_comment', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [30, 60],
  stem: 'What is a comment in Python and why are comments used? How is a single-line comment written?',
  model: `A **comment** is text in the program that the interpreter ignores. It explains the code to human readers, and a statement can be switched off by turning it into a comment. A single-line comment starts with **#** and runs to the end of the line.\n\n${F(cCom)}\n\nOutput: ${ic(pyOut(cCom))}`,
  sol: 'One mark for meaning and purpose, one for the # form (an example shows the comment being ignored).',
  scheme: [['Meaning and purpose', 1], ['# syntax with example', 1]],
}));
const cEqIs = code('a = [4, 7]', 'b = [4, 7]', 'print(a == b, a is b)');
Q('s_eq_is', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `Explain the difference between the operators == and is with the help of the lines below, and write their output.\n\n${F(cEqIs)}`,
  model: `== compares **values**; **is** compares **identity**, that is, whether both names refer to the same object. The two lists are equal in value but are two separate objects, so the output is ${ic(pyOut(cEqIs))}.`,
  sol: 'One mark for the difference and one for the correct output with its reason.',
  scheme: [['Difference explained', 1], ['Correct output with reason', 1]],
}));
const cIndErr = code('side = 6', '  area = side * side', 'print(area)');
const cIndFix = code('side = 6', 'area = side * side', 'print(area)');
Q('s_err_indent', short({
  t: 2, d: 2, c: 'analysis', marks: 2,
  stem: `Rahul's program to find the area of a square gives an error before it prints anything. Name the error, say why it occurs and correct the program.\n\n${F(cIndErr)}`,
  model: `**Error:** ${ic(pyErr(cIndErr))}. The second line starts with two spaces, but a statement that is not part of a block must begin in the first column.\n\n${F(cIndFix)}\n\nOutput: ${ic(pyOut(cIndFix))}`,
  sol: 'The IndentationError with its reason (one mark) and the corrected program (one mark).',
  scheme: [['Error and reason', 1], ['Corrected program', 1]],
}));
const cValE = code('qty = int(input("Quantity: "))', 'print("Items:", qty)');
const cValFix = code('qty = int(float(input("Quantity: ")))', 'print("Items:", qty)');
Q('s_err_value', short({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: `A shopkeeper types 2.5 when this program asks for a quantity, and the program stops. Name the error, explain it and rewrite the first line so that the program accepts 2.5 and stores the whole number below it.\n\n${F(cValE)}`,
  model: `**Error:** ${ic(pyErr(cValE, { stdin: '2.5\n' }))}. int() cannot convert a string that contains a decimal point.\n\n**Correction:** convert to float first and then to int, which truncates:\n\n${F(cValFix)}\n\nFor the input 2.5 the output is ${ic(scr(cValFix, '2.5\n', ['Quantity: ']))}.`,
  sol: 'The ValueError with its reason (one mark) and the int(float(...)) correction (one mark).',
  scheme: [['Error and reason', 1], ['Corrected first line', 1]],
}));
const cNameE = code('rent = 4500', 'water = 300', 'print("Total:", rent + watter)');
const cNameFix = code('rent = 4500', 'water = 300', 'print("Total:", rent + water)');
Q('s_err_name', short({
  t: 2, d: 2, c: 'analysis', marks: 2,
  stem: `This program for a month's flat expenses stops with an error. Name the error, give its cause and write the corrected program.\n\n${F(cNameE)}`,
  model: `**Error:** ${ic(pyErr(cNameE))}. The name watter was never assigned a value; the variable is called water.\n\n${F(cNameFix)}\n\nOutput: ${ic(pyOut(cNameFix))}`,
  sol: 'The NameError with its cause (one mark) and the corrected program (one mark).',
  scheme: [['Error and cause', 1], ['Corrected program', 1]],
}));

// ================================================================ short answers (3 marks)
const cIdm = code('n = 10', 'old = id(n)', 'n += 1', 'print(old == id(n))', 'L = [1]', 'oldl = id(L)', 'L.append(2)', 'print(oldl == id(L), L)');
Q('s3_id_mut', short({
  t: 1, d: 5, c: 'analysis', marks: 3,
  stem: `Predict the output of the program below and use it to explain the difference between a mutable and an immutable object.\n\n${F(cIdm)}`,
  model: `${O(pyOut(cIdm))}\n\nThe int 10 is **immutable**: ${ic('n += 1')} cannot change it, so a new object (a different id) is created and n is bound to it. The list is **mutable**: ${ic('append')} changes the same object in place, so its id stays the same.`,
  sol: 'One mark for each correct line of output and one mark for the explanation of in-place change versus a new object.',
  scheme: [['First line of output', 1], ['Second line of output', 1], ['Mutable versus immutable explained', 1]],
}));
const cExprA = '30 - 4 * 2 ** 2 // 8';
const cExprB = '17 % 5 ** 2';
const cExprC = 'not 8 < 3 and 4 != 4.0 or 6 in [1, 6]';
Q('s3_expr', short({
  t: 1, d: 4, c: 'application', marks: 3,
  stem: `Evaluate each of these expressions from a mathematics worksheet and show the order in which Python applies the operators.\n\n(a) ${ic(cExprA)}\n\n(b) ${ic(cExprB)}\n\n(c) ${ic(cExprC)}`,
  model: `(a) The exponent first: ${ic(ev('2 ** 2'))}. Then * and // from left to right: ${ic('4 * 4')} is ${ic(ev('4 * 4'))}, and ${ic('16 // 8')} is ${ic(ev('16 // 8'))}. Finally ${ic('30 - 2')}. The value is **${ev(cExprA)}**.\n\n(b) The exponent first: ${ic('5 ** 2')} is ${ic(ev('5 ** 2'))}. Then ${ic('17 % 25')} is **${ev(cExprB)}**.\n\n(c) The comparisons and the membership test come first: ${ic('8 < 3')} is ${ic(ev('8 < 3'))}, ${ic('4 != 4.0')} is ${ic(ev('4 != 4.0'))} and ${ic('6 in [1, 6]')} is ${ic(ev('6 in [1, 6]'))}. Then not, then and, then or. The value is **${ev(cExprC)}**.`,
  sol: 'One mark for each expression: the correct order of operators and the final value.',
  scheme: [['(a) order and value', 1], ['(b) order and value', 1], ['(c) order and value', 1]],
}));
const cErrSyn = code('print("Total:"');
const cErrRun = code('print(15 % 0)');
const cErrLog = code('avg = 40 + 60 / 2', 'print(avg)');
Q('s3_three_errors', short({
  t: 2, d: 3, c: 'understanding', marks: 3,
  stem: 'Name the three kinds of error that can occur in a Python program. For each kind, say when it is detected and give a one-line example.',
  model: `1. **Syntax error:** the rules of the language are broken, so the error is found before the program starts. Example: ${ic('print("Total:"')} gives ${ic(pyErr(cErrSyn))}.\n2. **Run-time error:** the statement is valid but cannot be carried out, so the program stops while it runs. Example: ${ic('print(15 % 0)')} gives ${ic(pyErr(cErrRun))}.\n3. **Logical error:** the program runs without any message but gives a wrong answer. Example: ${ic('avg = 40 + 60 / 2')} prints ${ic(pyOut(cErrLog))}, not the intended average of 40 and 60, because the brackets are missing.`,
  sol: 'One mark for each kind with when it is detected and a correct example.',
  scheme: [['Syntax error', 1], ['Run-time error', 1], ['Logical error', 1]],
}));
const convRows = [['4 + 2.0', 'Implicit: the int 4 is promoted to a float'], ['int("40") + 2', 'Explicit: int() is called by the programmer'], ['str(40) + "2"', 'Explicit: str() is called by the programmer']];
Q('s3_conversions', short({
  t: 1, d: 3, c: 'understanding', marks: 3,
  stem: 'For each statement written by Anjali, give the output and say whether the type conversion that takes place is implicit or explicit.\n\n(a) `print(4 + 2.0)`\n\n(b) `print(int("40") + 2)`\n\n(c) `print(str(40) + "2")`',
  model: mdTable(['Statement', 'Output', 'Conversion'], convRows.map(([e, k]) => [ic(`print(${e})`), ic(ev(e)), k])),
  sol: 'One mark for each statement: the correct output with the correct kind of conversion.',
  scheme: [['(a) output and kind', 1], ['(b) output and kind', 1], ['(c) output and kind', 1]],
}));
const stTr = ['a = 4', 'b = a * 3', 'a = a + b', 'b = a - b * 2', 'a, b = b, a'];
const trRows = rowsOf(traceSrc(stTr, ['a', 'b']));
const trFull = code(...stTr, 'print(a, b)');
Q('s3_trace_assign', short({
  t: 1, d: 4, c: 'application', marks: 3,
  stem: `Dry run the program below. Draw a trace table showing the values of a and b after each statement and write the output.\n\n${F(trFull)}`,
  model: `${mdTable(['Statement', 'a', 'b'], stTr.map((s, i) => [ic(s), ...trRows[i]]))}\n\nA dash means that the variable has not been assigned yet. The last statement swaps the two values.\n\nOutput: ${ic(pyOut(trFull))}`,
  sol: 'One mark for the first three rows, one for the last two rows including the swap and one for the output.',
  scheme: [['First three rows of the table', 1], ['Last two rows of the table', 1], ['Output', 1]],
}));
const cPF = code('print("Dosa", 40, sep=":")', 'print("Idli", 30, end=" | ")', 'print("Vada", 25, sep="")', 'print("Done")');
Q('s3_print_forms', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `A canteen-menu program uses the sep and end arguments of print(). Write its exact output and explain what each argument does.\n\n${F(cPF)}`,
  model: `${O(pyOut(cPF))}\n\nThe **sep** argument is the text placed between the values of one call; its default is a single space. With sep=":" the first call shows Dosa:40, and with sep="" the third call joins its values. The **end** argument is the text added after the last value; its default is a new line, so with end=" | " the second call does not start a new line and the third call continues on the same line.`,
  sol: 'One mark for the first line of output, one for the second and third values on one line with the last line, and one for explaining sep and end.',
  scheme: [['First line of output', 1], ['Remaining lines of output', 1], ['sep and end explained', 1]],
}));

// ================================================================ more objective items
Q('m_lvalue', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the Python statement `fare = distance * 12`, which part is the l-value?',
  opts: distinct([ic('fare'), ic('distance * 12'), ic('distance'), ic('12')]),
  sol: 'The l-value is the name that receives the value, which stands on the left of the assignment operator. The expression on the right, here distance * 12, is worked out first and supplies the r-value.',
}));
Q('m_features', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which one of these statements about the Python language is correct?',
  opts: distinct(['It is interpreted, dynamically typed and case-sensitive', 'It needs the type of every variable to be declared before use', 'Every statement must end with a semicolon', 'Names such as Fee and fee refer to the same variable']),
  sol: 'Python is an interpreted, high-level, dynamically typed, case-sensitive language: no declarations and no semicolons are needed, and Fee and fee are different names.',
}));
const optsConv = ['marks = float(78)', 'marks = 78 + 0.5', 'marks = 78 / 4', 'marks = 78 + True'];
Q('m_conv_expl', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Bhavna writes four assignment statements. Which of them performs **explicit** type conversion?',
  opts: distinct(optsConv.map(ic)),
  sol: `The function float() is called by the programmer, so ${ic('float(78)')} (value ${ic(ev('float(78)'))}) is explicit conversion. In the others Python converts by itself: ${ic('78 + 0.5')} gives ${ic(ev('78 + 0.5'))}, ${ic('78 / 4')} gives ${ic(ev('78 / 4'))} and ${ic('78 + True')} gives ${ic(ev('78 + True'))}.`,
}));
const synProgs = ['print("Sum is", 4 + 5)', 'print("Sum is" 4 + 5)', 'print("Sum is", "4" + "5")', 'print("Sum is", 4 + 5.0)'];
synProgs.forEach((p, i) => {
  if ((i === 1) !== runPy(p).err.startsWith('SyntaxError')) throw new Error(`m_syntax_which: unexpected result for ${p}`);
});
Q('m_syntax_which', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Exactly one of these print statements about a sum contains a syntax error. Which one?',
  opts: distinct([ic(synProgs[1]), ic(synProgs[0]), ic(synProgs[2]), ic(synProgs[3])]),
  sol: `The comma between the text and the expression is missing, so Python reports ${ic(pyErr(synProgs[1]))} and runs nothing. The other statements are valid and print ${ic(pyOut(synProgs[0]))}, ${ic(pyOut(synProgs[2]))} and ${ic(pyOut(synProgs[3]))}.`,
}));
const cTypeE = code('age = 15', 'print("Age: " + age)');
if (!pyErr(cTypeE).startsWith('TypeError')) throw new Error('m_typeerr key');
Q('m_typeerr', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Kavya tries to join a text and a number with the + operator. Which error does Python report when the program is run?\n\n${F(cTypeE)}`,
  opts: distinct([ic('TypeError'), ic('ValueError'), ic('NameError'), ic('SyntaxError')]),
  sol: `Python stops with ${ic(pyErr(cTypeE))}: a string and an integer cannot be joined with +. Converting the number with str() fixes it, since ${ic('"Age: " + str(15)')} gives ${ic(ev('"Age: " + str(15)'))}.`,
}));
const immSetup = code('t = (4, 8, 2)', 'L = [4, 8, 2]', 'marks = {"maths": 80}');
const immStmts = ['t[1] = 9', 'L[1] = 9', 'marks["maths"] = 90', 'marks["art"] = 70'];
immStmts.forEach((s, i) => {
  if ((i === 0) !== !!runPy(code(immSetup, s)).err) throw new Error(`m_immut_assign: unexpected result for ${s}`);
});
Q('m_immut_assign', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Sumit creates three variables.\n\n${F(immSetup)}\n\nWhich one of these statements, run after them, raises an error?`,
  opts: distinct(immStmts.map(ic)),
  sol: `A tuple is immutable, so ${ic('t[1] = 9')} fails with ${ic(pyErr(code(immSetup, 't[1] = 9')))}. A list and a dictionary are mutable: changing an item, changing the value of an existing key and adding a new key are all accepted.`,
}));
Q('tf_interactive', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: `True or false? In interactive mode, typing the expression ${ic('7 * 6')} at the ${ic('>>>')} prompt displays its value, ${ic(ev('7 * 6'))}, even without print().`,
  sol: 'Interactive mode runs one statement at a time and shows the value of an expression at once. In script mode, where the program is stored in a file, a value is shown only when the program prints it.',
}));

// ================================================================ more code-output items
Q('co_alias_list', co({
  pre: 'Two names refer to one list of hostel rooms; one name appends a room and then builds a longer list. Write the exact output.',
  t: 1, d: 5, c: 'analysis', marks: 2,
  code: code('rooms = ["A1", "B2"]', 'extra = rooms', 'extra.append("C3")', 'extra = extra + ["D4"]', 'print(rooms, extra)'),
  sol: 'extra = rooms gives the list two names. append changes the shared list in place, so rooms also gains C3. Then extra + ["D4"] builds a new list and rebinds extra to it, so rooms stays as it was.',
}));
Q('co_str_aug', co({
  pre: 'A label-maker builds a text with augmented assignment and then tests it with membership and equality. Write the exact output.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: code('s = "ab"', 's += "c"', 's *= 2', 'print(s, "ca" in s, s == "abc" * 2)'),
  sol: '+= joins "c" to the string and *= repeats the string, each time building a new string. The text "ca" occurs where the two copies meet, and the final comparison is true because both sides are the same string.',
}));

// ================================================================ more short answers (2 marks)
const cLr = code('price = 40', 'total = price * 3 + 5', 'print(total)');
Q('s_lvalue_rvalue', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 55],
  stem: `Define l-value and r-value. Name the l-value and the r-value in the second line of the program below and state what the program prints.\n\n${F(cLr)}`,
  model: `An **l-value** is the name on the left of an assignment, which receives the value; an **r-value** is the value or expression on the right, worked out first.\n\nIn ${ic('total = price * 3 + 5')} the l-value is ${ic('total')} and the r-value is ${ic('price * 3 + 5')}. The program prints ${ic(pyOut(cLr))}.`,
  sol: 'One mark for both definitions and one for identifying them correctly with the printed value.',
  scheme: [['Definitions of l-value and r-value', 1], ['Identification in the statement and output', 1]],
}));
const cMutL = code('rack = [3, 6]', 'rack[0] = 9', 'print(rack)');
const cMutT = code('shelf = (3, 6)', 'shelf[0] = 9');
Q('s_mut_immut', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 55],
  stem: 'Distinguish between a mutable and an immutable object. Name two types of each kind and show what happens when item 0 of a list and of a tuple is assigned a new value.',
  model: `A **mutable** object (list, dict) can be changed in place; an **immutable** object (int, float, str, tuple) cannot.\n\nFor the list, ${ic('rack[0] = 9')} works and ${ic('print(rack)')} shows ${ic(pyOut(cMutL))}. For the tuple, the same assignment stops with ${ic(pyErr(cMutT))}.`,
  sol: 'One mark for the distinction with two types of each kind, and one for the list and tuple behaviour.',
  scheme: [['Distinction with examples', 1], ['List changes, tuple gives TypeError', 1]],
}));

// ================================================================ long answers (5 marks)
const billProg = code('price = float(input())', 'qty = int(input())', 'disc = float(input())', 'gross = price * qty', 'payable = gross - gross * disc / 100', 'print("Amount payable:", round(payable, 2))');
const billIn = '18.50\n12\n10\n';
Q('l_bill', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'Mehta Stationers (an imagined shop) needs a program that reads the price of one notebook (which may have paise), the number of notebooks bought and the discount percentage, and prints the amount payable rounded to 2 decimal places. Write the program using `input()`, explicit type conversion and `print()`, and show its output when the user types 18.50, 12 and 10 on three lines.',
  model: `${F(billProg)}\n\nOutput for the input 18.50, 12 and 10:\n\n${O(pyOut(billProg, { stdin: billIn }))}\n\nThe price and the discount are converted with float() and the quantity with int(); input() returns strings, which cannot be multiplied as numbers. The gross amount is ${ic(ev('18.50 * 12'))} and the discount is taken off it before rounding.`,
  sol: 'Marks: reading all three values with the correct conversion, the gross amount, the discount calculation, the rounded print, and the correct output.',
  scheme: [['Three inputs converted correctly', 1], ['Gross amount calculated', 1], ['Discount applied', 1], ['Rounded result printed', 1], ['Correct output for the sample', 1]],
}));
const timeStmts = ['total = 9275', 'hours = total // 3600', 'rest = total % 3600', 'minutes = rest // 60', 'seconds = rest % 60'];
const timeProg = code('total = int(input())', 'hours = total // 3600', 'rest = total % 3600', 'minutes = rest // 60', 'seconds = rest % 60', 'print(hours, minutes, seconds, sep=":")');
const timeTrace = rowsOf(traceSrc(timeStmts, ['hours', 'rest', 'minutes', 'seconds']));
Q('l_time', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'The scoreboard of a swimming meet stores a race time as a whole number of seconds. Write a program that reads this number and prints it as hours, minutes and seconds separated by colons, using only arithmetic operators and `print()`. Dry run it for 9275 seconds and give the output for 9275 and 3725.',
  model: `${F(timeProg)}\n\nTrace for 9275:\n\n${mdTable(['Statement', 'hours', 'rest', 'minutes', 'seconds'], timeStmts.map((s, i) => [ic(s), ...timeTrace[i]]))}\n\nOutput for 9275: ${ic(pyOut(timeProg, { stdin: '9275\n' }))}\n\nOutput for 3725: ${ic(pyOut(timeProg, { stdin: '3725\n' }))}\n\nFloor division gives the whole hours and whole minutes; % gives what is left over.`,
  sol: 'Marks: reading the integer, hours by floor division, the remainders for minutes and seconds, the trace for 9275, and both outputs.',
  scheme: [['Input converted to int', 1], ['Hours by floor division', 1], ['Minutes and seconds from the remainders', 1], ['Trace table for 9275', 1], ['Both outputs', 1]],
}));
const ciProg = code('p = float(input())', 'r = float(input())', 'n = int(input())', 'amount = p * (1 + r / 100) ** n', 'print("Amount:", round(amount, 2))', 'print("Interest:", round(amount - p, 2))');
Q('l_interest', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'A savings club (imagined) pays compound interest once a year. Write a program that reads the principal, the yearly rate of interest in per cent and the number of years, each on its own line, and prints the final amount and the interest earned, both rounded to 2 decimal places. Show the output for 25000, 8 and 3, and for 10000, 10 and 2.',
  model: `${F(ciProg)}\n\nOutput for 25000, 8 and 3:\n\n${O(pyOut(ciProg, { stdin: '25000\n8\n3\n' }))}\n\nOutput for 10000, 10 and 2:\n\n${O(pyOut(ciProg, { stdin: '10000\n10\n2\n' }))}\n\nThe exponent operator ** has higher priority than *, so the brackets around the growth factor are needed; the number of years is converted with int(), the other two values with float().`,
  sol: 'Marks: three inputs with conversion, the amount formula with **, the interest, the rounding in both prints, and both outputs.',
  scheme: [['Inputs converted', 1], ['Amount formula with **', 1], ['Interest calculated', 1], ['Rounded prints', 1], ['Both outputs correct', 1]],
}));
const digStmts = ['n = 749', 'd1 = n // 100', 'd2 = n // 10 % 10', 'd3 = n % 10'];
const digProg = code('n = int(input())', 'd1 = n // 100', 'd2 = n // 10 % 10', 'd3 = n % 10', 'print("Digit sum:", d1 + d2 + d3)', 'print("Reversed:", d3 * 100 + d2 * 10 + d1)');
const digTrace = rowsOf(traceSrc(digStmts, ['d1', 'd2', 'd3']));
Q('l_digits', long({
  t: 2, d: 4, c: 'application', marks: 5,
  stem: 'For a lucky-ticket game, a ticket carries a three-digit number. Write a program that reads such a number and prints the sum of its digits and the number formed by reversing its digits, without using any loop. Show the values of the three digits for the input 749 and the output for 749 and for 305.',
  model: `${F(digProg)}\n\nDigits of 749:\n\n${mdTable(['Statement', 'd1', 'd2', 'd3'], digStmts.map((s, i) => [ic(s), ...digTrace[i]]))}\n\nOutput for 749:\n\n${O(pyOut(digProg, { stdin: '749\n' }))}\n\nOutput for 305:\n\n${O(pyOut(digProg, { stdin: '305\n' }))}\n\nFloor division removes the digits on the right and % keeps the last digit; the reversed number is rebuilt with place values.`,
  sol: 'Marks: reading the number as an int, the hundreds and units digits, the tens digit using // and %, the two prints, and the correct outputs.',
  scheme: [['Input as int', 1], ['Hundreds and units digits', 1], ['Tens digit with // and %', 1], ['Sum and reversed number printed', 1], ['Both outputs and the digit values', 1]],
}));
const typProg = code('roll = 1042', 'height = 1.58', 'name = "Isha"', 'house = ("Red", "Blue")', 'marks = [78, 85]');
const typRows = ['roll', 'height', 'name', 'house', 'marks'].map((v) => {
  const tn = pyOut(code(typProg, `print(type(${v}).__name__)`));
  return [ic(v), ic(pyOut(code(typProg, `print(${v})`))), ic(tn), ['list', 'dict'].includes(tn) ? 'Mutable' : 'Immutable'];
});
const typMarks = code(typProg, 'marks[0] = 90', 'print(marks)');
const typHouse = code(typProg, 'house[0] = "Green"');
Q('l_types', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: `A school database stores one student as shown.\n\n${F(typProg)}\n\n(a) State the data type of each of the five variables. (b) Say which of them refer to mutable objects and which to immutable objects. (c) Write what happens when ${ic('marks[0] = 90')} is run followed by ${ic('print(marks)')}, and what happens when ${ic('house[0] = "Green"')} is run.`,
  model: `${mdTable(['Variable', 'Value', 'Type', 'Kind'], typRows)}\n\n(c) After ${ic('marks[0] = 90')} the list is changed in place and ${ic('print(marks)')} shows ${ic(pyOut(typMarks))}. The tuple cannot be changed: ${ic('house[0] = "Green"')} stops with ${ic(pyErr(typHouse))}.`,
  sol: 'Marks: types of the five variables (two), the mutable and immutable classification (one), the list change (one) and the tuple error (one).',
  scheme: [['Types of the five variables', 2], ['Mutable and immutable classification', 1], ['List item changed', 1], ['Tuple assignment gives TypeError', 1]],
}));
const lE1 = code('side = 7', 'print("Area is", side * side');
const lE2 = code('litres = input()', 'print(litres * 2.5)');
const lE3 = code('m1 = 70', 'm2 = 90', 'm3 = 80', 'avg = m1 + m2 + m3 / 3', 'print(avg)');
const lE1f = code('side = 7', 'print("Area is", side * side)');
const lE2f = code('litres = float(input())', 'print(litres * 2.5)');
const lE3f = code('m1 = 70', 'm2 = 90', 'm3 = 80', 'avg = (m1 + m2 + m3) / 3', 'print(avg)');
Q('l_errors', long({
  t: 2, d: 4, c: 'analysis', marks: 5,
  stem: `Three programs written by students of a coding club each contain one mistake.\n\nProgram 1:\n\n${F(lE1)}\n\nProgram 2 (the user types 20):\n\n${F(lE2)}\n\nProgram 3 (meant to print the average of three marks):\n\n${F(lE3)}\n\nFor each program, name the kind of error, state what Python reports or prints, and write the corrected program.`,
  model: `${mdTable(['Program', 'Kind of error', 'Python reports or prints'], [['1', 'Syntax error (detected before running)', ic(pyErr(lE1))], ['2', 'Run-time error (TypeError)', ic(pyErr(lE2, { stdin: '20\n' }))], ['3', 'Logical error (no message)', `prints ${ic(pyOut(lE3))}`]])}\n\n**Corrections.** Program 1 needs the closing bracket: it then prints ${ic(pyOut(lE1f))}. Program 2 must convert the input, ${ic('litres = float(input())')}: it then prints ${ic(pyOut(lE2f, { stdin: '20\n' }))}. Program 3 needs brackets, ${ic('(m1 + m2 + m3) / 3')}: it then prints ${ic(pyOut(lE3f))}.`,
  sol: 'Marks: the kind of error in each program (one mark each) and the three corrections (two marks together).',
  scheme: [['Program 1: kind and message', 1], ['Program 2: kind and message', 1], ['Program 3: kind and wrong output', 1], ['Corrections of programs 1 and 2', 1], ['Correction of program 3 with output', 1]],
}));

// ================================================================ case-based (4 marks)
const stallBug = code('qty = input()', 'rate = 5', 'cost = qty * rate', 'print("Cost:", cost)');
const stallFix = code('qty = int(input())', 'rate = 5', 'cost = qty * rate', 'print("Cost:", cost)');
const stallFix2 = code('qty = float(input())', 'rate = 5', 'cost = qty * rate', 'print("Cost:", cost)');
Q('cb_stall', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the guava stall of Vikram and answer the questions. *(Imagined stall and prices, written by SOYL for practice.)*',
  passage: `Vikram sells guavas at 5 rupees each. He writes a program that reads the number of guavas and prints the cost, but when a customer types 3 the screen shows a strange result instead of 15.\n\n${F(stallBug)}`,
  parts: [
    child('a', mcq({ t: 2, d: 3, c: 'application', fixed: true, key: 'b', stem: 'What does the program print when the user types 3?', opts: [ic('Cost: 15'), outIc(stallBug, { stdin: '3\n' }), ic('Cost: 3 5'), 'It stops with an error message'], sol: 'input() returns the string "3". A string multiplied by an integer is repeated, so "3" repeated 5 times is printed; no error is reported because the statement is valid.' })),
    child('b', fb({ t: 2, d: 1, c: 'recall', stem: 'The value returned by `input()` always has the data type ___.', acc: [['str', 'string']], sol: 'input() returns whatever is typed as a string (str).' })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Correct the first line so that the program prints the cost 15 for the input 3, and write the corrected program with its output.', model: `${F(stallFix)}\n\nFor the input 3 the output is ${ic(pyOut(stallFix, { stdin: '3\n' }))}, because int() turns the text into a number before the multiplication.`, sol: 'One mark for the int() conversion and one for the corrected program and output.', scheme: [['int() conversion', 1], ['Corrected program with output', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Vikram now sells guavas by weight and a customer types 2.5. Write the first line so that the program accepts 2.5, and give the output for that input.', model: `${F(stallFix2)}\n\nFor the input 2.5 the output is ${ic(pyOut(stallFix2, { stdin: '2.5\n' }))}; int() would fail on the text 2.5, so float() is needed.`, sol: 'One mark for float(input()) and one for the output.', scheme: [['float(input())', 1], ['Output for 2.5', 1]] }),
    ]),
  ],
}));
const libProg = code('member_id = 5107', 'fine_per_day = 2.5', 'name = "Farhan"', 'books = ["Atlas", "Comics"]', 'returned = False');
const libTypes = ['member_id', 'fine_per_day', 'name', 'books', 'returned'].map((v) => pyOut(code(libProg, `print(type(${v}).__name__)`)));
const libMut = libTypes.filter((t) => ['list', 'dict'].includes(t)).length;
if (libMut !== 1 || libTypes[4] !== 'bool') throw new Error('cb_library facts');
const libOps = code(libProg, 'books.append("Maps")', 'print(books)');
const libStr = code(libProg, 'name[0] = "G"');
const libFine = code(libProg, 'fine_per_day = fine_per_day * 2', 'print(fine_per_day)');
Q('cb_library', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the school library record of a member and answer the questions. *(Imagined member and values, written by SOYL for practice.)*',
  passage: `The library program of Greenwood School keeps the record of one member in five variables.\n\n${F(libProg)}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'a', stem: 'How many of the five variables refer to mutable objects?', opts: [String(libMut), '2', '3', '5'], sol: 'Only books refers to a mutable object, a list. An int, a float, a string and a bool are all immutable.' })),
    child('b', tf({ t: 1, d: 1, c: 'recall', ans: true, stem: 'True or false? The variable `returned` refers to an object of type bool.', sol: 'False and True are the two values of the data type bool.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Give the result of running `books.append("Maps")` followed by `print(books)`, and the result of running `name[0] = "G"`. Explain the difference.', model: `The first run prints ${ic(pyOut(libOps))}: a list is mutable, so the same object grows. The second run stops with ${ic(pyErr(libStr))}: a string is immutable and its characters cannot be assigned.`, sol: 'One mark for each result with the reason.', scheme: [['append result with reason', 1], ['String assignment error with reason', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The librarian runs `fine_per_day = fine_per_day * 2` and prints the variable. Give the output and say whether the float object 2.5 has been changed.', model: `The program prints ${ic(pyOut(libFine))}. The float object 2.5 has not been changed, because a float is immutable: the multiplication builds a new float object and the name fine_per_day is bound to it.`, sol: 'One mark for the output and one for the explanation that a new object is created.', scheme: [['Output', 1], ['Immutable: new object bound to the name', 1]] }),
    ]),
  ],
}));
const divProg = code('a = int(input())', 'b = int(input())', 'print("Share each:", a // b)');
const divErr = pyErr(divProg, { stdin: '12\n0\n' });
if (!divErr.startsWith('ZeroDivisionError')) throw new Error('cb_share key');
const divAlt = code('a = int(input())', 'b = int(input())', 'print("Share each:", a / b)');
const divFix = code('a = int(input())', 'b = int(float(input()))', 'print("Share each:", a // b)');
Q('cb_share', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the sweet-sharing program of Dhruv and answer the questions. *(Imagined program and values, written by SOYL for practice.)*',
  passage: `Dhruv writes a program that reads the number of sweets and the number of children and prints how many sweets each child gets.\n\n${F(divProg)}`,
  parts: [
    child('a', mcq({ t: 2, d: 3, c: 'application', fixed: true, key: 'c', stem: 'The user types 12 and then 0. What happens?', opts: ['The program prints Share each: 0', 'A syntax error is reported before the program starts', ic(divErr) + ', a run-time error that stops the program', 'A name error is reported for the variable b'], sol: 'The statements are valid, so the program starts; the division by zero is found only when the last line is executed, and nothing is printed.' })),
    child('b', fb({ t: 2, d: 1, c: 'recall', stem: 'An error that is found only while the program is running, such as dividing by zero, is called a ___ error.', acc: [['run-time', 'runtime', 'run time']], sol: 'A run-time error (also written runtime error) stops a running program; it is different from a syntax error, which is found before the program starts.' })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The user types 12 and then 4.5. Name the error and rewrite the second line so that 4.5 is accepted and truncated, and give the output of the corrected program.', model: `Python reports ${ic(pyErr(divProg, { stdin: '12\n4.5\n' }))}, because int() cannot convert the text 4.5.\n\n${F(divFix)}\n\nFor the input 12 and 4.5 the output is ${ic(pyOut(divFix, { stdin: '12\n4.5\n' }))}.`, sol: 'One mark for the ValueError and its reason, one for the corrected line and output.', scheme: [['ValueError and reason', 1], ['int(float(input())) and output', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Dhruv replaces // by / in the last line. Give the output for the input 12 and 5 and say why the result is not a whole number type.', model: `The output is ${ic(pyOut(divAlt, { stdin: '12\n5\n' }))}. The operator / is true division and always gives a float, even when both operands are integers.`, sol: 'One mark for the output and one for the reason.', scheme: [['Output', 1], ['True division always gives a float', 1]] }),
    ]),
  ],
}));
const pocketSrc = (limit) => code('wallet = 500', 'wallet -= 120', 'wallet //= 3', 'wallet **= 2', `paid = wallet > ${limit} and wallet % 2 == 0`, 'print(wallet, paid)');
const pocketStmts = ['wallet = 500', 'wallet -= 120', 'wallet //= 3', 'wallet **= 2'];
const pocketRows = rowsOf(traceSrc(pocketStmts, ['wallet']));
Q('cb_pocket', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the pocket-money tracker of Isha and answer the questions. *(Imagined amounts, written by SOYL for practice.)*',
  passage: `Isha keeps her pocket money in the variable wallet and updates it with augmented assignment operators.\n\n${F(pocketSrc(20000))}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'd', stem: 'What does the program print?', opts: [ic('126 False'), ic('15876 True'), ic('15876'), outIc(pocketSrc(20000))], sol: 'wallet becomes 380, then 126 by floor division, then 126 squared. The comparison with 20000 is false, so the and expression is False.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The statement `wallet //= 3` is shorthand for `wallet = wallet ___ 3`.', acc: [['//']], sol: 'The augmented assignment //= applies the floor-division operator // and stores the result in the same variable.' })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Write the value of wallet after each of the first four statements.', model: mdTable(['Statement', 'wallet'], pocketStmts.map((s, i) => [ic(s), pocketRows[i][0]])), sol: 'One mark for the first two values and one for the last two.', scheme: [['First two values', 1], ['Last two values', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Isha changes 20000 to 15000 in the fifth line. Give the new output and say which part of the and expression decides it.', model: `The output is ${ic(pyOut(pocketSrc(15000)))}. Both parts are now true: ${ic('wallet > 15000')} and ${ic('wallet % 2 == 0')}, since the remainder on division by 2 is zero, so and gives True.`, sol: 'One mark for the output and one for checking both conditions.', scheme: [['Output', 1], ['Both conditions true', 1]] }),
    ]),
  ],
}));
