import { describe, expect, it } from 'vitest';
import { spotifyApiClient } from './spotifyApiClient';

describe('spotifyApiClient Constructor', () => {
  it('should return a function', () => {
    const spotify = spotifyApiClient('token');
    expect(spotify).toBeDefined();
    expect(typeof spotify).toBe('function');
  });

  it('should store the provided token', () => {
    const spotify = spotifyApiClient('token');
    expect(spotify((props) => props.token)).toBe('token');
  });

  it('should throw when no token is provided', () => {
    expect(spotifyApiClient).toThrow(
      'Token is required at Spotify API Initialization'
    );
  });
});
