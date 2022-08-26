import { QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { Playlist } from './types';

export const getPlaylist =
  (
    playlistID: string,
    options?: GetPlaylistOptions
  ): QueryFunction<Promise<Playlist>> =>
  ({ token }) => {
    const endpoint = `playlists/${playlistID}?${toURLString(options)}`;
    return spotifyFetch(endpoint, token);
  };

type GetPlaylistOptions = {
  fields?: string;
  market?: string;
  additional_types?: string;
};
