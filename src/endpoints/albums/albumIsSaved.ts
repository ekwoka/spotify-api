import { PersistentApiProperties, QueryFunction } from '../../core';
import {
  BatchedFunction,
  batchWrap,
  spotifyFetch,
  toURLString,
} from '../../utils';

export const albumIsSaved: AlbumIsSaved = ((
  album: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> => {
  if (Array.isArray(album))
    return (client) =>
      Promise.all(album.map((id) => cacheAlbumIsSaved(client, id)));
  return (client) => cacheAlbumIsSaved(client, album);
}) as AlbumIsSaved;

const cacheAlbumIsSaved = async (
  { token, cache }: PersistentApiProperties,
  album: string
): Promise<boolean> => {
  const subCache = cache.saved.albums;
  if (subCache[album]) return subCache[album];
  const data = await batchAlbumIsSaved(token, album);
  subCache[album] = data;
  return data;
};

type AlbumIsSaved = {
  (albumId: string): QueryFunction<Promise<boolean>>;
  (albumIds: string[]): QueryFunction<Promise<boolean[]>>;
};

const batchAlbumIsSaved: BatchedFunction<boolean> = batchWrap(
  async (token, ids) => {
    const endpoint = `albums/contains?${toURLString({ ids: ids.join(',') })}`;
    const data = await spotifyFetch<boolean[]>(endpoint, token);
    return data;
  }
);
