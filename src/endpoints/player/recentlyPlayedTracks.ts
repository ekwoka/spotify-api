import { Context } from '.';
import { QueryFunction } from '../../core';
import {
  ISOTimeString,
  SpotifyAPIURL,
  UNIXTimeNumber,
  UNIXTimeString,
  spotifyFetch,
  toURLString,
} from '../../utils';
import { Track } from '../tracks';

/**
 * Gets a list of the user's recently played tracks. Results can be filtered
 * by the timestamp at which they were played, or limited to a specific
 * number of results. Includes the context the track was played in.
 * @param options {
 *  limit?: number | string;
 *  after?: number | string;
 *  before?: number | string
 * }
 * @returns RecentlyPlayedTracklist
 */
export const recentlyPlayedTracks =
  (
    options?: RecentlyPlayedOptions,
  ): QueryFunction<Promise<RecentlyPlayedTrackList>> =>
  async ({ token }) => {
    const endpoint = `me/player/recently-played?${toURLString(options)}`;
    const data = await spotifyFetch<RecentlyPlayedTrackList>(endpoint, token);
    return data;
  };

type RecentlyPlayedOptions = {
  after?: UNIXTimeString | UNIXTimeNumber;
  before?: UNIXTimeString | UNIXTimeNumber;
  limit?: number;
};

export type RecentlyPlayedTrackList = {
  items: {
    track: Track;
    played_at: ISOTimeString;
    context: Context;
  }[];
  next: SpotifyAPIURL;
  cursors: {
    after: UNIXTimeString;
    before: UNIXTimeString;
  };
  limit: number;
  href: SpotifyAPIURL;
};
