import { beforeAll, describe, expect, it } from 'vitest';

import { trackIsSaved } from '.';
import { hasToken, makeMock } from '../../../testingTools';
import { TrackSavedStatus } from '../../core/cacheKeys';

describe('trackIsSaved', () => {
  beforeAll(() => {
    makeMock('v1/me/tracks/contains?ids=pink%2Bvenom%2Cbubble%2Bpop', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: [true, false],
        };
      },
    }).persist();
    makeMock('v1/me/tracks/contains?ids=pink%2Bvenom', {
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
    expect(typeof trackIsSaved('pink+venom')).toBe('function');
  });
  it('should return true is track is saved (string)', async () => {
    const isSaved = await trackIsSaved('pink+venom')({
      token: 'token',
      cache: new Map(),
    });
    expect(isSaved).toEqual(true);
  });
  it('should return true is track is saved (array)', async () => {
    const isSaved = await trackIsSaved(['pink+venom'])({
      token: 'token',
      cache: new Map(),
    });
    expect(isSaved).toEqual([true]);
  });
  it('should work with multiple tracks', async () => {
    const isSaved = await trackIsSaved(['pink+venom', 'bubble+pop'])({
      token: 'token',
      cache: new Map(),
    });
    expect(isSaved).toEqual([true, false]);
  });
  it('should batch requests', async () => {
    const isSaved = await Promise.all(
      ['pink+venom', 'bubble+pop'].map((item) =>
        trackIsSaved(item)({
          token: 'token',
          cache: new Map(),
        }),
      ),
    );
    expect(isSaved).toEqual([true, false]);
  });
  it('should cache requests', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cache = new Map();
    const isSaved = await trackIsSaved('pink+venom')({
      token: 'token',
      cache,
    });
    const isSaved2 = await trackIsSaved('pink+venom')({
      token: 'token',
      cache,
    });
    expect(isSaved).toEqual(true);
    expect(isSaved2).toEqual(true);
    expect(cache.get(TrackSavedStatus)).toEqual({ 'pink+venom': true });
  });
});
