import WeakLRUCache from '@ekwoka/weak-lru-cache';

export type PersistentApiProperties = {
  token: string;
  cache: ReturnType<typeof WeakLRUCache<object>>;
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
