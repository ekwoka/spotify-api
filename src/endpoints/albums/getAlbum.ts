import { getAlbums } from '.';
import { QueryFunction } from '../../core';
import { Album } from './types';

/**
 * Gets single album by ID. This endpoint is implemented through getAlbums to
 * allow for improved performance and a smaller bundle size. In the future
 * this endpoint will batch and cache album data to limit requests.
 * @param id string
 * @param market string
 * @returns Album
 */
export const getAlbum =
  (id: string, market?: string): QueryFunction<Promise<Album>> =>
  async (client) => {
    const { albums } = await getAlbums([id], market)(client);
    return albums[0];
  };
