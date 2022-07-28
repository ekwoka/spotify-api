import 'dotenv/config';
import { beforeAll, describe, expect, it } from 'vitest';
import { refreshToken } from '../../../auth';
import { spotifyApiClient } from '../../spotifyApiClient';
import { getCurrentUser } from './getCurrentUser';

describe('Get Current User', () => {
  let token: string;
  beforeAll(async () => {
    const refresh = process.env.REFRESH_TOKEN as string;
    token = (await refreshToken(refresh)).access_token;
  });
  it('should return Current User', async () => {
    const spotify = spotifyApiClient(token);
    const user = await spotify(getCurrentUser());
    expect(user.email).toBeDefined();
  });
  it('should cache user and return it from cache', async () => {
    const spotify = spotifyApiClient(token);
    const user = await spotify(getCurrentUser());
    expect(await spotify(getCurrentUser())).toBe(user);
  });
});
