import { QueryFunction } from '../../core';
import { SpotifyAPIURL, spotifyFetch, toURLString } from '../../utils';
import { ArtistStub } from './types';

export const getFollowedArtists =
  (
    type: 'artist' = 'artist',
    options: {
      limit?: number;
      after?: string;
    } = {}
  ): QueryFunction<Promise<FollowedArtists>> =>
  ({ token }) => {
    const endpoint = `me/following?type=${type}&${toURLString(options)}`;
    return spotifyFetch(endpoint, token);
  };

type FollowedArtists = {
  artists: {
    items: ArtistStub[];
    next: SpotifyAPIURL;
    total: number;
    cursors: {
      after: string;
    };
    limit: number;
    href: SpotifyAPIURL;
  };
};
