import {
  PersistentApiProperties,
  SpotifyApiClient,
  QueryFunction,
} from './types';

export function spotifyApiClient(token: string): SpotifyApiClient {
  if (!token)
    throw new TypeError('Token is required at Spotify API Initialization');
  const ApiClient: PersistentApiProperties = {
    token,
    cache: {},
  };

  return <T>(fn: QueryFunction<T>): T => {
    return fn(ApiClient);
  };
}
