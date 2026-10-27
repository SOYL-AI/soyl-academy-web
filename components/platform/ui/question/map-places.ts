/**
 * Map work helpers (contract v2 `map` questions; pipeline M2 handoff: "the renderer defines the ids and
 * must ship outline maps for them"). Until outline map assets exist, map questions use a list of labelled
 * text fields with place-name suggestions per `map_id`. Suggestions are a convenience only: any spelling
 * may be typed, and grading is self/AI evaluation against the key's accepted names.
 *
 * Known map ids: india-political, india-physical, world-political. An SVG outline per id can be added
 * later behind `MapInput`'s `renderMap` slot.
 */

const STATES_AND_UTS = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

const PHYSICAL = [
  'Himalayas', 'Karakoram Range', 'Aravalli Range', 'Vindhya Range', 'Satpura Range', 'Western Ghats', 'Eastern Ghats',
  'Thar Desert', 'Deccan Plateau', 'Chota Nagpur Plateau', 'Indo-Gangetic Plain', 'Ganga', 'Yamuna', 'Brahmaputra', 'Indus',
  'Narmada', 'Tapi', 'Mahanadi', 'Godavari', 'Krishna', 'Kaveri', 'Chambal', 'Son', 'Sabarmati', 'Luni', 'Rann of Kachchh',
  'Gulf of Khambhat', 'Gulf of Mannar', 'Palk Strait', 'Bay of Bengal', 'Arabian Sea', 'Indian Ocean', 'Sundarbans',
];

const WORLD = [
  'Afghanistan', 'Australia', 'Bangladesh', 'Bhutan', 'Brazil', 'Canada', 'China', 'Egypt', 'France', 'Germany', 'India',
  'Indonesia', 'Iran', 'Italy', 'Japan', 'Maldives', 'Myanmar', 'Nepal', 'Pakistan', 'Russia', 'Saudi Arabia', 'South Africa',
  'Sri Lanka', 'United Kingdom', 'United States of America',
];

export const MAP_PLACE_SUGGESTIONS: Record<string, readonly string[]> = {
  'india-political': STATES_AND_UTS,
  'india-physical': PHYSICAL,
  'world-political': WORLD,
};

/**
 * The place labels a map stem refers to: "(A)", "A.", "A)" or "A:" at the start of a line or list item,
 * or "marked A, B and C". Falls back to A–C when the stem names none.
 */
export function mapLabelsFromStem(stem: string): string[] {
  const found: string[] = [];
  const add = (l: string) => {
    if (!found.includes(l)) found.push(l);
  };
  for (const m of stem.matchAll(/^\s*(?:[-*]\s+|\d+\.\s+)?\(?([A-H])[.):]\s/gm)) add(m[1]!);
  if (!found.length) {
    const marked = /(?:marked|labelled|labeled|shown as)\s+((?:[A-H](?:\s*,\s*|\s+and\s+|\s*&\s*))*[A-H])\b/i.exec(stem);
    if (marked) for (const l of marked[1]!.match(/[A-H]/g) ?? []) add(l);
  }
  return found.length ? found : ['A', 'B', 'C'];
}
