import { PersistentApiProperties, QueryFunction } from '../../core';
import { spotifyFetch } from '../../utils';

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
  createMap((id: string, client: PersistentApiProperties) =>
    cacheNewPlaylistState(client, id, true)
  )(ids)) as SavePlaylists;

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
  createMap((id: string, client: PersistentApiProperties) =>
    cacheNewPlaylistState(client, id, false)
  )(ids)) as RemovePlaylists;

type RemovePlaylists = {
  (playlistID: string): QueryFunction<Promise<boolean>>;
  (playlistIDs: string[]): QueryFunction<Promise<boolean[]>>;
};

const createMap =
  <T, S>(cb: (val: T, client: PersistentApiProperties) => Promise<S>) =>
  (vals: T | T[]) =>
    Array.isArray(vals)
      ? (client: PersistentApiProperties): Promise<S[]> =>
          Promise.all(vals.map((val) => cb(val, client)))
      : (client: PersistentApiProperties) => cb(vals, client);

const cacheNewPlaylistState = async (
  { token, cache }: PersistentApiProperties,
  playlist: string,
  state: boolean
): Promise<boolean> => {
  await (state ? savePlaylist : removePlaylist)(token, playlist);
  cache.saved.playlists[playlist] = state;
  return state;
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
