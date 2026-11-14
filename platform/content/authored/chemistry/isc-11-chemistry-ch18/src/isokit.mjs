// Isomer enumeration for small acyclic molecules, used to assert every isomer count quoted in ch18.
// A molecule is a tree: nodes {el: 'C' | 'O' | 'D' (carbon of a C=C double bond)}, edges [i, j]. Hydrogen is implicit.
// Canonical strings (rooted at every node, minimum taken) make isomorphic trees compare equal.

const MAXDEG = { C: 4, D: 3, O: 2 };

function adjacency(t) {
  const adj = t.el.map(() => []);
  for (const [i, j] of t.edges) {
    adj[i].push(j);
    adj[j].push(i);
  }
  return adj;
}
/** Canonical string of the branch hanging from v, seen from parent p. */
function branch(t, adj, v, p) {
  return `${t.el[v]}(${adj[v].filter((w) => w !== p).map((w) => branch(t, adj, w, v)).sort().join('')})`;
}
export function canon(t) {
  const adj = adjacency(t);
  let best = null;
  for (let v = 0; v < t.el.length; v++) {
    const s = branch(t, adj, v, -1);
    if (best === null || s < best) best = s;
  }
  return best;
}
/** All carbon skeletons (trees, maximum degree 4) with n carbon atoms. */
export function skeletons(n) {
  let level = [{ el: ['C'], edges: [] }];
  for (let k = 1; k < n; k++) {
    const seen = new Map();
    for (const t of level) {
      const adj = adjacency(t);
      for (let v = 0; v < t.el.length; v++) {
        if (adj[v].length >= 4) continue;
        const nt = { el: [...t.el, 'C'], edges: [...t.edges, [v, t.el.length]] };
        const c = canon(nt);
        if (!seen.has(c)) seen.set(c, nt);
      }
    }
    level = [...seen.values()];
  }
  return level;
}
const dedupe = (list) => {
  const m = new Map();
  for (const t of list) m.set(canon(t), t);
  return [...m.values()];
};
/** Alcohols CnH2n+1OH (an OH group on one carbon). */
export function alcohols(n) {
  const out = [];
  for (const t of skeletons(n)) {
    const adj = adjacency(t);
    for (let v = 0; v < t.el.length; v++) if (adj[v].length < 4) out.push({ el: [...t.el, 'O'], edges: [...t.edges, [v, t.el.length]] });
  }
  return dedupe(out);
}
/** Ethers CnH2n+2O (an O atom inserted into one C–C bond of a skeleton). */
export function ethers(n) {
  const out = [];
  for (const t of skeletons(n)) {
    t.edges.forEach(([a, b], k) => {
      const o = t.el.length;
      const edges = t.edges.filter((_, x) => x !== k).concat([[a, o], [o, b]]);
      out.push({ el: [...t.el, 'O'], edges });
    });
  }
  return dedupe(out);
}
/** Acyclic alkenes CnH2n (one C=C bond). */
export function alkenes(n) {
  const out = [];
  for (const t of skeletons(n)) {
    const adj = adjacency(t);
    for (const [a, b] of t.edges) {
      if (adj[a].length > 3 || adj[b].length > 3) continue;
      const el = [...t.el];
      el[a] = 'D';
      el[b] = 'D';
      out.push({ el, edges: t.edges });
    }
  }
  return dedupe(out);
}
/** The ligand strings of atom v (neighbours' branches plus implicit hydrogens up to four). */
function ligands(t, adj, v) {
  const L = adj[v].map((w) => branch(t, adj, w, v));
  while (L.length < 4) L.push('H');
  return L;
}
/** Number of chiral (four different ligands) sp3 carbons. */
export function chiralCount(t) {
  const adj = adjacency(t);
  let k = 0;
  t.el.forEach((e, v) => {
    if (e !== 'C') return;
    const L = ligands(t, adj, v);
    if (new Set(L).size === 4) k++;
  });
  return k;
}
/** True if the C=C bond of an alkene tree has two different groups on each doubly bonded carbon (cis-trans possible). */
export function hasGeometric(t) {
  const adj = adjacency(t);
  const d = t.el.map((e, i) => (e === 'D' ? i : -1)).filter((i) => i >= 0);
  const [a, b] = d;
  const ok = (v, other) => {
    const L = adj[v].filter((w) => w !== other).map((w) => branch(t, adj, w, v));
    while (L.length < 2) L.push('H');
    return new Set(L).size === 2;
  };
  return ok(a, b) && ok(b, a);
}
