import { QueryFunction } from './types';

/**
 * The resetCache utility cleans out the cache on the active client, either
 * entirely emptying the cache, or by selectively invalidating cache via
 * the passed in property. This is useful for forcing refreshed data.
 * @param cacheType string
 * @returns void
 */
export const resetCache =
  (cacheType?: string): QueryFunction =>
  (Client) => {
    if (!cacheType)
      Client.cache = {
        albums: {},
        artists: {},
        saved: {
          albums: {},
          playlists: {},
          tracks: {},
        },
      };
    else delete Client.cache[cacheType];
  };
