import { PaginatedList, QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { Album } from './types';

export const newReleases =
  (options: Options = {}): QueryFunction<Promise<NewReleases>> =>
  async ({ token }) => {
    const endpoint = `browse/new-releases?${toURLString(options)}`;
    const data = await spotifyFetch<NewReleases>(endpoint, token);
    return data;
  };

type NewReleases = {
  albums: PaginatedList<Album>;
};

type Options = {
  limit?: number;
  offset?: number;
  country?: string;
};
