import { QueryFunction } from '../../core';
import { arrayWrap, spotifyFetch, toURLString } from '../../utils';
import { QueryType, SearchResults } from './';

export const search = <T extends keyof QueryType>(
  q: string,
  maybeTypeArray: T | T[],
  options: SearchOptions = {}
): QueryFunction<Promise<SearchResults<T>>> => {
  const types = arrayWrap(maybeTypeArray).join(',');
  return async ({ token }) => {
    const endpoint = `search?${toURLString({ q, type: types, ...options })}`;
    const data = await spotifyFetch<SearchResults<T>>(endpoint, token);
    return data;
  };
};

type SearchOptions = Partial<{
  limit: number;
  offset: number;
  market: string;
  include_external: 'audio';
}>;
