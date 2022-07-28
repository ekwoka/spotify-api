import { describe, expect, it } from 'vitest';

import { deepFreeze, isBrowser, isNode, toBase64 } from './';

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
});
