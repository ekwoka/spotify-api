import { Album } from '.';
import { QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
/**
 *
 * @param ids string[]
 * @param market string
 * @returns Albums
 */
export const getAlbums =
  (ids: string[], market?: string): QueryFunction<Promise<Albums>> =>
  async ({ token }) => {
    const endpoint = `albums?${toURLString({
      ids: ids.join(','),
      ...(market && { market }),
    })}`;
    const data = await spotifyFetch<Albums>(endpoint, token);
    return data;
  };

export type Albums = {
  albums: Album[];
};
