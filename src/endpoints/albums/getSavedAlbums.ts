import { Album } from './';
import { PaginatedList, QueryFunction } from '../../core';
import { deepFreeze, spotifyFetch, toURLString } from '../../utils';
import { AlbumSavedStatus } from '../../core/cacheKeys';

/**
 * Retrieves a paginated list of Albums currently saved in the User's Library.
 * Accepts options to change the per page limit, as well as the initial
 * item offset. These can used combined to change the returned page.
 * @param {Object} options
 *  {number} options.limit
 *  {number} options.offset
 *  {string} options.market
 * @returns PaginatedList<Albums>
 */
export const getSavedAlbums =
  (
    options: SavedAlbumOptions = {}
  ): QueryFunction<Promise<PaginatedList<SavedAlbum>>> =>
  async ({ token, cache }) => {
    const endpoint = `me/albums?${toURLString(options)}`;
    const cachedList = cache.get(endpoint);
    if (cachedList) return cachedList as PaginatedList<SavedAlbum>;
    const data = await spotifyFetch<PaginatedList<SavedAlbum>>(endpoint, token);
    cache.set(endpoint, deepFreeze(data));
    cache.set(
      AlbumSavedStatus,
      data.items.reduce((acc, { album }) => {
        acc[album.id] = true;
        cache.set(`album.${album.id}`, album);
        return acc;
      }, cache.get(AlbumSavedStatus) ?? {})
    );
    return data;
  };

type SavedAlbumOptions = {
  limit?: number;
  offset?: number;
  market?: string;
};

export type SavedAlbum = {
  added_at: string;
  album: Album;
};
