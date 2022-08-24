import { Track } from '.';
import { QueryFunction } from '../../core';
import { SpotifyAPIURL, spotifyFetch, toURLString } from '../../utils';

export const getRecommendations =
  (options?: RecomendationOptions): QueryFunction<Promise<Recommendations>> =>
  ({ token }) => {
    const endpoint = `recommendations?${toURLString(options)}`;
    const data = spotifyFetch<Recommendations>(endpoint, token);
    return data;
  };

type RecomendationOptions = Record<string, any>;

export type Recommendations = {
  seeds: Seed[];
  tracks: Track[];
};

type Seed = {
  initialPoolSize: number;
  afterFilteringSize: number;
  afterRelinkingSize: number;
  id: string;
  type: 'ARTIST' | 'TRACK' | 'GENRE';
  href: SpotifyAPIURL;
};
