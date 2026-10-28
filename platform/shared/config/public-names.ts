/**
 * Public, pseudonymous names (D-039 data minimisation). Leaderboards, leagues and live-mock ranks never
 * show a real name: each student gets an auto-generated "Adjective Animal NNN" name, derived from their
 * account id and a per-account seed. It is stable (same id + seed → same name) and regenerable (the
 * student asks for a new one → a new random seed). The seed is the only thing stored
 * (`profiles.public_name_seed`), so the name carries no personal data.
 *
 * Words are friendly, child-safe and gender-neutral. Owner-tunable: changing a list renames everyone,
 * so append only. No imports (the web may import this file).
 */

export const PUBLIC_NAME_ADJECTIVES: readonly string[] = [
  'Brave', 'Bright', 'Calm', 'Clever', 'Cosmic', 'Curious', 'Daring', 'Eager',
  'Gentle', 'Golden', 'Happy', 'Honest', 'Jolly', 'Keen', 'Kind', 'Lively',
  'Lucky', 'Mighty', 'Nimble', 'Noble', 'Patient', 'Plucky', 'Proud', 'Quick',
  'Quiet', 'Radiant', 'Rapid', 'Sharp', 'Shiny', 'Smart', 'Snappy', 'Speedy',
  'Steady', 'Sunny', 'Swift', 'Thoughtful', 'Tidy', 'Witty', 'Wise', 'Zesty',
  'Bold', 'Breezy', 'Cheerful', 'Crisp', 'Dazzling', 'Fearless', 'Friendly', 'Gleaming',
  'Graceful', 'Hopeful', 'Joyful', 'Loyal', 'Merry', 'Mindful', 'Peppy', 'Polite',
  'Sparkly', 'Spirited', 'Stellar', 'Sturdy', 'Upbeat', 'Vivid', 'Warm', 'Zippy',
];

export const PUBLIC_NAME_ANIMALS: readonly string[] = [
  'Otter', 'Falcon', 'Panda', 'Tiger', 'Dolphin', 'Eagle', 'Koala', 'Lynx',
  'Peacock', 'Parrot', 'Penguin', 'Rabbit', 'Robin', 'Sparrow', 'Squirrel', 'Turtle',
  'Whale', 'Zebra', 'Badger', 'Beaver', 'Bison', 'Camel', 'Cheetah', 'Crane',
  'Deer', 'Elephant', 'Finch', 'Fox', 'Gazelle', 'Gecko', 'Giraffe', 'Heron',
  'Hornbill', 'Ibex', 'Jaguar', 'Kingfisher', 'Kiwi', 'Lemur', 'Leopard', 'Lion',
  'Llama', 'Macaw', 'Mongoose', 'Moose', 'Myna', 'Narwhal', 'Owl', 'Panther',
  'Pelican', 'Puffin', 'Quail', 'Raven', 'Rhino', 'Seal', 'Starling', 'Swan',
  'Tapir', 'Toucan', 'Walrus', 'Wombat', 'Yak', 'Bulbul', 'Hoopoe', 'Langur',
];

/** 32-bit FNV-1a: stable across runtimes, no crypto needed (the name is public anyway). Also seeds the default avatar. */
export function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** The animal of the public name for (account id, seed), e.g. "Otter" for "Brave Otter 417" (the default avatar, avatars.ts). */
export function publicNameAnimal(userId: string, seed = 0): string {
  return PUBLIC_NAME_ANIMALS[fnv1a(`ani:${userId}:${seed}`) % PUBLIC_NAME_ANIMALS.length]!;
}

/** "Brave Otter 417" for (account id, seed). Numbers are 100–999, so no name looks like a roll or phone number. */
export function publicName(userId: string, seed = 0): string {
  const a = fnv1a(`adj:${userId}:${seed}`);
  const n = fnv1a(`num:${userId}:${seed}`);
  return `${PUBLIC_NAME_ADJECTIVES[a % PUBLIC_NAME_ADJECTIVES.length]} ${publicNameAnimal(userId, seed)} ${100 + (n % 900)}`;
}

/** Seeds are positive 31-bit integers; 0 is every account's first name. */
export const PUBLIC_NAME_MAX_SEED = 2_147_483_647;
