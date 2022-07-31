import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import { refreshToken, tokensFromCode } from './';

describe('AUTH Helpers', () => {
  it('should refresh access token', async () => {
    const refresh = process.env.REFRESH_TOKEN as string;
    expect(refresh).toBeDefined();
    const tokens = await refreshToken(refresh);
    expect(tokens).toHaveProperty('access_token');
    expect(tokens).toHaveProperty('expires_in');
  });
  it('should throw on invalid refresh token', async () => {
    await expect(() => refreshToken('invalid')).rejects.toThrow();
  });
  /* MYSTERY: How do we do a test of a valid code when codes easily expire? */
  it('should throw when given invalid code', async () => {
    await expect(() => tokensFromCode('invalid')).rejects.toThrow();
  });
});
