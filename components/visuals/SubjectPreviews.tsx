'use client';

import { motion } from 'framer-motion';

/**
 * Tiny "concept preview" scenes for the subject cards. Pure SVG + framer-motion:
 * no assets, no images, a few KB. They only animate while `active` (the section
 * is on screen and motion is allowed); otherwise they rest in a pleasant still.
 *
 * Colours are literal hex because CSS variables cannot be interpolated between
 * keyframes. They mirror the tokens in globals.css:
 *   ink #171717 · cobalt #3155FF · teacher-red #D84A3F · highlighter #F2D45C
 */
const INK = '#171717';
const COBALT = '#3155FF';
const RED = '#D84A3F';
const YELLOW = '#F2D45C';

interface PreviewProps {
  active: boolean;
}

const loop = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  ease: 'easeInOut' as const,
});

const FLASK = 'M-14 -34 H14 V-12 L38 34 a8 8 0 0 1 -7 12 H-31 a8 8 0 0 1 -7 -12 L-14 -12 Z';
const LIQUID = 'M-24 10 L-38 34 a8 8 0 0 0 7 12 H31 a8 8 0 0 0 7 -12 L24 10 Z';

function Chemistry({ active }: PreviewProps) {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
      {/* Left flask */}
      <g transform="translate(66 112)">
        <path d={LIQUID} fill={COBALT} fillOpacity={0.35} />
        <path d={FLASK} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      </g>

      {/* Right flask: the reaction */}
      <g transform="translate(174 112)">
        <motion.path
          d={LIQUID}
          initial={{ fill: 'rgba(49,85,255,0.3)' }}
          animate={active ? { fill: ['rgba(49,85,255,0.3)', 'rgba(49,85,255,0.3)', 'rgba(242,212,92,0.85)', 'rgba(216,74,63,0.5)', 'rgba(49,85,255,0.3)'] } : undefined}
          transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.3, 0.5, 0.75, 1] }}
        />
        {[ -12, 2, 14 ].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={30}
            r={3.2}
            fill="#ffffff"
            stroke={INK}
            strokeWidth={1.5}
            initial={{ opacity: 0 }}
            animate={active ? { cy: [34, 6, -6], opacity: [0, 1, 0] } : undefined}
            transition={{ duration: 1.6, delay: 1.3 + i * 0.35, repeat: Infinity, repeatDelay: 2.6 }}
          />
        ))}
        <path d={FLASK} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      </g>

      {/* The pour */}
      <motion.path
        d="M66 66 C 80 38, 150 38, 174 66"
        stroke={COBALT}
        strokeWidth={2}
        strokeDasharray="4 6"
        strokeLinecap="round"
        initial={{ pathLength: 0.4 }}
        animate={active ? { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] } : undefined}
        transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.25, 0.5, 0.6] }}
      />
      <motion.circle
        r={4.5}
        fill={COBALT}
        initial={{ cx: 120, cy: 38 }}
        animate={active ? { cx: [66, 120, 174], cy: [66, 40, 66], opacity: [0, 1, 0] } : undefined}
        transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 2.9, ease: 'easeInOut' }}
      />
    </svg>
  );
}

function Physics({ active }: PreviewProps) {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
      <path d="M88 24h64" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path d="M52 124 A 72 72 0 0 0 188 124" stroke={INK} strokeOpacity={0.18} strokeWidth={2} strokeDasharray="3 6" />
      <motion.g
        style={{ originX: 0.5, originY: 0 }}
        initial={{ rotate: 22 }}
        animate={active ? { rotate: [-26, 26, -26] } : undefined}
        transition={loop(2.8)}
      >
        <line x1={120} y1={24} x2={120} y2={118} stroke={INK} strokeWidth={2.5} />
        <circle cx={120} cy={130} r={13} fill={COBALT} />
        <circle cx={115.5} cy={125.5} r={3.5} fill="#ffffff" fillOpacity={0.55} />
      </motion.g>
      <path d="M30 160h180" stroke={INK} strokeOpacity={0.25} strokeWidth={2} strokeLinecap="round" />
      {/* Force arrow */}
      <motion.path
        d="M176 140l22 0M190 132l8 8-8 8"
        stroke={RED}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={active ? { x: [0, 6, 0], opacity: [0.5, 1, 0.5] } : undefined}
        transition={loop(1.4)}
      />
    </svg>
  );
}

const BARS = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.85, 0.55, 0.95, 0.45, 0.65, 0.3];

function English({ active }: PreviewProps) {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
      {BARS.map((h, i) => (
        <motion.rect
          key={i}
          x={34 + i * 14}
          y={86 - 30}
          width={6}
          height={60}
          rx={3}
          fill={i % 4 === 2 ? COBALT : INK}
          style={{ originY: 0.5 }}
          initial={{ scaleY: h * 0.6 }}
          animate={active ? { scaleY: [h * 0.35, h, h * 0.5, h * 0.9, h * 0.35] } : undefined}
          transition={{ duration: 1.1 + (i % 5) * 0.17, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
        />
      ))}
      <rect x={72} y={134} width={96} height={28} rx={14} fill={YELLOW} />
      <motion.circle
        cx={88}
        cy={148}
        r={4}
        fill={RED}
        animate={active ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : undefined}
        transition={loop(1.2)}
      />
      <text x={100} y={152} fontSize={11} fontWeight={600} fill={INK}>
        Say it again
      </text>
    </svg>
  );
}

const ORGANELLES = [
  { x: 82, y: 70, rx: 9, ry: 5, rot: 20 },
  { x: 162, y: 76, rx: 8, ry: 5, rot: -30 },
  { x: 92, y: 118, rx: 8, ry: 5, rot: -10 },
  { x: 158, y: 116, rx: 10, ry: 5, rot: 40 },
  { x: 120, y: 54, rx: 7, ry: 4, rot: 0 },
];

function Biology({ active }: PreviewProps) {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
      <motion.ellipse
        cx={120}
        cy={92}
        rx={92}
        ry={66}
        stroke={COBALT}
        strokeOpacity={0.5}
        strokeWidth={2}
        strokeDasharray="5 7"
        style={{ originX: 0.5, originY: 0.5 }}
        animate={active ? { rotate: 360 } : undefined}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <ellipse cx={120} cy={92} rx={80} ry={56} stroke={INK} strokeWidth={2.5} />
      {ORGANELLES.map((o, i) => (
        <motion.ellipse
          key={i}
          cx={o.x}
          cy={o.y}
          rx={o.rx}
          ry={o.ry}
          fill={i % 2 ? YELLOW : COBALT}
          fillOpacity={i % 2 ? 0.9 : 0.5}
          transform={`rotate(${o.rot} ${o.x} ${o.y})`}
          animate={active ? { x: [0, 5, -3, 0], y: [0, -4, 4, 0] } : undefined}
          transition={loop(4 + i * 0.7, i * 0.2)}
        />
      ))}
      <motion.circle
        cx={120}
        cy={92}
        r={20}
        fill={RED}
        fillOpacity={0.85}
        animate={active ? { scale: [1, 1.1, 1] } : undefined}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={loop(2.2)}
      />
      <circle cx={120} cy={92} r={7} fill="#ffffff" fillOpacity={0.55} />
    </svg>
  );
}

const CURVE_FLAT = 'M30 142 Q120 128 210 142';
const CURVE_STEEP = 'M30 142 Q120 -40 210 142';

function Maths({ active }: PreviewProps) {
  // Vertex of the quadratic is at 75 + ½·controlY, so the dot rides the curve exactly.
  const dotFlat = 75 + 128 / 2;
  const dotSteep = 75 + -40 / 2;
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" fill="none">
      <path d="M30 20v128h188" stroke={INK} strokeOpacity={0.3} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {[60, 90, 120].map((y) => (
        <path key={y} d={`M30 ${y}h188`} stroke={INK} strokeOpacity={0.07} />
      ))}
      <motion.path
        d={CURVE_FLAT}
        stroke={COBALT}
        strokeWidth={3}
        strokeLinecap="round"
        animate={active ? { d: [CURVE_FLAT, CURVE_STEEP, CURVE_FLAT] } : undefined}
        transition={loop(4.4)}
      />
      <motion.circle
        cx={120}
        cy={dotFlat}
        r={6}
        fill={RED}
        animate={active ? { cy: [dotFlat, dotSteep, dotFlat] } : undefined}
        transition={loop(4.4)}
      />
      {/* The slider the student is dragging */}
      <path d="M70 166h100" stroke={INK} strokeOpacity={0.2} strokeWidth={3} strokeLinecap="round" />
      <motion.circle
        cx={70}
        cy={166}
        r={7}
        fill={INK}
        animate={active ? { cx: [70, 170, 70] } : undefined}
        transition={loop(4.4)}
      />
    </svg>
  );
}

const PREVIEWS: Record<string, (p: PreviewProps) => React.JSX.Element> = {
  chemistry: Chemistry,
  physics: Physics,
  english: English,
  biology: Biology,
  maths: Maths,
};

export function SubjectPreview({ id, active }: { id: string; active: boolean }) {
  const Preview = PREVIEWS[id];
  return Preview ? <Preview active={active} /> : null;
}
