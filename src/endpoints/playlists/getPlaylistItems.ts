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

    const total = firstPage.total;
    const initialOffset = Number(options.offset) || 0;
    const lastToGet = Math.min(limit + initialOffset, total);
    const pagesToGet = Math.ceil(lastToGet / 100) - 1;
    const pages = await Promise.all(
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

    return {
      ...firstPage,
      items: [...firstPage.items, ...pages.flat()],
      limit,
    };
  };

type GetPlaylistItemsOptions = {
  limit?: string | number;
  market?: string;
  offset?: string | number;
};
