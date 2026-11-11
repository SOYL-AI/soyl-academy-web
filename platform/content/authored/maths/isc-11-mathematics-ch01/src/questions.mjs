// ISC 11 Mathematics ch01 Sets: objective items (mcq, assertion-reason, true-false, fill-blank, numerical).
// Every set is built as a JS Set and every key re-derived by enumeration (intervals: sampled on a 1/16 grid, end points tested).
import { Q, mk } from './lib.mjs';
import { range, S, arr, un, it, df, cp, subset, same, filt, sum, key, subsets, GRID, iv, inIv, agrees, fromRegions, allSubsets } from './sets.mjs';
/** String.raw, except that a backslash-n not followed by a lower-case letter (so not ne, notin) becomes a newline. */
const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

const N = (a, b) => range(a, b);
const sub4 = allSubsets(4); // all 16 subsets of {1, 2, 3, 4}
const sub3 = allSubsets(3);
const U4 = S(N(1, 4));
const eachPair = (f) => sub4.every((A) => sub4.every((B) => f(A, B)));
const eachTriple = (f) => sub3.every((A) => sub3.every((B) => sub3.every((C) => f(A, B, C))));
const MONTHS = { January: 31, February: 28, March: 31, April: 30, May: 31, June: 30, July: 31, August: 31, September: 30, October: 31, November: 30, December: 31 };

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`Exactly one of the four collections below is decided by a clear rule rather than by opinion, so it forms a set. Which one is it?`, opts: ['The most interesting chapters in a mathematics book', r`The months of a year that have exactly $30$ days`, 'The kindest teachers of a school', 'The most beautiful monuments of Rajasthan'], key: 'b', sol: r`A set needs a rule that settles membership for every object. Exactly $30$ days gives April, June, September and November. "Most interesting", "kindest" and "most beautiful" are opinions.`, d: 1, c: 'recall', t: [1], time: 40 }),
  (C) => { const m30 = Object.entries(MONTHS).filter(([, d]) => d === 30).map(([m]) => m); C.assert(m30.join() === 'April,June,September,November', 'four 30-day months'); C.key('b'); });

const m02 = filt(S(N(1, 60)), (x) => 30 % x === 0 && x % 2 === 1);
Q('m02', mk.mcq({ stem: r`Written in roster form, the set $\{x \in \mathbb{N} : x \text{ is a factor of } 30 \text{ and } x \text{ is odd}\}$ is`, opts: [r`$\{1, 3, 5, 15\}$`, r`$\{1, 2, 3, 5, 6, 10, 15, 30\}$`, r`$\{3, 5, 15\}$`, r`$\{1, 3, 5\}$`], key: 'a', sol: r`The factors of $30$ are $1, 2, 3, 5, 6, 10, 15, 30$. Keeping the odd ones leaves $1, 3, 5, 15$. Listing all eight ignores "odd"; the other two sets drop a factor.`, d: 2, c: 'application', t: [1], time: 60 }),
  (C) => C.which([key(S([1, 3, 5, 15])), key(filt(S(N(1, 60)), (x) => 30 % x === 0)), key(S([3, 5, 15])), key(S([1, 3, 5]))], key(m02)));

const m03 = filt(S(N(-10, 10)), (x) => -30 < x ** 3 && x ** 3 < 30);
Q('m03', mk.mcq({ stem: r`How many integers $x$ satisfy $-30 < x^3 < 30$?`, opts: ['$5$', '$6$', '$7$', '$8$'], key: 'c', sol: r`$3^3 = 27 < 30$ but $4^3 = 64 > 30$, so $x$ runs from $-3$ to $3$: seven integers. Stopping at $\pm 2$ gives $5$; leaving out $0$ gives $6$.`, d: 3, c: 'application', t: [1], time: 75 }),
  (C) => { C.assert(arr(m03).join() === '-3,-2,-1,0,1,2,3', 'integers -3..3'); C.which([5, 6, 7, 8], m03.size); });

Q('m04', mk.mcq({ stem: r`Exactly one of the following sets is empty. Which one?`, opts: [r`$\{x \in \mathbb{R} : x^2 - 6x + 10 = 0\}$`, r`$\{x \in \mathbb{Z} : x^2 = 25\}$`, r`$\{x \in \mathbb{Q} : 4x = 1\}$`, r`$\{x \in \mathbb{N} : 2 < x < 4\}$`], key: 'a', sol: r`$x^2 - 6x + 10 = (x - 3)^2 + 1 \ge 1$, so it is never $0$ and $\{x \in \mathbb{R} : x^2 - 6x + 10 = 0\}$ is empty. The others hold $\pm 5$, $\dfrac14$ and $3$.`, d: 2, c: 'understanding', t: [1], time: 60 }),
  (C) => C.which([GRID.every((x) => Math.abs(x * x - 6 * x + 10) > 1e-9), !N(-30, 30).some((x) => x * x === 25), !(Math.abs(4 * 0.25 - 1) < 1e-12), !N(1, 10).some((x) => x > 2 && x < 4)], true));

Q('m05', mk.mcq({ stem: r`Which pair of sets consists of two equal sets?`, opts: [r`$\{x \in \mathbb{N} : x < 5\}$ and $\{1, 2, 3, 4\}$`, r`$\{x \in \mathbb{Z} : x^2 = 4\}$ and $\{2\}$`, r`$\{x \in \mathbb{N} : x \text{ is prime},\ x < 10\}$ and $\{2, 3, 5, 7, 9\}$`, r`$\{x \in \mathbb{R} : x^2 = x\}$ and $\{1\}$`], key: 'a', sol: r`The natural numbers below $5$ are exactly $1, 2, 3, 4$. In the others, $x^2 = 4$ gives $-2$ and $2$; $9$ is not prime; and $x^2 = x$ gives $0$ and $1$.`, d: 2, c: 'understanding', t: [1], time: 75 }),
  (C) => C.which([same(filt(S(N(1, 30)), (x) => x < 5), S([1, 2, 3, 4])), same(filt(S(N(-30, 30)), (x) => x * x === 4), S([2])), same(filt(S(N(1, 9)), (x) => x > 1 && N(2, x - 1).every((p) => x % p)), S([2, 3, 5, 7, 9])), same(filt(S(N(-5, 5)), (x) => x * x === x), S([1]))], true));

Q('m06', mk.mcq({ stem: r`A set has exactly $256$ subsets. How many elements does it have?`, opts: ['$6$', '$7$', '$8$', '$9$'], key: 'c', sol: r`A set with $n$ elements has $2^n$ subsets, and $2^8 = 256$, so $n = 8$.`, d: 2, c: 'understanding', t: [2], time: 45 }),
  (C) => C.which([6, 7, 8, 9], N(0, 12).find((n) => subsets(S(N(1, n))).length === 256)));

const m07n = N(0, 20).filter((n) => 2 ** (n + 2) - 2 ** n === 96);
Q('m07', mk.mcq({ stem: r`Set $A$ has $2$ more elements than set $B$, and $n(P(A)) - n(P(B)) = 96$, where $P$ stands for the power set. Then $n(A)$ equals`, opts: ['$5$', '$6$', '$7$', '$8$'], key: 'c', sol: r`Let $n(B) = n$. Then $2^{n + 2} - 2^n = 3 \cdot 2^n = 96$, so $2^n = 32$ and $n = 5$. Hence $n(A) = 7$. The value $5$ is $n(B)$.`, d: 4, c: 'analysis', t: [2], time: 120 }),
  (C) => { C.assert(m07n.length === 1 && m07n[0] === 5, 'n(B) = 5'); C.which([5, 6, 7, 8], m07n[0] + 2); });

const m08A = new Set([1, 2, new Set([3, 4])]);
const m08has = (A, X) => [...A].some((e) => e instanceof Set && same(e, X));
Q('m08', mk.mcq({ stem: r`Let $A = \{1, 2, \{3, 4\}\}$, a set that has another set as one of its elements. Which statement is true?`, opts: [r`$\{3, 4\} \in A$`, r`$\{3, 4\} \subset A$`, r`$3 \in A$`, r`$n(A) = 4$`], key: 'a', sol: r`The set $\{3, 4\}$ is itself one of the three elements of $A$, so it belongs to $A$. It is not a subset, because $3 \notin A$; and $n(A) = 3$, not $4$.`, d: 3, c: 'understanding', t: [2], time: 75 }),
  (C) => C.which([m08has(m08A, S([3, 4])), [3, 4].every((x) => m08A.has(x)), m08A.has(3), m08A.size === 4], true));

Q('m09', mk.mcq({ stem: r`In interval notation, the set $\{x \in \mathbb{R} : x < -2\}$ is written as`, opts: [r`$(-\infty, -2)$`, r`$(-\infty, -2]$`, r`$(-2, \infty)$`, r`$[-\infty, -2)$`], key: 'a', sol: r`The numbers are all below $-2$ and $-2$ itself is excluded, so the bracket at $-2$ is round. A square bracket never goes next to $\infty$.`, d: 1, c: 'recall', t: [2], time: 40 }),
  (C) => C.which([agrees((x) => x < -2, [iv(null, -2, false, false)]), agrees((x) => x < -2, [iv(null, -2, false, true)]), agrees((x) => x < -2, [iv(-2, null, false, false)]), false], true));

Q('m10', mk.mcq({ stem: r`How many integers lie in the interval $[-6, -1)$?`, opts: ['$4$', '$5$', '$6$', '$7$'], key: 'b', sol: r`$-6$ is included and $-1$ is excluded, so the integers are $-6, -5, -4, -3, -2$: five of them. Including $-1$ as well would give $6$.`, d: 2, c: 'understanding', t: [2], time: 45 }),
  (C) => C.which([4, 5, 6, 7], N(-12, 6).filter((x) => inIv(iv(-6, -1, true, false), x)).length));

const m11U = S(N(1, 30)), m11A = filt(m11U, (x) => x % 3 === 0), m11B = filt(m11U, (x) => x % 5 === 0);
Q('m11', mk.mcq({ stem: r`For $U = \{1, 2, \dots, 30\}$, let $A$ hold the multiples of $3$ and $B$ the multiples of $5$. Then $n(A \cup B)$ is`, opts: ['$16$', '$14$', '$8$', '$12$'], key: 'b', sol: r`$n(A) = 10$, $n(B) = 6$, and the common multiples are $15$ and $30$, so $n(A \cap B) = 2$. Then $n(A \cup B) = 10 + 6 - 2 = 14$. The value $16$ forgets the overlap.`, d: 2, c: 'application', t: [3], time: 75 }),
  (C) => { C.assert(m11A.size === 10 && m11B.size === 6 && it(m11A, m11B).size === 2, 'sizes'); C.which([16, 14, 8, 12], un(m11A, m11B).size); });

const m12U = S(N(1, 30)), m12A = filt(m12U, (x) => Number.isInteger(Math.sqrt(x))), m12B = filt(m12U, (x) => x % 3 === 0);
Q('m12', mk.mcq({ stem: r`Let $U = \{1, 2, \dots, 30\}$, with $A$ the set of perfect squares and $B$ the set of multiples of $3$ in $U$. Then $n((A \cup B)')$ equals`, opts: ['$14$', '$15$', '$16$', '$20$'], key: 'c', sol: r`$A = \{1, 4, 9, 16, 25\}$ has $5$ elements, $B$ has $10$, and $A \cap B = \{9\}$. So $n(A \cup B) = 14$ and $n((A \cup B)') = 30 - 14 = 16$.`, d: 3, c: 'application', t: [3], time: 90 }),
  (C) => { C.assert(m12A.size === 5 && m12B.size === 10 && arr(it(m12A, m12B)).join() === '9' && un(m12A, m12B).size === 14, 'sizes'); C.which([14, 15, 16, 20], cp(m12U, un(m12A, m12B)).size); });

Q('m13', mk.mcq({ stem: r`For subsets of a universal set $U$, the set $A \cap B'$ is the same as`, opts: [r`$A - B$`, r`$B - A$`, r`$(A \cup B)'$`, r`$A' \cap B$`], key: 'a', sol: r`An element of $A \cap B'$ is in $A$ and not in $B$, which is the definition of $A - B$. The set $B - A$ is $B \cap A'$, the mirror image.`, d: 2, c: 'recall', t: [3], time: 45 }),
  (C) => { const lhs = (A, B) => it(A, cp(U4, B)); C.which([eachPair((A, B) => same(lhs(A, B), df(A, B))), eachPair((A, B) => same(lhs(A, B), df(B, A))), eachPair((A, B) => same(lhs(A, B), cp(U4, un(A, B)))), eachPair((A, B) => same(lhs(A, B), it(cp(U4, A), B)))], true); });

Q('m14', mk.mcq({ stem: r`Three sets satisfy $A \cap B = A \cap C$ and $A \cup B = A \cup C$. Which conclusion must hold?`, opts: [r`$B = C$`, r`$A = B$`, r`$B \subseteq A$`, r`$A \subseteq C$`], key: 'a', sol: r`An element of $B$ outside $A$ lies in $A \cup B = A \cup C$, so it lies in $C$; an element of $B$ inside $A$ lies in $A \cap B = A \cap C$, so again in $C$. Hence $B \subseteq C$, and by symmetry $B = C$. The other three fail for $A = \varnothing$, $B = C = \{1\}$.`, d: 4, c: 'analysis', t: [3], time: 150 }),
  (C) => { const hyp = (A, B, Cc) => same(it(A, B), it(A, Cc)) && same(un(A, B), un(A, Cc)); const holds = (p) => eachTriple((A, B, Cc) => !hyp(A, B, Cc) || p(A, B, Cc)); C.which([holds((A, B, Cc) => same(B, Cc)), holds((A, B) => same(A, B)), holds((A, B) => subset(B, A)), holds((A, B, Cc) => subset(A, Cc))], true); });

Q('m15', mk.mcq({ stem: r`Each of the $45$ books on a shelf is in English, in Hindi, or in both languages. Of them, $30$ are in English and $25$ are in Hindi. How many books are in both languages?`, opts: ['$55$', '$10$', '$5$', '$15$'], key: 'b', sol: r`Every book is counted at least once, so $n(E \cup H) = 45$. Then $45 = 30 + 25 - n(E \cap H)$ gives $n(E \cap H) = 55 - 45 = 10$. The value $55$ is the plain sum.`, d: 3, c: 'application', t: [3], time: 75 }),
  (C) => { const { A, B, U } = fromRegions({ a: 20, ab: 10, b: 15 }); C.assert(U.size === 45 && A.size === 30 && B.size === 25 && un(A, B).size === 45, 'construction'); C.which([55, 10, 5, 15], it(A, B).size); });

Q('m16', mk.mcq({ stem: r`According to De Morgan's law for an intersection, $(A \cap B)'$ is equal to`, opts: [r`$A' \cup B'$`, r`$A' \cap B'$`, r`$A \cup B'$`, r`$(A \cup B)'$`], key: 'a', sol: r`An element outside $A \cap B$ fails to be in $A$ or fails to be in $B$, so it lies in $A'$ or in $B'$: $A' \cup B'$. The set $A' \cap B'$ equals $(A \cup B)'$, the other law.`, d: 2, c: 'recall', t: [3], time: 45 }),
  (C) => { const lhs = (A, B) => cp(U4, it(A, B)); C.which([eachPair((A, B) => same(lhs(A, B), un(cp(U4, A), cp(U4, B)))), eachPair((A, B) => same(lhs(A, B), it(cp(U4, A), cp(U4, B)))), eachPair((A, B) => same(lhs(A, B), un(A, cp(U4, B)))), eachPair((A, B) => same(lhs(A, B), cp(U4, un(A, B))))], true); });

Q('m17', mk.mcq({ stem: r`For finite sets $A$ and $B$, $n(A) = 47$, $n(B) = 32$ and $n(A \cap B) = 19$. How many elements belong to exactly one of the two sets?`, opts: ['$41$', '$60$', '$79$', '$28$'], key: 'a', sol: r`Only $A$: $47 - 19 = 28$. Only $B$: $32 - 19 = 13$. Exactly one: $28 + 13 = 41$. The value $60$ counts the overlap once as well, and $79$ is the plain sum.`, d: 3, c: 'application', t: [3], time: 75 }),
  (C) => { const { A, B } = fromRegions({ a: 28, ab: 19, b: 13 }); C.assert(A.size === 47 && B.size === 32 && it(A, B).size === 19, 'construction'); C.which([41, 60, 79, 28], df(A, B).size + df(B, A).size); });

const m18 = subsets(S(N(1, 7))).filter((a) => a.every((x) => x % 2 === 0));
Q('m18', mk.mcq({ stem: r`How many subsets of $\{1, 2, \dots, 7\}$ have only even numbers as elements? The empty set is counted.`, opts: ['$4$', '$7$', '$8$', '$16$'], key: 'c', sol: r`The even numbers available are $2, 4, 6$. Each is in or out, so there are $2^3 = 8$ such subsets, including $\varnothing$.`, d: 3, c: 'analysis', t: [2], time: 90 }),
  (C) => C.which([4, 7, 8, 16], m18.length));

Q('m19', mk.mcq({ stem: r`The intervals $A = [-4, 1)$ and $B = (-2, 6]$ lie on the real line. Their intersection $A \cap B$ is`, opts: [r`$(-2, 1)$`, r`$(-2, 1]$`, r`$[-4, 6]$`, r`$[-4, 1)$`], key: 'a', sol: r`The overlap starts just above $-2$ because $-2 \notin B$, and stops just below $1$ because $1 \notin A$. Both end points are excluded: $(-2, 1)$.`, d: 3, c: 'application', t: [2, 3], time: 75 }),
  (C) => { const p = (x) => inIv(iv(-4, 1, true, false), x) && inIv(iv(-2, 6, false, true), x); C.which([[iv(-2, 1, false, false)], [iv(-2, 1, false, true)], [iv(-4, 6)], [iv(-4, 1, true, false)]].map((Is) => agrees(p, Is)), true); });

Q('m20', mk.mcq({ stem: r`The complement of the interval $[-1, 3)$ in $\mathbb{R}$ is`, opts: [r`$(-\infty, -1) \cup [3, \infty)$`, r`$(-\infty, -1] \cup (3, \infty)$`, r`$(-\infty, -1) \cup (3, \infty)$`, r`$(-1, 3)$`], key: 'a', sol: r`$-1$ belongs to $[-1, 3)$, so it is not in the complement; $3$ does not belong, so it is in the complement. That gives a round bracket at $-1$ and a square bracket at $3$.`, d: 3, c: 'application', t: [2, 3], time: 75 }),
  (C) => { const p = (x) => !inIv(iv(-1, 3, true, false), x); C.which([[iv(null, -1, false, false), iv(3, null, true)], [iv(null, -1, false, true), iv(3, null, false)], [iv(null, -1, false, false), iv(3, null, false)], [iv(-1, 3, false, false)]].map((Is) => agrees(p, Is)), true); });

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The set $\{2, 4, 6, 8\}$ has exactly $16$ subsets.`, r: r`A set with $n$ elements has $2^n$ subsets.`, key: 'a', sol: r`The set has $4$ elements, so $2^4 = 16$ subsets. R states the rule used, so it explains A.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { C.assert(subsets(S([2, 4, 6, 8])).length === 16 && N(0, 7).every((n) => subsets(S(N(1, n))).length === 2 ** n), '2^n'); C.key('a'); });
Q('ar2', mk.ar({ a: r`For all finite sets $A$ and $B$, $n(A \cup B) = n(A) + n(B) - n(A \cap B)$.`, r: r`If finite sets $A$ and $B$ are disjoint, then $n(A \cup B) = n(A) + n(B)$.`, key: 'b', sol: r`Both statements are true. R is only the special case $A \cap B = \varnothing$ of A; it does not explain why the overlap is subtracted in general, so R is not the correct explanation.`, d: 3, c: 'understanding', t: [3] }),
  (C) => { C.assert(eachPair((A, B) => un(A, B).size === A.size + B.size - it(A, B).size && (it(A, B).size > 0 || un(A, B).size === A.size + B.size)), 'both true'); C.key('b'); });
const ar3 = (() => { const X = S([1, 2, 3]); const P = subsets(X).filter((a) => a.length < 3); return P.some((p) => P.some((q) => same(un(S(p), S(q)), X))); })();
Q('ar3', mk.ar({ a: r`The union of two proper subsets of a set $X$ is always a proper subset of $X$.`, r: r`A proper subset of $X$ is a subset of $X$ that is not equal to $X$.`, key: 'd', sol: r`A is false: for $X = \{1, 2, 3\}$ the proper subsets $\{1\}$ and $\{2, 3\}$ have union $X$ itself. R is the correct definition of a proper subset, so R is true.`, d: 3, c: 'analysis', t: [2] }),
  (C) => { C.assert(ar3, 'union can be all of X'); C.key('d'); });
Q('ar4', mk.ar({ a: r`For every set $A$ inside a universal set $U$, $(A')' = A$.`, r: r`The complement $A'$ contains every element of $A$.`, key: 'c', sol: r`A is true: an element is not outside $A'$ exactly when it is in $A$. R is false: $A'$ contains only elements of $U$ that are not in $A$, so $A \cap A' = \varnothing$.`, d: 2, c: 'understanding', t: [3] }),
  (C) => { C.assert(sub4.every((A) => same(cp(U4, cp(U4, A)), A)) && sub4.some((A) => A.size > 0 && it(A, cp(U4, A)).size === 0), 'complement of complement'); C.key('c'); });
Q('ar5', mk.ar({ a: r`For any two sets $A$ and $B$, the sets $A - B$ and $B - A$ have no common element.`, r: r`Every element of $A - B$ lies outside $B$, while every element of $B - A$ lies inside $B$.`, key: 'a', sol: r`A common element would have to be both outside $B$ and inside $B$, which is impossible. R states exactly this, so it explains A.`, d: 3, c: 'analysis', t: [3] }),
  (C) => { C.assert(eachPair((A, B) => it(df(A, B), df(B, A)).size === 0 && [...df(A, B)].every((x) => !B.has(x)) && [...df(B, A)].every((x) => B.has(x))), 'disjoint differences'); C.key('a'); });
const ar6 = [...'ALGEBRA'];
Q('ar6', mk.ar({ a: r`The set of letters of the word ALGEBRA has $7$ elements.`, r: r`A set lists every distinct object only once.`, key: 'd', sol: r`The letters are A, L, G, E, B, R, A, with A twice, so the set has $6$ elements and A is false. R is a correct statement about sets.`, d: 2, c: 'understanding', t: [1] }),
  (C) => { C.assert(ar6.length === 7 && S(ar6).size === 6, 'six distinct letters'); C.key('d'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`The set $\{0\}$ is the empty set.`, key: 'f', sol: r`$\{0\}$ has exactly one element, the number $0$. The empty set has none.`, d: 1, c: 'understanding', t: [1] }),
  (C) => { C.assert(S([0]).size === 1, 'one element'); C.key('f'); });
Q('tf2', mk.tf({ stem: r`The open intervals $(1, 3)$ and $(3, 6)$ have no element in common.`, key: 't', sol: r`The first holds numbers below $3$ and the second holds numbers above $3$, and $3$ itself is in neither, so their intersection is empty.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { C.assert(GRID.every((x) => !(inIv(iv(1, 3, false, false), x) && inIv(iv(3, 6, false, false), x))), 'no common point'); C.key('t'); });
Q('tf3', mk.tf({ stem: r`Inside a universal set $U$, if $A \subseteq B$ then $B' \subseteq A'$.`, key: 't', sol: r`An element outside $B$ cannot be in $A$, because everything in $A$ is in $B$. So it lies in $A'$.`, d: 3, c: 'application', t: [3] }),
  (C) => { C.assert(eachPair((A, B) => !subset(A, B) || subset(cp(U4, B), cp(U4, A))), 'contrapositive'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`A finite set always has an even number of subsets.`, key: 'f', sol: r`The empty set has exactly one subset, namely itself, and $1$ is odd. For every other finite set the count $2^n$ is even.`, d: 3, c: 'analysis', t: [2] }),
  (C) => { C.assert(subsets(S([])).length === 1 && N(1, 6).every((n) => subsets(S(N(1, n))).length % 2 === 0), 'only the empty set is odd'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`If finite sets $A$ and $B$ have no element in common, then $n(A \cup B) = n(A) + n(B)$.`, key: 't', sol: r`With no overlap nothing is counted twice, so the two counts simply add.`, d: 2, c: 'understanding', t: [3] }),
  (C) => { C.assert(eachPair((A, B) => it(A, B).size > 0 || un(A, B).size === A.size + B.size), 'disjoint union count'); C.key('t'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`Counting every subset, the empty set and the set itself included, a set of $7$ elements gives ____ subsets in all.`, acc: [['128']], sol: r`Each element is in or out of a subset: $2^7 = 128$.`, d: 1, c: 'understanding', t: [2] }),
  (C) => C.blank(subsets(S(N(1, 7))).length));
Q('fb2', mk.fill({ stem: r`A subset of $A$ that is not equal to $A$ is called a ____ subset of $A$.`, acc: [['proper', 'Proper']], sol: r`Such a subset is called a proper subset, written $B \subset A$.`, d: 1, c: 'recall', t: [2] }),
  (C) => C.blank('proper'));
Q('fb3', mk.fill({ stem: r`By De Morgan's law, the complement of a union, $(A \cup B)'$, equals the ____ of the complements $A'$ and $B'$. Write the missing word.`, acc: [['intersection', 'Intersection']], sol: r`De Morgan's law gives $(A \cup B)' = A' \cap B'$, the intersection of the complements.`, d: 2, c: 'recall', t: [3] }),
  (C) => { C.assert(eachPair((A, B) => same(cp(U4, un(A, B)), it(cp(U4, A), cp(U4, B)))), 'law'); C.blank('intersection'); });
Q('fb4', mk.fill({ stem: r`If $n(A) = 26$, $n(B) = 18$ and $n(A \cap B) = 9$, then $n(A \cup B) = $ ____.`, acc: [['35']], sol: r`$n(A \cup B) = 26 + 18 - 9 = 35$.`, d: 2, c: 'understanding', t: [3] }),
  (C) => { const { A, B } = fromRegions({ a: 17, ab: 9, b: 9 }); C.assert(A.size === 26 && B.size === 18 && it(A, B).size === 9, 'construction'); C.blank(un(A, B).size); });
Q('fb5', mk.fill({ stem: r`The set $\{x \in \mathbb{R} : -2 \le x < 7\}$ can be expressed in interval notation as ____.`, acc: [['[-2, 7)', '[-2,7)', '$[-2, 7)$']], sol: r`The left end $-2$ is included and the right end $7$ is excluded, so the interval is $[-2, 7)$.`, d: 1, c: 'recall', t: [2] }),
  (C) => { C.assert(agrees((x) => x >= -2 && x < 7, [iv(-2, 7, true, false)]), 'interval'); C.blank('[-2, 7)'); });

// =============================================================== numerical
Q('n01', mk.num({ stem: r`How many subsets of $\{1, 2, \dots, 8\}$ contain neither $2$ nor $5$?`, value: 64, sol: r`Such a subset is chosen from the remaining six elements $1, 3, 4, 6, 7, 8$, each in or out: $2^6 = 64$.`, scheme: [['64', 1]], d: 3, c: 'application', t: [2], time: 90 }),
  (C) => C.val(subsets(S(N(1, 8))).filter((a) => !a.includes(2) && !a.includes(5)).length));
Q('n02', mk.num({ stem: r`Finite sets $A$ and $B$ have $n(A) = 30$, $n(B) = 21$ and $n(A \cup B) = 44$. Find $n(A \cap B)$.`, value: 7, sol: r`$44 = 30 + 21 - n(A \cap B)$, so $n(A \cap B) = 51 - 44 = 7$.`, scheme: [['7', 1]], d: 2, c: 'understanding', t: [3], time: 75 }),
  (C) => { const { A, B } = fromRegions({ a: 23, ab: 7, b: 14 }); C.assert(A.size === 30 && B.size === 21 && un(A, B).size === 44, 'construction'); C.val(it(A, B).size); });
const n03 = fromRegions({ abc: 4, ab: 8, bc: 6, ac: 5, a: 21, b: 17, c: 15 });
Q('n03', mk.num({ stem: r`Three finite sets have $n(A) = 38$, $n(B) = 35$ and $n(C) = 30$. Their pairwise overlaps are $n(A \cap B) = 12$, $n(B \cap C) = 10$ and $n(A \cap C) = 9$, and $n(A \cap B \cap C) = 4$. Determine how many elements lie in at least one of the three sets.`, value: 76, sol: r`Singles, minus pairs, plus triple: $38 + 35 + 30 - 12 - 10 - 9 + 4 = 76$.`, scheme: [['76', 1]], d: 3, c: 'application', t: [3], time: 100 }),
  (C) => { const { A, B, C: Cc } = n03; C.assert(A.size === 38 && B.size === 35 && Cc.size === 30 && it(A, B).size === 12 && it(B, Cc).size === 10 && it(A, Cc).size === 9 && it(it(A, B), Cc).size === 4, 'construction'); C.val(un(un(A, B), Cc).size); });
Q('n04', mk.num({ stem: r`How many integers belong to the set $[-5, 1) \cup (-1, 4]$?`, value: 10, sol: r`The intervals overlap on $(-1, 1)$, so together they make $[-5, 4]$. The integers $-5, -4, \dots, 4$ number $4 - (-5) + 1 = 10$.`, scheme: [['10', 1]], d: 3, c: 'application', t: [2, 3], time: 90 }),
  (C) => { C.assert(agrees((x) => inIv(iv(-5, 1, true, false), x) || inIv(iv(-1, 4, false, true), x), [iv(-5, 4)]), 'union is [-5, 4]'); C.val(N(-12, 12).filter((x) => inIv(iv(-5, 1, true, false), x) || inIv(iv(-1, 4, false, true), x)).length); });
const n05A = filt(S(N(1, 60)), (x) => 48 % x === 0), n05B = filt(S(N(1, 60)), (x) => 36 % x === 0);
Q('n05', mk.num({ stem: r`Let $A$ be the set of positive divisors of $48$ and $B$ the set of positive divisors of $36$. Find the sum of all elements of $A - B$.`, value: 96, sol: r`$A - B = \{8, 16, 24, 48\}$ and the sum is $8 + 16 + 24 + 48 = 96$.`, scheme: [['96', 1]], d: 3, c: 'application', t: [3], time: 100 }),
  (C) => { C.assert(arr(df(n05A, n05B)).join() === '8,16,24,48', 'A - B'); C.val(sum(df(n05A, n05B))); });
Q('n06', mk.num({ stem: r`How many sets $X$ satisfy $X \subseteq \{1, 2, 3, 4, 5, 6\}$ and $X \cap \{1, 2, 3\} = \{1, 3\}$?`, value: 8, sol: r`$X$ must contain $1$ and $3$ and must leave out $2$. The elements $4, 5, 6$ are free: $2^3 = 8$.`, scheme: [['8', 1]], d: 4, c: 'analysis', t: [2, 3], time: 120 }),
  (C) => C.val(subsets(S(N(1, 6))).filter((a) => same(it(S(a), S([1, 2, 3])), S([1, 3]))).length));

void sum;
