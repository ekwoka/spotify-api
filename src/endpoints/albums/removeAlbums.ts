import { PersistentApiProperties, QueryFunction } from '../../core';
import { BatchedFunction, batchWrap, spotifyFetch } from '../../utils';

/**
 * Removes albums from the current user's library. Accepts both a single ID
 * as well as an array of album IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Albums cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const removeAlbums: RemoveAlbums = ((
  ids: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> => {
  if (Array.isArray(ids))
    return (client) =>
      Promise.all(ids.map((id) => cacheSavedAlbums(client, id)));
  return (client) => cacheSavedAlbums(client, ids);
}) as RemoveAlbums;

const cacheSavedAlbums = async (
  { token, cache }: PersistentApiProperties,
  album: string
): Promise<boolean> => {
  const data = await batchRemoveAlbums(token, album);
  cache.saved.albums[album] = false;
  return data;
};

const batchRemoveAlbums: BatchedFunction<boolean> = batchWrap(
  async (token, ids) => {
    const endpoint = `me/albums`;
    const data = await spotifyFetch<boolean[]>(endpoint, token, {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
    return data;
  }
);

type RemoveAlbums = {
  (albumId: string): QueryFunction<Promise<boolean>>;
  (albumIds: string[]): QueryFunction<Promise<boolean[]>>;
};
