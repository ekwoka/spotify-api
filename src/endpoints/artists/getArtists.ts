import { Artist, getArtist } from '.';
import { QueryFunction } from '../../core';
/**
 * Gets multiple artists with one request to Spotify. Market limits the search
 * to a specific market. This endpoint is passes the artist IDs to getArtist
 * to allow for intelligent batching with a reduced bundle size.
 * @param ids string[]
 * @param market string
 * @returns Artists
 */
export const getArtists =
  (ids: string[], market?: string): QueryFunction<Promise<Artists>> =>
  async (client) => {
    const artists = await Promise.all(
      ids.map((id) => getArtist(id, market)(client))
    );
    return { artists };
  };

export type Artists = {
  artists: Artist[];
};
