import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { saveTracks, removeTracks } from '.';

import { TrackSavedStatus } from '../../core/cacheKeys';

describe('saveTracks', () => {
  beforeAll(() => {
    makeMock('v1/me/tracks', {
      method: 'PUT',
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        if (!req.body) return { statusCode: 403 };
        return {
          statusCode: 200,
        };
      },
    }).persist();
  });
  it('should return a function', () => {
    expect(typeof saveTracks('seoul')).toBe('function');
  });
  it('should save tracks', async () => {
    const wasSaved = await saveTracks('seoul')({
      token: 'token',
      cache: new Map(),
    });
    expect(wasSaved).toEqual(true);
  });
  it('should accept an array of tracks', async () => {
    const wasSaved = await saveTracks(['seoul', 'drip'])({
      token: 'token',
      cache: new Map(),
    });
    expect(wasSaved).toEqual([true, true]);
  });
  it('should cache result', async () => {
    const cache = new Map();
    await saveTracks('seoul')({ token: 'token', cache });
    expect(cache.get(TrackSavedStatus)).toEqual({ seoul: true });
  });
});

describe('removeTracks', () => {
  beforeAll(() => {
    makeMock('v1/me/tracks', {
      method: 'DELETE',
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        if (!req.body) return { statusCode: 403 };
        return {
          statusCode: 200,
        };
      },
    }).persist();
  });
  it('should return a function', () => {
    expect(typeof removeTracks('seoul')).toBe('function');
  });
  it('should remove tracks', async () => {
    const wasRemoved = await removeTracks('seoul')({
      token: 'token',
      cache: new Map(),
    });
    expect(wasRemoved).toEqual(false);
  });
  it('should accept an array of tracks', async () => {
    const wasRemoved = await removeTracks(['seoul', 'drip'])({
      token: 'token',
      cache: new Map(),
    });
    expect(wasRemoved).toEqual([false, false]);
  });
  it('should cache result', async () => {
    const cache = new Map();
    await removeTracks('seoul')({ token: 'token', cache });
    expect(cache.get(TrackSavedStatus)).toEqual({ seoul: false });
  });
});
