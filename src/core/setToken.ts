import { QueryConstructor } from './client';

export const setToken: QueryConstructor<boolean> = (token: string) => (tkn) => {
  tkn.current = token;
  return true;
};
