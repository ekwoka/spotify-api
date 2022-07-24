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
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (e) {
    /**
     * TODO: Decide on Error Handling Method
     * - Expired Token
     * - Bad Network (auto resume?)
     * - Other?
     */
    console.error(e);
    throw e;
  }
};
