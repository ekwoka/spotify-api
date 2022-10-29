import { PersistentApiProperties, QueryFunction } from '../../core';
import { BatchedFunction, batchWrap, spotifyFetch } from '../../utils';

/**
 * Removes tracks from the current user's library. Accepts both a single ID
 * as well as an array of track IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Tracks cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const removeTracks: RemoveTracks = ((
  ids: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> => {
  if (Array.isArray(ids))
    return (client) =>
      Promise.all(ids.map((id) => cacheRemovedTracks(client, id)));
  return (client) => cacheRemovedTracks(client, ids);
}) as RemoveTracks;

const cacheRemovedTracks = async (
  { token, cache }: PersistentApiProperties,
  track: string
): Promise<boolean> => {
  const data = await batchRemoveTracks(token, track);
  cache.saved.tracks[track] = false;
  return data;
};

const batchRemoveTracks: BatchedFunction<boolean> = batchWrap(
  async (token, ids) => {
    const endpoint = `me/tracks`;
    await spotifyFetch<boolean[]>(
      endpoint,
      token,
      {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
      },
      false
    );
    return ids.map(() => false);
  }
);

type RemoveTracks = {
  (trackID: string): QueryFunction<Promise<boolean>>;
  (trackIDs: string[]): QueryFunction<Promise<boolean[]>>;
};
