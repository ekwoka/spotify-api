import { SPOTIFY_AUTH } from '../constants';
import { fetchOptions } from './fetchOptions';

/**
 * refreshToken accepts a 'refresh_token' issued by Spotify and returns a new
 * 1hr 'access_token'. This requires specific ENV variables to be defined.
 * Review Auth documentation to see what these variables should contain.
 * @param refreshToken string
 * @returns RefreshedToken
 */
export const refreshToken = async (
  refreshToken: string,
  client: string = process.env.SPOTIFY_CLIENT,
  secret: string = process.env.SPOTIFY_SECRET
): Promise<RefreshedToken> => {
  const response = await fetch(
    SPOTIFY_AUTH,
    fetchOptions(
      {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
      client,
      secret
    )
  );
  if (!response.ok) throw new Error('Error refreshing token');
  return (await response.json()) as RefreshedToken;
};

export type RefreshedToken = {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: 3600;
};
