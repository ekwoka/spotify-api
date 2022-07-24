import {
  PersistentApiProperties,
  SpotifyApiClient,
  QueryFunction,
} from './types';

export function spotifyApiClient(token: string): SpotifyApiClient {
  if (!token) throw 'Token is required at Spotify API Initialization';
  const ApiClient: PersistentApiProperties = {
    token,
  };

  return <T>(fn: QueryFunction<T>): T => {
    if (!ApiClient.token) throw new Error('Current token is invalid');

    return fn(ApiClient);
  };
}
