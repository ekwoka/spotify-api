import { describe, expect, it } from 'vitest';

import { createMapper } from './createMapper';

describe('mapRequests', () => {
  it('should return a function that returns a function', () => {
    const mapMaker = createMapper((val: number, _) => Promise.resolve(val + 1));
    expect(typeof mapMaker).toBe('function');
    const singleMapper = mapMaker(1);
    expect(typeof singleMapper).toBe('function');
    const multiMapper = mapMaker([1, 2, 3]);
    expect(typeof multiMapper).toBe('function');
  });
  it('should map requests', () => {
    const mapMaker = createMapper((val: number, _) => Promise.resolve(val + 1));
    const singleMapper = mapMaker(1);
    const multiMapper = mapMaker([1, 2, 3]);
    expect(singleMapper({} as any)).resolves.toEqual(2);
    expect(multiMapper({} as any)).resolves.toEqual([2, 3, 4]);
  });
});
