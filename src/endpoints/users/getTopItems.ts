import { PaginatedList, QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { Artist } from '../artists/types';
import { Track } from '../tracks/types';

export const getTopItems: GetTopItems =
  (type, options = {}) =>
  async ({ token }) => {
    const endpoint = `me/top/${type}?${toURLString(options)}`;
    const data = await spotifyFetch<PaginatedList<TopItem[typeof type]>>(
      endpoint,
      token
    );
    return data;
  };

type GetTopItems = <T extends keyof TopItem>(
  type: T,
  options?: TopItemOptions
) => QueryFunction<Promise<PaginatedList<TopItem[T]>>>;

type TopItem = {
  tracks: Track;
  artists: Artist;
};

type TopItemOptions = {
  limit?: number;
  offset?: number;
  time_range?: 'long_term' | 'medium_term' | 'short_term';
};
