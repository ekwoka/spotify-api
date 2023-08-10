import { PersistentApiProperties, QueryFunction } from '../../core';
import { AlbumSavedStatus } from '../../core/cacheKeys';
import { BatchedFunction, batchWrap, spotifyFetch } from '../../utils';

/**
 * Removes albums from the current user's library. Accepts both a single ID
 * as well as an array of album IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Albums cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const removeAlbums: RemoveAlbums = ((
  ids: string | string[],
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> => {
  if (Array.isArray(ids))
    return ({ token, cache }) =>
      Promise.all(ids.map((id) => batchRemoveAlbums(token, id, cache)));
  return ({ token, cache }) => batchRemoveAlbums(token, ids, cache);
}) as RemoveAlbums;

const batchRemoveAlbums: BatchedFunction<boolean> = batchWrap(
  async (token, ids, cache: PersistentApiProperties['cache']) => {
    const endpoint = 'me/albums';
    const data = await spotifyFetch<boolean[]>(endpoint, token, {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
    cache.set(
      AlbumSavedStatus,
      ids.reduce(
        (acc, id) => ((acc[id] = false), acc),
        cache.get(AlbumSavedStatus) ?? {},
      ),
    );
    return data;
  },
);

type RemoveAlbums = {
  (albumId: string): QueryFunction<Promise<boolean>>;
  (albumIds: string[]): QueryFunction<Promise<boolean[]>>;
};
