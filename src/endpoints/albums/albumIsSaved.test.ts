import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { PersistentApiProperties } from '../../core';
import { albumIsSaved } from './';

describe('albumIsSaved', () => {
  beforeAll(() => {
    makeMock('v1/albums/contains?ids=seoul%2Cdrip', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: [true, false],
        };
      },
    }).persist();
    makeMock('v1/albums/contains?ids=seoul', {
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
      cache: { saved: { albums: {} } } as PersistentApiProperties['cache'],
    });
    expect(isSaved).toEqual(true);
  });
  it('should return true is album is saved (array)', async () => {
    const isSaved = await albumIsSaved(['seoul'])({
      token: 'token',
      cache: { saved: { albums: {} } } as PersistentApiProperties['cache'],
    });
    expect(isSaved).toEqual([true]);
  });
  it('should work with multiple albums', async () => {
    const isSaved = await albumIsSaved(['seoul', 'drip'])({
      token: 'token',
      cache: { saved: { albums: {} } } as PersistentApiProperties['cache'],
    });
    expect(isSaved).toEqual([true, false]);
  });
  it('should batch requests', async () => {
    const isSaved = await Promise.all(
      ['seoul', 'drip'].map((item) =>
        albumIsSaved(item)({
          token: 'token',
          cache: { saved: { albums: {} } } as PersistentApiProperties['cache'],
        })
      )
    );
    expect(isSaved).toEqual([true, false]);
  });
  it('should cache requests', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cache = { saved: { albums: {} } } as PersistentApiProperties['cache'];
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
    expect(cache.saved.albums).toEqual({ seoul: true });
  });
});
