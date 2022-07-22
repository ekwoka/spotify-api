import { describe, expect, it } from 'vitest';
import { spotifyApi } from './spotifyApi';

describe('spotifyApi Constructor', () => {
  it('should return a function', () => {
    const spotify = spotifyApi();
    expect(spotify).toBeDefined();
    expect(typeof spotify).toBe('function');
  });
  it('should store the provided token', () => {
    const spotify = spotifyApi('token');
    expect(spotify((token) => token.current)).toBe('token');
  });
  it('should throw an error if no token is provided', () => {
    const spotify = spotifyApi();
    expect(spotify).toThrow();
  });
});
