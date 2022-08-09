import { QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { Album } from './types';

export const getAlbum =
  (id: string, market?: string): QueryFunction<Promise<Album>> =>
  async ({ token }) => {
    const endpoint = `albums/${id}${
      market ? `?${toURLString({ market })}` : ''
    }`;
    const data = await spotifyFetch<Album>(endpoint, token);
    return data;
  };
