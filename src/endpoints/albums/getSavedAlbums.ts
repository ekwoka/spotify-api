import { Album } from './';
import { PaginatedList, QueryFunction } from '../../core';
import { deepFreeze, spotifyFetch, toURLString } from '../../utils';

export const getSavedAlbums =
  (
    options: SavedAlbumOptions = {}
  ): QueryFunction<Promise<PaginatedList<SavedAlbum>>> =>
  async ({ token, cache }) => {
    const endpoint = `me/albums?${toURLString(options)}`;
    const data = await spotifyFetch<PaginatedList<SavedAlbum>>(endpoint, token);
    if (!cache.albums) cache.albums = {};
    data.items.forEach(
      ({ album }) => (cache.albums[album.id] = deepFreeze(album))
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
