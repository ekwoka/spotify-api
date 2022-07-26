import { PersistentApiProperties, QueryFunction } from '../../core';
import {
  batchWrap,
  spotifyFetch,
  BatchCallback,
  createMapper,
  mappedArguments,
} from '../../utils';

/**
 * Adds a track or tracks to the current user's library. Accepts both single
 * track IDs or an array of track IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Tracks cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const saveTracks: SaveTracks = ((
  ids: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> =>
  createMapper((id: string, client: PersistentApiProperties) =>
    cacheNewTrackState(client, id, true)
  )(ids as mappedArguments<string, boolean>)) as SaveTracks;

type SaveTracks = {
  (trackID: string): QueryFunction<Promise<boolean>>;
  (trackIDs: string[]): QueryFunction<Promise<boolean[]>>;
};

/**
 * Removes tracks from the current user's library. Accepts both a single ID
 * as well as an array of track IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Tracks cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const removeTracks: RemoveTracks = ((
  ids: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> =>
  createMapper((id: string, client: PersistentApiProperties) =>
    cacheNewTrackState(client, id, false)
  )(ids as mappedArguments<string, boolean>)) as RemoveTracks;

type RemoveTracks = {
  (trackID: string): QueryFunction<Promise<boolean>>;
  (trackIDs: string[]): QueryFunction<Promise<boolean[]>>;
};

const cacheNewTrackState = async (
  { token, cache }: PersistentApiProperties,
  track: string,
  state: boolean
): Promise<boolean> => {
  await (state ? batchSaveTrack : batchRemoveTrack)(token, track);
  cache.saved.tracks[track] = state;
  return state;
};

const saveOrRemoveBatchCallback =
  (method: 'PUT' | 'DELETE'): BatchCallback<string, undefined> =>
  (token, ids) => {
    const endpoint = `me/tracks`;
    return spotifyFetch<undefined>(
      endpoint,
      token,
      {
        method,
        body: JSON.stringify({ ids }),
      },
      false
    );
  };

const batchSaveTrack = batchWrap(saveOrRemoveBatchCallback('PUT'));

const batchRemoveTrack = batchWrap(saveOrRemoveBatchCallback('DELETE'));
