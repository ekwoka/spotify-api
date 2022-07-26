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
export const spotifyFetch = <T>(
  endpoint: string,
  token: string,
  data = {}
): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${SPOTIFY_URL}/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
        ...data,
      });

      if (response.ok) return resolve(await response.json());
      throw new Error(response.statusText);
    } catch (e) {
      /**
       * TODO: Decide on Error Handling Method
       * - Expired Token
       * - Bad Network (auto resume?)
       * - Other?
       */
      console.error(e);
      reject(e);
    }
  });
};
