// Build CBSE 12 Computer Science ch03 Exception Handling. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-12-computer-science-ch03/src/build.mjs
// Every program output and error line shown in decks, notes and flashcards is produced by pyOut()/pyErr() (Python 3).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut, pyErr } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-12-computer-science-ch03', 'computer-science');
usePyCache(SRC);
const { F } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const code = (...lines) => lines.join('\n');
const ic = (s) => '`' + s + '`';
const errName = (c, o) => pyErr(c, o).split(':')[0];

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Kinds of errors', 'Syntax errors', 'Exceptions', 'Built-in exceptions', 'raise', 'assert'], 'Route map of Part 1: kinds of errors, syntax errors, exceptions, built-in exceptions, the raise statement and the assert statement', 'Part 1 at a glance');
const cLogic = code('length, width = 8, 5', 'area = 2 * (length + width)', 'print("Area:", area)');
const vKinds = table(
  ['Kind', 'When it is found', 'Example', 'What happens'],
  [
    ['Syntax error', 'While Python parses the program, before it runs', '`if x > 5` without a colon', 'Nothing runs; Python reports SyntaxError'],
    ['Exception (runtime error)', 'While the program runs', '`10 / 0`', `Python raises ${ic(errName('10 / 0'))}`],
    ['Logical error', 'Only by testing the results', 'Area worked out as `2 * (l + w)`', `Program runs but prints a wrong answer (${ic(pyOut(cLogic))})`],
  ],
  'Table of the three kinds of errors: a syntax error is found while parsing and nothing runs; an exception occurs while the program runs, such as division by zero; a logical error gives a wrong answer without any message',
  'Exception handling deals with the middle row.',
);
const cSyn = code('marks = 82', 'if marks >= 33', '    print("Pass")');
const vParse = flow(
  'TB',
  ['Python reads the whole program (parsing)', 'Grammar broken? SyntaxError: no statement runs', 'Grammar fine: statements run one by one', 'A statement fails at run time: an exception is raised', 'Handled by try-except, or the program stops with a traceback'],
  'Flow: Python first parses the whole program; a broken grammar gives a SyntaxError and nothing runs; otherwise statements run one by one; a failing statement raises an exception, which is either handled by try-except or stops the program with a traceback',
  'Syntax errors stop the program before it starts.',
);
const cTrace = code('prices = [120, 80]', 'print("Start")', 'print(prices[2])', 'print("End")');
const vTraceback = table(
  ['Part of the error line', 'For this program'],
  [
    ['Exception name (the class of the error)', ic(errName(cTrace))],
    ['Message (details)', ic(pyErr(cTrace).split(': ').slice(1).join(': '))],
    ['Output printed before the error', ic(pyOut('print("Start")'))],
    ['Statement never reached', ic('print("End")')],
  ],
  'Table reading an error: the program printed Start, then indexing position 2 of a two-item list raised IndexError with the message list index out of range, so the last print statement never ran',
  'The last line of a traceback names the exception and gives a message.',
);
const b1 = [
  ['ValueError', 'int("7k")', 'right type, unsuitable value'],
  ['TypeError', '"Rs " + 50', 'operation on an unsuitable type'],
  ['NameError', 'print(totl)', 'name never assigned'],
  ['IndexError', '[3, 9][2]', 'sequence index out of range'],
  ['KeyError', '{"tea": 10}["milk"]', 'dictionary key missing'],
  ['ZeroDivisionError', '45 // 0', 'divisor is zero'],
];
const vBuiltin1 = table(
  ['Statement', 'Error line from Python', 'Cause'],
  b1.map(([, c, why]) => [ic(c), ic(pyErr(c.startsWith('print') ? c : `x = ${c}`)), why]),
  'Table of six common built-in exceptions, each produced by running the statement in Python: ValueError, TypeError, NameError, IndexError, KeyError and ZeroDivisionError, with their causes',
);
const b2 = [
  ['open("notes_old.txt")', 'file not found (an OSError, also called IOError)', {}],
  ['import mathz', 'module not found (an ImportError)', {}],
  ['import math\nmath.exp(1000)', 'number too large to store', {}],
  ['x = input()', 'input ended before a line was read', { stdin: '' }],
];
const vBuiltin2 = table(
  ['Statement', 'Error line from Python', 'Cause'],
  b2.map(([c, why, o]) => [ic(c.replace('\n', '; ')), ic(pyErr(c, o)), why]),
  'Table of four more built-in exceptions, each produced by running the statement in Python: FileNotFoundError for a missing file, ModuleNotFoundError for a missing module, OverflowError for a result too large, and EOFError when input ends',
  'IOError is another name for OSError in Python 3.',
);
const cWe1 = code('stock = {"rice": 40, "dal": 25}', 'need = "oil"', 'print("Checking", need)', 'qty = stock[need]', 'print("Quantity:", qty)');
const vWe1 = table(
  ['Line', 'Statement', 'Runs?', 'Result'],
  [
    ['1', ic('stock = {...}'), 'Yes', 'dictionary created'],
    ['2', ic('need = "oil"'), 'Yes', 'name assigned'],
    ['3', ic('print("Checking", need)'), 'Yes', `prints ${ic(pyOut(cWe1.split('\n').slice(0, 3).join('\n')))}`],
    ['4', ic('qty = stock[need]'), 'Fails', ic(pyErr(cWe1))],
    ['5', ic('print("Quantity:", qty)'), 'No', 'never reached'],
  ],
  'Trace table for a program that looks up oil in a stock dictionary: the first three lines run and print Checking oil, the fourth raises KeyError for oil, and the fifth never runs',
  'Produced by running the program in Python.',
);
const cRaise = code('speed = 140', 'try:', '    if speed > 120:', '        raise ValueError("speed limit crossed")', '    print("Within limit")', 'except ValueError as e:', '    print("Alert:", e)');
const vRaiseFlow = flow('LR', ['Check a condition', 'Condition bad: raise ExceptionName("message")', 'Rest of the block is skipped', 'A matching except handles it (or the program stops)'], 'Flow of raise: the program checks a condition; if the condition is bad it raises a named exception with a message; the rest of the block is skipped; a matching except block handles it, otherwise the program stops', 'raise throws an exception on purpose.');
const vRaiseAssert = table(
  ['', 'raise', 'assert'],
  [
    ['Form', '`raise ValueError("msg")`', '`assert condition, "msg"`'],
    ['When it throws', 'Every time it executes', 'Only if the condition is False'],
    ['Exception', 'Any one you name', 'Always AssertionError'],
    ['Typical use', 'Reject bad data in a finished program', 'Check assumptions while developing'],
  ],
  'Comparison table of raise and assert: raise throws the named exception every time it runs and is used to reject bad data; assert throws AssertionError only when its condition is False and is used to check assumptions',
);
const cFee = code(
  'try:',
  '    fee = int(input("Fee: "))',
  '    if fee < 0:',
  '        raise ValueError("fee cannot be negative")',
  '    print("Recorded", fee)',
  'except ValueError as e:',
  '    print("Not recorded:", e)',
);
const feeRuns = ['2500', '-300', 'free'];
const vFee = table(
  ['Typed by the clerk', 'Output'],
  feeRuns.map((x) => [ic(x), ic(pyOut(cFee, { stdin: `${x}\n` }).replace('Fee: ', ''))]),
  'Table of three runs of the fee program: 2500 is recorded; minus 300 is rejected by the program\'s own raise; the word free is rejected because int() raises ValueError',
  'Each run was executed in Python with the typed input.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Syntax error', 'found while parsing; nothing runs; cannot be caught in the same program'],
    ['Exception', 'raised while running; can be handled'],
    ['Built-in exceptions', 'ValueError, TypeError, NameError, IndexError, KeyError, ZeroDivisionError, FileNotFoundError (IOError), ImportError, EOFError, OverflowError'],
    ['Error line', 'exception name, a colon, then the message'],
    ['raise', 'throws a named exception on purpose'],
    ['assert', 'raises AssertionError when its condition is False'],
  ],
  'Summary table of Part 1: syntax errors, exceptions, the common built-in exceptions, the error line, raise and assert',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Why handle', 'try and except', 'Several except clauses', 'Order of handlers', 'else', 'finally', 'Recovering'], 'Route map of Part 2: why handle exceptions, try and except, several except clauses, the order of handlers, else, finally and recovering', 'Part 2 at a glance');
const cCrash = code('prices = {"tea": 12, "coffee": 20}', 'print(prices["juice"])', 'print("Next customer")');
const cHandled = code('prices = {"tea": 12, "coffee": 20}', 'try:', '    print(prices["juice"])', 'except KeyError:', '    print("Not on the menu")', 'print("Next customer")');
const vWhy = table(
  ['', 'Without handling', 'With try-except'],
  [
    ['Result', `stops with ${ic(pyErr(cCrash))}`, `prints ${ic(pyOut(cHandled).split('\n')[0])}`],
    ['Rest of the program', 'never runs', `continues: ${ic(pyOut(cHandled).split('\n')[1])}`],
    ['User sees', 'a traceback', 'a clear message'],
  ],
  'Comparison table for asking a canteen price list for juice: without handling the program stops with a KeyError traceback; with try and except it prints Not on the menu and continues to the next customer',
  'Both versions were run in Python.',
);
const vPaths = (() => {
  const s = new Svg(640, 300);
  const box = (x, y, w, label, accent) => {
    s.rect(x, y, w, 34, { fill: 'fill', color: accent ? 'accent' : undefined, sw: 1.5, rx: 6 });
    s.text(x + w / 2, y + 17, label, { size: 13, bold: !!accent });
  };
  box(240, 10, 160, 'try block', true);
  box(40, 110, 160, 'else block');
  box(40, 180, 160, 'finally block');
  box(40, 250, 160, 'next statement');
  box(240, 110, 160, 'matching except');
  box(240, 180, 160, 'finally block');
  box(240, 250, 160, 'next statement');
  box(440, 110, 160, 'finally block');
  box(440, 180, 160, 'program stops', true);
  s.arrow(300, 44, 140, 108, { sw: 1.6 });
  s.arrow(320, 44, 320, 108, { sw: 1.6 });
  s.arrow(340, 44, 500, 108, { sw: 1.6 });
  s.text(130, 72, 'no exception', { size: 12, muted: true });
  s.text(372, 82, 'handled', { size: 12, muted: true, anchor: 'start' });
  s.text(560, 72, 'no handler', { size: 12, muted: true });
  for (const x of [120, 320]) {
    s.arrow(x, 144, x, 178, { sw: 1.4 });
    s.arrow(x, 214, x, 248, { sw: 1.4 });
  }
  s.arrow(520, 144, 520, 178, { sw: 1.4 });
  s.text(520, 236, 'with a traceback', { size: 12, muted: true });
  return s.visual('Diagram of the three paths through a try statement: with no exception, try leads to else, then finally, then the next statement; with a handled exception, try leads to the matching except block, then finally, then the next statement; with no matching handler, finally runs and then the program stops with a traceback', 'finally is on every path.');
})();
const cMulti = code(
  'for raw in ["4", "0", "four"]:',
  '    try:',
  '        print(100 // int(raw))',
  '    except ValueError:',
  '        print("not a number")',
  '    except ZeroDivisionError:',
  '        print("cannot share among zero")',
);
const vMulti = table(
  ['raw', 'Exception', 'Handler that runs', 'Printed'],
  ['4', '0', 'four'].map((r, i) => {
    const one = code(`raw = "${r}"`, 'x = 100 // int(raw)');
    const line = pyOut(cMulti).split('\n')[i];
    return [ic(`"${r}"`), r === '4' ? 'none' : errName(one), r === '4' ? 'none (try completes)' : `except ${errName(one)}`, ic(line)];
  }),
  'Table for a loop that floor-divides 100 by the converted value: 4 gives 25 with no exception; 0 raises ZeroDivisionError and its handler runs; four raises ValueError and its handler runs',
  'Each row comes from running the loop in Python.',
);
const cAs = code('try:', '    n = int("12.5")', 'except (ValueError, TypeError) as e:', '    print("Problem:", e)');
const vAs = table(
  ['Form', 'Meaning'],
  [
    ['`except ValueError:`', 'handles one exception'],
    ['`except (ValueError, TypeError):`', 'one handler for either exception (a tuple)'],
    ['`except ValueError as e:`', 'e holds the exception object; `print(e)` shows its message'],
    ['`except Exception:`', 'almost any runtime error (write it last)'],
    ['`except:`', 'every exception (avoid: hides bugs)'],
  ],
  'Table of except clause forms: one named exception, a tuple of exceptions, the as form that keeps the exception object, the general Exception class written last, and the bare except which should be avoided',
);
const cOrder = code('try:', '    print("Pune"[9])', 'except Exception:', '    print("general handler")', 'except IndexError:', '    print("index handler")');
const vOrder = table(
  ['Clause order', 'Which handler runs for "Pune"[9]?'],
  [
    ['IndexError first, Exception last', ic(pyOut(code('try:', '    print("Pune"[9])', 'except IndexError:', '    print("index handler")', 'except Exception:', '    print("general handler")')))],
    ['Exception first, IndexError last', ic(pyOut(cOrder))],
  ],
  'Table showing that order matters: with the IndexError clause first the index handler runs; with the general Exception clause first, the general handler catches the IndexError and the specific clause is never used',
  'Python runs the first matching clause, top to bottom.',
);
const vElse = table(
  ['What happened in try', 'except', 'else', 'finally'],
  [
    ['No exception', 'skipped', 'runs', 'runs'],
    ['Exception, handled', 'matching one runs', 'skipped', 'runs'],
    ['Exception, no matching handler', 'none runs', 'skipped', 'runs, then the program stops'],
  ],
  'Table of which clauses run: with no exception, else and finally run; with a handled exception, the matching except and finally run; with an unhandled exception only finally runs and then the program stops',
);
const cFinal = code('try:', '    print("Lab door opened")', '    print(25 / 0)', 'except ZeroDivisionError:', '    print("Reading failed")', 'finally:', '    print("Lab door locked")');
const vFinally = flow('LR', ['Open or reserve something', 'Risky work in try', 'Error handled (or not)', 'finally: release it in every case'], 'Flow of the finally pattern: something is opened or reserved, risky work is done in try, an error may be handled or not, and finally releases the resource in every case', 'Typical uses: closing files and connections, saving logs.');
const cWe = code(
  'for v in ["5", "x", "0"]:',
  '    try:',
  '        r = 30 // int(v)',
  '    except ValueError:',
  '        print("V", v)',
  '    except ZeroDivisionError:',
  '        print("Z", v)',
  '    else:',
  '        print("R", r)',
  '    finally:',
  '        print("F", v)',
);
const weLines = pyOut(cWe).split('\n');
const vWe2 = table(
  ['v', 'Blocks executed', 'Lines printed'],
  [
    ['"5"', 'try → else → finally', ic(weLines.slice(0, 2).join(' / '))],
    ['"x"', 'try (int fails) → except ValueError → finally', ic(weLines.slice(2, 4).join(' / '))],
    ['"0"', 'try (division fails) → except ZeroDivisionError → finally', ic(weLines.slice(4, 6).join(' / '))],
  ],
  'Dry-run table for a loop over the strings 5, x and 0: for 5 the try, else and finally blocks run; for x the ValueError handler and finally run; for 0 the ZeroDivisionError handler and finally run',
  'Lines printed are from running the loop in Python (separated by /).',
);
const cRetry = code(
  'while True:',
  '    try:',
  '        tickets = int(input("Tickets (1-6): "))',
  '        if not 1 <= tickets <= 6:',
  '            raise ValueError("choose 1 to 6")',
  '        break',
  '    except ValueError as e:',
  '        print("Invalid:", e)',
  'print("Booking", tickets, "tickets")',
);
const retryIn = 'two\n9\n3\n';
const vRetry = table(
  ['Typed', 'What the program does'],
  [
    ['two', ic(pyOut(cRetry, { stdin: retryIn }).replace(/Tickets \(1-6\): /g, '').split('\n')[0])],
    ['9', ic(pyOut(cRetry, { stdin: retryIn }).replace(/Tickets \(1-6\): /g, '').split('\n')[1])],
    ['3', ic(pyOut(cRetry, { stdin: retryIn }).replace(/Tickets \(1-6\): /g, '').split('\n')[2])],
  ],
  'Table of one run of the ticket loop: the word two is rejected by int, 9 is rejected by the program\'s own raise, and 3 is accepted, so the loop ends and the booking is printed',
  'Run in Python with the inputs two, 9 and 3.',
);
const vPractice = table(
  ['Do', 'Avoid'],
  [
    ['Keep the try block small: only the risky statements', 'Putting the whole program in one try'],
    ['Catch the specific exceptions you expect', 'A bare `except:` that hides every bug'],
    ['Give a helpful message, or ask again', 'Silently ignoring errors with `pass`'],
    ['Put clean-up in `finally`', 'Repeating clean-up in every handler'],
    ['Write `except Exception` last, if at all', 'A general handler before specific ones'],
  ],
  'Table of good practice in exception handling: keep try blocks small, catch specific exceptions, give helpful messages, put clean-up in finally and write any general handler last; avoid a bare except, silent pass and a general handler first',
);
const vSummary2 = table(
  ['Clause', 'Runs when'],
  [
    ['`try`', 'always starts; stops at the first failing statement'],
    ['`except X`', 'X (or a subclass) was raised; first match only'],
    ['`else`', 'try raised nothing'],
    ['`finally`', 'always, even with break or an unhandled exception'],
  ],
  'Summary table of Part 2: try always starts and stops at the first failure; an except clause runs for the first matching exception; else runs only when nothing was raised; finally always runs',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Exception Handling — Part 1: Errors, Exceptions, raise and assert',
  goals: [
    'Distinguish syntax errors, exceptions and logical errors',
    'Identify the common built-in exceptions from code and from an error line',
    'Raise exceptions deliberately with raise and check conditions with assert',
  ],
  slides: [
    sl('title', 'Exception Handling', {
      b: 'Part 1 — what goes wrong in programs: **syntax errors**, **exceptions**, the **built-in exceptions**, and how to signal problems with **raise** and **assert**.',
      v: vRoute1,
      n: 'Every programmer meets errors. A good program does not simply crash when something unexpected happens, such as a user typing letters where a number was expected. In this chapter we learn what exceptions are and how Python lets us handle them. Part one looks at the kinds of errors, the common built-in exceptions, and how to raise exceptions ourselves.',
    }),
    sl('concept', 'Three kinds of errors', {
      v: vKinds,
      n: 'Errors come in three kinds. A syntax error breaks the grammar of Python, and it is caught before the program even starts. An exception happens while a correct program is running, for example dividing by zero. A logical error gives no message at all; the program runs but the answer is wrong, as in this area calculation. Exception handling is about the middle kind.',
    }),
    sl('concept', 'Syntax errors', {
      b: `A missing colon is a grammar mistake:\n\n${F(cSyn)}\n\nPython reports ${ic(pyErr(cSyn))} and runs **no** statement, not even the first one.`,
      n: 'Here the if statement is missing its colon. Python reads the whole program first, and because the grammar is broken it refuses to run anything at all, not even the first line. That is why a syntax error cannot be caught by a try statement in the same program: the try statement itself never gets to run.',
    }),
    sl('diagram', 'Parse first, then run', {
      v: vParse,
      n: 'This flow shows what Python does with your program. First it parses the whole file. If the grammar is broken, you get a syntax error and nothing runs. If the grammar is fine, the statements run one by one. When a statement fails while running, Python raises an exception. Either your program handles it, or the program stops and prints a traceback.',
    }),
    sl('check', 'Quick check: name the exception', {
      b: 'Which exception does the code raise?',
      chk: 'm_type',
      n: 'Look at the types of the two values being joined by the plus sign.',
    }),
    sl('concept', 'Reading an error message', {
      b: F(cTrace),
      v: vTraceback,
      n: 'When an exception is not handled, Python prints a traceback. Its last line is the most useful: it gives the name of the exception, a colon, and a message with details. Here the program printed Start, then asked for position two of a list that has only two items, so Python raised an index error. The final print statement was never reached.',
    }),
    sl('concept', 'Common built-in exceptions', {
      v: vBuiltin1,
      n: 'Python has many built-in exceptions, each a class with a name that describes the problem. A value error means the type is right but the value is unsuitable. A type error means the operation does not suit the type. A name error means a variable was never created. Index error and key error are about missing positions and missing keys, and zero division error is about dividing by zero.',
    }),
    sl('concept', 'More built-in exceptions', {
      v: vBuiltin2,
      n: 'Four more appear in the syllabus. Opening a file that does not exist raises file not found error, a kind of input output error. Importing a module that cannot be found raises an import error. A result too large for a float raises overflow error. And when input runs out before a line is read, Python raises end of file error.',
    }),
    sl('check', 'Quick check: a misspelt name', {
      b: 'Which exception is raised?',
      chk: 'm_name',
      n: 'Compare the name used in the last line with the names that were assigned.',
    }),
    sl('example', 'Worked example 1: which line fails?', {
      b: `Dry-run this program and find where it stops.\n\n${F(cWe1)}`,
      v: vWe1,
      n: 'Let us dry run this together. Lines one and two create a dictionary and a name. Line three prints Checking oil. Line four looks up oil in the dictionary, but there is no such key, so Python raises a key error and stops. Line five is never reached. In exams, write the output printed before the error and then name the exception.',
    }),
    sl('concept', 'Raising an exception: raise', {
      b: `${F(cRaise)}\n\nOutput: ${ic(pyOut(cRaise))}`,
      v: vRaiseFlow,
      n: 'Sometimes Python sees nothing wrong, but your program knows the data is unacceptable, like a speed above the limit. The raise statement throws an exception on purpose, with a message. The rest of the block is skipped and a matching except block handles it, exactly as if Python had raised it. If no handler matches, the program stops.',
    }),
    sl('concept', 'Checking assumptions: assert', {
      b: `${F('weight = -2', 'assert weight > 0, "weight must be positive"')}\n\nraises ${ic(pyErr('weight = -2\nassert weight > 0, "weight must be positive"'))}`,
      v: vRaiseAssert,
      n: 'The assert statement tests a condition. If the condition is true, nothing happens. If it is false, Python raises an assertion error carrying your message. Programmers use assert to check assumptions while developing. Compare it with raise: raise always throws the exception you name, while assert throws only when its condition fails.',
    }),
    sl('check', 'Quick check: raise', {
      b: 'Write the exact output.',
      chk: 'co_raise',
      n: 'Follow the program line by line and decide whether the raise statement executes.',
    }),
    sl('example', 'Worked example 2: rejecting a bad fee', {
      b: `A school office records fees. Negative fees must be rejected, and so must words.\n\n${F(cFee)}`,
      v: vFee,
      n: 'Here is a fee recorder. If the clerk types a number below zero, the program raises a value error itself. If the clerk types a word, int raises a value error. One except clause handles both and prints the reason stored in the exception. The table shows three real runs: a valid fee, a negative one, and the word free.',
    }),
    sl('check', 'Quick check: assert', {
      b: 'Write the exact output.',
      chk: 'co_assert',
      n: 'Decide whether the condition after assert is true or false for the value given.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: syntax errors are found before running and stop everything. Exceptions are raised while running and can be handled. Learn the common built-in exceptions and what causes each. The last line of a traceback gives the exception name and a message. Use raise to throw an exception on purpose, and assert to check that a condition holds.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the exception **exactly**: `ZeroDivisionError`, not "divide error"; `KeyError` for dictionaries, `IndexError` for lists and strings.',
        '`int("4.5")` is a **ValueError**; `"5" + 5` is a **TypeError**.',
        'For "find the output", write everything printed **before** the exception, then the error.',
        'A syntax error means **no** output at all.',
        'assert raises **AssertionError** only when its condition is False.',
      ],
      n: 'In the exam, write exception names exactly as Python spells them. Remember the classic pairs: converting a decimal string with int is a value error, and joining a string to a number is a type error. In output questions, show what is printed before the failure. A syntax error means nothing is printed at all. And assert only raises when its condition is false.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Exception Handling — Part 2: try, except, else and finally',
  goals: [
    'Handle exceptions with try and one or more except clauses',
    'Use else and finally correctly and predict which blocks run',
    'Write programs that recover from bad input and continue',
  ],
  slides: [
    sl('title', 'Handling exceptions', {
      b: 'Part 2 — **try**, **except**, **else** and **finally**, and how to write programs that **recover**.',
      v: vRoute2,
      n: 'In part two we learn to handle exceptions. We will write try and except blocks, use several handlers, see why their order matters, and add else and finally clauses. Then we will write programs that keep asking until the user gives valid input, which is exactly what real applications such as booking counters and fee desks need.',
    }),
    sl('concept', 'Why handle exceptions?', {
      v: vWhy,
      n: 'Compare these two versions of a canteen program asked for juice, which is not on the menu. Without handling, the program stops with a key error and the next customer is never served. With try and except, it prints a friendly message and carries on. Handling exceptions keeps programs running and separates error handling from the main logic.',
    }),
    sl('diagram', 'try and except', {
      b: `${F(cHandled)}`,
      v: vPaths,
      n: 'Put the risky statements in a try block and the handler in an except block. If the try block runs without trouble, the except block is skipped. If an exception is raised, the rest of the try block is skipped and the matching except block runs. Afterwards, the program continues with the statement after the whole try statement.',
    }),
    sl('check', 'Quick check: a missing key', {
      b: 'Write the exact output.',
      chk: 'co_keyerror',
      n: 'For each item, decide whether the dictionary lookup succeeds or raises an exception.',
    }),
    sl('concept', 'Several except clauses', {
      b: F(cMulti),
      v: vMulti,
      n: 'A try statement can have several except clauses, one for each kind of problem. Python compares the exception with each clause from top to bottom and runs the first one that matches. In this loop, the value four works, zero triggers the zero division handler, and the word four triggers the value error handler.',
    }),
    sl('concept', 'Grouping and naming exceptions', {
      b: `${F(cAs)}\n\nOutput: ${ic(pyOut(cAs))}`,
      v: vAs,
      n: 'You can handle two exceptions with one clause by writing them in a tuple. Adding as, followed by a name, stores the exception object, so you can print its message. The general class Exception catches almost any runtime error, and a bare except catches everything. Use those last two carefully, because they can hide real mistakes.',
    }),
    sl('concept', 'Order of handlers matters', {
      b: F(cOrder),
      v: vOrder,
      n: 'Because Python runs the first matching clause, order matters. In this program the general Exception clause comes first, so it catches the index error, and the specific index handler is never used. Always write specific handlers first and any general handler last.',
    }),
    sl('check', 'Quick check: after the handler', {
      b: 'Where does execution continue?',
      chk: 'm_after_handled',
      n: 'Think about whether Python goes back into the try block after handling an exception.',
    }),
    sl('concept', 'The else clause', {
      b: F('try:', '    n = int(input("Roll number: "))', 'except ValueError:', '    print("Digits only")', 'else:', '    print("Welcome, roll", n)'),
      v: vElse,
      n: 'An else clause after the except clauses runs only when the try block raised no exception. Put code there that should happen only after the risky step succeeded, like greeting a student once the roll number has been read. This keeps the try block short, so you do not accidentally catch errors from the follow-up code.',
    }),
    sl('diagram', 'The finally clause', {
      b: `${F(cFinal)}\n\nOutput:\n\n${F(pyOut(cFinal))}`,
      v: vFinally,
      n: 'The finally clause runs in every case: after success, after a handled error, and even when an error is not handled or a loop is left with break. That makes it the place for clean-up, such as closing a file or locking the lab door in this example. Notice that the door is locked even though the reading failed.',
    }),
    sl('example', 'Worked example 1: which blocks run?', {
      b: `Dry-run the loop and list the blocks executed for each value.\n\n${F(cWe)}`,
      v: vWe2,
      n: 'Let us trace this loop. For the string five, the division works, so try, else and finally run. For x, int fails, so the value error handler runs and then finally. For zero, the division fails, so the zero division handler runs and then finally. Notice that finally runs in every pass, while else runs only when nothing went wrong.',
    }),
    sl('check', 'Quick check: else and finally', {
      b: 'Write the exact output.',
      chk: 'co_else_finally',
      n: 'For each divisor, decide which of the except, else and finally blocks run.',
    }),
    sl('example', 'Worked example 2: ask until the input is valid', {
      b: F(cRetry),
      v: vRetry,
      n: 'Real programs should not give up after one bad entry. This booking loop keeps asking until it gets a whole number from one to six. A word makes int raise a value error, a number outside the range makes the program raise its own value error, and a valid number reaches break, which ends the loop. The table shows a real run.',
    }),
    sl('concept', 'Good practice', {
      v: vPractice,
      n: 'Some habits make exception handling work well. Keep each try block small, so you know which statement failed. Catch the specific exceptions you expect, give a helpful message, and put clean-up in finally. Avoid a bare except or a silent pass, because they hide bugs, and never put a general handler before the specific ones.',
    }),
    sl('check', 'Quick check: clause order', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_else_before',
      n: 'Recall the fixed order of the clauses in a try statement.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: the try block runs until the first statement that fails. The first matching except clause handles the exception. The else block runs only when nothing was raised, and the finally block always runs. After handling, the program continues after the whole try statement. Loops with try and except let a program recover and ask again.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Clause order is fixed: `try`, `except` …, `else`, `finally`.',
        'In output questions, list the **finally** output for **every** pass, even after `break`.',
        'Only the **first** matching except clause runs; later ones are skipped.',
        'After a handled exception the program does **not** go back into the try block.',
        'In programs, show the output for each test input given in the question.',
      ],
      n: 'Remember the fixed order of clauses. In output questions, do not forget the finally output, even when the loop is left with break. Only the first matching except clause runs. After handling, the program never returns to the failed line. And in program questions, show the output for every test input the question gives you.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const cNoteFlow = code('try:', '    qty = int("3")', 'except ValueError:', '    print("bad")', 'else:', '    print("qty", qty)', 'finally:', '    print("done")');
const N = notes({
  title: 'Exception Handling — Notes',
  sections: [
    {
      h: '1. Errors and exceptions',
      t: 1,
      b: `**Syntax errors** break Python's grammar (missing colon, unmatched bracket, \`=\` for \`==\` in a condition). Python finds them while **parsing**, before running, so **no** statement runs and they cannot be handled in the same program.\n\n**Exceptions** (runtime errors) occur while a valid program **runs**, e.g. ${ic('10 / 0')}. Python creates an exception object and looks for a handler; with none, the program stops and prints a **traceback** whose last line is *ExceptionName: message*.\n\n**Logical errors** give wrong results with no message; only testing reveals them.`,
      terms: [
        ['Syntax error', 'An error in the grammar of the program, found while parsing; no statement runs.'],
        ['Exception', 'An error that occurs while a program is running; it can be handled.'],
        ['Traceback', 'The report Python prints for an unhandled exception, ending with the exception name and message.'],
      ],
      v: vKinds,
      vs: [vParse, vTraceback],
    },
    {
      h: '2. Built-in exceptions',
      t: 1,
      b: `Each built-in exception is a class named after the problem:\n\n- **ValueError** — right type, unsuitable value: ${ic('int("7k")')}\n- **TypeError** — unsuitable type for an operation: ${ic('"Rs " + 50')}\n- **NameError** — name not defined\n- **IndexError** — sequence index out of range\n- **KeyError** — dictionary key missing\n- **ZeroDivisionError** — divisor zero in \`/\`, \`//\` or \`%\`\n- **FileNotFoundError** (an **OSError**, also called **IOError**) — file missing\n- **ImportError** (and **ModuleNotFoundError**) — import fails\n- **EOFError** — \`input()\` reaches end of input\n- **OverflowError** — result too large\n- **SyntaxError** — grammar error\n\nThe error lines in the tables were produced by Python 3.12; older versions word some messages slightly differently, but the exception names are the same.`,
      terms: [
        ['Built-in exception', 'An exception class provided by Python, such as ValueError or KeyError.'],
        ['IOError', 'Another name for OSError in Python 3; raised for input-output failures such as a missing file.'],
      ],
      v: vBuiltin1,
      vs: [vBuiltin2, vWe1],
    },
    {
      h: '3. Raising exceptions: raise and assert',
      t: 1,
      b: `**raise** throws a named exception deliberately: \`raise ValueError("fee cannot be negative")\`. The rest of the block is skipped, and a matching handler (or the end of the program) follows.\n\n**assert** checks a condition: \`assert cond, "message"\` raises **AssertionError** with the message only when the condition is **False**; it is mainly used to check assumptions during development.\n\n${F('limit = 3', 'try:', '    assert limit >= 5, "limit too small"', 'except AssertionError as e:', '    print("Check failed:", e)')}\n\nOutput: ${ic(pyOut('limit = 3\ntry:\n    assert limit >= 5, "limit too small"\nexcept AssertionError as e:\n    print("Check failed:", e)'))}`,
      terms: [
        ['raise', 'A statement that throws a named exception, usually with a message.'],
        ['assert', 'A statement that raises AssertionError if its condition is False.'],
      ],
      v: vRaiseAssert,
      vs: [vRaiseFlow, vFee],
    },
    {
      h: '4. try and except',
      t: 1,
      b: `Risky statements go in **try**; handlers go in **except** clauses.\n\n- The try block stops at the first failing statement; the rest of it is skipped.\n- Python compares the exception with the except clauses **top to bottom** and runs the **first** match; specific handlers first, \`except Exception\` last.\n- \`except (ValueError, TypeError):\` handles either; \`except ValueError as e:\` keeps the object, \`print(e)\` shows the message.\n- A bare \`except:\` catches everything and hides bugs.\n- After the handler, execution continues **after** the whole try statement.`,
      terms: [
        ['Exception handler', 'The block under an except clause that deals with a particular exception.'],
        ['Catching an exception', 'Finding a matching except clause and running its handler.'],
      ],
      v: vPaths,
      vs: [vMulti, vAs, vOrder],
    },
    {
      h: '5. else and finally',
      t: 1,
      b: `Order: \`try\`, \`except\` …, \`else\`, \`finally\`.\n\n- **else** runs only if the try block raised **no** exception: use it for work that needs the risky step to succeed.\n- **finally** runs in **every** case (success, handled error, unhandled error, \`break\`): use it for clean-up such as closing files.\n\n${F(cNoteFlow)}\n\nOutput:\n\n${F(pyOut(cNoteFlow))}`,
      terms: [
        ['else clause', 'Runs after the try block only when no exception was raised.'],
        ['finally clause', 'Always runs at the end of the try statement; used for clean-up.'],
      ],
      v: vElse,
      vs: [vFinally, vWe2],
    },
    {
      h: '6. Recovering and good practice',
      t: 1,
      b: 'Put the input step inside a loop with try-except, and `break` when the input is valid; use `raise` inside try for values outside the allowed range so that one handler deals with all invalid entries. Keep try blocks small, catch specific exceptions, show helpful messages, and avoid a bare `except` or a silent `pass`.',
      terms: [
        ['Input validation loop', 'A loop that keeps asking for input until a valid value is entered, using try-except and break.'],
      ],
      v: vRetry,
      vs: [vPractice],
    },
  ],
  tips: '**Common mistakes**\n- Calling `int("4.5")` a TypeError (it is a **ValueError**) or `"5" + 5` a ValueError (it is a **TypeError**).\n- Writing output for a syntax-error program: there is **none**.\n- Forgetting that **finally** prints in every pass, even after `break`.\n- Thinking execution returns to the failed line after a handler.\n- Putting `except Exception` before specific clauses.\n- Misspelling exception names (`ValueEror`) or forgetting the colon after `try` and `except`.\n\n**How marks are usually awarded**\n- Output questions: each correct line, in the right order.\n- Error-finding: the error named **and** corrected.\n- Programs: try around the risky step, correct handlers, and output shown for the inputs given.\n- Theory: one point per mark, with a short example where it helps.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is an **exception**?', 'An error that occurs **while** a program runs; it can be handled.', 'definition', 1],
  ['Can a syntax error be caught with try-except in the same program?', '**No.** It is found while parsing, before any statement (including try) runs.', 'concept', 1],
  ['What is a **logical error**?', 'The program runs without a message but gives a wrong result.', 'definition', 1],
  [ic('int("4.5")'), ic(pyErr('int("4.5")')), 'example', 1],
  [ic('"Rs " + 50'), ic(pyErr('x = "Rs " + 50')), 'example', 1],
  [ic('[3, 9][2]'), ic(pyErr('x = [3, 9][2]')), 'example', 1],
  ['Missing dictionary key with `d[k]`', '**KeyError** (use `d.get(k)` to avoid it).', 'fact', 1],
  ['Using a name that was never assigned', '**NameError**.', 'fact', 1],
  [ic('9 % 0'), ic(pyErr('x = 9 % 0')), 'example', 1],
  ['Opening a missing file for reading', '**FileNotFoundError**, a kind of OSError (IOError).', 'fact', 1],
  ['`input()` with no input left', '**EOFError**.', 'fact', 1],
  ['Importing a module that does not exist', '**ModuleNotFoundError**, a kind of **ImportError**.', 'fact', 1],
  ['Last line of a traceback', '*ExceptionName: message*.', 'concept', 1],
  ['Keyword to throw an exception on purpose', '`raise`, e.g. `raise ValueError("bad fee")`.', 'fact', 1],
  ['What does `assert cond, "msg"` do?', 'Raises **AssertionError** with "msg" only if cond is **False**.', 'concept', 1],
  ['raise vs assert', 'raise always throws the named exception; assert throws AssertionError only when its condition fails.', 'concept', 1],
  ['Purpose of the **try** block', 'Holds the statements that might raise an exception.', 'definition', 1],
  ['Purpose of an **except** block', 'Handles a particular exception (the exception handler).', 'definition', 1],
  ['When does **else** run?', 'Only when the try block raised **no** exception.', 'concept', 1],
  ['When does **finally** run?', '**Always**: success, handled error, unhandled error, even after break.', 'concept', 1],
  ['Order of clauses', '`try` → `except` (one or more) → `else` → `finally`.', 'fact', 1],
  ['Several except clauses: which runs?', 'The **first** one that matches, checking from top to bottom.', 'concept', 1],
  ['Where should `except Exception:` go?', '**Last**, or it catches errors meant for specific handlers.', 'exam-tip', 1],
  ['One clause for two exceptions', '`except (ValueError, TypeError):`', 'fact', 1],
  ['What does `except ValueError as e:` give you?', 'The exception object in e; `print(e)` shows its message.', 'concept', 1],
  ['After a handled exception, where does execution continue?', 'After the **whole** try statement, not at the failed line.', 'concept', 1],
  ['Why avoid a bare `except:`?', 'It catches **every** error, hiding real bugs such as NameError.', 'exam-tip', 1],
  ['Pattern to ask until input is valid', '`while True:` + try (convert, check, `break`) + except (message).', 'concept', 1],
  ['Typical use of finally', 'Clean-up: closing files or connections, releasing resources.', 'example', 1],
  ['Output of a program with a syntax error', '**Nothing** is printed; only the SyntaxError.', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests (cbse-12-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Exception Handling',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_index', 'm_finally_when', 'm_raise_keyword', 'ar_finally'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words (or code) and the 3-mark question in about 60 words (or code).', items: ['s_else_finally', 's_err_name', 's3_age'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the output for the inputs given.', items: [{ attempt: 1, keys: ['l_split_bill', 'l_explain_try'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_ticket'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Exception Handling',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_syntax_vs_exc', 'm_key', 'm_value', 'm_file', 'm_else_when', 'm_order', 'm_multi_tuple', 'm_unhandled', 'ar_syntax', 'ar_else'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words (or code) and 3-mark questions in about 60 words (or code).', items: ['s_syntax_exc', 's_why_handle', { attempt: 1, keys: ['s_err_syntax', 's_err_type'] }, 's3_trace', { attempt: 1, keys: ['s3_builtin', 's3_multi_except'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18. Show the output for the inputs given.', items: ['l_marks_entry', { attempt: 1, keys: ['l_atm', 'l_errors_types'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_attendance', 'cb_quiz'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-12-computer-science-ch03 only (syntax errors and exceptions, built-in exceptions, raise and assert, try-except with else and finally, recovering)',
    originality: 'every program, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused (D-036)',
    execution: 'every output and error line in items, slides, notes and flashcards produced by running the code with Python 3 (runPy/pyOut/pyErr in lib.mjs); results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
