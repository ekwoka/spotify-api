import { Album, getAlbum } from '.';
import { QueryFunction } from '../../core';

/**
 * Gets multiple albums with one request to Spotify. Market limits the search
 * to a specific market. This endpoint is passes the album IDs to getAlbum
 * to allow for intelligent batching with a reduced bundle size.
 * @param ids string[]
 * @param market string
 * @returns Albums
 */
export const getAlbums =
  (ids: string[], market?: string): QueryFunction<Promise<Albums>> =>
  async (client) => {
    const albums = await Promise.all(
      ids.map((id) => getAlbum(id, market)(client))
    );
    return { albums };
  };

export type Albums = {
  albums: Album[];
};
