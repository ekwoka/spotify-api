import { describe, expect, it, vi } from 'vitest';

import {
  deepFreeze,
  isBrowser,
  isNode,
  toBase64,
  sleep,
  toURLString,
  debounce,
  chunkArray,
  arrayWrap,
} from '.';

describe('Utils', () => {
  it('should deep freeze', () => {
    const testObj = {
      foo: 'bar',
      baz: {
        qux: 'quux',
      },
    };
    const compareObj = JSON.parse(JSON.stringify(testObj));
    expect(deepFreeze(testObj)).toBe(testObj);
    expect(() => (testObj.foo = 'baz')).toThrow();
    expect(() => (testObj.baz.qux = 'corge')).toThrow();
    expect(testObj).toEqual(compareObj);
  });
  it('detects when in node or browser', () => {
    expect(isNode()).toBe(true);
    expect(isBrowser()).toBe(false);
  });
  it('encodes string to base64', () => {
    expect(toBase64('test')).toBe('dGVzdA==');
  });
  it('sleeps', async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThan(98);
  });
  it('creates URL string from object', () => {
    expect(
      toURLString({
        foo: 1,
        baz: 'qux',
      })
    ).toBe('foo=1&baz=qux');
  });
  it('debounces', async () => {
    const spy = vi.fn().mockImplementation(() => null);
    const debounced = debounce(spy, 10);
    expect(debounced).toBeInstanceOf(Function);
    debounced();
    debounced();
    debounced();
    await sleep(20);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('chunks an array into designated size', () => {
    expect(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10],
    ]);
  });
  it('wraps non-array in an array', () => {
    expect(arrayWrap(1)).toEqual([1]);
    expect(arrayWrap([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
