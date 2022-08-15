import { Album } from '../endpoints/albums';

export type PersistentApiProperties = {
  token: string;
  cache: {
    albums?: Record<string, Album>;
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
