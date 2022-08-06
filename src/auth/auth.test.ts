import { beforeAll, describe, expect, it } from 'vitest';
import { makeMock } from '../../testingTools/makeMock';
import { refreshToken, tokensFromCode } from './';

describe('AUTH Helpers', () => {
  beforeAll(() => {
    makeMock('api/token', {
      method: 'POST',
      handler: ({ body }) => {
        const params = new URLSearchParams(body as string);
        if (params.get('grant_type') === 'authorization_code') {
          return params.get('code') === 'valid'
            ? { statusCode: 200, data: mockedTokens }
            : { statusCode: 401 };
        }
        if (params.get('grant_type') === 'refresh_token') {
          return params.get('refresh_token') === 'valid'
            ? { statusCode: 200, data: mockedRefreshToken }
            : { statusCode: 401 };
        }
        return { statusCode: 401 };
      },
    }).persist();
  });
  describe('refreshToken', () => {
    it('should refresh access token', async () => {
      const tokens = await refreshToken('valid');
      expect(tokens).toHaveProperty('access_token');
      expect(tokens).toHaveProperty('expires_in');
    });
    it('should throw on invalid refresh token', async () => {
      await expect(() => refreshToken('invalid')).rejects.toThrow(
        'Error refreshing token'
      );
    });
  });
  describe('tokensFromCode', () => {
    it('should return tokens when given valid code', async () => {
      const codes = await tokensFromCode('valid');
      expect(codes).toHaveProperty('access_token');
      expect(codes).toHaveProperty('refresh_token');
    });
    it('should throw when given invalid code', async () => {
      await expect(() => tokensFromCode('invalid')).rejects.toThrow(
        'Error fetching token'
      );
    });
  });
});

const mockedTokens = {
  access_token: 'string',
  token_type: 'Bearer',
  scope: 'string',
  expires_in: 3600,
  refresh_token: 'string',
};

const mockedRefreshToken = {
  access_token: 'string',
  token_type: 'Bearer',
  scope: 'string',
  expires_in: 3600,
};
