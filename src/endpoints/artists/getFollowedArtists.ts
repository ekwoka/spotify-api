import { QueryFunction } from '../../core';
import { ArtistSavedStatus } from '../../core/cacheKeys';
import {
  SpotifyAPIURL,
  deepFreeze,
  spotifyFetch,
  toURLString,
} from '../../utils';
import { ArtistStub } from './types';

export const getFollowedArtists =
  (
    type: 'artist' = 'artist',
    options: {
      limit?: number;
      after?: string;
    } = {},
  ): QueryFunction<Promise<FollowedArtists>> =>
  async ({ token, cache }) => {
    const endpoint = `me/following?type=${type}&${toURLString(options)}`;
    const cached = cache.get(endpoint);
    if (cached) return cached as FollowedArtists;
    const followedArtists = await spotifyFetch<FollowedArtists>(
      endpoint,
      token,
    );
    cache.set(endpoint, deepFreeze(followedArtists));
    cache.set(
      ArtistSavedStatus,
      followedArtists.artists.items.reduce(
        (acc, { id }) => ((acc[id] = true), acc),
        cache.get(ArtistSavedStatus) ?? {},
      ),
    );
    return followedArtists;
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
