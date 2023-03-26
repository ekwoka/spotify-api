import { batchArtists } from '.';
import { QueryFunction } from '../../core';
import { deepFreeze } from '../../utils';
import { Artist } from './types';

/**
 * Gets single artist by ID. This endpoint is the center of the main artists
 * endpoints allowing for improved performance and smaller bundle sizes.
 * This handles the individual calls to batch the requests together.
 * @param id string
 * @returns Artist
 */
export const getArtist =
  (id: string): QueryFunction<Promise<Artist>> =>
  async ({ token, cache }) => {
    const cached = cache.get(`artist.${id}`);
    if (cached) return cached as Artist;
    const artist = await batchArtists(token, id);
    cache.set(`artist.${id}`, deepFreeze(artist));
    return artist;
  };
