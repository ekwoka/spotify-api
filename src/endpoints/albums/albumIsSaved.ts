import { PersistentApiProperties, QueryFunction } from '../../core';
import { AlbumSavedStatus } from '../../core/cacheKeys';
import {
  BatchedFunction,
  batchWrap,
  spotifyFetch,
  toURLString,
} from '../../utils';

/**
 * Checks whether a provided album ID (or IDs in array) exist in the current
 * user's library. Returns a boolean of the status. Batches requests and
 * Caches the result in the saved albums cache for easier retrieval.
 * @param album: string | string[]
 * @returns boolean | boolean[]
 */
export const albumIsSaved: AlbumIsSaved = ((
  album: string | string[],
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> => {
  if (Array.isArray(album))
    return (client) =>
      Promise.all(album.map((id) => cacheAlbumIsSaved(client, id)));
  return (client) => cacheAlbumIsSaved(client, album);
}) as AlbumIsSaved;

const cacheAlbumIsSaved = async (
  { token, cache }: PersistentApiProperties,
  album: string,
): Promise<boolean> => {
  const cached = cache.get(AlbumSavedStatus) as Record<string, boolean>;
  return cached?.[album] ?? (await batchAlbumIsSaved(token, album, cache));
};

type AlbumIsSaved = {
  (albumId: string): QueryFunction<Promise<boolean>>;
  (albumIds: string[]): QueryFunction<Promise<boolean[]>>;
};

const batchAlbumIsSaved: BatchedFunction<boolean> = batchWrap(
  async (token, ids, cache: PersistentApiProperties['cache']) => {
    const endpoint = `me/albums/contains?${toURLString({
      ids: ids.join(','),
    })}`;
    const data = await spotifyFetch<boolean[]>(endpoint, token);
    cache.set(
      AlbumSavedStatus,
      ids.reduce(
        (acc, id, idx) => ((acc[id] = data[idx]), acc),
        cache.get(AlbumSavedStatus) ?? {},
      ),
    );
    return data;
  },
);
