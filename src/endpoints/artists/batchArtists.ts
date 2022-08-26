import {
  BatchedFunction,
  batchWrap,
  spotifyFetch,
  toURLString,
} from '../../utils/';
import { Artist, Artists } from './';

/**
 * Wraps up the function for requesting multiple artists from the Spotify API
 * in a BatchedFunction Wrapper for use in the album endpoints, reducing
 * the number of calls to Spotify's API. Artist IDs in, Artist Data Out.
 */
export const batchArtists: BatchedFunction<Artist> = batchWrap(
  async (token, ids) => {
    const endpoint = `artists?${toURLString({
      ids: ids.join(','),
    })}`;
    const data = await spotifyFetch<Artists>(endpoint, token);
    return data.artists;
  },
  50
);
