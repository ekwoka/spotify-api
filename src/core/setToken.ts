import { QueryConstructor } from './spotifyApi';

export const setToken: QueryConstructor<boolean> = (token: string) => (tkn) => {
  tkn.current = token;
  return true;
};
