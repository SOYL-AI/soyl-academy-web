// ch09 diagrams: computed ray diagrams (optics.mjs) plus the sign-convention, terms and glass-slab figures.
import { mirrorDiagram, lensDiagram, slabDiagram, signDiagram, termsDiagram } from './optics.mjs';

const M = (u, label) => mirrorDiagram({ type: 'concave', u, label });
const L = (u, label) => lensDiagram({ type: 'convex', u, label });

export const TERMS = termsDiagram('Concave mirror with the pole P, principal focus F and centre of curvature C on the principal axis; the radius of curvature R is twice the focal length f');
export const SIGN = signDiagram('New Cartesian sign convention: the pole is the origin, distances in the direction of the incident light (to the right) are positive and against it negative; heights above the axis are positive and below it negative');
export const M_INF = M(-Infinity, 'Concave mirror, object at infinity: rays parallel to the principal axis reflect and meet at the principal focus F, forming a point-sized, real, inverted image at F');
export const M_BEYOND = M(-150, 'Concave mirror, object beyond C: a ray parallel to the axis reflects through F and a ray through C reflects back on itself; they meet between F and C, giving a real, inverted, diminished image');
export const M_AT_C = M(-120, 'Concave mirror, object at C: the image is formed at C and is real, inverted and the same size as the object');
export const M_C_F = M(-90, 'Concave mirror, object between C and F: the image is formed beyond C and is real, inverted and enlarged');
export const M_AT_F = M(-60, 'Concave mirror, object at F: the reflected rays are parallel, so the image is at infinity, real, inverted and highly enlarged');
export const M_F_P = M(-36, 'Concave mirror, object between F and P: the reflected rays diverge; extended backwards they meet behind the mirror, giving a virtual, erect, enlarged image');
export const M_CONVEX = mirrorDiagram({ type: 'convex', u: -90, label: 'Convex mirror, object in front: the reflected rays diverge and appear to come from a point behind the mirror between P and F, giving a virtual, erect, diminished image' });
export const M_CONVEX_INF = mirrorDiagram({ type: 'convex', u: -Infinity, label: 'Convex mirror, parallel rays: the reflected rays diverge as if coming from the principal focus F behind the mirror' });
export const L_INF = L(-Infinity, 'Convex lens, object at infinity: parallel rays converge at the focus F₂, giving a point-sized, real, inverted image');
export const L_BEYOND = L(-150, 'Convex lens, object beyond 2F₁: the image forms between F₂ and 2F₂ and is real, inverted and diminished');
export const L_AT_2F = L(-120, 'Convex lens, object at 2F₁: the image forms at 2F₂ and is real, inverted and the same size');
export const L_2F_F = L(-90, 'Convex lens, object between F₁ and 2F₁: the image forms beyond 2F₂ and is real, inverted and enlarged');
export const L_AT_F = L(-60, 'Convex lens, object at F₁: the refracted rays are parallel, so the image is at infinity, real, inverted and highly enlarged');
export const L_F_O = L(-36, 'Convex lens, object between F₁ and O: the refracted rays diverge; extended backwards they meet on the same side as the object, giving a virtual, erect, enlarged image');
export const L_CONCAVE = lensDiagram({ type: 'concave', u: -90, label: 'Concave lens, object in front: the refracted rays diverge and appear to come from a point between F₁ and O, giving a virtual, erect, diminished image' });
export const L_CONCAVE_INF = lensDiagram({ type: 'concave', u: -Infinity, label: 'Concave lens, parallel rays: the refracted rays diverge as if coming from the focus F₁ on the same side as the incident light' });
export const SLAB = slabDiagram({ n: 1.5, iDeg: 45, label: 'Refraction through a rectangular glass slab: the ray bends towards the normal on entering glass and away from it on leaving, so the emergent ray is parallel to the incident ray but shifted sideways' });

export const ALL = { TERMS, SIGN, M_INF, M_BEYOND, M_AT_C, M_C_F, M_AT_F, M_F_P, M_CONVEX, M_CONVEX_INF, L_INF, L_BEYOND, L_AT_2F, L_2F_F, L_AT_F, L_F_O, L_CONCAVE, L_CONCAVE_INF, SLAB };
