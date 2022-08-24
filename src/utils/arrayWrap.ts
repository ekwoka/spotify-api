import { maybeArray } from './types';

export const arrayWrap = <T>(maybe: maybeArray<T>): T[] => {
  if (Array.isArray(maybe)) return maybe;
  return [maybe];
};
