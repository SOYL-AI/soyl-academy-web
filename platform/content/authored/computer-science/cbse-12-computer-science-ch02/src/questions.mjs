// CBSE 12 Computer Science, ch02 Functions — question bank. Every program, scenario and data value is written by
// SOYL (imagined people, shops and schools); no textbook, NCERT or board-paper program is reused (D-036).
// Every output stated anywhere in an item (code-output keys, MCQ options, solutions, model answers) is produced by
// running the code with Python 3 through runPy()/pyOut()/pyErr() in lib.mjs; nothing is typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

const S2 = [25, 50];
const S3 = [40, 75];
/** A Python code fence for stems, passages and model answers. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
export const code = (...lines) => lines.join('\n');
/** Inline code for options (single line only). */
export const ic = (s) => '`' + s + '`';
const outIc = (c, opts) => ic(pyOut(c, opts));
/** Output with line breaks shown as " / " so it fits in an option. */
const outLine = (c, opts) => ic(pyOut(c, opts).split('\n').join(' / '));
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
const expect = (actual, expected, what) => {
  if (actual !== expected) throw new Error(`${what}: Python printed ${JSON.stringify(actual)}, the text assumes ${JSON.stringify(expected)}`);
  return actual;
};

// ================================================================ t01 Types of functions; defining and calling
Q('m_types', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of these is a **built-in** function that can be used without importing any module?',
  opts: [ic('len()'), ic('sqrt()'), ic('mean()'), ic('randint()')],
  sol: 'len() is always available. sqrt() lives in the math module, mean() in the statistics module and randint() in the random module, so each needs an import first.',
}));
Q('m_module_of', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Tanvi wants the median of a list of bus delays in minutes. Which statement gives her the right function?',
  opts: [ic('from statistics import median'), ic('from math import median'), ic('import random.median'), ic('from builtins import median')],
  sol: 'median() (with mean() and mode()) belongs to the statistics module. The math module has numeric functions such as sqrt(), ceil() and floor(); random has random(), randint() and randrange().',
}));
const cMath = code('import math', 'print(math.ceil(4.2), math.floor(-4.2), math.sqrt(49))');
Q('m_math', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `A geometry helper rounds a length both ways and takes a square root. What does it print?\n\n${F(cMath)}`,
  opts: distinct([outIc(cMath), ic('5 -4 7'), ic('4 -5 7.0'), ic('5 -4 7.0')]),
  sol: 'ceil() rounds up, so 4.2 becomes 5; floor() rounds down, so -4.2 becomes -5 (down means towards minus infinity). sqrt() always returns a float, 7.0.',
}));
Q('m_header', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which line is a correct **function header** in Python?',
  opts: [ic('def total(a, b):'), ic('def total(a, b)'), ic('function total(a, b):'), ic('def total[a, b]:')],
  sol: 'A header starts with the keyword def, then the function name, the parameters in round brackets and a colon. The body below it is indented.',
}));
const cNoReturn = code('def greet(name):', '    print("Hello", name)', '', 'x = greet("Zoya")', 'print(x)');
Q('m_none_return', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `A greeting function has no return statement, and its call is stored in x. Predict the output.\n\n${F(cNoReturn)}`,
  opts: distinct([outLine(cNoReturn), ic('Hello Zoya'), ic('Hello Zoya / Hello Zoya'), ic('Zoya / None')]),
  sol: 'Calling greet() prints the greeting. The function has no return statement, so it returns None, which is stored in x and then printed. (Lines are separated by " / " in the options.)',
}));
const cDefOrder = code('print(square(5))', '', 'def square(n):', '    return n * n');
Q('m_define_first', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Here the function square() is called on the line above its def. What happens when this program runs?\n\n${F(cDefOrder)}`,
  opts: [`It stops with ${ic(pyErr(cDefOrder))}`, `It prints ${ic('25')}`, `It prints ${ic('None')}`, 'It stops with a SyntaxError'],
  sol: 'Python runs a program from the top. The call on the first line comes before the def statement has been executed, so the name square does not exist yet and a NameError is raised. A function must be defined before it is called.',
}));
Q('m_parts', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In `def area(l, w):`, what are `l` and `w` called?',
  opts: ['Parameters (formal parameters)', 'Arguments (actual parameters)', 'Return values', 'Global variables'],
  sol: 'Names inside the brackets of a def header are parameters (formal parameters). The values passed in a call, such as area(6, 4), are arguments (actual parameters).',
}));
const cRandRange = code('import random', 'random.seed(7)', 'vals = [random.randint(3, 6) for i in range(200)]', 'print(min(vals), max(vals))');
Q('m_randint', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Which values can `random.randint(3, 6)` return?',
  opts: ['3, 4, 5 or 6', '3, 4 or 5 only', '4 or 5 only', 'Any decimal number from 3 up to 6'],
  sol: `randint(a, b) includes both ends, so it returns one of 3, 4, 5 and 6. (200 calls run during the build gave a smallest value of ${pyOut(cRandRange).split(' ')[0]} and a largest of ${pyOut(cRandRange).split(' ')[1]}.) randrange(3, 6) would exclude 6, and random() gives a float between 0 and 1.`,
}));
const cRandrange = code('import random', 'random.seed(3)', 'vals = {random.randrange(10, 30, 5) for i in range(300)}', 'print(sorted(vals))');
Q('m_randrange', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Which list contains **every** value that `random.randrange(10, 30, 5)` can return?',
  opts: distinct([outIc(cRandrange), ic('[10, 15, 20, 25, 30]'), ic('[15, 20, 25]'), ic('[10, 20, 30]')]),
  sol: 'randrange(start, stop, step) chooses from range(10, 30, 5), which is 10, 15, 20 and 25: the stop value 30 is excluded. (300 calls run during the build produced exactly these four values.)',
}));
Q('ar_builtin', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'The statement `print(math.pi)` raises an error if the program has not imported the math module.',
  r: 'Functions and constants of a module become available only after the module is imported.',
  sol: `Both are true and R explains A. Without an import Python reports ${ic(pyErr('print(math.pi)'))}.`,
}));
Q('ar_return_print', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'A function that prints a value and a function that returns the same value behave identically when the result is used in an expression.',
  r: 'A return statement sends a value back to the place where the function was called.',
  sol: 'A is false: a function that only prints returns None, so using its result in an expression (for example adding 1) fails or gives None. R is true: return passes the value back to the caller.',
}));
Q('tf_multi_return', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A Python function can contain only one `return` statement.',
  sol: 'A function may have several return statements, for example one in each branch of an if-else; the first one that runs ends the function.',
}));
Q('fb_def', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A user-defined function in Python is created with the keyword ___.',
  acc: [['def']],
  sol: 'The def keyword starts a function definition.',
}));
Q('mt_modules', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each function used in a sports-day results program with the module it belongs to.',
  pairs: [
    [ic('sqrt()'), ic('math')],
    [ic('mode()'), ic('statistics')],
    [ic('randrange()'), ic('random')],
    [ic('max()'), 'built-in (no import needed)'],
  ],
  sol: 'sqrt() is in math, mode() in statistics and randrange() in random; max() is built in.',
}));
const cCo1 = code('def bonus(sales):', '    if sales > 50000:', '        return sales * 0.05', '    return 500', '', 'print(bonus(80000), bonus(20000))');
Q('co_bonus', co({
  pre: "A sales-bonus function has two return statements. Write the exact output of the program.",
  t: 1, d: 2, c: 'understanding', marks: 1, time: 60,
  code: cCo1,
  sol: '80000 is above 50000, so the first return gives 80000 × 0.05 = 4000.0 (a float, because 0.05 is a float). 20000 skips the if, so the second return gives 500.',
}));
const cCo2 = code('def show(n):', '    for i in range(1, n + 1):', '        print(i * "*")', '    return n * 2', '', 'k = show(3)', 'print(k)');
Q('co_show', co({
  pre: "A star-pattern function prints inside a loop and then returns a value. Write the exact output of the program.",
  t: 1, d: 2, c: 'understanding', marks: 2,
  code: cCo2,
  sol: 'The loop prints 1, 2 and 3 stars on separate lines. Then the function returns 3 * 2 = 6, which is stored in k and printed.',
}));
const cCoStats = code('import statistics', 'runs = [12, 45, 7, 45, 30]', 'print(statistics.mean(runs), statistics.median(runs), statistics.mode(runs))');
Q('co_stats', co({
  pre: "A cricket coach summarises five innings with the statistics module. Write the exact output of the program.",
  t: 1, d: 2, c: 'understanding', marks: 2,
  code: cCoStats,
  sol: 'Mean = (12 + 45 + 7 + 45 + 30) ÷ 5 = 139 ÷ 5 = 27.8. Sorted, the runs are 7, 12, 30, 45, 45, so the median (middle value) is 30. 45 occurs twice, so the mode is 45.',
}));
Q('s_builtin_udf', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between a built-in function and a user-defined function, with one example of each.',
  model: '1. A **built-in function** is part of Python and can be called directly, e.g. `len("Pune")`.\n2. A **user-defined function** is written by the programmer with `def`, e.g. `def area(r): return 3.14 * r * r`, and is called by its name after it is defined.',
  sol: 'One mark for each kind with a correct example.',
  scheme: [['Built-in function with an example', 1], ['User-defined function with an example', 1]],
}));
const cErrDef = code('def discount(price)', '    if price > 1000:', '        return price * 0.9', '    else', '        return price', 'print(discount(1500))');
const cErrDefFix = code('def discount(price):', '    if price > 1000:', '        return price * 0.9', '    else:', '        return price', 'print(discount(1500))');
Q('s_err_def', short({
  t: 1, d: 2, c: 'analysis', marks: 2,
  stem: `Kabir's function should give a 10 per cent discount on bills above ₹1000, but the program will not run. Find the errors and rewrite the code correctly.\n\n${F(cErrDef)}`,
  model: `Both the def header and else need a **colon**; without it Python reports ${ic(pyErr(cErrDef))}.\n\n${F(cErrDefFix)}\n\nOutput: ${ic(pyOut(cErrDefFix))}`,
  sol: 'One mark for each missing colon found and corrected.',
  scheme: [['Colon after the def header', 1], ['Colon after else', 1]],
}));
const cImportStyles = code('import math', 'from math import floor', 'print(math.floor(7.8), floor(7.8))');
Q('s_import_ways', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the difference between `import math` and `from math import floor`, with the way `floor()` is called in each case.',
  model: `1. \`import math\` brings in the whole module; its functions are called with the module name: \`math.floor(7.8)\`.\n2. \`from math import floor\` brings in only floor(), which is then called directly: \`floor(7.8)\`.\n\n${F(cImportStyles)}\n\nOutput: ${ic(pyOut(cImportStyles))}`,
  sol: 'Whole module with the dot notation versus a single name used directly.',
  scheme: [['import math with dot notation', 1], ['from-import with direct call', 1]],
}));
const cCelsius = code(
  'def to_fahrenheit(c):',
  '    return c * 9 / 5 + 32',
  '',
  'temps = [int(t) for t in input("Temperatures: ").split()]',
  'for t in temps:',
  '    print(t, "C =", to_fahrenheit(t), "F")',
);
Q('l_fahrenheit', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Write a function `to_fahrenheit(c)` that returns the Fahrenheit value of a Celsius temperature (F = C × 9 / 5 + 32). Use it in a program that reads temperatures on one line and prints each one in both scales. Show the output for the input `25 40 -5`.',
  model: `${F(cCelsius)}\n\nOutput:\n\n${F(pyOut(cCelsius, { stdin: '25 40 -5\n' }).replace('Temperatures: ', ''))}`,
  sol: 'A function with one parameter that returns the converted value, called once for each value read.',
  scheme: [['Function header with a parameter', 1], ['Correct formula returned', 1], ['Input read and converted', 1], ['Function called in a loop', 1], ['Correct output', 1]],
}));
const cPrime = code(
  'def is_prime(n):',
  '    if n < 2:',
  '        return False',
  '    for d in range(2, int(n ** 0.5) + 1):',
  '        if n % d == 0:',
  '            return False',
  '    return True',
  '',
  'lo, hi = map(int, input("Range: ").split())',
  'found = [k for k in range(lo, hi + 1) if is_prime(k)]',
  'print("Primes:", found)',
  'print("Count:", len(found))',
);
Q('l_primes', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: 'Write a function `is_prime(n)` that returns True if n is a prime number and False otherwise. Use it to print all primes between two numbers entered on one line, and how many there are. Show the output for the input `20 50`.',
  model: `${F(cPrime)}\n\nOutput:\n\n${F(pyOut(cPrime, { stdin: '20 50\n' }).replace('Range: ', ''))}\n\nTesting divisors up to n − 1 instead of the square root, or a plain loop with append() instead of the list comprehension, earns full marks.`,
  sol: 'Return False early for n below 2 or when a divisor is found; return True only after the loop. Call the function for each number in the range.',
  scheme: [['Function header and the n < 2 case', 1], ['Divisor loop with early return False', 1], ['return True after the loop', 1], ['Calling it over the range and counting', 1], ['Correct output', 1]],
}));

// ================================================================ t02 Arguments and parameters
const cDefault = code('def ticket(age, fare=120):', '    if age < 12:', '        fare = fare // 2', '    return fare', '', 'print(ticket(10), ticket(30), ticket(8, 200))');
Q('m_default', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A bus company uses this function. What is printed?\n\n${F(cDefault)}`,
  opts: distinct([outIc(cDefault), ic('120 120 200'), ic('60 120 200'), ic('60 60 100')]),
  sol: 'ticket(10) uses the default fare 120 and halves it to 60 (age below 12). ticket(30) keeps 120. ticket(8, 200) overrides the default with 200 and halves it to 100.',
}));
Q('m_default_order', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which function header is **invalid** in Python?',
  opts: [ic('def bill(rate=5, qty):'), ic('def bill(qty, rate=5):'), ic('def bill(qty=1, rate=5):'), ic('def bill(qty, rate):')],
  sol: `A parameter with a default value cannot be followed by one without a default. Python rejects the first header with ${ic(pyErr('def bill(rate=5, qty):\n    pass'))}.`,
}));
const cKeyword = code('def describe(name, city, age):', '    print(name, "|", city, "|", age)', '', 'describe(age=17, name="Ira", city="Shillong")');
Q('m_keyword', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A profile function is called with all three keyword arguments out of order. What is printed?\n\n${F(cKeyword)}`,
  opts: distinct([outIc(cKeyword), ic('17 | Ira | Shillong'), ic('age | name | city'), 'An error, because the arguments are out of order']),
  sol: 'Keyword arguments are matched to parameters by name, not by position, so the order in the call does not matter. The function prints the values in the order of its own parameters.',
}));
const cPosKw = code('def area(l, w=2):', '    return l * w', '', 'print(area(5, w=3))', 'print(area(w=4, l=6))', 'print(area(7))');
Q('m_pos_kw', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The function area() has a default width and is called three ways. Which option shows the three printed values, in order?\n\n${F(cPosKw)}`,
  opts: distinct([outLine(cPosKw), ic('15 / 24 / 7'), ic('10 / 24 / 14'), ic('15 / 12 / 14')]),
  sol: 'area(5, w=3) is 5 × 3 = 15; area(w=4, l=6) is 6 × 4 = 24; area(7) uses the default w = 2, giving 14.',
}));
const cKwBeforePos = code('def area(l, w):', '    return l * w', '', 'print(area(l=5, 3))');
Q('m_kw_before_pos', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `In this call of area(), a keyword argument is written before a positional one. Why does the program fail to run?\n\n${F(cKwBeforePos)}`,
  opts: [
    'A positional argument cannot come after a keyword argument in a call',
    'Keyword arguments are not allowed for functions with two parameters',
    'The function has no default values',
    'The parameter names l and w are reserved words',
  ],
  sol: `Positional arguments must come first in a call. Python reports ${ic(pyErr(cKwBeforePos))}. area(5, w=3) or area(l=5, w=3) would work.`,
}));
const cTupleRet = code('def stats(marks):', '    return max(marks), min(marks), sum(marks) / len(marks)', '', 'r = stats([60, 90, 75])', 'print(type(r).__name__, r)');
Q('m_tuple_return', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `A marks function returns the highest, the lowest and the average together. What is printed?\n\n${F(cTupleRet)}`,
  opts: distinct([outIc(cTupleRet), ic('list [90, 60, 75.0]'), ic('tuple (90, 60, 75)'), ic('int 90')]),
  sol: 'Values separated by commas after return are packed into one tuple. The average 225 ÷ 3 uses true division, so it is the float 75.0.',
}));
const cUnpack = code('def split_time(minutes):', '    return minutes // 60, minutes % 60', '', 'h, m = split_time(135)', 'print(h, "h", m, "min")');
Q('m_unpack', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A function splits 135 minutes into hours and minutes, and the result is unpacked. What is printed?\n\n${F(cUnpack)}`,
  opts: distinct([outIc(cUnpack), ic('2.25 h 15 min'), ic('(2, 15) h min'), ic('135 h 0 min')]),
  sol: '135 // 60 = 2 and 135 % 60 = 15. The returned tuple (2, 15) is unpacked into h and m.',
}));
const cArgCount = code('def add(a, b):', '    return a + b', '', 'print(add(4))');
Q('ar_args', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'Calling `add(4)` for the function `def add(a, b): return a + b` raises an error.',
  r: 'Every parameter without a default value must receive an argument when the function is called.',
  sol: `Both are true and R explains A. Python reports ${ic(pyErr(cArgCount))}.`,
}));
Q('ar_default_eval', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'A function may have both parameters with default values and parameters without them.',
  r: 'Keyword arguments allow the arguments of a call to be given in any order.',
  sol: 'Both statements are true, but R does not explain A. A is about defining parameters (defaults must come after non-defaults); R is about how arguments are matched in a call.',
}));
Q('tf_default_skip', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An argument for a parameter that has a default value may be left out of the function call.',
  sol: 'If the argument is left out, the parameter takes its default value.',
}));
Q('fb_formal', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The values given in a function call, such as 6 and 4 in `area(6, 4)`, are called actual parameters or ___.',
  acc: [['arguments', 'argument']],
  sol: 'Values passed in a call are arguments (actual parameters); names in the def header are parameters (formal parameters).',
}));
Q('mt_arg_kinds', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each call of `def order(item, qty=1, gift=False)` with the kind of argument passing it shows.',
  pairs: [
    [ic('order("pen", 3)'), 'Positional arguments only'],
    [ic('order("pen")'), 'Default values used for qty and gift'],
    [ic('order(qty=2, item="ink")'), 'Keyword arguments in a different order'],
    [ic('order("pad", 2, gift=True)'), 'Positional and keyword arguments mixed'],
  ],
  sol: 'Positional arguments match by position, defaults fill in what is missing, keyword arguments match by name, and positional ones may be followed by keyword ones.',
}));
const cCoDefault = code('def label(text, width=10, fill="."):', '    return text + fill * (width - len(text))', '', 'print(label("Tea"))', 'print(label("Coffee", 8))', 'print(label("Milk", fill="-"))');
Q('co_label', co({
  pre: "A menu-board function pads item names using default parameters. Write the exact output of the program.",
  t: 2, d: 3, c: 'application', marks: 2,
  code: cCoDefault,
  sol: 'label("Tea") pads to width 10 with dots: 3 letters + 7 dots. label("Coffee", 8) pads to 8: 6 letters + 2 dots. label("Milk", fill="-") keeps width 10 but uses dashes: 4 letters + 6 dashes.',
}));
const cCoSwap = code('def order_pair(a, b):', '    if a > b:', '        return b, a', '    return a, b', '', 'x, y = order_pair(9, 4)', 'p = order_pair(2, 7)', 'print(x, y, p)');
Q('co_swap', co({
  pre: "A function returns two numbers in ascending order; one result is unpacked and one is kept whole. Write the exact output of the program.",
  t: 2, d: 2, c: 'understanding', marks: 2,
  code: cCoSwap,
  sol: 'order_pair(9, 4) returns (4, 9), unpacked into x and y. order_pair(2, 7) returns (2, 7), stored whole in p and printed as a tuple.',
}));
const cCoKw = code('def power(base, exp=2):', '    return base ** exp', '', 'print(power(3), power(2, 5), power(exp=3, base=4))');
Q('co_power', co({
  pre: "A power function has a default exponent and is called with positional and keyword arguments. Write the exact output of the program.",
  t: 2, d: 2, c: 'understanding', marks: 1, time: 60,
  code: cCoKw,
  sol: 'power(3) uses exp = 2: 9. power(2, 5) is 2 to the power 5: 32. power(exp=3, base=4) is 4 to the power 3: 64.',
}));
Q('s_pos_default', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are default parameters? Write a function header that uses one, and show two different ways of calling it.',
  model: `A **default parameter** has a value in the def header that is used when the call leaves its argument out.\n\n${F('def fee(days, rate=50):', '    return days * rate', '', 'print(fee(4))       # rate = 50', 'print(fee(4, 60))   # rate = 60')}\n\nOutput: ${ic(pyOut('def fee(days, rate=50):\n    return days * rate\nprint(fee(4), fee(4, 60))'))}`,
  sol: 'Meaning with a correct header (1); two calls, one using the default and one overriding it (1).',
  scheme: [['Meaning and a header with a default', 1], ['Two correct calls', 1]],
}));
Q('s_args_params', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between parameters and arguments with an example.',
  model: '1. **Parameters** (formal parameters) are the names listed in the def header, e.g. `rate` and `hours` in `def pay(rate, hours):`.\n2. **Arguments** (actual parameters) are the values passed when the function is called, e.g. `350` and `8` in `pay(350, 8)`.',
  sol: 'One mark for each term with the example.',
  scheme: [['Parameters with example', 1], ['Arguments with example', 1]],
}));
const cErrArgs = code('def avg(a, b, c):', '    return (a + b + c) / 3', '', 'print(avg(70, 80))');
const cErrArgsFix = code('def avg(a, b, c=0):', '    return (a + b + c) / 3', '', 'print(avg(70, 80, 90))');
Q('s_err_args', short({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: `Ruchi's program stops with an error. Name the error, explain it and give one correct way to call or rewrite the function so that it prints the average of 70, 80 and 90.\n\n${F(cErrArgs)}`,
  model: `**Error:** ${ic(pyErr(cErrArgs))}. avg() has three parameters without defaults, but the call passes only two arguments.\n\n${F(cErrArgsFix)}\n\nOutput: ${ic(pyOut(cErrArgsFix))}\n\n(Calling \`avg(70, 80, 90)\` with the original header also works.)`,
  sol: 'Identify the TypeError for a missing argument and pass all three values (or give c a default).',
  scheme: [['TypeError identified with reason', 1], ['Correct call or header', 1]],
}));
const cMultiRet = code('def min_max(nums):', '    lo = hi = nums[0]', '    for n in nums:', '        if n < lo:', '            lo = n', '        if n > hi:', '            hi = n', '    return lo, hi', '', 'small, big = min_max([18, 4, 27, 9])', 'print(small, big)');
Q('s3_min_max', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Write a function `min_max(nums)` that returns both the smallest and the largest value of a list **without** using min() or max(). Show how the two returned values are received in variables, and the output for `[18, 4, 27, 9]`.',
  model: `${F(cMultiRet)}\n\nOutput: ${ic(pyOut(cMultiRet))}\n\nThe two values are returned together as a tuple and unpacked into small and big.`,
  sol: 'Loop with two running values, return both separated by a comma, and unpack them in the call.',
  scheme: [['Loop updating smallest and largest', 1], ['return lo, hi', 1], ['Unpacking and correct output', 1]],
}));
const cKwCalls = code('def report(name, marks, grade="B"):', '    print(name, marks, grade)', '', 'report("Neel", 82)', 'report(marks=91, name="Asha", grade="A")', 'report("Om", grade="C", marks=55)');
Q('s3_arg_kinds', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Write the output of this program and name the kind of argument passing used in each call.\n\n${F(cKwCalls)}`,
  model: `${F(pyOut(cKwCalls))}\n\n1. First call: **positional** arguments, with the **default** "B" for grade.\n2. Second call: **keyword** arguments in a different order.\n3. Third call: a **positional** argument followed by **keyword** arguments.`,
  sol: 'One mark per call: the printed line and the kind of argument passing.',
  scheme: [['First call', 1], ['Second call', 1], ['Third call', 1]],
}));
const cEmi = code(
  'def emi(principal, rate=8, years=1):',
  '    months = years * 12',
  '    interest = principal * rate * years / 100',
  '    return round((principal + interest) / months, 2)',
  '',
  'print(emi(60000))',
  'print(emi(60000, years=2))',
  'print(emi(120000, 6, 3))',
);
Q('l_emi', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'A shop sells phones on simple-interest instalments. Write a function `emi(principal, rate=8, years=1)` that returns the monthly instalment, (principal + simple interest) ÷ number of months, rounded to 2 places. Call it (i) with only the principal 60000, (ii) for 60000 over 2 years using a keyword argument and (iii) for 120000 at 6 per cent over 3 years, and show the outputs.',
  model: `${F(cEmi)}\n\nOutput:\n\n${F(pyOut(cEmi))}`,
  sol: 'Default parameters for rate and years, a return statement, and three calls showing defaults, a keyword argument and all positional arguments.',
  scheme: [['Header with two default parameters', 1], ['Simple interest and months', 1], ['Rounded return value', 1], ['Three correct calls', 1], ['Correct outputs', 1]],
}));

// ================================================================ t03 Flow of execution and scope
const cFlow = code('def a():', '    print("A1")', '    b()', '    print("A2")', '', 'def b():', '    print("B")', '', 'print("start")', 'a()', 'print("end")');
Q('m_flow', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Function a() calls function b(). In what order are the lines printed? (Lines are separated by " / ".)\n\n${F(cFlow)}`,
  opts: distinct([outLine(cFlow), ic('A1 / B / A2 / start / end'), ic('start / A1 / A2 / B / end'), ic('start / B / A1 / A2 / end')]),
  sol: 'def statements only create the functions. Execution starts at print("start"), jumps into a(), which prints A1, jumps into b() to print B, returns to a() to print A2, and finally comes back to print end.',
}));
const cLocal = code('x = 10', 'def change():', '    x = 99', '    print("inside", x)', '', 'change()', 'print("outside", x)');
Q('m_local', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A function assigns 99 to a name that also exists globally. What is printed? (Lines are separated by " / ".)\n\n${F(cLocal)}`,
  opts: distinct([outLine(cLocal), ic('inside 99 / outside 99'), ic('inside 10 / outside 10'), ic('inside 10 / outside 99')]),
  sol: 'Assigning x inside change() creates a new local x (99) that hides the global one. The global x is untouched, so outside the function x is still 10.',
}));
const cGlobal = code('count = 0', 'def visit():', '    global count', '    count += 1', '', 'for i in range(3):', '    visit()', 'print(count)');
Q('m_global', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `A visit counter uses the global keyword and is called three times. What is printed?\n\n${F(cGlobal)}`,
  opts: distinct([outIc(cGlobal), ic('0'), ic('1'), 'An UnboundLocalError']),
  sol: 'The global statement makes count inside visit() refer to the global variable, so each of the three calls adds 1 to it.',
}));
const cUnbound = code('total = 5', 'def add_two():', '    total = total + 2', '    return total', '', 'print(add_two())');
Q('m_unbound', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `A function adds 2 to a global total without declaring it global. What happens when this program runs?\n\n${F(cUnbound)}`,
  opts: [`It stops with ${ic(pyErr(cUnbound).split(':')[0])}`, `It prints ${ic('7')}`, `It prints ${ic('2')}`, `It prints ${ic('5')}`],
  sol: `Because total is assigned inside add_two(), Python treats it as local throughout the function. Reading it on the right-hand side before it has a local value fails: ${ic(pyErr(cUnbound))}. Adding global total, or passing total as an argument, fixes it.`,
}));
const cMutable = code('def add_bonus(scores):', '    for i in range(len(scores)):', '        scores[i] += 5', '', 'marks = [70, 82, 64]', 'add_bonus(marks)', 'print(marks)');
Q('m_mutable_arg', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `A function adds 5 bonus marks to every item of a list passed to it. What is printed?\n\n${F(cMutable)}`,
  opts: distinct([outIc(cMutable), ic('[70, 82, 64]'), ic('None'), ic('[5, 5, 5]')]),
  sol: 'A list is mutable. The parameter scores refers to the same list object as marks, so changing its items inside the function changes marks too.',
}));
const cImmutable = code('def double(n):', '    n = n * 2', '    return n', '', 'k = 21', 'double(k)', 'print(k)');
Q('m_immutable_arg', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: `A function doubles an integer argument but its return value is not stored. What is printed?\n\n${F(cImmutable)}`,
  opts: distinct([outIc(cImmutable), ic('42'), ic('None'), ic('2')]),
  sol: 'Integers are immutable. n = n * 2 makes the local name n refer to a new object, 42, but k still refers to 21. The returned value is not stored, so k is unchanged.',
}));
const cRebind = code('def reset(items):', '    items = []', '    items.append("new")', '', 'bag = ["old"]', 'reset(bag)', 'print(bag)');
Q('m_rebind', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `A function assigns a new empty list to its parameter and then appends to it. Predict the output.\n\n${F(cRebind)}`,
  opts: distinct([outIc(cRebind), ic("['new']"), ic("['old', 'new']"), ic('[]')]),
  sol: 'items = [] makes the local name point to a brand-new empty list; after that, append changes only the new list. The original list bag is never changed.',
}));
Q('m_lifetime', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'When does a local variable of a function stop existing?',
  opts: [
    'When the function call finishes',
    'When the program ends',
    'When the variable is printed',
    'When another function is called',
  ],
  sol: 'A local variable is created when the function runs and is destroyed when the call ends; its lifetime is the duration of the call. Global variables last until the program ends.',
}));
Q('ar_scope', ar({
  t: 3, d: 3, c: 'understanding', key: 'a',
  a: 'A variable created inside a function cannot be used after the function call is over, outside the function.',
  r: 'The scope of a local variable is limited to the function in which it is created.',
  sol: `Both are true and R explains A. For example, using a local name outside raises ${ic(pyErr('def f():\n    tip = 30\nf()\nprint(tip)'))}.`,
}));
Q('ar_global_read', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'A function can read the value of a global variable without declaring it global.',
  r: 'The global keyword is needed whenever a function only reads a global variable.',
  sol: `A is true: reading a global name inside a function works without any declaration (for example, a function that prints a global rate prints ${ic(pyOut('rate = 18\ndef show():\n    print(rate)\nshow()'))}). R is false: global is needed only to **assign** to the global variable inside the function.`,
}));
Q('tf_list_arg', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If a function appends an item to a list passed to it as an argument, the change is seen by the caller.',
  sol: 'Lists are mutable and the parameter refers to the same list object, so changes made in place (append, item assignment) are visible after the call.',
}));
Q('fb_global', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'To change the value of a global variable from inside a function, the variable must be declared in the function with the keyword ___.',
  acc: [['global']],
  sol: 'The global keyword makes the name refer to the global variable, so assignments change it.',
}));
Q('ord_flow', ord({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'For this program, put the events in the order in which they happen.\n\n```python\ndef tax(amt):\n    return amt * 0.18\n\nprice = 500\nprint(price + tax(price))\n```',
  items: [
    'The def statement creates the function tax',
    'price is given the value 500',
    'tax(price) is called and amt receives 500',
    'tax returns 90.0 to the caller',
    'print displays 590.0',
  ],
  sol: `The def runs first but only creates the function. Then price is assigned. While evaluating the print statement, tax() is called, returns 90.0, and print shows ${pyOut('def tax(amt):\n    return amt * 0.18\nprice = 500\nprint(price + tax(price))')}.`,
}));
const cCoScope = code('n = 5', 'def f(n):', '    n = n + 1', '    return n * 2', '', 'def g():', '    global n', '    n = n + 10', '', 'print(f(n), n)', 'g()', 'print(f(n), n)');
Q('co_scope', co({
  pre: "A parameter and a global variable share the name n. Write the exact output of the program.",
  t: 3, d: 4, c: 'analysis', marks: 3, time: 180,
  code: cCoScope,
  sol: 'f(5): the local n becomes 6 and f returns 12; the global n is still 5. g() uses global n, so n becomes 15. Then f(15) returns (15 + 1) × 2 = 32 and n is 15.',
}));
const cCoNested = code('def inner(x):', '    print("in", x)', '    return x + 1', '', 'def outer(x):', '    y = inner(x * 2)', '    print("out", y)', '    return y * 3', '', 'print("result", outer(4))');
Q('co_nested_calls', co({
  pre: "Function outer() calls inner() and both print a line. Write the exact output of the program.",
  t: 3, d: 3, c: 'analysis', marks: 2,
  code: cCoNested,
  sol: 'outer(4) calls inner(8), which prints "in 8" and returns 9. outer prints "out 9" and returns 27, which the last print shows after "result".',
}));
const cCoMut = code('def tally(votes, name):', '    votes[name] = votes.get(name, 0) + 1', '', 'box = {}', 'for v in ["Ria", "Dev", "Ria", "Ria"]:', '    tally(box, v)', 'print(box)');
Q('co_tally', co({
  pre: "A voting function updates a dictionary passed to it. Write the exact output of the program.",
  t: 3, d: 3, c: 'application', marks: 2,
  code: cCoMut,
  sol: 'The dictionary is mutable, so every call to tally() updates the same dictionary box. Ria is counted three times and Dev once, in the order they first appear.',
}));
const cCoDefaultList = code('def visit(place, trip=None):', '    if trip is None:', '        trip = []', '    trip.append(place)', '    return trip', '', 'print(visit("Agra"))', 'print(visit("Puri"))', 'mine = ["Goa"]', 'print(visit("Ooty", mine), mine)');
Q('co_trip', co({
  pre: "A trip-planner function uses None as the default for its list parameter. Write the exact output of the program.",
  t: 3, d: 4, c: 'analysis', marks: 3, time: 180,
  code: cCoDefaultList,
  sol: 'Each call without a list starts a fresh empty list, so the first two calls print a one-item list each. The third call passes mine, which is mutable, so "Ooty" is appended to that same list and both printed values show it.',
}));
const cCoGlobalLoop = code('step = 2', 'def climb(n):', '    global step', '    for i in range(n):', '        step = step * 2', '    return step', '', 'print(climb(3), climb(1), step)');
Q('co_climb', co({
  pre: "A function doubles a global step value inside a loop and is called twice in one print. Write the exact output of the program.",
  t: 3, d: 3, c: 'analysis', marks: 2,
  code: cCoGlobalLoop,
  sol: 'climb(3) doubles the global step three times: 2 → 4 → 8 → 16, and returns 16. climb(1) doubles it once more to 32. The arguments of print are evaluated left to right, so the last value printed is the global step, 32.',
}));
Q('s_local_global', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Differentiate between a local variable and a global variable, with an example.',
  model: `1. A **local variable** is created inside a function and can be used only inside it; it exists only while the function runs.\n2. A **global variable** is created outside all functions (at the top level) and can be read anywhere in the program.\n\n${F('rate = 18          # global', 'def gst(amount):', '    tax = amount * rate / 100   # tax is local', '    return tax')}`,
  sol: 'One mark for each kind with its scope or lifetime.',
  scheme: [['Local variable', 1], ['Global variable', 1]],
}));
const cErrScope = code('points = 0', 'def score(run):', '    points = points + run', '', 'score(4)', 'print(points)');
const cErrScopeFix = code('points = 0', 'def score(run):', '    global points', '    points = points + run', '', 'score(4)', 'print(points)');
Q('s_err_scope', short({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: `This program should add the runs of a ball to a global total, but it stops with an error. Name the error, explain why it occurs and correct the program.\n\n${F(cErrScope)}`,
  model: `**Error:** ${ic(pyErr(cErrScope))}. Because points is assigned inside score(), Python treats it as a local name, and it is read before it has a local value.\n\n${F(cErrScopeFix)}\n\nOutput: ${ic(pyOut(cErrScopeFix))}`,
  sol: 'Name the UnboundLocalError with its reason, then declare global points (or return the new value and assign it outside).',
  scheme: [['Error named with reason', 1], ['Correct program', 1]],
}));
const cTrace3 = code('def mystery(a, b=3):', '    a = a + b', '    b = a - b', '    return a * b', '', 'x = 4', 'print(mystery(x), mystery(x, 1), x)');
Q('s3_trace_fn', short({
  t: 3, d: 3, c: 'analysis', marks: 3,
  stem: `Trace the program and write its output. Show the values of a and b inside each call.\n\n${F(cTrace3)}`,
  model: `1. mystery(4): a = 4 + 3 = 7, b = 7 − 3 = 4, returns 7 × 4 = 28.\n2. mystery(4, 1): a = 5, b = 4, returns 20.\n3. x is still 4 (an integer is immutable and was never reassigned).\n\nOutput: ${ic(pyOut(cTrace3))}`,
  sol: 'One mark for each call traced correctly and one for x, with the printed line.',
  scheme: [['First call traced', 1], ['Second call traced', 1], ['x unchanged and the printed line', 1]],
}));
const cMutVsImm = code('def update(n, L):', '    n = n + 1', '    L.append(n)', '', 'num = 7', 'lst = [7]', 'update(num, lst)', 'print(num, lst)');
Q('s3_mut_imm', short({
  t: 3, d: 3, c: 'analysis', marks: 3,
  stem: `Write the output and explain why one argument changes and the other does not.\n\n${F(cMutVsImm)}`,
  model: `Output: ${ic(pyOut(cMutVsImm))}\n\n1. num refers to an **immutable** integer. n = n + 1 only makes the local name n point to a new object, 8; num still refers to 7.\n2. lst refers to a **mutable** list. L.append(n) changes that same list object in place, so the caller sees [7, 8].`,
  sol: 'Correct output (1), the immutable integer (1), and the mutable list changed in place (1).',
  scheme: [['Correct output', 1], ['Why num is unchanged', 1], ['Why lst changes', 1]],
}));
const cScopeLong = code(
  'balance = 1000',
  '',
  'def deposit(amount):',
  '    global balance',
  '    balance += amount',
  '',
  'def withdraw(amount):',
  '    global balance',
  '    if amount > balance:',
  '        print("Refused:", amount)',
  '        return False',
  '    balance -= amount',
  '    return True',
  '',
  'deposit(500)',
  'withdraw(2000)',
  'withdraw(700)',
  'print("Balance:", balance)',
);
Q('l_bank', long({
  t: 3, d: 3, c: 'application', marks: 5,
  stem: 'A school bank keeps one global balance that starts at ₹1000. Write functions `deposit(amount)` and `withdraw(amount)` that change the global balance; `withdraw` must refuse (print a message and return False) if the amount is more than the balance. Show the output for a deposit of 500, then withdrawals of 2000 and 700.',
  model: `${F(cScopeLong)}\n\nOutput:\n\n${F(pyOut(cScopeLong))}`,
  sol: 'Both functions need global balance because they assign to it; the refusal check comes before subtracting.',
  scheme: [['Global variable and deposit()', 1], ['global used in both functions', 1], ['Refusal check in withdraw()', 1], ['Correct calls', 1], ['Correct output', 1]],
}));
Q('l_scope_explain', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: [100, 150],
  stem: 'Explain the scope and lifetime of variables in Python functions. Your answer should cover local and global scope, the global keyword, and what happens when a mutable and an immutable value are passed to a function. Use short code examples.',
  model: `1. **Local scope:** a name assigned inside a function is local; it exists only during the call and cannot be used outside.\n2. **Global scope:** a name assigned at the top level is global; functions can **read** it directly.\n3. **global keyword:** to **assign** to a global name inside a function, declare it: \`global count\`. Without it, an assignment creates a local name, and reading it first gives an UnboundLocalError.\n4. **Immutable arguments** (int, str, tuple): reassigning the parameter inside the function does not affect the caller.\n5. **Mutable arguments** (list, dict): changes made in place, such as \`L.append(5)\`, are seen by the caller.\n\n${F('def f(L, n):', '    L.append(n)', '    n += 1', 'a, k = [1], 1', 'f(a, k)', 'print(a, k)')}\n\nOutput: ${ic(pyOut('def f(L, n):\n    L.append(n)\n    n += 1\na, k = [1], 1\nf(a, k)\nprint(a, k)'))}`,
  sol: 'Five points: local, global, the global keyword, immutable arguments, mutable arguments.',
  scheme: [['Local scope and lifetime', 1], ['Global scope', 1], ['global keyword', 1], ['Immutable argument', 1], ['Mutable argument', 1]],
}));
const cMarksheet = code(
  'def grade(m):',
  '    if m >= 90:',
  '        return "A1"',
  '    elif m >= 75:',
  '        return "A2"',
  '    elif m >= 60:',
  '        return "B"',
  '    return "C"',
  '',
  'def summary(marks):',
  '    total = sum(marks)',
  '    return total, total / len(marks)',
  '',
  'marks = [int(x) for x in input("Marks: ").split()]',
  'for m in marks:',
  '    print(m, grade(m))',
  't, avg = summary(marks)',
  'print("Total:", t, "Average:", round(avg, 1))',
);
Q('l_marksheet', long({
  t: [2, 1], d: 4, c: 'application', marks: 5,
  stem: 'Write two functions: `grade(m)` returning "A1" for 90 and above, "A2" for 75–89, "B" for 60–74 and "C" otherwise; and `summary(marks)` returning both the total and the average of a list. Use them to print each mark with its grade, then the total and the average rounded to 1 place. Show the output for the input `92 67 78 55`.',
  model: `${F(cMarksheet)}\n\nOutput:\n\n${F(pyOut(cMarksheet, { stdin: '92 67 78 55\n' }).replace('Marks: ', ''))}`,
  sol: 'An if-elif chain of returns, a function returning two values as a tuple, and unpacking in the caller.',
  scheme: [['grade() with correct boundaries', 1], ['summary() returning two values', 1], ['Input converted to a list', 1], ['Loop and unpacking', 1], ['Correct output', 1]],
}));

// ================================================================ case-based (Section D)
const cCanteen = code(
  'MENU = {"poha": 30, "upma": 35, "chai": 10}',
  'GST = 5',
  '',
  'def line_total(item, qty=1):',
  '    return MENU[item] * qty',
  '',
  'def bill(order):',
  '    subtotal = 0',
  '    for item, qty in order:',
  '        subtotal += line_total(item, qty)',
  '    tax = subtotal * GST / 100',
  '    return subtotal, tax, subtotal + tax',
  '',
  'print(bill([("poha", 2), ("chai", 3)]))',
);
Q('cb_canteen', caseQ({
  t: [2, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the billing functions of the Hillview School canteen and answer the questions. *(Imagined school, items and prices, written by SOYL for practice.)*',
  passage: `Students of Hillview School have split their canteen billing program into small functions. The menu and the GST rate are global; an order is a list of (item, quantity) tuples.\n\n${F(cCanteen)}`,
  parts: [
    child('a', mcq({ t: 2, d: 3, c: 'application', fixed: true, key: 'b', stem: 'What does the program print?', opts: [ic('(90, 4.5, 90)'), ic(pyOut(cCanteen)), ic('94.5'), ic('(60, 3.0, 63.0)')], sol: 'poha 2 × 30 = 60 and chai 3 × 10 = 30, so the subtotal is 90. Tax is 90 × 5 ÷ 100 = 4.5 and the total 94.5. The three values are returned as one tuple.' })),
    child('b', fb({ t: 3, d: 2, c: 'understanding', stem: 'Inside `bill()`, the variable `subtotal` is a ___ variable, while `GST` is a global variable.', acc: [['local']], sol: 'subtotal is created inside bill(), so it is local to that function.' })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What does `line_total("upma")` return, and why can the quantity be left out? Write a call that uses a keyword argument for 4 cups of chai.', model: `It returns ${ic(pyOut(cCanteen.replace('print(bill([("poha", 2), ("chai", 3)]))', 'print(line_total("upma"))')))}, because qty has the default value 1. Keyword call: \`line_total(qty=4, item="chai")\`, which returns ${ic(pyOut(cCanteen.replace('print(bill([("poha", 2), ("chai", 3)]))', 'print(line_total(qty=4, item="chai"))')))}.`, sol: 'Default parameter explained and a correct keyword call.', scheme: [['Value with the reason (default)', 1], ['Correct keyword call', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The canteen wants to change the GST rate to 12 from inside a function `set_gst(rate)`. Write the function and say why a keyword is needed.', model: F('def set_gst(rate):', '    global GST', '    GST = rate') + '\n\nWithout `global GST`, the assignment would create a new local variable and the global rate used by bill() would not change.', sol: 'global declaration plus assignment, with the reason.', scheme: [['Correct function with global', 1], ['Reason', 1]] }),
    ]),
  ],
}));
const cQuiz = code(
  'scores = {}',
  '',
  'def add_score(name, points, board=scores):',
  '    board[name] = board.get(name, 0) + points',
  '',
  'def leader(board):',
  '    best = max(board, key=board.get)',
  '    return best, board[best]',
  '',
  'add_score("Teal", 10)',
  'add_score("Coral", 15)',
  'add_score("Teal", 20)',
  'print(scores)',
  'print(leader(scores))',
);
Q('cb_quiz', caseQ({
  t: [3, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the inter-house quiz scoreboard at Lakeside School and answer the questions. *(Imagined school and house names, written by SOYL for practice.)*',
  passage: `The quiz master at Lakeside School keeps house scores in a dictionary and updates it through functions.\n\n${F(cQuiz)}\n\nThe program prints:\n\n${F(pyOut(cQuiz))}`,
  parts: [
    child('a', mcq({ t: 3, d: 3, c: 'analysis', fixed: true, key: 'c', stem: 'Why does `add_score()` change the global dictionary `scores` even though there is no `global` statement?', opts: ['Because dictionaries are global by default in Python', 'Because the function returns the dictionary', 'Because the dictionary is mutable and the function changes it in place', 'Because max() is called on it'], sol: 'board refers to the same dictionary object as scores, and item assignment changes that object in place. global is needed only to assign a new object to the name.' })),
    child('b', tf({ t: 2, d: 2, c: 'understanding', ans: true, stem: 'True or false? `leader()` returns two values, which Python packs into one tuple.', sol: 'return best, board[best] returns a tuple of two values.' })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Write a call to `add_score()` that adds 5 points for "Coral" to a **separate** dictionary `practice = {}`, and state what `practice` and `scores` contain afterwards.', model: `\`add_score("Coral", 5, practice)\` (or \`board=practice\`). Afterwards practice is ${ic(pyOut(cQuiz + '\npractice = {}\nadd_score("Coral", 5, practice)\nprint(practice)').split('\n')[2])} and scores is unchanged: ${ic(pyOut(cQuiz).split('\n')[0])}.`, sol: 'Pass the third argument; only the dictionary passed is changed.', scheme: [['Correct call', 1], ['Both dictionaries stated', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Write statements that receive the two values returned by `leader(scores)` in separate variables and print "Winner: Teal with 30".', model: `${F('house, pts = leader(scores)', 'print("Winner:", house, "with", pts)')}\n\nOutput: ${ic(pyOut(cQuiz + '\nhouse, pts = leader(scores)\nprint("Winner:", house, "with", pts)').split('\n')[2])}`, sol: 'Unpack the returned tuple and print the values.', scheme: [['Unpacking', 1], ['Correct print', 1]] }),
    ]),
  ],
}));
const cParking = code(
  'import math',
  '',
  'def hours_charged(minutes):',
  '    return math.ceil(minutes / 60)',
  '',
  'def fee(minutes, vehicle="car"):',
  '    rate = 20 if vehicle == "car" else 10',
  '    h = hours_charged(minutes)',
  '    if h > 3:',
  '        return 3 * rate + (h - 3) * rate * 2',
  '    return h * rate',
  '',
  'print(fee(50), fee(130, "bike"), fee(250))',
);
Q('cb_parking', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the parking-fee program at a mall in Nashik and answer the questions. *(Imagined mall and charges, written by SOYL for practice.)*',
  passage: `A mall charges ₹20 an hour for cars and ₹10 an hour for bikes; any part of an hour counts as a full hour, and every hour after the third costs double. Its program uses two functions:\n\n${F(cParking)}`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', fixed: true, key: 'a', stem: 'Which module function makes "any part of an hour counts as a full hour" work?', opts: [ic('math.ceil()'), ic('math.floor()'), ic('round()'), ic('int()')], sol: 'ceil() rounds up to the next whole number, so 50 minutes (0.83 hours) is charged as 1 hour.' })),
    child('b', mcq({ t: 2, d: 3, c: 'application', fixed: true, key: 'd', stem: 'What does the last line print?', opts: [ic('20 30 100'), ic('20 20 120'), ic('20 30 120'), ic(pyOut(cParking))], sol: '50 min → 1 h × 20 = 20. 130 min → 3 h for a bike: 3 × 10 = 30. 250 min → 5 h for a car: 3 × 20 + 2 × 40 = 140.' })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name the kinds of argument passing in `fee(50)` and `fee(130, "bike")`, and write a call for a bike parked 75 minutes that uses a keyword argument.', model: `fee(50) uses a **positional** argument and the **default** "car"; fee(130, "bike") uses two **positional** arguments. Keyword call: \`fee(75, vehicle="bike")\`, which returns ${ic(pyOut(cParking.replace('print(fee(50), fee(130, "bike"), fee(250))', 'print(fee(75, vehicle="bike"))')))}.`, sol: 'Default and positional arguments named, and a correct keyword call.', scheme: [['Kinds of arguments', 1], ['Correct keyword call', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Trace the flow of execution for `fee(250)`: which function calls which, and what does each return?', model: 'fee(250) runs first and calls hours_charged(250), which calls math.ceil(250 / 60) = ceil(4.17) and returns 5. Back in fee(), h = 5 is more than 3, so it returns 3 × 20 + 2 × 40 = 140.', sol: 'Call order and the value returned at each step.', scheme: [['Order of calls', 1], ['Values returned', 1]] }),
    ]),
  ],
}));

// Sanity: the solutions above describe these Python results; stop the build if any differs.
expect(pyOut(cParking), '20 30 140', 'parking');
expect(pyOut(cCanteen), '(90, 4.5, 94.5)', 'canteen');
expect(pyOut(cCoScope), '12 5\n32 15', 'scope');
expect(pyOut(cCoGlobalLoop), '16 32 32', 'climb');
expect(pyOut(cTrace3), '28 20 4', 'mystery');
expect(pyOut(cMutVsImm), '7 [7, 8]', 'update');
expect(pyOut(cCoStats), '27.8 30 45', 'stats');
expect(pyOut(cMath), '5 -5 7.0', 'math');
expect(pyOut('def tax(amt):\n    return amt * 0.18\nprice = 500\nprint(tax(price), price + tax(price))'), '90.0 590.0', 'tax flow');
expect(pyOut(cRandRange), '3 6', 'randint range');
expect(pyOut(cRandrange), '[10, 15, 20, 25]', 'randrange values');
expect(pyOut(cCoMut), "{'Ria': 3, 'Dev': 1}", 'tally');
