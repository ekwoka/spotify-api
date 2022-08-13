import { batchAlbums } from '.';
import { QueryFunction } from '../../core';
import { deepFreeze } from '../../utils';
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
  async ({ token, cache }) => {
    if (!cache.albums) cache.albums = {};
    if (cache.albums[id]) return cache.albums[id];
    const album = await batchAlbums(token, id, market);
    cache.albums[id] = deepFreeze(album);
    return album;
  };
