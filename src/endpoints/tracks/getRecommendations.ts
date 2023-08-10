import { Track } from '.';
import { QueryFunction } from '../../core';
import { SpotifyAPIURL, spotifyFetch, toURLString } from '../../utils';

/**
 * Gets a list of recommended Tracks based on the provided seeds. Accepts up
 * to 5 seeds across Track, Artist, and Genre, as well as many additional
 * filtering options based on track attributes (loudness, energy, etc).
 * @param options Seed and Options Object
 * @returns Recommendations
 */
export const getRecommendations = (
  options: RecomendationOptions,
): QueryFunction<Promise<Recommendations>> => {
  const seeds = Object.entries(options).reduce((acc, [key, value]) => {
    if (!key.includes('seed')) return acc;
    if (Array.isArray(value)) return acc + value.length;
    return acc + 1;
  }, 0);
  if (seeds > 5) throw new Error('Too many seeds provided');
  if (seeds === 0) throw new Error('No seeds provided');
  return ({ token }) => {
    const endpoint = `recommendations?${toURLString(options)}`;
    const data = spotifyFetch<Recommendations>(endpoint, token);
    return data;
  };
};

type RecomendationOptions = {
  seed_artists?: string | string[];
  seed_genres?: string | string[];
  seed_tracks?: string | string[];
  limit?: number;
  market?: string;
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_duration_ms?: number;
  max_duration_ms?: number;
  target_duration_ms?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
};

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
