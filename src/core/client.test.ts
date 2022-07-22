import { describe, expect, it } from 'vitest';
import { client } from './client';

describe('Client Constructor', () => {
  it('should return a function', () => {
    const spotify = client();
    expect(spotify).toBeDefined();
    expect(typeof spotify).toBe('function');
  });
  it('should store the provided token', () => {
    const spotify = client('token');
    expect(spotify((token) => token.current)).toBe('token');
  });
  it('should throw an error if no token is provided', () => {
    const spotify = client();
    expect(client()).toThrow();
  });
});
