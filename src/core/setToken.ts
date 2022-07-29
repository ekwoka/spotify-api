import { QueryConstructor } from './';

export const setToken: QueryConstructor = (newToken: string) => (Client) =>
  (Client.token = newToken);
