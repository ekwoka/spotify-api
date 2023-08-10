import { QueryFunction } from '../../core';
import { TrackSavedStatus } from '../../core/cacheKeys';
import {
  BatchCallback,
  arrayWrap,
  batchWrap,
  createMapper,
  mappedArguments,
  spotifyFetch,
} from '../../utils';

/**
 * Adds a track or tracks to the current user's library. Accepts both single
 * track IDs or an array of track IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Tracks cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const saveTracks: SaveTracks = ((
  ids: string | string[],
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> =>
  saveOrRemoveTrack(ids, true)) as SaveTracks;

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
  ids: string | string[],
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> =>
  saveOrRemoveTrack(ids, false)) as RemoveTracks;

type RemoveTracks = {
  (trackID: string): QueryFunction<Promise<boolean>>;
  (trackIDs: string[]): QueryFunction<Promise<boolean[]>>;
};

const saveOrRemoveTrack =
  (
    ids: string | string[],
    state: boolean,
  ): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> =>
  async (client) => {
    const results = await createMapper<string, boolean>(
      async (id: string, client) => (
        await (state ? batchSaveTrack : batchRemoveTrack)(client.token, id),
        state
      ),
    )(ids as mappedArguments<string, boolean>)(client);
    client.cache.set(
      TrackSavedStatus,
      arrayWrap(ids).reduce(
        (acc, id) => ((acc[id] = state), acc),
        client.cache.get(TrackSavedStatus) ?? {},
      ),
    );
    return results;
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
      false,
    );
  };

const batchSaveTrack = batchWrap(saveOrRemoveBatchCallback('PUT'));

const batchRemoveTrack = batchWrap(saveOrRemoveBatchCallback('DELETE'));
