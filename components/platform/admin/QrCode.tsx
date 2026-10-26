'use client';

/**
 * QR code of the TOTP `otpauth://` URI for authenticator apps. Drawn as one SVG path from the encoder's
 * module matrix (qrcode-generator, ADR-013): no HTML strings, no images, no network. Nothing is stored.
 */
import qrcode from 'qrcode-generator';

export function qrPath(text: string): { size: number; d: string } {
  const qr = qrcode(0, 'M');
  qr.addData(text, 'Byte');
  qr.make();
  const n = qr.getModuleCount();
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + 4} ${r + 4}h1v1h-1z`;
  return { size: n + 8, d };
}

export function QrCode({ text, label }: { text: string; label: string }) {
  const { size, d } = qrPath(text);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={224} height={224} role="img" aria-label={label} shapeRendering="crispEdges" data-testid="mfa-qr">
      <rect width={size} height={size} fill="#fff" />
      <path d={d} fill="#000" />
    </svg>
  );
}
