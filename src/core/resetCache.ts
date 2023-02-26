import { QueryFunction } from './types';

/**
 * The resetCache utility cleans out the cache on the active client, either
 * entirely emptying the cache, or by selectively invalidating cache via
 * the passed in property. This is useful for forcing refreshed data.
 * @param key string
 * @returns void
 */
export const resetCache =
  (key?: string): QueryFunction =>
  (Client) => {
    if (!key) Client.cache.clear();
    else Client.cache.delete(key);
  };
