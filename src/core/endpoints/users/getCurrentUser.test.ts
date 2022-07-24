import { describe, expect, it } from 'vitest';
import { spotifyApiClient } from '../../spotifyApiClient';
import { getCurrentUser } from './getCurrentUser';

const token = 'bad_token'; // 1hr token just for testing, will replace with refresh token in .env in the future

describe('Get Current User', () => {
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
