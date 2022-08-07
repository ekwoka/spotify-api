import { QueryConstructor } from '../../core';
import { spotifyFetch } from '../../utils';
import { Track } from '../tracks/types';

export const getTopItems: QueryConstructor<
  Promise<TopItems<TopItem[keyof TopItem]>>
> =
  <T extends keyof TopItem>(type: keyof TopItem) =>
  async ({ token }): Promise<TopItems<TopItem[T]>> => {
    const endpoint = `me/top/${type}`;
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
  artists: Track;
};
