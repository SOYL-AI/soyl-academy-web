// CBSE 11 Computer Science, ch04 Flow of Control — question bank. Every program, scenario and data value is written by
// SOYL (imagined people, shops and events); no textbook, NCERT or board-paper program is reused. Every output, error,
// count and trace table stated anywhere is produced by running the program with runPy()/pyOut()/pyErr() in lib.mjs.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

/** A Python code fence. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
/** A plain output fence. */
export const O = (text) => '```text\n' + text + '\n```';
export const code = (...lines) => lines.join('\n');
export const ic = (s) => '`' + s + '`';
const outIc = (c, opts) => ic(pyOut(c, opts));
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
export const rowsOf = (c, opts) => JSON.parse(pyOut(c, opts));
export const mdTable = (headers, rows) =>
  [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(String).join(' | ')} |`)].join('\n');
/** The list a range() call produces, as text such as "4, 9, 14". */
export const rng = (args) => pyOut(`print(", ".join(str(v) for v in range(${args})))`) || 'nothing';
/** Python truth of an expression for several values of x, as "T F T". */
export const truths = (expr, xs) => pyOut(`print(" ".join("T" if (${expr}) else "F" for x in ${JSON.stringify(xs)}))`);
/** Runs a loop program under a step limit: "ends" or "endless". */
export const capped = (src) =>
  pyOut(code('import sys', 'n = [0]', 'def tr(f, e, a):', '    n[0] += 1', '    if n[0] > 4000:', '        raise SystemExit', '    return tr', 'sys.settrace(tr)', 'try:', `    exec(compile(${JSON.stringify(src)}, "p", "exec"), {"print": lambda *a, **k: None})`, '    print("ends")', 'except SystemExit:', '    print("endless")'));

/** Value of a Python expression, as text. */
export const val = (expr) => pyOut(`print(${expr})`);
/** Values taken by a variable, as "a, b, c" (Python helper run). */
export const listOf = (expr) => pyOut(`print(", ".join(str(v) for v in ${expr}))`);

// ---------------------------------------------------------------- programs reused by decks, notes and items (exported)
export const medalSrc = (p) => code(`points = ${p}`, 'if points >= 45:', '    medal = "Gold"', 'elif points >= 30:', '    medal = "Silver"', 'elif points >= 15:', '    medal = "Bronze"', 'else:', '    medal = "Try again"', 'print(medal)');
export const ticketSrc = (age) => code(`age = ${age}`, 'if age >= 60:', '    fare = 0', 'else:', '    fare = 25', 'print("Fare:", fare)');
export const cinemaSrc = (age, vip) => code(`age = ${age}`, `vip = ${vip ? "True" : "False"}`, 'if age >= 18:', '    print("Evening show")', '    if vip:', '        print("Free popcorn")', 'else:', '    print("Matinee show")', '    if vip:', '        print("Free juice")');
export const triangleSrc = (a, b, c) =>
  code(`a, b, c = ${a}, ${b}, ${c}`, 'if a + b > c and b + c > a and a + c > b:', '    if a == b and b == c:', '        print("Equilateral")', '    elif a == b or b == c or a == c:', '        print("Isosceles")', '    else:', '        print("Scalene")', 'else:', '    print("Not a triangle")');
/** Rows [pass, n] of a doubling pond. */
export const pondSrc = (n0, limit) => code(`n = ${n0}`, 'week = 0', 'rows = []', `while n < ${limit}:`, '    n = n * 2', '    week = week + 1', '    rows.append([week, n])', 'import json', 'print(json.dumps(rows))');
/** Rows [week, saved] of a for loop over range(). */
export const saveSrc = (a, b, add) => code('saved = 0', 'rows = []', `for week in range(${a}, ${b}):`, `    saved = saved + ${add}`, '    rows.append([week, saved])', 'import json', 'print(json.dumps(rows))');
/** Rows [r, c, r*c] of a nested loop. */
export const gridSrc = (rn, cn) => code('rows = []', `for r in range(1, ${rn + 1}):`, `    for c in range(1, ${cn + 1}):`, '        rows.append([r, c, r * c])', 'import json', 'print(json.dumps(rows))');
export const sumTermsSrc = (n) => code(`n = ${n}`, 'term = 2', 'total = 0', 'rows = []', 'for i in range(1, n + 1):', '    total = total + term', '    rows.append([i, term, total])', '    term = term + 3', 'import json', 'print(json.dumps(rows))');
export const digitRowsSrc = (n) => code(`n = ${n}`, 'total = 0', 'rows = []', 'while n > 0:', '    d = n % 10', '    total = total + d', '    n = n // 10', '    rows.append([d, total, n])', 'import json', 'print(json.dumps(rows))');
export const primeRowsSrc = (n) => code(`n = ${n}`, 'rows = []', 'prime = n > 1', 'for d in range(2, n):', '    rows.append([d, n % d])', '    if n % d == 0:', '        prime = False', '        break', 'import json', 'print(json.dumps({"rows": rows, "prime": prime}))');
export const factRowsSrc = (n) => code(`n = ${n}`, 'f = 1', 'rows = []', 'for k in range(1, n + 1):', '    f = f * k', '    rows.append([k, f])', 'import json', 'print(json.dumps(rows))');

// ================================================================ t01-t02 objective items
Q('m_indent', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Tanvi writes a museum-ticket program in Python. What tells Python which statements belong to the body of her `if` statement?',
  opts: ['Indentation, the same number of leading spaces on each line of the body', 'Curly braces around the statements', 'The words begin and end', 'A semicolon at the end of every line'],
  sol: 'Python has no braces or begin/end words for blocks: a colon opens the block and the indentation of the following lines shows which statements are inside it.',
}));
Q('m_elif_one', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A canteen program uses a chain made of one `if`, two `elif` blocks and a final `else`. When the chain is run once, how many of its blocks are executed?',
  opts: ['Exactly one block', 'Every block whose condition is true', 'Every block from the first true condition to the end', 'Two blocks at least'],
  sol: 'The conditions are tested from the top and the first true one runs its block; the rest of the chain is skipped. Because the chain ends with else, one block always runs.',
}));
const betweenOpts = ['age >= 8 and age <= 14', 'age >= 8 or age <= 14', 'age > 8 and age < 14', 'age >= 8 and age >= 14'];
const betweenAges = [7, 8, 11, 14, 15];
const betweenRes = betweenOpts.map((e) => truths(e.replace(/age/g, 'x'), betweenAges));
if (betweenRes[0] !== 'F T T T F' || new Set(betweenRes).size !== 4) throw new Error(`between options: ${betweenRes}`);
Q('m_between', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Rehan\'s library lets children aged 8 to 14 (both ages included) join the junior club. Which condition, written for a variable `age`, accepts exactly those children?',
  opts: betweenOpts.map(ic),
  sol: `Both limits must hold, so the two tests are joined by and, and 8 and 14 are included, so >= and <= are used. For ages 7, 8, 11, 14 and 15 the first condition gives ${betweenRes[0]}; with or it would accept every age, and with > and < it would reject 8 and 14.`,
}));
Q('m_medal_out', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Sunita's quiz program gives a medal by points. What does it print?\n\n${F(medalSrc(31))}`,
  opts: distinct([outIc(medalSrc(31)), outIc(medalSrc(15)), outIc(medalSrc(45)), outIc(medalSrc(10))]),
  sol: 'The tests are made in order: 31 is not 45 or more, but it is 30 or more, so the Silver block runs and the remaining elif and else are skipped.',
}));
export const orderBug = (s) => code(`score = ${s}`, 'if score >= 40:', '    result = "Pass"', 'elif score >= 75:', '    result = "Distinction"', 'else:', '    result = "Fail"', 'print(result)');
Q('m_order_bug', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Asha's result program should print Distinction for 75 marks or more, Pass for 40 to 74 and Fail below 40. What does it print for 82 marks?\n\n${F(orderBug(82))}`,
  opts: distinct([outIc(orderBug(82)), outIc(code('print("Distinction")')), outIc(orderBug(30)), 'It stops with a SyntaxError']),
  sol: 'The condition score >= 40 is true for 82, so Pass is chosen and the Distinction test is never reached. The broader condition must come after the narrower one: test score >= 75 first.',
}));
Q('m_range_count', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Kavya\'s walking app sounds a reminder once for every number produced by `range(4, 30, 5)`. How many reminders does it sound?',
  opts: distinct([outIc('print(len(range(4, 30, 5)))'), outIc('print(len(range(4, 30, 5)) + 1)'), outIc('print(len(range(4, 30)))'), outIc('print(len(range(5, 30, 5)))')]),
  sol: `The values are ${rng('4, 30, 5')}: it starts at 4, adds 5 each time and stops before 30. Counting the numbers that were not produced, such as 29, or counting 30 itself would give a wrong total.`,
}));
const downOpts = ['range(20, 0, -5)', 'range(20, 5, -5)', 'range(20, 0, 5)', 'range(5, 20, -5)'];
Q('m_range_down', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Farhan\'s countdown timer must print exactly 20, 15, 10 and 5. Which call, used in `for t in ...:`, produces those numbers?',
  opts: downOpts.map(ic),
  sol: `range(20, 0, -5) gives ${rng('20, 0, -5')}. The call range(20, 5, -5) gives ${rng('20, 5, -5')} because 5 is the stop value and is never reached; the other two give nothing, since a step that points away from the stop value produces an empty sequence.`,
}));
const lastVal = code('for i in range(2, 20, 6):', '    pass', 'print(i)');
Q('m_last_value', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Meena runs the loop below. After the loop ends, what does the final print show?\n\n${F(lastVal)}`,
  opts: distinct([outIc(lastVal), ic('20'), ic('8'), ic('2')]),
  sol: `The loop variable takes the values ${rng('2, 20, 6')} and keeps the last one after the loop is over; 20 is never taken because the stop value is excluded.`,
}));
const whileCount = code('n = 100', 'count = 0', 'while n > 7:', '    n = n // 3', '    count += 1', 'print(count)');
Q('m_while_count', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A seed-packing machine in Hari's shop keeps cutting a pile into thirds. How many times does the body of this loop run, as printed at the end?\n\n${F(whileCount)}`,
  opts: distinct([outIc(whileCount), ic('4'), ic('2'), ic('5')]),
  sol: `n takes the values ${pyOut(code('n = 100', 'vals = [n]', 'while n > 7:', '    n = n // 3', '    vals.append(n)', 'print(", ".join(str(v) for v in vals))'))}; the test n > 7 is false for the last of them, so the loop stops after three passes. The test is made before each pass.`,
}));
const tileSrc = code('count = 0', 'for row in range(1, 6):', '    for col in range(row):', '        count += 1', 'print(count)');
Q('m_pattern_total', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Ira lays tiles in rows, one more tile in each new row, and counts them with this program. What does it print?\n\n${F(tileSrc)}`,
  opts: distinct([outIc(tileSrc), ic('25'), ic('10'), ic('5')]),
  sol: 'Row 1 adds 1, row 2 adds 2, and so on up to row 5, so the count is 1 + 2 + 3 + 4 + 5. The inner loop restarts in every pass of the outer loop.',
}));
Q('m_break_inner', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In Gagan\'s program, a `break` statement is executed inside the inner loop of two nested `for` loops. What happens next?',
  opts: ['The inner loop ends and the outer loop carries on with its next pass', 'Both loops end at once', 'The program stops', 'Only the current pass of the inner loop is skipped'],
  sol: 'break leaves only the innermost loop that contains it. Skipping just the current pass is the job of continue, and ending the whole program is not what break does.',
}));
const contSum = code('total = 0', 'for n in range(1, 11):', '    if n % 3 == 0:', '        continue', '    total += n', 'print(total)');
Q('m_continue_sum', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Lopa adds up the ticket numbers 1 to 10 but skips every ticket whose number is a multiple of 3. What does her program print?\n\n${F(contSum)}`,
  opts: distinct([outIc(contSum), ic('55'), ic('18'), ic('27')]),
  sol: `The tickets ${listOf('[k for k in range(1, 11) if k % 3 == 0]')} are skipped, so their sum, ${val('sum(k for k in range(1, 11) if k % 3 == 0)')}, is taken out of the full total of ${val('sum(range(1, 11))')}. continue jumps to the next number without running total += n.`,
}));
const endA = 'n = 12\nwhile n != 0:\n    n = n - 5';
const endB = 'n = 12\nwhile n > 0:\n    n = n - 5';
const endC = 'n = 20\nwhile n != 0:\n    n = n - 5';
const endD = 'n = 1\nwhile n < 50:\n    n = n * 2';
if (capped(endA) !== 'endless' || capped(endB) !== 'ends' || capped(endC) !== 'ends' || capped(endD) !== 'ends') throw new Error('endless loop options');
Q('m_endless', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which one of these four loops, all written by Mohan for a stock-counting exercise, never ends?',
  opts: ['n starts at 12, and the loop `while n != 0` does `n = n - 5`', 'n starts at 12, and the loop `while n > 0` does `n = n - 5`', 'n starts at 20, and the loop `while n != 0` does `n = n - 5`', 'n starts at 1, and the loop `while n < 50` does `n = n * 2`'],
  sol: `Starting from 12, subtracting 5 gives ${listOf('[12 - 5 * i for i in range(1, 6)]')} and so on, which jumps over 0, so n != 0 stays true for ever. The others end: the loop with n > 0 stops with n equal to ${pyOut(endB + '\nprint(n)')}, the loop that starts at 20 reaches exactly ${pyOut(endC + '\nprint(n)')}, and n doubles to ${pyOut(endD + '\nprint(n)')}, past 50.`,
}));
const digitSum = code('n = 40718', 's = 0', 'while n > 0:', '    s += n % 10', '    n //= 10', 'print(s)');
Q('m_digit_sum', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Zubin's lucky-number game adds the digits of 40718 with this program. What does it print?\n\n${F(digitSum)}`,
  opts: distinct([outIc(digitSum), ic('4'), ic('8'), ic('40718')]),
  sol: `Each pass adds the last digit (n % 10) and then drops it (n // 10): ${listOf('reversed(str(40718))')} are added in turn, giving ${pyOut(digitSum)}. The loop stops when n becomes 0.`,
}));
const oddSq = code('total = 0', 'for k in range(1, 10, 2):', '    total += k * k', 'print(total)');
Q('m_odd_squares', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Devika adds the squares of the odd numbers in a school maths game. What does this program print?\n\n${F(oddSq)}`,
  opts: distinct([outIc(oddSq), ic('285'), ic('120'), ic('55')]),
  sol: `The loop variable takes ${rng('1, 10, 2')} and the squares ${listOf('[k * k for k in range(1, 10, 2)]')} are added. The sum of the squares of all the numbers 1 to 9 is ${val('sum(k * k for k in range(1, 10))')}, which includes the even ones.`,
}));
const elseAlign = code('x = 12', 'if x > 5:', '    if x > 20:', '        print("huge")', 'else:', '    print("small")');
if (pyOut(elseAlign) !== '') throw new Error('else alignment should print nothing');
Q('m_else_align', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Lalit's stock-flag program is shown below, with x equal to 12. The else is lined up with the outer if. What is printed?\n\n${F(elseAlign)}`,
  opts: ['Nothing is printed', 'small', 'huge', 'huge and then small'],
  sol: 'x > 5 is true, so the outer else is skipped. The inner test x > 20 is false and the inner if has no else of its own, so no statement runs. An else belongs to the if with the same indentation.',
}));
const cinemaLast = pyOut(cinemaSrc(16, true)).split('\n').pop();
Q('m_nested_last', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The Starlight cinema program below is run with the given values. What is the last line it prints?\n\n${F(cinemaSrc(16, true))}`,
  opts: distinct([ic(cinemaLast), ic('Free popcorn'), ic('Matinee show'), ic('Evening show')]),
  sol: 'Since age 16 is below 18, the else block runs: it prints Matinee show, and then its own nested if finds vip true and prints the juice line. The popcorn line belongs to the other branch.',
}));

// ---- assertion-reason
Q('ar_range_stop', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'The call `range(1, 6)` generates the numbers 1, 2, 3, 4 and 5.',
  r: 'The stop value of `range()` is never included in the numbers it generates.',
  sol: 'Both are true and R explains A: the sequence ends just before 6, so 5 is the last number.',
}));
Q('ar_continue', ar({
  t: 2, d: 3, c: 'understanding', key: 'd',
  a: 'The `continue` statement ends the whole loop at once.',
  r: 'The `break` statement leaves the loop, whatever iterations remain.',
  sol: 'A is false: continue only skips the rest of the current pass and goes on with the next one. R is true: break is the statement that ends the loop.',
}));
Q('ar_while_update', ar({
  t: 2, d: 3, c: 'understanding', key: 'a',
  a: 'A `while` loop whose variable is never changed inside the body may never end.',
  r: 'Its condition then stays true in every test, so Python never leaves the loop.',
  sol: 'Both are true and R explains A: with no update, the condition keeps the same truth value, and a true one repeats for ever.',
}));
Q('ar_two_ifs', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Two separate `if` statements one after the other can both run their blocks for the same value.',
  r: 'An `elif` block runs only when every condition above it in its chain has been false.',
  sol: 'Both statements are true, but R does not explain A: separate ifs are tested independently, which is why both can run. R describes a chain, where only one block can run.',
}));
Q('ar_empty_range', ar({
  t: 2, d: 3, c: 'understanding', key: 'c',
  a: 'The call `range(5, 0)` generates no numbers.',
  r: 'When the start is larger than the stop, `range()` automatically counts downwards.',
  sol: 'A is true: the default step is +1, which moves away from 0, so the sequence is empty. R is false: a negative step such as -1 must be given for counting down.',
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_while_zero', tf({
  t: 2, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? The body of a `while` loop may run zero times.',
  sol: 'The condition is tested before the first pass; if it is false at that moment, the body is never run, as in `while 5 < 3:`.',
}));
Q('tf_else_alone', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? An `else` block can be written in Python without any `if` before it.',
  sol: 'else always completes an if (or an if-elif chain); on its own it is a syntax error.',
}));
Q('tf_break_all', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? A `break` inside the inner loop of a nested loop also ends the outer loop.',
  sol: 'break ends only the loop in which it appears; the outer loop goes on with its next pass.',
}));
Q('tf_range_float', tf({
  t: 2, d: 2, c: 'recall', ans: false,
  stem: 'True or false? `range(0, 2, 0.5)` is valid and generates 0, 0.5, 1 and 1.5.',
  sol: 'range() accepts only integers, so a step of 0.5 raises a TypeError.',
}));
Q('fb_range_step', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'In `for k in range(12, 2, -3):` the loop variable k takes ___ different values.',
  acc: [['4', 'four']],
  sol: `The values are ${rng('12, 2, -3')}, which is four numbers; 2 itself is the stop value and is excluded.`,
}));
Q('fb_keyword', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The statement ___ skips the rest of the current pass of a loop and starts the next pass, while the statement ___ leaves the loop completely.',
  acc: [['continue'], ['break']],
  sol: 'continue goes to the next pass; break leaves the loop. Both are usually found inside an if.',
}));
Q('fb_elif', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In an if-elif-else chain, the keyword used for each extra test between the first if and the final else is ___.',
  acc: [['elif']],
  sol: 'elif is the short form of "else if" and may be repeated as many times as needed.',
}));
Q('fb_nested', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'An if statement written inside the block of another if statement is called a ___ if.',
  acc: [['nested']],
  sol: 'A nested if is tested only when the outer condition allows its block to run.',
}));
const rangeMatch = [['range(3, 11, 3)', '3, 6, 9'], ['range(10, 1, -4)', '10, 6, 2'], ['range(4)', '0, 1, 2, 3'], ['range(7, 7)', 'nothing']];
rangeMatch.forEach(([c, r]) => { const got = r === 'nothing' ? 'nothing' : rng(c.slice(6, -1)); if (got !== r) throw new Error(`match range ${c}: ${got}`); });
Q('mt_range', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each call used in Nisha\'s number-line exercise with the numbers it generates.',
  pairs: rangeMatch,
  sol: 'The stop value is excluded each time; range(4) starts at 0, and range(7, 7) is empty because start and stop are equal.',
}));
Q('mt_terms', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each loop-control term met in a number-guessing game with its meaning.',
  pairs: [
    ['break', 'Leaves the loop at once'],
    ['continue', 'Skips the rest of this pass'],
    ['Loop variable', 'Takes the next value on each pass of a for loop'],
    ['Nested loop', 'A loop inside the body of another loop'],
  ],
  sol: 'Each term is paired with its role: break ends the loop, continue ends only the pass, the loop variable changes on every pass, and a nested loop runs completely in each pass of the outer loop.',
}));
Q('ord_while', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the stages of one complete run of a `while` loop, such as a loop that counts the coins in Eshan\'s piggy bank, in the order in which they happen.',
  items: ['Give the loop variable its starting value', 'Test the condition', 'Run the body if the condition is true', 'Change the loop variable', 'Test the condition again'],
  sol: 'The variable is set before the loop, the condition is tested, the body runs and updates the variable, and then control returns to the test.',
}));
Q('ord_elif', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Bela wants a program that prints a rating for a restaurant score. Arrange her steps in the order that makes the chain of decisions work correctly.',
  items: ['Read the score', 'If the score is 90 or more, rating is Excellent', 'Otherwise, if the score is 70 or more, rating is Good', 'Otherwise the rating is Average', 'Print the rating'],
  sol: 'The score is read first, the strictest test comes first, each later test is only reached when the earlier ones fail, and the rating is printed at the end.',
}));
Q('ord_prime', ord({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of a program that decides whether a number n of at least 2 is prime by trial division.',
  items: ['Assume n is prime', 'For each d from 2 up to n - 1', 'If d divides n exactly, mark n as not prime and leave the loop', 'After the loop, report whether n is still marked prime'],
  sol: 'A flag is set before the loop, each divisor is tried, the first exact divisor changes the flag and breaks out, and the result is reported once the loop is over.',
}));

// ================================================================ code-output items
const cFares = code('distances = [3, 12, 25, 40]', 'for km in distances:', '    if km <= 5:', '        fare = 10', '    elif km <= 20:', '        fare = 10 + (km - 5) * 2', '    else:', '        fare = 40 + (km - 20) * 3', '    print(km, fare)');
Q('co_fares', co({
  pre: 'Bhavin\'s auto-rickshaw stand works out fares for four trips with the program below. Write exactly what it prints.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cFares,
  sol: 'For each distance the first true condition decides the fare: 3 km is in the first slab, 12 km in the second (10 plus 2 for each km beyond 5), and 25 and 40 km reach the else.',
}));
const cStep = code('for t in range(7, 40, 9):', '    print(t, end=" ")', 'print("done")');
Q('co_range_step', co({
  pre: 'Nandini\'s reminder app uses the program below to pick the reminder minutes. What exactly does it print?',
  t: 2, d: 2, c: 'understanding', marks: 1, time: 60,
  code: cStep,
  sol: `The loop variable goes ${rng('7, 40, 9')} and the next value, ${val('max(range(7, 40, 9)) + 9')}, is past the stop value. end=" " keeps the numbers on one line, and done is printed after the loop.`,
}));
const cTri = code('for r in range(1, 4):', '    for c in range(1, r + 1):', '        print(r * c, end=" ")', '    print()');
Q('co_nested_table', co({
  pre: 'Prerna prints a small multiplication corner for her younger brother with this program. Write its exact output.',
  t: 2, d: 3, c: 'application', marks: 2,
  code: cTri,
  sol: 'The inner loop runs 1, 2 and 3 times in the three passes of the outer loop; the empty print() ends each line.',
}));
export const cBreakSearch = code('stock = [12, 22, 9, 35, 56]', 'for qty in stock:', '    if qty % 7 == 0:', '        print("first multiple of 7:", qty)', '        break', '    print("checked", qty)');
Q('co_break_search', co({
  pre: 'Ruchi looks for the first shelf whose stock is a multiple of 7. Write the exact output of her search.',
  t: 2, d: 3, c: 'application', marks: 2,
  code: cBreakSearch,
  sol: 'Shelves 12, 22 and 9 are not multiples of 7 and are reported as checked; 35 is, so the message is printed and break ends the loop before 56 is looked at.',
}));
export const cContinue = code('weights = [120, 0, 95, 0, 110]', 'total = 0', 'for w in weights:', '    if w == 0:', '        continue', '    total += w', '    print(total)');
Q('co_continue', co({
  pre: 'A fruit seller records the weight of each crate in grams, and 0 marks a spoiled crate. What does this running-total program print?',
  t: 2, d: 3, c: 'application', marks: 2,
  code: cContinue,
  sol: 'Spoiled crates (0) are skipped by continue, so print runs only for the three good crates, showing the total after each.',
}));
const cSeats = code('seats = 23', 'group = 5', 'while seats >= group:', '    seats -= group', '    print(seats)', 'print("left", seats)');
const seatLines = pyOut(cSeats).split('\n');
Q('co_seats', co({
  pre: 'A coach has 23 empty seats and bookings arrive in groups of 5. Write the exact output of the booking program.',
  t: 2, d: 3, c: 'application', marks: 2,
  code: cSeats,
  sol: `A group is seated while at least 5 seats remain. After ${seatLines.length - 1} groups only ${seatLines.at(-2)} seats are left, which is less than 5, so the loop ends and the final line is printed.`,
}));
const cDown = code('for lap in range(9, 0, -3):', '    print("lap", lap)', 'print(lap)');
Q('co_countdown', co({
  pre: 'Joel\'s stopwatch program counts laps downwards. What exactly does it print?',
  t: 2, d: 2, c: 'understanding', marks: 1, time: 75,
  code: cDown,
  sol: `The step -3 gives ${rng('9, 0, -3')}; 0 is the stop value. The loop variable keeps its last value, ${val('min(range(9, 0, -3))')}, which the last print shows.`,
}));
export const cNestBreak = code('for a in range(1, 4):', '    for b in range(1, 4):', '        if a == b:', '            break', '        print(a, b)');
Q('co_nested_break', co({
  pre: 'Charu pairs up team numbers with the program below. Write the exact output.',
  t: 2, d: 5, c: 'analysis', marks: 2,
  code: cNestBreak,
  sol: 'Whenever the two numbers are equal the inner loop is left before anything is printed for that pass, so only the pairs in which b is smaller than a are printed; break leaves the inner loop only and the outer loop carries on.',
}));
const cCount = code('temps = [31, 28, 35, 30, 27, 33]', 'hot = 0', 'mild = 0', 'for t in temps:', '    if t >= 30:', '        hot += 1', '    else:', '        mild += 1', 'print(hot, mild)');
Q('co_count', co({
  pre: 'A weather club sorts six daily highs with this program. What does it print?',
  t: 1, d: 2, c: 'understanding', marks: 1, time: 75,
  code: cCount,
  sol: 'The readings 31, 35, 30 and 33 are 30 or more and are counted as hot; 28 and 27 are counted as mild.',
}));
export const cGuess = code('secret = 37', 'tries = 0', 'while True:', '    g = int(input())', '    tries += 1', '    if g == secret:', '        print("Correct in", tries)', '        break', '    elif g < secret:', '        print("higher")', '    else:', '        print("lower")');
export const guessIn = '50\n20\n40\n37\n';
Q('co_guess', co({
  pre: 'Samar\'s number-guessing game is run, and the player types 50, 20, 40 and 37, one after another on separate lines. Write the exact output.',
  t: 2, d: 4, c: 'analysis', marks: 2, run: { stdin: guessIn },
  code: cGuess,
  sol: 'Each guess is compared with the secret number 37: 50 is too high so the program says lower; 20 and 40 give higher and lower; the fourth guess equals the secret, so the count is printed and break ends the loop.',
}));
const cInv = code('for row in range(4, 0, -1):', '    print("-" * row)');
Q('co_inverted', co({
  pre: 'A shop sign is drawn by the program below. Write the exact output.',
  t: 2, d: 2, c: 'understanding', marks: 1, time: 75,
  code: cInv,
  sol: 'The row length counts down from 4 to 1, because the step is -1 and the stop value 0 is excluded.',
}));
export const cSeries = code('total = 0', 'term = 2', 'n = 0', 'while total < 40:', '    total += term', '    term += 3', '    n += 1', 'print(n, total)');
Q('co_series', co({
  pre: 'Ritu adds the terms 2, 5, 8, ... of a series until the total reaches 40 or more. What does her program print?',
  t: 2, d: 3, c: 'application', marks: 2,
  code: cSeries,
  sol: `Each term is 3 more than the one before. The totals are ${pyOut(code('total = 0', 'term = 2', 'vals = []', 'while total < 40:', '    total += term', '    term += 3', '    vals.append(total)', 'print(", ".join(str(v) for v in vals))'))}; the last total is not below 40, so the loop stops and the count and the total are printed.`,
}));
const cSquares = code('for n in range(1, 6):', '    if n % 2 == 0:', '        print(n, n * n)', '    else:', '        print(n, n * n * n)');
Q('co_square_cube', co({
  pre: 'Oren\'s maths-club program prints squares for even numbers and cubes for odd numbers. Write the exact output.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cSquares,
  sol: 'Even numbers (2 and 4) go to the first branch and show their squares; odd numbers (1, 3 and 5) go to the else and show their cubes.',
}));

// ================================================================ short answers (2 marks)
export const errColon = code('temp = 38', 'if temp > 37', '    print("Fever")');
export const errColonFix = code('temp = 38', 'if temp > 37:', '    print("Fever")');
Q('s2_err_colon', short({
  t: 1, d: 2, c: 'analysis', marks: 2,
  stem: `Vimal's body-temperature program stops with an error before it prints anything. Find the mistake and write the corrected program.\n\n${F(errColon)}`,
  model: `Python reports ${ic(pyErr(errColon))}.\n\nThe condition of an if statement must be followed by a colon.\n\n${F(errColonFix)}\n\nOutput: ${ic(pyOut(errColonFix))}`,
  sol: 'One mark for the missing colon, one for the corrected program.',
  scheme: [['Missing colon identified', 1], ['Corrected program', 1]],
}));
export const errIndent = code('marks = 45', 'if marks >= 40:', 'print("Pass")');
const errIndentFix = code('marks = 45', 'if marks >= 40:', '    print("Pass")');
Q('s2_err_indent', short({
  t: 1, d: 2, c: 'analysis', marks: 2,
  stem: `Chitra's pass-or-fail program gives an error when it is run. Name the error and correct the program.\n\n${F(errIndent)}`,
  model: `Python reports ${ic(pyErr(errIndent))}.\n\nThe statement inside the if block is not indented.\n\n${F(errIndentFix)}\n\nOutput: ${ic(pyOut(errIndentFix))}`,
  sol: 'One mark for naming the indentation error, one for the corrected program.',
  scheme: [['IndentationError identified', 1], ['Corrected program', 1]],
}));
export const errEq = code('score = 50', 'if score = 50:', '    print("Half century")');
const errEqFix = code('score = 50', 'if score == 50:', '    print("Half century")');
Q('s2_err_eq', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: `Dev's cricket-score program fails with an error. Find the mistake and give the corrected program with its output.\n\n${F(errEq)}`,
  model: `Python reports ${ic(pyErr(errEq))}.\n\nA single = assigns a value; a condition needs the comparison operator ==.\n\n${F(errEqFix)}\n\nOutput: ${ic(pyOut(errEqFix))}`,
  sol: 'One mark for replacing = by ==, one for the corrected program and its output.',
  scheme: [['= used instead of ==', 1], ['Corrected program and output', 1]],
}));
export const errName = code('for qty in [4, 6, 3]:', '    total = total + qty', 'print(total)');
export const errNameFix = code('total = 0', 'for qty in [4, 6, 3]:', '    total = total + qty', 'print(total)');
Q('s2_err_name', short({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: `Bina's loop is meant to add the quantities 4, 6 and 3 of the bread she baked, but it stops with an error. Explain the cause and correct it.\n\n${F(errName)}`,
  model: `Python reports ${ic(pyErr(errName))}.\n\nThe first pass reads total on the right of the assignment, but total has never been given a value. A running total must be initialised before the loop.\n\n${F(errNameFix)}\n\nOutput: ${ic(pyOut(errNameFix))}`,
  sol: 'One mark for the cause (no initial value) and one for the corrected program.',
  scheme: [['Cause identified', 1], ['Corrected program', 1]],
}));
Q('s2_range_lists', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Write the numbers generated by each of the following calls, which Kiran uses to schedule practice sessions: (a) `range(3, 12, 4)` (b) `range(12, 3, -4)` (c) `range(9, 2)`.',
  model: `(a) ${rng('3, 12, 4')}\n\n(b) ${rng('12, 3, -4')}\n\n(c) ${rng('9, 2')}, because the default step is +1, so counting up from 9 can never reach a stop value of 2.`,
  sol: 'Marks for each correct result; the third needs the empty sequence.',
  scheme: [['(a) and (b) correct', 1], ['(c) empty sequence', 1]],
}));
const bcDemo = (kw) => code('for n in range(1, 7):', '    if n == 3:', `        ${kw}`, '    print(n, end=" ")');
Q('s2_break_continue', short({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Explain, with the help of one short program that prints the numbers 1 to 6 but treats the number 3 specially, how `break` differs from `continue`.',
  model: `With break the loop ends when n is 3:\n\n${F(bcDemo('break'))}\n\nOutput: ${ic(pyOut(bcDemo('break')))}\n\nWith continue only the pass for 3 is skipped:\n\n${F(bcDemo('continue'))}\n\nOutput: ${ic(pyOut(bcDemo('continue')))}\n\nbreak terminates the loop, continue skips to the next pass.`,
  sol: 'One mark for each statement explained with its output.',
  scheme: [['break explained with output', 1], ['continue explained with output', 1]],
}));
Q('s2_for_while', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Sheetal wants one program that prints a table of 7 up to 10 terms and another that keeps asking for a password until it is right. Say which loop, `for` or `while`, suits each, and why.',
  model: 'The table needs a `for` loop with `range()`: the number of repetitions, 10, is known in advance.\n\nThe password program needs a `while` loop: nobody can say beforehand how many attempts the user will need, so it repeats while the password is wrong.',
  sol: 'One mark for each loop correctly matched with its reason.',
  scheme: [['for loop for the fixed count', 1], ['while loop for the unknown count', 1]],
}));
Q('s2_trace_boundary', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Dry run the medal program of Sunita (below) for the boundary values 14, 15, 29 and 30 and write the medal printed for each.\n\n' + F(medalSrc(15)),
  model: mdTable(['points', 'medal'], [14, 15, 29, 30].map((p) => [p, pyOut(medalSrc(p))])) + '\n\nThe boundaries 15 and 30 belong to the higher medal because the tests use >=.',
  sol: 'Two marks for all four correct results, one for any three.',
  scheme: [['14 and 15 correct', 1], ['29 and 30 correct', 1]],
}));

// ================================================================ short answers (3 marks)
const pondRows = rowsOf(pondSrc(3, 100));
Q('s3_trace_while', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `A pond starts with 3 lilies and the number doubles every week. The program below counts the weeks until there are 100 or more. Dry run it with a trace table.\n\n${F(code('n = 3', 'week = 0', 'while n < 100:', '    n = n * 2', '    week = week + 1', 'print(week, n)'))}`,
  model: `${mdTable(['Pass', 'n after the pass'], pondRows)}\n\nThe loop stops when n is ${pondRows.at(-1)[1]}, which is not below 100, and the program prints ${ic(pyOut(code('n = 3', 'week = 0', 'while n < 100:', '    n = n * 2', '    week = week + 1', 'print(week, n)')))}.`,
  sol: 'One mark for the table with a row for each pass, one for the stopping value and one for the printed output.',
  scheme: [['Trace table with every pass', 1], ['Stopping value', 1], ['Printed output', 1]],
}));
const offBy = (stop) => code('n = 6', 'total = 0', `for k in range(1, ${stop}):`, '    total += k', 'print(total)');
Q('s3_off_by_one', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: `Tarun's program should print the sum of the numbers 1 to n for n = 6, which is ${val('sum(range(1, 7))')}, but it does not.\n\n${F(offBy('n'))}\n\nState what it prints, find the fault and write the corrected line.`,
  model: `It prints ${ic(pyOut(offBy('n')))}: the stop value of range() is excluded, so 6 is never added.\n\nCorrected line: ${ic('for k in range(1, n + 1):')}\n\n${F(offBy('n + 1'))}\n\nOutput of the corrected program: ${ic(pyOut(offBy('n + 1')))}`,
  sol: 'One mark for the wrong output, one for the reason (stop value excluded) and one for the corrected line.',
  scheme: [['Wrong output stated', 1], ['Reason: stop value excluded', 1], ['range(1, n + 1)', 1]],
}));
const endlessSrc = code('count = 1', 'while count <= 5:', '    print(count)');
const endlessFix = code('count = 1', 'while count <= 5:', '    print(count)', '    count += 1');
if (capped(endlessSrc) !== 'endless' || capped(endlessFix) !== 'ends') throw new Error('endless fix check');
Q('s3_endless', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: `Anil's program is meant to print 1 to 5 but it keeps printing without stopping.\n\n${F(endlessSrc)}\n\nExplain why and give the corrected program with its output.`,
  model: `The loop variable count is never changed inside the body, so the condition count <= 5 stays true for ever (a test run under a step limit confirms that the loop does not end).\n\n${F(endlessFix)}\n\nOutput: ${ic(pyOut(endlessFix).replace(/\n/g, ' '))}\n\nWithout such an update the loop has no way to stop, whatever the starting values.`,
  sol: 'One mark for the reason, one for the update statement and one for the output of the corrected program.',
  scheme: [['Reason: no update', 1], ['Update count += 1 added', 1], ['Output of corrected program', 1]],
}));
const stair = code('for r in range(1, 5):', '    for c in range(r):', '        print(r, end="")', '    print()');
Q('s3_pattern', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Write a program with nested loops that prints this pattern, in which each row shows its own row number as many times as the number itself:\n\n' + O(pyOut(stair)),
  model: `${F(stair)}\n\nThe outer loop runs once for each row; the inner loop prints the row number r, r times on the same line (end=""); the empty print() starts a new line.\n\nOutput:\n\n${O(pyOut(stair))}`,
  sol: 'One mark for the outer loop over the rows, one for the inner loop with the correct count and one for the new line after each row.',
  scheme: [['Outer loop for rows', 1], ['Inner loop printing r, r times', 1], ['print() after each row', 1]],
}));
const twoIfs = (kw) => code('score = 82', 'if score >= 40:', '    print("Pass")', `${kw} score >= 75:`, '    print("Distinction")');
Q('s3_elif_vs_if', short({
  t: 1, d: 4, c: 'analysis', marks: 3,
  stem: `Pia writes the program below twice: in the second version the word elif is replaced by if. Give the output of each version for a score of 82 and explain the difference.\n\n${F(twoIfs('elif'))}`,
  model: `With elif the output is ${ic(pyOut(twoIfs('elif')))}; with a second if the output is ${ic(pyOut(twoIfs('if')).replace(/\n/g, ' then '))}.\n\nIn a chain the second test is skipped once the first was true, so only one block can run. A separate if is always tested, so both blocks can run for the same score.`,
  sol: 'One mark for each output and one for the explanation of chain versus independent tests.',
  scheme: [['Output with elif', 1], ['Output with if', 1], ['Explanation', 1]],
}));

// ================================================================ long answers (5 marks)
const primeProg = code('n = int(input())', 'if n < 2:', '    print("Not prime")', 'else:', '    prime = True', '    for d in range(2, n):', '        if n % d == 0:', '            prime = False', '            break', '    if prime:', '        print("Prime")', '    else:', '        print("Not prime")');
const pr83 = rowsOf(primeRowsSrc(83), {});
const pr91 = rowsOf(primeRowsSrc(91), {});
Q('l_prime', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'The Mathematics club of Greenfield School wants a program that reads a whole number n and prints Prime or Not prime, by trying every divisor from 2 to n - 1. Write the program (use a flag and `break`) and show its output for the inputs 83 and 91.',
  model: `${F(primeProg)}\n\nOutput for 83: ${ic(pyOut(primeProg, { stdin: '83\n' }))}\n\nOutput for 91: ${ic(pyOut(primeProg, { stdin: '91\n' }))}\n\nFor 91 the loop stops at d = ${pr91.rows.at(-1)[0]} (91 = ${pr91.rows.at(-1)[0]} x ${val('91 // ' + pr91.rows.at(-1)[0])}) after ${pr91.rows.length} divisions; for 83 it tries all ${pr83.rows.length} divisors from 2 to 82 and none divides 83 exactly.`,
  sol: 'Marks: input and the n < 2 case, the flag, the loop with the test, break, and both outputs.',
  scheme: [['Input and n < 2 handled', 1], ['Flag set before the loop', 1], ['Loop with divisibility test', 1], ['break and final decision', 1], ['Both outputs correct', 1]],
}));
const patProg = code('n = int(input())', 'for r in range(n, 0, -1):', '    for c in range(r, 0, -1):', '        print(c, end=" ")', '    print()');
Q('l_pattern', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'A school diary has a decoration made of a number staircase. For an input n = 4 it looks like this (each row counts down to 1, and the first row starts at n):\n\n' + O(pyOut(patProg, { stdin: '4\n' })) + '\n\nWrite a program that reads n and prints the staircase using nested loops. Show the output for n = 3.',
  model: `${F(patProg)}\n\nThe outer loop gives the starting number of each row, n down to 1 (step -1); the inner loop counts down from that number to 1; print() ends the row.\n\nOutput for n = 3:\n\n${O(pyOut(patProg, { stdin: '3\n' }))}`,
  sol: 'Marks: reading n, the outer loop with a negative step, the inner loop, a new line after each row, and the output for n = 3.',
  scheme: [['Input of n', 1], ['Outer loop with step -1', 1], ['Inner loop counting down', 1], ['New line after each row', 1], ['Output for n = 3', 1]],
}));
export const menuProg = code('total = 0', 'while True:', '    print("Menu: 1 add, 2 total, 3 exit")', '    choice = int(input())', '    if choice == 1:', '        price = int(input())', '        total += price', '    elif choice == 2:', '        print("Total:", total)', '    elif choice == 3:', '        break', '    else:', '        print("Invalid choice")', 'print("Thank you")');
export const menuIn = '1\n120\n1\n75\n2\n9\n3\n';
Q('l_menu', long({
  t: 2, d: 5, c: 'application', marks: 5,
  stem: 'Bharat\'s stationery shop needs a menu-driven billing program. Choice 1 reads an item price and adds it to the bill, choice 2 shows the bill so far, choice 3 ends the program, and any other choice prints a message. Write the program with a `while` loop and show its output when the user types 1, 120, 1, 75, 2, 9, 3 (one per line).',
  model: `${F(menuProg)}\n\nOutput for the given input:\n\n${O(pyOut(menuProg, { stdin: menuIn }))}\n\nThe loop repeats until choice 3 executes break; the else branch handles the invalid choice 9.`,
  sol: 'Marks: a loop that repeats until exit, reading the choice, the three branches with the price added, the invalid branch, and the output for the input.',
  scheme: [['Loop with break on 3', 1], ['Choice read each time', 1], ['Add and show branches', 1], ['Invalid choice branch', 1], ['Output for the input', 1]],
}));
const serProg = code('n = int(input())', 'term = 2', 'total = 0', 'for i in range(1, n + 1):', '    total = total + term', '    term = term + 3', 'print("Sum:", total)');
const serRows = rowsOf(sumTermsSrc(7));
Q('l_series', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'Write a program that reads n and prints the sum of the first n terms of the series 2 + 5 + 8 + 11 + ... (each term is 3 more than the one before). Dry run it for n = 7 with a trace table.',
  model: `${F(serProg)}\n\nTrace for n = 7:\n\n${mdTable(['i', 'term added', 'total'], serRows)}\n\nOutput for 7: ${ic(pyOut(serProg, { stdin: '7\n' }))}`,
  sol: 'Marks: input, initial values, loop for n terms, update of the term, and a correct trace with the sum.',
  scheme: [['Input and initial values', 1], ['Loop for n terms', 1], ['Total and term updates', 1], ['Trace table', 1], ['Sum for n = 7', 1]],
}));
const guessProg = code('secret = 58', 'found = False', 'for attempt in range(1, 6):', '    g = int(input())', '    if g == secret:', '        found = True', '        break', '    elif g < secret:', '        print("Too low")', '    else:', '        print("Too high")', 'if found:', '    print("You got it in", attempt, "attempts")', 'else:', '    print("Out of attempts")');
Q('l_guess', long({
  t: 2, d: 4, c: 'application', marks: 5,
  stem: 'In the fair game "Guess my number", the secret number is 58 and a player gets at most 5 attempts. Write a program that reads each guess, says Too low or Too high, stops as soon as the guess is right, and finally reports the number of attempts or that the attempts are over. Show the output for the guesses 45, 60, 58 and then for the guesses 10, 20, 30, 40, 50.',
  model: `${F(guessProg)}\n\nGuesses 45, 60, 58:\n\n${O(pyOut(guessProg, { stdin: '45\n60\n58\n' }))}\n\nGuesses 10, 20, 30, 40, 50:\n\n${O(pyOut(guessProg, { stdin: '10\n20\n30\n40\n50\n' }))}\n\nThe for loop limits the attempts to five and the flag found tells the two endings apart.`,
  sol: 'Marks: a loop limited to five attempts, comparison with both messages, break on success, the final report using the flag, and both outputs.',
  scheme: [['Loop limited to 5 attempts', 1], ['Low and high messages', 1], ['break on success', 1], ['Final report using a flag', 1], ['Both outputs', 1]],
}));
const digProg = code('n = int(input())', 'total = 0', 'evens = 0', 'while n > 0:', '    d = n % 10', '    total += d', '    if d % 2 == 0:', '        evens += 1', '    n = n // 10', 'print(total, evens)');
const digRows = rowsOf(digitRowsSrc(7408));
Q('l_digits', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'Write a program that reads a whole number and prints the sum of its digits and how many of its digits are even. Dry run it for the input 7408 with a trace table, and give the output for 7408 and for 91357.',
  model: `${F(digProg)}\n\nTrace for 7408 (digit taken, sum so far, n left):\n\n${mdTable(['d', 'total', 'n'], digRows)}\n\nOutput for 7408: ${ic(pyOut(digProg, { stdin: '7408\n' }))}\n\nOutput for 91357: ${ic(pyOut(digProg, { stdin: '91357\n' }))}`,
  sol: 'Marks: input, the loop that peels digits, the sum, the even count, and the trace with both outputs.',
  scheme: [['Input and loop condition', 1], ['Digit taken and removed', 1], ['Sum and even count', 1], ['Trace table', 1], ['Both outputs', 1]],
}));

// ================================================================ case-based (4 marks)
const canteen = (bill, member) => code(`bill = ${bill}`, `member = ${member ? "True" : "False"}`, 'if bill >= 500:', '    if member:', '        discount = 100', '    else:', '        discount = 50', 'elif bill >= 200:', '    discount = 20', 'else:', '    discount = 0', 'print(bill - discount)');
const canteenNew = (bill, member) => code(`bill = ${bill}`, `member = ${member ? "True" : "False"}`, 'if bill >= 500:', '    if member:', '        discount = 100', '    else:', '        discount = 50', 'elif bill >= 200:', '    if member:', '        discount = 40', '    else:', '        discount = 20', 'else:', '    discount = 0', 'print(bill - discount)');
Q('cb_canteen', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the Rosewood School canteen and answer the questions. *(Imagined school and amounts, written by SOYL for practice.)*',
  passage: `The Rosewood School canteen gives a discount on the bill of a party order. A bill of 500 rupees or more earns 100 rupees off for a canteen member and 50 rupees off for others. A bill of 200 to 499 rupees earns 20 rupees off, and a smaller bill earns nothing. Pallavi writes this program.\n\n${F(canteen(640, true))}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'c', stem: 'What does the program print for the values shown (bill 640, member True)?', opts: distinct([ic('640'), ic('590'), outIc(canteen(640, true)), ic('620')]), sol: 'Since 640 is 500 or more and the buyer is a member, the discount is 100 and the amount printed is 640 minus 100.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The `if member:` test written inside the block of `if bill >= 500:` is a ___ if.', acc: [['nested']], sol: 'An if inside another if is a nested if; it is tested only when the outer condition is true.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Give the amount printed when member is False for the bills 199, 200 and 500.', model: `Bill 199 gives ${pyOut(canteen(199, false))}, bill 200 gives ${pyOut(canteen(200, false))} and bill 500 gives ${pyOut(canteen(500, false))}.`, sol: 'One mark for 199 and 200 and one for 500 with the correct branch.', scheme: [['199 and 200', 1], ['500', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Members should also get 40 rupees off a bill of 200 to 499 rupees. Rewrite the elif part and give the amount printed for a member with a bill of 350.', model: `${F('elif bill >= 200:', '    if member:', '        discount = 40', '    else:', '        discount = 20')}\n\nFor a member with a bill of 350 the program prints ${pyOut(canteenNew(350, true))}.`, sol: 'One mark for the nested if inside the elif and one for the value.', scheme: [['Nested if added', 1], ['Value for 350', 1]] }),
    ]),
  ],
}));
const bandSrc = (limit) => code('steps = [4200, 0, 8100, 3000, 9500]', 'days = 0', 'total = 0', 'for s in steps:', '    if s == 0:', '        continue', '    total += s', '    days += 1', `    if total >= ${limit}:`, '        break', 'print(days, total)');
const bandRows = rowsOf(code('steps = [4200, 0, 8100, 3000, 9500]', 'days = 0', 'total = 0', 'rows = []', 'for s in steps:', '    if s == 0:', '        continue', '    total += s', '    days += 1', '    rows.append([s, days, total])', '    if total >= 15000:', '        break', 'import json', 'print(json.dumps(rows))'));
Q('cb_band', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the fitness band of Ankit and answer the questions. *(Imagined readings, written by SOYL for practice.)*',
  passage: `Ankit\'s fitness band stores the steps walked on five days, and a 0 means that the band was not worn that day. His program adds up the readings that were recorded and stops as soon as the total reaches the 15000 step target.\n\n${F(bandSrc(15000))}`,
  parts: [
    child('a', mcq({ t: 2, d: 3, c: 'application', fixed: true, key: 'b', stem: 'What does the program print?', opts: distinct([ic('4 24800'), outIc(bandSrc(15000)), ic('5 24800'), ic('3 12300')]), sol: `The 0 reading is skipped by continue, and the total after the third recorded day is ${bandRows.at(-1)[2]}, which is 15000 or more, so break ends the loop with ${bandRows.at(-1)[1]} days counted.` })),
    child('b', tf({ t: 2, d: 3, c: 'understanding', ans: true, stem: 'True or false? If the `break` statement were removed, the loop would visit all five readings.', sol: 'Without break nothing ends the loop early, so all five readings are processed; only the 0 is skipped.' })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Trace the program: write the values of s, days and total after each pass that is not skipped.', model: mdTable(['s', 'days', 'total'], bandRows), sol: 'One mark for the first rows and one for the row where break happens.', scheme: [['Rows before the break', 1], ['Row where the loop stops', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Ankit raises his target to 20000 steps. Which line changes, and what does the program print now?', model: `Only the number in the condition changes: ${ic('if total >= 20000:')}.\n\nThe program now prints ${ic(pyOut(bandSrc(20000)))}, because the total reaches 20000 only with the last reading.`, sol: 'One mark for the changed line and one for the output.', scheme: [['Changed line', 1], ['Output', 1]] }),
    ]),
  ],
}));
const tankSrc = (start) => code(`level = ${start}`, 'hours = 0', 'while level < 100:', '    level = level + 30', '    if level > 100:', '        level = 100', '    hours += 1', '    print(hours, level)');
const tankLines = pyOut(tankSrc(15)).split('\n');
const tankLevels = tankLines.map((l) => l.split(' ')[1]);
Q('cb_tank', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the hostel water tank and answer the questions. *(Imagined hostel and figures, written by SOYL for practice.)*',
  passage: `A hostel tank is filled by a pump that adds 30 per cent of the tank in one hour. The warden's program reports the level after each hour until the tank is full (100 per cent), and the level never goes above 100.\n\n${F(tankSrc(15))}`,
  parts: [
    child('a', mcq({ t: 2, d: 3, c: 'application', fixed: true, key: 'a', stem: 'How many times does the body of the loop run when the starting level is 15?', opts: distinct([String(tankLines.length), '2', '4', '5']), sol: `The levels printed are ${tankLevels.join(', ')}; the last addition gives ${val(tankLevels[1] + ' + 30')}, which is capped to 100, and the test level < 100 is then false, so the body ran ${tankLines.length} times.` })),
    child('b', fb({ t: 2, d: 1, c: 'recall', stem: 'In the program, the statement `level = level + 30` is the ___ statement of the loop, which moves the condition towards false.', acc: [['update', 'increment']], sol: 'The update changes the loop variable so that the condition is eventually false.' })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write the output of the program when the starting level is 40.', model: `${O(pyOut(tankSrc(40)))}`, sol: 'One mark for the correct number of lines and one for the correct values.', scheme: [['Number of lines', 1], ['Values', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain what would happen if the line `hours += 1` were deleted, and what would happen if the line `level = level + 30` were deleted.', model: 'Deleting `hours += 1` does not change when the loop ends, but the hours printed stay at 0. Deleting `level = level + 30` leaves the condition true for ever, so the loop never ends.', sol: 'One mark for each effect.', scheme: [['hours deleted', 1], ['update deleted', 1]] }),
    ]),
  ],
}));

// ================================================================ items added in the completion pass
Q('m_flow_kinds', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Tushar\'s billing script runs its statements one after another, from the first line to the last, with no decision and no repetition. What is this kind of flow of control called?',
  opts: ['Sequential flow', 'Conditional flow (selection)', 'Iterative flow (repetition)', 'Nested flow'],
  sol: 'Statements executed in the order in which they are written make sequential flow. Conditional flow chooses between blocks with if, and iterative flow repeats a block with a loop.',
}));
const swapLines = (x, y) => [`    t = ${x}`, `    ${x} = ${y}`, `    ${y} = t`];
export const sortSrc = (a, b, c) => code(`a = ${a}`, `b = ${b}`, `c = ${c}`, 'if a > b:', ...swapLines('a', 'b'), 'if b > c:', ...swapLines('b', 'c'), 'if a > b:', ...swapLines('a', 'b'), 'print(a, b, c)');
Q('m_sort_three', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Dhruv arranges three quiz scores in increasing order with the program below. What does it print?\n\n${F(sortSrc(14, 9, 11))}`,
  opts: distinct([outIc(sortSrc(14, 9, 11)), ic('14 9 11'), ic('9 14 11'), ic('14 11 9')]),
  sol: 'Each if compares one pair and swaps it, using the helper variable t, when it is out of order. After the three comparisons the largest score has moved to c and the other two are in order, so the scores are printed in increasing order.',
}));
const divOpts = ['n % 4 == 0 and n % 6 == 0', 'n % 4 == 0 or n % 6 == 0', 'n / 4 == 0 and n / 6 == 0', 'n % 24 == 0'];
const divNs = [12, 8, 6, 24, 10];
const divRes = divOpts.map((e) => truths(e.replace(/\bn\b/g, 'x'), divNs));
if (divRes[0] !== 'T F F T F' || new Set(divRes).size !== 4) throw new Error(`divisible options: ${divRes}`);
Q('m_divisible', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In Janvi\'s school raffle, a ticket number n wins when it is a multiple of both 4 and 6. Which condition tests a variable `n` for this?',
  opts: divOpts.map(ic),
  sol: `Both remainders must be zero, so the two tests are joined by and. For the numbers ${divNs.join(', ')} this condition gives ${divRes[0]}; with or it gives ${divRes[1]}, the division test gives ${divRes[2]} for all of them because the quotient is never 0, and the last test misses 12.`,
}));
const tripleSrc = code('n = 1', 'while True:', '    n = n * 3', '    if n > 50:', '        break', 'print(n)');
Q('m_while_break', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Omar's number-growing program triples n again and again until it passes 50. What does it print once the loop is left?\n\n${F(tripleSrc)}`,
  opts: distinct([outIc(tripleSrc), ic('50'), ic(val('3 ** 3')), ic(val('3 ** 5'))]),
  sol: `The condition True never becomes false, so only break can end the loop. The values of n are ${listOf('[3 ** k for k in range(1, 5)]')}; the first one above 50 triggers break, and that value is printed, not 50.`,
}));
Q('m_loop_choose', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A teacher\'s program must keep asking for a mark until the user types a value from 0 to 100. Which statement about the best loop for this task is correct?',
  opts: ['A while loop, because the number of attempts is not known in advance', 'A for loop with range(), because the number of attempts is known', 'An if statement, because one decision is enough', 'A for loop over range(100), because there are 100 possible marks'],
  sol: 'The program must repeat while the typed mark is invalid, and nobody can say how many wrong marks will be typed first, so a condition-controlled while loop fits. A for loop suits a count that is known before the loop starts.',
}));

const absSrc = (x) => code(`x = ${x}`, 'if x < 0:', '    result = -x', 'else:', '    result = x', 'print(result)');
Q('s2_flow_types', short({
  t: [1, 2], d: 1, c: 'recall', marks: 2,
  stem: 'Name the three kinds of flow of control in a Python program, and give the Python statements that bring about the two kinds that go beyond plain sequence.',
  model: 'The three kinds are sequential flow (statements run in the order written), conditional flow (selection) and iterative flow (repetition).\n\nConditional flow is brought about by `if`, `if-else` and `if-elif-else`; iterative flow by the `for` loop and the `while` loop.',
  sol: 'One mark for the three kinds, one for the statements of the two kinds.',
  scheme: [['Three kinds named', 1], ['if statements and loops named', 1]],
}));
Q('s2_flowchart_abs', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Vihaan\'s calculator finds the absolute value of a number x. List the boxes of the flowchart for it, in order, naming the flowchart symbol of each box, and then show the matching Python program run for x equal to -7 and for x equal to 5.',
  model: `1. Oval: Start\n2. Parallelogram: Read x\n3. Diamond: Is x less than 0? (exits Yes and No)\n4. Rectangle on the Yes exit: result = -x\n5. Rectangle on the No exit: result = x\n6. Parallelogram: Print result (the two paths join here)\n7. Oval: End\n\n${F(absSrc(-7))}\n\nOutput for -7: ${ic(pyOut(absSrc(-7)))}; output for 5: ${ic(pyOut(absSrc(5)))}.`,
  sol: 'One mark for the boxes with their symbols and the two exits of the diamond, one for the program and its two outputs.',
  scheme: [['Boxes with symbols, diamond with Yes and No', 1], ['Program and both outputs', 1]],
}));
const divProg = code('n = int(input())', 'if n % 3 == 0 and n % 5 == 0:', '    print("Both")', 'elif n % 3 == 0:', '    print("Only 3")', 'elif n % 5 == 0:', '    print("Only 5")', 'else:', '    print("Neither")');
Q('s3_divisible', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Write a program that reads a whole number and prints whether it is divisible by both 3 and 5, by only 3, by only 5 or by neither. Show the output for the inputs 30, 9, 10 and 8.',
  model: `${F(divProg)}\n\nThe test for both must come first; otherwise 30 would be caught by the first single test.\n\n${mdTable(['Input', 'Output'], [30, 9, 10, 8].map((v) => [v, pyOut(divProg, { stdin: `${v}\n` })]))}`,
  sol: 'One mark for reading the number, one for the tests in a correct order and one for the four outputs.',
  scheme: [['Input of the number', 1], ['Chain of tests with both first', 1], ['Four outputs', 1]],
}));

const lockSrc = (stop) => code('red = 0', 'blue = 0', `for locker in range(1, ${stop}):`, '    if locker % 4 == 0 and locker % 6 == 0:', '        print(locker, "both")', '    elif locker % 4 == 0:', '        red += 1', '    elif locker % 6 == 0:', '        blue += 1', 'print(red, blue)');
const lockNest = (stop) => code('red = 0', 'blue = 0', `for locker in range(1, ${stop}):`, '    if locker % 4 == 0:', '        if locker % 6 == 0:', '            print(locker, "both")', '        else:', '            red += 1', '    elif locker % 6 == 0:', '        blue += 1', 'print(red, blue)');
const lockMoved = code('red = 0', 'blue = 0', 'for locker in range(1, 25):', '    if locker % 4 == 0:', '        red += 1', '    elif locker % 6 == 0:', '        blue += 1', '    elif locker % 4 == 0 and locker % 6 == 0:', '        print(locker, "both")', 'print(red, blue)');
const lockLast = pyOut(lockSrc(25)).split('\n').pop();
if (pyOut(lockNest(25)) !== pyOut(lockSrc(25)) || pyOut(lockMoved).includes('both') || pyOut(lockMoved) === lockLast) throw new Error('locker checks');
Q('cb_lockers', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the lockers of Sunrise School and answer the questions. *(Imagined school and lockers, written by SOYL for practice.)*',
  passage: `The lockers of Sunrise School are numbered 1 to 24. A locker whose number is a multiple of 4 gets a red tag and one whose number is a multiple of 6 gets a blue tag; a locker that is a multiple of both gets a gold tag. Nirmal's program prints the gold lockers and counts the red-only and blue-only lockers.\n\n${F(lockSrc(25))}`,
  parts: [
    child('a', mcq({ t: [1, 2], d: 3, c: 'application', fixed: true, key: 'd', stem: 'What is the last line printed by the program?', opts: distinct([ic(pyOut(lockMoved)), ic('4 4'), ic('2 4'), ic(lockLast)]), sol: 'The lockers 12 and 24 are caught by the first test and printed as both, so they are counted neither as red nor as blue; the remaining multiples of 4 and of 6 are counted by the two elif blocks and printed at the end.' })),
    child('b', tf({ t: 1, d: 3, c: 'analysis', ans: true, stem: 'True or false? If the test for both tags were moved to the end of the chain as a last elif, lockers 12 and 24 would be counted as red and the word both would never be printed.', sol: `A multiple of both 4 and 6 also passes the test for multiples of 4, which would then come first, so the last elif is never reached; a test run of that version prints only ${ic(pyOut(lockMoved))}.` })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write the exact output of the program when `range(1, 25)` is changed to `range(1, 14)`.', model: O(pyOut(lockSrc(14))), sol: 'One mark for the line of the gold locker and one for the final counts.', scheme: [['Gold locker line', 1], ['Final counts', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Rewrite the chain so that the test for multiples of 4 contains a nested if that separates the gold lockers from the red ones, and show the last line it prints for the original lockers 1 to 24.', model: `${F(lockNest(25))}\n\nThe last line printed is ${ic(pyOut(lockNest(25)).split('\n').pop())}, the same as before.`, sol: 'One mark for the nested if inside the first test and one for the output.', scheme: [['Nested if', 1], ['Output', 1]] }),
    ]),
  ],
}));
