import { QueryConstructor } from './types';

/**
 * The resetCache utility cleans out the cache on the active client, either
 * entirely emptying the cache, or by selectively invalidating cache via
 * the passed in property. This is useful for forcing refreshed data.
 * @param cacheType string
 * @returns void
 */
export const resetCache: QueryConstructor =
  (cacheType?: string) => (Client) => {
    if (!cacheType) Client.cache = {};
    else delete Client.cache[cacheType];
  };
