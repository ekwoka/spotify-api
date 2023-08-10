import { Albums } from '.';
import {
  BatchedFunction,
  batchWrap,
  spotifyFetch,
  toURLString,
} from '../../utils/';
import { Album } from './types';

/**
 * Wraps up the function for requesting multiple albums from the Spotify API
 * in a BatchedFunction Wrapper for use in the album endpoints, reducing
 * the number of calls to Spotify's API. Album IDs in, Album Data Out.
 */
export const batchAlbums: BatchedFunction<Album> = batchWrap(
  async (token, ids, market: string) => {
    const endpoint = `albums?${toURLString({
      ids: ids.join(','),
      ...(market && { market }),
    })}`;
    const data = await spotifyFetch<Albums>(endpoint, token);
    return data.albums;
  },
  20,
);
