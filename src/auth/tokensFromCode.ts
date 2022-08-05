import { toBase64 } from '../utils';

/**
 * This accepts a 'code' provided by the Spotify Auth Portal, trades it with
 * Spotify for an 'access_token' and 'refresh_token'. This requires some
 * ENV variables to be set up. Check the documentation for more info.
 * @param code string
 * @returns SpotifyTokens
 */
export const tokensFromCode = async (code: string): Promise<SpotifyTokens> => {
  const response = await fetch(
    'https://accounts.spotify.com/api/token',
    fetchOptions(code)
  );
  if (!response.ok) throw new Error('Error fetching token');

  return (await response.json()) as SpotifyTokens;
};

const fetchOptions = (code: string) => ({
  method: 'POST',
  headers: {
    Authorization: `Basic ${toBase64(
      `${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_SECRET}`
    )}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  body: new URLSearchParams({
    code,
    redirect_uri: process.env.REDIRECT,
    grant_type: 'authorization_code',
  }),
});

export type SpotifyTokens = {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: 3600;
  refresh_token: string;
};
