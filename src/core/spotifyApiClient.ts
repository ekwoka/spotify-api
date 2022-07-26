import { PersistentApiProperties, SpotifyApiClient, QueryFunction } from './';

export function spotifyApiClient(token: string): SpotifyApiClient {
  if (!token) throw 'Token is required at Spotify API Initialization';

  // properties is a better name? :o
  const properties: PersistentApiProperties = {
    token,
  };

  return <T>(fn: QueryFunction<T>): T => {
    if (!properties.token) throw new Error('Current token is invalid');

    return fn(properties);
  };
}
