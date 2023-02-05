import WeakLRUCache from '@ekwoka/weak-lru-cache';
import { describe, expect, it } from 'vitest';
import { PersistentApiProperties, resetCache } from './';

describe('Reset Cache', () => {
  const testData = { foo: 'bar' };
  it('should return a function', () => {
    expect(typeof resetCache()).toBe('function');
  });
  it('should remove the specified piece of the cache', () => {
    const Client = {
      cache: WeakLRUCache(),
    } as unknown as PersistentApiProperties;
    Client.cache.set('foo', testData);
    expect(Client.cache.get('foo')).toEqual(testData);
    resetCache('foo')(Client);
    expect(Client.cache.get('foo')).toBeUndefined();
  });
  it('should remove all cache if no cacheType is provided', () => {
    const Client = {
      cache: WeakLRUCache(),
    } as unknown as PersistentApiProperties;
    Client.cache.set('albums', testData);
    expect(Client.cache.get('albums')).toEqual(testData);
    resetCache()(Client);
    expect(Client.cache.get('albums')).toBeUndefined();
  });
});
