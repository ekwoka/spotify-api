import { PaginatedList, QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';
import { PlaylistItem } from './types';

export const getPlaylistItems =
  (
    playlistID: string,
    options: GetPlaylistItemsOptions = {}
  ): QueryFunction<Promise<PaginatedList<PlaylistItem>>> =>
  async ({ token }) => {
    const makeEndpoint = (options: GetPlaylistItemsOptions) =>
      `playlists/${playlistID}/tracks?${toURLString(options)}`;

    const endpoint = makeEndpoint({
      ...options,
      ...(options.limit ? { limit: Math.min(Number(options.limit), 100) } : {}),
    });
    const firstPage = await spotifyFetch<PaginatedList<PlaylistItem>>(
      endpoint,
      token
    );
    const limit = Number(options.limit) || 100;
    if (!(limit > 100) || firstPage.items.length < 100) return firstPage;

    const pages = await getRemainingPages(
      limit,
      Number(options.offset) || 0,
      firstPage.total,
      options,
      token,
      makeEndpoint
    );

    return {
      ...firstPage,
      items: [...firstPage.items, ...pages.flat()],
      limit,
    };
  };

const getRemainingPages = <T extends Partial<Record<keyof T, T[keyof T]>>>(
  fullLimit: number,
  initialOffset: number,
  totalItems: number,
  options: T,
  token: string,
  makeEndpoint: (options: T) => string
) => {
  const lastToGet = Math.min(fullLimit + initialOffset, totalItems);
  const pagesToGet = Math.ceil(lastToGet / 100) - 1;
  return Promise.all(
    Array.from({ length: pagesToGet }, async (_, i) => {
      const offset = 100 * (i + 1) + initialOffset;
      const limit = Math.min(100, lastToGet - offset);
      const page = await spotifyFetch<PaginatedList<PlaylistItem>>(
        makeEndpoint({ ...options, offset, limit }),
        token
      );
      return page.items;
    })
  );
};

type GetPlaylistItemsOptions = {
  limit?: string | number;
  market?: string;
  offset?: string | number;
};
