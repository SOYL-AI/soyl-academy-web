// Plates for the SOYL Academy direction board. Canvas is 1920x1080.
// Every "stage" layer is painted in the same coordinates and cropped to the
// same 1040x1040 window (x 440..1480, y 20..1060), so the layers register.

const CX = 900, CY = 500, RR = 330;

function ringPath(cx, cy, r, a0, a1, n = 56, wob = 0.012) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = (a0 + (a1 - a0) * i / n) * D2R;
    const rad = r * (1 + rr(-wob, wob));
    pts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]);
  }
  return pts;
}

// The enso: one dry-brush stroke, starting lower left and travelling clockwise.
PLATES.ring = () => {
  bristle(ringPath(CX, CY, RR, -228, 108), 84, PIG.ink, { bristles: 74, w: 1.15, dry: 0.8 });
};

// Fine pen rays leaving the ring to the right.
PLATES.rays = () => {
  rays(CX, CY, 36, RR + 26, 790, -40, 36, PIG.ink, 0.42);
};

// The wash the ring rests on.
PLATES.wash = () => {
  sweep([[520, 1005], [860, 915], [1200, 942], [1570, 885]], 215, PIG.indigoMid,
    { deep: PIG.indigo, op: 232, op2: 190, layers: 3 });
};

PLATES.sun = () => {
  dab(1330, 150, 46, PIG.turmeric, 240, { amp: 0.06 });
};

// Six pigment pools in a row: one per subject.
PLATES.pools = () => {
  const cols = [PIG.indigoMid, PIG.madderRose, PIG.turmeric, PIG.greenPale, PIG.hennaPale, PIG.graphite];
  const deep = [PIG.indigo, PIG.madder, PIG.turmericDeep, PIG.green, PIG.henna, PIG.ink];
  cols.forEach((c, i) => {
    pool(170 + i * 316, 300, 108, 100, c, { deep: deep[i], layers: 3, op: 235, op2: 200, op3: 170, amp: 0.08, bleed: 0.12 });
  });
};

// A ragged panel a product screen can lie on.
PLATES.panel = () => {
  panel(360, 250, 1200, 600, PIG.indigoPale, { deep: PIG.indigoMid, op: 222, op2: 180, rag: 14, layers: 3 });
};

// Short strokes for underlines, bars and dividers.
PLATES.strokes = () => {
  const cols = [PIG.indigoMid, PIG.madderRose, PIG.turmeric, PIG.greenPale, PIG.hennaPale];
  const deep = [PIG.indigo, PIG.madder, PIG.turmericDeep, PIG.green, PIG.henna];
  cols.forEach((c, i) => {
    const y = 130 + i * 190;
    sweep([[150, y + 14], [620, y - 10], [1180, y + 12], [1770, y - 6]], 64, c, { deep: deep[i], op: 230, op2: 185, layers: 3 });
  });
};
