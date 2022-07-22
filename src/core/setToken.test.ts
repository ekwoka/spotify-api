import { describe, expect, it } from 'vitest';
import { spotifyApi, Token } from './spotifyApi';
import { setToken } from './setToken';

describe('Set Token', () => {
  it('should return a function', () => {
    expect(typeof setToken('')).toBe('function');
  });
  it('should return a function that mutates the token object', () => {
    const setter = setToken('updated');
    const token: Token = { current: 'initial' };
    expect(setter(token)).toBe(true);
    expect(token.current).toBe('updated');
  });
  it('should update token in spotifyApi', () => {
    const Spotify = spotifyApi('initial');
    Spotify(setToken('updated'));
    expect(Spotify((token) => token.current)).toBe('updated');
  });
});
