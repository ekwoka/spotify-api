import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { makeMock } from '../../testingTools/makeMock';
import { refreshToken, tokensFromCode, makeAuthURL } from './';

describe('AUTH Helpers', () => {
  beforeAll(() => {
    makeMock('api/token', {
      method: 'POST',
      handler: ({ body, headers }) => {
        const params = new URLSearchParams(body as string);
        if (headers[1] !== 'Basic dmFsaWQtY2xpZW50OnN1cGVyc2VjcmV0')
          return { statusCode: 401 };
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
  beforeEach(() => {
    process.env.REDIRECT = undefined;
    process.env.SPOTIFY_CLIENT = undefined;
    process.env.SPOTIFY_SECRET = undefined;
  });
  describe('makeAuthURL', () => {
    it('should create auth url from env variables', () => {
      process.env.REDIRECT = 'http://localhost:3000/';
      process.env.SPOTIFY_CLIENT = 'valid-client';
      process.env.SPOTIFY_SECRET = 'supersecret';
      const authURL = makeAuthURL([
        'streaming',
        'user-read-email',
        'user-read-private',
      ]);
      expect(authURL).toBe(
        'https://accounts.spotify.com/authorize?response_type=code&client_id=valid-client&scope=streaming+user-read-email+user-read-private&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F'
      );
    });
    it('should create auth url from passed in variables', () => {
      const authURL = makeAuthURL(
        ['streaming', 'user-read-email', 'user-read-private'],
        'valid-client',
        'http://localhost:3000/'
      );
      expect(authURL).toBe(
        'https://accounts.spotify.com/authorize?response_type=code&client_id=valid-client&scope=streaming+user-read-email+user-read-private&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F'
      );
    });
  });
  describe('refreshToken', () => {
    it('should refresh access token from env variables', async () => {
      process.env.REDIRECT = 'http://localhost:3000/';
      process.env.SPOTIFY_CLIENT = 'valid-client';
      process.env.SPOTIFY_SECRET = 'supersecret';
      const tokens = await refreshToken('valid');
      expect(tokens).toHaveProperty('access_token');
      expect(tokens).toHaveProperty('expires_in');
    });
    it('should refresh access token from passed-in variables', async () => {
      const tokens = await refreshToken('valid', 'valid-client', 'supersecret');
      expect(tokens).toHaveProperty('access_token');
      expect(tokens).toHaveProperty('expires_in');
    });
    it('should throw on invalid refresh token', async () => {
      process.env.REDIRECT = 'http://localhost:3000/';
      process.env.SPOTIFY_CLIENT = 'valid-client';
      process.env.SPOTIFY_SECRET = 'supersecret';
      await expect(() => refreshToken('invalid')).rejects.toThrow(
        'Error refreshing token'
      );
    });
  });
  describe('tokensFromCode', () => {
    it('should return tokens when given valid code from env variable', async () => {
      process.env.REDIRECT = 'http://localhost:3000/';
      process.env.SPOTIFY_CLIENT = 'valid-client';
      process.env.SPOTIFY_SECRET = 'supersecret';
      const codes = await tokensFromCode('valid');
      expect(codes).toHaveProperty('access_token');
      expect(codes).toHaveProperty('refresh_token');
    });
    it('should return tokens when given valid code from env variable', async () => {
      const codes = await tokensFromCode(
        'valid',
        'valid-client',
        'supersecret'
      );
      expect(codes).toHaveProperty('access_token');
      expect(codes).toHaveProperty('refresh_token');
    });
    it('should throw when given invalid code', async () => {
      process.env.REDIRECT = 'http://localhost:3000/';
      process.env.SPOTIFY_CLIENT = 'valid-client';
      process.env.SPOTIFY_SECRET = 'supersecret';
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
