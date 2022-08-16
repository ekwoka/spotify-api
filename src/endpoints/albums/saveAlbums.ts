import { PersistentApiProperties, QueryFunction } from '../../core';
import { BatchedFunction, batchWrap, spotifyFetch } from '../../utils';

export const saveAlbums: SaveAlbums = ((
  ids: string | string[]
): QueryFunction<Promise<boolean>> | QueryFunction<Promise<boolean[]>> => {
  if (Array.isArray(ids))
    return (client) =>
      Promise.all(ids.map((id) => cacheSavedAlbums(client, id)));
  return (client) => cacheSavedAlbums(client, ids);
}) as SaveAlbums;

const cacheSavedAlbums = async (
  { token, cache }: PersistentApiProperties,
  album: string
): Promise<boolean> => {
  const data = await batchSaveAlbums(token, album);
  cache.saved.albums[album] = true;
  return data;
};

const batchSaveAlbums: BatchedFunction<boolean> = batchWrap(
  async (token, ids) => {
    const endpoint = `me/albums`;
    const data = await spotifyFetch<boolean[]>(endpoint, token, {
      method: 'PUT',
      body: JSON.stringify({ ids }),
    });
    return data;
  }
);

type SaveAlbums = {
  (albumId: string): QueryFunction<Promise<boolean>>;
  (albumIds: string[]): QueryFunction<Promise<boolean[]>>;
};
