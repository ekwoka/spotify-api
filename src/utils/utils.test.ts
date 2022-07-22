import { describe, expect, it } from 'vitest';

import { deepFreeze } from './';

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
});
