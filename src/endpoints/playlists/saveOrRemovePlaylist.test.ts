import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { savePlaylists, removePlaylists } from '.';

import { PlaylistSavedStatus } from '../../core/cacheKeys';

describe('savePlaylists', () => {
  beforeAll(() => {
    makeMock('v1/playlists/seoul/followers', {
      method: 'PUT',
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
        };
      },
    }).persist();
    makeMock('v1/playlists/drip/followers', {
      method: 'PUT',
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
        };
      },
    }).persist();
  });
  it('should return a function', () => {
    expect(typeof savePlaylists('seoul')).toBe('function');
  });
  it('should save playlists', async () => {
    const wasSaved = await savePlaylists('seoul')({
      token: 'token',
      cache: new Map(),
    });
    expect(wasSaved).toEqual(true);
  });
  it('should accept an array of playlists', async () => {
    const wasSaved = await savePlaylists(['seoul', 'drip'])({
      token: 'token',
      cache: new Map(),
    });
    expect(wasSaved).toEqual([true, true]);
  });
  it('should cache result', async () => {
    const cache = new Map();
    await savePlaylists('seoul')({ token: 'token', cache });
    expect(cache.get(PlaylistSavedStatus)).toEqual({ seoul: true });
  });
});

describe('removePlaylists', () => {
  beforeAll(() => {
    makeMock('v1/playlists/seoul/followers', {
      method: 'DELETE',
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
        };
      },
    }).persist();
    makeMock('v1/playlists/drip/followers', {
      method: 'DELETE',
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
        };
      },
    }).persist();
  });
  it('should return a function', () => {
    expect(typeof removePlaylists('seoul')).toBe('function');
  });
  it('should remove playlists', async () => {
    const wasRemoved = await removePlaylists('seoul')({
      token: 'token',
      cache: new Map(),
    });
    expect(wasRemoved).toEqual(false);
  });
  it('should accept an array of playlists', async () => {
    const wasRemoved = await removePlaylists(['seoul', 'drip'])({
      token: 'token',
      cache: new Map(),
    });
    expect(wasRemoved).toEqual([false, false]);
  });
  it('should cache result', async () => {
    const cache = new Map();
    await removePlaylists('seoul')({ token: 'token', cache });
    expect(cache.get(PlaylistSavedStatus)).toEqual({ seoul: false });
  });
});
