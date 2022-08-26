import { PersistentApiProperties, QueryFunction } from '../../core';
import {
  BatchedFunction,
  batchWrap,
  spotifyFetch,
  toURLString,
} from '../../utils';

/**
 * Checks whether a provided track ID (or IDs in array) exist in the current
 * user's library. Returns a boolean of the status. Batches requests and
 * Caches the result in the saved tracks cache for easier retrieval.
 * @param trackID: string | string[]
 * @returns boolean | boolean[]
 */
export const trackIsSaved: TrackIsSaved = ((
  trackID: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> => {
  if (Array.isArray(trackID))
    return (client) =>
      Promise.all(trackID.map((id) => cacheTrackIsSaved(client, id)));
  return (client) => cacheTrackIsSaved(client, trackID);
}) as TrackIsSaved;

const cacheTrackIsSaved = async (
  { token, cache }: PersistentApiProperties,
  track: string
): Promise<boolean> => {
  const subCache = cache.saved.tracks;
  if (subCache[track]) return subCache[track];
  const data = await batchTrackIsSaved(token, track);
  subCache[track] = data;
  return data;
};

type TrackIsSaved = {
  (trackID: string): QueryFunction<Promise<boolean>>;
  (trackID: string[]): QueryFunction<Promise<boolean[]>>;
};

const batchTrackIsSaved: BatchedFunction<boolean> = batchWrap(
  async (token, ids) => {
    const endpoint = `me/tracks/contains?${toURLString({
      ids: ids.join(','),
    })}`;
    const data = await spotifyFetch<boolean[]>(endpoint, token);
    return data;
  },
  50
);
