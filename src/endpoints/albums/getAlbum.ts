import { batchAlbums } from '.';
import { QueryFunction } from '../../core';
import { deepFreeze } from '../../utils';
import { Album } from './types';

/**
 * Gets single album by ID. This endpoint is the center of the main albums
 * endpoints allowing for improved performance and smaller bundle sizes.
 * This handles the individual calls to batch the requests together.
 * @param id string
 * @param market string
 * @returns Album
 */
export const getAlbum =
  (id: string, market?: string): QueryFunction<Promise<Album>> =>
  async ({ token, cache }) => {
    const cached = cache.get(`album.${id}`);
    if (cached) return cached as Album;
    const album = await batchAlbums(token, id, market);
    cache.set(`album.${id}`, deepFreeze(album));
    return album;
  };
