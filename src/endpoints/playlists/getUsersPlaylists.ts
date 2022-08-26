import { PaginatedList, QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { PlaylistStub } from './types';

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
