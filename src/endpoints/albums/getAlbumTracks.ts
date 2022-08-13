import { QueryFunction } from '../../core';
import { getAlbum, TrackList } from './';

/**
 * Gets single album's TrackList by ID. This endpoint is implemented through
 * getAlbum to allow for improved performance and a smaller bundle size.
 * This batches Tracklist Requests into single calls to the API.
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
