import { PersistentApiProperties, QueryConstructor } from './';

export const setToken: QueryConstructor =
  (newToken: string) => (Client: PersistentApiProperties) =>
    (Client.token = newToken);
