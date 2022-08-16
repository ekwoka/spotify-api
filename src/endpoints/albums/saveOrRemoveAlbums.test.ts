import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { saveAlbums, removeAlbums } from './';
import { PersistentApiProperties } from '../../core';

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
      cache: { saved: { albums: {} } } as PersistentApiProperties['cache'],
    });
    expect(wasSaved).toEqual(true);
  });
  it('should accept an array of albums', async () => {
    const wasSaved = await saveAlbums(['seoul', 'drip'])({
      token: 'token',
      cache: { saved: { albums: {} } } as PersistentApiProperties['cache'],
    });
    expect(wasSaved).toEqual([true, true]);
  });
  it('should cache result', async () => {
    const cache = { saved: { albums: {} } } as PersistentApiProperties['cache'];
    await saveAlbums('seoul')({ token: 'token', cache });
    expect(cache.saved.albums).toEqual({ seoul: true });
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
      cache: { saved: { albums: {} } } as PersistentApiProperties['cache'],
    });
    expect(wasRemoved).toEqual(true);
  });
  it('should accept an array of albums', async () => {
    const wasRemoved = await removeAlbums(['seoul', 'drip'])({
      token: 'token',
      cache: { saved: { albums: {} } } as PersistentApiProperties['cache'],
    });
    expect(wasRemoved).toEqual([true, true]);
  });
  it('should cache result', async () => {
    const cache = {
      saved: { albums: {} },
    } as PersistentApiProperties['cache'];
    await removeAlbums('seoul')({ token: 'token', cache });
    expect(cache.saved.albums).toEqual({ seoul: false });
  });
});
