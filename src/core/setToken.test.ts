import { describe, expect, it } from 'vitest';
import { spotifyApi } from './spotifyApi';
import { setToken } from './setToken';
import { PersistentApiProperties } from './utils/types';

describe('Set Token', () => {
  it('should return a function', () => {
    expect(typeof setToken('')).toBe('function');
  });
  it('should return a function that mutates the token object', () => {
    const setter = setToken('updated');
    const props: PersistentApiProperties = { token: 'initial' };
    expect(setter(props)).toBe(true);
    expect(props.token).toBe('updated');
  });
  it('should update token in spotifyApi', () => {
    const Spotify = spotifyApi('initial');
    Spotify(setToken('updated'));
    expect(Spotify((props) => props.token)).toBe('updated');
  });
});
