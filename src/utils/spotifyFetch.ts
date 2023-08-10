import { SPOTIFY_URL } from '../constants';

/**
 * Wrapper for fetching data from Spotify's API Endpoints with sensible and
 * consistent error handling for the common application failure points.
 * When rate limited, the request is delayed and reattempted.
 * @param endpoint string
 * @param token string
 * @param data object
 * @returns Generic Type
 */
export const spotifyFetch = async <T>(
  endpoint: string,
  token: string,
  data: Record<string, unknown> = {},
  hasReturn = true,
): Promise<T> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`${SPOTIFY_URL}/${endpoint}`, {
      headers,
      ...data,
    });
    if (!response.ok)
      throw new Error(response.status.toString(), { cause: response });
    if (!hasReturn || response.status === 204) return null;
    return await response.json();
  } catch (e) {
    /**
     * Spotify API Error Handling
     * 401: Bad or Expired Token. Should reauthenticate.
     * 403: Forbidden. Fatal Error.
     * 404: Not Found. Internal Error.
     * 429: Too Many Requests. Should wait and reattempt.
     */
    const { message, cause } = e as { message: string; cause: Response };
    if (message === '401') throw new Error('Token Expired');
    if (message === '403') throw new Error('Forbidden');
    if (message === '404') throw new Error('Not Found');
    if (message === '429')
      return new Promise((res) =>
        setTimeout(
          () => res(spotifyFetch(endpoint, token, data, hasReturn)),
          Number(cause.headers.get('Retry-After')) || 200,
        ),
      );
    throw e;
  }
};
