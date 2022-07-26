import { PersistentApiProperties, QueryConstructor } from './';

export const setToken: QueryConstructor<string> =
  (newToken: string) => (Client: PersistentApiProperties) =>
    (Client.token = newToken);
