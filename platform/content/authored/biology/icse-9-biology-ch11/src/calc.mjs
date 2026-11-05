// Computed values for ICSE 9 Biology ch11 Skeleton: Movement and Locomotion (every derived number is computed here).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};

// Skull
export const CRANIAL = 8;
export const FACIAL = 14;
export const SKULL = eq(CRANIAL + FACIAL, 22, 'bones in the skull');
// Vertebral column: 33 vertebrae in a child; sacral 5 fuse to one sacrum and coccygeal 4 fuse to one coccyx in the adult.
export const VERT = { cervical: 7, thoracic: 12, lumbar: 5, sacral: 5, coccygeal: 4 };
export const MOVABLE_V = eq(VERT.cervical + VERT.thoracic + VERT.lumbar, 24, 'movable vertebrae');
export const FUSED_V = eq(VERT.sacral + VERT.coccygeal, 9, 'vertebrae that fuse');
export const VERT_CHILD = eq(MOVABLE_V + FUSED_V, 33, 'vertebrae in a child');
export const COLUMN_ADULT = eq(MOVABLE_V + 1 + 1, 26, 'bones of the adult vertebral column');
// Ribs: 12 pairs
export const PAIRS = { true: 7, false: 3, floating: 2 };
export const RIBS = eq((PAIRS.true + PAIRS.false + PAIRS.floating) * 2, 24, 'ribs');
export const TRUE_RIBS = eq(PAIRS.true * 2, 14, 'true ribs');
export const FALSE_RIBS = eq(PAIRS.false * 2, 6, 'false ribs');
export const FLOATING = eq(PAIRS.floating * 2, 4, 'floating ribs');
export const STERNUM = 1;
// Hyoid (1) and the three small ear bones in each ear (6) are counted in the axial skeleton by most books.
export const HYOID = 1;
export const OSSICLES = eq(3 * 2, 6, 'ear bones');
export const AXIAL = eq(SKULL + HYOID + OSSICLES + COLUMN_ADULT + STERNUM + RIBS, 80, 'axial skeleton');
// Appendicular: girdles and limbs
export const HAND = { carpals: 8, metacarpals: 5, phalanges: 4 * 3 + 2 };
export const PHALANGES_HAND = eq(HAND.phalanges, 14, 'phalanges in one hand');
export const UPPER_LIMB = eq(1 + 1 + 1 + HAND.carpals + HAND.metacarpals + HAND.phalanges, 30, 'bones in one upper limb (humerus, radius, ulna, hand)');
export const FOOT = { tarsals: 7, metatarsals: 5, phalanges: 14 };
export const LOWER_LIMB = eq(1 + 1 + 1 + 1 + FOOT.tarsals + FOOT.metatarsals + FOOT.phalanges, 30, 'bones in one lower limb (femur, patella, tibia, fibula, foot)');
export const PECTORAL = eq(2 + 2, 4, 'pectoral girdle bones (two clavicles, two scapulae)');
export const PELVIC = eq(2, 2, 'hip bones');
export const APPENDICULAR = eq(PECTORAL + 2 * UPPER_LIMB + PELVIC + 2 * LOWER_LIMB, 126, 'appendicular skeleton');
export const TOTAL = eq(AXIAL + APPENDICULAR, 206, 'bones in an adult');
export const DIFF = eq(APPENDICULAR - AXIAL, 46, 'appendicular minus axial');
export const BOTH_HANDS = eq(2 * PHALANGES_HAND, 28, 'phalanges in both hands');
export const BOTH_ARMS = eq(2 * UPPER_LIMB, 60, 'bones in both upper limbs');
// A baby is born with about 300 soft bones that fuse into 206 (books say about 300): fusion lost.
export const BABY = 300;
export const FUSED_AWAY = eq(BABY - TOTAL, 94, 'bones fewer in an adult than in a baby (about)');
// Bank: a model skeleton has every bone except both hands (carpals, metacarpals, phalanges each hand).
export const HAND_TOTAL = eq(HAND.carpals + HAND.metacarpals + HAND.phalanges, 27, 'bones in one hand');
export const MODEL_MISSING = eq(2 * HAND_TOTAL, 54, 'bones missing without both hands');
export const MODEL_LEFT = eq(TOTAL - MODEL_MISSING, 152, 'bones left on the model');

// Bank and deck: eight named joints classified (type, kind of freely movable joint).
export const JOINT_LIST = [
  { name: 'shoulder', cls: 'free', kind: 'ball and socket' },
  { name: 'elbow', cls: 'free', kind: 'hinge' },
  { name: 'hip', cls: 'free', kind: 'ball and socket' },
  { name: 'knee', cls: 'free', kind: 'hinge' },
  { name: 'wrist', cls: 'free', kind: 'gliding' },
  { name: 'joint between atlas and axis', cls: 'free', kind: 'pivot' },
  { name: 'suture between skull bones', cls: 'fixed', kind: null },
  { name: 'joint between two vertebrae', cls: 'slight', kind: null },
];
const count = (f) => JOINT_LIST.filter(f).length;
export const N_FREE = eq(count((j) => j.cls === 'free'), 6, 'freely movable joints');
export const N_FIXED = eq(count((j) => j.cls === 'fixed'), 1, 'immovable joints');
export const N_SLIGHT = eq(count((j) => j.cls === 'slight'), 1, 'slightly movable joints');
export const N_BALL = eq(count((j) => j.kind === 'ball and socket'), 2, 'ball and socket joints');
export const N_HINGE = eq(count((j) => j.kind === 'hinge'), 2, 'hinge joints');
