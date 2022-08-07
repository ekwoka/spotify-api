import { QueryConstructor } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { Artist } from '../artists/types';
import { Track } from '../tracks/types';

export const getTopItems: QueryConstructor<
  Promise<TopItems<TopItem[keyof TopItem]>>
> =
  <T extends keyof TopItem>(
    type: keyof TopItem,
    options: TopItemOptions = {}
  ) =>
  async ({ token }): Promise<TopItems<TopItem[T]>> => {
    const endpoint = `me/top/${type}?${toURLString(options)}`;
    const data = await spotifyFetch<TopItems<TopItem[T]>>(endpoint, token);
    return data;
  };

type TopItems<T> = {
  href: 'string';
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};

type TopItem = {
  tracks: Track;
  artists: Artist;
};

type TopItemOptions = {
  limit?: number;
  offset?: number;
  time_range?: 'long_term' | 'medium_term' | 'short_term';
};
