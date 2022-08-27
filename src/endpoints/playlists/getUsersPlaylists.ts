import { PaginatedList, QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { PlaylistStub } from './types';

/**
 * Gets a paginated list of the users saved and created playlists. These do
 * not include the actual tracks involved (use getPlaylist to get this
 * information). Can be limited and offset by providing options.
 * @param options { limit: number, offset: number }
 * @returns Paginated List of Playlist Stubs
 */
export const getUsersPlaylists =
  (
    options?: UserPlaylistOptions
  ): QueryFunction<Promise<PaginatedList<PlaylistStub>>> =>
  ({ token }) => {
    const endpoint = `me/playlists?${toURLString(options)}`;
    return spotifyFetch(endpoint, token);
  };

type UserPlaylistOptions = {
  limit?: number;
  offset?: number;
};
