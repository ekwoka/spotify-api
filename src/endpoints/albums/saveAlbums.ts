import { PersistentApiProperties, QueryFunction } from '../../core';
import { AlbumSavedStatus } from '../../core/cacheKeys';
import { BatchedFunction, batchWrap, spotifyFetch } from '../../utils';

/**
 * Adds an album or albums to the current user's library. Accepts both single
 * album IDs or an array of album IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Albums cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const saveAlbums: SaveAlbums = ((
  ids: string | string[],
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> => {
  if (Array.isArray(ids))
    return ({ token, cache }) =>
      Promise.all(ids.map((id) => batchSaveAlbums(token, id, cache)));
  return ({ token, cache }) => batchSaveAlbums(token, ids, cache);
}) as SaveAlbums;

const batchSaveAlbums: BatchedFunction<boolean> = batchWrap(
  async (token, ids, cache: PersistentApiProperties['cache']) => {
    const endpoint = 'me/albums';
    const data = await spotifyFetch<boolean[]>(endpoint, token, {
      method: 'PUT',
      body: JSON.stringify({ ids }),
    });
    cache.set(
      AlbumSavedStatus,
      ids.reduce(
        (acc, id) => ((acc[id] = true), acc),
        cache.get(AlbumSavedStatus) ?? {},
      ),
    );
    return data;
  },
);

type SaveAlbums = {
  (albumId: string): QueryFunction<Promise<boolean>>;
  (albumIds: string[]): QueryFunction<Promise<boolean[]>>;
};
