export type PersistentApiProperties = {
  token: string;
  cache: { [key: string]: unknown };
};

export type SpotifyApiClient = <T>(fn: QueryFunction<T>) => T;
export type QueryFunction<T> = (props: PersistentApiProperties) => T;
export type QueryConstructor<T = void> = (
  ...args: unknown[]
) => QueryFunction<T>;
