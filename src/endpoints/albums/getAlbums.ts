import { Album, batchAlbums } from '.';
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
  async ({ token }) => {
    const albums = await Promise.all(
      ids.map((id) => batchAlbums(token, id, market))
    );
    return { albums };
  };

export type Albums = {
  albums: Album[];
};
