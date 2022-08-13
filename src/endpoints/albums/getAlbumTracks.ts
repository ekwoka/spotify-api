import { QueryFunction } from '../../core';
import { batchAlbums, TrackList } from './';

/**
 * Gets single album's TrackList by ID. This endpoint is implemented through
 * getAlbums to allow for improved performance and a smaller bundle size.
 * In the future, this endpoint will batch and cache Tracklist info.
 * @param id string
 * @param market string
 * @returns TrackList
 */
export const getAlbumTracks =
  (id: string, market?: string): QueryFunction<Promise<TrackList>> =>
  async ({ token }) => {
    const album = await batchAlbums(token, id, market);
    return album.tracks;
  };
