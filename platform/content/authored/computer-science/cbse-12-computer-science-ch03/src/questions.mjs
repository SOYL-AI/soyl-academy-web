// CBSE 12 Computer Science, ch03 Exception Handling — question bank. Every program, scenario and data value is
// written by SOYL (imagined people, shops and schools); no textbook, NCERT or board-paper program is reused (D-036).
// Every output and every error line stated anywhere in an item (code-output keys, MCQ options, solutions, model
// answers) is produced by running the code with Python 3 through runPy()/pyOut()/pyErr() in lib.mjs.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

const S2 = [25, 50];
const S3 = [40, 75];
/** A Python code fence for stems, passages and model answers. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
const code = (...lines) => lines.join('\n');
/** Inline code (single line only). */
const ic = (s) => '`' + s + '`';
const outIc = (c, opts) => ic(pyOut(c, opts));
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
/** Name of the exception raised by `c` (the part of the error line before the colon). */
const errName = (c, opts) => pyErr(c, opts).split(':')[0];
const T = 1;

// ================================================================ errors, exceptions, built-in exceptions
Q('m_syntax_vs_exc', mcq({
  t: T, d: 1, c: 'understanding',
  stem: 'Which kind of error is detected by Python **before** any statement of the program is executed?',
  opts: ['A syntax error, such as a missing colon', 'A ZeroDivisionError', 'A KeyError', 'A ValueError raised by int()'],
  sol: 'Python first parses (reads and checks) the whole program; a syntax error stops it there, so no line runs. ZeroDivisionError, KeyError and ValueError are exceptions raised only while the program is running.',
}));
const cIdx = code('colours = ["red", "green", "blue"]', 'print(colours[3])');
Q('m_index', mcq({
  t: T, d: 1, c: 'understanding',
  stem: `Riya runs this code. Which exception is raised?\n\n${F(cIdx)}`,
  opts: distinct([ic(errName(cIdx)), ic('KeyError'), ic('ValueError'), ic('TypeError')]),
  sol: 'The list has indexes 0, 1 and 2 only, so index 3 is out of range and Python raises IndexError. KeyError is for a missing dictionary key.',
}));
const cKey = code('fees = {"Class 11": 4500, "Class 12": 5000}', 'print(fees["Class 10"])');
Q('m_key', mcq({
  t: T, d: 1, c: 'understanding',
  stem: `A school office looks up the fee for a class that is not in its fee table. Which exception does this lookup raise?\n\n${F(cKey)}`,
  opts: distinct([ic(errName(cKey)), ic('IndexError'), ic('NameError'), ic('ValueError')]),
  sol: 'Indexing a dictionary with a key it does not contain raises KeyError. Using fees.get("Class 10") instead would return None without an error.',
}));
const cVal = code('pin = int("41a0")');
Q('m_value', mcq({
  t: T, d: 2, c: 'application',
  stem: `A delivery app reads a PIN code typed by a user. Which exception is raised here?\n\n${F(cVal)}`,
  opts: distinct([ic(errName(cVal)), ic('TypeError'), ic('SyntaxError'), ic('NameError')]),
  sol: 'int() receives a value of the right type (a string) but with an unsuitable content ("41a0" is not a whole number), so it raises ValueError.',
}));
const cType = code('rooms = 12', 'print("Rooms: " + rooms)');
Q('m_type', mcq({
  t: T, d: 2, c: 'application',
  stem: `A hostel program joins a label and a room count with the + operator. Which exception is raised?\n\n${F(cType)}`,
  opts: distinct([ic(errName(cType)), ic('ValueError'), ic('NameError'), ic('SyntaxError')]),
  sol: `A string cannot be joined to an integer with +; the operand types do not suit the operation, so Python raises TypeError (${pyErr(cType)}). Writing str(rooms) fixes it.`,
}));
const cName = code('price = 40', 'qty = 3', 'print(price * qnty)');
Q('m_name', mcq({
  t: T, d: 1, c: 'understanding',
  stem: `Which exception is raised when this code runs?\n\n${F(cName)}`,
  opts: distinct([ic(errName(cName)), ic('SyntaxError'), ic('ValueError'), ic('KeyError')]),
  sol: 'qnty is a misspelling of qty and was never assigned, so looking it up raises NameError. The code is syntactically valid, so it is not a syntax error.',
}));
const cZero = code('total_km = 240', 'days = 0', 'print(total_km % days)');
Q('m_zero', mcq({
  t: T, d: 2, c: 'understanding',
  stem: `A trip planner finds the remainder of the distance by a number of days that is zero. Which exception does this raise?\n\n${F(cZero)}`,
  opts: distinct([ic(errName(cZero)), ic('ValueError'), ic('ArithmeticWarning'), ic('No exception; it prints 0')]),
  sol: 'The remainder operator, like / and //, cannot use zero as the divisor, so Python raises ZeroDivisionError.',
}));
const cFile = code('f = open("marks_2026.txt")');
Q('m_file', mcq({
  t: T, d: 2, c: 'understanding',
  stem: `The file marks_2026.txt does not exist in the folder. Which exception does this statement raise?\n\n${F(cFile)}`,
  opts: distinct([ic(errName(cFile)), ic('NameError'), ic('ValueError'), ic('KeyError')]),
  sol: 'Opening a missing file for reading raises FileNotFoundError. It is a kind of OSError, which older programs call IOError (IOError is another name for OSError in Python 3).',
}));
Q('m_finally_when', mcq({
  t: T, d: 1, c: 'recall',
  stem: 'When is the **finally** block of a try statement executed?',
  opts: ['Always, whether or not an exception occurred', 'Only when an exception occurred', 'Only when no exception occurred', 'Only when the exception was not handled'],
  sol: 'The finally block runs in every case: after the try block completes, after a handler runs, and even when an unhandled exception is about to stop the program.',
}));
Q('m_else_when', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'In a try statement with an **else** clause, when does the else block run?',
  opts: ['Only when the try block finishes without raising an exception', 'Only when an exception is raised and handled', 'Every time, just before finally', 'Only when no except clause matches'],
  sol: 'The else block runs only if the try block raised no exception. It is the right place for code that should run only after the risky step succeeded.',
}));
Q('m_raise_keyword', mcq({
  t: T, d: 1, c: 'recall',
  stem: 'Which keyword is used to throw an exception deliberately in a Python program?',
  opts: [ic('raise'), ic('throw'), ic('except'), ic('error')],
  sol: 'raise ExceptionName("message") throws an exception. Python has no throw keyword; except catches exceptions rather than throwing them.',
}));
const cAssert = code('stock = -4', 'assert stock >= 0, "stock cannot be negative"');
Q('m_assert', mcq({
  t: T, d: 2, c: 'application',
  stem: `A stock program checks with assert that the stock is not negative. What happens when this check runs with a stock of -4?\n\n${F(cAssert)}`,
  opts: [`It raises ${ic(errName(cAssert))} with the message "stock cannot be negative"`, 'It prints "stock cannot be negative" and continues', 'Nothing happens, because the condition is only a comment', 'It raises ValueError'],
  sol: `The condition stock >= 0 is False, so assert raises AssertionError carrying the given message (${pyErr(cAssert)}).`,
}));
Q('m_order', mcq({
  t: T, d: 3, c: 'analysis',
  stem: 'A program has `except ValueError:`, `except ZeroDivisionError:` and `except Exception:` clauses after one try block. Where should `except Exception:` be written, and why?',
  opts: [
    'Last, because Python tries except clauses from top to bottom and Exception would catch everything first',
    'First, because the general handler must always run before the specific ones',
    'Anywhere, because Python picks the most specific handler automatically',
    'It must be in a separate try statement',
  ],
  sol: 'Python checks the except clauses in order and runs the first one that matches. Exception matches almost every error, so placed first it would hide the specific handlers; it belongs at the end as a fallback.',
}));
Q('m_multi_tuple', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'Which header correctly handles **both** ValueError and TypeError in one except clause?',
  opts: [ic('except (ValueError, TypeError):'), ic('except ValueError and TypeError:'), ic('except ValueError, TypeError:'), ic('except [ValueError | TypeError]:')],
  sol: 'Several exception types are grouped in a tuple: except (ValueError, TypeError):. Writing them with and, or without brackets, is not the correct form.',
}));
const cMcqOut = code(
  'items = ["12", "7.5", "nine"]',
  'for s in items:',
  '    try:',
  '        print(int(s) * 2)',
  '    except ValueError:',
  '        print("skip")',
);
Q('m_out_loop', mcq({
  t: T, d: 3, c: 'application',
  stem: `What is the output of this program?\n\n${F(cMcqOut)}`,
  opts: distinct([
    ic(pyOut(cMcqOut).split('\n').join(' / ')),
    ic('24 / 15.0 / skip'),
    ic('24 / 15 / skip'),
    ic('24 / skip'),
  ]),
  sol: 'int("12") is 12, so 24 is printed. int("7.5") raises ValueError (a string with a decimal point is not a valid int literal), and so does int("nine"); each prints skip. The loop continues after every handled exception. (Lines are shown separated by /.)',
}));
const cEof = code('name = input("Name: ")');
Q('m_eof', mcq({
  t: T, d: 3, c: 'understanding',
  stem: `A program is run with its input redirected from an **empty** file, so input() receives nothing at all. Which exception does this statement raise?\n\n${F(cEof)}`,
  opts: distinct([ic(errName(cEof, { stdin: '' })), ic('ValueError'), ic('IOError'), ic('NameError')]),
  sol: `input() hit the end of the input before reading a line, so Python raises EOFError (${pyErr(cEof, { stdin: '' })}).`,
}));
const cImport = code('import mathx');
Q('m_import', mcq({
  t: T, d: 2, c: 'understanding',
  stem: `Which exception does this statement raise, given that no module named mathx exists?\n\n${F(cImport)}`,
  opts: [`${ic(errName(cImport))}, a kind of ImportError`, 'NameError', 'SyntaxError', 'KeyError'],
  sol: `Importing a module that cannot be found raises ModuleNotFoundError, which is a subclass of ImportError (${pyErr(cImport)}).`,
}));
const cOver = code('import math', 'print(math.exp(1000))');
Q('m_overflow', mcq({
  t: T, d: 3, c: 'understanding',
  stem: `A science-club program computes e to the power 1000 with the math module. Which exception does this raise?\n\n${F(cOver)}`,
  opts: distinct([ic(errName(cOver)), ic('ZeroDivisionError'), ic('ValueError'), ic('MemoryError')]),
  sol: `e to the power 1000 is far larger than the biggest float Python can store, so math.exp raises OverflowError (${pyErr(cOver)}).`,
}));
Q('m_after_handled', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'An exception raised in a try block is handled by one of its except blocks. Where does execution continue after that except block (and any finally block)?',
  opts: [
    'With the first statement after the whole try statement',
    'With the statement just after the one that raised the exception',
    'From the beginning of the try block again',
    'Nowhere: the program always stops after an exception',
  ],
  sol: 'The rest of the try block is skipped for good. After the handler (and finally) the program carries on after the whole try statement; it does not return to the failed line.',
}));
Q('m_unhandled', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'A try block raises an exception that **none** of its except clauses matches, and the statement has a finally block. What happens?',
  opts: [
    'The finally block runs, then the program stops with a traceback for that exception',
    'The program stops at once and the finally block is skipped',
    'The first except block runs anyway',
    'The exception is ignored and the program continues',
  ],
  sol: 'finally runs even here; afterwards the exception continues upwards and, with no handler anywhere, Python stops the program and prints the traceback.',
}));
const cMsg = code('try:', '    seats = int("forty")', 'except ValueError as e:', '    print("Problem:", e)');
Q('m_as_e', mcq({
  t: T, d: 3, c: 'application',
  stem: `What does this code print?\n\n${F(cMsg)}`,
  opts: distinct([ic(pyOut(cMsg)), ic('Problem: ValueError'), ic('Problem: e'), ic("Problem: forty")]),
  sol: 'except ValueError as e stores the exception object in e; printing it shows the message Python attached to the error.',
}));
const cCount = code(
  'for n in [5, 0, 2]:',
  '    try:',
  '        print(10 // n)',
  '    except ZeroDivisionError:',
  '        print("zero")',
  '    finally:',
  '        print("next")',
);
Q('m_count_lines', mcq({
  t: T, d: 4, c: 'analysis',
  stem: `How many lines does this program print?\n\n${F(cCount)}`,
  opts: distinct([String(pyOut(cCount).split('\n').length), '3', '5', '4']),
  sol: `Each of the three passes prints one line from the try or the except block and one line from finally, so ${pyOut(cCount).split('\n').length} lines in all: ${pyOut(cCount).split('\n').join(', ')}.`,
}));
Q('m_best_handler', mcq({
  t: T, d: 3, c: 'evaluation',
  stem: 'Meher\'s fee-counter program converts the amount a clerk types with int(). Clerks sometimes type letters by mistake. Which design is best?',
  opts: [
    'Put the conversion in a try block, catch ValueError, show a clear message and ask again',
    'Use a bare except: that silently ignores every error and carries on with amount = 0',
    'Do nothing; a crash shows the clerk that something went wrong',
    'Wrap the whole program in try with an except that restarts the computer',
  ],
  sol: 'Catching the specific exception (ValueError) and re-asking keeps the program running and tells the user what to fix. A silent bare except hides real bugs and records a wrong amount; crashing loses the work in progress.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_syntax', ar({
  t: T, d: 3, c: 'analysis', key: 'a',
  a: 'A syntax error in a program cannot be caught by a try-except written in the same program.',
  r: 'Syntax errors are found while Python parses the program, before any of its statements, including the try statement, are executed.',
  sol: 'Both are true and R explains A: because parsing fails before execution begins, the try statement never gets a chance to run.',
}));
Q('ar_finally', ar({
  t: T, d: 2, c: 'analysis', key: 'a',
  a: 'Statements that release resources, such as closing a file, are often placed in a finally block.',
  r: 'A finally block is executed whether or not an exception occurs in the try block.',
  sol: 'Both are true and R explains A: since finally always runs, clean-up placed there happens even when an error interrupts the try block.',
}));
Q('ar_else', ar({
  t: T, d: 3, c: 'analysis', key: 'd',
  a: 'The else block of a try statement runs even when the try block raises an exception that is handled.',
  r: 'In a try statement, the else clause is written after all the except clauses.',
  sol: 'A is false: else runs only when the try block raises no exception. R is true: the order is try, except clause(s), else, finally.',
}));
Q('ar_generic', ar({
  t: T, d: 3, c: 'analysis', key: 'c',
  a: 'An except clause written as `except Exception:` handles almost every runtime error.',
  r: 'Such a general except clause should be written before the specific except clauses.',
  sol: 'A is true: Exception is the parent of the built-in runtime errors, so it matches almost all of them. R is false: it must come last, or it would catch errors before the specific handlers are reached.',
}));
const cAr = code('x = -2', 'assert x > 0, "x must be positive"');
Q('ar_assert', ar({
  t: T, d: 2, c: 'application', key: 'a',
  pre: `Consider the code:\n\n${F(cAr)}\n\n`,
  a: `Running the code raises ${ic(errName(cAr))}.`,
  r: 'assert raises an exception when the condition after it evaluates to False.',
  sol: `Both are true and R explains A: x > 0 is False for x = -2, so Python raises ${pyErr(cAr)}.`,
}));
Q('ar_int_float', ar({
  t: T, d: 3, c: 'analysis', key: 'b',
  a: `${ic('int("4.5")')} raises ${ic(errName('int("4.5")'))}.`,
  r: `${ic('int(4.5)')} returns ${ic(pyOut('print(int(4.5))'))}.`,
  sol: 'Both are true, but R does not explain A. int() can truncate a float value (R), but a string must contain a whole-number literal; "4.5" does not, so A raises ValueError for a different reason.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_multi_except', tf({
  t: T, d: 1, c: 'recall', ans: true,
  stem: 'True or false? A single try block can be followed by more than one except clause.',
  sol: 'A try statement may have several except clauses, each for a different exception (or group of exceptions); the first matching one runs.',
}));
Q('tf_mod_zero', tf({
  t: T, d: 2, c: 'application', ans: true,
  stem: `True or false? The statement ${ic('print(25 % 0)')} raises ZeroDivisionError, just like ${ic('print(25 / 0)')}.`,
  sol: `Both raise ZeroDivisionError: ${pyErr('print(25 % 0)')} and ${pyErr('print(25 / 0)')}.`,
}));
Q('tf_else_before', tf({
  t: T, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The else clause of a try statement may be written before its except clauses.',
  sol: 'The order is fixed: try, then the except clauses, then else (optional), then finally (optional). Writing else first is a syntax error.',
}));
Q('fb_finally', fb({
  t: T, d: 1, c: 'recall',
  stem: 'The ___ block of a try statement runs whether or not an exception occurs.',
  acc: [['finally']],
  sol: 'The finally block always runs and is used for clean-up work.',
}));
Q('fb_raise', fb({
  t: T, d: 1, c: 'recall',
  stem: 'The ___ statement is used to throw an exception on purpose, for example when a value is out of range.',
  acc: [['raise']],
  sol: 'raise ValueError("...") throws the named exception with a message.',
}));
Q('fb_handler', fb({
  t: T, d: 1, c: 'recall',
  stem: 'The block of code written to deal with an exception, placed under an except clause, is called an exception ___.',
  acc: [['handler']],
  sol: 'Code under an except clause is the exception handler; finding and running it is called catching the exception.',
}));
const mtCodes = ['int("ten")', '[3, 6][2]', '{"a": 1}["b"]', '"5" + 5'];
Q('mt_exceptions', match({
  t: T, d: 2, c: 'application',
  stem: 'Match each expression with the exception it raises when evaluated.',
  pairs: mtCodes.map((c) => [ic(c), ic(errName(c))]),
  sol: `Each was run in Python: ${mtCodes.map((c) => `${c} → ${errName(c)}`).join('; ')}.`,
}));
Q('mt_clauses', match({
  t: T, d: 1, c: 'understanding',
  stem: 'Match each clause of a try statement with what its block contains.',
  pairs: [
    [ic('try'), 'Statements that might raise an exception'],
    [ic('except'), 'Code that handles a particular exception'],
    [ic('else'), 'Code that runs only if no exception occurred'],
    [ic('finally'), 'Clean-up code that runs in every case'],
  ],
  sol: 'try holds the risky code, except the handler, else the follow-up that needs success, and finally the clean-up that must always happen.',
}));
Q('ord_flow', ord({
  t: T, d: 2, c: 'understanding', marks: 1,
  stem: 'A statement inside a try block raises an exception that is caught by one of the except clauses; the try statement also has a finally clause. Arrange the events in the order in which they happen.',
  items: [
    'Statements of the try block run up to the one that fails',
    'Python looks for a matching except clause, from top to bottom',
    'The matching except block runs',
    'The finally block runs',
    'Execution continues after the try statement',
  ],
  sol: 'The failing statement stops the try block; the first matching handler runs; finally always follows; then the program moves past the try statement.',
}));

// ================================================================ code-output (all executed)
Q('co_basic_try', co({
  t: T, d: 1, c: 'understanding', marks: 1, time: 60,
  pre: 'Write the exact output when int() is given the string 12a inside a try block.',
  code: code('try:', '    x = int("12a")', '    print("Converted")', 'except ValueError:', '    print("Not a number")', 'print("Done")'),
  sol: 'int("12a") raises ValueError, so "Converted" is skipped; the handler prints its message and the program continues after the try statement.',
}));
Q('co_else_finally', co({
  t: T, d: 3, c: 'application', marks: 2,
  pre: 'Write the exact output of this loop, which floor-divides 12 by 4, 0 and 3 with else and finally clauses.',
  code: code('for d in [4, 0, 3]:', '    try:', '        r = 12 // d', '    except ZeroDivisionError:', '        print("skip", d)', '    else:', '        print("ok", r)', '    finally:', '        print("--")'),
  sol: 'For 4 and 3 the division succeeds, so else prints ok with 3 and 4; for 0 the handler prints skip 0. finally prints -- after every pass.',
}));
Q('co_order_except', co({
  t: T, d: 2, c: 'understanding', marks: 1, time: 60,
  pre: 'Write the exact output when a list index is out of range and three except clauses are listed.',
  code: code('marks = [40, 55, 61]', 'try:', '    print(marks[1] + marks[3])', 'except ValueError:', '    print("V")', 'except IndexError:', '    print("I")', 'except Exception:', '    print("E")'),
  sol: 'marks[3] is out of range, so IndexError is raised; Python skips the ValueError clause and runs the first clause that matches, the IndexError one. The general clause is never reached.',
}));
Q('co_keyerror', co({
  t: T, d: 2, c: 'application', marks: 2,
  pre: 'Write the exact output of this stock lookup, in which one item is missing from the dictionary.',
  code: code('stock = {"pen": 5, "ink": 2}', 'for item in ["pen", "pad", "ink"]:', '    try:', '        print(item, stock[item])', '    except KeyError:', '        print(item, "missing")'),
  sol: 'pen and ink are keys and are printed with their counts; stock["pad"] raises KeyError, so the handler prints pad missing and the loop goes on.',
}));
Q('co_break_finally', co({
  t: T, d: 4, c: 'analysis', marks: 2,
  pre: 'Write the exact output when break is executed inside a try block that has a finally clause.',
  code: code('for k in range(3):', '    try:', '        if k == 1:', '            break', '        print("body", k)', '    finally:', '        print("finally", k)', 'print("end")'),
  sol: 'In pass 0 the body and finally both print. In pass 1, break leaves the loop, but finally still runs first, printing finally 1. Pass 2 never happens.',
}));
Q('co_raise', co({
  t: T, d: 2, c: 'understanding', marks: 1, time: 60,
  pre: 'Write the exact output when the program raises ValueError for a negative age.',
  code: code('age = -3', 'try:', '    if age < 0:', '        raise ValueError("age cannot be negative")', '    print("Valid")', 'except ValueError as e:', '    print("Error:", e)'),
  sol: 'age is negative, so raise throws ValueError with the given message; "Valid" is skipped and the handler prints the message stored in e.',
}));
Q('co_assert', co({
  t: T, d: 2, c: 'understanding', marks: 1, time: 60,
  pre: 'Write the exact output when an assert on the quantity fails inside a try block.',
  code: code('qty = 0', 'try:', '    assert qty > 0, "quantity must be positive"', '    print("Accepted")', 'except AssertionError as msg:', '    print("Rejected:", msg)'),
  sol: 'qty > 0 is False, so assert raises AssertionError with the message; the handler prints it.',
}));
Q('co_total', co({
  t: T, d: 3, c: 'application', marks: 2,
  pre: 'Write the exact output of this program that totals a mixed list of strings, an int and a float.',
  code: code('items = ["3", 4, "x", 5.5]', 'total = 0', 'for v in items:', '    try:', '        total += int(v)', '    except ValueError:', '        print("bad value", v)', 'print(total)'),
  sol: 'int("3") is 3, int(4) is 4 and int(5.5) truncates to 5; int("x") raises ValueError, which is reported. The total is 3 + 4 + 5 = 12.',
}));
Q('co_nested', co({
  t: T, d: 4, c: 'analysis', marks: 2,
  pre: 'Write the exact output of these nested try statements when the inner block divides by zero.',
  code: code('try:', '    try:', '        n = 10 / 0', '    except TypeError:', '        print("inner")', '    finally:', '        print("inner finally")', 'except ZeroDivisionError:', '    print("outer")'),
  sol: 'The inner try raises ZeroDivisionError, which the inner TypeError clause does not match. The inner finally runs, then the exception passes to the outer try, whose handler matches.',
}));
Q('co_tuple', co({
  t: T, d: 3, c: 'application', marks: 2,
  pre: 'Write the exact output when one except clause handles a tuple of ValueError and TypeError.',
  code: code('data = ["7", "zero", None]', 'for d in data:', '    try:', '        print(10 // int(d))', '    except (ValueError, TypeError):', '        print("cannot use", d)'),
  sol: 'int("7") gives 7 and 10 // 7 is 1. int("zero") raises ValueError and int(None) raises TypeError; both are caught by the single clause with a tuple of exceptions.',
}));
Q('co_counter', co({
  t: T, d: 2, c: 'understanding', marks: 1, time: 60,
  pre: 'Write the exact output of this program that counts valid and invalid temperature readings.',
  code: code('readings = ["21", "x", "25", "", "30"]', 'good = bad = 0', 'for r in readings:', '    try:', '        t = int(r)', '        good += 1', '    except ValueError:', '        bad += 1', 'print(good, bad)'),
  sol: '"21", "25" and "30" convert; "x" and the empty string raise ValueError. So good is 3 and bad is 2.',
}));
Q('co_general_first', co({
  t: T, d: 3, c: 'analysis', marks: 1, time: 60,
  pre: 'Write the exact output when except Exception is written before except IndexError.',
  code: code('try:', '    city = "Agra"', '    print(city[10])', 'except Exception:', '    print("general")', 'except IndexError:', '    print("index")'),
  sol: 'city[10] raises IndexError, but the clauses are tried in order and except Exception matches first, so "general" is printed and the IndexError clause is never used.',
}));
Q('co_else_success', co({
  t: T, d: 2, c: 'understanding', marks: 1, time: 60,
  pre: 'Write the exact output when the conversion in the try block succeeds and else and finally follow.',
  code: code('try:', '    n = int("25")', 'except ValueError:', '    print("bad")', 'else:', '    print("square", n * n)', 'finally:', '    print("checked")'),
  sol: 'The conversion works, so no handler runs; else prints the square and finally prints checked.',
}));
Q('co_retry', co({
  t: T, d: 4, c: 'analysis', marks: 2,
  pre: 'The program below is run and the user types **abc**, then **-5**, then **12** at the three prompts. Write the exact output (prompts included, without the typed text).',
  code: code(
    'while True:',
    '    try:',
    '        n = int(input("Seats: "))',
    '        if n <= 0:',
    '            raise ValueError("must be positive")',
    '        break',
    '    except ValueError as e:',
    '        print("Try again:", e)',
    'print("Booked", n)',
  ),
  run: { stdin: 'abc\n-5\n12\n' },
  sol: 'abc raises ValueError from int(); -5 converts but the program raises ValueError itself; 12 passes both checks, so break ends the loop. Prompts appear on the same line as the following output because the typed text is not echoed.',
}));

// ================================================================ short answers (2 marks), including error-finding
const cErrSyn = code('try:', '    x = 50 / 0', 'print("after")');
const cErrSynFix = code('try:', '    x = 50 / 0', 'except ZeroDivisionError:', '    print("cannot divide by zero")', 'print("after")');
Q('s_err_syntax', short({
  t: T, d: 2, c: 'analysis', marks: 2,
  stem: `Find the error in this code, name the kind of error Python reports, and rewrite it correctly.\n\n${F(cErrSyn)}`,
  model: `Python reports ${ic(pyErr(cErrSyn))}. A **try** block must be followed by at least one **except** (or a finally) clause.\n\n${F(cErrSynFix)}\n\nOutput:\n\n${F(pyOut(cErrSynFix))}`,
  sol: 'Identify the missing except clause (a syntax error, so nothing runs) and add a handler for the division error.',
  scheme: [['Missing except identified as a syntax error', 1], ['Correct except clause added', 1]],
}));
const cErrName = code('try:', '    print(totl)', 'except ZeroDivisionError:', '    print("zero")');
const cErrNameFix = code('total = 0', 'try:', '    print(total)', 'except NameError:', '    print("name not defined")');
Q('s_err_name', short({
  t: T, d: 3, c: 'analysis', marks: 2,
  stem: `This code stops with a traceback even though it has a try statement. Explain why, and correct it.\n\n${F(cErrName)}`,
  model: `The try block raises ${ic(pyErr(cErrName))}, but the only handler is for **ZeroDivisionError**, which does not match, so the exception is unhandled. Define the variable (or fix the spelling) and handle the right exception:\n\n${F(cErrNameFix)}\n\nOutput: ${ic(pyOut(cErrNameFix))}`,
  sol: 'An except clause only catches the exception type it names; the NameError passes through.',
  scheme: [['Reason: handler does not match NameError', 1], ['Correct fix', 1]],
}));
const cErrType = code('score = 90', 'print("Score: " + score)');
const cErrTypeFix = code('score = 90', 'print("Score: " + str(score))');
Q('s_err_type', short({
  t: T, d: 2, c: 'analysis', marks: 2,
  stem: `Name the exception raised by this code, say why it occurs, and correct the code.\n\n${F(cErrType)}`,
  model: `It raises ${ic(pyErr(cErrType))}: the + operator cannot join a string and an integer.\n\n${F(cErrTypeFix)}\n\nOutput: ${ic(pyOut(cErrTypeFix))}`,
  sol: 'TypeError, because the operand types are incompatible; convert with str() (or print the two values separated by a comma).',
  scheme: [['TypeError with reason', 1], ['Correct fix', 1]],
}));
Q('s_syntax_exc', short({
  t: T, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between a syntax error and an exception, with one example of each.',
  model: `1. A **syntax error** breaks the rules of the language and is found while Python **parses** the program, before anything runs, e.g. a missing colon after ${ic('if x > 5')}.\n2. An **exception** occurs **during execution** of a valid program, e.g. ${ic('10 / 0')} raises ZeroDivisionError.`,
  sol: 'Distinguish by when the error is detected (before running versus while running), with one example each.',
  scheme: [['Syntax error with example', 1], ['Exception with example', 1]],
}));
Q('s_else_finally', short({
  t: T, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How is the else clause of a try statement different from its finally clause?',
  model: '1. The **else** block runs **only if** the try block raised **no** exception; it holds work that depends on success.\n2. The **finally** block runs **in every case**, with or without an exception; it holds clean-up work such as closing a file.',
  sol: 'One point on when else runs and one on when finally runs.',
  scheme: [['else: only when no exception', 1], ['finally: always', 1]],
}));
Q('s_why_handle', short({
  t: T, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two advantages of using exception handling in a program.',
  model: '1. The program **does not crash** on a runtime error; it can show a clear message and continue or ask again.\n2. The **error-handling code is kept separate** from the main logic, which makes the program easier to read and maintain.',
  sol: 'Any two: prevents abrupt termination, separates error-handling code, gives meaningful messages, allows recovery and clean-up.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s_raise_assert', short({
  t: T, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Compare the raise and assert statements, giving one line of code for each.',
  model: `1. **raise** throws a chosen exception whenever the program decides to, e.g. ${ic('raise ValueError("marks out of range")')}.\n2. **assert** tests a condition and raises **AssertionError** only if it is False, e.g. ${ic('assert marks >= 0, "negative marks"')}; it is mainly a check during development.`,
  sol: 'raise always throws the named exception when executed; assert throws AssertionError only when its condition fails.',
  scheme: [['raise explained with code', 1], ['assert explained with code', 1]],
}));
Q('s_bare_except', short({
  t: T, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Arnav writes `except:` with no exception name after every try block "to be safe". Is this a good habit? Give two reasons.',
  model: '1. **No.** A bare except catches **every** error, including mistakes such as a misspelt variable (NameError), so real bugs are **hidden**.\n2. The handler cannot give a **specific** message or fix, because it does not know which error happened; naming the expected exception is clearer.',
  sol: 'Judge the habit and support it with two reasons (hides bugs; no specific handling).',
  scheme: [['Judgement with first reason', 1], ['Second reason', 1]],
}));

// ================================================================ short answers (3 marks)
const builtin3 = [
  ['ValueError', 'int("4b")'],
  ['IndexError', 'days = ["Mon", "Tue"]\nprint(days[2])'],
  ['KeyError', 'rates = {"tea": 10}\nprint(rates["coffee"])'],
];
Q('s3_builtin', short({
  t: T, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three built-in exceptions of Python, giving a statement that raises each.',
  model: builtin3.map(([n, c], i) => `${i + 1}. **${n}** — ${n === 'ValueError' ? 'a value of the right type but unsuitable content' : n === 'IndexError' ? 'a sequence index out of range' : 'a dictionary key that does not exist'}:\n\n${F(c)}\n\nraises ${ic(pyErr(c))}`).join('\n\n'),
  sol: 'Any three built-in exceptions, each with its cause and a statement that raises it.',
  scheme: [['First exception with example', 1], ['Second exception with example', 1], ['Third exception with example', 1]],
}));
const cTrace3 = code(
  'vals = ["8", "0", "q"]',
  'for v in vals:',
  '    try:',
  '        r = 40 // int(v)',
  '    except ZeroDivisionError:',
  '        print("Z")',
  '    except ValueError:',
  '        print("V")',
  '    else:',
  '        print(r)',
  '    finally:',
  '        print("*")',
);
Q('s3_trace', short({
  t: T, d: 4, c: 'analysis', marks: 3,
  stem: `Write the output of this program and state, for each value of \`v\`, which blocks were executed.\n\n${F(cTrace3)}`,
  model: `${F(pyOut(cTrace3))}\n\n- "8": try → else → finally.\n- "0": try (division fails) → except ZeroDivisionError → finally.\n- "q": try (int() fails) → except ValueError → finally.`,
  sol: 'One mark for each value: the correct printed lines and the blocks that ran.',
  scheme: [['Value "8" correct', 1], ['Value "0" correct', 1], ['Value "q" correct', 1]],
}));
const cAge = code(
  'try:',
  '    age = int(input("Age: "))',
  '    print("Next year you will be", age + 1)',
  'except ValueError:',
  '    print("Please type the age in digits")',
);
Q('s3_age', short({
  t: T, d: 3, c: 'application', marks: 3,
  stem: 'Write a program that reads a person\'s age and prints their age next year. If the user types something that is not a whole number, print a polite message instead of crashing. Show the output for the inputs **16** and **sixteen**.',
  model: `${F(cAge)}\n\nOutput for 16: ${ic(pyOut(cAge, { stdin: '16\n' }).replace('Age: ', ''))}\n\nOutput for sixteen: ${ic(pyOut(cAge, { stdin: 'sixteen\n' }).replace('Age: ', ''))}`,
  sol: 'Put the conversion in try, catch ValueError, print a message; show both runs.',
  scheme: [['Conversion inside try', 1], ['ValueError handled with a message', 1], ['Correct output for both inputs', 1]],
}));
const cErr3 = code('n = input("Count: ")', 'try', '    each = 600 / int(n)', 'except ValueEror', '    print("bad count")');
const cErr3Fix = code('n = input("Count: ")', 'try:', '    each = 600 / int(n)', 'except ValueError:', '    print("bad count")', 'except ZeroDivisionError:', '    print("count cannot be zero")', 'else:', '    print("Each gets", each)');
Q('s3_err_three', short({
  t: T, d: 4, c: 'analysis', marks: 3,
  stem: `Find and correct the errors in this code. Also make it handle a count of 0 sensibly.\n\n${F(cErr3)}`,
  model: `Python stops at the first problem: ${ic(pyErr(cErr3, { stdin: '4\n' }))}.\n\n1. **try** needs a colon.\n2. **ValueEror** is misspelt (and its header also needs a colon); it must be **ValueError**.\n3. A count of 0 raises ZeroDivisionError, so add a handler for it.\n\n${F(cErr3Fix)}\n\nInput 4 → ${ic(pyOut(cErr3Fix, { stdin: '4\n' }).replace('Count: ', ''))}; input 0 → ${ic(pyOut(cErr3Fix, { stdin: '0\n' }).replace('Count: ', ''))}.`,
  sol: 'One mark each: colons, the exception name, the ZeroDivisionError handler.',
  scheme: [['Missing colons added', 1], ['ValueError spelt correctly', 1], ['ZeroDivisionError handled', 1]],
}));
const cMulti = code(
  'shelf = ["atlas", "dictionary"]',
  'for pos in ["1", "5", "two"]:',
  '    try:',
  '        print(shelf[int(pos)])',
  '    except IndexError:',
  '        print("no book at", pos)',
  '    except ValueError:',
  '        print("not a position:", pos)',
);
Q('s3_multi_except', short({
  t: T, d: 3, c: 'application', marks: 3,
  stem: 'Explain, with a short program and its output, how a try statement with more than one except clause decides which handler to run.',
  model: `Python compares the exception with the except clauses **from top to bottom** and runs the **first** clause that matches; the others are skipped. If none matches, the exception is unhandled.\n\n${F(cMulti)}\n\nOutput:\n\n${F(pyOut(cMulti))}`,
  sol: 'State the top-to-bottom, first-match rule and support it with a program and its correct output.',
  scheme: [['Top-to-bottom, first match rule', 1], ['Program with two or more except clauses', 1], ['Correct output', 1]],
}));
Q('s3_finally_use', short({
  t: T, d: 3, c: 'evaluation', marks: 3,
  stem: 'A program in a school lab switches on a projector, shows slides, and must switch the projector off even if showing the slides fails. Which clause would you use for "switch off", and why? Sketch the structure.',
  model: `Use **finally**: it runs whether the slide show succeeds, fails with a handled error, or fails with an unhandled one, so the projector is always switched off.\n\n${F('projector_on()', 'try:', '    show_slides()', 'except Exception as e:', '    print("Slide error:", e)', 'finally:', '    projector_off()')}`,
  sol: 'Choose finally, justify with "always runs", and place the clean-up there.',
  scheme: [['finally chosen', 1], ['Justification', 1], ['Correct structure', 1]],
}));

// ================================================================ long answers (5 marks)
const cDiv = code(
  'try:',
  '    total = int(input("Total bill: "))',
  '    people = int(input("People: "))',
  '    share = total / people',
  'except ValueError:',
  '    print("Please enter whole numbers only")',
  'except ZeroDivisionError:',
  '    print("Number of people cannot be zero")',
  'else:',
  '    print("Each pays", round(share, 2))',
  'finally:',
  '    print("Thank you")',
);
const runDiv = (inp) => pyOut(cDiv, { stdin: inp }).replace(/Total bill: |People: /g, '');
Q('l_split_bill', long({
  t: T, d: 3, c: 'application', marks: 5,
  stem: 'Write a program that reads a total bill and the number of people and prints each person\'s share. Handle non-numeric input and a count of zero with suitable messages, print the share only when the division succeeds, and always print "Thank you" at the end. Show the output for the inputs (i) 1250 and 4, (ii) 900 and 0, (iii) 900 and five.',
  model: `${F(cDiv)}\n\n(i) 1250, 4:\n\n${F(runDiv('1250\n4\n'))}\n\n(ii) 900, 0:\n\n${F(runDiv('900\n0\n'))}\n\n(iii) 900, five:\n\n${F(runDiv('900\nfive\n'))}`,
  sol: 'Conversions and division in try; separate handlers for ValueError and ZeroDivisionError; the result in else; the closing message in finally; three correct runs.',
  scheme: [['Input and division inside try', 1], ['ValueError handled', 1], ['ZeroDivisionError handled', 1], ['else and finally used correctly', 1], ['Correct output for the three runs', 1]],
}));
const cMarks = code(
  'marks = []',
  'while len(marks) < 3:',
  '    entry = input("Mark: ")',
  '    try:',
  '        m = int(entry)',
  '        if m < 0 or m > 100:',
  '            raise ValueError("out of range")',
  '    except ValueError as e:',
  '        print("Rejected", entry, "-", e)',
  '    else:',
  '        marks.append(m)',
  'print("Marks:", marks)',
  'print("Average:", sum(marks) / len(marks))',
);
const marksIn = '78\nseventy\n104\n65\n90\n';
Q('l_marks_entry', long({
  t: T, d: 4, c: 'application', marks: 5,
  stem: 'Write a program that keeps reading marks until three **valid** marks (whole numbers from 0 to 100) have been entered, then prints the list and the average. Use raise for marks outside the range and handle all invalid entries with one except clause. Show the output when the user types 78, seventy, 104, 65 and 90 in turn.',
  model: `${F(cMarks)}\n\nOutput for the given entries:\n\n${F(pyOut(cMarks, { stdin: marksIn }).replace(/Mark: /g, ''))}\n\nint() raises ValueError for "seventy"; the program itself raises ValueError for 104, so both are handled by the same clause and the loop asks again.`,
  sol: 'Loop until three valid marks; int() and a range check with raise inside try; one ValueError handler printing the reason; append in else; correct output.',
  scheme: [['Loop until three valid marks', 1], ['Conversion in try', 1], ['raise for out-of-range values', 1], ['Handler and append in else', 1], ['Correct output', 1]],
}));
Q('l_explain_try', long({
  t: T, d: 2, c: 'understanding', marks: 5, wl: [100, 150],
  stem: 'Explain the four clauses of a complete try statement (try, except, else, finally). Describe the order in which they execute when (a) no exception occurs and (b) a handled exception occurs.',
  model: '1. **try** holds the statements that may raise an exception. It always starts, and it stops at the first statement that fails.\n2. **except** (one or more clauses) holds the handler for a named exception. Python checks the clauses from top to bottom and runs only the first one that matches.\n3. **else** holds code that should run only if the try block raised **no** exception, such as using a value that was read successfully.\n4. **finally** holds clean-up code, such as closing a file, that runs **in every case**, even when the error is not handled.\n5. **(a) No exception:** the whole try block → else → finally → the next statement after the try statement. **(b) Handled exception:** the try block up to the failing statement → the matching except block → finally → the next statement; the rest of the try block and the else block are skipped, and the program never returns to the failed line.',
  sol: 'One mark for each clause and one for the two execution orders.',
  scheme: [['try', 1], ['except', 1], ['else', 1], ['finally', 1], ['Both execution orders', 1]],
}));
const cBank = code(
  'balance = 2000',
  'try:',
  '    amount = int(input("Withdraw: "))',
  '    if amount <= 0:',
  '        raise ValueError("amount must be positive")',
  '    if amount > balance:',
  '        raise ValueError("insufficient balance")',
  '    balance -= amount',
  '    print("Collect", amount)',
  'except ValueError as e:',
  '    print("Transaction failed:", e)',
  'finally:',
  '    print("Balance:", balance)',
);
const runBank = (inp) => pyOut(cBank, { stdin: inp }).replace('Withdraw: ', '');
Q('l_atm', long({
  t: T, d: 3, c: 'application', marks: 5,
  stem: 'A practice ATM program for a school project holds a balance of ₹2000. Write a program that reads an amount to withdraw and uses raise for a zero or negative amount and for an amount larger than the balance. Handle these and non-numeric input with an except clause that prints the reason, and always print the balance at the end. Show the output for 500, 2500 and abc.',
  model: `${F(cBank)}\n\n- 500 →\n\n${F(runBank('500\n'))}\n\n- 2500 →\n\n${F(runBank('2500\n'))}\n\n- abc →\n\n${F(runBank('abc\n'))}`,
  sol: 'Read and convert in try; two raise checks; one handler printing the message; balance printed in finally; three correct runs.',
  scheme: [['Input converted inside try', 1], ['raise for non-positive amount', 1], ['raise for amount above balance', 1], ['Handler prints reason; finally prints balance', 1], ['Correct output for the three runs', 1]],
}));
Q('l_errors_types', long({
  t: T, d: 3, c: 'analysis', marks: 5, wl: [100, 150],
  stem: 'Distinguish between syntax errors and exceptions. Describe any three built-in exceptions with a statement that raises each, and explain why a syntax error cannot be handled with try-except.',
  model: `1. A **syntax error** breaks the grammar of Python, for example a missing colon or an unclosed bracket. It is found during **parsing**, before execution, so no statement of the program runs. An **exception** occurs **while** a grammatically valid program is running, when a statement cannot be carried out.\n2. ${ic('int("4.5")')} raises **${errName('int("4.5")')}**: the argument is a string, the right type, but its content is not a whole number.\n3. ${ic('[2, 4][5]')} raises **${errName('x = [2, 4][5]')}**: the list has only positions 0 and 1, so position 5 is out of range.\n4. ${ic('7 / 0')} raises **${errName('x = 7 / 0')}**: no number can be divided by zero.\n5. A try statement can handle only errors that are raised **while it runs**. A syntax error stops Python before any statement, including the try statement itself, is executed, so there is nothing that could catch it; the program must be corrected first.`,
  sol: 'Difference, three exceptions with examples, and the reason syntax errors cannot be caught.',
  scheme: [['Difference between the two', 1], ['First exception', 1], ['Second exception', 1], ['Third exception', 1], ['Why syntax errors cannot be handled', 1]],
}));
const cRetry = code(
  'attempts = 0',
  'while attempts < 3:',
  '    attempts += 1',
  '    try:',
  '        code = int(input("OTP: "))',
  '        assert 1000 <= code <= 9999, "OTP must have 4 digits"',
  '    except ValueError:',
  '        print("Digits only")',
  '    except AssertionError as e:',
  '        print(e)',
  '    else:',
  '        print("OTP accepted")',
  '        break',
  'else:',
  '    print("Too many attempts")',
);
Q('l_otp', long({
  t: T, d: 4, c: 'analysis', marks: 5,
  stem: 'Write a program that gives a user three attempts to type a 4-digit OTP. Use assert to check that the number has four digits, handle non-numeric entries and failed assertions separately, and print "Too many attempts" if all three attempts fail. Show the output for the entries 12a4, 987, 4521, and for the entries x, 12, 123456.',
  model: `${F(cRetry)}\n\nEntries 12a4, 987, 4521:\n\n${F(pyOut(cRetry, { stdin: '12a4\n987\n4521\n' }).replace(/OTP: /g, ''))}\n\nEntries x, 12, 123456:\n\n${F(pyOut(cRetry, { stdin: 'x\n12\n123456\n' }).replace(/OTP: /g, ''))}\n\nThe loop's else runs only when the loop ends without break, that is, when no attempt succeeded.`,
  sol: 'Counted loop of three; int() and assert inside try; separate handlers; break on success; loop-else (or a flag) for the failure message; both runs correct.',
  scheme: [['Three-attempt loop', 1], ['int() and assert in try', 1], ['Separate ValueError and AssertionError handlers', 1], ['Success breaks; failure message after three', 1], ['Correct output for both runs', 1]],
}));

// ================================================================ case-based
const cTicket = code(
  'seats = ["A1", "A2", "A3", "A4"]',
  'booked = []',
  'for req in ["2", "7", "x", "2"]:',
  '    try:',
  '        s = seats[int(req) - 1]',
  '        if s in booked:',
  '            raise ValueError(s + " already booked")',
  '        booked.append(s)',
  '    except IndexError:',
  '        print("No seat", req)',
  '    except ValueError as e:',
  '        print("Error:", e)',
  'print(booked)',
);
Q('cb_ticket', caseQ({
  t: T, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the seat-booking program for the Kalaghar auditorium and answer the questions. *(Imagined auditorium and requests, written by SOYL for practice.)*',
  passage: `Students of a Pune school are writing a seat-booking program for the Kalaghar auditorium's annual day. Each request is a seat number typed by a parent. The program below processes four requests.\n\n${F(cTicket)}`,
  parts: [
    child('a', mcq({ t: T, d: 3, c: 'application', fixed: true, key: 'b', stem: 'What is the last line printed by the program?', opts: [ic("['A2', 'A2']"), ic(pyOut(cTicket).split('\n').pop()), ic("['A2', 'A7']"), ic('[]')], sol: 'Only the first request ("2", seat A2) succeeds; "7" is out of range, "x" is not a number and the second "2" is already booked, so the list holds one seat.' })),
    child('b', fb({ t: T, d: 2, c: 'application', stem: 'The request "x" is handled by the except clause for ___.', acc: [['ValueError']], sol: 'int("x") raises ValueError, so the ValueError handler runs and prints the error message.' })),
    child('c', short({ t: T, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The request "7" prints a message although no exception is written for it by the students. Which exception is raised, by which part of the code, and why?', model: `${ic('seats[int(req) - 1]')} becomes seats[6]; the list has only indexes 0 to 3, so Python raises **IndexError**, which the first except clause handles (output line: ${ic(pyOut(cTicket).split('\n')[0])}).`, sol: 'Name IndexError raised by the list indexing, with the reason (index 6 out of range).', scheme: [['IndexError named', 1], ['Reason linked to the index', 1]] }), [
      short({ t: T, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Add a finally clause so that the number of booked seats is printed after every request. Write only the lines to add.', model: F('    finally:', '        print("Seats booked:", len(booked))'), sol: 'A finally clause at the same indentation as the except clauses, printing len(booked).', scheme: [['finally at the correct indentation', 1], ['Correct print statement', 1]] }),
    ]),
  ],
}));
const cAttend = code(
  'records = {"Anu": (18, 20), "Bilal": (0, 0), "Chen": ("19", 20)}',
  'for name in records:',
  '    present, held = records[name]',
  '    try:',
  '        pct = present / held * 100',
  '    except ZeroDivisionError:',
  '        print(name, ": no classes held")',
  '    except TypeError:',
  '        print(name, ": bad record")',
  '    else:',
  '        print(name, ":", pct)',
);
Q('cb_attendance', caseQ({
  t: T, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the attendance program at Neelgiri Public School and answer the questions. *(Imagined school and records, written by SOYL for practice.)*',
  passage: `The class monitor at Neelgiri Public School keeps attendance as (days present, days held) for each student and computes the percentage.\n\n${F(cAttend)}`,
  parts: [
    child('a', mcq({ t: T, d: 2, c: 'application', fixed: true, key: 'c', stem: 'What is printed for Anu?', opts: [ic('Anu : 90'), ic('Anu : 0.9'), ic(pyOut(cAttend).split('\n')[0]), ic('Anu : no classes held')], sol: '18 / 20 * 100 is 90.0; true division gives a float, so the value prints as 90.0.' })),
    child('b', mcq({ t: T, d: 3, c: 'analysis', fixed: true, key: 'a', stem: 'Which handler runs for Chen, and why?', opts: ['The TypeError handler, because a string cannot be divided by an integer', 'The ZeroDivisionError handler, because Chen\'s record is empty', 'No handler; the percentage is printed', 'The ValueError handler, because "19" is a string'], sol: `"19" / 20 is a string divided by an int, which raises ${pyErr('print("19" / 20)')}; the program has no ValueError handler at all.` })),
    child('c', short({ t: T, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Bilal\'s record (0, 0) gives "no classes held". Is it better to print a message here or to record his attendance as 0 per cent? Justify.', model: 'Printing a message is better: with **no classes held**, a percentage has no meaning; recording 0 per cent would wrongly suggest that he was absent from every class and could lower his record unfairly.', sol: 'A justified judgement: division by zero signals missing data, not zero attendance.', scheme: [['Judgement', 1], ['Justification', 1]] }), [
      short({ t: T, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Rewrite the else block so that the percentage is shown rounded to one decimal place followed by a per cent sign, as in "Anu : 90.0 %".', model: F('    else:', '        print(name, ":", round(pct, 1), "%")'), sol: 'Use round(pct, 1) and print the % sign as a separate string.', scheme: [['round() to one place', 1], ['Correct print with the sign', 1]] }),
    ]),
  ],
}));
const cQuiz = code(
  'answers = {"Q1": "b", "Q2": "d", "Q3": "a"}',
  'given = {"Q1": "b", "Q3": "c", "Q4": "a"}',
  'score = 0',
  'for q in given:',
  '    try:',
  '        if given[q] == answers[q]:',
  '            score += 4',
  '        else:',
  '            score -= 1',
  '    except KeyError:',
  '        print("No such question:", q)',
  'print("Score:", score)',
);
Q('cb_quiz', caseQ({
  t: T, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the quiz-scoring program of the Brahmaputra Science Club and answer the questions. *(Imagined club and answers, written by SOYL for practice.)*',
  passage: `The Brahmaputra Science Club scores its online quiz with +4 for a correct answer and −1 for a wrong one. The answer key and one participant's responses are stored in dictionaries.\n\n${F(cQuiz)}`,
  parts: [
    child('a', mcq({ t: T, d: 3, c: 'application', fixed: true, key: 'd', stem: 'What is the last line printed?', opts: [ic('Score: 8'), ic('Score: 7'), ic('Score: 4'), ic(pyOut(cQuiz).split('\n').pop())], sol: 'Q1 is correct (+4), Q3 is wrong (−1) and Q4 is not in the key, so it is skipped with a message: 4 − 1 = 3.' })),
    child('b', tf({ t: T, d: 2, c: 'understanding', ans: true, stem: 'True or false? The KeyError for Q4 is raised by the expression `answers[q]`, not by `given[q]`.', sol: 'q comes from given, so given[q] always exists; Q4 is missing from answers, so answers[q] raises KeyError.' })),
    child('c', short({ t: T, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Rewrite the comparison using the dictionary method get() so that no exception can occur and an unknown question simply scores 0.', model: F('    key = answers.get(q)', '    if key is None:', '        continue', '    if given[q] == key:', '        score += 4', '    else:', '        score -= 1'), sol: 'get() returns None for a missing key; skip such questions without changing the score.', scheme: [['get() used', 1], ['Unknown question scores 0', 1]] }), [
      short({ t: T, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The club wants the program to stop completely if the answer key itself is empty. Write one statement, placed before the loop, that does this with assert.', model: F('assert len(answers) > 0, "answer key is empty"'), sol: 'An assert on the size of answers with a message; it raises AssertionError and stops the program when the key is empty.', scheme: [['assert with correct condition', 1], ['Message included', 1]] }),
    ]),
  ],
}));
