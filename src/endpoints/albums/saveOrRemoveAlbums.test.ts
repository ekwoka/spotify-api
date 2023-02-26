import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { saveAlbums, removeAlbums } from './';

import { AlbumSavedStatus } from '../../core/cacheKeys';

describe('saveAlbums', () => {
  beforeAll(() => {
    makeMock('v1/me/albums', {
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
    expect(typeof saveAlbums('seoul')).toBe('function');
  });
  it('should save albums', async () => {
    const wasSaved = await saveAlbums('seoul')({
      token: 'token',
      cache: new Map(),
    });
    expect(wasSaved).toEqual(true);
  });
  it('should accept an array of albums', async () => {
    const wasSaved = await saveAlbums(['seoul', 'drip'])({
      token: 'token',
      cache: new Map(),
    });
    expect(wasSaved).toEqual([true, true]);
  });
  it('should cache result', async () => {
    const cache = new Map();
    await saveAlbums('seoul')({ token: 'token', cache });
    expect(cache.get(AlbumSavedStatus)).toEqual({ seoul: true });
    await saveAlbums(['seoul', 'drip'])({ token: 'token', cache });
    expect(cache.get(AlbumSavedStatus)).toEqual({ seoul: true, drip: true });
  });
});

describe('removeAlbums', () => {
  beforeAll(() => {
    makeMock('v1/me/albums', {
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
    expect(typeof removeAlbums('seoul')).toBe('function');
  });
  it('should save albums', async () => {
    const wasRemoved = await removeAlbums('seoul')({
      token: 'token',
      cache: new Map(),
    });
    expect(wasRemoved).toEqual(true);
  });
  it('should accept an array of albums', async () => {
    const wasRemoved = await removeAlbums(['seoul', 'drip'])({
      token: 'token',
      cache: new Map(),
    });
    expect(wasRemoved).toEqual([true, true]);
  });
  it('should cache result', async () => {
    const cache = new Map();
    await removeAlbums('seoul')({ token: 'token', cache });
    expect(cache.get(AlbumSavedStatus)).toEqual({ seoul: false });
    await removeAlbums(['seoul', 'drip'])({ token: 'token', cache });
    expect(cache.get(AlbumSavedStatus)).toEqual({ seoul: false, drip: false });
  });
});
