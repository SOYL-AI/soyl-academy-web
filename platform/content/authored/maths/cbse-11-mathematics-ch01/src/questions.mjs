// CBSE 11 Mathematics ch01 Sets — objective items (mcq, assertion-reason, true-false, fill-blank, numerical).
// Every set is built as a JS Set and every key re-derived by enumeration (intervals: sampled on a 1/16 grid, end points tested).
import { Q, mk } from './lib.mjs';
import { range, S, arr, un, it, df, cp, subset, same, filt, sum, key, subsets, GRID, iv, inIv, inAny, agrees, fromRegions, allSubsets, venn2 } from './sets.mjs';
/** String.raw, except that a backslash-n not followed by a lower-case letter (so not ne, notin) becomes a newline. */
const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

const N = (a, b) => range(a, b);
const sub4 = allSubsets(4); // all 16 subsets of {1, 2, 3, 4}
const U4 = S(N(1, 4));
const eachPair = (f) => sub4.every((A) => sub4.every((B) => f(A, B)));
const eachTriple = (f) => sub4.every((A) => sub4.every((B) => sub4.every((C) => f(A, B, C))));

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`Which of these collections is well defined, and so forms a set?`, opts: ['The tastiest street snacks of Lucknow', 'The prime numbers between $20$ and $40$', 'The cleverest pupils of a Class 11 section', 'The most beautiful rivers of India'], key: 'b', sol: r`A set needs a clear rule that decides membership. "Prime and between $20$ and $40$" does: $23, 29, 31, 37$. "Tastiest", "cleverest" and "most beautiful" depend on opinion.`, d: 1, c: 'recall', t: [1], time: 40 }),
  (C) => { C.assert(arr(filt(S(N(20, 40)), (x) => x > 20 && x < 40 && x > 1 && N(2, x - 1).every((p) => x % p))).join() === '23,29,31,37', 'primes 23, 29, 31, 37'); C.key('b'); });

const m02U = S(N(-10, 10));
const m02 = filt(m02U, (x) => Math.abs(x % 2) === 1 && x * x < 20);
Q('m02', mk.mcq({ stem: r`In roster form, the set $\{x \in \mathbb{Z} : x \text{ is odd and } x^2 < 20\}$ is`, opts: [r`$\{1, 3\}$`, r`$\{-3, -1, 1, 3\}$`, r`$\{-5, -3, -1, 1, 3, 5\}$`, r`$\{-1, 1\}$`], key: 'b', sol: r`Odd integers with $x^2 < 20$ need $|x| \le 4$, so $x = \pm 1, \pm 3$. Negative integers belong to $\mathbb{Z}$ too, and $x = \pm 5$ gives $25 > 20$.`, d: 2, c: 'application', t: [1], time: 60 }),
  (C) => C.which([key(S([1, 3])), key(m02), key(filt(m02U, (x) => Math.abs(x % 2) === 1 && x * x <= 25)), key(filt(m02U, (x) => Math.abs(x % 2) === 1 && x * x < 9))], key(m02)));

const m03 = filt(S(N(-20, 20)), (x) => -3 <= 2 * x + 1 && 2 * x + 1 < 9);
Q('m03', mk.mcq({ stem: r`How many elements does $\{x \in \mathbb{Z} : -3 \le 2x + 1 < 9\}$ have?`, opts: ['$4$', '$5$', '$6$', '$7$'], key: 'c', sol: r`$-3 \le 2x + 1 < 9$ gives $-4 \le 2x < 8$, so $-2 \le x < 4$. The integers are $-2, -1, 0, 1, 2, 3$: $6$ elements.`, d: 2, c: 'application', t: [1], time: 75 }),
  (C) => C.which([4, 5, 6, 7], m03.size));

Q('m04', mk.mcq({ stem: r`Which of these sets has no element at all?`, opts: [r`$\{x \in \mathbb{R} : x^2 + 4 = 0\}$`, r`$\{x \in \mathbb{Z} : x^2 = 16\}$`, r`$\{x \in \mathbb{Q} : 5x = 2\}$`, r`$\{x \in \mathbb{N} : x < 2\}$`], key: 'a', sol: r`$x^2 + 4 \ge 4 > 0$ for every real $x$, so the first set is empty. The others hold $\pm 4$, $\dfrac25$ and $1$ respectively.`, d: 2, c: 'understanding', t: [1], time: 60 }),
  (C) => C.which([GRID.every((x) => x * x + 4 !== 0), !N(-30, 30).some((x) => x * x === 16), !(Math.abs(5 * (2 / 5) - 2) < 1e-12), !N(1, 30).some((x) => x < 2)], true));

Q('m05', mk.mcq({ stem: r`Which pair of sets is equal?`, opts: [r`$\{x \in \mathbb{R} : x^2 - 7x + 12 = 0\}$ and $\{3, 4, 4\}$`, r`$\{1, 2, 3\}$ and $\{x \in \mathbb{N} : x < 3\}$`, r`$\{x \in \mathbb{Z} : x^2 = 9\}$ and $\{3\}$`, r`$\{0\}$ and $\varnothing$`], key: 'a', sol: r`$x^2 - 7x + 12 = (x - 3)(x - 4)$ has roots $3$ and $4$, and repeating $4$ does not change a set. The other pairs differ: $\{1, 2\}$ against $\{1, 2, 3\}$; $\{-3, 3\}$ against $\{3\}$; one element against none.`, d: 2, c: 'application', t: [1], time: 75 }),
  (C) => { const roots = filt(S(N(-30, 30)), (x) => x * x - 7 * x + 12 === 0); C.which([same(roots, S([3, 4, 4])), same(S([1, 2, 3]), filt(S(N(1, 30)), (x) => x < 3)), same(filt(S(N(-30, 30)), (x) => x * x === 9), S([3])), same(S([0]), S([]))], true); });

Q('m06', mk.mcq({ stem: r`A set has $5$ elements. How many of its subsets are non-empty and proper?`, opts: ['$25$', '$30$', '$31$', '$32$'], key: 'b', sol: r`A $5$-element set has $2^5 = 32$ subsets. Remove the empty set and the set itself: $32 - 2 = 30$.`, d: 2, c: 'application', t: [2], time: 60 }),
  (C) => C.which([25, 30, 31, 32], subsets(S(N(1, 5))).filter((a) => a.length > 0 && a.length < 5).length));

Q('m07', mk.mcq({ stem: r`For $A = \{1, 2, 3, 4, 5\}$, which statement is correct?`, opts: [r`$\{1, 2\} \in A$`, r`$\{1, 2\} \subset A$`, r`$2 \subset A$`, r`$\varnothing \in A$`], key: 'b', sol: r`Every element of $\{1, 2\}$ lies in $A$, so $\{1, 2\} \subset A$. The set $\{1, 2\}$ is not itself an element of $A$; $2$ is an element, not a subset; and $\varnothing$ is a subset of $A$, not an element.`, d: 2, c: 'understanding', t: [2], time: 60 }),
  (C) => { const A = S(N(1, 5)); const hasSet = (X) => [...A].some((e) => e instanceof Set && same(e, X)); C.which([hasSet(S([1, 2])), subset(S([1, 2]), A), false, hasSet(S([]))], true); });

Q('m08', mk.mcq({ stem: r`The interval $[-1, 4)$ is the same set as`, opts: [r`$\{x \in \mathbb{R} : -1 < x \le 4\}$`, r`$\{x \in \mathbb{R} : -1 \le x < 4\}$`, r`$\{x \in \mathbb{R} : -1 \le x \le 4\}$`, r`$\{x \in \mathbb{R} : -1 < x < 4\}$`], key: 'b', sol: r`The square bracket at $-1$ means $-1$ is included ($-1 \le x$); the round bracket at $4$ means $4$ is excluded ($x < 4$).`, d: 1, c: 'understanding', t: [2], time: 45 }),
  (C) => { const I = [iv(-1, 4, true, false)]; C.which([(x) => -1 < x && x <= 4, (x) => -1 <= x && x < 4, (x) => -1 <= x && x <= 4, (x) => -1 < x && x < 4].map((p) => agrees(p, I)), true); });

Q('m09', mk.mcq({ stem: r`How many integers belong to the interval $(-2, 3]$?`, opts: ['$3$', '$4$', '$5$', '$6$'], key: 'c', sol: r`$-2$ is excluded and $3$ is included, so the integers are $-1, 0, 1, 2, 3$: five of them. (Counting $-2$ as well would give $6$.)`, d: 2, c: 'understanding', t: [2], time: 45 }),
  (C) => C.which([3, 4, 5, 6], N(-10, 10).filter((x) => inIv(iv(-2, 3, false, true), x)).length));

const m10A = filt(S(N(1, 40)), (x) => x % 4 === 0), m10B = filt(S(N(1, 40)), (x) => x % 6 === 0);
Q('m10', mk.mcq({ stem: r`Roll numbers $1$ to $40$ are listed. $A$ holds the roll numbers divisible by $4$ and $B$ those divisible by $6$. Then $n(A \cap B)$ equals`, opts: ['$3$', '$6$', '$10$', '$13$'], key: 'a', sol: r`A number divisible by both $4$ and $6$ is a multiple of their least common multiple $12$: $12, 24, 36$. So $n(A \cap B) = 3$. The values $6$, $10$ and $13$ are $n(B)$, $n(A)$ and $n(A \cup B)$.`, d: 3, c: 'application', t: [3], time: 90 }),
  (C) => { C.assert(m10B.size === 6 && m10A.size === 10 && un(m10A, m10B).size === 13, 'n(B), n(A), n(A union B)'); C.which([3, 6, 10, 13], it(m10A, m10B).size); });

const m11U = S(N(1, 12)), m11A = filt(m11U, (x) => x % 2 === 0), m11B = filt(m11U, (x) => x % 3 === 0);
Q('m11', mk.mcq({ stem: r`$U = \{1, 2, \dots, 12\}$, $A$ is the set of even numbers in $U$ and $B$ the set of multiples of $3$ in $U$. The set $A - B$ is`, opts: [r`$\{2, 4, 8, 10\}$`, r`$\{6, 12\}$`, r`$\{3, 9\}$`, r`$\{2, 3, 4, 8, 9, 10\}$`], key: 'a', sol: r`$A - B$ keeps the even numbers that are not multiples of $3$: $2, 4, 8, 10$. The other sets are $A \cap B$, $B - A$ and the elements in exactly one of the two sets.`, d: 2, c: 'understanding', t: [3], time: 75 }),
  (C) => C.which([key(S([2, 4, 8, 10])), key(S([6, 12])), key(S([3, 9])), key(S([2, 3, 4, 8, 9, 10]))], key(df(m11A, m11B))));

const m12U = S(N(1, 15)), m12A = filt(m12U, (x) => x > 1 && N(2, x - 1).every((p) => x % p));
Q('m12', mk.mcq({ stem: r`The universal set is $U = \{1, 2, \dots, 15\}$ and $A$ is the set of primes in $U$. Then $n(A')$ equals`, opts: ['$6$', '$8$', '$9$', '$10$'], key: 'c', sol: r`$A = \{2, 3, 5, 7, 11, 13\}$ has $6$ elements, so $n(A') = 15 - 6 = 9$ (the number $1$ is not prime and belongs to $A'$). Counting only composites would give $8$.`, d: 2, c: 'application', t: [3], time: 75 }),
  (C) => { C.assert(m12A.size === 6 && N(2, 15).filter((x) => !m12A.has(x)).length === 8, 'primes and composites'); C.which([6, 8, 9, 10], cp(m12U, m12A).size); });

Q('m13', mk.mcq({ stem: r`In a Class 11 section, $18$ students take Economics ($A$), $14$ take Accountancy ($B$) and $5$ take both. The number taking at least one of the two is`, opts: ['$32$', '$27$', '$22$', '$37$'], key: 'b', sol: r`$n(A \cup B) = n(A) + n(B) - n(A \cap B) = 18 + 14 - 5 = 27$. Adding without subtracting counts the $5$ students twice and gives $32$.`, d: 2, c: 'application', t: [4], time: 60 }),
  (C) => { const { A, B } = fromRegions({ a: 13, ab: 5, b: 9 }); C.assert(A.size === 18 && B.size === 14 && it(A, B).size === 5, 'construction'); C.which([18 + 14, un(A, B).size, 18 + 14 - 10, 18 + 14 + 5], 27); });

Q('m14', mk.mcq({ stem: r`A theatre sold $60$ tickets, and $38$ of them were for the evening show. How many tickets were not for the evening show?`, opts: ['$98$', '$38$', '$22$', '$60$'], key: 'c', sol: r`With $U$ the $60$ tickets and $A$ the evening tickets, $n(A') = n(U) - n(A) = 60 - 38 = 22$.`, d: 1, c: 'understanding', t: [3], time: 45 }),
  (C) => { const U = S(N(1, 60)), A = S(N(1, 38)); C.which([60 + 38, 38, cp(U, A).size, 60], 22); });

Q('m15', mk.mcq({ stem: r`De Morgan's law for union: the set $(A \cup B)'$ is equal to`, opts: [r`$A' \cup B'$`, r`$A' \cap B'$`, r`$A \cap B'$`, r`$(A \cap B)'$`], key: 'b', sol: r`An element outside $A \cup B$ is outside $A$ and outside $B$, i.e. in $A' \cap B'$. The set $A' \cup B'$ equals $(A \cap B)'$, the other De Morgan law.`, d: 2, c: 'recall', t: [3], time: 45 }),
  (C) => { const lhs = (A, B) => cp(U4, un(A, B)); C.which([eachPair((A, B) => same(lhs(A, B), un(cp(U4, A), cp(U4, B)))), eachPair((A, B) => same(lhs(A, B), it(cp(U4, A), cp(U4, B)))), eachPair((A, B) => same(lhs(A, B), it(A, cp(U4, B)))), eachPair((A, B) => same(lhs(A, B), cp(U4, it(A, B))))], true); });

Q('m16', mk.mcq({ stem: r`The distributive law for sets states that $A \cap (B \cup C)$ is equal to`, opts: [r`$(A \cap B) \cup C$`, r`$(A \cap B) \cup (A \cap C)$`, r`$(A \cup B) \cap (A \cup C)$`, r`$A \cup (B \cap C)$`], key: 'b', sol: r`Intersection distributes over union: an element of $A$ that lies in $B$ or in $C$ lies in $A \cap B$ or in $A \cap C$. Option $(A \cup B) \cap (A \cup C)$ equals $A \cup (B \cap C)$, the other distributive law.`, d: 2, c: 'recall', t: [3], time: 60 }),
  (C) => { const lhs = (A, B, Cc) => it(A, un(B, Cc)); C.which([eachTriple((A, B, Cc) => same(lhs(A, B, Cc), un(it(A, B), Cc))), eachTriple((A, B, Cc) => same(lhs(A, B, Cc), un(it(A, B), it(A, Cc)))), eachTriple((A, B, Cc) => same(lhs(A, B, Cc), it(un(A, B), un(A, Cc)))), eachTriple((A, B, Cc) => same(lhs(A, B, Cc), un(A, it(B, Cc))))], true); });

Q('m17', mk.mcq({ stem: r`Of the $35$ volunteers in a clean-up drive ($A$), $12$ also joined the tree-planting team ($B$). The number who joined only the clean-up drive is`, opts: ['$47$', '$23$', '$12$', '$35$'], key: 'b', sol: r`Only the clean-up drive means $A - B$: $n(A - B) = n(A) - n(A \cap B) = 35 - 12 = 23$.`, d: 2, c: 'understanding', t: [4], time: 60 }),
  (C) => { const { A, B } = fromRegions({ a: 23, ab: 12 }); C.assert(A.size === 35 && it(A, B).size === 12, 'construction'); C.which([35 + 12, df(A, B).size, 12, 35], 23); });

Q('m18', mk.mcq({ stem: r`How many sets $X$ satisfy $\{1, 2\} \subseteq X \subseteq \{1, 2, 3, 4, 5, 6\}$?`, opts: ['$8$', '$12$', '$16$', '$32$'], key: 'c', sol: r`$X$ must contain $1$ and $2$; each of the other four elements $3, 4, 5, 6$ may be in or out: $2^4 = 16$ sets. Allowing all six to vary would give $2^6 = 64$, and fixing only one of $1, 2$ gives $32$.`, d: 4, c: 'analysis', t: [2], time: 120 }),
  (C) => C.which([8, 12, 16, 32], subsets(S(N(1, 6))).filter((a) => a.includes(1) && a.includes(2)).length));

Q('m19', mk.mcq({ stem: r`If $A = (-3, 2]$ and $B = [0, 5)$ are intervals on the real line, then $A \cap B$ is`, opts: [r`$[0, 2]$`, r`$(0, 2]$`, r`$[0, 2)$`, r`$(-3, 5)$`], key: 'a', sol: r`The overlap starts at $0$, which is in $B$ and also in $A$ (since $-3 < 0 \le 2$), and ends at $2$, which is in $A$ and in $B$ (since $0 \le 2 < 5$). So both end points belong: $[0, 2]$.`, d: 3, c: 'application', t: [2, 3], time: 75 }),
  (C) => { const pred = (x) => inIv(iv(-3, 2, false, true), x) && inIv(iv(0, 5, true, false), x); C.which([[iv(0, 2)], [iv(0, 2, false, true)], [iv(0, 2, true, false)], [iv(-3, 5, false, false)]].map((Is) => agrees(pred, Is)), true); });

Q('m20', mk.mcq({ stem: r`If $A \subseteq B$ and $B \subseteq A$ for two sets $A$ and $B$, then`, opts: [r`$A$ is a proper subset of $B$`, r`$A = B$`, r`$A \cap B = \varnothing$`, r`$A \cup B = \varnothing$`], key: 'b', sol: r`Each set is contained in the other, so they have exactly the same elements: $A = B$. This is how equality of two sets is proved.`, d: 1, c: 'understanding', t: [1, 2], time: 40 }),
  (C) => { const S3 = allSubsets(3); const both = S3.flatMap((A) => S3.filter((B) => subset(A, B) && subset(B, A)).map((B) => [A, B])); C.assert(both.length === 8 && both.every(([A, B]) => same(A, B)), 'mutual subsets are equal'); C.which([false, true, false, false], true); });

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The empty set $\varnothing$ is a subset of $\{4, 7, 9\}$.`, r: r`The empty set has no element that fails to lie in $\{4, 7, 9\}$.`, key: 'a', sol: r`$X \subseteq Y$ asks that no element of $X$ lies outside $Y$. The empty set has no elements at all, so the condition holds, and R is exactly why A is true.`, d: 2, c: 'understanding', t: [2] }),
  (C) => { const T = S([4, 7, 9]); C.assert(subset(S([]), T) && allSubsets(3).every((X) => subset(S([]), X)), 'empty set is in every subset'); C.key('a'); });
Q('ar2', mk.ar({ a: r`The sets $\{1, 2, 2, 3\}$ and $\{3, 1, 2\}$ are equal.`, r: r`Any two sets with the same number of elements are equal.`, key: 'c', sol: r`A is true: repetition and order do not change a set, so both are $\{1, 2, 3\}$. R is false: $\{1, 2, 3\}$ and $\{4, 5, 6\}$ both have $3$ elements but share none.`, d: 2, c: 'understanding', t: [1] }),
  (C) => { C.assert(same(S([1, 2, 2, 3]), S([3, 1, 2])) && S([1, 2, 2, 3]).size === 3, 'equal'); C.assert(!same(S([1, 2, 3]), S([4, 5, 6])) && S([1, 2, 3]).size === S([4, 5, 6]).size, 'same size, not equal'); C.key('c'); });
Q('ar3', mk.ar({ a: r`The set of positive divisors of $12$ is infinite.`, r: r`A set is finite when counting its elements comes to an end.`, key: 'd', sol: r`The positive divisors of $12$ are $1, 2, 3, 4, 6, 12$, six elements, so A is false. R is the correct description of a finite set, so R is true.`, d: 2, c: 'understanding', t: [1] }),
  (C) => { const dv = N(1, 12).filter((x) => 12 % x === 0); C.assert(dv.join() === '1,2,3,4,6,12' && N(13, 200).every((x) => 12 % x !== 0), 'six divisors'); C.key('d'); });
Q('ar4', mk.ar({ a: r`The intersection $[1, 3] \cap [3, 5]$ is the single-element set $\{3\}$.`, r: r`The intersection of two sets is a subset of each of the two sets.`, key: 'b', sol: r`A is true: $3$ is the only real number lying in both closed intervals (checked at every sixteenth between $0$ and $6$). R is also true, but it does not explain why this overlap has one element, so R is not the correct explanation.`, d: 3, c: 'application', t: [2, 3] }),
  (C) => { const pts = GRID.filter((x) => inIv(iv(1, 3), x) && inIv(iv(3, 5), x)); C.assert(pts.length === 1 && pts[0] === 3, 'only 3'); C.assert(eachPair((A, B) => subset(it(A, B), A) && subset(it(A, B), B)), 'intersection is inside each'); C.key('b'); });
Q('ar5', mk.ar({ a: r`For any two sets $A$ and $B$, the sets $A - B$ and $A \cap B$ have no element in common.`, r: r`Every element of $A - B$ is outside $B$, while every element of $A \cap B$ is inside $B$.`, key: 'a', sol: r`An element in both sets would have to be both outside $B$ and inside $B$, which is impossible. R states exactly this, so it explains A.`, d: 3, c: 'analysis', t: [3] }),
  (C) => { C.assert(eachPair((A, B) => it(df(A, B), it(A, B)).size === 0 && [...df(A, B)].every((x) => !B.has(x)) && [...it(A, B)].every((x) => B.has(x))), 'disjoint'); C.key('a'); });
Q('ar6', mk.ar({ a: r`If $A \subseteq B$, then $A \cup B = B$.`, r: r`If $A \subseteq B$, then $A \cap B = B$.`, key: 'c', sol: r`A is true: nothing in $A$ adds a new element to $B$. R is false: when $A \subseteq B$ the common part is $A$, so $A \cap B = A$ (for example $A = \{1\}$, $B = \{1, 2\}$ gives $A \cap B = \{1\}$, not $B$).`, d: 3, c: 'analysis', t: [2, 3] }),
  (C) => { const S4 = sub4; C.assert(S4.every((A) => S4.every((B) => !subset(A, B) || (same(un(A, B), B) && same(it(A, B), A)))), 'A subset B: union is B, intersection is A'); C.assert(!same(it(S([1]), S([1, 2])), S([1, 2])), 'counterexample for R'); C.key('c'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`The set $\{\varnothing\}$ has no element, so it is the empty set.`, key: 'f', sol: r`$\{\varnothing\}$ has exactly one element, namely $\varnothing$. It is a box holding an empty box, not an empty set.`, d: 2, c: 'understanding', t: [1] }),
  (C) => { const box = new Set([new Set()]); C.assert(box.size === 1, 'one element'); C.key('f'); });
Q('tf2', mk.tf({ stem: r`The interval $(2, 5]$ is a subset of the interval $[2, 5]$.`, key: 't', sol: r`Every number with $2 < x \le 5$ also satisfies $2 \le x \le 5$. (The converse fails: $2$ is in $[2, 5]$ but not in $(2, 5]$.)`, d: 2, c: 'understanding', t: [2] }),
  (C) => { C.assert(GRID.every((x) => !inIv(iv(2, 5, false, true), x) || inIv(iv(2, 5), x)) && inIv(iv(2, 5), 2) && !inIv(iv(2, 5, false, true), 2), 'subset, not equal'); C.key('t'); });
Q('tf3', mk.tf({ stem: r`If two finite sets $A$ and $B$ satisfy $n(A) = n(B)$, then $A = B$.`, key: 'f', sol: r`Equal sets have the same elements, not merely the same count: $\{a, b\}$ and $\{c, d\}$ both have $2$ elements but are different sets.`, d: 1, c: 'understanding', t: [1] }),
  (C) => { C.assert(S(['a', 'b']).size === S(['c', 'd']).size && !same(S(['a', 'b']), S(['c', 'd'])), 'counterexample'); C.key('f'); });
Q('tf4', mk.tf({ stem: r`The union of the intervals $[1, 2]$ and $(2, 3]$ is the interval $[1, 3]$.`, key: 't', sol: r`The first interval covers $1 \le x \le 2$ and the second covers $2 < x \le 3$. Together they cover $1 \le x \le 3$ with no gap, because $2$ is already in the first.`, d: 3, c: 'application', t: [2, 3] }),
  (C) => { C.assert(agrees((x) => inIv(iv(1, 2), x) || inIv(iv(2, 3, false, true), x), [iv(1, 3)]), 'union is [1, 3]'); C.key('t'); });
Q('tf5', mk.tf({ stem: r`For any two sets $A$ and $B$, the set $A \cap B$ is always a subset of $A \cup B$.`, key: 't', sol: r`An element of $A \cap B$ is in $A$, and so it is in $A \cup B$.`, d: 1, c: 'understanding', t: [3] }),
  (C) => { C.assert(eachPair((A, B) => subset(it(A, B), un(A, B))), 'always'); C.key('t'); });
Q('tf6', mk.tf({ stem: r`The power set of the empty set is the empty set.`, key: 'f', sol: r`The empty set has one subset, namely itself, so its power set is $\{\varnothing\}$ with $2^0 = 1$ element, which is not empty.`, d: 3, c: 'analysis', t: [2] }),
  (C) => { C.assert(subsets(S([])).length === 1 && 2 ** 0 === 1, 'one subset'); C.key('f'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`A set with $6$ elements has exactly ____ subsets.`, acc: [['64']], sol: r`Each element is either in a subset or out of it: $2^6 = 64$.`, d: 1, c: 'understanding', t: [2] }),
  (C) => C.blank(subsets(S(N(1, 6))).length));
Q('fb2', mk.fill({ stem: 'The collection of all subsets of a set $A$ is called the ____ set of $A$.', acc: [['power', 'Power']], sol: 'It is written $P(A)$ and called the power set of $A$.', d: 1, c: 'recall', t: [2] }),
  (C) => C.blank('power'));
Q('fb3', mk.fill({ stem: r`If $A$ is a subset of the universal set $U$, then $A \cup A'$ equals ____.`, acc: [['U', 'the universal set']], sol: r`Every element of $U$ is either in $A$ or in $A'$, so $A \cup A' = U$.`, d: 2, c: 'understanding', t: [3] }),
  (C) => { C.assert(sub4.every((A) => same(un(A, cp(U4, A)), U4) && it(A, cp(U4, A)).size === 0), 'A union A complement is U'); C.blank('U'); });
Q('fb4', mk.fill({ stem: r`Two finite sets have $n(A) = 12$, $n(B) = 9$ and $n(A \cap B) = 4$. Then $n(A \cup B) = $ ____.`, acc: [['17']], sol: r`$n(A \cup B) = 12 + 9 - 4 = 17$.`, d: 2, c: 'understanding', t: [4] }),
  (C) => { const { A, B } = fromRegions({ a: 8, ab: 4, b: 5 }); C.assert(A.size === 12 && B.size === 9 && it(A, B).size === 4, 'construction'); C.blank(un(A, B).size); });
Q('fb5', mk.fill({ stem: r`The set $\{x \in \mathbb{R} : -3 < x \le 4\}$ is written in interval notation as ____.`, acc: [['(-3, 4]', '(-3,4]', '$(-3, 4]$']], sol: r`The left end $-3$ is excluded and the right end $4$ is included: $(-3, 4]$.`, d: 1, c: 'recall', t: [2] }),
  (C) => { C.assert(agrees((x) => -3 < x && x <= 4, [iv(-3, 4, false, true)]), 'interval'); C.blank('(-3, 4]'); });

// =============================================================== numerical
Q('n01', mk.num({ stem: r`How many subsets of $\{1, 2, 3, 4, 5\}$ contain both $3$ and $5$?`, value: 8, sol: r`A subset containing $3$ and $5$ is decided by the other three elements $1, 2, 4$, each in or out: $2^3 = 8$.`, scheme: [['8', 1]], d: 3, c: 'application', t: [2], time: 90 }),
  (C) => C.val(subsets(S(N(1, 5))).filter((a) => a.includes(3) && a.includes(5)).length));
Q('n02', mk.num({ stem: r`How many elements does $\{x \in \mathbb{Z} : |x - 2| \le 3\}$ have?`, value: 7, sol: r`$|x - 2| \le 3$ means $-3 \le x - 2 \le 3$, so $-1 \le x \le 5$. The integers $-1, 0, 1, 2, 3, 4, 5$ give $7$ elements; the count is $5 - (-1) + 1 = 7$.`, scheme: [['7', 1]], d: 2, c: 'understanding', t: [1], time: 75 }),
  (C) => C.val(filt(S(N(-30, 30)), (x) => Math.abs(x - 2) <= 3).size));
Q('n03', mk.num({ stem: r`Of $48$ cadets, $30$ joined the drill squad, $25$ joined the band and $12$ joined both. How many joined neither?`, value: 5, sol: r`At least one: $30 + 25 - 12 = 43$. Neither: $48 - 43 = 5$.`, scheme: [['5', 1]], d: 3, c: 'application', t: [4], time: 90 }),
  (C) => { const A = S(N(1, 30)), B = S(N(19, 43)); C.assert(A.size === 30 && B.size === 25 && it(A, B).size === 12, 'construction'); C.val(48 - un(A, B).size); C.sol([43]); });
Q('n04', mk.num({ stem: r`How many integers lie in $(-3, 4] \cap [0, 7)$?`, value: 5, sol: r`The overlap is $[0, 4]$, because $0$ is in both and $4$ is in both. Its integers are $0, 1, 2, 3, 4$: $5$ of them.`, scheme: [['5', 1]], d: 3, c: 'application', t: [2, 3], time: 90 }),
  (C) => C.val(N(-10, 10).filter((x) => inIv(iv(-3, 4, false, true), x) && inIv(iv(0, 7, true, false), x)).length));
const n05A = filt(S(N(1, 19)), (x) => x % 3 === 0), n05B = filt(S(N(1, 19)), (x) => x % 6 === 0);
Q('n05', mk.num({ stem: r`$A$ is the set of multiples of $3$ below $20$ and $B$ is the set of multiples of $6$ below $20$. Find the sum of all elements of $A - B$.`, value: 27, sol: r`$A = \{3, 6, 9, 12, 15, 18\}$ and $B = \{6, 12, 18\}$, so $A - B = \{3, 9, 15\}$ and the sum is $3 + 9 + 15 = 27$.`, scheme: [['27', 1]], d: 3, c: 'application', t: [3], time: 90 }),
  (C) => { C.assert(arr(df(n05A, n05B)).join() === '3,9,15', 'A - B'); C.val(sum(df(n05A, n05B))); });
Q('n06', mk.num({ stem: r`For three finite sets, $n(A) = 20$, $n(B) = 15$, $n(C) = 12$, $n(A \cap B) = 6$, $n(B \cap C) = 5$, $n(A \cap C) = 4$ and $n(A \cap B \cap C) = 2$. Find $n(A \cup B \cup C)$.`, value: 34, sol: r`$n(A \cup B \cup C) = 20 + 15 + 12 - 6 - 5 - 4 + 2 = 34$.`, scheme: [['34', 1]], d: 4, c: 'application', t: [4], time: 120 }),
  (C) => { const { A, B, C: Cc } = fromRegions({ abc: 2, ab: 4, bc: 3, ac: 2, a: 12, b: 6, c: 5 }); C.assert(A.size === 20 && B.size === 15 && Cc.size === 12 && it(A, B).size === 6 && it(B, Cc).size === 5 && it(A, Cc).size === 4 && it(it(A, B), Cc).size === 2, 'construction'); C.val(un(un(A, B), Cc).size); });

void venn2;
