import { getAlbums } from '.';
import { QueryFunction } from '../../core';
import { Album } from './types';

export const getAlbum =
  (id: string, market?: string): QueryFunction<Promise<Album>> =>
  async (client) => {
    const { albums } = await getAlbums([id], market)(client);
    return albums[0];
  };
