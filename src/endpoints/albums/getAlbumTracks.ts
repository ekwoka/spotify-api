import { QueryFunction } from '../../core';
import { getAlbums, TrackList } from './';

export const getAlbumTracks =
  (id: string, market?: string): QueryFunction<Promise<TrackList>> =>
  async (client) => {
    const { albums } = await getAlbums([id], market)(client);
    return albums[0].tracks;
  };
