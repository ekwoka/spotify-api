import { QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { Playlist } from './types';

export const getPlaylistItems =
  (
    playlistID: string,
    options?: GetPlaylistItemsOptions
  ): QueryFunction<Promise<Playlist['tracks']>> =>
  ({ token }) => {
    const endpoint = `playlists/${playlistID}/tracks?${toURLString(options)}`;
    return spotifyFetch(endpoint, token);
  };

type GetPlaylistItemsOptions = {
  limit?: string | number;
  market?: string;
  offset?: string | number;
};
