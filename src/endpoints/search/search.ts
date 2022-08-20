import { QueryFunction } from '../../core';
import { arrayWrap, spotifyFetch, toURLString } from '../../utils';
import { QueryType, SearchResults } from './';

/**
 * Searches Spotifies library for matching resources, from tracks and albums
 * to episodes and shows. This can accept a multitude of extra options to
 * allow for more specific filtering and refinement of search results.
 * @param q string - the search query
 * @param maybeTypeArray string | string[] - the type of search to perform, can be an array of types
 * @param options object - the options to pass to the search
 * @returns object containing paginated search results
 */
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
