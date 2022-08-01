import { SPOTIFY_URL } from '../constants';

/**
 * TODO: Add Tests
 */

/**
 * Wrapper for fetching data from Spotify's API Endpoints with sensible and
 * consistent error handling for the common application failure points.
 * TODO: Decide on auto-resume implementation and invalid token.
 * @param endpoint string
 * @param token string
 * @param data object
 * @returns Generic Type
 */
export const spotifyFetch = async <T>(
  endpoint: string,
  token: string,
  data = {}
): Promise<T> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`${SPOTIFY_URL}/${endpoint}`, {
      headers,
      ...data,
    });
    if (!response.ok) throw new Error(response.status.toString());
    return await response.json();
  } catch (e) {
    /**
     * Spotify API Error Handling
     * 401: Bad of Expired Token. Should reauthenticate.
     * 403: Forbidden. Fatal Error.
     * 404: Not Found. Internal Error.
     * 429: Too Many Requests. Should wait and reattempt.
     */
    if (e.message === '401') throw new Error('Token Expired');
    if (e.message === '403') throw new Error('Forbidden');
    if (e.message === '404') throw new Error('Not Found');
    if (e.message === '429')
      return new Promise((res) =>
        setTimeout(() => res(spotifyFetch(endpoint, token, data)), 200)
      );
    throw e;
  }
};
