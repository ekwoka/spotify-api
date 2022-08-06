import { toBase64 } from '../utils';

export const fetchOptions = (data: Record<string, string>) => ({
  method: 'POST',
  headers: {
    Authorization: `Basic ${toBase64(
      `${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_SECRET}`
    )}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  body: new URLSearchParams(data),
});
