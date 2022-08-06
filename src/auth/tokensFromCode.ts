import { SPOTIFY_AUTH } from '../constants';
import { fetchOptions } from './fetchOptions';

/**
 * This accepts a 'code' provided by the Spotify Auth Portal, trades it with
 * Spotify for an 'access_token' and 'refresh_token'. This requires some
 * ENV variables to be set up. Check the documentation for more info.
 * @param code string
 * @returns SpotifyTokens
 */
export const tokensFromCode = async (code: string): Promise<SpotifyTokens> => {
  const response = await fetch(
    SPOTIFY_AUTH,
    fetchOptions({
      code,
      redirect_uri: process.env.REDIRECT,
      grant_type: 'authorization_code',
    })
  );
  if (!response.ok) throw new Error('Error fetching token');

  return (await response.json()) as SpotifyTokens;
};

export type SpotifyTokens = {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: 3600;
  refresh_token: string;
};
