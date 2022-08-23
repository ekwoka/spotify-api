import { describe, expect, it } from 'vitest';
import { PersistentApiProperties, resetCache } from './';

describe('Reset Cache', () => {
  it('should return a function', () => {
    expect(typeof resetCache()).toBe('function');
  });
  it('should remove the specified piece of the cache', () => {
    const Client = {
      cache: { foo: 'bar', fizz: 'buzz' },
    } as unknown as PersistentApiProperties;
    resetCache('foo')(Client);
    expect(Client.cache).toEqual({ fizz: 'buzz' });
  });
  it('should remove all cache if no cacheType is provided', () => {
    const Client = {
      cache: { foo: 'bar', fizz: 'buzz' },
    } as unknown as PersistentApiProperties;
    resetCache()(Client);
    expect(Client.cache).toEqual({
      albums: {},
      saved: {
        albums: {},
        tracks: {},
      },
    });
  });
});
