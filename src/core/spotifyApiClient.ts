import {
  PersistentApiProperties,
  QueryFunction,
  SpotifyApiClient,
  SpotifyApiClientOptions,
} from './types';

export function spotifyApiClient(
  token: string,
  options: SpotifyApiClientOptions = {},
): SpotifyApiClient {
  if (!token)
    throw new TypeError('Token is required at Spotify API Initialization');
  const ApiClient: PersistentApiProperties = {
    token,
    cache: options.cache ?? new Map(),
  };

  return <T>(fn: QueryFunction<T>): T => {
    return fn(ApiClient);
  };
}
