import { PaginatedList, QueryFunction } from '../../core';
import { spotifyFetch } from '../../utils';
import { Album } from './types';

export const newReleases =
  (): QueryFunction<Promise<NewReleases>> =>
  async ({ token }) => {
    const endpoint = 'browse/new-releases';
    const data = await spotifyFetch<NewReleases>(endpoint, token);
    return data;
  };

type NewReleases = {
  albums: PaginatedList<Album>;
};
