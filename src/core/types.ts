export type PersistentApiProperties = {
  token: string;
  cache: { [key: string]: unknown };
};

export type SpotifyApiClient = <T>(fn: QueryFunction<T>) => T;
export type QueryFunction<T = void> = (props: PersistentApiProperties) => T;
