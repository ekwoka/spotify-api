import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import { makeMock } from '../../testingTools/makeMock';
import { spotifyFetch } from './spotifyFetch';

describe('spotifyFetch', () => {
  it('should perform the fetch with token', async () => {
    makeMock('v1/me', { statusCode: 200, data: { email: 'string' } });
    const user = await spotifyFetch<{ email: string }>('me', 'token');
    expect(user.email).toBeDefined();
  });
  it('should throw on invalid endpoint', async () => {
    makeMock('v1/me', { statusCode: 404 });
    await expect(() => spotifyFetch('me', 'token')).rejects.toThrow(
      'Not Found'
    );
  });
  it('should throw on invalid token', async () => {
    makeMock('v1/me', { statusCode: 401 });
    await expect(() => spotifyFetch('me', 'invalid')).rejects.toThrow(
      'Token Expired'
    );
  });
  it('should throw when request is forbidden', async () => {
    makeMock('v1/me', { statusCode: 403 });
    await expect(() => spotifyFetch('me', 'token')).rejects.toThrow(
      'Forbidden'
    );
  });
  it('should delay and retry when rate limited', async () => {
    makeMock('v1/me', { statusCode: 429 });
    setTimeout(() => makeMock('v1/me', { data: { email: 'string' } }), 0);
    const user = await spotifyFetch<{ email: string }>('me', 'token');
    expect(user.email).toBeDefined();
  });
});
