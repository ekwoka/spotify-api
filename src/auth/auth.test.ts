import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import { refreshToken } from './';

describe('AUTH Helpers', () => {
  it('should refresh access token', async () => {
    const refresh = process.env.REFRESH_TOKEN as string;
    expect(refresh).toBeDefined();
    const tokens = await refreshToken(refresh);
    expect(tokens).toHaveProperty('access_token');
    expect(tokens).toHaveProperty('expires_in');
  });
});
