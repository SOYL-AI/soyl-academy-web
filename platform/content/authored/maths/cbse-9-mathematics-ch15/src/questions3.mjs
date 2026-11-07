// CBSE 9 Mathematics ch15 Introduction to Probability: further recall and understanding items (bank only). They replaced some application
// items so that application or higher stays inside the 45-65% band (nothing was retagged).
import { Q, mk } from './lib.mjs';
import { r } from './h.mjs';
import { upto } from './p.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 60 }), chk);

T('m11', { stem: 'A teacher in Chennai asks her class which of these statements gives an empirical probability. The answer is the statement', opts: [r`"A bus on the Chennai route was late on $12$ of the last $60$ days, so the probability that it is late is $\dfrac{1}{5}$."`, r`"A fair die has $6$ equally likely faces, so the probability of a $6$ is $\dfrac{1}{6}$."`, r`"A fair coin has $2$ equally likely faces, so the probability of a tail is $\dfrac{1}{2}$."`, r`"A bag has $5$ identical balls of which $2$ are red, so the probability of red is $\dfrac{2}{5}$."`], sol: 'An empirical probability is found from what happened in an experiment or a record: here from $12$ late days in $60$. The other three statements count equally likely outcomes, so they give theoretical probabilities.', d: 1, c: 'understanding', t: [1, 2], time: 75 }, (Cx) => {
  const fromRecord = [true, false, false, false];
  Cx.which(fromRecord, true);
});
T('m14', { stem: 'A survey team in Jaipur writes down the rule for the empirical probability of an event E. Which rule is correct?', opts: ['The number of trials in which E happens divided by the total number of trials', 'The total number of trials divided by the number of trials in which E happens', 'The number of trials in which E does not happen divided by the total number of trials', 'The number of favourable outcomes divided by the number of equally likely outcomes'], sol: 'The empirical probability compares the trials in which the event happens with all the trials. The last rule is the theoretical probability, which needs equally likely outcomes.', d: 1, c: 'recall', t: [1], time: 45 }, (Cx) => {
  const happens = 36, total = 150, rule = [happens / total, total / happens, (total - happens) / total, null];
  Cx.assert(rule[0] <= 1 && rule[1] > 1, 'the first rule gives a value from 0 to 1; the second can exceed 1');
  Cx.which([rule[0] <= 1 && rule[0] === 36 / 150, rule[1] <= 1, rule[2] === 36 / 150, false], true);
});
T('m16', { stem: 'At a Ludo night in Kota a fair die is thrown once. The number of possible outcomes is', opts: ['$6$', '$1$', '$12$', '$36$'], sol: 'The die can show $1$, $2$, $3$, $4$, $5$ or $6$, which is $6$ equally likely outcomes.', d: 1, c: 'recall', t: [2], time: 45 }, (Cx) => {
  Cx.which([upto(1, 6).length, 1, 12, 36], 6);
});
T('m21', { stem: 'On a wheel at a Coimbatore stall with $10$ equal sectors numbered $1$ to $10$, the event "the arrow stops on a number greater than $10$" is', opts: ['an impossible event, with probability $0$', 'an unlikely event, with a small positive probability', 'a certain event, with probability $1$', 'an event with an even chance'], sol: r`No sector shows a number greater than $10$, so there are $0$ favourable sectors and the probability is $\dfrac{0}{10} = 0$. The event is impossible.`, d: 2, c: 'understanding', t: [1, 2], time: 60 }, (Cx) => {
  const fav = upto(1, 10).filter((x) => x > 10).length;
  Cx.which([fav === 0, fav > 0 && fav < 5, fav === 10, fav === 5], true);
});
Q('fb2', mk.fill({ stem: 'The theoretical probability of an event is the number of ____ outcomes divided by the total number of equally likely outcomes.', acc: [['favourable', 'favorable']], sol: 'The outcomes in which the event happens are the favourable outcomes. So the blank is favourable.', d: 1, c: 'recall', t: [2] }), (Cx) => { Cx.blank('favourable'); });
Q('s203', mk.short({ marks: 2, stem: 'Explain, with one example of each, the difference between an empirical probability and a theoretical probability.', model: r`An **empirical probability** is found from an experiment or a survey: for example, $14$ failures among $250$ tested bulbs gives $\dfrac{14}{250}$.\n\nA **theoretical probability** is found by counting equally likely outcomes: for example, a fair die shows a $6$ with probability $\dfrac{1}{6}$.`, sol: 'Empirical from an experiment, theoretical from equally likely outcomes, with an example of each.', scheme: [['Empirical: found from an experiment or survey, with an example', 1], ['Theoretical: found from equally likely outcomes, with an example', 1]], d: 1, c: 'understanding', t: [1, 2], time: 100 }), null, 'a definition with examples: marked by the scheme');
