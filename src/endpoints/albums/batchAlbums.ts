import { Albums } from '.';
import {
  BatchedFunction,
  batchWrap,
  spotifyFetch,
  toURLString,
} from '../../utils/';
import { Album } from './types';

export const batchAlbums: BatchedFunction<Album> = batchWrap(
  async (token, ids, market: string) => {
    const endpoint = `albums?${toURLString({
      ids: ids.join(','),
      ...(market && { market }),
    })}`;
    const data = await spotifyFetch<Albums>(endpoint, token);
    return data.albums;
  },
  20
);
