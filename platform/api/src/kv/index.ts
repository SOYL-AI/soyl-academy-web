import type { Config } from '../config';
import { MemoryKv } from './memory';
import { RedisKv } from './redis';
import type { KeyValueStore } from './store';

export * from './store';
export { MemoryKv } from './memory';
export { RedisKv } from './redis';

/** ioredis when REDIS_URL is set, otherwise in-memory (local/test only; config enforces this). */
export function createKv(config: Pick<Config, 'redisUrl'>): KeyValueStore {
  return config.redisUrl ? new RedisKv(config.redisUrl) : new MemoryKv();
}
