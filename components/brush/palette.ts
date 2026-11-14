/**
 * The brush palette (ADR-033): graphite on warm paper, with the brand's three pigments (ultramarine, vermilion,
 * ochre) and sap green for "secure" / learning gain. Mirrors the --color-* tokens added in app/globals.css.
 */
export const PALETTE = {
  sheet: '#f6f1e6',
  sheetDeep: '#ede5d4',
  ink: '#1f1c19',
  graphite: '#4a4640',
  ultramarine: '#2b48c8',
  vermilion: '#cf4a2e',
  ochre: '#e2b13c',
  sap: '#3f7a55', // paint only; the text token is darker (globals.css)
} as const;

export type Pigment = 'ultramarine' | 'vermilion' | 'ochre' | 'sap';
export const PIGMENTS: Pigment[] = ['ultramarine', 'vermilion', 'ochre', 'sap'];
