import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { AlbumSavedStatus } from '../../core/cacheKeys';
import { albumIsSaved } from './';

describe('albumIsSaved', () => {
  beforeAll(() => {
    makeMock('v1/me/albums/contains?ids=seoul%2Cdrip', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: [true, false],
        };
      },
    }).persist();
    makeMock('v1/me/albums/contains?ids=seoul', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: [true],
        };
      },
    }).persist();
  });
  it('should return a function', () => {
    expect(typeof albumIsSaved('seoul')).toBe('function');
  });
  it('should return true is album is saved (string)', async () => {
    const isSaved = await albumIsSaved('seoul')({
      token: 'token',
      cache: new Map(),
    });
    expect(isSaved).toEqual(true);
  });
  it('should return true is album is saved (array)', async () => {
    const isSaved = await albumIsSaved(['seoul'])({
      token: 'token',
      cache: new Map(),
    });
    expect(isSaved).toEqual([true]);
  });
  it('should work with multiple albums', async () => {
    const isSaved = await albumIsSaved(['seoul', 'drip'])({
      token: 'token',
      cache: new Map(),
    });
    expect(isSaved).toEqual([true, false]);
  });
  it('should batch requests', async () => {
    const isSaved = await Promise.all(
      ['seoul', 'drip'].map((item) =>
        albumIsSaved(item)({
          token: 'token',
          cache: new Map(),
        })
      )
    );
    expect(isSaved).toEqual([true, false]);
  });
  it('should cache requests', async () => {
    const cache = new Map();
    const isSaved = await albumIsSaved('seoul')({
      token: 'token',
      cache,
    });
    const isSaved2 = await albumIsSaved('seoul')({
      token: 'token',
      cache,
    });
    expect(isSaved).toEqual(true);
    expect(isSaved2).toEqual(true);
    expect(cache.get(AlbumSavedStatus)).toEqual({ seoul: true });
  });
});
