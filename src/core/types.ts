export interface PersistentApiProperties {
  token: string;
}

export type SpotifyApiClient = <T>(fn: QueryFunction<T>) => T;
export type QueryFunction<T> = (props: PersistentApiProperties) => T;
export type QueryConstructor<T = void> = (
  ...args: unknown[]
) => QueryFunction<T>;
