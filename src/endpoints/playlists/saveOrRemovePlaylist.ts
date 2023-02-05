import { QueryFunction } from '../../core';
import { PlaylistSavedStatus } from '../../core/cacheKeys';
import {
  arrayWrap,
  createMapper,
  mappedArguments,
  spotifyFetch,
} from '../../utils';

/**
 * Adds a playlist or playlists to the current user's library. Accepts both single
 * playlist IDs or an array of playlist IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Playlists cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const savePlaylists: SavePlaylists = ((
  ids: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> =>
  saveOrRemovePlaylist(ids, true)) as SavePlaylists;

type SavePlaylists = {
  (playlistID: string): QueryFunction<Promise<boolean>>;
  (playlistIDs: string[]): QueryFunction<Promise<boolean[]>>;
};

/**
 * Removes playlists from the current user's library. Accepts both a single ID
 * as well as an array of playlist IDs. Will return true if successful and
 * throw if unsuccessful. Caches new status in the Saved Playlists cache.
 * @param ids: string | string[]
 * @returns true | true[]
 */
export const removePlaylists: RemovePlaylists = ((
  ids: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> =>
  saveOrRemovePlaylist(ids, false)) as RemovePlaylists;

type RemovePlaylists = {
  (playlistID: string): QueryFunction<Promise<boolean>>;
  (playlistIDs: string[]): QueryFunction<Promise<boolean[]>>;
};

const saveOrRemovePlaylist =
  (
    ids: string | string[],
    state: boolean
  ): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> =>
  async (client) => {
    const results = await createMapper<string, boolean>(
      async (id: string, client) => (
        await (state ? savePlaylist : removePlaylist)(client.token, id), state
      )
    )(ids as mappedArguments<string, boolean>)(client);
    client.cache.set(
      PlaylistSavedStatus,
      arrayWrap(ids).reduce(
        (acc, id) => ((acc[id] = state), acc),
        client.cache.get(PlaylistSavedStatus) ?? {}
      )
    );
    return results;
  };

const createFollowPlaylistCallback =
  (method: 'PUT' | 'DELETE') => (token: string, id: string) => {
    const endpoint = `playlists/${id}/followers`;
    return spotifyFetch<undefined>(
      endpoint,
      token,
      {
        method,
      },
      false
    );
  };

const savePlaylist = createFollowPlaylistCallback('PUT');

const removePlaylist = createFollowPlaylistCallback('DELETE');
