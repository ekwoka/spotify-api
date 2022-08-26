import { batchArtists } from '.';
import { QueryFunction } from '../../core';
import { deepFreeze } from '../../utils';
import { Artist } from './';

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
    if (cache.artists[id]) return cache.artists[id];
    const artist = await batchArtists(token, id);
    cache.artists[id] = deepFreeze(artist);
    return artist;
  };
