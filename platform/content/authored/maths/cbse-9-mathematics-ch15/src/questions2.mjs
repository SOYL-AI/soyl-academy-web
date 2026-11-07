// CBSE 9 Mathematics ch15 Introduction to Probability: written items (short 2 and 3 marks, long 5 marks, case-based). Every number is
// recomputed from the counts, the sample space or the simulated experiments; every stem has its own context.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, close, rd, sum } from './h.mjs';
import { fs, frac, pr, upto, isPrime, isSquare } from './p.mjs';
import { COIN_N, COIN_H, fWeeks, WEEKS } from './figs.mjs';

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'Write the five words impossible, unlikely, even chance, likely and certain in order from the least to the most likely event, and give a number or a range of numbers for each word.', model: r`Impossible, unlikely, even chance, likely, certain.\n\nImpossible: $0$. Unlikely: between $0$ and $\dfrac{1}{2}$, close to $0$. Even chance: $\dfrac{1}{2}$. Likely: between $\dfrac{1}{2}$ and $1$, close to $1$. Certain: $1$.`, sol: 'The words in order with 0, a small value, one half, a large value and 1.', scheme: [['The five words in the right order', 1], ['A number or range for each word', 1]], d: 1, c: 'recall', t: [1], time: 90 }), null, 'ordering and ranges of the words: marked by the scheme');
Q('s202', mk.short({ marks: 2, stem: r`Mahesh drops a drawing pin $80$ times on the floor of his school lab in Nashik. It lands with the point up $52$ times. Find the empirical probability that it lands point up and that it lands point down.`, model: r`Point up: $\dfrac{52}{80} = \dfrac{13}{20}$.\n\nPoint down: $80 - 52 = 28$ trials, so $\dfrac{28}{80} = \dfrac{7}{20}$.`, sol: 'Divide each count by the 80 trials.', scheme: [['Point up 13 over 20', 1], ['Point down 7 over 20', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => {
  Cx.assert(fs(52, 80) === '13/20' && fs(80 - 52, 80) === '7/20', '13/20 and 7/20');
  Cx.model([52, 80, 13, 20, 28, 7]);
});
Q('s204', mk.short({ marks: 2, stem: r`In a simulated coin experiment, $10$ tosses gave $6$ heads and $1000$ tosses gave $501$ heads. Find the relative frequency of heads in each case, and say which is the better estimate of the probability of a head, with a reason.`, model: r`After $10$ tosses: $\dfrac{6}{10} = 0.6$. After $1000$ tosses: $\dfrac{501}{1000} = 0.501$.\n\nThe $1000$-toss value is the better estimate, because more trials give a steadier relative frequency, and it is very close to $\dfrac{1}{2}$.`, sol: 'Relative frequencies 0.6 and 0.501; more trials are better.', scheme: [['Relative frequencies 0.6 and 0.501', 1], ['1000 tosses is better: more trials, steadier value', 1]], d: 2, c: 'understanding', t: [1], time: 100 }), (Cx) => {
  Cx.assert(COIN_N[0] === 10 && COIN_H[0] === 6 && COIN_N[4] === 1000 && COIN_H[4] === 501 && Math.abs(COIN_H[4] / 1000 - 0.5) < Math.abs(COIN_H[0] / 10 - 0.5), '0.6 and 0.501; the second is nearer one half');
  Cx.model([0.6, 0.501, 1000]);
});
Q('s205', mk.short({ marks: 2, stem: r`A box at a Madurai tea shop holds $20$ sachets: $7$ masala, $8$ ginger and $5$ cardamom. One sachet is taken without looking. Find the probability that it is ginger and the probability that it is not ginger.`, model: r`$P(\text{ginger}) = \dfrac{8}{20} = \dfrac{2}{5}$.\n\n$P(\text{not ginger}) = 1 - \dfrac{2}{5} = \dfrac{3}{5}$.`, sol: 'Ginger over all sachets; then one minus that.', scheme: [['P(ginger) = 2 over 5', 1], ['P(not ginger) = 3 over 5', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  Cx.assert(7 + 8 + 5 === 20 && fs(8, 20) === '2/5' && fs(20 - 8, 20) === '3/5', '2/5 and 3/5');
  Cx.model([8, 20, 2, 5, 3]);
});
Q('s206', mk.short({ marks: 2, stem: r`A bowl at a quiz in Bhubaneswar holds $30$ slips numbered $1$ to $30$. One slip is drawn at random. Find the probability that its number is a multiple of $6$, and the probability that it is not.`, model: r`The multiples of $6$ are $6, 12, 18, 24, 30$, which is $5$ slips, so $P = \dfrac{5}{30} = \dfrac{1}{6}$.\n\n$P(\text{not a multiple of } 6) = 1 - \dfrac{1}{6} = \dfrac{5}{6}$.`, sol: 'Five multiples out of thirty; then one minus.', scheme: [['5 favourable slips, P = 1 over 6', 1], ['P(not) = 5 over 6', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  const s = upto(1, 30), p = pr(s, (x) => x % 6 === 0);
  Cx.assert(p.join('/') === '1/6' && fs(25, 30) === '5/6', '1/6 and 5/6');
  Cx.model([5, 30, 1, 6]);
});
Q('s207', mk.short({ marks: 2, stem: r`In a board-game cafe in Pune a fair die is rolled once. Find the probability that the number shown is between $2$ and $5$, both included.`, model: r`The favourable numbers are $2, 3, 4, 5$, which is $4$ of the $6$ equally likely faces.\n\n$P = \dfrac{4}{6} = \dfrac{2}{3}$.`, sol: 'Four favourable faces out of six.', scheme: [['4 favourable outcomes out of 6', 1], ['P = 2 over 3', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  const p = pr(upto(1, 6), (x) => x >= 2 && x <= 5);
  Cx.assert(p.join('/') === '2/3', '2/3');
  Cx.model([4, 6, 2, 3]);
});
Q('s208', mk.short({ marks: 2, stem: 'Priya says, "Tomorrow\'s match can end in a win, a draw or a loss for our school team, which is $3$ outcomes, so the probability of a win is $\\dfrac{1}{3}$." Is her reasoning correct? Give a reason.', model: r`No. The rule $P = \dfrac{\text{favourable outcomes}}{\text{all outcomes}}$ works only when the outcomes are **equally likely**. A win, a draw and a loss need not be equally likely (for example, a strong team is more likely to win), so $\dfrac{1}{3}$ is not justified.\n\nThe probability can be estimated from the record of earlier matches (an empirical probability).`, sol: 'Win, draw and loss are not equally likely; use past matches.', scheme: [['Says the outcomes are not equally likely', 1], ['Suggests using the record of past matches', 1]], d: 3, c: 'evaluation', t: [2], time: 105 }), null, 'a reasoning item: marked by the scheme');

// =============================================================== short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`A survey of $120$ commuters at a station in Lucknow finds that $54$ come by bus, $36$ by metro, $18$ by auto and $12$ on foot. One commuter is chosen at random from the survey. Find the empirical probability for each mode of travel, and the probability that the commuter does not come by bus.`, model: r`Bus: $\dfrac{54}{120} = \dfrac{9}{20}$. Metro: $\dfrac{36}{120} = \dfrac{3}{10}$.\n\nAuto: $\dfrac{18}{120} = \dfrac{3}{20}$. On foot: $\dfrac{12}{120} = \dfrac{1}{10}$.\n\nNot by bus: $1 - \dfrac{9}{20} = \dfrac{11}{20}$ (check: $36 + 18 + 12 = 66$ and $\dfrac{66}{120} = \dfrac{11}{20}$).`, sol: 'Divide each count by 120; not bus is one minus bus.', scheme: [['Bus 9/20 and metro 3/10', 1], ['Auto 3/20 and on foot 1/10', 1], ['Not by bus 11/20', 1]], d: 2, c: 'application', t: [1], time: 150 }), (Cx) => {
  Cx.assert(54 + 36 + 18 + 12 === 120 && fs(54, 120) === '9/20' && fs(36, 120) === '3/10' && fs(18, 120) === '3/20' && fs(12, 120) === '1/10' && fs(66, 120) === '11/20', '9/20, 3/10, 3/20, 1/10, 11/20');
  Cx.model([54, 120, 9, 20, 36, 3, 10, 18, 12, 1, 11]);
});
Q('s302', mk.short({ marks: 3, stem: r`A student in Hubli records the number of heads when a coin is tossed: $13$ heads in $20$ tosses, $56$ heads in $100$ tosses and $255$ heads in $500$ tosses. Find the relative frequency of heads in each record, and say which record gives the best estimate of the probability of a head and why.`, model: r`$\dfrac{13}{20} = 0.65$, $\dfrac{56}{100} = 0.56$ and $\dfrac{255}{500} = 0.51$.\n\nThe record of $500$ tosses gives the best estimate: it has the most trials, so its relative frequency is the steadiest, and $0.51$ is closest to $\dfrac{1}{2}$.`, sol: 'Relative frequencies 0.65, 0.56, 0.51; the longest record is best.', scheme: [['Relative frequencies 0.65, 0.56 and 0.51', 1.5], ['The 500-toss record is best', 1], ['Reason: most trials, closest to one half', 0.5]], d: 3, c: 'analysis', t: [1], time: 150 }), (Cx) => {
  const f = [13 / 20, 56 / 100, 255 / 500];
  Cx.assert(f.join() === '0.65,0.56,0.51' && f[2] === Math.min(...f) && Math.abs(f[2] - 0.5) === Math.min(...f.map((v) => Math.abs(v - 0.5))), '0.65, 0.56, 0.51');
  Cx.model([0.65, 0.56, 0.51, 500]);
});
Q('s303', mk.short({ marks: 3, stem: r`A sweet shop in Madurai packs $40$ pieces in a gift box: $14$ laddus, $10$ barfis, $8$ pedas and $8$ jalebis. A guest takes one piece without looking. Find the probability that it is a barfi, that it is not a peda, and that it is a laddu or a barfi.`, model: r`$P(\text{barfi}) = \dfrac{10}{40} = \dfrac{1}{4}$.\n\nPedas: $8$, so $P(\text{not a peda}) = 1 - \dfrac{8}{40} = \dfrac{32}{40} = \dfrac{4}{5}$.\n\nLaddu or barfi: $14 + 10 = 24$ pieces, so $\dfrac{24}{40} = \dfrac{3}{5}$.`, sol: 'Count the favourable pieces out of 40.', scheme: [['P(barfi) = 1/4', 1], ['P(not a peda) = 4/5', 1], ['P(laddu or barfi) = 3/5', 1]], d: 2, c: 'application', t: [2], time: 150 }), (Cx) => {
  Cx.assert(14 + 10 + 8 + 8 === 40 && fs(10, 40) === '1/4' && fs(32, 40) === '4/5' && fs(24, 40) === '3/5', '1/4, 4/5, 3/5');
  Cx.model([10, 40, 1, 4, 32, 4, 5, 24, 3, 5]);
});
Q('s304', mk.short({ marks: 3, stem: r`In a quiz round at a college in Kolhapur, $25$ cards numbered $1$ to $25$ are shuffled and one is drawn. Find the probability that the number is a perfect square, a prime number, and an odd number with two digits.`, model: r`Perfect squares: $1, 4, 9, 16, 25$, which is $5$ cards, so $\dfrac{5}{25} = \dfrac{1}{5}$.\n\nPrimes: $2, 3, 5, 7, 11, 13, 17, 19, 23$, which is $9$ cards, so $\dfrac{9}{25}$.\n\nOdd two-digit numbers: $11, 13, 15, 17, 19, 21, 23, 25$, which is $8$ cards, so $\dfrac{8}{25}$.`, sol: 'List the favourable cards and divide by 25.', scheme: [['Squares: 1/5', 1], ['Primes: 9/25', 1], ['Odd two-digit numbers: 8/25', 1]], d: 2, c: 'application', t: [2], time: 150 }), (Cx) => {
  const c = upto(1, 25);
  Cx.assert(pr(c, isSquare).join('/') === '1/5' && c.filter(isPrime).length === 9 && c.filter((x) => x >= 10 && x % 2 === 1).length === 8, '1/5, 9/25, 8/25');
  Cx.model([5, 25, 1, 9, 8]);
});
Q('s305', mk.short({ marks: 3, stem: r`In Class 9A of a school in Dhanbad there are $40$ students. A student chosen at random walks to school with probability $\dfrac{3}{8}$ and cycles with probability $\dfrac{1}{4}$; all the others come by bus. Find the number of students who walk, who cycle and who come by bus.`, model: r`Walk: $40 \times \dfrac{3}{8} = 15$ students. Cycle: $40 \times \dfrac{1}{4} = 10$ students.\n\nBus: $40 - 15 - 10 = 15$ students.`, sol: 'Probability times 40 for walkers and cyclists, the rest by bus.', scheme: [['15 walk', 1], ['10 cycle', 1], ['15 come by bus', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => {
  const w = (40 * 3) / 8, c = 40 / 4, b = 40 - w - c;
  Cx.assert(w === 15 && c === 10 && b === 15, '15, 10, 15');
  Cx.model([15, 10, 15]);
});

// =============================================================== long answer, 5 marks
{
  const n = [20, 50, 100, 200, 500], h = [13, 28, 52, 104, 249], f = h.map((v, i) => v / n[i]), dist = f.map((v) => Math.abs(v - 0.5)), best = dist.indexOf(Math.min(...dist));
  Q('l01', mk.long({ stem: r`A student in Thrissur tosses a coin again and again and keeps a running record: after $20$ tosses there are $13$ heads, after $50$ tosses $28$ heads, after $100$ tosses $52$ heads, after $200$ tosses $104$ heads and after $500$ tosses $249$ heads. (a) Find the relative frequency of heads at each stage. (b) At which stage is it closest to $\dfrac{1}{2}$? (c) What is the theoretical probability of a head for a fair coin? (d) Find the difference between the relative frequency after $500$ tosses and the theoretical probability. (e) How many heads would you expect in $2000$ tosses of a fair coin?`, model: r`**(a)** $\dfrac{13}{20} = 0.65$, $\dfrac{28}{50} = 0.56$, $\dfrac{52}{100} = 0.52$, $\dfrac{104}{200} = 0.52$, $\dfrac{249}{500} = 0.498$.\n\n**(b)** After $500$ tosses ($0.498$).\n\n**(c)** A fair coin has $2$ equally likely outcomes, so $P(\text{head}) = \dfrac{1}{2}$.\n\n**(d)** $0.5 - 0.498 = 0.002$.\n\n**(e)** $2000 \times \dfrac{1}{2} = 1000$ heads (about).`, sol: 'Relative frequencies, the closest stage, theory, the difference and the expected heads.', scheme: [['(a) 0.65, 0.56, 0.52, 0.52, 0.498', 1], ['(b) after 500 tosses', 1], ['(c) one half', 1], ['(d) difference 0.002', 1], ['(e) about 1000 heads', 1]], d: 2, c: 'application', t: [1, 2], time: 360 }), (Cx) => {
    Cx.assert(f.join() === '0.65,0.56,0.52,0.52,0.498' && n[best] === 500 && close(0.5 - f[4], 0.002) && 2000 * 0.5 === 1000, '0.65 ... 0.498; 500; 0.002; 1000');
    Cx.model([0.65, 0.56, 0.52, 0.498, 500, 0.002, 1000]);
  });
}
{
  const size = [100, 150, 200, 250, 300], bad = [3, 6, 4, 5, 15], P = bad.map((b, i) => frac(b, size[i])), tot = sum(size), tb = sum(bad), worst = bad.map((b, i) => b / size[i]).indexOf(Math.max(...bad.map((b, i) => b / size[i])));
  Q('l02', mk.long({ stem: r`A factory in Kolhapur tests five lots of LED bulbs. The lots have $100$, $150$, $200$, $250$ and $300$ bulbs, and $3$, $6$, $4$, $5$ and $15$ bulbs in them are found defective. (a) Find the empirical probability that a bulb of lot $1$ is defective. (b) Which lot has the highest probability of a defective bulb, and what is it? (c) Find the empirical probability that a bulb chosen at random from all five lots is defective. (d) Find the probability that it is not defective. (e) About how many defective bulbs would you expect in a consignment of $5000$ bulbs made in the same way?`, model: r`**(a)** $\dfrac{3}{100}$.\n\n**(b)** The probabilities are $\dfrac{3}{100}$, $\dfrac{6}{150} = \dfrac{1}{25}$, $\dfrac{4}{200} = \dfrac{1}{50}$, $\dfrac{5}{250} = \dfrac{1}{50}$ and $\dfrac{15}{300} = \dfrac{1}{20}$. Lot $5$ is the highest, with $\dfrac{1}{20}$.\n\n**(c)** In all, $100 + 150 + 200 + 250 + 300 = 1000$ bulbs and $3 + 6 + 4 + 5 + 15 = 33$ are defective, so $\dfrac{33}{1000}$.\n\n**(d)** $1 - \dfrac{33}{1000} = \dfrac{967}{1000}$.\n\n**(e)** $5000 \times \dfrac{33}{1000} = 165$ bulbs (about).`, sol: 'Lot probabilities, the highest, the total, not defective and an expected number.', scheme: [['(a) 3/100', 1], ['(b) lot 5, 1/20', 1], ['(c) 33/1000', 1], ['(d) 967/1000', 1], ['(e) about 165 bulbs', 1]], d: 3, c: 'analysis', t: [1], time: 420 }), (Cx) => {
    Cx.assert(P[0].join('/') === '3/100' && P[4].join('/') === '1/20' && worst === 4 && tot === 1000 && tb === 33 && fs(1000 - 33, 1000) === '967/1000' && (5000 * tb) / tot === 165, '3/100; lot 5 with 1/20; 33/1000; 967/1000; 165');
    Cx.model([3, 100, 5, 20, 33, 1000, 967, 165]);
  });
}
{
  const t = upto(1, 40), p8 = pr(t, (x) => x % 8 === 0), pp = pr(t, isPrime), ps = pr(t, isSquare), pn = pr(t, (x) => !isPrime(x)), pne = pr(t, (x) => !isPrime(x) && !isSquare(x));
  Q('l03', mk.long({ stem: r`At a garba night in Vadodara, $40$ tokens numbered $1$ to $40$ are put in a basket and one token is drawn at random. Find the probability that the number is (a) a multiple of $8$, (b) a prime number, (c) a perfect square, (d) not a prime number, (e) neither a prime number nor a perfect square.`, model: r`There are $40$ equally likely tokens.\n\n**(a)** $8, 16, 24, 32, 40$ gives $5$ tokens, so $\dfrac{5}{40} = \dfrac{1}{8}$.\n\n**(b)** The primes are $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37$, which is $12$ tokens, so $\dfrac{12}{40} = \dfrac{3}{10}$.\n\n**(c)** $1, 4, 9, 16, 25, 36$ gives $6$ tokens, so $\dfrac{6}{40} = \dfrac{3}{20}$.\n\n**(d)** $1 - \dfrac{3}{10} = \dfrac{7}{10}$.\n\n**(e)** No square is prime, so $12 + 6 = 18$ tokens are prime or square, and $40 - 18 = 22$ are neither: $\dfrac{22}{40} = \dfrac{11}{20}$.`, sol: 'Count the favourable tokens out of 40 for each event.', scheme: [['(a) 1/8', 1], ['(b) 3/10', 1], ['(c) 3/20', 1], ['(d) 7/10', 1], ['(e) 11/20', 1]], d: 2, c: 'application', t: [2], time: 420 }), (Cx) => {
    Cx.assert(p8.join('/') === '1/8' && pp.join('/') === '3/10' && ps.join('/') === '3/20' && pn.join('/') === '7/10' && pne.join('/') === '11/20' && t.filter(isPrime).every((x) => !isSquare(x)), '1/8, 3/10, 3/20, 7/10, 11/20');
    Cx.model([5, 40, 1, 8, 12, 3, 10, 6, 3, 20, 7, 10, 22, 11, 20]);
  });
}
{
  const c = { red: 5, yellow: 8, green: 7, black: 4 }, tot = sum(Object.values(c));
  Q('l04', mk.long({ stem: r`A craft stall in Udaipur sells a bag of beads that holds $5$ red, $8$ yellow, $7$ green and $4$ black beads. A bead is taken out without looking. (a) How many beads are there? Find the probability that it is (b) yellow, (c) green, (d) not black, (e) red or black.`, model: r`**(a)** $5 + 8 + 7 + 4 = 24$ beads, all equally likely.\n\n**(b)** $\dfrac{8}{24} = \dfrac{1}{3}$.\n\n**(c)** $\dfrac{7}{24}$.\n\n**(d)** $1 - \dfrac{4}{24} = 1 - \dfrac{1}{6} = \dfrac{5}{6}$.\n\n**(e)** $5 + 4 = 9$ beads, so $\dfrac{9}{24} = \dfrac{3}{8}$.`, sol: 'Count the beads, then favourable over 24.', scheme: [['(a) 24 beads', 1], ['(b) 1/3', 1], ['(c) 7/24', 1], ['(d) 5/6', 1], ['(e) 3/8', 1]], d: 2, c: 'application', t: [2], time: 360 }), (Cx) => {
    Cx.assert(tot === 24 && fs(c.yellow, tot) === '1/3' && fs(c.green, tot) === '7/24' && fs(tot - c.black, tot) === '5/6' && fs(c.red + c.black, tot) === '3/8', '24; 1/3; 7/24; 5/6; 3/8');
    Cx.model([24, 8, 1, 3, 7, 5, 6, 9]);
  });
}
{
  const cnt = [17, 23, 21, 19, 22, 18], n = sum(cnt), odd = cnt[0] + cnt[2] + cnt[4];
  Q('l05', mk.long({ stem: r`A group of friends in Pune throws a die $120$ times. The faces $1$ to $6$ come up $17$, $23$, $21$, $19$, $22$ and $18$ times. (a) Find the empirical probability of a $6$. (b) Find the theoretical probability of a $6$ and the difference between the two. (c) Find the empirical probability of an odd number and compare it with the theoretical probability. (d) Find the difference between the empirical and the theoretical probability of a $2$. (e) Rani says, "The $2$ came up most often, so the die is biased." Is her conclusion justified? Give a reason.`, model: r`**(a)** $\dfrac{18}{120} = \dfrac{3}{20} = 0.15$.\n\n**(b)** Theory: $\dfrac{1}{6}$. Difference: $\dfrac{1}{6} - \dfrac{3}{20} = \dfrac{10 - 9}{60} = \dfrac{1}{60} \approx 0.017$.\n\n**(c)** Odd faces: $17 + 21 + 22 = 60$, so $\dfrac{60}{120} = \dfrac{1}{2}$, which is exactly the theoretical value $\dfrac{3}{6} = \dfrac{1}{2}$.\n\n**(d)** Empirical: $\dfrac{23}{120}$. Difference: $\dfrac{23}{120} - \dfrac{1}{6} = \dfrac{23 - 20}{120} = \dfrac{3}{120} = \dfrac{1}{40} = 0.025$.\n\n**(e)** No. A difference of $0.025$ is small, and every face differs a little from $\dfrac{1}{6}$ in a short experiment of $120$ throws. Throw the die many more times before saying it is biased.`, sol: 'Empirical against theoretical for a 6, odd numbers and a 2; a small gap does not show a biased die.', scheme: [['(a) 3/20', 1], ['(b) theory 1/6, difference 1/60', 1], ['(c) 1/2 for both', 1], ['(d) 23/120, difference 1/40', 1], ['(e) not justified: small difference, few throws', 1]], d: 4, c: 'evaluation', t: [1, 2], time: 480 }), (Cx) => {
    Cx.assert(n === 120 && fs(cnt[5], n) === '3/20' && close(1 / 6 - 3 / 20, 1 / 60) && odd === 60 && fs(odd, n) === '1/2' && close(cnt[1] / n - 1 / 6, 1 / 40) && cnt.every((v) => Math.abs(v / n - 1 / 6) < 0.03), '3/20; 1/60; 1/2; 1/40; every gap below 0.03');
    Cx.model([18, 120, 3, 20, 1, 6, 1, 60, 60, 23, 1, 40]);
  });
}

// =============================================================== case-based
{
  const sown = [80, 60, 60], germ = [68, 45, 57], ts = sum(sown), tg = sum(germ), top = germ.map((g, i) => g / sown[i]), best = top.indexOf(Math.max(...top));
  caseQ('c01', {
    passage: r`A nursery in Nashik sows $80$ tomato seeds, $60$ brinjal seeds and $60$ okra seeds in trays. After two weeks $68$ tomato seeds, $45$ brinjal seeds and $57$ okra seeds have germinated.`,
    d: 2, c: 'application',
    model: r`(a) Option (a). (b) $85$. (c) (i) Okra, $\dfrac{19}{20}$. Or (ii) $425$.`,
    sol: r`(a) The ratios come from counting what happened in the trays, so they are empirical probabilities. (b) $\dfrac{68 + 45 + 57}{200} = \dfrac{170}{200} = 0.85$, which is $85\%$. (c) (i) Tomato $\dfrac{68}{80} = \dfrac{17}{20}$, brinjal $\dfrac{45}{60} = \dfrac{3}{4}$, okra $\dfrac{57}{60} = \dfrac{19}{20}$; okra is the highest. (ii) $500 \times \dfrac{17}{20} = 425$.`,
    children: [
      child('a', mk.mcq({ stem: 'The germination ratios found from the trays are examples of', opts: ['empirical probabilities, found by counting the results of an experiment', 'theoretical probabilities, found from equally likely outcomes', 'probabilities that must be exactly one half', 'probabilities that can be greater than $1$'], key: 'a', sol: 'The ratios come from counting the seeds that germinated in the trays, so they are empirical (experimental) probabilities.', d: 1, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: r`A seed is chosen at random from all the seeds sown. Find the empirical probability that it germinated, as a percentage.`, value: 85, sol: r`Seeds sown: $80 + 60 + 60 = 200$. Seeds germinated: $68 + 45 + 57 = 170$. So $\dfrac{170}{200} \times 100 = 85\%$.`, scheme: [['170 out of 200', 0.5], ['85 per cent', 0.5]], d: 2, c: 'application', t: [1], time: 90 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the empirical probability of germination for each of the three kinds of seed, and name the kind with the highest probability.`, model: r`Tomato: $\dfrac{68}{80} = \dfrac{17}{20}$. Brinjal: $\dfrac{45}{60} = \dfrac{3}{4}$. Okra: $\dfrac{57}{60} = \dfrac{19}{20}$.\n\nOkra has the highest probability, $\dfrac{19}{20}$.`, sol: 'Germinated over sown for each kind.', scheme: [['Three probabilities 17/20, 3/4, 19/20', 1.5], ['Okra is highest', 0.5]], d: 2, c: 'application', t: [1], time: 120 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Using the tomato result, about how many of $500$ tomato seeds sown in the same way would you expect to germinate?`, model: r`The probability of germination for tomato is $\dfrac{17}{20}$, so about $500 \times \dfrac{17}{20} = 425$ seeds.`, sol: 'Probability times 500.', scheme: [['Probability 17 over 20', 1], ['About 425 seeds', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['empirical', 'theoretical', 'half', 'above one'], 'empirical');
    Cx.child('b').val(rd((tg / ts) * 100, 9));
    Cx.child('c').assert(ts === 200 && tg === 170 && best === 2 && fs(68, 80) === '17/20' && fs(45, 60) === '3/4' && fs(57, 60) === '19/20', '17/20, 3/4, 19/20; okra');
    Cx.child('c').model([17, 20, 3, 4, 19]);
    Cx.child('cii').assert((500 * 68) / 80 === 425, '425');
    Cx.child('cii').model([17, 20, 425]);
  });
}
{
  const v = WEEKS.vals, days = v.length * 7, rain = sum(v), most = v.indexOf(Math.max(...v));
  caseQ('c02', {
    passage: r`The bar graph shows the number of rainy days in each of five weeks in a weather record of Kochi. Each week has $7$ days.`,
    d: 2, c: 'application', assets: [fWeeks],
    model: r`(a) Option (a). (b) $20$. (c) (i) $\dfrac{4}{7}$. Or (ii) $\dfrac{3}{7}$.`,
    sol: r`(a) The tallest bar is week $2$, with $6$ rainy days. (b) $4 + 6 + 3 + 5 + 2 = 20$. (c) (i) The record has $5 \times 7 = 35$ days, so $P(\text{rainy}) = \dfrac{20}{35} = \dfrac{4}{7}$. (ii) Dry days: $35 - 20 = 15$, so $\dfrac{15}{35} = \dfrac{3}{7}$.`,
    children: [
      child('a', mk.mcq({ stem: 'In which week were there the most rainy days?', opts: ['Week $2$', 'Week $4$', 'Week $1$', 'Week $5$'], key: 'a', sol: 'The tallest bar is the bar of week $2$, with $6$ rainy days.', d: 1, c: 'understanding', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'How many rainy days were there in the five weeks?', value: 20, sol: r`$4 + 6 + 3 + 5 + 2 = 20$ rainy days.`, scheme: [['Reading the five bars', 0.5], ['Total 20', 0.5]], d: 1, c: 'application', t: [1], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** A day is chosen at random from the record. Find the empirical probability that it was rainy.`, model: r`The record has $5 \times 7 = 35$ days and $20$ of them were rainy, so $P = \dfrac{20}{35} = \dfrac{4}{7}$.`, sol: 'Rainy days over 35.', scheme: [['20 rainy days out of 35', 1], ['P = 4 over 7', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the empirical probability that a day chosen at random from the record was dry.`, model: r`Dry days: $35 - 20 = 15$, so $P = \dfrac{15}{35} = \dfrac{3}{7}$ (also $1 - \dfrac{4}{7} = \dfrac{3}{7}$).`, sol: 'Dry days over 35, or one minus the rainy probability.', scheme: [['15 dry days out of 35', 1], ['P = 3 over 7', 1]], d: 2, c: 'application', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['Week 2', 'Week 4', 'Week 1', 'Week 5'], `Week ${most + 1}`);
    Cx.child('b').val(rain);
    Cx.child('c').assert(days === 35 && fs(rain, days) === '4/7', '20 of 35 is 4/7');
    Cx.child('c').model([20, 35, 4, 7]);
    Cx.child('cii').assert(fs(days - rain, days) === '3/7' && close(1 - rain / days, 3 / 7), '3/7');
    Cx.child('cii').model([15, 35, 3, 7]);
  });
}
{
  const W = { blue: 5, red: 3, green: 2, white: 2 }, tot = sum(Object.values(W));
  caseQ('c03', {
    passage: r`A game at a school fete in Thane uses a wheel with $12$ equal sectors, which are painted $5$ blue, $3$ red, $2$ green and $2$ white. The pointer is spun once and the colour it stops on is noted. All the sectors are equally likely.`,
    d: 2, c: 'application',
    model: r`(a) Option (a). (b) $7$. (c) (i) $\dfrac{7}{12}$. Or (ii) $\dfrac{1}{3}$.`,
    sol: r`(a) $P(\text{red}) = \dfrac{3}{12} = \dfrac{1}{4}$. (b) Sectors that are not blue: $12 - 5 = 7$. (c) (i) $P(\text{not blue}) = 1 - \dfrac{5}{12} = \dfrac{7}{12}$. (ii) Green or white: $2 + 2 = 4$ sectors, so $\dfrac{4}{12} = \dfrac{1}{3}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The probability that the pointer stops on red is', opts: [r`$\dfrac{1}{4}$`, r`$\dfrac{1}{3}$`, r`$\dfrac{3}{5}$`, r`$\dfrac{3}{9}$`], key: 'a', sol: r`$3$ of the $12$ equally likely sectors are red, so $P = \dfrac{3}{12} = \dfrac{1}{4}$.`, d: 1, c: 'application', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'How many sectors of the wheel are not blue?', value: 7, sol: r`$12 - 5 = 7$ sectors.`, scheme: [['Total 12 minus blue 5', 0.5], ['7 sectors', 0.5]], d: 1, c: 'application', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the probability that the pointer does not stop on blue.`, model: r`$P(\text{blue}) = \dfrac{5}{12}$, so $P(\text{not blue}) = 1 - \dfrac{5}{12} = \dfrac{7}{12}$.`, sol: 'One minus the probability of blue.', scheme: [['P(blue) = 5 over 12', 1], ['P(not blue) = 7 over 12', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the probability that the pointer stops on green or white.`, model: r`Green or white: $2 + 2 = 4$ sectors, so $P = \dfrac{4}{12} = \dfrac{1}{3}$.`, sol: 'Four sectors out of twelve.', scheme: [['4 favourable sectors out of 12', 1], ['P = 1 over 3', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(tot === 12, 'twelve sectors');
    Cx.child('a').which([fs(W.red, tot), fs(1, 3), fs(3, 5), fs(3, 9)], fs(W.red, tot));
    Cx.child('b').val(tot - W.blue);
    Cx.child('c').assert(fs(tot - W.blue, tot) === '7/12' && close(1 - W.blue / tot, 7 / 12), '7/12');
    Cx.child('c').model([5, 12, 7]);
    Cx.child('cii').assert(fs(W.green + W.white, tot) === '1/3', '1/3');
    Cx.child('cii').model([4, 12, 1, 3]);
  });
}
{
  const cnt = [8, 12, 9, 11, 10, 10], n = sum(cnt), ev = cnt[1] + cnt[3] + cnt[5], most = cnt.indexOf(Math.max(...cnt));
  caseQ('c04', {
    passage: r`Tanvi throws a die $60$ times in her school in Gwalior and notes how many times each face comes up: face $1$ comes up $8$ times, face $2$ comes up $12$ times, face $3$ comes up $9$ times, face $4$ comes up $11$ times, face $5$ comes up $10$ times and face $6$ comes up $10$ times.`,
    d: 3, c: 'analysis',
    model: r`(a) Option (a). (b) $33$. (c) (i) $\dfrac{11}{20}$; it is $\dfrac{1}{20}$ above $\dfrac{1}{2}$. Or (ii) not justified.`,
    sol: r`(a) Face $2$ came up $12$ times, the most. (b) Even faces: $12 + 11 + 10 = 33$ throws. (c) (i) $\dfrac{33}{60} = \dfrac{11}{20}$, while the theoretical probability is $\dfrac{3}{6} = \dfrac{1}{2}$; the difference is $\dfrac{11}{20} - \dfrac{1}{2} = \dfrac{1}{20}$. (ii) A gap of this size is normal in $60$ throws, so more throws are needed.`,
    children: [
      child('a', mk.mcq({ stem: 'Which face came up most often in Tanvi\'s $60$ throws?', opts: ['Face $2$', 'Face $4$', 'Face $1$', 'Face $6$'], key: 'a', sol: 'Face $2$ came up $12$ times, which is more than any other face.', d: 1, c: 'understanding', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'On how many throws did an even number come up?', value: 33, sol: r`Faces $2$, $4$ and $6$: $12 + 11 + 10 = 33$ throws.`, scheme: [['Adding faces 2, 4 and 6', 0.5], ['33 throws', 0.5]], d: 1, c: 'application', t: [1], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the empirical probability of an even number, and its difference from the theoretical probability of an even number.`, model: r`Empirical: $\dfrac{33}{60} = \dfrac{11}{20}$. Theoretical: $\dfrac{3}{6} = \dfrac{1}{2}$.\n\nDifference: $\dfrac{11}{20} - \dfrac{1}{2} = \dfrac{11 - 10}{20} = \dfrac{1}{20}$.`, sol: 'Empirical 11/20, theory 1/2, difference 1/20.', scheme: [['Empirical probability 11/20 and theoretical 1/2', 1], ['Difference 1/20', 1]], d: 3, c: 'analysis', t: [1, 2], time: 120 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Tanvi says, "Face $2$ came up $12$ times out of $60$, so my die is biased towards $2$." Is she justified? Give a reason.`, model: r`No. For a fair die the theoretical probability of a $2$ is $\dfrac{1}{6}$, which is $10$ throws in $60$. She got $12$, only $2$ more, and small differences are normal in a short experiment. She should throw the die many more times before deciding.`, sol: 'Small difference; a short experiment; more throws needed.', scheme: [['Compares 12 with the 10 expected', 1], ['Says more throws are needed', 1]], d: 3, c: 'evaluation', t: [1, 2], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(n === 60, 'sixty throws');
    Cx.child('a').which(['2', '4', '1', '6'], String(most + 1));
    Cx.child('b').val(ev);
    Cx.child('c').assert(fs(ev, n) === '11/20' && close(ev / n - 1 / 2, 1 / 20), '11/20 and the difference 1/20');
    Cx.child('c').model([33, 60, 11, 20, 1, 2]);
    Cx.child('cii').assert((60 / 6 === 10) && cnt[1] - 10 === 2 && cnt.every((v) => Math.abs(v - 10) <= 2), 'every face is within 2 of the 10 expected');
    Cx.child('cii').model([10, 12, 60]);
  });
}
