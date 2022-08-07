import { QueryFunction } from './types';

export const setToken =
  (newToken: string): QueryFunction =>
  (Client) =>
    (Client.token = newToken);
