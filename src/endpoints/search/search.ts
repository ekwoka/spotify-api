import { QueryFunction } from '../../core';
import { arrayWrap, spotifyFetch, toURLString } from '../../utils';
import { QueryType, SearchResults } from './';

export const search = <T extends QueryType>(
  q: string,
  maybeTypeArray: T | T[]
): QueryFunction<Promise<SearchResults<T>>> => {
  const types = arrayWrap(maybeTypeArray).join(',');
  return async ({ token }) => {
    const endpoint = `search?${toURLString({ q, type: types })}`;
    const data = await spotifyFetch<SearchResults<T>>(endpoint, token);
    return data;
  };
};
