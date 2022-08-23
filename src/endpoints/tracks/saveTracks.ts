import { PersistentApiProperties, QueryFunction } from '../../core';
import { BatchedFunction, batchWrap, spotifyFetch } from '../../utils';

/**
 * Adds a track or tracks to the current user's library. Accepts both single
 * track IDs or an array of track IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Tracks cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const saveTracks: SaveTracks = ((
  ids: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> => {
  if (Array.isArray(ids))
    return (client) =>
      Promise.all(ids.map((id) => cacheSavedTracks(client, id)));
  return (client) => cacheSavedTracks(client, ids);
}) as SaveTracks;

const cacheSavedTracks = async (
  { token, cache }: PersistentApiProperties,
  track: string
): Promise<boolean> => {
  const data = await batchSaveTracks(token, track);
  cache.saved.tracks[track] = true;
  return data;
};

const batchSaveTracks: BatchedFunction<boolean> = batchWrap(
  async (token, ids) => {
    const endpoint = `me/tracks`;
    const data = await spotifyFetch<boolean[]>(endpoint, token, {
      method: 'PUT',
      body: JSON.stringify({ ids }),
    });
    return data;
  }
);

type SaveTracks = {
  (trackID: string): QueryFunction<Promise<boolean>>;
  (trackIDs: string[]): QueryFunction<Promise<boolean[]>>;
};
