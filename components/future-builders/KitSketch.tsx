/**
 * The hardware kit as a labelled sketch in a maker's notebook (ADR-033). Plain SVG, server-rendered: the parts are
 * the ones listed in the FAQ (ESP32-C3, breadboard, sensors, LEDs, a servo). Decorative drawing with a full text
 * alternative.
 */
const INK = 'var(--color-ink)';
const PEN = { fill: 'none', stroke: INK, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Label({ x, y, children, anchor = 'start', colour = 'var(--color-vermilion-ink)' }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end'; colour?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="hand" style={{ fontSize: 23, fill: colour }}>
      {children}
    </text>
  );
}

export function KitSketch() {
  const holes: [number, number][] = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 14; c++) holes.push([238 + c * 13, 220 + r * 13]);

  return (
    <figure className="leaf tape relative p-5 md:p-7" style={{ '--tape': 'var(--color-sap)' } as React.CSSProperties}>
      <svg
        viewBox="0 0 520 380"
        role="img"
        aria-label="Sketch of the hardware kit: an ESP32-C3 microcontroller with a USB cable, a breadboard, three sensors for temperature, light and distance, LEDs and a servo motor."
        className="h-auto w-full"
      >
        {/* Watercolour dabs under the parts */}
        <ellipse cx="122" cy="118" rx="92" ry="60" fill="var(--color-ultramarine-soft)" />
        <ellipse cx="326" cy="244" rx="120" ry="62" fill="var(--color-ochre-soft)" />
        <ellipse cx="420" cy="104" rx="62" ry="46" fill="var(--color-vermilion-soft)" />
        <ellipse cx="108" cy="292" rx="70" ry="44" fill="var(--color-sap-soft)" />

        {/* ESP32-C3 board */}
        <path {...PEN} d="M58 82 C 110 79, 150 81, 188 83 L 186 152 C 140 154, 100 152, 60 150 Z" />
        <path {...PEN} d="M92 100 h 46 v 32 h -46 z" strokeWidth={1.6} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={`pt${i}`} {...PEN} strokeWidth={1.4} d={`M${70 + i * 14} 82 v -9 M${70 + i * 14} 151 v 9`} />
        ))}
        {/* USB cable */}
        <path {...PEN} d="M188 112 h 12 M200 104 h 10 v 16 h -10 z" strokeWidth={1.6} />
        <path {...PEN} d="M210 112 C 236 114, 238 150, 222 168 S 206 196, 214 206" strokeWidth={1.6} />
        <Label x={60} y={52}>ESP32-C3 board</Label>
        <Label x={244} y={150} colour="var(--color-graphite)">USB</Label>

        {/* Breadboard */}
        <path {...PEN} d="M226 206 C 300 204, 370 205, 432 207 L 430 292 C 360 294, 300 293, 228 291 Z" />
        <path {...PEN} strokeWidth={1} stroke="var(--color-vermilion)" d="M234 214 H 424" />
        <path {...PEN} strokeWidth={1} stroke="var(--color-ultramarine)" d="M234 284 H 424" />
        {holes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={1.6} fill={INK} />
        ))}
        <Label x={432} y={322} anchor="end">breadboard</Label>

        {/* LEDs on the breadboard */}
        {[
          [262, 'var(--color-vermilion)'],
          [292, 'var(--color-ochre)'],
          [322, 'var(--color-sap)'],
        ].map(([x, c]) => (
          <g key={String(x)}>
            <path d={`M${x as number - 7} 196 C ${x as number - 7} 178, ${x as number + 7} 178, ${x as number + 7} 196 Z`} fill={c as string} fillOpacity={0.75} stroke={INK} strokeWidth={1.6} />
            <path {...PEN} strokeWidth={1.4} d={`M${x as number - 3} 196 v 26 M${x as number + 3} 196 v 30`} />
          </g>
        ))}
        <Label x={250} y={172} colour="var(--color-graphite)">LEDs</Label>

        {/* Servo with its horn */}
        <path {...PEN} d="M372 76 C 400 74, 440 75, 468 77 L 466 128 C 436 130, 400 129, 374 127 Z" />
        <path {...PEN} d="M366 92 h 8 M366 112 h 8 M468 92 h 8 M468 112 h 8" strokeWidth={1.6} />
        <circle cx="398" cy="102" r="9" {...PEN} strokeWidth={1.6} />
        <path {...PEN} d="M398 102 L 446 60" strokeWidth={4} />
        <path {...PEN} d="M436 46 C 452 52, 458 62, 456 76" strokeWidth={1.4} stroke="var(--color-graphite)" />
        <Label x={470} y={160} anchor="end">a servo</Label>

        {/* Sensors */}
        <path {...PEN} d="M48 262 h 64 v 34 h -64 z" />
        <circle cx="66" cy="279" r="11" {...PEN} strokeWidth={1.6} />
        <circle cx="94" cy="279" r="11" {...PEN} strokeWidth={1.6} />
        <path {...PEN} d="M130 270 c 10 0 10 -14 0 -14 c -10 0 -10 14 0 14 z M130 270 v 22" strokeWidth={1.6} />
        <path {...PEN} d="M156 258 v 30 M150 290 h 12 c 0 8 -12 8 -12 0" strokeWidth={1.6} />
        <Label x={40} y={334}>sensors: distance, light,</Label>
        <Label x={40} y={356}>temperature</Label>
      </svg>
      <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-serif text-[1.35rem] leading-tight">The kit, shipped free across India.</span>
        <span className="hand text-[1.2rem] text-sap">Theirs to keep.</span>
      </figcaption>
    </figure>
  );
}
