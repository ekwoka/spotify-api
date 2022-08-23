import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { saveTracks, removeTracks } from '.';
import { PersistentApiProperties } from '../../core';

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
          data: (JSON.parse(req.body as string) as { ids: string[] }).ids.map(
            () => true
          ),
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
      cache: { saved: { tracks: {} } } as PersistentApiProperties['cache'],
    });
    expect(wasSaved).toEqual(true);
  });
  it('should accept an array of tracks', async () => {
    const wasSaved = await saveTracks(['seoul', 'drip'])({
      token: 'token',
      cache: { saved: { tracks: {} } } as PersistentApiProperties['cache'],
    });
    expect(wasSaved).toEqual([true, true]);
  });
  it('should cache result', async () => {
    const cache = { saved: { tracks: {} } } as PersistentApiProperties['cache'];
    await saveTracks('seoul')({ token: 'token', cache });
    expect(cache.saved.tracks).toEqual({ seoul: true });
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
          data: (JSON.parse(req.body as string) as { ids: string[] }).ids.map(
            () => true
          ),
        };
      },
    }).persist();
  });
  it('should return a function', () => {
    expect(typeof removeTracks('seoul')).toBe('function');
  });
  it('should save tracks', async () => {
    const wasRemoved = await removeTracks('seoul')({
      token: 'token',
      cache: { saved: { tracks: {} } } as PersistentApiProperties['cache'],
    });
    expect(wasRemoved).toEqual(true);
  });
  it('should accept an array of tracks', async () => {
    const wasRemoved = await removeTracks(['seoul', 'drip'])({
      token: 'token',
      cache: { saved: { tracks: {} } } as PersistentApiProperties['cache'],
    });
    expect(wasRemoved).toEqual([true, true]);
  });
  it('should cache result', async () => {
    const cache = {
      saved: { tracks: {} },
    } as PersistentApiProperties['cache'];
    await removeTracks('seoul')({ token: 'token', cache });
    expect(cache.saved.tracks).toEqual({ seoul: false });
  });
});
