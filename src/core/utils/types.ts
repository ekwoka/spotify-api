export interface PersistentApiProperties {
  token: string;
}

export type QueryableApi = <T>(fn: QueryFunction<T>) => T;
export type QueryFunction<T> = (props: PersistentApiProperties) => T;
export type Query<T = void> = (...args: any) => QueryFunction<T>;
