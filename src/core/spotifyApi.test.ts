import { describe, expect, it } from 'vitest';
import { spotifyApi } from './spotifyApi';

describe('spotifyApi Constructor', () => {
  it('should return a function', () => {
    const spotify = spotifyApi('token');
    expect(spotify).toBeDefined();
    expect(typeof spotify).toBe('function');
  });

  it('should store the provided token', () => {
    const spotify = spotifyApi('token');
    expect(spotify((props) => props.token)).toBe('token');
  });
});
