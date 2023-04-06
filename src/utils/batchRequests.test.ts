import { describe, expect, it, vi } from 'vitest';

import { batchWrap } from './';

describe('batchRequests', () => {
  const testCallback = (token: string, input: string[]): Promise<string[]> =>
    Promise.all(input.map((x) => x + token));
  it('returns a function', () => {
    expect(batchWrap(testCallback));
  });
  it('passes data through', async () => {
    const batch = batchWrap(testCallback);
    const result = await batch('token', 'a');
    expect(result).toEqual('atoken');
  });
  it('handles multiple calls', async () => {
    const batch = batchWrap(testCallback);
    const results = await Promise.all(['a', 'b'].map((x) => batch('token', x)));
    expect(results).toEqual(['atoken', 'btoken']);
  });
  it('batches requests', async () => {
    const spy = vi.fn(testCallback);
    const batch = batchWrap(spy);
    const results = await Promise.all(['a', 'b'].map((x) => batch('token', x)));
    expect(results).toEqual(['atoken', 'btoken']);
    expect(spy).toHaveBeenCalledOnce();
  });
  it('rejects if the callback throws', async () => {
    const batch = batchWrap(() => {
      throw new Error('test');
    });
    await expect(batch('token', 'a')).rejects.toThrow('test');
  });
});
