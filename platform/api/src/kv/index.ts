import { defaultTokenProvider, type TokenProvider } from '@soyl/shared/azure/identity';
import type { Config } from '../config';
import { MemoryKv } from './memory';
import { RedisKv } from './redis';
import type { KeyValueStore } from './store';

export * from './store';
export { MemoryKv } from './memory';
export { RedisKv, redisTlsOptions, type RedisEntraAuth } from './redis';

/**
 * ioredis when REDIS_URL is set, otherwise in-memory (local/test only; config enforces this).
 * REDIS_AUTH=entra: managed-identity token auth for Azure Managed Redis (INFRA-3).
 */
export function createKv(
  config: Pick<Config, 'redisUrl'> & { redis?: Config['redis'] },
  opts: { tokens?: TokenProvider; onRefreshError?: (err: unknown) => void } = {},
): KeyValueStore {
  if (!config.redisUrl) return new MemoryKv();
  if (config.redis?.auth === 'entra')
    return new RedisKv(config.redisUrl, {}, undefined, undefined, {
      username: config.redis.username!,
      tokens: opts.tokens ?? defaultTokenProvider(),
      onRefreshError: opts.onRefreshError,
    });
  return new RedisKv(config.redisUrl);
}
