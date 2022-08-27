import { QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { Playlist } from './types';

// TODO: Get Types to work with fields entry

/**
 * Gets the full information (or a limited subset) regarding the specified
 * playlist id. Use the `fields` entry in the passed objects to limit
 * the returned information to only the necessary fields.
 * @param playlistID string
 * @param options { fields: string, market: string }
 * @returns Playlist Information
 */
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
