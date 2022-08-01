import 'dotenv/config';
import { beforeAll, describe, expect, it } from 'vitest';
import { refreshToken } from '../auth';
import { spotifyFetch } from './spotifyFetch';

describe('spotifyFetch', () => {
  let token: string;
  beforeAll(async () => {
    const refresh = process.env.REFRESH_TOKEN as string;
    token = (await refreshToken(refresh)).access_token;
  });
  it('should perform the fetch with token', async () => {
    const user = await spotifyFetch<{ email: string }>('me', token);
    expect(user.email).toBeDefined();
  });
  it('should throw on invalid endpoint', async () => {
    await expect(() => spotifyFetch('invalid', token)).rejects.toThrow(
      'Not Found'
    );
  });
  it('should throw on invalid token', async () => {
    await expect(() => spotifyFetch('me', 'invalid')).rejects.toThrow(
      'Token Expired'
    );
  });
});
