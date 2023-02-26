import { PaginatedList, QueryFunction } from '../../core';
import { PlaylistSavedStatus } from '../../core/cacheKeys';
import { deepFreeze, spotifyFetch, toURLString } from '../../utils';
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
  async ({ token, cache }) => {
    const endpoint = `me/playlists?${toURLString(options)}`;
    const cached = cache.get(endpoint);
    if (cached) return cached as PaginatedList<PlaylistStub>;
    const playlists = await spotifyFetch<PaginatedList<PlaylistStub>>(
      endpoint,
      token
    );
    cache.set(endpoint, deepFreeze(playlists));
    cache.set(
      PlaylistSavedStatus,
      playlists.items.reduce(
        (acc, { id }) => ((acc[id] = true), acc),
        cache.get(PlaylistSavedStatus) ?? {}
      )
    );
    return playlists;
  };

type UserPlaylistOptions = {
  limit?: number;
  offset?: number;
};
