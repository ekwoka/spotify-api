import { Album, getAlbum } from '.';
import { QueryFunction } from '../../core';
/**
 * Gets multiple albums with one request to Spotify. Market limits the search
 * to a specific market. In the future, this endpoint will intelligently
 * batch and cache requests to improve performance and limit requests.
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
