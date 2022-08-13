import { QueryFunction } from '../../core';
import { getAlbum, TrackList } from './';

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
  async (client) => {
    const album = await getAlbum(id, market)(client);
    return album.tracks;
  };
