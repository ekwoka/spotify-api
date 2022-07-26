import { toBase64 } from '../utils';

export const refreshToken = async (
  refreshToken: string
): Promise<RefreshedToken> => {
  try {
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      fetchOptions(refreshToken)
    );
    if (!response.ok) throw 'Error fetching token';
    return (await response.json()) as RefreshedToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchOptions = (refreshToken: string) => ({
  method: 'POST',
  headers: {
    Authorization: `Basic ${toBase64(
      `${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_SECRET}`
    )}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  body: new URLSearchParams({
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  }),
});

type RefreshedToken = {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: 3600;
};
