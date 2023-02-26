export type PersistentApiProperties = {
  token: string;
  cache: limitedMap;
};

export type SpotifyApiClientOptions = {
  cache?: limitedMap;
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

export type limitedMap = Pick<
  Map<string, object>,
  'get' | 'set' | 'delete' | 'clear'
>;

export type Copyrights = {
  text: string;
  type: string;
}[];
