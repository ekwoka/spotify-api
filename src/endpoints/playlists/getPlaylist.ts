import { QueryFunction } from '../../core';
import { spotifyFetch } from '../../utils';
import { Playlist } from './types';

export const getPlaylist =
  (playlistID: string): QueryFunction<Promise<Playlist>> =>
  ({ token }) => {
    const endpoint = `playlists/${playlistID}`;
    return spotifyFetch(endpoint, token);
  };
