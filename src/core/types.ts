import { Album } from '../endpoints/albums';
import { Artist } from '../endpoints/artists';

export type PersistentApiProperties = {
  token: string;
  cache: {
    albums: Record<string, Album>;
    artists: Record<string, Artist>;
    saved: {
      albums: Record<string, boolean>;
      playlists: Record<string, boolean>;
      tracks: Record<string, boolean>;
    };
    [key: string]: unknown;
  };
};

export type SpotifyApiClient = <T>(fn: QueryFunction<T>) => T;
export type QueryFunction<T = void> = (props: PersistentApiProperties) => T;

export type PaginatedList<T> = {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type Copyrights = {
  text: string;
  type: string;
}[];
