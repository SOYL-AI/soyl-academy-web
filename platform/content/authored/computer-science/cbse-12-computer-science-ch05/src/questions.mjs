// CBSE 12 Computer Science, ch05 Data Structure: Stack — question bank. Every program, scenario and data value is
// written by SOYL (imagined people, shops and apps); no textbook, NCERT or board-paper program is reused (D-036).
// Every output stated anywhere in an item (code-output keys, MCQ options, solutions, model answers) is produced by
// running the code with Python 3 through runPy()/pyOut()/pyErr() in lib.mjs; nothing is typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

const S2 = [25, 50];
const S3 = [40, 75];
const L5 = [80, 160];
/** A Python code fence for stems, passages and model answers. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
export const code = (...lines) => lines.join('\n');
/** Inline code (single line only). */
export const ic = (s) => '`' + s + '`';
const outIc = (c, opts) => ic(pyOut(c, opts));
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
const assert = (cond, msg) => {
  if (!cond) throw new Error(`assertion failed: ${msg}`);
};

// ---------------------------------------------------------------- the standard stack functions used in the chapter
export const STACK_FNS = code(
  'def push(stk, item):',
  '    stk.append(item)',
  '',
  'def pop(stk):',
  '    if stk == []:',
  '        return "Underflow"',
  '    return stk.pop()',
  '',
  'def peek(stk):',
  '    if stk == []:',
  '        return None',
  '    return stk[-1]',
  '',
  'def is_empty(stk):',
  '    return stk == []',
);

// ================================================================ concept items
Q('m_lifo', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A stack works on which principle?',
  opts: ['Last In, First Out (LIFO)', 'First In, First Out (FIFO)', 'Smallest item out first', 'Items leave in random order'],
  sol: 'In a stack the item added most recently is the first one removed, like the top plate of a pile. FIFO describes a queue.',
}));
Q('m_top_end', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Rohan implements a stack with a Python list `stk`, using `append()` to push. Which element is the **top** of the stack?',
  opts: [ic('stk[-1]') + ', the last element', ic('stk[0]') + ', the first element', 'The middle element', 'The largest element'],
  sol: 'append() adds at the end of the list, so the end of the list is the top; stk[-1] is the item that will be popped next.',
}));
Q('m_push_method', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which list method is used to **push** an item onto a stack stored in a Python list?',
  opts: [ic('append()'), ic('insert(1, x)'), ic('extend()'), ic('remove()')],
  sol: 'append() adds one item at the end of the list, which is the top of the stack. extend() adds several items, remove() deletes by value.',
}));
const cSeq1 = code('stk = []', 'stk.append(4)', 'stk.append(9)', 'stk.pop()', 'stk.append(2)', 'print(stk[-1], len(stk))');
Q('m_top_after', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Values 4, 9 and 2 meet a pop on the way. What does this stack program print?\n\n${F(cSeq1)}`,
  opts: distinct([outIc(cSeq1), ic('9 2'), ic('2 3'), ic('4 1')]),
  sol: `After pushing 4 and 9, the pop removes 9; pushing 2 makes the stack [4, 2]. The top is 2 and there are 2 items, so it prints ${ic(pyOut(cSeq1))}.`,
}));
Q('m_underflow_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In stack terminology, **underflow** means',
  opts: ['trying to pop (or peek) from an empty stack', 'trying to push onto a full stack', 'pushing two items with the same value', 'popping the bottom item instead of the top'],
  sol: 'Underflow is an attempt to remove or read the top of a stack that has no items. Pushing onto a full, fixed-size stack is overflow.',
}));
Q('m_overflow_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A lift-ticket kiosk keeps tokens in a stack that can hold at most 50 tokens. **Overflow** occurs when',
  opts: ['a 51st token is pushed while 50 are already in the stack', 'a token is popped from an empty stack', 'two tokens are popped one after the other', 'the top token is read without removing it'],
  sol: 'Overflow is pushing onto a stack that is already full. It matters for fixed-size stacks; a Python list grows as needed, so in practice it does not overflow.',
}));
Q('m_peek_vs_pop', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How does the **peek** (top) operation differ from **pop**?',
  opts: ['Peek returns the top item but leaves it on the stack; pop removes it', 'Peek removes the bottom item; pop removes the top item', 'Peek adds an item; pop removes an item', 'There is no difference'],
  sol: 'Both look at the top, but only pop deletes it; after peek the size of the stack is unchanged.',
}));
Q('m_app_undo', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of these situations is best handled with a **stack**?',
  opts: ['The undo feature of a drawing app, which cancels the latest change first', 'Serving customers at a railway ticket window in the order they arrived', 'Printing documents in the order they were sent', 'Giving each player in a game a turn one after another in a circle'],
  sol: 'Undo must reverse the most recent action first, which is last in, first out. The other three serve the earliest arrival first, which needs a queue.',
}));
const cRevWord = code('word = "KOCHI"', 'stk = []', 'for ch in word:', '    stk.append(ch)', 'out = ""', 'while stk:', '    out = out + stk.pop()', 'print(out)');
Q('m_reverse_word', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `The word KOCHI is pushed letter by letter and popped into a new string. What is printed?\n\n${F(cRevWord)}`,
  opts: distinct([outIc(cRevWord), ic('KOCHI'), ic('IKOCH'), ic('HCIKO')]),
  sol: `The letters are pushed K, O, C, H, I and popped in reverse order, so the program prints ${ic(pyOut(cRevWord))}.`,
}));
Q('m_empty_check', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which expression correctly tests whether the stack `stk` (a list) is **empty**?',
  opts: [ic('len(stk) == 0'), ic('stk = []'), ic('stk[0] == None'), ic('stk.pop() == None')],
  sol: 'len(stk) == 0 (or stk == []) compares without changing anything. stk = [] is an assignment, not a test; stk[0] fails on an empty list; and calling pop() would remove an item.',
}));
const cPopEmpty = code('history = []', 'history.pop()');
const ERR_POP_EMPTY = pyErr(cPopEmpty);
Q('m_pop_empty_err', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `An empty browsing-history stack is popped. What happens when this code runs?\n\n${F(cPopEmpty)}`,
  opts: distinct([`It stops with ${ic(ERR_POP_EMPTY)}`, `It returns ${ic('None')} and carries on`, `It returns ${ic('0')}`, 'It creates an empty item and removes it']),
  sol: `pop() on an empty list does not return a value; Python raises ${ic(ERR_POP_EMPTY)}. That is why a pop function first checks for an empty stack (underflow).`,
}));
const cAllPop = code('stk = []', 'for n in range(1, 5):', '    stk.append(n * 10)', 'while stk != []:', '    print(stk.pop(), end=" ")');
Q('m_all_pop', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Multiples of 10 are pushed and then popped until the stack is empty. What is the output?\n\n${F(cAllPop)}`,
  opts: distinct([outIc(cAllPop), ic('10 20 30 40'), ic('40 30 20'), ic('10 40 20 30')]),
  sol: `The values 10, 20, 30 and 40 are pushed in that order and popped in reverse: ${ic(pyOut(cAllPop))}.`,
}));
// Which pop sequences are possible when 1, 2, 3 are pushed in order (pops allowed in between)? Computed by search.
const cFeasible = code(
  'from itertools import permutations',
  'def possible(seq):',
  '    stk, nxt = [], 1',
  '    for want in seq:',
  '        while nxt <= 3 and (stk == [] or stk[-1] != want):',
  '            stk.append(nxt)',
  '            nxt += 1',
  '        if stk == [] or stk[-1] != want:',
  '            return False',
  '        stk.pop()',
  '    return True',
  'bad = [" ".join(map(str, p)) for p in permutations([1, 2, 3]) if not possible(p)]',
  'good = [" ".join(map(str, p)) for p in permutations([1, 2, 3]) if possible(p)]',
  'print("|".join(bad))',
  'print("|".join(good))',
);
const [BAD_LINE, GOOD_LINE] = pyOut(cFeasible).split('\n');
const BAD = BAD_LINE.split('|');
const GOOD = GOOD_LINE.split('|');
assert(BAD.length === 1 && BAD[0] === '3 1 2', `only 3 1 2 is impossible, got ${BAD_LINE}`);
Q('m_not_possible', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'The numbers 1, 2 and 3 are pushed onto an empty stack **in this order**. A pop may be done at any time between the pushes. Which order of popped values is **NOT** possible?',
  opts: distinct([BAD[0], GOOD.find((g) => g === '2 3 1'), GOOD.find((g) => g === '1 3 2'), GOOD.find((g) => g === '3 2 1')]),
  sol: `To pop 3 first, 1 and 2 must both still be in the stack with 2 on top, so the next pop must give 2, not 1. All the other orders can be produced (the possible orders are ${GOOD.join(', ')}).`,
}));
// Postfix evaluation with a stack.
export const POSTFIX_FN = code(
  'def eval_postfix(expr):',
  '    stk = []',
  '    for tok in expr.split():',
  '        if tok.isdigit():',
  '            stk.append(int(tok))',
  '        else:',
  '            b = stk.pop()',
  '            a = stk.pop()',
  '            if tok == "+":',
  '                stk.append(a + b)',
  '            elif tok == "-":',
  '                stk.append(a - b)',
  '            elif tok == "*":',
  '                stk.append(a * b)',
  '            else:',
  '                stk.append(a // b)',
  '    return stk.pop()',
);
const cPost1 = code(POSTFIX_FN, 'print(eval_postfix("6 2 3 + *"))');
Q('m_postfix', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Using a stack, what is the value of the postfix expression `6 2 3 + *`?',
  opts: distinct([pyOut(cPost1), '15', '36', '11']),
  sol: `Push 6, 2 and 3. At + pop 3 and 2 and push 5; at * pop 5 and 6 and push 30. The final value is ${pyOut(cPost1)} (in infix, 6 * (2 + 3)).`,
}));
// Bracket matching with a stack.
export const BAL_FN = code(
  'def balanced(text):',
  '    pairs = {")": "(", "]": "[", "}": "{"}',
  '    stk = []',
  '    for ch in text:',
  '        if ch in "([{":',
  '            stk.append(ch)',
  '        elif ch in ")]}":',
  '            if stk == [] or stk.pop() != pairs[ch]:',
  '                return False',
  '    return stk == []',
);
const BAL_CANDIDATES = ['(a[b]{c})', '(a[b)]', '((a)', 'a}{b'];
const balOut = pyOut(code(BAL_FN, `for t in ${JSON.stringify(BAL_CANDIDATES)}:`, '    print(balanced(t))')).split('\n');
assert(balOut.join(',') === 'True,False,False,False', `balanced results ${balOut}`);
Q('m_bracket', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A stack-based checker pushes every opening bracket and, for every closing bracket, pops and compares. Which expression does it report as **balanced**?',
  opts: BAL_CANDIDATES.map(ic),
  sol: 'Only (a[b]{c}) closes each bracket in reverse order of opening. In (a[b)] the ) meets [ on top; ((a) leaves one ( in the stack; and in a}{b the } arrives when the stack is empty.',
}));
Q('m_call_stack', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Function `report()` calls `total()`, which calls `tax()`. In what order do these three functions **finish**?',
  opts: ['tax(), then total(), then report()', 'report(), then total(), then tax()', 'total(), then tax(), then report()', 'All three finish at the same time'],
  sol: 'Python keeps active calls on a call stack. tax() was called last, so it is on top and finishes first; control then returns to total() and finally to report().',
}));
const cDictPush = code('marks = {"Anu": 82, "Babu": 64, "Chitra": 91, "Dev": 70}', 'stk = []', 'for name in marks:', '    if marks[name] >= 70:', '        stk.append(name)', 'print(stk.pop(), stk)');
Q('m_dict_push', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Names with marks of 70 or more are pushed from a dictionary, then one is popped. What is printed?\n\n${F(cDictPush)}`,
  opts: distinct([outIc(cDictPush), ic("Dev ['Anu', 'Babu', 'Chitra']"), ic("Chitra ['Anu', 'Dev']"), ic("Anu ['Chitra', 'Dev']")]),
  sol: `Names are pushed in insertion order when the mark is at least 70: Anu, Chitra, Dev (Babu has 64). Popping removes Dev, the last pushed, so it prints ${ic(pyOut(cDictPush))}.`,
}));
Q('m_pop_returns', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'After `x = stk.pop()` runs on a non-empty list `stk`, what does `x` hold?',
  opts: ['The item that was at the top, now removed from stk', 'The new length of stk', 'The bottom item of stk', 'A copy of the whole stack'],
  sol: 'list.pop() with no argument removes and returns the last item, which is the top of the stack.',
}));
const cFront = code('stk = []', 'for v in [5, 8, 1]:', '    stk.insert(0, v)', 'print(stk.pop(0), stk)');
Q('m_front_top', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Meera pushes with \`insert(0, item)\` and pops with \`pop(0)\`. What does this print, and is it still a stack?\n\n${F(cFront)}`,
  opts: distinct([`${ic(pyOut(cFront))}; yes, the top is at index 0`, `${ic('5 [8, 1]')}; no, it behaves like a queue`, `${ic('1 [5, 8]')}; yes, the top is at index -1`, `${ic('8 [1, 5]')}; no, items are lost`]),
  sol: `Each new item goes to the front, and pop(0) takes from the front, so the last item in (1) comes out first: ${ic(pyOut(cFront))}. It is still LIFO, only with the top at index 0; append() and pop() at the end are simpler and faster.`,
}));
Q('m_peek_code', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which body correctly completes a **peek** function for a non-empty stack `stk`?',
  opts: [ic('return stk[-1]'), ic('return stk.pop()'), ic('return stk[0]'), ic('stk.append(stk[-1])')],
  sol: 'stk[-1] reads the top without removing it. pop() would remove it, stk[0] is the bottom, and append would add a duplicate.',
}));
// Browser back button.
const cBack = code('pages = []', 'for p in ["home", "news", "sports", "scores"]:', '    pages.append(p)', 'pages.pop()', 'pages.pop()', 'print(pages[-1])');
Q('m_browser_back', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A browser pushes each page onto a history stack when it is opened: home, news, sports, scores (the last one is on screen). Pressing **Back** pops the current page. After pressing Back **twice**, which page is on screen?',
  opts: distinct([pyOut(cBack), 'sports', 'home', 'scores']),
  sol: `The two Back presses pop scores and then sports, leaving news on top of the stack (checked by running the history as a list: ${ic(pyOut(cBack))}).`,
}));
Q('m_list_suits', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why is a Python list a convenient way to implement a stack?',
  opts: ['append() and pop() work at the same end of the list and the list grows as needed', 'A list can only add items at the front', 'A list keeps its items sorted automatically', 'A list cannot hold duplicate values'],
  sol: 'A stack needs insertion and deletion at one end only; append() and pop() both work at the end of a list, and lists resize themselves, so there is no fixed size.',
}));
const cSize = code('stk = [3, 6]', 'stk.append(9)', 'stk.append(stk[-1] + stk[0])', 'stk.pop()', 'stk.append(len(stk))', 'print(stk)');
Q('m_size_track', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A stack of 3 and 6 grows, shrinks and then has its own size pushed. What is printed?\n\n${F(cSize)}`,
  opts: distinct([outIc(cSize), ic('[3, 6, 9, 12, 4]'), ic('[3, 6, 9, 4]'), ic('[3, 6, 12, 3]')]),
  sol: `9 is pushed, then 9 + 3 = 12 is pushed and immediately popped; len(stk) is then 3, which is pushed: ${ic(pyOut(cSize))}.`,
}));
Q('m_bottom', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Five books are piled one at a time on a table and taken only from the top. Which book is removed **last**?',
  opts: ['The first book placed on the table', 'The fifth book placed', 'The heaviest book', 'The third book placed'],
  sol: 'The first item pushed sits at the bottom of the stack, so it is popped last.',
}));
Q('m_overflow_python', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why do most CBSE stack programs check for **underflow** but not for overflow?',
  opts: ['A Python list grows as needed, so pushing never fills it, but popping an empty list raises an error', 'Python lists have a fixed size of 100 items', 'Overflow is checked automatically by append()', 'Underflow can never happen with a list'],
  sol: 'Overflow only arises when the stack has a fixed capacity. A list has no such limit in normal use, but pop() on an empty list raises an IndexError, so underflow must be handled.',
}));
// Binary conversion with a stack.
export const cBinary = code(
  'def to_binary(n):',
  '    stk = []',
  '    while n > 0:',
  '        stk.append(n % 2)',
  '        n = n // 2',
  '    bits = ""',
  '    while stk:',
  '        bits = bits + str(stk.pop())',
  '    return bits',
  'print(to_binary(19), to_binary(40))',
);
Q('m_binary', mcq({
  t: 1, d: 3, c: 'application',
  stem: `This function converts 19 and 40 to binary by pushing remainders onto a stack. What does it print?\n\n${F(cBinary)}`,
  opts: distinct([outIc(cBinary), ic('11001 000101'), ic('10011 101'), ic('1001 10100')]),
  sol: `Remainders come out in reverse order of their calculation, which gives the binary digits from the left: ${ic(pyOut(cBinary))}.`,
}));
Q('m_display_order', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A display function for a stack prints the elements from **top to bottom**. For a list `stk`, which loop does this?',
  opts: [ic('for i in range(len(stk) - 1, -1, -1): print(stk[i])'), ic('for i in range(len(stk)): print(stk[i])'), ic('for i in range(0, -1, -1): print(stk[i])'), ic('for i in range(len(stk), 0): print(stk[i])')],
  sol: 'The top is the last index, len(stk) - 1, so the loop must count down to 0; range(len(stk) - 1, -1, -1) does exactly that.',
}));

// ================================================================ assertion-reason
Q('ar_undo', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'The undo feature of a text editor can be implemented with a stack.',
  r: 'Undo must cancel the most recent change first, and a stack removes the most recently added item first.',
  sol: 'Both are true, and the LIFO order in R is exactly why a stack suits undo.',
}));
Q('ar_append_top', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'In a list-based stack, append() is used for the push operation.',
  r: 'append() adds an item at the end of the list, and that end is treated as the top of the stack.',
  sol: 'Both are true and R explains A: the end of the list is the top, and append() works at that end.',
}));
Q('ar_overflow_list', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'A stack implemented with a Python list overflows after a few hundred pushes.',
  r: 'A Python list grows dynamically as items are appended.',
  sol: 'A is false: a list keeps growing as long as memory allows. R is true, and it is the reason list stacks do not overflow in normal programs.',
}));
Q('ar_pop_none', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: `Calling pop() on an empty list raises an error.`,
  r: 'pop() returns None when the list is empty.',
  sol: `A is true: Python raises ${ic(ERR_POP_EMPTY)}. R is false; pop() never returns None for an empty list, it raises the error instead.`,
}));
Q('ar_peek_size', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'The peek operation does not change the number of items in a stack.',
  r: 'Peek only reads the top item, for example as stk[-1], without deleting it.',
  sol: 'Both are true, and R explains A: reading stk[-1] leaves the list unchanged.',
}));
Q('ar_printer', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'The jobs waiting at a shared office printer are best kept in a stack.',
  r: 'In a stack, the item inserted last is the first to be removed.',
  sol: 'A is false: printer jobs should be printed in the order they arrive, which needs a queue (FIFO). R is true as a description of a stack, which is why a stack would be unfair here.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_push_top', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? In a stack, both insertion and deletion take place at the same end, called the top.',
  sol: 'A stack has one open end, the top; push and pop both work there.',
}));
const cPeekLen = code(STACK_FNS, 'stk = [7, 3]', 'peek(stk)', 'peek(stk)', 'print(len(stk))');
Q('tf_peek_len', tf({
  t: 1, d: 2, c: 'application', ans: false,
  stem: `True or false? After the code below runs, the stack has no items left.\n\n${F('stk = [7, 3]', 'peek(stk)', 'peek(stk)', 'print(len(stk))')}\n\n(\`peek\` returns \`stk[-1]\` when the stack is not empty.)`,
  sol: `Peek never removes items, so the stack still holds both: the program prints ${ic(pyOut(cPeekLen))}.`,
}));
Q('tf_queue', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? A stack is a First In, First Out (FIFO) structure.',
  sol: 'A stack is Last In, First Out (LIFO); FIFO describes a queue.',
}));
Q('fb_lifo', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The principle followed by a stack is abbreviated ___.',
  acc: [['LIFO', 'Last In First Out', 'Last In, First Out']],
  sol: 'LIFO: Last In, First Out.',
}));
Q('fb_underflow', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'Trying to pop from an empty stack is called ___, and pushing onto a full fixed-size stack is called ___.',
  acc: [['underflow'], ['overflow']],
  sol: 'Removing from an empty stack is underflow; adding to a full one is overflow.',
}));
Q('fb_pop_method', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In a list-based stack, the list method ___ removes and returns the top item.',
  acc: [['pop', 'pop()']],
  sol: 'pop() with no argument removes and returns the last item, the top.',
}));
Q('mt_ops', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each stack operation with the Python code that performs it on the list `stk`.',
  pairs: [
    ['Push the value x', ic('stk.append(x)')],
    ['Pop the top item', ic('stk.pop()')],
    ['Peek at the top item', ic('stk[-1]')],
    ['Check for an empty stack', ic('stk == []')],
  ],
  sol: 'append adds at the top, pop removes it, index -1 reads it, and comparing with [] tests for emptiness.',
}));
Q('mt_apps', match({
  t: 1, d: 3, c: 'understanding',
  stem: 'Match each task with the reason a stack is used for it.',
  pairs: [
    ['Reversing the letters of a name', 'Letters come out in the opposite order to how they went in'],
    ['Checking brackets in an expression', 'Each closing bracket must match the latest unmatched opening one'],
    ['Returning from nested function calls', 'The function called last must finish first'],
    ['Back button of a browser', 'The page opened most recently is the first to leave'],
  ],
  sol: 'Each task depends on processing the most recent item first, the defining property of a stack.',
}));
Q('ord_pop_fn', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps of a safe **pop** function for a list-based stack in the correct order.',
  items: [
    'Receive the stack as a parameter',
    'Check whether the stack is empty',
    'If it is empty, report underflow and stop',
    'Otherwise remove the last item with pop() and return it',
  ],
  sol: 'A pop function must test for emptiness before calling pop(), otherwise an empty list raises an IndexError.',
}));

// ================================================================ code-output items
Q('co_seq', co({
  pre: "Letters A, B and C are pushed onto a stack and one is popped before D arrives. Write the exact output.",
  t: 1, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code('stk = []', 'stk.append("A")', 'stk.append("B")', 'stk.append("C")', 'stk.pop()', 'stk.append("D")', 'print(stk)'),
  sol: 'C is pushed and then popped straight away, so D takes its place on top of A and B.',
}));
const cPops = code('stk = [12, 7, 30]', 'a = stk.pop()', 'stk.append(a + 1)', 'b = stk.pop()', 'c = stk.pop()', 'print(a, b, c, stk)');
Q('co_pops', co({
  pre: "Three pops and one push change the stack [12, 7, 30]. Write the exact values of a, b, c and the stack printed.",
  t: 1, d: 2, c: 'application', marks: 2,
  code: cPops,
  sol: `30 is popped into a and 31 pushed; b then pops that 31 and c pops 7, leaving [12]. Output: ${ic(pyOut(cPops))}.`,
}));
Q('co_reverse_city', co({
  pre: "The letters of PUNE are popped one by one from a stack built with list(). Write the exact output.",
  t: 1, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code('stk = list("PUNE")', 'rev = ""', 'while len(stk) > 0:', '    rev += stk.pop()', 'print(rev, len(stk))'),
  sol: 'list("PUNE") holds the letters with E on top; popping all of them builds the reversed word, and the stack ends empty.',
}));
const cDisplay = code(
  'def display(stk):',
  '    if stk == []:',
  '        print("Stack empty")',
  '        return',
  '    print(stk[-1], "<- top")',
  '    for i in range(len(stk) - 2, -1, -1):',
  '        print(stk[i])',
  '',
  'tray = [15, 40, 25]',
  'display(tray)',
  'tray.clear()',
  'display(tray)',
);
Q('co_display', co({
  pre: "A display function prints a tray stack from the top down, then is called again after the stack is cleared. Write the exact output.",
  t: 1, d: 3, c: 'application', marks: 2,
  code: cDisplay,
  sol: 'The first call prints the top (index -1) with a marker and then the rest from index 1 down to 0; after clear() the second call finds the stack empty.',
}));
const cBal3 = code(BAL_FN, 'print(balanced("{[2 + 3] * (4 - 1)}"))', 'print(balanced("(7 + [2 * 5)]"))', 'print(balanced("((8)"))');
Q('co_balanced', co({
  pre: "A stack-based bracket checker is tested on three arithmetic expressions. Write the exact output.",
  t: 1, d: 3, c: 'application', marks: 2,
  code: cBal3,
  sol: 'The first expression closes every bracket in reverse order. In the second, ) arrives while [ is on top. In the third one ( is left in the stack at the end.',
}));
const cPost2 = code(POSTFIX_FN, 'print(eval_postfix("8 2 - 3 *"), eval_postfix("9 3 // 4 +"), eval_postfix("20 4 5 * -"))');
Q('co_postfix', co({
  t: 1, d: 4, c: 'analysis', marks: 3, time: 180,
  pre: 'The function below evaluates a postfix expression whose tokens are separated by spaces (`//` is used for division). Write the exact output.',
  code: cPost2,
  sol: `For each operator the function pops b (the top) and then a, and pushes a op b. So 8 2 - 3 * is (8 - 2) * 3; 9 3 // 4 + is 9 // 3 + 4; and 20 4 5 * - is 20 - 4 * 5. Output: ${ic(pyOut(cPost2))}.`,
}));
Q('co_peek_fn', co({
  pre: "The standard push, pop and peek functions are used on a stack that starts empty. Write the exact output.",
  t: 1, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code(STACK_FNS, '', 's = []', 'print(peek(s), pop(s))', 'push(s, 8)', 'push(s, 11)', 'print(peek(s), pop(s), peek(s))'),
  sol: 'On the empty stack peek gives None and pop reports Underflow. After pushing 8 and 11, peek reads 11, pop removes 11, and the next peek reads 8.',
}));
Q('co_even_push', co({
  pre: "Even numbers from a list are pushed onto a stack and then popped with a hash separator. Write the exact output.",
  t: 1, d: 3, c: 'application', marks: 2,
  code: code('nums = [14, 9, 22, 35, 6, 17]', 'stk = []', 'for n in nums:', '    if n % 2 == 0:', '        stk.append(n)', 'while stk:', '    print(stk.pop(), end=" # ")', 'print()', 'print("Empty:", stk == [])'),
  sol: 'Only the even numbers 14, 22 and 6 are pushed; they are popped in reverse order, each followed by " # ", and the final line confirms the stack is empty.',
}));
Q('co_dict_items', co({
  pre: "Stationery items with fewer than 10 in stock are pushed as (item, quantity) tuples. Write the exact output.",
  t: 1, d: 3, c: 'application', marks: 2,
  code: code('stock = {"pens": 40, "files": 8, "rulers": 15, "clips": 3}', 'low = []', 'for item, qty in stock.items():', '    if qty < 10:', '        low.append((item, qty))', 'print(low[-1])', 'print(len(low), low.pop()[0], low)'),
  sol: 'files (8) and clips (3) are below 10 and are pushed as tuples in dictionary order. low[-1] is the clips tuple; then pop removes it and [0] picks its name, leaving only the files tuple.',
}));
Q('co_two_stacks', co({
  pre: "Every item of stack a is moved onto stack b one pop at a time. Write the exact output.",
  t: 1, d: 3, c: 'analysis', marks: 2,
  code: code('a = [1, 2, 3, 4]', 'b = []', 'while a:', '    b.append(a.pop())', 'print(a, b)', 'print(b.pop(), b[-1])'),
  sol: 'Moving every item from one stack to another reverses the order, so b becomes [4, 3, 2, 1] with 1 on top. Popping b gives 1, and the new top is 2.',
}));
Q('co_calls', co({
  t: 1, d: 4, c: 'analysis', marks: 2,
  pre: 'Python keeps active function calls on a call stack. Write the exact output of this program.',
  code: code('def tax():', '    print("enter tax")', '    print("leave tax")', '', 'def total():', '    print("enter total")', '    tax()', '    print("leave total")', '', 'def report():', '    print("enter report")', '    total()', '    print("leave report")', '', 'report()'),
  sol: 'Each call is pushed when it starts; the most recent call (tax) is completed and popped first, so the "leave" lines appear in reverse order of the "enter" lines.',
}));
Q('co_binary', co({
  pre: "A function pushes the remainders of 13 divided repeatedly by 2 and then pops them. Write the exact output.",
  t: 1, d: 3, c: 'application', marks: 2,
  code: code('def to_binary(n):', '    stk = []', '    while n > 0:', '        stk.append(n % 2)', '        n = n // 2', '    print(stk)', '    out = ""', '    while stk:', '        out += str(stk.pop())', '    return out', '', 'print(to_binary(13))'),
  sol: 'The remainders are pushed in the order they are found (least significant bit first); popping them gives the binary digits from the left.',
}));
Q('co_undo', co({
  pre: "An editor saves the old text on an undo stack before each word is typed, then undoes twice. Write the exact output.",
  t: 1, d: 3, c: 'application', marks: 2,
  code: code('text = ""', 'undo = []', 'for word in ["Good", " morning", " class"]:', '    undo.append(text)', '    text = text + word', 'text = undo.pop()', 'text = undo.pop()', 'print(repr(text), len(undo))'),
  sol: 'Before each word is added, the old text is saved on the undo stack. Two undo steps restore the text as it was before " morning" was typed, and one saved state remains.',
}));
Q('co_len_loop', co({
  pre: "Unique letters of the word STACK are pushed, and one print statement pops and measures the stack. Write the exact output.",
  t: 1, d: 4, c: 'analysis', marks: 1, time: 90,
  code: code('stk = []', 'for ch in "STACK":', '    if ch not in stk:', '        stk.append(ch)', 'print(stk, stk.pop(), len(stk))'),
  sol: 'S, T, A, C and K are pushed (each letter is new). All three arguments are evaluated before anything is printed: the first is the list object itself, which pop() then shortens by removing K, so the list shown no longer contains K, and len() counts the four letters left.',
}));

// ================================================================ short answers (2 marks)
Q('s_define', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a stack? Name its two basic operations.',
  model: 'A **stack** is a linear data structure in which items are added and removed at only **one end, the top**, so the last item added is the first removed (**LIFO**). Its basic operations are **push** (add an item at the top) and **pop** (remove the top item).',
  sol: 'One mark for the meaning with LIFO and the top; one mark for naming push and pop.',
  scheme: [['Meaning with LIFO / top', 1], ['Push and pop named', 1]],
}));
Q('s_over_under', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between overflow and underflow in a stack. Which of the two must a Python list-based stack program check for?',
  model: '**Overflow**: pushing onto a stack that is already full (fixed capacity). **Underflow**: popping or peeking when the stack is empty. A Python list grows as needed, so the program must check for **underflow** before calling `pop()`.',
  sol: 'Define both conditions and say that underflow is the one to check with a list.',
  scheme: [['Both conditions defined', 1], ['Underflow identified as the check for a list', 1]],
}));
const cErrPop = code('def pop_item(stk):', '    item = stk.pop()', '    return item', '', 'orders = []', 'print(pop_item(orders))');
const cErrPopFix = code('def pop_item(stk):', '    if stk == []:', '        return "Underflow"', '    return stk.pop()', '', 'orders = []', 'print(pop_item(orders))');
Q('s_err_pop', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: `Kabir's function stops with an error when the stack is empty. Name the error and rewrite the function so that it reports underflow instead.\n\n${F(cErrPop)}`,
  model: `**Error:** ${ic(pyErr(cErrPop))}, because \`pop()\` is called on an empty list.\n\n${F(cErrPopFix)}\n\nOutput: ${ic(pyOut(cErrPopFix))}`,
  sol: 'Name the IndexError and add an empty-stack test before pop().',
  scheme: [['Error named with its reason', 1], ['Correct underflow check', 1]],
}));
const cErrPush = code('stack = []', 'stack.push(25)', 'print(stack)');
const cErrPushFix = code('stack = []', 'stack.append(25)', 'print(stack)');
Q('s_err_push', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: `Find the error in this code, give the message Python shows, and correct it.\n\n${F(cErrPush)}`,
  model: `Python lists have no \`push()\` method, so it stops with ${ic(pyErr(cErrPush))}.\n\n${F(cErrPushFix)}\n\nOutput: ${ic(pyOut(cErrPushFix))}`,
  sol: 'A list-based stack pushes with append().',
  scheme: [['Error identified with the message', 1], ['Corrected with append()', 1]],
}));
Q('s_apps', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two real-life or computing applications of a stack and say in one line why a stack suits each.',
  model: '1. **Undo in an editor:** the latest change must be cancelled first (LIFO).\n2. **Checking brackets in an expression:** each closing bracket must match the most recent unmatched opening bracket.\n(Also: browser back button, reversing a string, function calls.)',
  sol: 'Any two correct applications, each with the LIFO reason.',
  scheme: [['First application with reason', 1], ['Second application with reason', 1]],
}));
const cPeekFn = code('def peek(stk):', '    if len(stk) == 0:', '        return None', '    return stk[-1]', '', 'print(peek([4, 9, 16]), peek([]))');
Q('s_peek_fn', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Write a function `peek(stk)` that returns the top element of the stack `stk` (a list) without removing it, and returns `None` if the stack is empty.',
  model: `${F(cPeekFn)}\n\nOutput: ${ic(pyOut(cPeekFn))}`,
  sol: 'Test for an empty list first, then return stk[-1] without popping.',
  scheme: [['Empty check returning None', 1], ['Returns stk[-1] without removing', 1]],
}));
const cIsEmpty = code('def is_empty(stk):', '    return len(stk) == 0', '', 'print(is_empty([]), is_empty(["x"]))');
Q('s_isempty', short({
  t: 1, d: 1, c: 'understanding', marks: 2,
  stem: 'Write a function `is_empty(stk)` that returns `True` if the stack is empty and `False` otherwise. Show what it returns for `[]` and `["x"]`.',
  model: `${F(cIsEmpty)}\n\nOutput: ${ic(pyOut(cIsEmpty))}`,
  sol: 'Return the result of comparing the length with 0 (or stk == []).',
  scheme: [['Correct comparison', 1], ['Correct results shown', 1]],
}));
Q('s_why_check', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A pop function written as `if stk == []: print("Underflow")` followed by `return stk.pop()` on the next line (not inside an else) still crashes on an empty stack. Explain why and fix it.',
  model: 'After printing "Underflow" the function does not stop, so the next line still calls `stk.pop()` on the empty list and raises an **IndexError**. Fix: put `return` (or `return None`) right after the message, or place the pop in an `else` block.',
  sol: 'The function must leave (return) after detecting underflow.',
  scheme: [['Reason: execution continues to pop()', 1], ['Correct fix', 1]],
}));

// ================================================================ short answers (3 marks)
const cTrace = code(
  'import json',
  'stk, rows = [], []',
  'ops = [("push", 5), ("push", 12), ("pop", None), ("push", 7), ("push", 3), ("pop", None)]',
  'for op, v in ops:',
  '    if op == "push":',
  '        stk.append(v)',
  '        rows.append(["push " + str(v), str(stk), "-"])',
  '    else:',
  '        x = stk.pop()',
  '        rows.append(["pop", str(stk), str(x)])',
  'print(json.dumps(rows))',
);
export const TRACE_ROWS = JSON.parse(pyOut(cTrace));
Q('s3_trace', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Starting from an empty stack, show the contents of the stack (bottom to top, as a Python list) after each operation, and the value returned by each pop: push 5, push 12, pop, push 7, push 3, pop.',
  model: `| Operation | Stack after it | Popped |\n|---|---|---|\n${TRACE_ROWS.map((r) => `| ${r[0]} | \`${r[1]}\` | ${r[2]} |`).join('\n')}`,
  sol: 'Push adds at the right end of the list; pop removes and returns the rightmost item.',
  scheme: [['Stacks after the pushes', 1], ['Stacks after the pops', 1], ['Popped values 12 and 3', 1]],
}));
const cRevFn = code('def reverse_text(text):', '    stk = []', '    for ch in text:', '        stk.append(ch)', '    result = ""', '    while stk != []:', '        result = result + stk.pop()', '    return result', '', 'print(reverse_text("Mysuru 2026"))');
Q('s3_reverse_fn', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Write a function `reverse_text(text)` that uses a stack (a list) to return the string reversed. Show its result for "Mysuru 2026". (Do not use slicing.)',
  model: `${F(cRevFn)}\n\nOutput: ${ic(pyOut(cRevFn))}`,
  sol: 'Push every character, then pop them all into a new string.',
  scheme: [['Every character pushed', 1], ['Characters popped into a new string', 1], ['Returned and correct result', 1]],
}));
const cErrDisp = code('def show(stk)', '    for i in range(len(stk) - 1, -1, -1)', '        print(stk[i]', '', 'show([2, 4, 6])');
const cErrDispFix = code('def show(stk):', '    for i in range(len(stk) - 1, -1, -1):', '        print(stk[i])', '', 'show([2, 4, 6])');
Q('s3_err_display', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: `Simran's function should display a stack from top to bottom, but it has three errors. Rewrite it correctly and give its output.\n\n${F(cErrDisp)}`,
  model: `Python stops at the first one: ${ic(pyErr(cErrDisp))}.\n\n1. Colon missing after the \`def\` header.\n2. Colon missing after the \`for\` header.\n3. Closing bracket missing in \`print\`.\n\n${F(cErrDispFix)}\n\nOutput:\n\n${F(pyOut(cErrDispFix))}`,
  sol: 'One mark for each error found and corrected.',
  scheme: [['def colon', 1], ['for colon', 1], ['print bracket', 1]],
}));
Q('s3_list_vs_fixed', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A school app keeps the last 20 messages a student opened in a stack of fixed size 20, implemented with a list. Explain when overflow and underflow can happen, and what the program should do in each case.',
  model: '1. **Overflow** happens when a 21st message is pushed while 20 are stored; the program should check `len(stk) == 20` before pushing and either refuse the push with a message or remove the oldest entry first.\n2. **Underflow** happens when the student presses back with no messages stored; the program must check `stk == []` before `pop()` and show "No more messages".\n3. Without these checks the list would grow past 20, or `pop()` would raise an IndexError.',
  sol: 'Both conditions with the matching check and action.',
  scheme: [['Overflow with check and action', 1], ['Underflow with check and action', 1], ['Consequence of not checking', 1]],
}));
Q('s3_not_possible', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'The letters P, Q and R are pushed in this order onto an empty stack, and pops may happen at any time in between. Can the pop order **R, P, Q** be produced? Explain with the stack contents.',
  model: `**No.** To pop R first, P and Q must already be in the stack: \`['P', 'Q', 'R']\`. After R is popped the stack is \`['P', 'Q']\` with **Q on top**, so the next pop must give Q, not P. (The same reasoning shows that ${BAD[0]} is the only impossible order of 1, 2, 3.)`,
  sol: 'Show the stack after R is popped and note that Q is on top.',
  scheme: [['Correct answer: not possible', 1], ['Stack before popping R', 1], ['Q on top, so P cannot come next', 1]],
}));
const cBinTrace = code('import json', 'n, rows, stk = 22, [], []', 'while n > 0:', '    stk.append(n % 2)', '    rows.append([str(n), str(n % 2), str(stk)])', '    n = n // 2', 'print(json.dumps(rows))');
const BIN_ROWS = JSON.parse(pyOut(cBinTrace));
const BIN22 = pyOut(code(cBinary.replace('print(to_binary(19), to_binary(40))', ''), 'print(to_binary(22))'));
Q('s3_binary_dry', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Do a dry run of \`to_binary(22)\` for the function below. Show n, the remainder pushed and the stack after each pass, and the value returned.\n\n${F(cBinary.replace('\nprint(to_binary(19), to_binary(40))', ''))}`,
  model: `| n | n % 2 pushed | Stack |\n|---|---|---|\n${BIN_ROWS.map((r) => `| ${r[0]} | ${r[1]} | \`${r[2]}\` |`).join('\n')}\n\nPopping from the top gives **${BIN22}**.`,
  sol: 'Each pass pushes the remainder and halves n; popping reverses the remainders.',
  scheme: [['Correct n values', 1], ['Correct stack after each pass', 1], ['Correct result', 1]],
}));

// ================================================================ long answers (5 marks)
const cPushMarks = code(
  'def push_toppers(scores, stk):',
  '    for name in scores:',
  '        if scores[name] >= 75:',
  '            stk.append(name)',
  '',
  'def pop_toppers(stk):',
  '    while True:',
  '        if stk == []:',
  '            print("Stack Empty")',
  '            break',
  '        print(stk.pop())',
  '',
  'scores = {"Tanvi": 88, "Rahul": 59, "Ishita": 75, "Omar": 92, "Lalit": 71}',
  'toppers = []',
  'push_toppers(scores, toppers)',
  'pop_toppers(toppers)',
);
Q('l_push_toppers', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'A dictionary `scores` holds names and marks, for example `{"Tanvi": 88, "Rahul": 59, "Ishita": 75, "Omar": 92, "Lalit": 71}`. Write:\n\n(a) `push_toppers(scores, stk)` to push onto the stack `stk` the names of students with marks of 75 or more;\n\n(b) `pop_toppers(stk)` to pop and display the names one by one, and print "Stack Empty" when no names are left.\n\nShow the output for the dictionary above.',
  model: `${F(cPushMarks)}\n\nOutput:\n\n${F(pyOut(cPushMarks))}`,
  sol: 'Loop over the keys, push names meeting the condition; pop in a loop until the stack is empty, then print the message.',
  scheme: [['Loop over the dictionary with the >= 75 test', 1], ['Correct push with append', 1], ['Pop loop displaying each name', 1], ['Stack Empty message at the end', 1], ['Correct output (Omar, Ishita, Tanvi)', 1]],
}));
const cEvenWords = code(
  'def push_even(words, stk):',
  '    for w in words:',
  '        if len(w) % 2 == 0:',
  '            stk.append(w)',
  '',
  'def pop_all(stk):',
  '    if stk == []:',
  '        print("Underflow")',
  '        return',
  '    while stk:',
  '        print(stk.pop().upper(), end=" ")',
  '    print()',
  '',
  'words = ["kite", "mango", "rain", "seven", "orbit", "school"]',
  'stack = []',
  'push_even(words, stack)',
  'pop_all(stack)',
  'pop_all(stack)',
);
Q('l_push_even_words', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Write two functions for a list of words:\n\n(a) `push_even(words, stk)` pushes every word with an even number of letters onto the stack `stk`;\n\n(b) `pop_all(stk)` pops and displays all words in capital letters on one line, or displays "Underflow" if the stack is empty.\n\nShow the output when the list holds the words kite, mango, rain, seven, orbit and school (in that order) and `pop_all` is called twice.',
  model: `${F(cEvenWords)}\n\nOutput:\n\n${F(pyOut(cEvenWords))}`,
  sol: 'Test len(w) % 2 == 0 when pushing; check for an empty stack before popping and use upper().',
  scheme: [['Even-length test and push', 1], ['Underflow check', 1], ['Pop loop', 1], ['upper() and display on one line', 1], ['Correct output for both calls', 1]],
}));
const cMenu = code(
  'stk = []',
  'while True:',
  '    choice = input("1 Push 2 Pop 3 Peek 4 Show 5 Exit: ")',
  '    if choice == "1":',
  '        stk.append(int(input("Value: ")))',
  '    elif choice == "2":',
  '        if stk == []:',
  '            print("Underflow")',
  '        else:',
  '            print("Popped", stk.pop())',
  '    elif choice == "3":',
  '        print("Top", stk[-1] if stk else None)',
  '    elif choice == "4":',
  '        print(stk[::-1])',
  '    elif choice == "5":',
  '        break',
);
const MENU_IN = '1\n14\n1\n27\n4\n2\n3\n2\n2\n5\n';
const menuOut = pyOut(cMenu, { stdin: MENU_IN }).replace(/1 Push 2 Pop 3 Peek 4 Show 5 Exit: /g, '').replace(/Value: /g, '').trimEnd();
Q('l_menu', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: 'Write a menu-driven program that uses a list as a stack of integers with the choices 1 Push, 2 Pop, 3 Peek, 4 Show (top to bottom) and 5 Exit. Pop must report underflow. Show the output for this sequence of inputs: 1, 14, 1, 27, 4, 2, 3, 2, 2, 5 (the value after each 1 is the number pushed).',
  model: `${F(cMenu)}\n\nOutput for the given inputs (prompts not shown):\n\n${F(menuOut)}`,
  sol: 'A while True loop with one branch per choice; pop checks for an empty stack; show prints the reversed list so the top comes first; choice 5 breaks.',
  scheme: [['Menu loop with exit', 1], ['Push with int conversion', 1], ['Pop with underflow check', 1], ['Peek and show top first', 1], ['Correct output', 1]],
}));
const cBalProg = code(BAL_FN, '', 'for expr in ["[(a + b) * {c - d}]", "{x + (y * [z - 1)]}"]:', '    if balanced(expr):', '        print(expr, "is balanced")', '    else:', '        print(expr, "is not balanced")');
Q('l_balanced', long({
  t: 1, d: 4, c: 'analysis', marks: 5,
  stem: 'Write a function `balanced(text)` that uses a stack to check whether the brackets ( ), [ ] and { } in an expression are balanced, ignoring all other characters. Test it with `[(a + b) * {c - d}]` and `{x + (y * [z - 1)]}` and explain why the second one fails.',
  model: `${F(cBalProg)}\n\nOutput:\n\n${F(pyOut(cBalProg))}\n\nIn the second expression, when ) is read the top of the stack is [, which does not match, so the function returns False.`,
  sol: 'Push opening brackets; for a closing bracket, an empty stack or a mismatched pop means unbalanced; at the end the stack must be empty.',
  scheme: [['Opening brackets pushed', 1], ['Closing bracket matched against popped item', 1], ['Empty-stack cases handled', 1], ['Final empty test', 1], ['Correct results with the reason', 1]],
}));
const cBooks = code(
  'def push_recent(books, stk):',
  '    for title, year in books:',
  '        if year > 2015:',
  '            stk.append(title)',
  '',
  'def pop_recent(stk):',
  '    count = 0',
  '    while stk:',
  '        print(stk.pop())',
  '        count += 1',
  '    print("Books displayed:", count)',
  '',
  'shelf = [("Ink Rivers", 2012), ("Cloud Atlas of Goa", 2019), ("Paper Boats", 2016), ("Old Lanes", 2008), ("Night Market", 2021)]',
  'recent = []',
  'push_recent(shelf, recent)',
  'pop_recent(recent)',
);
Q('l_books', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'A library list `shelf` holds tuples of (title, year), for example `[("Ink Rivers", 2012), ("Cloud Atlas of Goa", 2019), ("Paper Boats", 2016), ("Old Lanes", 2008), ("Night Market", 2021)]` (imagined titles). Write `push_recent(books, stk)` to push the titles of books published after 2015, and `pop_recent(stk)` to pop and display them and then the number displayed. Show the output.',
  model: `${F(cBooks)}\n\nOutput:\n\n${F(pyOut(cBooks))}`,
  sol: 'Unpack each tuple in the loop; push titles with year > 2015; pop until empty while counting.',
  scheme: [['Tuple unpacking in the loop', 1], ['Condition and push', 1], ['Pop loop', 1], ['Count displayed', 1], ['Correct output', 1]],
}));
const cPostProg = code(POSTFIX_FN, '', 'print(eval_postfix("5 1 2 + 4 * + 3 -"))');
Q('l_postfix', long({
  t: 1, d: 4, c: 'analysis', marks: 5,
  stem: 'Write a function `eval_postfix(expr)` that evaluates a postfix expression whose tokens (whole numbers and the operators + - * //) are separated by spaces, using a stack. Evaluate `5 1 2 + 4 * + 3 -` and show the stack after each operator.',
  model: `${F(cPostProg)}\n\nOutput: ${ic(pyOut(cPostProg))}\n\nStack after each operator: + gives \`${pyOut(code(POSTFIX_FN.replace('    return stk.pop()', '    return stk'), 'print(eval_postfix("5 1 2 +"))'))}\`, * gives \`${pyOut(code(POSTFIX_FN.replace('    return stk.pop()', '    return stk'), 'print(eval_postfix("5 1 2 + 4 *"))'))}\`, + gives \`${pyOut(code(POSTFIX_FN.replace('    return stk.pop()', '    return stk'), 'print(eval_postfix("5 1 2 + 4 * +"))'))}\`, - gives \`${pyOut(code(POSTFIX_FN.replace('    return stk.pop()', '    return stk'), 'print(eval_postfix("5 1 2 + 4 * + 3 -"))'))}\`.`,
  sol: 'Numbers are pushed; for an operator pop the right operand first, then the left, and push the result; the last item left is the answer.',
  scheme: [['Numbers pushed', 1], ['Operands popped in the right order', 1], ['Operators applied and result pushed', 1], ['Stack states shown', 1], ['Correct value', 1]],
}));

// ================================================================ case-based
const cBrowser = code(
  'back = []',
  'current = "home"',
  'def visit(page):',
  '    global current',
  '    back.append(current)',
  '    current = page',
  'def go_back():',
  '    global current',
  '    if back == []:',
  '        print("No history")',
  '    else:',
  '        current = back.pop()',
  'visit("timetable")',
  'visit("results")',
  'visit("notices")',
  'go_back()',
  'print(current, back)',
);
Q('cb_browser', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the back button in the Vidya Kendra school app and answer the questions. *(Imagined school and app, written by SOYL for practice.)*',
  passage: `Students of Vidya Kendra are building the back button for their school app. Every time a new page opens, the page being left is pushed onto the stack \`back\`; pressing Back pops the stack.\n\n${F(cBrowser)}`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', fixed: true, key: 'b', stem: 'What does the program print?', opts: [ic("notices ['home', 'timetable', 'results']"), ic(pyOut(cBrowser)), ic("timetable ['home']"), ic("home []")], sol: 'Three visits push home, timetable and results; one Back pops results, which becomes current, leaving home and timetable in the stack.' })),
    child('b', tf({ t: 1, d: 2, c: 'understanding', ans: true, stem: 'True or false? If `go_back()` is called three more times, the third call prints "No history".', sol: `Two pops empty the stack (timetable, then home); the third call finds it empty: ${ic(pyOut(code(cBrowser, 'go_back()', 'go_back()', 'go_back()')).split('\n').pop())}.` })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why is a stack the right structure for the Back button, rather than reading the pages in the order they were visited?', model: 'Back must return to the page left **most recently**, then the one before it, which is last in, first out. Reading in visit order would jump to the oldest page (home) first.', sol: 'LIFO matches the most-recent-first behaviour of Back.', scheme: [['Most recent page first', 1], ['Contrast with visit order', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Write the changed `go_back()` so that it also pushes the current page onto a second stack `forward` before going back.', model: F('def go_back():', '    global current', '    if back == []:', '        print("No history")', '    else:', '        forward.append(current)', '        current = back.pop()'), sol: 'Save current on forward inside the else branch, before popping back.', scheme: [['forward.append(current) in the right place', 1], ['Rest of the logic unchanged', 1]] }),
    ]),
  ],
}));
const cUndo = code(
  'canvas = []',
  'undo = []',
  'def draw(shape):',
  '    canvas.append(shape)',
  '    undo.append(shape)',
  'def undo_last():',
  '    if undo:',
  '        canvas.remove(undo.pop())',
  'for s in ["circle", "square", "star", "line"]:',
  '    draw(s)',
  'undo_last()',
  'undo_last()',
  'draw("arrow")',
  'print(canvas)',
  'print(undo[-1], len(undo))',
);
Q('cb_undo', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the drawing app made by Aarav and Zoya and answer the questions. *(Imagined students and app, written by SOYL for practice.)*',
  passage: `Aarav and Zoya are writing a drawing app for their Class 12 project. Each shape drawn is added to the canvas and pushed onto an undo stack. Undo pops the last shape and removes it from the canvas.\n\n${F(cUndo)}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'c', stem: 'What is the first line printed?', opts: [ic("['circle', 'square', 'star', 'line', 'arrow']"), ic("['star', 'line', 'arrow']"), ic(pyOut(cUndo).split('\n')[0]), ic("['circle', 'arrow']")], sol: 'Two undos remove line and then star; arrow is then drawn after circle and square.' })),
    child('b', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'a', stem: 'What is the second line printed?', opts: [ic(pyOut(cUndo).split('\n')[1]), ic('line 4'), ic('star 3'), ic('circle 1')], sol: 'The undo stack held four shapes, lost two to undo and gained arrow, so arrow is on top and there are three items.' })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Zoya wants a Redo button. Suggest how a second stack can support it, naming when items are pushed and popped.', model: 'Use a `redo` stack: in `undo_last()`, **push** the undone shape onto `redo`; Redo **pops** from `redo`, draws the shape again and pushes it back onto `undo`. Drawing a brand-new shape should **clear** `redo`.', sol: 'Push on undo, pop on redo, clear on a new action.', scheme: [['Push to redo when undoing', 1], ['Pop from redo to redraw (and clear on new draw)', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What happens if `undo_last()` is called when nothing has been drawn? Is a check needed?', model: 'Nothing happens: `if undo:` is False for an empty list, so `pop()` is never called and no **IndexError** occurs. This test is the **underflow check**, so no extra check is needed.', sol: 'The if undo test prevents popping an empty list.', scheme: [['Behaviour on empty stack', 1], ['Identified as the underflow check', 1]] }),
    ]),
  ],
}));
const cTrays = code(
  'CAPACITY = 4',
  'trays = []',
  'def add_tray(t):',
  '    if len(trays) == CAPACITY:',
  '        print("Overflow:", t, "not added")',
  '    else:',
  '        trays.append(t)',
  'def take_tray():',
  '    if trays == []:',
  '        print("Underflow")',
  '        return None',
  '    return trays.pop()',
  'for t in ["T1", "T2", "T3", "T4", "T5"]:',
  '    add_tray(t)',
  'print(take_tray(), take_tray())',
  'print(trays)',
);
Q('cb_trays', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read how the Annapurna canteen counts its trays and answer the questions. *(Imagined canteen, written by SOYL for practice.)*',
  passage: `The Annapurna canteen keeps clean trays in a spring-loaded holder that takes at most four trays; staff always take the tray on top. A student models it with a fixed-capacity stack.\n\n${F(cTrays)}`,
  parts: [
    child('a', fb({ t: 1, d: 2, c: 'understanding', stem: 'Adding T5 to the full holder is an example of stack ___.', acc: [['overflow']], sol: 'Pushing onto a full fixed-size stack is overflow.' })),
    child('b', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'd', stem: 'What are the last two lines of output?', opts: [ic('T1 T2') + ' and ' + ic("['T3', 'T4']"), ic('T5 T4') + ' and ' + ic("['T1', 'T2', 'T3']"), ic('T4 T3') + ' and ' + ic("['T1', 'T2', 'T5']"), pyOut(cTrays).split('\n').slice(1).map(ic).join(' and ')], sol: 'T5 was refused, so T4 is on top; two pops give T4 and T3 and leave T1 and T2.' })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why does `take_tray()` return `None` after printing "Underflow"? What would go wrong without the return?', model: 'Returning ends the function at once. Without it, the next line `trays.pop()` would run on the empty list and stop the program with an **IndexError**.', sol: 'The return prevents pop() on an empty list.', scheme: [['Return ends the function', 1], ['IndexError otherwise', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Write a function `count_free()` that returns how many more trays can be added.', model: `${F('def count_free():', '    return CAPACITY - len(trays)')}\n\nAfter the program above it returns ${ic(pyOut(code(cTrays, 'def count_free():', '    return CAPACITY - len(trays)', 'print(count_free())')).split('\n').pop())}.`, sol: 'Capacity minus the current size.', scheme: [['Uses CAPACITY and len', 1], ['Returns the difference', 1]] }),
    ]),
  ],
}));
const cParcels = code(
  'parcels = [("P101", 4.5), ("P102", 12.0), ("P103", 7.25), ("P104", 15.5), ("P105", 2.0)]',
  'heavy = []',
  'for pid, kg in parcels:',
  '    if kg > 7:',
  '        heavy.append(pid)',
  'print("Loaded:", heavy)',
  'print("Unload first:", heavy[-1])',
);
Q('cb_parcels', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the delivery van at Swift Couriers, Nagpur, and answer the questions. *(Imagined company, written by SOYL for practice.)*',
  passage: `At Swift Couriers, heavy parcels are loaded into a narrow van from the back door, so the parcel loaded last must be unloaded first. A program pushes the IDs of parcels heavier than 7 kg onto a stack in the order they are loaded.\n\n${F(cParcels)}`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', fixed: true, key: 'b', stem: 'What is the first line printed?', opts: [ic("Loaded: ['P102', 'P104']"), ic(pyOut(cParcels).split('\n')[0]), ic("Loaded: ['P104', 'P103', 'P102']"), ic("Loaded: ['P101', 'P103', 'P105']")], sol: 'P102 (12.0), P103 (7.25) and P104 (15.5) are heavier than 7 kg and are pushed in list order.' })),
    child('b', tf({ t: 1, d: 2, c: 'understanding', ans: false, stem: 'True or false? The first parcel to be unloaded is P102.', sol: `The top of the stack is the last parcel loaded: ${ic(pyOut(cParcels).split('\n')[1])}.` })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write a loop that unloads (pops) and prints every heavy parcel ID and then prints "Van empty".', model: `${F('while heavy:', '    print(heavy.pop())', 'print("Van empty")')}\n\nOutput:\n\n${F(pyOut(code(cParcels, 'while heavy:', '    print(heavy.pop())', 'print("Van empty")')).split('\n').slice(2).join('\n'))}`, sol: 'Pop while the list is not empty, then print the message.', scheme: [['Pop loop until empty', 1], ['Message after the loop', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The driver now wants to deliver parcels in the order they were booked. Is a stack still the right structure? Justify.', model: 'No. Delivering in booking order means the **first** parcel in must come out first, which is **FIFO**, so a **queue** suits it. A stack would deliver the most recently loaded parcel first.', sol: 'FIFO needs a queue, not a stack.', scheme: [['Correct judgement', 1], ['Justified with FIFO vs LIFO', 1]] }),
    ]),
  ],
}));
